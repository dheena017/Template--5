import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SlidersHorizontal,
  Image as ImageIcon,
  Bot,
  Volume2,
  FileText,
  Clapperboard,
  HardDrive,
  Shield,
  Terminal,
  Share2,
  Info,
  ArrowUpRight,
  Settings as SettingsIcon,
  RotateCcw
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../components/buttons'

const SETTINGS_CARDS = [
  {
    title: 'General / UI',
    description: 'Interface themes, accent colors, and typography settings.',
    path: '/settings/general',
    icon: SlidersHorizontal,
    color: '#6366f1'
  },
  {
    title: 'Image Engine',
    description: 'Default resolution, model synthesis, and processing nodes.',
    path: '/settings/image',
    icon: ImageIcon,
    color: '#db2777'
  },
  {
    title: 'Avatar & Voice',
    description: 'Lip-sync accuracy, studio backgrounds, and vocal defaults.',
    path: '/settings/avatar',
    icon: Bot,
    color: '#2563eb'
  },
  {
    title: 'Speech & Audio',
    description: 'Voice provider selection and global emotional bias controls.',
    path: '/settings/speech',
    icon: Volume2,
    color: '#f59e0b'
  },
  {
    title: 'Text & Narrative',
    description: 'Auto-formatting rules and translation engine preferences.',
    path: '/settings/text',
    icon: FileText,
    color: '#10b981'
  },
  {
    title: 'Studio Config',
    description: 'Workflow auto-saves and studio rendering performance.',
    path: '/settings/studio',
    icon: Clapperboard,
    color: '#7c3aed'
  },
  {
    title: 'Files & Storage',
    description: 'Library organization and automatic asset cleanup policies.',
    path: '/settings/files',
    icon: HardDrive,
    color: '#64748b'
  },
  {
    title: 'PDF Processing',
    description: 'Global document encryption and OCR accuracy modes.',
    path: '/settings/pdf',
    icon: Shield,
    color: '#ec4899'
  },
  {
    title: 'Developer Console',
    description: 'API key management, webhooks, and request log verbosity.',
    path: '/settings/developers',
    icon: Terminal,
    color: '#475569'
  },
  {
    title: 'Social & Network',
    description: 'Syndication, community visibility, and social platform accounts.',
    path: '/settings/social',
    icon: Share2,
    color: '#0ea5e9'
  },
  {
    title: 'Platform Info',
    description: 'System health status and build information summary.',
    path: '/settings/about',
    icon: Info,
    color: '#4b5563'
  }
]

const SettingsHub = () => {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, translateY: 20 },
    visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <motion.section 
      className="all-dashboards-shell"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header className="all-dashboards-header" variants={itemVariants}>
        <h1>System Settings Hub</h1>
        <p>Pick a category to manage your platform behavior and individual tool preferences.</p>
      </motion.header>

      <motion.div className="portal-tools-main-grid" variants={containerVariants}>
        {SETTINGS_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="portal-tool-card"
              style={{ 
                  backgroundColor: '#0f1016',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer'
              }}
              onClick={() => navigate(card.path)}
            >
              <div className="tool-card-top">
                  <div className="tool-suite-info">
                      <div className="suite-icon-mini" style={{ color: card.color }}>
                          <Icon size={14} />
                      </div>
                      <span className="suite-name-tag">SYSTEM SETTINGS</span>
                  </div>
                  <div className="tool-action-indicator">
                      <ArrowUpRight size={14} />
                  </div>
              </div>

              <div className="tool-card-body">
                  <h3>{card.title}</h3>
                  <div className="tool-card-footer">
                      <div className="tool-status-dot" style={{ backgroundColor: card.color }}></div>
                      <span className="tool-ready-text">Ready to configure</span>
                  </div>

                  <div className="card-launch-aura">
                      <PrimaryButton 
                          className="launch-btn-premium"
                          size="md"
                          style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '100px', fontWeight: '800', border: 'none', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)', paddingInline: '2rem' }}
                      >
                          Configure
                      </PrimaryButton>
                  </div>
              </div>
              <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, ${card.color}15, transparent)` }}></div>
            </div>
          )
        })}
      </motion.div>

      <motion.div className="all-dashboards-header" style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
          <h3>Need more help?</h3>
          <p>Read our documentation for technical deep dives on setting effects.</p>
          <button className="reset-btn-top" style={{ marginTop: '1rem' }} onClick={() => navigate('/docs')}>Open Docs</button>
      </motion.div>
    </motion.section>
  )
}

export default SettingsHub

