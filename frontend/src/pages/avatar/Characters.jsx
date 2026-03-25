import React, { useState } from 'react'
import { 
  Bot, Plus, Search, 
  User, Sparkles, Filter, 
  MoreVertical, ShieldCheck, 
  Volume2, Eye, Trash2, Edit2,
  BadgeCheck, Settings
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/avatar/Characters.css'

const Characters = () => {
    const [activeTab, setActiveTab] = useState('all')

    const characters = [
        {
            id: 1,
            name: 'Nova',
            role: 'Professional / Tech',
            voice: 'en-US-Aria',
            status: 'Ready',
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
            verified: true
        },
        {
            id: 2,
            name: 'Marcus',
            role: 'Corporate / Trust',
            voice: 'en-US-Marcus',
            status: 'Training',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
            verified: true
        },
        {
            id: 3,
            name: 'Skylar',
            role: 'Friendly / Casual',
            voice: 'en-GB-Skylar',
            status: 'Ready',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
            verified: false
        }
    ]

    return (
        <div className="characters-container">
            <header className="char-header">
                <div className="title-section">
                    <h1><Bot size={28} /> Character Vault</h1>
                    <p>Manage your AI avatars and custom-trained digital personas.</p>
                </div>
                <div className="char-actions">
                    <button className="primary-btn"><Plus size={18} /> Create Character</button>
                </div>
            </header>

            <div className="char-controls">
                <div className="tabs">
                    {['all', 'ready', 'training', 'archived'].map(tab => (
                        <button 
                            key={tab} 
                            className={activeTab === tab ? 'active' : ''}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="char-tools">
                    <div className="search-box">
                        <Search size={16} />
                        <input type="text" placeholder="Search personas..." />
                    </div>
                </div>
            </div>

            <div className="char-grid">
                {characters.map((char, i) => (
                    <motion.div 
                        key={char.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="char-card glass-card"
                    >
                        <div className="char-avatar-wrapper">
                            <img src={char.image} alt={char.name} className="char-img" />
                            {char.verified && <div className="verified-badge"><BadgeCheck size={14} /></div>}
                            <div className={`char-status-indicator ${char.status.toLowerCase()}`}>
                                {char.status}
                            </div>
                        </div>
                        <div className="char-info">
                            <div className="char-top">
                                <h3>{char.name}</h3>
                                <button className="more-btn"><MoreVertical size={18} /></button>
                            </div>
                            <span className="char-role">{char.role}</span>
                            
                            <div className="char-meta">
                                <div className="meta-item">
                                    <Volume2 size={14} /> <span>{char.voice}</span>
                                </div>
                                <div className="meta-item">
                                    <ShieldCheck size={14} /> <span>High Precision</span>
                                </div>
                            </div>

                            <div className="char-card-footer">
                                <div className="action-buttons">
                                    <button className="icon-btn" title="Synthesize Voice"><Volume2 size={16} /></button>
                                    <button className="icon-btn" title="View Anatomy"><Eye size={16} /></button>
                                    <button className="icon-btn" title="Edit Persona"><Edit2 size={16} /></button>
                                </div>
                                <button className="configure-btn">
                                    Configure <Settings size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <button className="create-char-card">
                    <div className="create-inner">
                        <div className="add-icon"><Plus size={24} /></div>
                        <h3>Digital Persona</h3>
                        <p>Train a new character from scratch or choose from presets.</p>
                        <Sparkles size={24} className="sparkle-icon" />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Characters





