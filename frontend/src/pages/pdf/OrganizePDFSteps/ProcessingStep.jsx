import React from 'react';
import { motion } from 'framer-motion';
import { Settings2, Sparkles } from 'lucide-react';
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
                    <Settings2 size={56} className="animate-spin text-blue-500" style={{ color: activeTool.color }} />
                </div>
            </div>
            
            <h3 className="processing-status-label text-4xl font-black text-blue-500 uppercase tracking-tighter" style={{ color: activeTool.color }}>Reconstructing Document</h3>
            <p className="processing-description text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">Applying rotation metadata, re-indexing pages, and finalizing your high-fidelity PDF layout.</p>
            
            <div className="w-full max-w-sm mt-12">
                <div className="progress-track bg-slate-800/50 h-3 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                    <motion.div 
                        className="progress-bar-fill h-full shadow-[0_0_20px_rgba(66,165,245,0.4)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ backgroundColor: activeTool.color }}
                    />
                </div>
                <div className="mt-6 text-center">
                    <span className="progress-percentage text-3xl font-black text-white">{progress}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProcessingStep;
