import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Settings2, PlayCircle, ShieldCheck, Lock, Info } from 'lucide-react';
import Button from '../../../../components/Button';
import './SecurityCard.css';

const ConfigStep = ({ fileInfo, handleProcess, isProcessing, progress, reset, activeTool }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="config-step-container security-aura-config pt-8"
            style={{ width: '100%', maxWidth: '800px' }}
        >
            <div className="security-file-summary-card">
                <FileText size={32} className="security-file-icon" />
                <div className="security-file-details">
                    <h4 style={{ margin: 0, color: 'white' }}>{fileInfo.name}</h4>
                    <p style={{ margin: '4px 0 0 0', color: '#94a3b8' }}>{fileInfo.size} • {fileInfo.type}</p>
                </div>
                <button className="security-change-file-btn" onClick={reset} disabled={isProcessing}>
                    Change File
                </button>
            </div>

            <div className="security-settings-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', marginBottom: '2rem' }}>
                <div className="security-settings-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#10b981', marginBottom: '1rem' }}>
                    <Settings2 size={20} />
                    <h3 style={{ margin: 0, color: 'white' }}>{activeTool.name} Options</h3>
                </div>
                <div className="security-settings-content">
                    <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.5 }}>
                        Powered by the Aura Security Engine. Processing is secured with 256-bit AES encryption.
                    </p>
                    <div className="flex gap-4 mt-4" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)' }}>
                           <ShieldCheck size={14} style={{ color: '#10b981' }}/> AES-256 Grade
                       </span>
                       <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.1)' }}>
                           <Lock size={14} style={{ color: '#10b981' }}/> Secure Tunnel
                       </span>
                    </div>
                </div>
            </div>

            {activeTool.name === 'Protect PDF' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', marginBottom: '2rem' }}>
                    <Info size={20} style={{ color: '#10b981' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#66bb6a' }}>
                        Don't forget to set your password in the <strong>Tool Settings</strong> (gear icon in the top right).
                    </p>
                </div>
            )}

            {fileInfo?.url && (
                <div className="security-preview-container" style={{ marginBottom: '2rem' }}>
                    <div className="flex items-center gap-2 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <FileText size={18} style={{ color: '#10b981' }} />
                        <h4 style={{ margin: 0, color: 'white', fontWeight: 700 }}>Document Preview</h4>
                    </div>
                    <iframe
                        src={`${fileInfo.url}#toolbar=0&navpanes=0`}
                        title="PDF Preview"
                        style={{ width: '100%', height: '500px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
                    />
                </div>
            )}

            <div className="security-action-row">
                {isProcessing ? (
                    <div className="security-processing-status" style={{ textAlign: 'center' }}>
                        <div className="security-progress-bar-container" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                            <div className="security-progress-bar" style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #34d399, #10b981)', transition: 'width 0.3s' }}></div>
                        </div>
                        <p className="security-progress-text" style={{ color: '#6ee7b7', fontWeight: 600 }}>Applying Security {progress}%</p>
                    </div>
                ) : (
                    <Button 
                        variant="primary" 
                        size="large" 
                        icon={<PlayCircle size={20} />} 
                        onClick={handleProcess}
                        className="security-start-process-btn"
                        style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}
                    >
                        Apply {activeTool.name}
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export default ConfigStep;
