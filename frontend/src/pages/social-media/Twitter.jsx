import React from 'react'
import { 
  Twitter as TwitterIcon, 
  ExternalLink, Users, 
  MessageCircle, TrendingUp, 
  ArrowRight, Heart, Share2, 
  Zap, Bell
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/social-media/Twitter.css'

const Twitter = () => {
    const stats = [
        { label: 'Followers', value: '125K+' },
        { label: 'Monthly Reach', value: '4.2M' },
        { label: 'Avg Engagement', value: '8.5%' }
    ]

    const highlights = [
        { title: 'Feature Previews', desc: 'Be the first to see what\'s coming in the next TextAI update.' },
        { title: 'Community Spotlights', desc: 'We regularly showcase the best creations from our users.' },
        { title: 'Live Events', desc: 'Participate in our weekly spaces about AI and orchestration.' }
    ]

    return (
        <div className="twitter-landing-container">
            <div className="twitter-hero glass-card">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="hero-content"
                >
                    <div className="twitter-icon-wrap"><TwitterIcon size={64} /></div>
                    <h1>TextAI on X</h1>
                    <p>Join our growing community of 125,000+ creators and engineers. Stay updated with real-time news and feature drops.</p>
                    
                    <div className="twitter-stats">
                        {stats.map((s, i) => (
                            <div key={i} className="stat-pill">
                                <strong>{s.value}</strong>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="follow-btn">
                        Follow @TextAI_HQ <ArrowRight size={18} />
                    </a>
                </motion.div>
            </div>

            <div className="twitter-features">
                <h2>Why follow us on X?</h2>
                <div className="features-grid">
                    {highlights.map((h, i) => (
                        <div key={i} className="feat-card glass-card">
                            <div className="f-icon"><TrendingUp size={24} /></div>
                            <h3>{h.title}</h3>
                            <p>{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="twitter-feed-preview glass-card">
                <div className="feed-header">
                    <TwitterIcon size={20} />
                    <span>Recent Highlights from @TextAI_HQ</span>
                </div>
                <div className="mock-tweet">
                    <div className="tweet-top">
                        <div className="t-avatar"></div>
                        <div className="t-user">
                            <strong>TextAI</strong>
                            <span>@TextAI_HQ · 2h</span>
                        </div>
                    </div>
                    <p className="tweet-text">
                        The 4.0 update is finally here! 🚀 <br /><br />
                        Experience seamless orchestration like never before. Check out the new Studio features and let us know what you think! <br /><br />
                        #AI #Orchestration #TextAI4.0
                    </p>
                    <div className="tweet-actions">
                        <span><MessageCircle size={16} /> 48</span>
                        <span><Share2 size={16} /> 124</span>
                        <span><Heart size={16} /> 542</span>
                    </div>
                </div>
            </div>

            <div className="notification-box glass-card">
                <Bell size={32} className="icon-blue" />
                <div>
                    <h3>Turn on Notifications</h3>
                    <p>Don't miss out on exclusive beta invites and credit giveaways announced on our X handle.</p>
                </div>
            </div>
        </div>
    )
}

export default Twitter



