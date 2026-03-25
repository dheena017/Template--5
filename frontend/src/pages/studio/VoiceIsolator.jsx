import React, { useState } from 'react'
import { 
  AudioWaveform, Wand2, Upload, 
  Sparkles, Play, Download, 
  History, Music, Mic2, 
  ShieldCheck, RefreshCw, 
  Volume2, VolumeX, Layers,
  ChevronRight, ArrowRight, Zap,
  Info, CheckCircle2, MoreVertical, Settings
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/studio/VoiceIsolator.css'

const VoiceIsolator = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isolationMode, setIsolationMode] = useState('Vocal Only')

    const isolationModes = [
        { name: 'Vocal Only', desc: 'Remove all background noise and music.', icon: <Mic2 size={18} />, color: '#6366f1' },
        { name: 'Music Only', desc: 'Isolate backtrack (Karaoke mode).', icon: <Music size={18} />, color: '#ec4899' },
        { name: 'Clean Environment', desc: 'Remove hum, hiss, and ambient static.', icon: <RefreshCw size={14} />, color: '#10b981' }
    ]

    const [waveHeightsOriginal] = useState(() => Array.from({ length: 40 }).map(() => Math.random() * 30 + 10))
    const [waveHeightsIsolated] = useState(() => Array.from({ length: 40 }).map(() => Math.random() * 30 + 5))

    const handleProcess = () => {
        setIsProcessing(true)
        let p = 0
        const interval = setInterval(() => {
            p += 4
            setProgress(p)
            if (p >= 100) {
                clearInterval(interval)
                setIsProcessing(false)
            }
        }, 120)
    }

    return (
        <div className="isolator-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap iso-icon"><AudioWaveform size={32} /></div>
                    <div>
                        <h1>Voice Isolator AI</h1>
                        <p>Extract studio-quality vocals from any audio recording using advanced neural stem separation.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><History size={18} /> History</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> Pro Mode</button>
                </div>
            </header>

            <div className="tool-grid">
                <div className="main-lab">
                    <div className="upload-section glass-card">
                        <div className="upload-ui">
                            <motion.div 
                                animate={isProcessing ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="upload-icon-pulse iso-pulse"
                            >
                                <Upload size={40} />
                            </motion.div>
                            <h3>Source Audio Input</h3>
                            <p>WAV, AIFF, or MP3 (Unlimited Duration for Pro)</p>
                            <button className="browse-btn">Upload File</button>
                        </div>
                    </div>

                    <div className="stats-box glass-card">
                        <div className="s-item">
                            <div className="s-v">Neural Stems</div>
                            <div className="s-l">Version 4.2</div>
                        </div>
                        <div className="divider" />
                        <div className="s-item">
                            <div className="s-v">Artifact Suppression</div>
                            <div className="s-l">Active / 98% Clear</div>
                        </div>
                        <div className="divider" />
                        <div className="s-item">
                            <div className="s-v">Engine Load</div>
                            <div className="s-l">Light (8ms Latency)</div>
                        </div>
                    </div>

                    <div className="wave-comparison glass-card">
                        <div className="wave-track">
                            <div className="track-info"><span><Volume2 size={14} /> Original Signal</span></div>
                            <div className="wave-viz">
                                {waveHeightsOriginal.map((h, i) => (
                                    <div key={i} className="w-bar orange" style={{ height: `${h}px` }} />
                                ))}
                            </div>
                        </div>
                        <div className="track-sep" />
                        <div className="wave-track">
                            <div className="track-info"><span><Mic2 size={14} /> Isolated Output</span></div>
                            <div className="wave-viz">
                                {waveHeightsIsolated.map((h, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="w-bar blue" 
                                        animate={isProcessing ? { height: [5, 40, 5] } : {}}
                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                                        style={{ height: `${h}px` }} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="side-panel">
                    <div className="action-card glass-card">
                        <div className="isolation-options">
                            <label>Separation Strategy</label>
                            <div className="iso-list">
                                {isolationModes.map((mode, i) => (
                                    <button 
                                        key={i} 
                                        className={`iso-btn ${isolationMode === mode.name ? 'active' : ''}`}
                                        onClick={() => setIsolationMode(mode.name)}
                                    >
                                        <div className="icon-p" style={{ color: mode.color }}>{mode.icon}</div>
                                        <div className="info-p">
                                            <strong>{mode.name}</strong>
                                            <span>{mode.desc}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="process-footer">
                            <div className="cost-info">
                                <span>Estimated Time: <strong>~18s</strong></span>
                                <span>Tokens: <strong>12</strong></span>
                            </div>
                            <button 
                                className={`iso-trigger-btn ${isProcessing ? 'running' : ''}`}
                                onClick={handleProcess}
                                disabled={isProcessing}
                            >
                                {isProcessing ? (
                                    <div className="loader-p">
                                        <span>Synthesizing Stems... {progress}%</span>
                                        <div className="p-bar"><div className="fill" style={{ width: `${progress}%` }} /></div>
                                    </div>
                                ) : (
                                    <><Zap size={18} fill="currentColor" /> Isolate Neural Signals</>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="download-card glass-card">
                        <div className="d-head">
                            <h3>Export Output</h3>
                            <button className="icon-btn-sm"><Settings size={14} /></button>
                        </div>
                        <div className="d-options">
                            <button className="d-btn active">Isolated Vocal (.wav)</button>
                            <button className="d-btn">Backing Track (.wav)</button>
                            <button className="d-btn">Environment Pass (.mp3)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoiceIsolator





