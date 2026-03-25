import React, { useState } from 'react'
import { 
  Zap, Volume2, Search, 
  Sparkles, History, HardDrive, 
  Download, Play, Wand2, 
  Music, Radio, Mic2, 
  ShieldCheck, RefreshCw, 
  MoreVertical, Heart, Filter,
  Layers, Volume
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/speech/SoundEffects.css'

const SoundEffects = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const [isGenerating, setIsGenerating] = useState(false)
    const [prompt, setPrompt] = useState('')

    const categories = [
        { name: 'All', icon: <Layers size={16} /> },
        { name: 'Nature', icon: <Sparkles size={16} /> },
        { name: 'Urban', icon: <Radio size={16} /> },
        { name: 'Cinematic', icon: <Music size={16} /> },
        { name: 'Tech', icon: <Zap size={16} /> }
    ]

    const soundResults = [
        { id: 1, name: 'Deep Space Rumble', duration: '12s', category: 'Cinematic', complexity: 'High' },
        { id: 2, name: 'Rain on Tin Roof', duration: '8s', category: 'Nature', complexity: 'Normal' },
        { id: 3, name: 'Sci-fi Computer Beep', duration: '2s', category: 'Tech', complexity: 'Low' },
        { id: 4, name: 'Busy City Ambient', duration: '30s', category: 'Urban', complexity: 'Normal' }
    ]

    const handleGenerate = () => {
        setIsGenerating(true)
        setTimeout(() => setIsGenerating(false), 3000)
    }

    return (
        <div className="sfx-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap sfx-icon"><Zap size={32} /></div>
                    <div>
                        <h1>AI Sound Effects</h1>
                        <p>Generate high-fidelity foley and atmospheric textures from simple text descriptions.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><History size={18} /> Library</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> Unlimited</button>
                </div>
            </header>

            <div className="sfx-generator-box glass-card">
                <div className="gen-input-area">
                    <div className="gen-icon-wrap">
                        <motion.div 
                            animate={isGenerating ? { rotate: 360 } : {}}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        >
                            <Sparkles size={24} className="sparkle-burn" />
                        </motion.div>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Describe the sound (e.g., 'Heavy rain hitting a car window with thunder in the distance')..." 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button 
                        className={`gen-btn ${isGenerating ? 'loading' : ''}`}
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? 'Synthesizing...' : <><Wand2 size={20} /> Generate</>}
                    </button>
                </div>
                <div className="gen-suggestions">
                    <span>Try:</span>
                    <button className="suggest-chip">Hyperdrive Failure</button>
                    <button className="suggest-chip">Tavern Chatter</button>
                    <button className="suggest-chip">Mecha Footsteps</button>
                </div>
            </div>

            <div className="sfx-layout">
                <aside className="sfx-sidebar">
                    <div className="sidebar-section">
                        <h3>Categories</h3>
                        <div className="category-list">
                            {categories.map((cat, i) => (
                                <button 
                                    key={i} 
                                    className={`cat-btn ${activeCategory === cat.name ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.name)}
                                >
                                    {cat.icon}
                                    <span>{cat.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h3>Audio Settings</h3>
                        <div className="settings-stack">
                            <div className="setting-row">
                                <label>Sample Rate</label>
                                <select className="mini-select">
                                    <option>48.0 kHz</option>
                                    <option>44.1 kHz</option>
                                    <option>96.0 kHz</option>
                                </select>
                            </div>
                            <div className="setting-row">
                                <label>Bit Depth</label>
                                <select className="mini-select">
                                    <option>24-bit PCM</option>
                                    <option>16-bit PCM</option>
                                    <option>32-bit Float</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="sfx-main-grid">
                    <div className="results-header">
                        <h3>Recent Generations</h3>
                        <div className="results-controls">
                            <button className="icon-btn-sm"><Filter size={16} /></button>
                            <button className="icon-btn-sm"><RefreshCw size={16} /></button>
                        </div>
                    </div>

                    <div className="results-list">
                        {soundResults.map(s => (
                            <motion.div 
                                key={s.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="sfx-result-card glass-card"
                            >
                                <div className="result-play-area">
                                    <div className="mini-play-btn"><Play size={16} fill="currentColor" /></div>
                                    <div className="mini-wave">
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className="m-wave-bar" style={{ height: `${Math.random() * 20 + 5}px` }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="result-details">
                                    <div className="r-top">
                                        <strong>{s.name}</strong>
                                        <span className={`c-tag ${s.category.toLowerCase()}`}>{s.category}</span>
                                    </div>
                                    <div className="r-footer">
                                        <span>{s.duration} • {s.complexity}</span>
                                        <div className="r-actions">
                                            <button className="r-action"><Heart size={14} /></button>
                                            <button className="r-action"><Download size={14} /></button>
                                            <button className="r-action"><MoreVertical size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SoundEffects





