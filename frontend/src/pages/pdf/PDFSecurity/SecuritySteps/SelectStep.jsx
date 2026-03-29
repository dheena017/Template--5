import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileText } from 'lucide-react';
import Button from '../../../../components/Button';
import './SecurityCard.css';

const SelectStep = ({ getRootProps, getInputProps, isDragActive, activeTool }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="select-step-container security-aura-upload"
        >
            <div 
                {...getRootProps()} 
                className={`security-drop-area ${isDragActive ? 'drag-active' : ''}`}
            >
                <input {...getInputProps()} />
                <div className="security-upload-visual">
                    <div className="security-glow-ring"></div>
                    <FileUp size={48} className="security-upload-icon-main" />
                    <FileText size={24} className="security-file-icon-badge" />
                </div>
                <h3>{isDragActive ? "Drop PDF Here" : `Upload your PDF for ${activeTool.name}`}</h3>
                <p>Drag and drop, or click to browse files</p>
                <Button variant="primary" icon="📂" className="security-browse-btn">
                    Select PDF File
                </Button>
                <div className="security-format-badges">
                    <span className="security-badge">.PDF</span>
                </div>
            </div>
        </motion.div>
    );
};

export default SelectStep;
