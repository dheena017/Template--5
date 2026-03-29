import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, Activity, ExternalLink, Box } from 'lucide-react'
import '../../styles/pages/about-us/AboutPages.css'

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  }

  const values = [
    { 
      title: 'Human-Centric', 
      desc: 'Building AI tools that prioritize human agency, creativity, and the preservation of authentic cultural expression.',
      icon: <Heart size={32} />,
      color: '#ef4444'
    },
    { 
      title: 'Ethical Innovation', 
      desc: 'Transparent model training pipelines with strict adherence to data sovereignty and creator rights globally.',
      icon: <Shield size={32} />,
      color: '#10b981'
    },
    { 
      title: 'Creative Freedom', 
      desc: 'Unlocking infinite possibilities for production, removing technical barriers for every level of creator.',
      icon: <Box size={32} />,
      color: '#8b5cf6'
    }
  ]

  const history = [
    { year: '2026', title: 'Global Scaling', desc: 'Closed $42M Series B to expand our Generative Video infrastructure and neural rendering clusters.' },
    { year: '2025', title: 'Aura Platform Launch', desc: 'Released the full suite of AI content production tools to the professional creative community.' },
    { year: '2024', title: 'Neural Lab Founding', desc: 'Established our core research facility focused on low-latency multimodal AI inference.' }
  ]

  return (
    <div className="info-page-shell">
      <header className="info-hero">
        <motion.h1 
          initial={{ opacity: 0, y: -40 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Building the Future
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          We are developing a new ecosystem of cinematic AI processing engines to redefine how human creativity scales across the digital landscape.
        </motion.p>
      </header>

      <motion.div 
        className="grid-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {values.map((v, i) => (
          <motion.div key={v.title} className="info-card" variants={itemVariants}>
            <div className="info-card-icon" style={{ color: v.color }}>
              {v.icon}
            </div>
            <h3>{v.title}</h3>
            <p>{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.section 
        className="timeline-glow-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Company Journey</h2>
        <div className="history-list">
          {history.map((h, i) => (
            <div key={h.year} className="history-item">
              <span className="history-year">{h.year}</span>
              <div className="history-content">
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default AboutUs





