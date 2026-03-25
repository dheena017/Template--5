import React, { useState } from 'react'
import { 
  Layers, Plus, Search, 
  Play, Clock, ChevronRight, 
  MoreVertical, Calendar, 
  TrendingUp, Film, Grid2X2,
  Tv
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/files/Series.css'

const Series = () => {
    const [viewMode, setViewMode] = useState('grid')

    const seriesData = [
        {
            id: 1,
            title: 'Neural Narratives',
            episodes: 12,
            lastUpdated: '2 hours ago',
            status: 'Active',
            reach: '12.4k',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 2,
            title: 'Future Tech Weekly',
            episodes: 45,
            lastUpdated: '1 day ago',
            status: 'Active',
            reach: '85k',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=600'
        },
        {
            id: 3,
            title: 'Ambient Journeys',
            episodes: 8,
            lastUpdated: '3 days ago',
            status: 'Paused',
            reach: '3.2k',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600'
        }
    ]

    return (
        <div className="series-container">
            <header className="series-header">
                <div className="header-left">
                    <div className="title-section">
                        <h1><Layers size={28} /> Series Management</h1>
                        <p>Orchestrate your episodic content and automated video chains.</p>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="search-wrap">
                        <Search size={18} />
                        <input type="text" placeholder="Filter series..." />
                    </div>
                    <button className="create-series-btn">
                        <Plus size={18} /> Create New Series
                    </button>
                </div>
            </header>

            <div className="series-analytics glass-card">
                <div className="ana-item">
                    <Tv size={20} className="icon-blue" />
                    <div className="ana-info">
                        <strong>65</strong>
                        <span>Total Episodes</span>
                    </div>
                </div>
                <div className="ana-divider"></div>
                <div className="ana-item">
                    <TrendingUp size={20} className="icon-green" />
                    <div className="ana-info">
                        <strong>102k</strong>
                        <span>Total Reach</span>
                    </div>
                </div>
                <div className="ana-divider"></div>
                <div className="ana-item">
                    <Clock size={20} className="icon-amber" />
                    <div className="ana-info">
                        <strong>142h</strong>
                        <span>Watch Time</span>
                    </div>
                </div>
            </div>

            <div className="view-controls">
                <div className="view-tabs">
                    <button 
                        className={viewMode === 'grid' ? 'active' : ''} 
                        onClick={() => setViewMode('grid')}
                    >
                        <Grid2X2 size={16} /> Grid
                    </button>
                    <button 
                        className={viewMode === 'list' ? 'active' : ''} 
                        onClick={() => setViewMode('list')}
                    >
                        <Film size={16} /> Timeline
                    </button>
                </div>
            </div>

            <div className={`series-grid ${viewMode}`}>
                {seriesData.map((series, i) => (
                    <motion.div 
                        key={series.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="series-card glass-card"
                    >
                        <div className="card-image">
                            <img src={series.image} alt={series.title} />
                            <div className="series-badge">EP {series.episodes}</div>
                            <button className="play-button"><Play size={20} fill="currentColor" /></button>
                        </div>
                        <div className="card-content">
                            <div className="card-top">
                                <h3>{series.title}</h3>
                                <button className="more-btn"><MoreVertical size={16} /></button>
                            </div>
                            <div className="card-stats">
                                <div className="c-stat">
                                    <TrendingUp size={14} /> <span>{series.reach} Reach</span>
                                </div>
                                <div className="c-stat">
                                    <Calendar size={14} /> <span>{series.lastUpdated}</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <span className={`status-tag ${series.status.toLowerCase()}`}>
                                    {series.status}
                                </span>
                                <button className="manage-btn">
                                    Manage <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                <button className="add-series-card">
                    <div className="add-icon"><Plus size={32} /></div>
                    <span>Start New Collection</span>
                </button>
            </div>
        </div>
    )
}

export default Series





