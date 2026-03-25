import React, { useState } from 'react'
import { Bot, Zap, Play, Settings, Globe, MessageSquare, Search, Sparkles, ArrowRight, Activity } from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/avatar/VideoAgent.css'

const agents = [
  { id: 1, name: 'Sales Rep Agent', desc: 'Engages prospects via personalized video outreach', status: 'active', sent: 1240, open: '68%', color: '#10b981' },
  { id: 2, name: 'Support Agent', desc: 'Responds to customer support tickets with video answers', status: 'active', sent: 890, open: '74%', color: '#6366f1' },
  { id: 3, name: 'Onboarding Guide', desc: 'Walks new users through features step by step', status: 'paused', sent: 432, open: '91%', color: '#f59e0b' },
]

const useCases = [
  { icon: <Globe size={20} />, title: 'Personalized Outreach', desc: 'Send unique AI videos to each prospect automatically', color: '#6366f1' },
  { icon: <MessageSquare size={20} />, title: 'Support Automation', desc: 'Answer FAQs with avatar-narrated video responses', color: '#10b981' },
  { icon: <Activity size={20} />, title: 'Lead Nurturing', desc: 'Keep prospects engaged with timely follow-ups', color: '#f59e0b' },
  { icon: <Bot size={20} />, title: 'Training Delivery', desc: 'Auto-deliver training modules to your team', color: '#ec4899' },
]

const VideoAgent = () => {
  const [activeAgent, setActiveAgent] = useState(null)
  const [_search, setSearch] = useState('')

  return (
    <div className="video-agent-page">
      <div className="va-hero">
        <div>
          <h1><Bot size={28} /> Video Agent</h1>
          <p>Create autonomous AI agents that generate and send personalized videos at scale</p>
        </div>
        <button className="va-create-btn">
          <Zap size={16} /> New Agent
        </button>
      </div>

      {/* Active Agents */}
      <section className="va-section">
        <h2>Your Agents</h2>
        <div className="va-agents-grid">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              className={`va-agent-card premium-card ${activeAgent === agent.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveAgent(agent.id === activeAgent ? null : agent.id)}
              whileHover={{ y: -4 }}
            >
              <div className="va-agent-head">
                <div className="va-agent-icon" style={{ background: `${agent.color}22`, color: agent.color }}>
                  <Bot size={22} />
                </div>
                <div className={`va-status-badge ${agent.status}`}>{agent.status}</div>
              </div>
              <h3>{agent.name}</h3>
              <p>{agent.desc}</p>
              <div className="va-agent-stats">
                <div className="va-stat">
                  <strong>{agent.sent.toLocaleString()}</strong>
                  <span>Videos Sent</span>
                </div>
                <div className="va-stat">
                  <strong style={{ color: agent.color }}>{agent.open}</strong>
                  <span>Open Rate</span>
                </div>
              </div>
              <div className="va-agent-actions">
                <button className="va-config-btn"><Settings size={14} /> Configure</button>
                <button className="va-run-btn" style={{ background: agent.color }}>
                  <Play size={14} fill="white" /> {agent.status === 'active' ? 'Running' : 'Start'}
                </button>
              </div>
            </motion.div>
          ))}

          <motion.div className="va-agent-card va-new-card premium-card" whileHover={{ y: -4 }}>
            <Zap size={36} />
            <h3>Create New Agent</h3>
            <p>Build a new AI video agent for your workflow</p>
            <button className="va-create-btn-sm">Get Started <ArrowRight size={14} /></button>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="va-section">
        <h2>Use Cases</h2>
        <div className="va-use-cases">
          {useCases.map((u, i) => (
            <motion.div
              key={u.title}
              className="va-use-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="va-use-icon" style={{ background: `${u.color}22`, color: u.color }}>{u.icon}</div>
              <div>
                <h4>{u.title}</h4>
                <p>{u.desc}</p>
              </div>
              <ArrowRight size={16} className="va-arrow" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default VideoAgent





