import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Settings2, PlayCircle, ShieldCheck, Lock } from 'lucide-react';
import Button from '../../../../components/Button';
import './SecurityCard.css';

const ConfigStep = ({ fileInfo, handleProcess, isProcessing, progress, reset, activeTool }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="config-step-container security-aura-config pt-8"
        >
            <div className="security-file-summary-card">
                <FileText size={32} className="security-file-icon" />
                <div className="security-file-details">
                    <h4>{fileInfo.name}</h4>
                    <p>{fileInfo.size} • {fileInfo.type}</p>
                </div>
                <button className="security-change-file-btn" onClick={reset} disabled={isProcessing}>
                    Change File
                </button>
            </div>

            <div className="security-settings-panel">
                <div className="security-settings-header">
                    <Settings2 size={20} />
                    <h3>{activeTool.name} Options</h3>
                </div>
                <div className="security-settings-content">
                    <p className="text-slate-400">Apply {activeTool.name.toLowerCase()} completely offline. No files are uploaded to our servers.</p>
                    <div className="flex gap-4 mt-4">
                       <span className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 py-1 px-3 rounded-full border border-white/10"><ShieldCheck size={14} className="text-emerald-400"/> 256-bit AES Encryption</span>
                       <span className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 py-1 px-3 rounded-full border border-white/10"><Lock size={14} className="text-emerald-400"/> 100% Client-Side</span>
                    </div>
                </div>
            </div>

            {fileInfo?.url && (
                <div className="security-settings-panel mb-8 border-none bg-transparent">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText size={18} className="text-emerald-400" />
                        <h4 className="text-white font-bold text-lg m-0">Document Preview</h4>
                    </div>
                    <iframe
                        src={`${fileInfo.url}#toolbar=0&navpanes=0`}
                        title="PDF Preview"
                        className="w-full h-[500px] rounded-xl border border-white/10 shadow-2xl bg-white/5"
                    />
                </div>
            )}

            <div className="security-action-row">
                {isProcessing ? (
                    <div className="security-processing-status">
                        <div className="security-progress-bar-container">
                            <div className="security-progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="security-progress-text">Securing File {progress}%</p>
                    </div>
                ) : (
                    <Button 
                        variant="primary" 
                        size="large" 
                        icon={<PlayCircle size={20} />} 
                        onClick={handleProcess}
                        className="security-start-process-btn w-full justify-center py-4 text-lg"
                    >
                        Apply {activeTool.name}
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ConfigStep;
