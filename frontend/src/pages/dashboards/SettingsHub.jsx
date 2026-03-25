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

      <motion.div className="all-dashboards-grid" variants={containerVariants}>
        {SETTINGS_CARDS.map((card) => {
          const Icon = card.icon
          return (
            <motion.button
              key={card.title}
              type="button"
              className="all-dashboard-card"
              onClick={() => navigate(card.path)}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="all-dashboard-card-head">
                <span className="all-dashboard-icon" style={{ color: card.color, backgroundColor: `${card.color}20` }}>
                  <Icon size={20} />
                </span>
                <ArrowUpRight size={16} className="all-dashboard-arrow" />
              </div>

              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </motion.button>
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

