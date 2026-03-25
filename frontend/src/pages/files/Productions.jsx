import React, { useState } from 'react'
import { 
  Clapperboard, Plus, Search, 
  Play, Clock, ChevronRight, 
  MoreVertical, Calendar, 
  TrendingUp, Film, Grid2X2,
  Tv, Layers, Sparkles, 
  Zap, Download, History,
  ShieldCheck, Share2, Filter,
  Settings, Music, Mic2
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/files/Productions.css'

const Productions = () => {
    const [viewMode, setViewMode] = useState('grid')

    const productions = [
        {
            id: 1,
            title: 'Neural Documentary: The Singularity',
            type: 'Video / 12min',
            status: 'Processing',
            progress: 68,
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 2,
            title: 'Ambient Waves - Vol. 4',
            type: 'Audio / 45min',
            status: 'Completed',
            progress: 100,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 3,
            title: 'Cyberpunk Narrative Flow',
            type: 'Series / 8 Ep',
            status: 'Draft',
            progress: 0,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
        }
    ]

    return (
        <div className="productions-container">
            <header className="tool-header">
                <div className="title-section">
                    <div className="tool-icon-wrap prod-icon"><Clapperboard size={32} /></div>
                    <div>
                        <h1>AI Productions</h1>
                        <p>Manage high-order media pipelines, from long-form documentaries to full episodic narration cycles.</p>
                    </div>
                </div>
                <div className="tool-header-actions">
                    <button className="secondary-btn"><History size={18} /> Logs</button>
                    <button className="primary-btn-premium"><ShieldCheck size={18} /> Export Pro</button>
                </div>
            </header>

            <div className="prod-management-bar glass-card">
                <div className="prod-search">
                    <Search size={18} />
                    <input type="text" placeholder="Filter productions by title or metadata..." />
                </div>
                <div className="prod-filters">
                    <button className="filter-item active">All Projects</button>
                    <button className="filter-item">Audio Only</button>
                    <button className="filter-item">Video Master</button>
                    <button className="add-prod-btn"><Plus size={18} /> New Studio Project</button>
                </div>
            </div>

            <div className={`prod-list-container ${viewMode}`}>
                {productions.map((p, i) => (
                    <motion.div 
                        key={p.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="prod-card glass-card"
                    >
                        <div className="prod-image-wrap">
                            <img src={p.image} alt={p.title} />
                            <div className="prod-status-tag">
                                {p.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                {p.status}
                            </div>
                            {p.status === 'Processing' && (
                                <div className="prod-progress-overlay">
                                    <div className="progress-perc">{p.progress}%</div>
                                    <div className="progress-ring">
                                        <svg viewBox="0 0 36 36">
                                            <path 
                                                className="ring-bg"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path 
                                                className="ring-fill"
                                                strokeDasharray={`${p.progress}, 100`}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="prod-details">
                            <div className="d-top">
                                <h3>{p.title}</h3>
                                <button className="icon-btn-sm"><MoreVertical size={16} /></button>
                            </div>
                            <span className="p-type">{p.type}</span>
                            
                            <div className="p-footer">
                                <div className="p-resources">
                                    <Music size={14} title="Musical Bed" />
                                    <Mic2 size={14} title="Neural Voice" />
                                    <Sparkles size={14} title="Post Processing" />
                                </div>
                                <div className="p-btn-group">
                                    <button className="p-open">Edit Master <ChevronRight size={14} /></button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <button className="add-prod-card">
                    <div className="add-inner">
                        <Plus size={32} />
                        <strong>Build New Pipeline</strong>
                        <span>Auto-orchestrate audio & video assets.</span>
                    </div>
                </button>
            </div>

            <div className="prod-stats-row">
                <div className="stat-pill glass-card">
                    <Zap size={20} className="icon-yellow" />
                    <div className="s-info">
                        <strong>12.4h</strong>
                        <span>Total Content Volume</span>
                    </div>
                </div>
                <div className="stat-pill glass-card">
                    <Tv size={20} className="icon-purple" />
                    <div className="s-info">
                        <strong>15</strong>
                        <span>Active Orchestrations</span>
                    </div>
                </div>
                <div className="stat-pill glass-card">
                    <TrendingUp size={20} className="icon-green" />
                    <div className="s-info">
                        <strong>+24%</strong>
                        <span>Delivery Speed Index</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CheckCircle2 = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </svg>
)

export default Productions





