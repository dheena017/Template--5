import React from 'react';
import { motion } from 'framer-motion';

const UploadStep = ({ getRootProps, getInputProps, isDragActive, activeTool }) => {
    return (
        <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="tool-upload-center text-center py-20"
        >
            <div className="mb-12">
                <div className="w-24 h-24 bg-pink-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <activeTool.icon size={48} className="text-pink-500" />
                </div>
                <h1 className="text-4xl font-black text-white mb-4 tracking-tight">{activeTool.name}</h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                    Convert scanned documents into editable, searchable text using Neural Intelligence OCR technology.
                </p>
            </div>

            <div {...getRootProps()} className={`upload-dropzone max-w-2xl mx-auto ${isDragActive ? 'drag-active' : ''}`}>
                <input {...getInputProps()} />
                <div className="p-12">
                    <button type="button" className="primary-upload-btn mb-6" style={{ backgroundColor: activeTool.color }}>
                        Select PDF File
                    </button>
                    <p className="text-slate-500 font-medium tracking-wide">or drop file here</p>
                </div>
            </div>
        </motion.div>
    );
};

export default UploadStep;
