import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../../../styles/pages/profile/Connections.css'
import { Activity, AudioWaveform, Award, BarChart2, CheckCircle2, CheckSquare, Clock, Cpu, Eye, Flame, LayoutGrid, Link as LinkIcon, MessageCircle, Music, TrendingUp, UserPlus, Users, Users2 } from 'lucide-react'
import { PrimaryButton, SecondaryButton, SuccessButton, DangerButton, OutlineButton } from '../../../components/buttons'

const ConnectionsTab = () => {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [connections] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Audio Engineer', status: 'connected', avatar: 'AR', mutualCount: 12 },
    { id: 2, name: 'Sarah L. Johnson', role: 'Music Producer', status: 'connected', avatar: 'SJ', mutualCount: 8 },
    { id: 3, name: 'Marcus Chen', role: 'Sound Designer', status: 'pending', avatar: 'MC', mutualCount: 5 },
    { id: 4, name: 'Elena Rossi', role: 'AI Researcher', status: 'connected', avatar: 'ER', mutualCount: 15 },
    { id: 5, name: 'James Wilson', role: 'Cloud Architect', status: 'pending', avatar: 'JW', mutualCount: 3 }
  ])

  const filteredConnections = connections.filter((conn) => {
    const matchesQuery = conn.name.toLowerCase().includes(query.toLowerCase()) || conn.role.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'all' ? true : conn.status === statusFilter
    return matchesQuery && matchesStatus
  })

  return (
    <div className="tab-grid connections-grid full-width">
      <div className="grid-col main">
        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-head">
            <h3 className="title-with-icon"><Users2 size={18} /> Your Network</h3>
            <span className="sub">{connections.filter(c => c.status === 'connected').length} Connected</span>
          </div>
          <div className="connections-stats">
            <motion.div className="conn-stat" whileHover={{ scale: 1.05 }}><div className="stat-number">127</div><div className="stat-label label-with-icon"><Users size={13} /> Total Connections</div></motion.div>
            <motion.div className="conn-stat" whileHover={{ scale: 1.05 }}><div className="stat-number">48</div><div className="stat-label label-with-icon"><Activity size={13} /> Active Collaborators</div></motion.div>
            <motion.div className="conn-stat" whileHover={{ scale: 1.05 }}><div className="stat-number">23</div><div className="stat-label label-with-icon"><Clock size={13} /> Pending Requests</div></motion.div>
            <motion.div className="conn-stat" whileHover={{ scale: 1.05 }}><div className="stat-number">156</div><div className="stat-label label-with-icon"><Eye size={13} /> Profile Reached</div></motion.div>
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="section-head">
            <h3 className="title-with-icon"><LinkIcon size={18} /> Recent Connections</h3>
            <div className="connection-tools">
              <input className="inline-edit-input tiny-edit" placeholder="Search connections" value={query} onChange={(e) => setQuery(e.target.value)} />
              <select className="status-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="connected">Connected</option>
                <option value="pending">Pending</option>
              </select>
              <OutlineButton size="sm"><CheckSquare size={14} /> Accept All</OutlineButton>
            </div>
          </div>
          <div className="connections-list">
            {filteredConnections.map((conn, i) => (
              <motion.div key={conn.id} className={`connection-row premium-card ${conn.status}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ x: 4 }}>
                <div className="conn-avatar">{conn.avatar}</div>
                <div className="conn-info">
                  <h4>{conn.name}</h4>
                  <span className="conn-role">{conn.role}</span>
                  <span className="mutual-count">{conn.mutualCount} mutual connections</span>
                </div>
                <div className="conn-badge">{conn.status === 'connected' ? <><CheckCircle2 size={13} className="conn-badge-icon" /> Connected</> : <><Clock size={13} className="conn-badge-icon" /> Pending</>}</div>
                <div className="conn-actions">
                  {conn.status === 'pending' ? (
                    <>
                      <SuccessButton size="sm">Accept</SuccessButton>
                      <DangerButton size="sm">Decline</DangerButton>
                    </>
                  ) : (
                    <PrimaryButton size="sm"><MessageCircle size={14} /> Message</PrimaryButton>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid-col side">
        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="title-with-icon"><UserPlus size={18} /> Suggestions</h3>
          <div className="suggestions-list">
            {[{ name: 'David Park', role: 'ML Engineer', mutual: 8 }, { name: 'Nina Patel', role: 'UX Designer', mutual: 5 }, { name: 'Oliver Chen', role: 'DevOps', mutual: 12 }].map((sugg, i) => (
              <motion.div key={i} className="suggestion-item" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ x: 4 }}>
                <div className="sugg-avatar">{sugg.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="sugg-info"><span className="sugg-name">{sugg.name}</span><span className="sugg-role">{sugg.role}</span><span className="sugg-mutual">{sugg.mutual} mutual</span></div>
                <PrimaryButton size="sm" style={{ padding: '8px', minWidth: '32px' }}>+</PrimaryButton>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="title-with-icon"><LayoutGrid size={18} /> Groups & Categories</h3>
          <div className="categories-list">
            {[{ name: 'Voice Creators', count: 34, icon: <AudioWaveform size={14} /> }, { name: 'Music Producers', count: 28, icon: <Music size={14} /> }, { name: 'Developers', count: 31, icon: <Cpu size={14} /> }, { name: 'Researchers', count: 15, icon: <Award size={14} /> }].map((cat, i) => (
              <motion.div key={i} className="category-item" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04 }} whileHover={{ x: 4 }}>
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-info"><span className="cat-name">{cat.name}</span><span className="cat-count">{cat.count} people</span></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card network-insights" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="title-with-icon"><BarChart2 size={18} /> Network Insights</h3>
          <div className="insights-list">
            <div className="insight-item"><span className="insight-label insight-line"><TrendingUp size={13} /> Fastest Growing Connection</span><span className="insight-value">Sarah Johnson +24 mutual</span></div>
            <div className="insight-item"><span className="insight-label insight-line"><Flame size={13} /> Most Active Group</span><span className="insight-value">Voice Creators (8 posts)</span></div>
            <div className="insight-item"><span className="insight-label insight-line"><Award size={13} /> Connection Quality Score</span><span className="insight-value" style={{ color: 'var(--secondary-color)' }}>92/100</span></div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ConnectionsTab

