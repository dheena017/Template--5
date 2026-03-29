import React from 'react'
import { Timer, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../../styles/pages/about-us/AboutPages.css'

const ComingSoon = ({ title = "New Experience" }) => {
  const navigate = useNavigate()

  return (
    <div className="info-page-shell">
      <div className="coming-soon-hero">
        <motion.div
           className="timer-box"
           initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
           animate={{ rotate: 0, scale: 1, opacity: 1 }}
           transition={{ duration: 0.8, type: 'spring' }}
        >
          <Timer size={48} />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px' }}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.4rem', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: 1.6 }}
        >
          This cognitive engine is currently being optimized for specialized hardware cluster acceleration. 
          Expect a production-ready deployment in the coming platform cycle.
        </motion.p>

        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="submit-btn" 
          onClick={() => navigate(-1)}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'none' }}
        >
          <ArrowLeft size={20} /> Return to Operations
        </motion.button>
      </div>
    </div>
  )
}

export default ComingSoon





