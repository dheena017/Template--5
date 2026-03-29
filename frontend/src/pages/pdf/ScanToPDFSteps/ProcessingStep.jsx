import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Camera } from 'lucide-react';
import './ProcessingStep.css';

const ProcessingStep = ({ progress, activeTool }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="processing-step-wrapper w-full"
        >
            <div className="processing-animation-container p-12 bg-pink-500/10 rounded-[64px] border border-pink-500/20 mb-16 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-pink-500/10 to-transparent animate-pulse" />
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="spinner-outer"
                    style={{ borderTopColor: activeTool.color }}
                />
                <div className="spinner-inner relative z-10 transition-transform group-hover:scale-110 duration-700">
                    <FileText size={72} className="animate-pulse text-pink-500" style={{ color: activeTool.color }} />
                    <Camera size={24} className="absolute -top-2 -right-2 text-white bg-pink-600 p-1 rounded-full shadow-2xl" />
                </div>
            </div>
            
            <h3 className="processing-status-label text-5xl font-black text-pink-500 uppercase tracking-tighter" style={{ color: activeTool.color }}>Bitstream Synthesis</h3>
            <p className="processing-description text-slate-400 max-w-lg mx-auto text-xl leading-relaxed mt-4">Compressing pixels into a high-fidelity PDF architecture and rebuilding document layers with absolute precision.</p>
            
            <div className="w-full max-w-md mt-16 px-6">
                <div className="progress-track bg-slate-900/60 h-4 rounded-full overflow-hidden border border-white/5 backdrop-blur-3xl shadow-inner">
                    <motion.div 
                        className="progress-bar-fill h-full shadow-[0_0_30px_rgba(236,72,153,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ backgroundColor: activeTool.color }}
                    />
                </div>
                <div className="mt-8 text-center">
                    <span className="progress-percentage text-5xl font-black text-white">{progress}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProcessingStep;
