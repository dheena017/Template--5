import React from 'react'
import { motion } from 'framer-motion'
import {
  Award,
  CheckCircle2,
  CircleX,
  Flame,
  Github,
  Globe,
  Heart,
  Mail,
  RefreshCw,
  Share2,
  Trophy,
  Zap
} from 'lucide-react'

const OverviewTab = ({ completionPercent, completionTasks, onToggleTask }) => {
  const heatLevels = Array.from({ length: 364 }, (_, i) => (i * 7 + 3) % 5)
  const statsCards = [
    { icon: <Zap />, label: 'Total Creations', value: '156', subtext: '+12 this month', color: '#06b6d4' },
    { icon: <Heart />, label: 'Likes Received', value: '4.2K', subtext: '+320 this week', color: '#22c55e' },
    { icon: <Share2 />, label: 'Total Shares', value: '892', subtext: 'Very popular', color: '#f59e0b' },
    { icon: <Award />, label: 'Achievements', value: '24', subtext: 'Level 42', color: '#06b6d4' }
  ]

  return (
    <div className="tab-grid overview-grid">
      <div className="grid-col main">
        <motion.section className="premium-card profile-completion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="completion-header">
            <h3>Profile Completeness</h3>
            <span className="completion-percent">{completionPercent}%</span>
          </div>
          <div className="progress-bar-container">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))' }}
            />
          </div>
          <div className="completion-tips">
            {completionTasks.map((task) => (
              <button key={task.id} className={`tip-item ${task.done ? 'done' : ''}`} onClick={() => onToggleTask(task.id)}>
                {task.done ? <CheckCircle2 size={14} /> : <CircleX size={14} />} {task.label}
              </button>
            ))}
          </div>
        </motion.section>

        <div className="stats-cards-grid">
          {statsCards.map((stat, i) => (
            <motion.div key={i} className="stat-card-large premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ y: -4 }}>
              <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section className="premium-card activity-graph-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="section-head">
            <h3>Activity Timeline</h3>
            <span className="sub">Annual creations heatmap</span>
          </div>
          <div className="heatmap-placeholder">
            {heatLevels.map((level, i) => (
              <motion.div key={i} className={`heat-dot level-${level}`} whileHover={{ scale: 1.4 }} title={`Activity level: ${level}`} />
            ))}
          </div>
          <div className="heatmap-legend">
            <span>Less</span>
            <div className="legend-dots">{[0, 1, 2, 3, 4].map((i) => <div key={i} className={`heat-dot level-${i}`}></div>)}</div>
            <span>More</span>
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="section-head">
            <h3>Recent Activity Feed</h3>
            <button className="text-link">View All</button>
          </div>
          <div className="activity-feed">
            {[
              { type: 'Generation', label: 'Generated 5s AI Voice (Michael Caine)', time: '2h ago', icon: <Zap size={14} /> },
              { type: 'Update', label: 'Updated SDK version in Dev Console', time: '5h ago', icon: <RefreshCw size={14} /> },
              { type: 'Share', label: 'Shared "Cyberpunk Music" template to public', time: '1d ago', icon: <Share2 size={14} /> },
              { type: 'Achievement', label: 'Unlocked "Voice Master" badge', time: '2d ago', icon: <Trophy size={14} /> }
            ].map((act, i) => (
              <motion.div key={i} className="feed-item" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }} whileHover={{ x: 4 }}>
                <div className="act-icon">{act.icon}</div>
                <div className="act-details">
                  <span className="label text-truncate">{act.label}</span>
                  <span className="time">{act.time}</span>
                </div>
                <div className="act-type">{act.type}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid-col side">
        <motion.section className="premium-card awards-sidebar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>Top Achievement</h3>
          <motion.div className="badge-featured" whileHover={{ scale: 1.05 }}>
            <Trophy size={40} className="badge gold" />
            <div className="badge-info">
              <span>Verified Creator</span>
              <p>Trusted by community</p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section className="premium-card social-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3>Social Links</h3>
          <div className="social-links">
            <motion.a href="#" className="social-link" whileHover={{ scale: 1.1 }}><Github size={16} /> GitHub</motion.a>
            <motion.a href="#" className="social-link" whileHover={{ scale: 1.1 }}><Globe size={16} /> Portfolio</motion.a>
            <motion.a href="#" className="social-link" whileHover={{ scale: 1.1 }}><Mail size={16} /> Email</motion.a>
          </div>
        </motion.section>

        <motion.section className="premium-card badges-sidebar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3>Recent Badges</h3>
          <div className="mini-badges-grid">
            <motion.div className="badge-item" whileHover={{ scale: 1.15 }} title="Fire Performer"><Flame className="glow-red" size={28} /></motion.div>
            <motion.div className="badge-item" whileHover={{ scale: 1.15 }} title="Top Creator"><Award className="glow-yellow" size={28} /></motion.div>
            <motion.div className="badge-item" whileHover={{ scale: 1.15 }} title="Lightning Strike"><Zap className="glow-yellow" size={28} /></motion.div>
            <motion.div className="badge-item" whileHover={{ scale: 1.15 }} title="Verified"><CheckCircle2 className="glow-green" size={28} /></motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default OverviewTab

