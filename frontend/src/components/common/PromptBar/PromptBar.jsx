import React, { useState, useRef, useEffect } from 'react';
import { 
  Paperclip, 
  Lightbulb, 
  Play, 
  Zap,
  Sparkles,
  X,
  Brain,
  MessageSquare,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../services/api';
import './PromptBar.css';

const PromptBar = ({ 
  placeholder = "What should Aura create?", 
  onExecute, 
  isProcessing = false,
  className = "" 
}) => {
  const [prompt, setPrompt] = useState('');
  const [isExpanding, setIsExpanding] = useState(false);
  const textAreaRef = useRef(null);

  const handleExecute = () => {
    if (prompt && onExecute) {
      onExecute(prompt);
    }
  };

  const handleToggleStyle = (style) => {
    const styleTag = ` --${style.toLowerCase()}`;
    if (prompt.includes(styleTag)) {
      setPrompt(prev => prev.replace(styleTag, ''));
    } else {
      setPrompt(prev => prev + styleTag);
    }
  };

  const handleClear = () => {
    setPrompt('');
    if (textAreaRef.current) {
        textAreaRef.current.focus();
    }
  };

  const handleBrainstorm = async () => {
    setIsExpanding(true);
    try {
      const res = await api.ollama.generate("Suggest a creative and unique prompt for a cinematic AI video/image generator. Theme: " + (prompt || "Random Fusion") + ". Keep it under 60 words.");
      if (res.response) {
        setPrompt(res.response.trim());
      }
    } catch (e) {
      setPrompt(prev => prev + " --cinematic-brainstorm");
    } finally {
      setIsExpanding(false);
    }
  };

  const handleMagicRefine = async () => {
    if (!prompt || prompt.length < 5) return;
    setIsExpanding(true);
    try {
      const res = await api.ollama.refine(prompt);
      if (res.refined) {
        setPrompt(res.refined);
      }
    } catch (e) {
      // Fallback
      setPrompt(prev => prev + " --cinematic-lighting --ultra-detailed --8k --masterpiece");
    } finally {
      setIsExpanding(false);
    }
  };

  // Auto-resize the textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 250)}px`;
    }
  }, [prompt]);

  return (
    <motion.div 
      className={`aura-prompt-bar-v4 ${isProcessing || isExpanding ? 'processing' : ''} ${className}`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <motion.div 
        className="prompt-glass-inner"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="prompt-glow-border"></div>
        <div className="neural-scan-line"></div>
        
        <div className="prompt-layout">
          <div className="prompt-left-actions-group">
            <div className="prompt-left-actions">
               <button 
                 className="prompt-mini-btn" 
                 type="button" 
                 title="Brainstorm Mode (Ollama)"
                 onClick={handleBrainstorm}
                 disabled={isExpanding}
               >
                  <Brain size={18} className={isExpanding ? 'spin' : ''} />
               </button>
               <button 
                  className={`prompt-mini-btn magic-btn ${prompt.length > 5 ? 'ready' : ''}`} 
                  type="button" 
                  title="Neural Refine (Ollama)"
                  onClick={handleMagicRefine}
                  disabled={isExpanding || prompt.length < 5}
               >
                  {isExpanding ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} className="magic-sparkle" />}
               </button>
            </div>
          </div>

          <div className="input-field-wrapper">
             <textarea 
               ref={textAreaRef}
               className="prompt-main-input"
               placeholder={placeholder}
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               disabled={isProcessing || isExpanding}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   handleExecute();
                 }
               }}
               autoFocus
             />
             <AnimatePresence>
               {prompt && (
                 <motion.button 
                   className="prompt-clear-btn"
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.5 }}
                   onClick={handleClear}
                   title="Clear Prompt"
                 >
                   <X size={14} />
                 </motion.button>
               )}
             </AnimatePresence>
          </div>
          
          <div className="prompt-right-actions">
             <button 
               className={`prompt-create-btn ${prompt ? 'active' : ''} ${isProcessing ? 'loading' : ''}`}
               onClick={handleExecute}
               type="button"
               disabled={isProcessing || isExpanding || !prompt}
             >
                {isProcessing ? (
                   <>
                     <div className="btn-loader-v4" />
                     <span>SYNTHESIZING...</span>
                   </>
                ) : isExpanding ? (
                   <>
                     <RefreshCw size={14} className="spin me-2" />
                     <span>THINKING...</span>
                   </>
                ) : (
                   <>
                     <span>CREATE</span>
                     <Play size={12} fill="currentColor" />
                   </>
                )}
             </button>
          </div>
        </div>

        {/* Style Chips */}
        <div className="style-chips-cloud">
           {['Cinematic', 'Hyperistic', 'Cyberpunk', '8K Masterpiece', 'Noir', 'Anamorphic'].map(style => {
             const isActive = prompt.includes(` --${style.toLowerCase()}`);
             return (
               <button 
                 key={style} 
                 className={`style-chip ${isActive ? 'active' : ''}`}
                 onClick={() => handleToggleStyle(style)}
                 disabled={isExpanding}
               >
                 {style}
               </button>
             );
           })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PromptBar;
