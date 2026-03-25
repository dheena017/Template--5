import React from 'react'
import { Timer, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ComingSoon = ({ title = "New Experience" }) => {
  const navigate = useNavigate()

  return (
    <div className="coming-soon-wrapper" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="icon-glow" style={{ marginBottom: '2rem' }}>
          <Timer size={64} style={{ color: 'var(--primary)', opacity: 0.8 }} />
        </div>
        
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          This engine is currently being optimized for specialized hardware cluster acceleration. 
          Check back shortly for access to the latest platform capabilities.
        </p>

        <button 
          className="reset-btn-top" 
          onClick={() => navigate(-1)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <ArrowLeft size={18} /> Return to Previous
        </button>
      </motion.div>
    </div>
  )
}

export default ComingSoon





