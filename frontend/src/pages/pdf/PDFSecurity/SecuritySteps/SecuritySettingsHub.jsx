import React, { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Loader2, X, RotateCcw } from 'lucide-react';
import '../../VideoConversion/VideoConversionSteps/VideoSettingsHub.css'; // Reuse CSS

const GenericSecurityPanel = lazy(() => import('./panels/GenericSecurityPanel'));

const SecuritySettingsHub = ({ open, onClose, activeTool, settings, setSettings }) => {

    if (!open) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="video-settings-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{ zIndex: 1000, position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            >
                <motion.div
                    className="video-settings-panel"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '400px', background: '#0f172a', borderLeft: '1px solid rgba(255,255,255,0.1)', padding: '2rem' }}
                >
                    <div className="vsh-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div className="vsh-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                            <Settings2 size={18} />
                            <h3 style={{ margin: 0, color: 'white' }}>{activeTool?.name} Settings</h3>
                        </div>
                        <button className="vsh-close" onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={18} /></button>
                    </div>

                    <div className="vsh-body" style={{ flex: 1, overflowY: 'auto' }}>
                        <Suspense fallback={
                            <div className="vsh-loading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '1rem', color: '#64748b' }}>
                                <Loader2 className="animate-spin" />
                                <span>Loading Panel...</span>
                            </div>
                        }>
                            <GenericSecurityPanel settings={settings} setSettings={setSettings} activeTool={activeTool} />
                        </Suspense>
                    </div>

                    <div className="vsh-footer" style={{ marginTop: 'auto', display: 'flex', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <button className="vsh-reset" onClick={() => setSettings({})} style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <RotateCcw size={14} /> Reset
                        </button>
                        <button className="vsh-apply" onClick={onClose} style={{ flex: 2, padding: '0.75rem', borderRadius: '12px', background: '#10b981', border: 'none', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                            Apply Settings
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SecuritySettingsHub;
