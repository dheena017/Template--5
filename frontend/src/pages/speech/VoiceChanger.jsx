import React, { useState } from 'react'
import { 
  Mic2, Volume2, Upload, 
  Sparkles, Play, Download, 
  Settings, Sliders, AudioWaveform,
  Zap, History, Wand2, 
  ShieldCheck, RefreshCw,
  MoreVertical, Heart
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/speech/VoiceChanger.css'

const VoiceChanger = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [selectedVoice, setSelectedVoice] = useState('Studio Deep')

    const voicePresets = [
        { name: 'Studio Deep', desc: 'Authoritative and resonant.', icon: <Volume2 size={16} />, color: '#6366f1' },
        { name: 'Neural Robot', desc: 'Precision synthetic modulation.', icon: <Zap size={16} />, color: '#ec4899' },
        { name: 'Smooth Jazz', desc: 'Warm and velvety textures.', icon: <Heart size={16} />, color: '#f59e0b' },
        { name: 'Ultra High', desc: 'Crisp and energetic response.', icon: <Sparkles size={16} />, color: '#10b981' }
    ]

    const handleProcess = () => {
        setIsProcessing(true)
        let p = 0
        const interval = setInterval(() => {
            p += 2
            setProgress(p)
            if (p >= 100) {
                clearInterval(interval)
                setIsProcessing(false)
            }
        }, 50)
    }

    return (
        <div className="voice-changer-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap"><Mic2 size={32} /></div>
                    <div>
                        <h1>AI Voice Changer</h1>
                        <p>Change your voice into any persona or accent using our neural synthesis engine.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><History size={18} /> History</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> Go Enterprise</button>
                </div>
            </header>

            <div className="tool-grid">
                <div className="main-lab">
                    <div className="upload-section glass-card">
                        <div className="upload-ui">
                            <motion.div 
                                animate={isProcessing ? { scale: [1, 1.05, 1] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="upload-icon-pulse"
                            >
                                <Upload size={40} />
                            </motion.div>
                            <h3>Upload Audio Source</h3>
                            <p>MP3, WAV, or Ogg up to 250MB</p>
                            <button className="browse-btn">Browse Files</button>
                        </div>
                    </div>

                    <div className="controls-section glass-card">
                        <div className="section-title">
                            <h3><Sliders size={18} /> Modulation Controls</h3>
                            <button className="reset-btn"><RefreshCw size={14} /> Reset</button>
                        </div>
                        <div className="sliders-grid">
                            <div className="slider-item">
                                <label>Pitch Shift <span>+4.2 st</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                            <div className="slider-item">
                                <label>Formant Preservation <span>85%</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                            <div className="slider-item">
                                <label>Noise Gate <span>-24 dB</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                            <div className="slider-item">
                                <label>Neural Smoothing <span>High</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                        </div>
                    </div>

                    <div className="preview-section glass-card">
                        <div className="preview-header">
                            <h3><AudioWaveform size={18} /> Output Waveform</h3>
                            <div className="playback-controls">
                                <button className="play-btn-large"><Play size={20} fill="currentColor" /></button>
                                <button className="download-btn-premium"><Download size={18} /> Download</button>
                            </div>
                        </div>
                        <div className="waveform-viz">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.div 
                                    key={i} 
                                    className="wave-bar"
                                    animate={isProcessing ? { height: [10, 40, 10] } : {}}
                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.05 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="side-presets">
                    <div className="process-box glass-card">
                        <div className="token-info">
                            <div className="token-row">
                                <span>Credits Required</span>
                                <strong>15 Credits</strong>
                            </div>
                            <div className="token-row">
                                <span>Time Estimate</span>
                                <strong>~12 seconds</strong>
                            </div>
                        </div>
                        <button 
                            className={`transform-btn ${isProcessing ? 'processing' : ''}`}
                            onClick={handleProcess}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>Processing {progress}%</>
                            ) : (
                                <><Wand2 size={20} /> Transform Voice</>
                            )}
                        </button>
                    </div>

                    <div className="presets-box glass-card">
                        <h3>Voice Presets</h3>
                        <div className="presets-list">
                            {voicePresets.map((voice, i) => (
                                <button 
                                    key={i} 
                                    className={`voice-preset-card ${selectedVoice === voice.name ? 'active' : ''}`}
                                    onClick={() => setSelectedVoice(voice.name)}
                                >
                                    <div className="v-icon" style={{ background: voice.color }}>
                                        {voice.icon}
                                    </div>
                                    <div className="v-details">
                                        <strong>{voice.name}</strong>
                                        <span>{voice.desc}</span>
                                    </div>
                                    <div className="v-select-indicator" />
                                </button>
                            ))}
                        </div>
                        <button className="add-custom-voice">
                            <Plus size={18} /> Train Custom Voice
                        </button>
                    </div>
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

export default VoiceChanger





