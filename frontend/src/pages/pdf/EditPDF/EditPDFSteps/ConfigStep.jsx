import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Settings2, PlayCircle, HardDrive, Zap } from 'lucide-react';
import Button from '../../../../components/Button';
import TextCustomizationPanel from './TextCustomizationPanel';
import EditSettingsHub from './EditSettingsHub';
import './EditCard.css';

const ConfigStep = ({ fileInfo, handleProcess, isProcessing, progress, reset, activeTool, customization, setCustomization }) => {
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="config-step-container edit-aura-config pt-8"
        >
            <div className="edit-file-summary-card">
                <FileText size={32} className="edit-file-icon" />
                <div className="edit-file-details">
                    <h4>{fileInfo.name}</h4>
                    <p>{fileInfo.size} • {fileInfo.type}</p>
                </div>
                <button className="edit-change-file-btn" onClick={reset} disabled={isProcessing}>
                    Change File
                </button>
            </div>

            <div className="edit-settings-panel">
                <div className="edit-settings-header">
                    <Settings2 size={20} />
                    <h3>{activeTool.name} Options</h3>
                </div>
                <div className="edit-settings-content">
                    <p className="text-slate-400">Apply {activeTool.name.toLowerCase()} securely inside your browser.</p>
                    <div className="flex gap-4 mt-4">
                       <span className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 py-1 px-3 rounded-full border border-white/10"><HardDrive size={14} className="text-amber-400"/> Offline Processing</span>
                        <span className="flex items-center gap-2 text-sm text-slate-300 bg-white/5 py-1 px-3 rounded-full border border-white/10"><Zap size={14} className="text-yellow-400"/> Instant Apply</span>
                    </div>
                </div>
                <TextCustomizationPanel 
                    activeTool={activeTool} 
                    customization={customization} 
                    setCustomization={setCustomization} 
                />
                
                <EditSettingsHub onApply={(s) => console.log('Edit settings applied:', s)} />
            </div>
            
            {fileInfo?.url && (
                <div className="edit-settings-panel mb-8 border-none bg-transparent">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText size={18} className="text-amber-400" />
                        <h4 className="text-white font-bold text-lg m-0">Document Preview</h4>
                    </div>
                    <iframe
                        src={`${fileInfo.url}#toolbar=0&navpanes=0`}
                        title="PDF Preview"
                        className="w-full h-[500px] rounded-xl border border-white/10 shadow-2xl bg-white/5"
                    />
                </div>
            )}

            <div className="edit-action-row">
                {isProcessing ? (
                    <div className="edit-processing-status">
                        <div className="edit-progress-bar-container">
                            <div className="edit-progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className="edit-progress-text">Applying Changes {progress}%</p>
                    </div>
                ) : (
                    <Button 
                        variant="primary" 
                        size="large" 
                        icon={<PlayCircle size={20} />} 
                        onClick={handleProcess}
                        className="edit-start-process-btn w-full justify-center py-4 text-lg"
                    >
                        Apply {activeTool.name}
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ConfigStep;
