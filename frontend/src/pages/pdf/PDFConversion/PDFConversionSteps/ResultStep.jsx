import React from 'react';
import { motion } from 'framer-motion';
import { Download, PDF, CheckCircle2 } from 'lucide-react';
import Button from '../../../../components/Button';
import './ResultStep.css';
import './PDFCard.css';

const ResultStep = ({ resultData, fromFormat, toFormat, activeTool, reset }) => {
    return (
        <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 text-center w-full max-w-4xl mx-auto PDF-conversion-card"
        >
            <div className="w-24 h-24 bg-green-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.15)] relative overflow-hidden PDF-icon-container success">
                <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
                <CheckCircle2 size={48} className="text-green-500 relative z-10" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Conversion Complete!</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Your PDF has been successfully converted from {fromFormat} to {toFormat}.
            </p>
            
            <div className="p-6 max-w-md mx-auto mb-10 flex items-center justify-between aura-card-inner success-file-box">
                <div className="text-left flex-1 min-w-0 pr-4">
                    <p className="text-white font-bold truncate text-lg" title={resultData.name}>{resultData.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="bg-white/5 px-2 py-1 rounded-md text-xs font-bold text-slate-400 border border-white/5">{resultData.size}</span>
                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: activeTool.color }}>{toFormat} READY</span>
                    </div>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${activeTool.color}20` }}>
                    <PDF size={24} style={{ color: activeTool.color }} />
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                    href={resultData.url}
                    download={resultData.name}
                    className="flex-1 sm:flex-none btn-premium-aura aura-btn aura-btn-primary aura-btn-md shadow-xl flex items-center justify-center gap-4"
                    style={{ backgroundColor: activeTool.color, textDecoration: 'none' }}
                >
                    <span className="aura-btn-shine"></span>
                    <span className="aura-btn-content flex items-center gap-3">
                        <Download size={22} />
                        Download {toFormat} File
                    </span>
                </a>
                <Button 
                    onClick={reset} 
                    className="flex-1 sm:flex-none border border-transparent hover:border-white/10"
                    style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' }}
                >
                    Convert Another
                </Button>
            </div>
        </motion.div>
    );
};

export default ResultStep;
