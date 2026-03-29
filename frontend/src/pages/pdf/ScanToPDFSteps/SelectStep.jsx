import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Zap, ShieldCheck, Sparkles, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Button from '../../../components/Button';
import './SelectStep.css';

const SelectStep = ({ getRootProps, getInputProps, isDragActive, activeTool, error }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="select-step-container w-full"
        >
            <div 
                className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} p-12 border-dashed border-4 rounded-[48px]`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-center group">
                    <div className="upload-icon-wrapper p-8 bg-pink-500/10 rounded-[32px] mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-pink-900/10 border border-pink-500/20">
                        <Camera size={56} className="text-pink-500" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Convert Photos to PDF</h3>
                    <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">Turn your mobile captures and digital photos into professional, multi-page PDF documents instantly.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 mb-12">
                        <Button 
                            type="button" 
                            variant="primary" 
                            className="h-20 px-12 text-xl font-black uppercase tracking-widest transition-all active:scale-95 shadow-2xl" 
                            style={{ backgroundColor: activeTool.color }}
                        >
                            Upload Images
                        </Button>
                    </div>
                    
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold flex items-center gap-3 backdrop-blur-sm"
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    )}
                    
                    <div className="flex items-center gap-10 flex-wrap justify-center opacity-60">
                        <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                            <ImageIcon size={16} className="text-pink-500" /> <span>JPG / PNG / WEBP</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                            <ShieldCheck size={16} className="text-pink-500" /> <span>SECURE PROCESSING</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                            <Zap size={16} className="text-pink-500" /> <span>INSTANT EXPORT</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SelectStep;
