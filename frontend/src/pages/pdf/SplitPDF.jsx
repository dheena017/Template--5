import React, { useState, useCallback, useMemo, useEffect, useReducer } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
    Split, Trash2, Download, FileText, Lock, ChevronLeft, 
    FileUp, Layers, Check, CheckCircle2, AlertCircle, Loader2,
    Settings2, Sliders, ListFilter, Scissors, Files, Box, Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// --- Custom Hooks ---

const usePDFLoader = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfInfo, setPdfInfo] = useState(null);

    const loadPDF = async (file) => {
        setLoading(true);
        setError(null);
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            // Extract outline (bookmarks)
            const outline = await pdf.getOutline();
            
            const thumbnails = [];
            for (let i = 1; i <= Math.min(pdf.numPages, 100); i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: context, viewport }).promise;
                thumbnails.push(canvas.toDataURL());
            }

            setPdfInfo({
                name: file.name,
                size: file.size,
                numPages: pdf.numPages,
                thumbnails,
                arrayBuffer,
                outline: outline || []
            });
        } catch (err) {
            console.error("PDF Load Error:", err);
            setError("Failed to load PDF. It might be corrupted or protected.");
        } finally {
            setLoading(false);
        }
    };

    return { loadPDF, loading, error, pdfInfo, setPdfInfo };
};

const usePDFSplitter = () => {
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);

    const splitPDF = async (pdfBuffer, mode, options) => {
        setProcessing(true);
        setProgress(0);
        try {
            const pdfDoc = await PDFDocument.load(pdfBuffer);
            const totalPages = pdfDoc.getPageCount();
            const zip = new JSZip();
            
            let splitRanges = [];

            if (mode === 'EVERY') {
                const interval = parseInt(options.interval) || 1;
                for (let i = 0; i < totalPages; i += interval) {
                    const range = [];
                    for (let j = i; j < Math.min(i + interval, totalPages); j++) {
                        range.push(j);
                    }
                    splitRanges.push(range);
                }
            } else if (mode === 'CUSTOM') {
                const rangeStr = options.ranges || "";
                const parts = rangeStr.split(',').map(s => s.trim());
                for (const part of parts) {
                    const [start, end] = part.split('-').map(s => parseInt(s.trim()));
                    if (isNaN(start)) continue;
                    const range = [];
                    if (isNaN(end)) {
                        if (start >= 1 && start <= totalPages) range.push(start - 1);
                    } else {
                        for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
                            range.push(i - 1);
                        }
                    }
                    if (range.length > 0) splitRanges.push(range);
                }
            } else if (mode === 'ALL') {
                for (let i = 0; i < totalPages; i++) {
                    splitRanges.push([i]);
                }
            } else if (mode === 'SIZE') {
                const targetSizeMB = parseFloat(options.targetSize) || 1;
                const avgPageSize = pdfBuffer.byteLength / totalPages;
                const pagesPerFile = Math.max(1, Math.floor((targetSizeMB * 1024 * 1024) / avgPageSize));
                
                for (let i = 0; i < totalPages; i += pagesPerFile) {
                    const range = [];
                    for (let j = i; j < Math.min(i + pagesPerFile, totalPages); j++) {
                        range.push(j);
                    }
                    splitRanges.push(range);
                }
            } else if (mode === 'BOOKMARKS') {
                if (options.outline && options.outline.length > 0) {
                    // This is a simplified bookmark split: split by top-level chapters
                    // We need to find the page numbers for each bookmark
                    // pdfjs outline items have 'dest' which can be complex to resolve client-side without more effort
                    // For now, if we can't easily resolve, we fallback or use a simplified approach
                    alert("Bookmark splitting requires resolving destination targets, which is limited in this version.");
                    return false;
                }
            }

            const totalGroups = splitRanges.length;
            if (totalGroups === 0) throw new Error("No ranges to split.");

            for (let i = 0; i < totalGroups; i++) {
                const newDoc = await PDFDocument.create();
                const pagesToCopy = await newDoc.copyPages(pdfDoc, splitRanges[i]);
                pagesToCopy.forEach(p => newDoc.addPage(p));
                const bytes = await newDoc.save();
                
                let fileName = (options.namingTemplate || 'split_{number}')
                    .replace('{original}', options.originalName?.replace('.pdf', '') || 'file')
                    .replace('{number}', (i + 1).toString().padStart(2, '0'));
                
                if (!fileName.endsWith('.pdf')) fileName += '.pdf';
                zip.file(fileName, bytes);
                setProgress(Math.round(((i + 1) / totalGroups) * 100));
            }

            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, `split_pdf_${Date.now()}.zip`);
            return true;
        } catch (err) {
            console.error("Split Error:", err);
            throw err;
        } finally {
            setProcessing(false);
        }
    };

    return { splitPDF, processing, progress };
};

// --- Main Component ---

const initialState = {
    mode: 'EVERY', // EVERY, CUSTOM, ALL, SIZE, BOOKMARKS
    interval: 1,
    ranges: '',
    targetSize: 1,
    selectedPages: [],
    namingTemplate: '{original}_{number}'
};

function splitReducer(state, action) {
    switch (action.type) {
        case 'SET_MODE': return { ...state, mode: action.payload };
        case 'SET_INTERVAL': return { ...state, interval: action.payload };
        case 'SET_RANGES': return { ...state, ranges: action.payload };
        case 'SET_SIZE': return { ...state, targetSize: action.payload };
        case 'SET_NAMING': return { ...state, namingTemplate: action.payload };
        case 'RESET': return initialState;
        default: return state;
    }
}

const SplitPDF = () => {
    const { loadPDF, loading, error, pdfInfo, setPdfInfo } = usePDFLoader();
    const { splitPDF, processing, progress } = usePDFSplitter();
    const [state, dispatch] = useReducer(splitReducer, initialState);
    const [success, setSuccess] = useState(false);

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            await loadPDF(acceptedFiles[0]);
            setSuccess(false);
        }
    }, [loadPDF]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleExecute = async () => {
        if (!pdfInfo) return;
        try {
            const res = await splitPDF(pdfInfo.arrayBuffer, state.mode, { 
                ...state, 
                originalName: pdfInfo.name,
                outline: pdfInfo.outline
            });
            if (res) setSuccess(true);
        } catch (err) {
            alert("Error during splitting: " + err.message);
        }
    };

    const resetTool = () => {
        setPdfInfo(null);
        setSuccess(false);
        dispatch({ type: 'RESET' });
    };

    const activeTool = { name: 'Split PDF', icon: Split, color: '#ff5252' };

    return (
        <div className="pdf-tools-wrapper min-h-screen bg-[#0f172a] text-slate-200">
            <main className="pdf-tools-main max-w-6xl mx-auto p-4 md:p-8">
                <AnimatePresence mode="wait">
                    {!pdfInfo ? (
                        <motion.div 
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="tool-upload-center text-center py-20"
                        >
                            <div className="mb-8 flex flex-col items-center">
                                <div className="p-4 bg-red-500/10 rounded-2xl mb-4">
                                    <activeTool.icon size={64} className="text-red-500" />
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-4">
                                    Split PDF Pages
                                </h1>
                                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                    Extract pages with precision using multiple split methods.
                                </p>
                            </div>

                            <div 
                                {...getRootProps()} 
                                className={`
                                    relative border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer bg-slate-800/50
                                    ${isDragActive ? 'border-red-500 bg-red-500/5 scale-105' : 'border-slate-700 hover:border-slate-500'}
                                `}
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
                                        <FileUp size={40} className="text-slate-300" />
                                    </div>
                                    <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all mb-4">
                                        Select PDF File
                                    </button>
                                    <p className="text-slate-400 font-medium">or drop PDF here</p>
                                </div>
                                {loading && (
                                    <div className="absolute inset-0 bg-slate-900/80 rounded-3xl flex flex-col items-center justify-center">
                                        <Loader2 className="w-10 h-10 text-red-500 animate-spin mb-4" />
                                        <p className="text-white font-bold">Analyzing PDF structure...</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : success ? (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-3xl p-12 text-center w-full"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={48} className="text-green-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">PDF Successfully Split!</h2>
                            <p className="text-slate-400 mb-8">Your files have been processed and downloaded as a ZIP archive.</p>
                            <button onClick={resetTool} className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all">
                                Process Another File
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="workspace"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full"
                        >
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Settings2 size={18} className="text-slate-400" />
                                        <h3 className="font-bold text-white uppercase tracking-wider text-sm">Split Configuration</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-2">
                                            {[
                                                { id: 'EVERY', label: 'Every X pages', icon: Scissors },
                                                { id: 'CUSTOM', label: 'Custom ranges', icon: ListFilter },
                                                { id: 'ALL', label: 'All as individual', icon: Files },
                                                { id: 'SIZE', label: 'By file size', icon: Box },
                                                { id: 'BOOKMARKS', label: 'By bookmarks', icon: Bookmark },
                                            ].map(m => (
                                                <button 
                                                    key={m.id}
                                                    onClick={() => dispatch({ type: 'SET_MODE', payload: m.id })}
                                                    className={`
                                                        flex items-center gap-3 px-4 py-3 rounded-xl text-left border transition-all
                                                        ${state.mode === m.id ? 'bg-red-600/10 border-red-500 text-red-500' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:bg-slate-700/30'}
                                                    `}
                                                >
                                                    <m.icon size={16} />
                                                    <span className="text-sm font-semibold">{m.label}</span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-slate-700">
                                            {state.mode === 'EVERY' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Pages per PDF</label>
                                                    <input 
                                                        type="number" 
                                                        min="1" 
                                                        value={state.interval}
                                                        onChange={(e) => dispatch({ type: 'SET_INTERVAL', payload: e.target.value })}
                                                        className="bg-slate-900 border border-slate-700 rounded-lg p-3 w-full text-white"
                                                    />
                                                </div>
                                            )}
                                            {state.mode === 'CUSTOM' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Page Range</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="e.g. 1-3, 5, 8-10"
                                                        value={state.ranges}
                                                        onChange={(e) => dispatch({ type: 'SET_RANGES', payload: e.target.value })}
                                                        className="bg-slate-900 border border-slate-700 rounded-lg p-3 w-full text-white"
                                                    />
                                                </div>
                                            )}
                                            {state.mode === 'SIZE' && (
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Target Size (MB)</label>
                                                    <input 
                                                        type="number" 
                                                        step="0.1"
                                                        value={state.targetSize}
                                                        onChange={(e) => dispatch({ type: 'SET_SIZE', payload: e.target.value })}
                                                        className="bg-slate-900 border border-slate-700 rounded-lg p-3 w-full text-white"
                                                    />
                                                </div>
                                            )}
                                            {state.mode === 'BOOKMARKS' && (
                                                <div className="p-4 bg-slate-900/50 rounded-xl text-xs text-slate-400">
                                                    {pdfInfo.outline.length > 0 ? `Found ${pdfInfo.outline.length} top-level bookmarks.` : 'No bookmarks found in this PDF.'}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    disabled={processing}
                                    onClick={handleExecute}
                                    className="w-full py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 transition-all shadow-xl shadow-red-600/20 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <><Loader2 className="animate-spin" size={24} /> <span>{progress}%</span></>
                                    ) : (
                                        <><Download size={24} /> <span>Split PDF</span></>
                                    )}
                                </button>
                            </div>

                            <div className="lg:col-span-3">
                                <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-8 min-h-screen">
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold text-white">{pdfInfo.name}</h2>
                                        <p className="text-slate-500 text-sm">{pdfInfo.numPages} pages • {(pdfInfo.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {pdfInfo.thumbnails.map((thumb, idx) => (
                                            <div key={idx} className="relative aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-md">
                                                <img src={thumb} className="w-full h-full object-cover" />
                                                <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/60 text-white text-[10px] text-center font-bold">
                                                    Page {idx + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default SplitPDF;

