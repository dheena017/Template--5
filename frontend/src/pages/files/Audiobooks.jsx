import React, { useState } from 'react'
import { 
  Library, Plus, Search, 
  BookOpen, Mic2, Sparkles, 
  History, Play, Download, 
  Wand2, ShieldCheck, RefreshCw,
  Clock, CheckCircle2, MoreVertical,
  Type, Layers, Volume2, 
  FileText, ArrowRight, Star, ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/files/Audiobooks.css'

const Audiobooks = () => {
    const [activeTab, setActiveTab] = useState('all')

    const audiobooks = [
        {
            id: 1,
            title: 'The Silent Horizon',
            author: 'Elena Vance',
            duration: '8h 24m',
            narrator: 'Neural Aria',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 2,
            title: 'Neural Empires',
            author: 'Marcus J. Cole',
            duration: '12h 45m',
            narrator: 'Studio Deep',
            status: 'Active',
            image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400'
        }
    ]

    return (
        <div className="audiobooks-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap audio-icon"><Library size={32} /></div>
                    <div>
                        <h1>AI Audiobook Studio</h1>
                        <p>Convert manuscripts and novels into immersive audio experiences with multi-character narration.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><Star size={18} /> Favorites</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> Studio XL</button>
                </div>
            </header>

            <div className="audiobook-hero glass-card">
                <div className="hero-content">
                    <div className="hero-text">
                        <span className="badge-new">New Release</span>
                        <h2>Project: Neural Narratives</h2>
                        <p>Chapter 14: The Convergence. Orchestrating multi-character dialogue with emotional resonance.</p>
                        <div className="hero-stats">
                            <div className="h-stat"><strong>214</strong> <span>Pages</span></div>
                            <div className="h-stat"><strong>4h 12m</strong> <span>Audio Rendered</span></div>
                            <div className="h-stat"><strong>5</strong> <span>Characters</span></div>
                        </div>
                        <button className="resume-btn">Resume Studio <ArrowRight size={18} /></button>
                    </div>
                </div>
            </div>

            <div className="audiobook-management glass-card">
                <div className="m-header">
                    <div className="tabs">
                        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>My Library</button>
                        <button className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>Active Studio</button>
                        <button className={activeTab === 'archived' ? 'active' : ''} onClick={() => setActiveTab('archived')}>Archives</button>
                    </div>
                    <div className="m-actions">
                        <div className="m-search">
                            <Search size={16} />
                            <input type="text" placeholder="Filter books..." />
                        </div>
                        <button className="new-book-btn"><Plus size={18} /> Start New Audiobook</button>
                    </div>
                </div>

                <div className="books-grid">
                    {audiobooks.map((book, i) => (
                        <motion.div 
                            key={book.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="book-card glass-card"
                        >
                            <div className="book-cover">
                                <img src={book.image} alt={book.title} />
                                <div className="book-badge">{book.status}</div>
                                <button className="book-play-overlay"><Play size={24} fill="currentColor" /></button>
                            </div>
                            <div className="book-info">
                                <div className="b-top">
                                    <h3>{book.title}</h3>
                                    <button className="icon-btn-sm"><MoreVertical size={16} /></button>
                                </div>
                                <span className="author">by {book.author}</span>
                                <div className="b-meta">
                                    <div className="m-item"><Clock size={12} /> {book.duration}</div>
                                    <div className="m-item"><Mic2 size={12} /> {book.narrator}</div>
                                </div>
                                <div className="b-footer">
                                    <button className="manage-btn">Access Studio <ChevronRight size={14} /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <button className="add-book-card">
                        <div className="add-circle"><Plus size={32} /></div>
                        <strong>Create New</strong>
                        <span>Import PDF / EPUB</span>
                    </button>
                </div>
            </div>

            <div className="studio-perks">
                <div className="perk-card glass-card">
                    <Sparkles size={24} className="icon-blue" />
                    <h3>Multi-Character</h3>
                    <p>Assign unique voices to each character in your manuscript.</p>
                </div>
                <div className="perk-card glass-card">
                    <FileText size={24} className="icon-green" />
                    <h3>Auto-Scripting</h3>
                    <p>AI detects dialogue and emotional cues for dynamic narration.</p>
                </div>
                <div className="perk-card glass-card">
                    <Volume2 size={24} className="icon-purple" />
                    <h3>Soundscapes</h3>
                    <p>Generate background ambience to match the scene automatically.</p>
                </div>
            </div>
        </div>
    )
}

export default Audiobooks





