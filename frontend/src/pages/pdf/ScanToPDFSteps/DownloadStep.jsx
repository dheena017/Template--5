import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download, RotateCcw, Scan } from 'lucide-react';
import Button from '../../../components/Button';
import './DownloadStep.css';

const DownloadStep = ({ downloadFinal, resetTool, fileName }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="download-step-wrapper w-full"
        >
            <div className="success-icon-wrapper p-10 bg-pink-500/10 rounded-[48px] inline-block mb-12 border border-pink-500/20 shadow-4xl shadow-pink-900/10 transition-all hover:scale-105 duration-500">
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                >
                    <Check size={96} className="text-pink-500" strokeWidth={3} />
                </motion.div>
            </div>
            
            <h3 className="success-title text-5xl font-black text-white mb-6 uppercase tracking-tight">Capture Complete!</h3>
            <p className="success-description text-slate-400 max-w-lg mx-auto mb-16 text-xl leading-relaxed">Your images have been successfully converted and compiled into a high-fidelity PDF document ready for any professional use.</p>
            
            <div className="action-buttons-grid flex flex-col sm:flex-row gap-8 justify-center mb-20 max-w-2xl mx-auto px-6">
                <Button 
                    onClick={downloadFinal}
                    className="flex-1 h-24 text-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-[0_40px_80px_rgba(236,72,153,0.3)] active:scale-95 group hover:brightness-110"
                    style={{ backgroundColor: '#ec4899' }}
                >
                    <Download size={32} className="group-hover:-translate-y-2 transition-transform duration-500" /> 
                    <span>Save Result</span>
                </Button>
                <Button 
                    onClick={resetTool}
                    variant="secondary"
                    className="px-12 h-24 text-xl font-bold flex items-center justify-center gap-4 transition-all border border-slate-700 bg-slate-800/20 hover:bg-slate-700 hover:border-slate-500 active:scale-95 backdrop-blur-2xl"
                >
                    <RotateCcw size={28} /> New Capture
                </Button>
            </div>
            
            <div className="file-final-card bg-slate-900/70 p-10 rounded-[40px] border border-white/5 backdrop-blur-3xl flex items-center justify-between max-w-2xl mx-auto group hover:bg-slate-900 transition-all shadow-4xl cursor-pointer" onClick={downloadFinal}>
                <div className="file-meta-container flex items-center gap-10">
                    <div className="file-final-icon p-6 bg-pink-500/10 rounded-2xl text-pink-500 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500 shadow-2xl">
                        <Scan size={48} />
                    </div>
                    <div className="file-final-details text-left">
                        <span className="file-final-name block text-white font-black truncate max-w-[200px] sm:max-w-md text-2xl leading-tight">{fileName}</span>
                        <span className="file-final-status block text-pink-500/60 text-[10px] font-black uppercase tracking-[0.4em] mt-4">Scanned Hub Ready</span>
                    </div>
                </div>
                <button 
                    className="file-download-btn-mini w-20 h-20 bg-pink-500/10 rounded-[28px] text-pink-500 hover:bg-pink-500 hover:text-white transition-all shadow-2xl active:scale-90 flex items-center justify-center"
                >
                    <Download size={36} />
                </button>
            </div>
            <div className="next-actions-aura mt-20 pt-16 border-t border-slate-800/40 w-full max-w-4xl mx-auto">
                <p className="na-title-aura text-slate-500 font-black uppercase tracking-[0.4em] text-[10px] mb-12 text-center">Power Up Your Result</p>
                <div className="na-grid-aura grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 pb-20">
                    <div className="na-card-aura bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 hover:border-blue-500/30 p-10 rounded-[40px] flex items-center gap-10 cursor-pointer transition-all duration-500 group" onClick={() => resetTool()}>
                        <div className="na-chip-icon-aura p-5 bg-blue-500/10 text-blue-500 rounded-3xl group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                            <Check size={32} />
                        </div>
                        <div className="na-content-aura text-left">
                           <span className="na-h-aura block text-xl font-black text-white mb-2">Compress PDF</span>
                           <span className="na-p-aura block text-sm text-slate-500 font-medium">Reduce file weight for email</span>
                        </div>
                    </div>
                    <div className="na-card-aura bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/10 hover:border-violet-500/30 p-10 rounded-[40px] flex items-center gap-10 cursor-pointer transition-all duration-500 group" onClick={() => resetTool()}>
                        <div className="na-chip-icon-aura p-5 bg-violet-500/10 text-violet-500 rounded-3xl group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500">
                            <Scan size={32} />
                        </div>
                        <div className="na-content-aura text-left">
                           <span className="na-h-aura block text-xl font-black text-white mb-2">Merge More</span>
                           <span className="na-p-aura block text-sm text-slate-500 font-medium">Add pages from other PDFs</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DownloadStep;
