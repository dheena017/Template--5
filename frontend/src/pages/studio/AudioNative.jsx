import React, { useState } from 'react'
import { 
    Webhook, History, Play,
    Globe, ShieldCheck, Copy,
    Terminal, Maximize, Volume2, ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/studio/AudioNative.css'

const AudioNative = () => {
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState('Glass Light')

    const playerThemes = [
        { name: 'Glass Light', preview: '#f8fafc' },
        { name: 'Deep Cyber', preview: '#020617' },
        { name: 'Sunset Glow', preview: '#f59e0b' },
        { name: 'Neon Purple', preview: '#a855f7' }
    ]

    const [randomHeights] = useState(() => Array.from({ length: 20 }).map(() => Math.random() * 20 + 5))

    return (
        <div className="audio-native-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap native-icon"><Webhook size={32} /></div>
                    <div>
                        <h1>Audio Native Player</h1>
                        <p>Turn your articles and blog posts into auto-playing AI narratives with a sleek, embedded player.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><History size={18} /> Lab</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> API Mode</button>
                </div>
            </header>

            <div className="native-editor glass-card">
                <div className="editor-sidebar">
                    <section className="config-block">
                        <label>Player Theme</label>
                        <div className="theme-grid">
                            {playerThemes.map((theme, i) => (
                                <button 
                                    key={i} 
                                    className={`theme-chip ${selectedTheme === theme.name ? 'active' : ''}`}
                                    onClick={() => setSelectedTheme(theme.name)}
                                >
                                    <div className="theme-preview" style={{ background: theme.preview }} />
                                    <span>{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="config-block">
                        <label>AI Voice Persona</label>
                        <select className="premium-select">
                            <option>Neural Narrator (Global)</option>
                            <option>Studio Warm (Male)</option>
                            <option>Studio Clear (Female)</option>
                        </select>
                    </section>

                    <section className="config-block">
                        <label>Auto-Play</label>
                        <div className="toggle-switch">
                            <div className="t-on active">Enabled</div>
                            <div className="t-off">Disabled</div>
                        </div>
                    </section>
                </div>

                <div className="editor-main">
                    <div className="preview-label">Live Embedded Preview</div>
                    <div className="player-mockup">
                        <motion.div 
                            className="mock-player glass-card"
                            animate={isGenerating ? { opacity: 0.5 } : { opacity: 1 }}
                        >
                            <div className="p-icon"><Play size={24} fill="currentColor" /></div>
                            <div className="p-info">
                                <strong>The Future of AI Orchestration</strong>
                                <span>Article • 12 min listen</span>
                            </div>
                            <div className="p-wave">
                                {randomHeights.map((h, i) => (
                                    <div key={i} className="p-bar" style={{ height: `${h}px` }} />
                                ))}
                            </div>
                            <div className="p-actions">
                                <Maximize size={16} />
                                <Volume2 size={16} />
                            </div>
                        </motion.div>
                    </div>

                    <div className="embed-code-area">
                        <div className="code-header">
                            <span><Terminal size={14} /> Embed Script</span>
                            <button className="copy-btn"><Copy size={14} /> Copy Code</button>
                        </div>
                        <div className="code-block">
                            <pre>
                                {`<script src="https://textai.com/native/player.js"></script>
<div id="textai-audio-native" 
  data-project="p_550e8400"
  data-theme="${selectedTheme.toLowerCase().replace(' ', '-')}"
  data-voice="neural-narrator">
</div>`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            <div className="integration-promo glass-card">
                <Globe size={40} className="globe-icon" />
                <div className="promo-text">
                    <h3>One-Click CMS Integration</h3>
                    <p>Native plugins available for WordPress, Ghost, and Substack. Sync your entire library automatically.</p>
                </div>
                <button className="white-btn">Explore Plugins <ArrowRight size={18} /></button>
            </div>
        </div>
    )
}

export default AudioNative





