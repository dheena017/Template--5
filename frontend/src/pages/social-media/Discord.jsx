import React from 'react'
import { 
  MessagesSquare as DiscordIcon, 
  ExternalLink, Users, 
  ShieldCheck, Zap, 
  ArrowRight, Heart, Share2, 
  Mic2, MessageSquare, Bot, 
  Gamepad2, Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/social-media/Discord.css'

const Discord = () => {
    const channels = [
        { name: '#announcements', desc: 'Official updates and feature drops.', icon: <Sparkles size={18} /> },
        { name: '#creative-showcase', desc: 'Share your AI-generated masterpieces.', icon: <Heart size={18} /> },
        { name: '#dev-support', desc: 'Get help with API and SDK integrations.', icon: <Bot size={18} /> },
        { name: '#general-chat', desc: 'Connect with fellow AI enthusiasts.', icon: <MessageSquare size={18} /> }
    ]

    return (
        <div className="discord-landing-container">
            <div className="discord-hero glass-card">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-content"
                >
                    <div className="discord-icon-wrap"><DiscordIcon size={64} /></div>
                    <h1>Join the TextAI Discord</h1>
                    <p>The definitive hub for AI orchestration. Connect with 45,000+ creators, get instant support, and participate in exclusive beta testing.</p>
                    
                    <div className="discord-stats">
                        <div className="d-stat">
                            <div className="online-dot"></div>
                            <strong>8,420 Online</strong>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="d-stat">
                            <strong>45,120 Members</strong>
                        </div>
                    </div>

                    <a href="https://discord.com" target="_blank" rel="noreferrer" className="join-btn">
                        Join Our Community <ArrowRight size={18} />
                    </a>
                </motion.div>
            </div>

            <div className="discord-layout">
                <div className="discord-preview glass-card">
                    <div className="d-preview-header">
                        <div className="d-nav">
                            <span className="server-name">TextAI Official</span>
                            <div className="d-channels">
                                {channels.map((c, i) => (
                                    <div key={i} className={`d-channel ${i === 1 ? 'active' : ''}`}>
                                        {c.icon} <span>{c.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="d-chat">
                            <div className="chat-msg">
                                <div className="user-avatar bot"></div>
                                <div className="msg-content">
                                    <div className="m-user">TextAI Bot <span className="b-tag">BOT</span> <span className="m-time">Today at 14:20</span></div>
                                    <p>Welcome to <strong>#creative-showcase</strong>! 🎨 <br />Post your latest renders here to get feedback from the community and a chance to be featured on our X handle!</p>
                                </div>
                            </div>
                            <div className="chat-msg">
                                <div className="user-avatar pro"></div>
                                <div className="msg-content">
                                    <div className="m-user">StudioPro_99 <span className="m-time">Today at 14:22</span></div>
                                    <p>Just finished a 12-minute AI documentary using the new 4.0 orchestration. The consistency is insane! 🚀</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="discord-perks">
                    <h2>Member Benefits</h2>
                    <div className="perks-grid">
                        <div className="perk-card glass-card">
                            <ShieldCheck size={28} className="icon-green" />
                            <h3>Direct Access</h3>
                            <p>Chat directly with our engineering and product teams.</p>
                        </div>
                        <div className="perk-card glass-card">
                            <Zap size={28} className="icon-amber" />
                            <h3>Alpha Testing</h3>
                            <p>Get early access to experimental models and features.</p>
                        </div>
                        <div className="perk-card glass-card">
                            <Mic2 size={28} className="icon-purple" />
                            <h3>Weekly Stages</h3>
                            <p>Hear from industry leaders in our weekly AI deep-dives.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="event-box glass-card">
                <Gamepad2 size={32} className="icon-blue" />
                <div className="event-info">
                    <h3>Community Game Night</h3>
                    <p>Every Friday at 18:00 UTC. Casual gaming and AI prompt battles with credit prizes!</p>
                </div>
                <button className="rsvp-btn">RSVP Now</button>
            </div>
        </div>
    )
}

export default Discord



