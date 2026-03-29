import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download, RotateCcw, FolderArchive } from 'lucide-react';
import Button from '../../../components/Button';
import './DownloadStep.css';

const DownloadStep = ({ downloadFinal, resetTool, zipFileName }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="download-step-wrapper w-full"
        >
            <div className="success-icon-wrapper bg-green-500/10 p-6 rounded-full inline-block mx-auto mb-8 border border-green-500/20">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                >
                    <Check size={64} className="text-green-500" />
                </motion.div>
            </div>
            
            <h3 className="success-title text-4xl font-black text-white mb-4">Precision Split Complete!</h3>
            <p className="success-description text-slate-400 max-w-lg mx-auto mb-12 text-lg">Your PDF has been successfully split according to your specifications. All parts are packed in a single ZIP archive for your convenience.</p>
            
            <div className="action-buttons-grid flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-xl mx-auto">
                <Button 
                    onClick={downloadFinal}
                    className="flex-1 h-20 text-2xl font-black flex items-center justify-center gap-4 transition-all shadow-2xl shadow-green-900/30 active:scale-95"
                    style={{ backgroundColor: '#22c55e' }}
                >
                    <Download size={28} /> Download ZIP
                </Button>
                <Button 
                    onClick={resetTool}
                    variant="secondary"
                    className="px-10 h-20 text-xl font-bold flex items-center justify-center gap-4 transition-all border border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:border-slate-500 active:scale-95"
                >
                    <RotateCcw size={24} /> New Split
                </Button>
            </div>
            
            <div className="file-final-card bg-slate-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-md flex items-center justify-between max-w-lg mx-auto group hover:border-green-500/30 transition-all">
                <div className="file-meta-container flex items-center gap-5">
                    <div className="file-final-icon p-4 bg-green-500/10 rounded-2xl text-green-500 group-hover:scale-110 transition-transform">
                        <FolderArchive size={32} />
                    </div>
                    <div className="file-final-details text-left">
                        <span className="file-final-name block text-white font-black truncate max-w-[200px]">{zipFileName}</span>
                        <span className="file-final-status block text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Archive Ready</span>
                    </div>
                </div>
                <button onClick={downloadFinal} className="file-download-btn-mini p-4 bg-green-500/10 rounded-2xl text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-lg active:scale-90">
                    <Download size={24} />
                </button>
            </div>
        </motion.div>
    );
};

export default DownloadStep;
