import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download, RotateCcw, FileText } from 'lucide-react';
import Button from '../../../components/Button';
import './DownloadStep.css';

const DownloadStep = ({ downloadFinal, resetTool, mergedFileName }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="download-step-wrapper"
        >
            <div className="success-icon-wrapper">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                >
                    <Check size={48} className="text-green-500" />
                </motion.div>
            </div>
            
            <h3 className="success-title">Fusion Complete!</h3>
            <p className="success-description">Your PDFs have been successfully merged into a single document.</p>
            
            <div className="action-buttons-grid">
                <Button 
                    onClick={downloadFinal}
                    className="flex-1 h-16 text-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-900/20"
                    style={{ backgroundColor: '#22c55e' }}
                >
                    <Download size={24} /> Download PDF
                </Button>
                <Button 
                    onClick={resetTool}
                    variant="secondary"
                    className="px-8 h-16 text-lg flex items-center justify-center gap-3 transition-all border border-slate-700"
                >
                    <RotateCcw size={20} /> Start Over
                </Button>
            </div>
            
            <div className="file-final-card">
                <div className="file-meta-container">
                    <div className="file-final-icon">
                        <FileText size={28} />
                    </div>
                    <div className="file-final-details">
                        <span className="file-final-name">{mergedFileName}</span>
                        <span className="file-final-status">Ready for pickup</span>
                    </div>
                </div>
                <button onClick={downloadFinal} className="file-download-btn-mini">
                    <Download size={24} />
                </button>
            </div>
            <div className="next-tasks-suggestion">
                <p className="nt-label">WHAT'S NEXT?</p>
                <div className="nt-grid">
                    <div className="nt-card" onClick={() => resetTool()}>
                        <div className="nt-icon" style={{ background: '#43a04715', color: '#43a047' }}>
                            <Check size={16} />
                        </div>
                        <div className="nt-info">
                            <span className="nt-title">Compress PDF</span>
                            <span className="nt-desc">Reduce file size without losing quality</span>
                        </div>
                    </div>
                    <div className="nt-card" onClick={() => resetTool()}>
                        <div className="nt-icon" style={{ background: '#8b5cf615', color: '#8b5cf6' }}>
                            <FileText size={16} />
                        </div>
                        <div className="nt-info">
                            <span className="nt-title">Protect PDF</span>
                            <span className="nt-desc">Add a password to your document</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DownloadStep;
