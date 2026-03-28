import React from 'react';
import { AlertCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreditErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="credit-error-aura"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '12px',
          marginTop: '16px',
          color: '#ef4444',
          fontSize: '0.9rem'
        }}
      >
        <AlertCircle size={18} />
        <div style={{ flex: 1 }}>
          <strong>Insufficient Balance</strong>
          <p style={{ margin: 0, opacity: 0.8, fontSize: '0.8rem' }}>{error}</p>
        </div>
        <button 
          style={{
            padding: '6px 12px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          onClick={() => window.location.href = '/billing'}
        >
          <Zap size={10} fill="currentColor" /> Refill
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreditErrorMessage;
