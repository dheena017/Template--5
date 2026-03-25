import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Film,
  Palette,
  Bot,
  Mic,
  FileText,
  Clapperboard,
  Library,
  Sparkles,
  Terminal,
  Share2,
  Info,
  HardDrive,
  ArrowUpRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/dashboards/DashboardIndex.css'

const DASHBOARD_CARDS = [
  {
    title: 'Video Workspace',
    description: 'Production, dubbing, podcasts, and batch pipelines.',
    path: '/dashboard/video',
    icon: Film,
    color: '#ef4444'
  },
  {
    title: 'Image Studio',
    description: 'Creative systems, brand assets and synthesis labs.',
    path: '/dashboard/image',
    icon: Palette,
    color: '#db2777'
  },
  {
    title: 'Avatar & Identity',
    description: 'Avatar creation, character labs, and digital twins.',
    path: '/dashboard/avatar',
    icon: Bot,
    color: '#2563eb'
  },
  {
    title: 'Speech & Audio',
    description: 'Vocal cloning, changer, and soundscape generation.',
    path: '/dashboard/speech',
    icon: Mic,
    color: '#f59e0b'
  },
  {
    title: 'Text Intelligence',
    description: 'Transcription, translation, and narrative synthesis.',
    path: '/dashboard/text',
    icon: FileText,
    color: '#10b981'
  },
  {
    title: 'Creative Studio',
    description: 'Unified orchestrator for multi-modal production.',
    path: '/dashboard/studio',
    icon: Clapperboard,
    color: '#7c3aed'
  },
  {
    title: 'Files & Assets',
    description: 'Manage library, series, and production deliveries.',
    path: '/dashboard/files',
    icon: HardDrive,
    color: '#64748b'
  },
  {
    title: 'PDF Engineering',
    description: 'Specialized document conversion and processing.',
    path: '/dashboard/pdf',
    icon: FileText,
    color: '#ec4899'
  },
  {
    title: 'Developers Hub',
    description: 'API console, security keys, and system logs.',
    path: '/dashboard/developers',
    icon: Terminal,
    color: '#475569'
  },
  {
    title: 'Social Network',
    description: 'Community hubs, X/Twitter, and integrations.',
    path: '/dashboard/social-media',
    icon: Share2,
    color: '#0ea5e9'
  },
  {
    title: 'About Platform',
    description: 'Documentation, FAQ, and company resources.',
    path: '/dashboard/about-us',
    icon: Info,
    color: '#4b5563'
  }
]

const Dashboard = () => {
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
        <h1>All Dashboards</h1>
        <p>Open any dashboard from here and manage every part of your platform.</p>
      </motion.header>

      <motion.div className="all-dashboards-grid" variants={containerVariants}>
        {DASHBOARD_CARDS.map((card) => {
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
    </motion.section>
  )
}

export default Dashboard

