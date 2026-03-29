import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Clock, ShieldCheck, Zap, Sparkles, AlertCircle } from 'lucide-react';
import Button from '../../../components/Button';
import './SelectStep.css';

const SelectStep = ({ getRootProps, getInputProps, isDragActive, activeTool, pdfLoading, pdfError }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="select-step-container w-full"
        >
            <div 
                className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} p-12`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-center group">
                    <div className="upload-icon-wrapper">
                        <Scissors size={48} style={{ color: activeTool.color }} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Ready to Split?</h3>
                    <p className="text-lg text-slate-400 mb-8 max-w-md">Drop your PDF here or click to select from your device.</p>
                    <Button 
                        type="button" 
                        variant="primary" 
                        className="btn-premium-aura" 
                        style={{ backgroundColor: activeTool.color }}
                    >
                        Choose File
                    </Button>
                    
                    {pdfError && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold flex items-center gap-3 backdrop-blur-sm"
                        >
                            <AlertCircle size={18} />
                            {pdfError}
                        </motion.div>
                    )}
                    
                    <div className="feature-pill-wrapper">
                        <div className="feature-pill"><Clock size={16} /> <span>Split Pages</span></div>
                        <div className="feature-pill"><ShieldCheck size={16} /> <span>Serverless</span></div>
                        <div className="feature-pill"><Zap size={16} /> <span>High Precision</span></div>
                    </div>
                </div>
                {pdfLoading && (
                    <div className="loading-overlay">
                        <Sparkles className="w-16 h-16 animate-pulse mb-4" style={{ color: activeTool.color }} />
                        <p className="text-white font-black text-xl tracking-tight">Analyzing Document...</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SelectStep;
