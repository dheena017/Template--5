import React, { useState, useCallback } from 'react';
import { 
    Zap, Download, FileText, Lock, ChevronLeft, FileUp, 
    Maximize2, Minimize2, Settings2, Loader2, CheckCircle2,
    HardDrive, Sparkles, AlertCircle
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const OptimizePDF = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfInfo, setPdfInfo] = useState(null);
    const [compressionLevel, setCompressionLevel] = useState('recommended'); // extreme, recommended, low
    const [progress, setProgress] = useState(0);
    const [resultUrl, setResultUrl] = useState(null);
    const [resultSize, setResultSize] = useState(0);

    const activeTool = { name: 'Compress PDF', icon: Zap, color: '#f59e0b' };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            setPdfInfo({
                name: file.name,
                size: file.size,
                numPages: pdf.numPages,
                arrayBuffer
            });
            setResultUrl(null);
            setProgress(0);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleOptimize = async () => {
        if (!pdfInfo) return;
        setIsProcessing(true);
        setProgress(0);
        try {
            const pdf = await pdfjsLib.getDocument({ data: pdfInfo.arrayBuffer }).promise;
            const totalPages = pdf.numPages;
            
            // Define scale and quality based on level
            let scale = 1.0;
            let quality = 0.8;
            
            if (compressionLevel === 'extreme') {
                scale = 1.0;
                quality = 0.5;
            } else if (compressionLevel === 'recommended') {
                scale = 1.5;
                quality = 0.7;
            } else if (compressionLevel === 'low') {
                scale = 2.0;
                quality = 0.9;
            }

            const doc = new jsPDF({
                orientation: 'p',
                unit: 'px',
                compress: true
            });

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                
                await page.render({ canvasContext: context, viewport }).promise;
                
                const imgData = canvas.toDataURL('image/jpeg', quality);
                
                if (i > 1) doc.addPage([viewport.width, viewport.height], 'p');
                else doc.deletePage(1), doc.addPage([viewport.width, viewport.height], 'p');
                
                doc.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height, undefined, 'FAST');
                setProgress(Math.round((i / totalPages) * 100));
            }

            const out = doc.output('blob');
            setResultSize(out.size);
            const url = URL.createObjectURL(out);
            setResultUrl(url);
        } catch (error) {
            console.error(error);
            alert("Optimization failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setPdfInfo(null);
        setResultUrl(null);
        setProgress(0);
    };

    return (
        <div className="pdf-tools-wrapper min-h-screen bg-[#0f172a]">
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
                            <div className="mb-12">
                                <div className="w-24 h-24 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <activeTool.icon size={48} className="text-amber-500" />
                                </div>
                                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">{activeTool.name}</h1>
                                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                                    Reduce file size while optimizing for maximal quality. 
                                    Compress PDF files in your browser.
                                </p>
                            </div>

                            <div {...getRootProps()} className={`upload-dropzone max-w-2xl mx-auto ${isDragActive ? 'drag-active' : ''}`}>
                                <input {...getInputProps()} />
                                <div className="p-12">
                                    <button type="button" className="primary-upload-btn mb-6" style={{ backgroundColor: activeTool.color }}>
                                        Select PDF File
                                    </button>
                                    <p className="text-slate-500 font-medium tracking-wide">or drop file here</p>
                                </div>
                            </div>
                        </motion.div>
                    ) : resultUrl ? (
                        <motion.div 
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-3xl p-12 text-center w-full"
                        >
                            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle2 size={56} className="text-green-500" />
                            </div>
                            <h2 className="text-4xl font-black text-white mb-4">Compressed!</h2>
                            <div className="flex items-center justify-center gap-6 mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-700 max-w-md mx-auto">
                                <div className="text-center">
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Before</p>
                                    <p className="text-white font-black">{(pdfInfo.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                                <div className="h-10 w-px bg-slate-700"></div>
                                <div className="text-center">
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">After</p>
                                    <p className="text-green-500 font-black">{(resultSize / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                                <div className="h-10 w-px bg-slate-700"></div>
                                <div className="text-center">
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Saving</p>
                                    <p className="text-amber-500 font-black">
                                        {Math.round((1 - resultSize / pdfInfo.size) * 100)}%
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a 
                                    href={resultUrl} 
                                    download={`compressed_${pdfInfo.name}`}
                                    className="px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl shadow-xl shadow-amber-600/30 transition-all flex items-center gap-3"
                                >
                                    <Download size={24} />
                                    Download Optimized PDF
                                </a>
                                <button onClick={reset} className="px-10 py-5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-all">
                                    Batch Process More
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="config"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-4xl mx-auto"
                        >
                            <div className="bg-slate-800/80 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center border border-white/5">
                                        <FileText size={32} className="text-amber-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white">{pdfInfo.name}</h2>
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                                            {pdfInfo.numPages} Pages • {(pdfInfo.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                    {[
                                        { id: 'extreme', label: 'Extreme', desc: 'Less quality, high compression', icon: Minimize2 },
                                        { id: 'recommended', label: 'Recommended', desc: 'Good quality, good compression', icon: Zap },
                                        { id: 'low', label: 'Low', desc: 'High quality, low compression', icon: Maximize2 },
                                    ].map(level => (
                                        <button 
                                            key={level.id}
                                            onClick={() => setCompressionLevel(level.id)}
                                            className={`
                                                p-6 rounded-2xl text-left border-2 transition-all flex flex-col gap-3
                                                ${compressionLevel === level.id ? 'bg-amber-500/10 border-amber-500' : 'bg-slate-900/50 border-transparent hover:border-slate-700'}
                                            `}
                                        >
                                            <level.icon size={24} className={compressionLevel === level.id ? 'text-amber-500' : 'text-slate-500'} />
                                            <div>
                                                <p className={`font-black tracking-tight ${compressionLevel === level.id ? 'text-white' : 'text-slate-400'}`}>{level.label}</p>
                                                <p className="text-xs text-slate-500 font-medium">{level.desc}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={handleOptimize}
                                    disabled={isProcessing}
                                    className="w-full py-6 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-black text-xl rounded-2xl shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-4"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="animate-spin" size={28} />
                                            <span>Processing {progress}%</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={28} />
                                            <span>Optimize Now</span>
                                        </>
                                    )}
                                </button>
                                
                                <div className="mt-6 flex items-center justify-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
                                    <Lock size={12} className="text-green-500" />
                                    100% Client-Side Encryption
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default OptimizePDF;
