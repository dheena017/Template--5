import React, { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Loader2, X, RotateCcw } from 'lucide-react';
import './VideoSettingsHub.css';

// Lazy load tool settings panels
const AVItoMP4Panel = lazy(() => import('./panels/AVItoMP4Panel'));
const MP4toAVIPanel = lazy(() => import('./panels/MP4toAVIPanel'));
const MKVtoMP4Panel = lazy(() => import('./panels/MKVtoMP4Panel'));
const MOVtoMP4Panel = lazy(() => import('./panels/MOVtoMP4Panel'));
const WMVtoMP4Panel = lazy(() => import('./panels/WMVtoMP4Panel'));
const AVItoMKVPanel = lazy(() => import('./panels/AVItoMKVPanel'));
const AVItoMOVPanel = lazy(() => import('./panels/AVItoMOVPanel'));
const AVItoWMVPanel = lazy(() => import('./panels/AVItoWMVPanel'));
const MKVtoAVIPanel = lazy(() => import('./panels/MKVtoAVIPanel'));
const MKVtoMOVPanel = lazy(() => import('./panels/MKVtoMOVPanel'));
const MKVtoWMVPanel = lazy(() => import('./panels/MKVtoWMVPanel'));
const MOVtoAVIPanel = lazy(() => import('./panels/MOVtoAVIPanel'));
const MOVtoMKVPanel = lazy(() => import('./panels/MOVtoMKVPanel'));
const MOVtoWMVPanel = lazy(() => import('./panels/MOVtoWMVPanel'));
const MP4toMKVPanel = lazy(() => import('./panels/MP4toMKVPanel'));
const MP4toMOVPanel = lazy(() => import('./panels/MP4toMOVPanel'));
const MP4toWMVPanel = lazy(() => import('./panels/MP4toWMVPanel'));
const WMVtoAVIPanel = lazy(() => import('./panels/WMVtoAVIPanel'));
const WMVtoMKVPanel = lazy(() => import('./panels/WMVtoMKVPanel'));

const PANEL_MAP = {
    'AVI to MP4': AVItoMP4Panel,
    'MP4 to AVI': MP4toAVIPanel,
    'MKV to MP4': MKVtoMP4Panel,
    'MOV to MP4': MOVtoMP4Panel,
    'WMV to MP4': WMVtoMP4Panel,
    'AVI to MKV': AVItoMKVPanel,
    'AVI to MOV': AVItoMOVPanel,
    'AVI to WMV': AVItoWMVPanel,
    'MKV to AVI': MKVtoAVIPanel,
    'MKV to MOV': MKVtoMOVPanel,
    'MKV to WMV': MKVtoWMVPanel,
    'MOV to AVI': MOVtoAVIPanel,
    'MOV to MKV': MOVtoMKVPanel,
    'MOV to WMV': MOVtoWMVPanel,
    'MP4 to MKV': MP4toMKVPanel,
    'MP4 to MOV': MP4toMOVPanel,
    'MP4 to WMV': MP4toWMVPanel,
    'WMV to AVI': WMVtoAVIPanel,
    'WMV to MKV': WMVtoMKVPanel
};

const VideoSettingsHub = ({ open, onClose, activeTool, settings, setSettings }) => {
    const Panel = PANEL_MAP[activeTool?.name] || null;

    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="video-settings-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="video-settings-panel"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="vsh-header">
                        <div className="vsh-title">
                            <Settings2 size={18} />
                            <h3>{activeTool?.name} Settings</h3>
                        </div>
                        <button className="vsh-close" onClick={onClose}><X size={18}/></button>
                    </div>

                    <div className="vsh-body">
                        <Suspense fallback={
                            <div className="vsh-loading">
                                <Loader2 className="animate-spin" />
                                <span>Loading Panel...</span>
                            </div>
                        }>
                            {Panel ? (
                                <Panel settings={settings} setSettings={setSettings} />
                            ) : (
                                <div className="vsh-empty">
                                    <p>No specific settings available for this tool.</p>
                                </div>
                            )}
                        </Suspense>
                    </div>

                    <div className="vsh-footer">
                        <button className="vsh-reset" onClick={() => setSettings({})}>
                            <RotateCcw size={14} /> Reset
                        </button>
                        <button className="vsh-apply" onClick={onClose}>
                            Apply Settings
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VideoSettingsHub;
