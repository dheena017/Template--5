import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles } from 'lucide-react';
import './ProcessingStep.css';

const ProcessingStep = ({ progress, activeTool }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="processing-step-wrapper w-full"
        >
            <div className="processing-animation-container">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="spinner-outer"
                    style={{ borderTopColor: activeTool.color }}
                />
                <div className="spinner-inner">
                    <Scissors size={48} className="animate-pulse" style={{ color: activeTool.color }} />
                </div>
            </div>
            
            <h3 className="processing-status-label">Precision Extraction</h3>
            <p className="processing-description text-slate-400">Splitting your document into multiple high-quality parts.</p>
            
            <div className="w-full max-w-sm mt-8">
                <div className="progress-track bg-slate-800/50 h-3 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                    <motion.div 
                        className="progress-bar-fill h-full shadow-[0_0_15px_rgba(255,82,82,0.4)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ backgroundColor: activeTool.color }}
                    />
                </div>
                <div className="mt-4 text-center">
                    <span className="progress-percentage text-2xl font-black text-white">{progress}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProcessingStep;
