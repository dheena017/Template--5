import React, { useState } from 'react'
import { 
  Languages, Video, Mic2, 
  Sparkles, History, Play, 
  Download, Globe, FileVideo, 
  Wand2, ShieldCheck, RefreshCw,
  Clock, CheckCircle2, MoreVertical
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/studio/Dubbing.css'

const Dubbing = () => {
    const [isDubbing, setIsDubbing] = useState(false)
    const [progress, setProgress] = useState(0)

    const targetLanguages = [
        { lang: 'English', icon: '🇺🇸', status: 'High Fidelity' },
        { lang: 'Spanish', icon: '🇪🇸', status: 'Natural Voice' },
        { lang: 'French', icon: '🇫🇷', status: 'Studio Quality' },
        { lang: 'German', icon: '🇩🇪', status: 'Premium' },
        { lang: 'Japanese', icon: '🇯🇵', status: 'Beta' }
    ]

    const handleDub = () => {
        setIsDubbing(true)
        let p = 0
        const interval = setInterval(() => {
            p += 1
            setProgress(p)
            if (p >= 100) {
                clearInterval(interval)
                setIsDubbing(false)
            }
        }, 80)
    }

    return (
        <div className="dubbing-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap dub-icon"><Languages size={32} /></div>
                    <div>
                        <h1>Video Dubbing AI</h1>
                        <p>Translate and dub your videos into 120+ languages while preserving the original voice characteristics.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><History size={18} /> Projects</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> Enterprise</button>
                </div>
            </header>

            <div className="dubbing-workflow glass-card">
                <div className="workflow-steps">
                    <div className="step active">
                        <div className="step-num">1</div>
                        <span>Upload Video</span>
                    </div>
                    <div className="step-line" />
                    <div className={`step ${progress > 0 ? 'active' : ''}`}>
                        <div className="step-num">2</div>
                        <span>Neural Translation</span>
                    </div>
                    <div className="step-line" />
                    <div className={`step ${progress === 100 ? 'active' : ''}`}>
                        <div className="step-num">3</div>
                        <span>Voice Synthesis</span>
                    </div>
                </div>

                <div className="dub-main-area">
                    <div className="upload-dropzone">
                        <div className="dropzone-content">
                            <motion.div 
                                className="icon-stack"
                                animate={isDubbing ? { rotateY: 360 } : {}}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            >
                                <FileVideo size={48} className="icon-blue" />
                                <Languages size={24} className="icon-overlay" />
                            </motion.div>
                            <h3>Select Video Material</h3>
                            <p>Drag and drop MP4, MOV, or AVI (Max 2GB)</p>
                            <button className="select-btn">Select File</button>
                        </div>
                    </div>

                    <div className="dubbing-options">
                        <div className="option-group">
                            <label>Target Language</label>
                            <div className="lang-grid">
                                {targetLanguages.map((l, i) => (
                                    <button key={i} className="lang-chip">
                                        <span className="flag">{l.icon}</span>
                                        <span className="name">{l.lang}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="option-group">
                            <label>Preservation Level</label>
                            <div className="toggle-row">
                                <div className="toggle-item active">
                                    <strong>Voice Clone</strong>
                                    <span>Same pitch & emotion</span>
                                </div>
                                <div className="toggle-item">
                                    <strong>Neutral</strong>
                                    <span>Clear studio clarity</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            className={`execute-dub-btn ${isDubbing ? 'running' : ''}`}
                            onClick={handleDub}
                            disabled={isDubbing}
                        >
                            {isDubbing ? (
                                <div className="progress-wrap">
                                    <span>Synthesizing neural paths... {progress}%</span>
                                    <div className="progress-bar"><div className="fill" style={{width: `${progress}%`}} /></div>
                                </div>
                            ) : (
                                <><Wand2 size={20} /> Generate Dubbed Video</>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="dub-recent-grid">
                <div className="recent-card glass-card">
                    <div className="card-top">
                        <div className="preview-sm">
                            <Play size={12} fill="currentColor" />
                        </div>
                        <div className="info">
                            <strong>Global Launch.mp4</strong>
                            <span>Dabbed to Spanish • 2m 40s</span>
                        </div>
                    </div>
                    <div className="card-footer">
                        <span className="status-success"><CheckCircle2 size={12} /> Ready</span>
                        <button className="icon-btn-sm"><Download size={14} /></button>
                    </div>
                </div>
                <div className="recent-card glass-card empty">
                    <Plus size={24} />
                    <span>Template Project</span>
                </div>
            </div>
        </div>
    )
}

const Plus = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
)

export default Dubbing





