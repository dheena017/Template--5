import React from 'react';
import { motion } from 'framer-motion';
import { Film, Clock, ShieldCheck, Zap } from 'lucide-react';
import Button from '../../../../components/Button';
import './SelectStep.css';
import './VideoCard.css';

const SelectStep = ({ getRootProps, getInputProps, isDragActive, activeTool, fromFormat, toFormat }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="select-step-container w-full video-conversion-card"
        >
            <div 
                className={`upload-dropzone ${isDragActive ? 'drag-active' : ''} p-12`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-center group">
                    <div className="upload-icon-wrapper">
                        <Film size={48} style={{ color: activeTool.color }} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">{fromFormat} to {toFormat}</h3>
                    <p className="text-lg text-slate-400 mb-8 max-w-md">Drop your {fromFormat} video here or click to select from your device.</p>
                    <Button 
                        type="button" 
                        variant="primary" 
                        className="btn-premium-aura" 
                        style={{ backgroundColor: activeTool.color }}
                    >
                        Choose {fromFormat} File
                    </Button>
                    
                    <div className="feature-pill-wrapper">
                        <div className="feature-pill"><Clock size={16} /> <span>Fast Conversion</span></div>
                        <div className="feature-pill"><ShieldCheck size={16} /> <span>Secure</span></div>
                        <div className="feature-pill"><Zap size={16} /> <span>High Quality</span></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SelectStep;
