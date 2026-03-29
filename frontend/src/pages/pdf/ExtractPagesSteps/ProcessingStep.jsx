import React from 'react';
import { motion } from 'framer-motion';
import { FileOutput, Sparkles } from 'lucide-react';
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
                    style={{ borderTopColor: '#06b6d4' }}
                />
                <div className="spinner-inner">
                    <FileOutput size={56} className="animate-pulse text-cyan-500" />
                </div>
            </div>
            
            <h3 className="processing-status-label text-4xl font-black text-cyan-500 uppercase tracking-tighter">Extracting Knowledge</h3>
            <p className="processing-description text-slate-400 max-w-sm mx-auto text-lg leading-relaxed">Isolating selected bits and rebuilding your high-fidelity document.</p>
            
            <div className="w-full max-w-sm mt-12">
                <div className="progress-track bg-slate-800/50 h-3 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                    <motion.div 
                        className="progress-bar-fill h-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
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
