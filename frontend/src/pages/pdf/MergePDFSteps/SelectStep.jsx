import React from 'react';
import { motion } from 'framer-motion';
import { Combine, Clock, ShieldCheck, Zap, Sparkles, AlertCircle } from 'lucide-react';
import Button from '../../../components/Button';
import './SelectStep.css';

const SelectStep = ({ getRootProps, getInputProps, isDragActive, activeTool, pdfLoading, pdfError, open }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="select-step-container"
        >
            <div 
                className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} p-12`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-center group">
                    <div className="upload-icon-wrapper">
                        <Combine size={48} className="text-red-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Ready to Merge?</h3>
                    <p className="text-lg text-slate-400 mb-8 max-w-md">Drop your PDFs here or click to select from your device.</p>
                    <Button 
                        type="button" 
                        variant="primary" 
                        className="btn-premium-aura" 
                        style={{ backgroundColor: activeTool.color }}
                    >
                        Choose Files
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
                        <div className="feature-pill"><Clock size={16} /> <span>Fast Processing</span></div>
                        <div className="feature-pill"><ShieldCheck size={16} /> <span>100% Secure</span></div>
                        <div className="feature-pill"><Zap size={16} /> <span>Pro Tools</span></div>
                    </div>
                </div>
                {pdfLoading && (
                    <div className="loading-overlay">
                        <Sparkles className="w-16 h-16 text-red-500 animate-pulse mb-4" />
                        <p className="text-white font-black text-xl tracking-tight">Analyzing Documents...</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SelectStep;
