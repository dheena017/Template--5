import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../../../styles/pages/profile/Notifications.css'
import { Bell, Calendar, CheckSquare, Clock, Heart, Mail as MailIcon, MessageCircle, MoreHorizontal, Settings, Share2, Shield, Smartphone, UserPlus, Users2, Zap } from 'lucide-react'

const NotificationsTab = () => {
  const [muteFor, setMuteFor] = useState('off')
  const [channels, setChannels] = useState({ inapp: true, email: true, push: false })
  const [notifState, setNotifState] = useState([
    { id: 1, user: 'Sarah M.', action: 'Liked your project', time: '2h ago', icon: <Heart size={16} />, read: false },
    { id: 2, user: 'James W.', action: 'Commented on your podcast', time: '4h ago', icon: <MessageCircle size={16} />, read: false },
    { id: 3, user: 'Lisa Chen', action: 'Started following you', time: '1d ago', icon: <UserPlus size={16} />, read: true },
    { id: 4, user: 'Alex R.', action: 'Shared your voice model', time: '2d ago', icon: <Share2 size={16} />, read: true },
    { id: 5, user: 'Team ProAudio', action: 'Sent collaboration invite', time: '3d ago', icon: <Users2 size={16} />, read: true }
  ])

  const markAllRead = () => {
    setNotifState(prev => prev.map(n => ({ ...n, read: true })))
  }

  const [prefStates, setPrefStates] = useState([
    { id: 'likes', label: 'Likes & Favorites', enabled: true, icon: <Heart size={16} /> },
    { id: 'comments', label: 'Comments & Replies', enabled: true, icon: <MessageCircle size={16} /> },
    { id: 'followers', label: 'New Followers', enabled: true, icon: <UserPlus size={16} /> },
    { id: 'collabs', label: 'Collaboration Invites', enabled: true, icon: <Users2 size={16} /> },
    { id: 'updates', label: 'Platform Updates', enabled: false, icon: <Bell size={16} /> },
    { id: 'security', label: 'Security Alerts', enabled: true, icon: <Shield size={16} /> }
  ])

  const togglePreference = (id) => {
    setPrefStates(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p))
  }

  const toggleChannel = (key) => {
    setChannels((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="tab-grid notifications-grid full-width">
      <div className="grid-col main">
        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="section-head">
            <h3 className="title-with-icon"><Bell size={18} /> Notifications</h3>
            <motion.button className="text-btn" whileHover={{ scale: 1.05 }} onClick={markAllRead}><CheckSquare size={14} /> Mark all read</motion.button>
          </div>
          <div className="notifications-list">
            {notifState.map((notif, i) => (
              <motion.div key={notif.id} className={`notification-item premium-card ${notif.read ? 'read' : 'unread'}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }}>
                <div className={`notif-indicator ${notif.read ? '' : 'active'}`}></div>
                <div className="notif-icon" style={{ color: notif.read ? 'var(--text-muted)' : 'var(--primary-color)' }}>{notif.icon}</div>
                <div className="notif-content">
                  <div className="notif-title"><span className="user-name">{notif.user}</span><span className="action-text">{notif.action}</span></div>
                  <span className="notif-time">{notif.time}</span>
                </div>
                <motion.button className="notif-action" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}><MoreHorizontal size={16} /></motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid-col side">
        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="title-with-icon"><Settings size={18} /> Preferences</h3>
          <div className="channel-grid">
            {[
              { key: 'inapp', label: 'In-App', icon: <Bell size={14} /> },
              { key: 'email', label: 'Email', icon: <MailIcon size={14} /> },
              { key: 'push', label: 'Push', icon: <Smartphone size={14} /> }
            ].map((channel) => (
              <button key={channel.key} className={`pill ${channels[channel.key] ? 'active' : ''}`} onClick={() => toggleChannel(channel.key)}>
                {channel.icon} {channel.label}
              </button>
            ))}
          </div>
          <div className="preferences-list">
            {prefStates.map((pref, i) => (
              <motion.div key={pref.id} className="preference-item" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.04 }} whileHover={{ x: 4 }}>
                <div className="pref-icon">{pref.icon}</div>
                <div className="pref-label">{pref.label}</div>
                <motion.div 
                  className={`toggle-switch ${pref.enabled ? 'on' : 'off'}`} 
                  initial={false} 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => togglePreference(pref.id)}
                >
                  <span className="toggle-text-on">ON</span>
                  <span className="toggle-text-off">OFF</span>
                  <motion.div className="toggle-thumb" layout transition={{ duration: 0.2 }} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="title-with-icon"><MailIcon size={18} /> Email Digest</h3>
          <div className="section-head">
            <span className="sub">Mute Notifications</span>
            <select className="status-select" value={muteFor} onChange={(e) => setMuteFor(e.target.value)}>
              <option value="off">Off</option>
              <option value="1h">1 hour</option>
              <option value="1d">1 day</option>
              <option value="1w">1 week</option>
            </select>
          </div>
          <div className="email-options">
            {[
              { label: 'Instant', desc: 'Get notified immediately', icon: <Zap size={13} /> },
              { label: 'Daily', desc: 'Morning digest at 9 AM', icon: <Clock size={13} /> },
              { label: 'Weekly', desc: 'Every Monday summary', icon: <Calendar size={13} /> },
              { label: 'Off', desc: "Don't email me", icon: <Bell size={13} /> }
            ].map((opt, i) => (
              <motion.div key={i} className={`email-option premium-card ${muteFor === opt.label ? 'active' : ''}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 + i * 0.04 }} whileHover={{ y: -2 }} onClick={() => setMuteFor(opt.label)}>
                <input type="radio" name="email" id={`email-${i}`} checked={muteFor === opt.label} readOnly />
                <label htmlFor={`email-${i}`} style={{ pointerEvents: 'none' }}>
                  <span className="opt-label opt-label-row">{opt.icon}{opt.label}</span>
                  <span className="opt-desc">{opt.desc}</span>
                </label>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default NotificationsTab

