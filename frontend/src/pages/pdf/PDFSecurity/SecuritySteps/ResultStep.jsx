import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, CheckCircle, RotateCcw } from 'lucide-react';
import Button from '../../../../components/Button';
import './SecurityCard.css';

const ResultStep = ({ resultData, activeTool, reset }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="result-step-container security-aura-result"
        >
            <div className="security-success-icon-container">
                <CheckCircle size={64} className="security-success-icon" />
                <div className="security-success-glow"></div>
            </div>
            
            <h2>Success!</h2>
            <p className="security-success-message">Your PDF has been processed perfectly with {activeTool.name}.</p>

            <div className="security-result-file-card">
                <div className="security-result-info">
                    <h4>{resultData.name}</h4>
                    <span>{resultData.size}</span>
                </div>
                <a 
                    href={resultData.url} 
                    download={resultData.name}
                    className="security-download-action"
                >
                    <FileDown size={24} />
                    Download PDF
                </a>
            </div>

            <div className="security-result-actions pt-8">
                <Button variant="outline" icon={<RotateCcw size={18} />} onClick={reset}>
                    Process Another File
                </Button>
            </div>
        </motion.div>
    );
};

export default ResultStep;
