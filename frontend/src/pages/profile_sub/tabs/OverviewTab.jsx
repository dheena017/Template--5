import React from 'react'
import { motion } from 'framer-motion'
import '../../../styles/pages/profile/Overview.css'
import {
  Award,
  CheckCircle2,
  CircleX,
  Flame,
  Globe,
  Heart,
  Mail,
  RefreshCw,
  Share2,
  Trophy,
  Zap,
  ExternalLink,
  Edit3
} from 'lucide-react'

const OverviewTab = ({ completionPercent, completionTasks, onToggleTask, statsData, setActiveTab, profile, profileDraft, isEditingProfile }) => {
  const displayProfile = isEditingProfile ? profileDraft : profile;
  const statsCards = [
    { icon: <Zap />, label: 'Total Creations', value: statsData?.total_projects || '156', subtext: 'Site Activity', color: 'var(--accent-primary)' },
    { icon: <Heart />, label: 'Likes Received', value: statsData?.followers || '12.4K', subtext: 'Community Love', color: '#ff4757' },
    { icon: <Share2 />, label: 'Total Shares', value: '842', subtext: 'Viral Reach', color: '#2ed573' },
    { icon: <Award />, label: 'Achievements', value: statsData?.experience_level || 'Lvl 8', subtext: 'Expert Level', color: 'var(--accent-secondary)' }
  ]

  return (
    <div className="tab-grid overview-grid">
      <div className="grid-col main">
        <motion.section className="premium-card profile-completion animate-shimmer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="completion-header">
            <h3 className="animate-text-reveal">Profile Completeness</h3>
            <span className="completion-percent">{completionPercent}%</span>
          </div>

          <div className="profile-stepper">
            {completionTasks.map((task, i) => (
              <React.Fragment key={task.id}>
                <div 
                  className={`profile-step ${task.done ? 'done' : ''}`}
                  onClick={() => onToggleTask(task.id)}
                  title={task.label}
                >
                  <div className="profile-step-icon">
                    {task.done ? <CheckCircle2 size={20} /> : <CircleX size={20} />}
                  </div>
                  <span className="profile-step-label">{task.label.split(' ')[1] || task.label}</span>
                </div>
                {i < completionTasks.length - 1 && (
                  <div className={`profile-connector ${task.done ? 'done' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        <div className="stats-cards-grid">
          {statsCards.map((stat, i) => (
            <motion.div key={i} className="stat-card-large premium-card animate-shimmer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ y: -4 }}>
              <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </div>
            </motion.div>
          ))}
        </div>
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

        <motion.section className="premium-card social-section group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="flex justify-between items-center mb-6">
            <h3>Social Links</h3>
            <div className="cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-all" onClick={() => setActiveTab('Settings')}>
              <Edit3 size={16} className="text-dim opacity-50 group-hover:opacity-100" />
            </div>
          </div>
          <div className="social-links">
            <motion.a href={displayProfile?.github_url || "#"} target="_blank" rel="noopener noreferrer" className="social-link github" whileHover={{ x: 6 }}><Globe size={16} /> GitHub</motion.a>
            <motion.a href={displayProfile?.portfolio_url || "#"} target="_blank" rel="noopener noreferrer" className="social-link portfolio" whileHover={{ x: 6 }}><ExternalLink size={16} /> Portfolio</motion.a>
            <motion.a href={`mailto:${displayProfile?.email || ""}`} className="social-link email" whileHover={{ x: 6 }}><Mail size={16} /> Email</motion.a>
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

