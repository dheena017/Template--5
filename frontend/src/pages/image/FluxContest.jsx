import React from 'react'
import { 
  Trophy, Sparkles, Image, 
  Calendar, Users, Gift, 
  ArrowRight, Heart, Share2, 
  Eye, Zap, Camera, Star
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/image/FluxContest.css'

const FluxContest = () => {
    const prizes = [
        { rank: '1st Place', prize: '$5,000 USD + Annual Pro Plan', icon: <Trophy size={32} className="gold" /> },
        { rank: '2nd Place', prize: '$2,500 USD + Annual Standard Plan', icon: <Trophy size={28} className="silver" /> },
        { rank: '3rd Place', prize: '$1,000 USD + 5,000 Extra Credits', icon: <Trophy size={24} className="bronze" /> }
    ]

    const examples = [
        { title: 'Cyberpunk Odyssey', artist: '@neuron_art', likes: '2.4k', views: '12k', img: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=600' },
        { title: 'Nature Reclaimed', artist: '@earth_ai', likes: '1.8k', views: '8k', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600' },
        { title: 'Neural Dreams', artist: '@synapse', likes: '3.1k', views: '15k', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600' }
    ]

    return (
        <div className="contest-container">
            <div className="contest-hero">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-content"
                >
                    <div className="contest-badge"><Trophy size={14} /> Global Creative Event</div>
                    <h1>Flux Creative <br />Contest 2026</h1>
                    <p>Push the boundaries of AI creativity with the Flux.1 model. Create, share, and win from a $10,000 total prize pool.</p>
                    
                    <div className="contest-timer-wrap glass-card">
                        <div className="timer-item"><span>12</span><span>Days</span></div>
                        <div className="timer-divider">:</div>
                        <div className="timer-item"><span>08</span><span>Hrs</span></div>
                        <div className="timer-divider">:</div>
                        <div className="timer-item"><span>45</span><span>Min</span></div>
                        <div className="timer-divider">:</div>
                        <div className="timer-item"><span>12</span><span>Sec</span></div>
                    </div>

                    <div className="hero-actions">
                        <button className="enter-btn">Submit Your Entry <ArrowRight size={18} /></button>
                        <button className="rules-btn">View Official Rules</button>
                    </div>
                </motion.div>
            </div>

            <div className="contest-highlights-grid">
                <div className="highlight-item glass-card">
                    <div className="h-icon"><Sparkles size={24} className="icon-purple" /></div>
                    <h3>Theme</h3>
                    <p>"Neon Rebirth: The intersection of humanity and synthetic evolution."</p>
                </div>
                <div className="highlight-item glass-card">
                    <div className="h-icon"><Image size={24} className="icon-blue" /></div>
                    <h3>Requirements</h3>
                    <p>All entries must be generated using the Flux.1 Pro model via TextAI Studio.</p>
                </div>
                <div className="highlight-item glass-card">
                    <div className="h-icon"><Users size={24} className="icon-green" /></div>
                    <h3>Judging</h3>
                    <p>Community voting (40%) + Professional Artist Panel (60%).</p>
                </div>
            </div>

            <div className="prizes-section">
                <h2 className="section-title">Prize Pool</h2>
                <div className="prizes-grid">
                    {prizes.map((p, i) => (
                        <div key={i} className="prize-card glass-card">
                            <div className="prize-icon">{p.icon}</div>
                            <h3>{p.rank}</h3>
                            <p>{p.prize}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="showcase-section">
                <div className="section-header">
                    <h2>Trending Entries</h2>
                    <button className="view-gallery">View Full Gallery <ArrowRight size={16} /></button>
                </div>
                <div className="entries-grid">
                    {examples.map((ex, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -8 }}
                            className="entry-card glass-card"
                        >
                            <div className="entry-img">
                                <img src={ex.img} alt={ex.title} />
                                <div className="entry-overlay">
                                    <button className="vote-btn"><Heart size={18} /> Vote</button>
                                </div>
                            </div>
                            <div className="entry-info">
                                <h3>{ex.title}</h3>
                                <span className="entry-artist">{ex.artist}</span>
                                <div className="entry-stats">
                                    <span><Eye size={14} /> {ex.views}</span>
                                    <span><Heart size={14} /> {ex.likes}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="submission-guide glass-card">
                <div className="guide-content">
                    <div className="guide-left">
                        <Camera size={48} className="icon-amber" />
                        <div>
                            <h2>How to Enter?</h2>
                            <p>Follow these 3 simple steps to qualify for the 2026 Flux Contest.</p>
                        </div>
                    </div>
                </div>
                <div className="steps-grid">
                    <div className="step">
                        <div className="step-num">01</div>
                        <h4>Generate</h4>
                        <p>Use Flux.1 Pro in Studio to create your masterpiece.</p>
                    </div>
                    <div className="step">
                        <div className="step-num">02</div>
                        <h4>Post</h4>
                        <p>Share on X/Twitter with #TextAIFlux2026 tag.</p>
                    </div>
                    <div className="step">
                        <div className="step-num">03</div>
                        <h4>Submit</h4>
                        <p>Drop your link in our submission form below.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FluxContest



