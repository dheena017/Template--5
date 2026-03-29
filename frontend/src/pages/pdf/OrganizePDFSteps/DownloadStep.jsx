import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download, RotateCcw, Layers } from 'lucide-react';
import Button from '../../../components/Button';
import './DownloadStep.css';

const DownloadStep = ({ downloadFinal, resetTool, fileName }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="download-step-wrapper w-full"
        >
            <div className="success-icon-wrapper bg-blue-500/10 p-8 rounded-[40px] inline-block mb-12 border border-blue-500/20 shadow-2xl shadow-blue-900/10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                >
                    <Check size={80} className="text-blue-500" />
                </motion.div>
            </div>
            
            <h3 className="success-title text-4xl font-black text-white mb-6 tracking-tight uppercase">Layout Refined!</h3>
            <p className="success-description text-slate-400 max-w-lg mx-auto mb-16 text-lg leading-relaxed">Your document has been reorganized and structurally optimized. All changes are permanently baked into your new downloadable PDF.</p>
            
            <div className="action-buttons-grid flex flex-col sm:flex-row gap-6 justify-center mb-16 max-w-2xl mx-auto px-6">
                <Button 
                    onClick={downloadFinal}
                    className="flex-1 h-20 text-2xl font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-blue-900/40 active:scale-95 group hover:brightness-110"
                    style={{ backgroundColor: '#3b82f6' }}
                >
                    <Download size={28} className="group-hover:-translate-y-1 transition-transform" /> 
                    <span>Save Result</span>
                </Button>
                <Button 
                    onClick={resetTool}
                    variant="secondary"
                    className="px-10 h-20 text-xl font-bold flex items-center justify-center gap-4 transition-all border border-slate-700 bg-slate-800/30 hover:bg-slate-700 hover:border-slate-500 active:scale-95 backdrop-blur-md"
                >
                    <RotateCcw size={24} /> New Project
                </Button>
            </div>
            
            <div className="file-final-card bg-slate-900/60 p-8 rounded-[32px] border border-white/5 backdrop-blur-2xl flex items-center justify-between max-w-xl mx-auto group hover:border-blue-500/30 transition-all shadow-2xl">
                <div className="file-meta-container flex items-center gap-6">
                    <div className="file-final-icon p-5 bg-blue-500/10 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
                        <Layers size={40} />
                    </div>
                    <div className="file-final-details text-left">
                        <span className="file-final-name block text-white font-black truncate max-w-[200px] sm:max-w-xs text-xl tracking-tight">{fileName}</span>
                        <span className="file-final-status block text-blue-500/60 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Structure Refined</span>
                    </div>
                </div>
                <button 
                    onClick={downloadFinal} 
                    className="file-download-btn-mini w-16 h-16 bg-blue-500/10 rounded-2xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-90 flex items-center justify-center"
                >
                    <Download size={32} />
                </button>
            </div>
        </motion.div>
    );
};

export default DownloadStep;
