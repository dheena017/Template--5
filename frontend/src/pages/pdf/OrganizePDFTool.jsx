import React, { useState, useCallback, useMemo } from 'react';
import { 
    Layers, Trash2, Download, FileText, Lock, ChevronLeft, 
    FileUp, GripVertical, RotateCw, Plus, Copy, Redo, Undo, Sparkles 
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { PDFDocument, rgb } from 'pdf-lib';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';
import '../../styles/components/Toolbar.css';

const OrganizePDFTool = () => {
    const { loadPDF, loading, error, pdfInfo, setPdfInfo } = usePDF();
    const [pages, setPages] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [zoomLevel, setZoomLevel] = useState(1); // 1, 1.5, 2

    const activeTool = { name: 'Organize PDF', icon: Layers, color: '#42a5f5' };

    const addToHistory = useCallback((newPages) => {
        const nextHistory = history.slice(0, historyIndex + 1);
        nextHistory.push([...newPages]);
        setHistory(nextHistory);
        setHistoryIndex(nextHistory.length - 1);
        setPages(newPages);
    }, [history, historyIndex]);

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setPages(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setPages(history[historyIndex + 1]);
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const data = await loadPDF(acceptedFiles[0]);
            if (data) {
                const initialPages = data.pages.map(p => ({
                    ...p,
                    id: Math.random().toString(36).substr(2, 9),
                    modified: false
                }));
                setPages(initialPages);
                setHistory([initialPages]);
                setHistoryIndex(0);
            }
        }
    }, [loadPDF]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const rotatePage = (id) => {
        const newPages = pages.map(p => 
            p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p
        );
        addToHistory(newPages);
    };

    const deletePage = (id) => {
        const newPages = pages.filter(p => p.id !== id);
        addToHistory(newPages);
    };

    const duplicatePage = (id) => {
        const pageIdx = pages.findIndex(p => p.id === id);
        const page = pages[pageIdx];
        const newPages = [
            ...pages.slice(0, pageIdx + 1),
            { ...page, id: Math.random().toString(36).substr(2, 9) },
            ...pages.slice(pageIdx + 1)
        ];
        addToHistory(newPages);
    };

    const addBlankPage = () => {
        const newPage = {
            id: Math.random().toString(36).substr(2, 9),
            isBlank: true,
            thumbnail: null,
            rotation: 0
        };
        addToHistory([...pages, newPage]);
    };

    const handleExecuteOrganize = async () => {
        if (!pages.length) return;
        setIsProcessing(true);
        try {
            const pdfDoc = await PDFDocument.load(pdfInfo.arrayBuffer);
            const newPdf = await PDFDocument.create();

            for (const pageItem of pages) {
                if (pageItem.isBlank) {
                    const page = newPdf.addPage([600, 800]); // Standard A4 (approx)
                } else {
                    const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageItem.originalNum - 1]);
                    copiedPage.setRotation({ type: 'degrees', angle: pageItem.rotation });
                    newPdf.addPage(copiedPage);
                }
            }

            const bytes = await newPdf.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `organized_${pdfInfo.name}`;
            a.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error(error);
            alert("Organization failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const clearFiles = () => {
        setPages([]);
        setPdfInfo(null);
        setHistory([]);
        setHistoryIndex(-1);
    };

    return (
        <div className="pdf-tools-wrapper">
            <main className="pdf-tools-main">
                <div className="pdf-tool-active-view">
                    <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none' }}>
                        <div className="tool-title-wrapper mb-8">
                            <activeTool.icon size={48} color={activeTool.color} className="tool-main-icon" />
                            <h2>{activeTool.name}</h2>
                            <p>Organize, rotate, duplicate, and manage PDF pages in your browser.</p>
                        </div>

                        {!pages.length ? (
                            <div {...getRootProps()} className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} w-full max-w-2xl`}>
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center p-12">
                                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                        <FileUp size={40} className="text-blue-500" />
                                    </div>
                                    <button type="button" className="primary-upload-btn mb-4" style={{ backgroundColor: activeTool.color }}>Select PDF file</button>
                                    <p className="drag-hint">or drop PDF here</p>
                                    {loading && (
                                        <div className="absolute inset-0 bg-slate-900/80 rounded-3xl flex flex-col items-center justify-center">
                                            <div className="spinner mb-4" style={{ borderTopColor: activeTool.color }}></div>
                                            <p className="text-white font-bold">Analyzing PDF...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full">
                                <div className="premium-toolbar">
                                    <div className="toolbar-group">
                                        <button onClick={undo} disabled={historyIndex === 0} className="toolbar-action-btn" title="Undo Action">
                                            <Undo size={18} />
                                        </button>
                                        <button onClick={redo} disabled={historyIndex === history.length - 1} className="toolbar-action-btn" title="Redo Action">
                                            <Redo size={18} />
                                        </button>
                                        <div className="toolbar-divider" />
                                        <button onClick={addBlankPage} className="toolbar-primary-action" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '0.85rem' }}>
                                            <Plus size={16} /> Add Blank Page
                                        </button>
                                        <div className="toolbar-divider" />
                                        <div className="toolbar-zoom-slider">
                                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Zoom</span>
                                            <input 
                                                type="range" min="0.5" max="2" step="0.1" 
                                                value={zoomLevel} 
                                                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div className="toolbar-group">
                                        <div className="toolbar-label-pill">{pages.length} Pages</div>
                                        <button onClick={handleExecuteOrganize} disabled={isProcessing} className="toolbar-primary-action">
                                            {isProcessing ? <Sparkles className="animate-spin" size={18} /> : <Download size={18} />}
                                            {isProcessing ? 'Processing...' : 'Download PDF'}
                                        </button>
                                        <button onClick={clearFiles} className="toolbar-action-btn hover:text-red-500" title="Clear Workspace">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="pages-grid-container min-h-[500px] border-2 border-dashed border-slate-700/50 rounded-3xl p-8 bg-slate-900/20">
                                    <Reorder.Group axis="y" values={pages} onReorder={addToHistory} className="grid gap-8 justify-center" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${160 * zoomLevel}px, 1fr))` }}>
                                        {pages.map((page) => (
                                            <Reorder.Item 
                                                key={page.id} 
                                                value={page}
                                                className="relative group cursor-grab active:cursor-grabbing"
                                                whileHover={{ y: -5 }}
                                            >
                                                <div className="relative aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all shadow-lg">
                                                    {page.isBlank ? (
                                                        <div className="w-full h-full bg-white flex items-center justify-center">
                                                            <span className="text-slate-300 font-bold uppercase tracking-widest text-[10px]">Blank Page</span>
                                                        </div>
                                                    ) : (
                                                        <img 
                                                            src={page.thumbnail} 
                                                            alt={`Page ${page.originalNum}`} 
                                                            className="w-full h-full object-contain pointer-events-none"
                                                            style={{ transform: `rotate(${page.rotation}deg)`, transition: 'transform 0.3s' }}
                                                        />
                                                    )}
                                                    
                                                    {/* Overlays */}
                                                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => rotatePage(page.id)} className="w-8 h-8 bg-slate-900/90 text-white rounded-full flex items-center justify-center hover:bg-blue-600">
                                                            <RotateCw size={14} />
                                                        </button>
                                                        <button onClick={() => duplicatePage(page.id)} className="w-8 h-8 bg-slate-900/90 text-white rounded-full flex items-center justify-center hover:bg-green-600">
                                                            <Copy size={14} />
                                                        </button>
                                                        <button onClick={() => deletePage(page.id)} className="w-8 h-8 bg-slate-900/90 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700 flex justify-between items-center">
                                                        <GripVertical size={12} className="text-slate-500" />
                                                        <span className="text-[10px] font-bold text-slate-300">Page {pages.indexOf(page) + 1}</span>
                                                    </div>
                                                </div>
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="mt-20 border-t border-slate-800 pt-20">
                    <FAQSection tool="organize" isDarkMode={true} />
                </div>
            </main>
        </div>
    );
};

export default OrganizePDFTool;

