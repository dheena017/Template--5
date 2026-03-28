import React, { useState, useCallback, useMemo } from 'react';
import { 
    Combine, Trash2, GripVertical, Plus, Download, FileText, 
    Layers, Lock, ChevronLeft, FileUp, HardDrive, Sparkles, 
    Settings2, FileArchive, Check 
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';

const MergePDF = () => {
    const { loadPDF, loading } = usePDF();
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState(0);

    const activeTool = { name: 'Merge PDF', icon: Combine, color: '#e53935' };

    const processFiles = async (files) => {
        const newFiles = [];
        for (const file of files) {
            if (file.name.endsWith('.zip')) {
                const zip = await JSZip.loadAsync(file);
                const zipFiles = Object.values(zip.files).filter(f => f.name.endsWith('.pdf') && !f.dir);
                for (const zf of zipFiles) {
                    const blob = await zf.async('blob');
                    const pdfFile = new File([blob], zf.name, { type: 'application/pdf' });
                    const data = await loadPDF(pdfFile);
                    if (data) {
                        newFiles.push({
                            id: Math.random().toString(36).substr(2, 9),
                            name: zf.name,
                            size: pdfFile.size,
                            pages: data.pages,
                            arrayBuffer: data.arrayBuffer,
                            selectedPages: data.pages.map(p => p.originalNum)
                        });
                    }
                }
            } else if (file.type === 'application/pdf') {
                const data = await loadPDF(file);
                if (data) {
                    newFiles.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: file.name,
                        size: file.size,
                        pages: data.pages,
                        arrayBuffer: data.arrayBuffer,
                        selectedPages: data.pages.map(p => p.originalNum)
                    });
                }
            }
        }
        setSelectedFiles(prev => [...prev, ...newFiles]);
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        await processFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 
            'application/pdf': ['.pdf'],
            'application/zip': ['.zip'],
            'application/x-zip-compressed': ['.zip']
        },
        multiple: true
    });

    const handleExecuteMerge = async () => {
        if (selectedFiles.length < 2) {
            alert("Please select at least 2 files to merge.");
            return;
        }
        
        setIsProcessing(true);
        setProgress(0);
        try {
            const mergedPdf = await PDFDocument.create();
            
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const donorPdf = await PDFDocument.load(file.arrayBuffer);
                const pagesToCopy = file.selectedPages.map(p => p - 1);
                const copiedPages = await mergedPdf.copyPages(donorPdf, pagesToCopy);
                copiedPages.forEach(p => mergedPdf.addPage(p));
                setProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
            }

            const bytes = await mergedPdf.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `merged_${Date.now()}.pdf`;
            a.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error(error);
            alert("Merge failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const removeFile = (id) => {
        setSelectedFiles(prev => prev.filter(f => f.id !== id));
    };

    const togglePageSelection = (fileId, pageNum) => {
        setSelectedFiles(prev => prev.map(f => {
            if (f.id === fileId) {
                const isSelected = f.selectedPages.includes(pageNum);
                return {
                    ...f,
                    selectedPages: isSelected 
                        ? f.selectedPages.filter(p => p !== pageNum)
                        : [...f.selectedPages, pageNum].sort((a, b) => a - b)
                };
            }
            return f;
        }));
    };

    const [expandedFile, setExpandedFile] = useState(null);

    return (
        <div className="pdf-tools-wrapper">
            <main className="pdf-tools-main">
                <div className="pdf-tool-active-view">
                    <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none' }}>
                        <div className="tool-title-wrapper mb-8">
                            <activeTool.icon size={48} color={activeTool.color} className="tool-main-icon" />
                            <h2>{activeTool.name}</h2>
                            <p>Merge multiple PDF files and ZIP archives into one document.</p>
                        </div>

                        {!selectedFiles.length ? (
                            <div {...getRootProps()} className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} w-full max-w-2xl`}>
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center p-12 text-center">
                                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                                        <Combine size={40} className="text-red-500" />
                                    </div>
                                    <button type="button" className="primary-upload-btn mb-4" style={{ backgroundColor: activeTool.color }}>Select PDF or ZIP files</button>
                                    <p className="drag-hint">or drop files here</p>
                                </div>
                                {loading && (
                                    <div className="absolute inset-0 bg-slate-900/80 rounded-3xl flex flex-col items-center justify-center z-50">
                                        <Sparkles className="w-12 h-12 text-red-500 animate-pulse mb-4" />
                                        <p className="text-white font-bold text-lg">Gathering Document Pages...</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="w-full max-w-4xl">
                                <div className="merge-toolbar flex items-center justify-between mb-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
                                    <div className="flex items-center gap-4">
                                        <div {...getRootProps()} className="cursor-pointer">
                                            <input {...getInputProps()} />
                                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-white">
                                                <Plus size={16} /> Add Files
                                            </button>
                                        </div>
                                        <span className="text-sm text-slate-400">{selectedFiles.length} Documents</span>
                                    </div>
                                    <button 
                                        onClick={handleExecuteMerge} 
                                        disabled={isProcessing || selectedFiles.length < 2} 
                                        className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
                                    >
                                        {isProcessing ? <Sparkles className="animate-spin" size={18} /> : <Combine size={20} />}
                                        {isProcessing ? `Merging ${progress}%` : 'Merge PDFs Now'}
                                    </button>
                                </div>

                                <Reorder.Group axis="y" values={selectedFiles} onReorder={setSelectedFiles} className="reorder-list">
                                    {selectedFiles.map((file) => (
                                        <div key={file.id}>
                                            <Reorder.Item value={file} className="reorder-item-motion mb-4">
                                                <div className="reorder-item-content">
                                                    <div className="drag-handle"><GripVertical size={16} /></div>
                                                    <div className="flex-1 flex items-center justify-between">
                                                        <div className="file-info">
                                                            <div className="w-10 h-12 bg-slate-800 rounded flex items-center justify-center border border-slate-700 overflow-hidden">
                                                                {file.pages[0]?.thumbnail ? (
                                                                    <img src={file.pages[0].thumbnail} className="w-full h-full object-cover" />
                                                                ) : <FileText size={20} className="text-red-500" />}
                                                            </div>
                                                            <div className="file-meta">
                                                                <span className="file-name">{file.name}</span>
                                                                <span className="text-[10px] text-slate-500">
                                                                    {file.selectedPages.length} of {file.pages.length} pages selected
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button 
                                                                onClick={() => setExpandedFile(expandedFile === file.id ? null : file.id)}
                                                                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"
                                                            >
                                                                <Settings2 size={18} />
                                                            </button>
                                                            <button onClick={() => removeFile(file.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-500">
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <AnimatePresence>
                                                    {expandedFile === file.id && (
                                                        <motion.div 
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden bg-slate-900/40 mt-4 rounded-xl border border-slate-700/50"
                                                        >
                                                            <div className="p-6">
                                                                <p className="text-xs font-bold text-slate-500 uppercase mb-4">Select pages to include:</p>
                                                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                                                                    {file.pages.map((page) => {
                                                                        const isSelected = file.selectedPages.includes(page.originalNum);
                                                                        return (
                                                                            <button 
                                                                                key={page.id}
                                                                                onClick={() => togglePageSelection(file.id, page.originalNum)}
                                                                                className={`relative aspect-[3/4] rounded-md border-2 overflow-hidden transition-all ${isSelected ? 'border-red-500' : 'border-slate-800 opacity-40'}`}
                                                                            >
                                                                                <img src={page.thumbnail} className="w-full h-full object-cover" />
                                                                                <div className="absolute inset-0 flex items-center justify-center p-1 bg-black/20">
                                                                                    <span className="text-[8px] font-bold text-white bg-slate-900/80 px-1 rounded">{page.originalNum}</span>
                                                                                </div>
                                                                                {isSelected && (
                                                                                    <div className="absolute top-1 right-1 bg-red-500 rounded-full p-0.5">
                                                                                        <Check size={8} className="text-white" />
                                                                                    </div>
                                                                                )}
                                                                            </button>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </Reorder.Item>
                                        </div>
                                    ))}
                                </Reorder.Group>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="mt-20 border-t border-slate-800 pt-20">
                    <FAQSection tool="merge" isDarkMode={true} />
                </div>
            </main>
        </div>
    );
};

export default MergePDF;
