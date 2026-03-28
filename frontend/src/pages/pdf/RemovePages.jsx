import React, { useState, useCallback, useMemo } from 'react';
import { 
    Trash2, Download, FileText, Lock, ChevronLeft, FileUp, 
    FileMinus, Check, MousePointer2, Layers, Loader2, X 
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';

const RemovePages = () => {
    const { loadPDF, loading } = usePDF();
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]); // Pages to REMOVE
    const [progress, setProgress] = useState(0);

    const activeTool = { name: 'Remove Pages', icon: FileMinus, color: '#f43f5e' };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const data = await loadPDF(acceptedFiles[0]);
            if (data) {
                setPdfData(data);
                setSelectedPages([]);
            }
        }
    }, [loadPDF]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const togglePage = (pageNum) => {
        setSelectedPages(prev => 
            prev.includes(pageNum) 
                ? prev.filter(p => p !== pageNum) 
                : [...prev, pageNum]
        );
    };

    const handleExecuteRemove = async () => {
        if (!pdfData || selectedPages.length === 0) {
            alert("Please select at least one page to remove.");
            return;
        }

        if (selectedPages.length === pdfData.pages.length) {
            alert("You cannot remove all pages from a PDF.");
            return;
        }
        
        setIsProcessing(true);
        setProgress(0);
        try {
            const pdfDoc = await PDFDocument.load(pdfData.arrayBuffer);
            const totalPages = pdfDoc.getPageCount();
            
            // pdf-lib removePage uses 0-indexed. 
            // We should remove from end to start to not mess up indices, 
            // OR create a new doc and copy only the ones we WANT.
            // Copying is safer.
            
            const newDoc = await PDFDocument.create();
            const pagesToKeep = [];
            for (let i = 1; i <= totalPages; i++) {
                if (!selectedPages.includes(i)) {
                    pagesToKeep.push(i - 1); // 0-indexed
                }
            }
            
            const copiedPages = await newDoc.copyPages(pdfDoc, pagesToKeep);
            copiedPages.forEach(p => newDoc.addPage(p));

            const bytes = await newDoc.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `removed_${pdfData.name}`;
            a.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error(error);
            alert("Removal failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setPdfData(null);
        setSelectedPages([]);
    };

    return (
        <div className="pdf-tools-wrapper min-h-screen bg-[#0f172a]">
            <main className="pdf-tools-main max-w-7xl mx-auto p-4 md:p-8">
                <AnimatePresence mode="wait">
                    {!pdfData ? (
                        <motion.div 
                            key="upload"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="tool-upload-center text-center py-20"
                        >
                            <div className="mb-12">
                                <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <activeTool.icon size={48} className="text-rose-500" />
                                </div>
                                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">{activeTool.name}</h1>
                                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                                    Click on pages to mark them for deletion. All processing happens in your browser.
                                </p>
                            </div>

                            <div {...getRootProps()} className={`upload-dropzone max-w-2xl mx-auto ${isDragActive ? 'drag-active' : ''}`}>
                                <input {...getInputProps()} />
                                <div className="p-12">
                                    <button type="button" className="primary-upload-btn mb-6" style={{ backgroundColor: activeTool.color }}>
                                        Select PDF File
                                    </button>
                                    <p className="text-slate-500 font-medium">or drop file here</p>
                                </div>
                                {loading && (
                                    <div className="absolute inset-0 bg-slate-900/80 rounded-3xl flex flex-col items-center justify-center z-50">
                                        <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
                                        <p className="text-white font-bold text-lg">Generating Thumbnails...</p>
                                        <p className="text-slate-400 text-sm mt-2">This may take a moment for larger files.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="editor"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col gap-8"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
                                <div className="flex items-center gap-4">
                                    <button onClick={reset} className="p-2 hover:bg-slate-700 rounded-full text-slate-400">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <div>
                                        <h2 className="font-bold text-white text-xl truncate max-w-[200px] md:max-w-md">{pdfData.name}</h2>
                                        <p className="text-slate-500 text-sm">
                                            {selectedPages.length} pages selected for removal
                                        </p>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={handleExecuteRemove}
                                    disabled={isProcessing || selectedPages.length === 0}
                                    className="px-10 py-4 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-rose-600/20"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
                                    {isProcessing ? 'Removing...' : `Remove ${selectedPages.length} Pages`}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                {pdfData.pages.map((page) => {
                                    const isSelected = selectedPages.includes(page.originalNum);
                                    return (
                                        <motion.div
                                            key={page.id}
                                            whileHover={{ y: -4 }}
                                            onClick={() => togglePage(page.originalNum)}
                                            className={`relative group cursor-pointer rounded-2xl overflow-hidden border-4 transition-all ${isSelected ? 'border-rose-500 bg-rose-500/10' : 'border-transparent hover:border-slate-700 bg-slate-800'}`}
                                        >
                                            <div className={`aspect-[3/4] relative overflow-hidden ${isSelected ? 'opacity-40 grayscale' : ''}`}>
                                                <img src={page.thumbnail} alt={`Page ${page.originalNum}`} className="w-full h-full object-cover" />
                                            </div>
                                            
                                            <div className="absolute top-2 right-2">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'bg-rose-500 border-rose-500' : 'bg-black/20 border-white/40'}`}>
                                                    {isSelected && <X size={14} className="text-white" />}
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-slate-900/90 flex justify-center">
                                                <span className="text-[10px] font-black text-slate-400">PAGE {page.originalNum}</span>
                                            </div>

                                            {isSelected && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg">REMOVING</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="mt-20 border-t border-slate-800 pt-20">
                    <FAQSection tool="remove" isDarkMode={true} />
                </div>
            </main>
        </div>
    );
};

export default RemovePages;

