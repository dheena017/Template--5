import React from 'react';
import { 
  Download, 
  Share2, 
  RotateCcw, 
  Scissors, 
  CheckCircle2,
  Activity,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const Step5Review = ({ resultVideo, onRestart, onTweak }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="review-wizard-v4"
    >
      <div className="wizard-header-v4 mb-5">
         <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Activity size={10} /> FINAL CHAPTER</label>
         <h2 className="display-6 fw-900 border-none text-white">Synthesis Finalized</h2>
         <p className="tiny text-slate-500 uppercase font-black tracking-widest">Neural consistency verified. Your visual asset is ready for global distribution.</p>
      </div>

      <div className="review-stats-aura mt-4 glass-card p-4 mb-4">
         <div className="d-flex justify-content-between align-items-center">
            <div className="s-stat">
               <span className="tiny-label block mb-1">Resolution</span>
               <span className="text-white font-black uppercase">4K HDR Atmospheric</span>
            </div>
            <div className="s-stat text-end">
               <span className="tiny-label block mb-1">Engine</span>
               <span className="text-emerald-400 font-black uppercase">Aura Nucleus v4.2</span>
            </div>
         </div>
      </div>

      <div className="action-grid-aura mt-4">
         <button className="primary-aura-btn w-100 mb-3">
            <Download size={18} />
            <span>Download Master Asset</span>
         </button>
         
         <div className="d-flex gap-3">
            <button className="secondary-aura-btn flex-fill" onClick={onTweak}>
               <RotateCcw size={16} />
               <span>Tweak</span>
            </button>
            <button className="secondary-aura-btn flex-fill">
               <Share2 size={16} />
               <span>Share</span>
            </button>
         </div>
      </div>

      <div className="next-steps-aura mt-5">
         <h4 className="tiny-label mb-4 d-flex align-items-center gap-2"><Sparkles size={14} className="text-secondary" /> Production Extensions</h4>
         <div className="extension-list-aura">
            <div className="xt-item-aura glass-card p-3 mb-2 d-flex justify-content-between align-items-center">
               <div className="d-flex align-items-center gap-3">
                  <Scissors size={14} className="text-primary" />
                  <span className="tiny text-white font-black uppercase tracking-widest">AI Highlights</span>
               </div>
               <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
            <div className="xt-item-aura glass-card p-3 mb-2 d-flex justify-content-between align-items-center" style={{ opacity: 0.5 }}>
               <div className="d-flex align-items-center gap-3">
                  <Activity size={14} className="text-info" />
                  <span className="tiny text-white font-black uppercase tracking-widest">Temporal Upscale</span>
               </div>
               <span className="tiny font-black text-slate-500">PRO</span>
            </div>
         </div>
      </div>

      <div className="wizard-footer-aura mt-5">
         <button className="btn-link-sec w-100" onClick={onRestart}>
            Initialize New Production
         </button>
      </div>
    </motion.div>
  );
};

export default Step5Review;
