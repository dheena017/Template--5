import React, { useState } from 'react';
import { 
  Paperclip, 
  Lightbulb, 
  Play, 
  Zap,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import './FloatingCommandDock.css';

const FloatingCommandDock = ({ 
  placeholder = "What should Aura create?", 
  onExecute, 
  isProcessing = false,
  className = "" 
}) => {
  const [prompt, setPrompt] = useState('');

  const handleExecute = () => {
    if (prompt && onExecute) {
      onExecute(prompt);
    }
  };

  return (
    <motion.div 
      className={`floating-dock-v4 ${isProcessing ? 'processing' : ''} ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.div 
        className="dock-glass-inner"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="dock-glow-border"></div>
        
        <div className="dock-layout">
          <div className="dock-left-actions">
             <button className="dock-mini-btn" type="button"><Paperclip size={18} /></button>
             <button className="dock-mini-btn" type="button"><Lightbulb size={18} /></button>
          </div>

          <input 
            className="dock-input"
            placeholder={placeholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isProcessing}
            onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
          />
          
          <div className="dock-right-actions">
             <button 
               className={`dock-create-btn ${prompt ? 'active' : ''}`}
               onClick={handleExecute}
               type="button"
               disabled={isProcessing || !prompt}
             >
                {isProcessing ? 'SYNTHESIZING...' : 'CREATE'} <Play size={12} fill="currentColor" />
             </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingCommandDock;
