import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, X, Zap, Sliders, 
  FileDown, Share2, Sparkles,
  Combine, Scissors, Layout, Search,
  Palette, Bot, Mic, Monitor
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';

const RECOMMENDATIONS = {
  'merge': [
    { id: 'compress', label: 'Compress PDF', icon: Zap, color: '#ef4444', desc: 'Reduce file size for sharing' },
    { id: 'organize-pdf', label: 'Rearrange Pages', icon: Layout, color: '#42a5f5', desc: 'Sort or delete merged pages' },
    { id: 'scan-to-pdf', label: 'Optical Scan (OCR)', icon: Search, color: '#10b981', desc: 'Make text searchable' }
  ],
  'image-generator': [
    { id: 'social-dashboard', label: 'Post to Social', icon: Share2, color: '#db2777', desc: 'Share your creation instantly' },
    { id: 'avatar-dashboard', label: 'Animate to Avatar', icon: Bot, color: '#2563eb', desc: 'Turn this into a talking AI' },
    { id: 'video-dashboard', label: 'Add to Studio', icon: Monitor, color: '#7c3aed', desc: 'Insert into cinematic timeline' }
  ],
  'text-to-speech': [
    { id: 'video-dashboard', label: 'Sync to Video', icon: Monitor, color: '#7c3aed', desc: 'Combine audio with visuals' },
    { id: 'social-dashboard', label: 'Create Podcast', icon: Mic, color: '#f59e0b', desc: 'Export as episodic media' }
  ],
  'compress': [
    { id: 'social-dashboard', label: 'Quick Share', icon: Share2, color: '#db2777', desc: 'Compressed & ready for email' },
    { id: 'merge', label: 'Add more files', icon: Combine, color: '#ef4444', desc: 'Combine with other docs' }
  ]
};

const DEFAULT_REC = [
  { id: 'files', label: 'View in Library', icon: FileDown, color: '#64748b', desc: 'Manage your output assets' },
  { id: 'dashboard', label: 'Back to Dashboard', icon: Sparkles, color: '#8b5cf6', desc: 'Start a new production' }
];

const NextActionRail = () => {
  const { recentCompletion, setRecentCompletion } = useTasks();
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!recentCompletion) return [];
    return RECOMMENDATIONS[recentCompletion.toolId] || DEFAULT_REC;
  }, [recentCompletion]);

  if (!recentCompletion) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="next-action-rail-aura"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="rail-blur-bg"></div>
        <div className="rail-content">
          <div className="rail-header">
             <div className="success-pulse">
                <div className="pulse-ring"></div>
                <Zap size={14} fill="currentColor" />
             </div>
             <div className="header-info">
                <h3>{recentCompletion.name} Complete!</h3>
                <p>What's the next step in your workflow?</p>
             </div>
             <button className="rail-close" onClick={() => setRecentCompletion(null)}>
                <X size={16} />
             </button>
          </div>

          <div className="rail-suggestions">
             {suggestions.map((step, idx) => (
               <motion.button 
                 key={step.id}
                 className="step-action-card"
                 whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => {
                   navigate(`/${step.id}`);
                   setRecentCompletion(null);
                 }}
               >
                 <div className="step-icon" style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                    <step.icon size={18} />
                 </div>
                 <div className="step-info">
                    <span className="step-label">{step.label}</span>
                    <span className="step-desc">{step.desc}</span>
                 </div>
                 <ArrowRight size={14} className="step-arrow" />
               </motion.button>
             ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NextActionRail;
