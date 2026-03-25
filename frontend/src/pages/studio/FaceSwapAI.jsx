import React, { useState } from 'react'
import { 
  User, Image, Video, 
  Sparkles, History, Play, 
  Download, Wand2, ShieldCheck, 
  RefreshCw, CheckCircle2, 
  MoreVertical, Upload, 
  Layers, Zap, ArrowRight,
  Camera, Smile, Heart,
  Settings, Sliders, Info,
  Filter, Repeat, UserPlus, ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/studio/FaceSwapAI.css'

const FaceSwapAI = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [swapMode, setSwapMode] = useState('Face in Photo')

    const modes = [
        { name: 'Face in Photo', icon: <Image size={18} />, color: '#3b82f6' },
        { name: 'Face in Video', icon: <Video size={18} />, color: '#ec4899' },
        { name: 'Multiple Faces', icon: <UserPlus size={18} />, color: '#10b981' }
    ]

    const handleSwap = () => {
        setIsProcessing(true)
        let p = 0
        const interval = setInterval(() => {
            p += 2
            setProgress(p)
            if (p >= 100) {
                clearInterval(interval)
                setIsProcessing(false)
            }
        }, 60)
    }

    return (
        <div className="faceswap-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap swap-icon"><Repeat size={32} /></div>
                    <div>
                        <h1>Face Swap AI</h1>
                        <p>High-fidelity face replacement for photos and videos with seamless neural blending.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><History size={18} /> Gallery</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> Ultra Quality</button>
                </div>
            </header>

            <div className="swap-lab-layout">
                <div className="lab-main glass-card">
                    <div className="swap-mode-selector">
                        {modes.map((mode, i) => (
                            <button 
                                key={i} 
                                className={`mode-btn ${swapMode === mode.name ? 'active' : ''}`}
                                onClick={() => setSwapMode(mode.name)}
                            >
                                <div className="mode-icon" style={{ color: mode.color }}>{mode.icon}</div>
                                <span>{mode.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="source-target-setup">
                        <div className="setup-box">
                            <div className="setup-label"><span>1</span> Original Subject</div>
                            <div className="upload-placeholder">
                                <Upload size={32} />
                                <strong>Source Asset</strong>
                                <span>Upload photo/video</span>
                            </div>
                        </div>

                        <div className="setup-connector">
                            <ArrowRight size={24} />
                        </div>

                        <div className="setup-box">
                            <div className="setup-label"><span>2</span> Target Face</div>
                            <div className="upload-placeholder">
                                <Smile size={32} />
                                <strong>Reference Face</strong>
                                <span>Clear, front-facing</span>
                            </div>
                        </div>
                    </div>

                    <div className="engine-settings">
                        <h3><Settings size={18} /> Engine Parameters</h3>
                        <div className="settings-grid">
                            <div className="setting-item">
                                <label>Neural Blending <span>Deep</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                            <div className="setting-item">
                                <label>Skin Texture Matching <span>High</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                            <div className="setting-item">
                                <label>Lighting Consistency <span>On</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                            <div className="setting-item">
                                <label>Resolution Upscaling <span>4K</span></label>
                                <input type="range" className="premium-range" />
                            </div>
                        </div>
                    </div>

                    <div className="lab-footer">
                        <div className="cost-tag">
                            <span>Credits: <strong>20</strong></span>
                            <span>Speed: <strong>~25s</strong></span>
                        </div>
                        <button 
                            className={`swap-btn ${isProcessing ? 'processing' : ''}`}
                            onClick={handleSwap}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <div className="processing-wrap">
                                    <span>Mapping facial landmarks... {progress}%</span>
                                    <div className="p-bar"><div className="fill" style={{ width: `${progress}%` }} /></div>
                                </div>
                            ) : (
                                <><Wand2 size={20} /> Execute Face Swap</>
                            )}
                        </button>
                    </div>
                </div>

                <div className="lab-sidebar">
                    <div className="pro-card glass-card">
                        <div className="pro-head">
                            <Sparkles size={24} className="icon-burn" />
                            <h3>Magic Faces</h3>
                        </div>
                        <p>Try these curated faces for professional studio results.</p>
                        <div className="face-library">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="face-circle">
                                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="AI Face" />
                                </div>
                            ))}
                        </div>
                        <button className="pro-btn">Explore Library <ChevronRight size={16} /></button>
                    </div>

                    <div className="info-card glass-card">
                        <div className="info-head"><Info size={16} /> Best Results</div>
                        <ul>
                            <li><strong>High resolution</strong> images only</li>
                            <li><strong>Unified lighting</strong> conditions</li>
                            <li><strong>Front-facing</strong> orientation</li>
                            <li><strong>Clear skin</strong> visibility</li>
                        </ul>
                    </div>
                </div>
            </div>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="recent-swaps-section"
            >
                <div className="section-header">
                    <h2>Recent Creations</h2>
                    <button className="text-btn">View All <ChevronRight size={16} /></button>
                </div>
                <div className="swaps-grid">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="swap-result-card glass-card shimmer-effect">
                            <div className="result-img-wrap">
                                <img src={`https://images.unsplash.com/photo-${1500000000000 + item * 100000}?auto=format&fit=crop&q=80&w=300`} alt="Swap Result" />
                                <div className="result-overlay">
                                    <button className="icon-btn-glass"><Download size={18} /></button>
                                    <button className="icon-btn-glass"><Heart size={18} /></button>
                                </div>
                            </div>
                            <div className="result-info">
                                <strong>Studio Quality #{item + 104}</strong>
                                <span>2 mins ago</span>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default FaceSwapAI





