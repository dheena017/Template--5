import React from 'react';
import { 
  Palette, 
  ChevronRight, 
  ChevronLeft, 
  Settings, 
  Volume2, 
  Monitor,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Step2Parameters = ({ formData, onUpdate, onNext, onBack }) => {
  const styles = ['Cinematic', 'Realistic', 'Cyberpunk', 'Anime', 'Oil Painting', 'Abstract'];
  const formats = ['16:9 Landscape', '9:16 Portrait', '1:1 Square', '21:9 UltraWide'];

  const handleChange = (key, value) => {
    onUpdate({ promptElements: { ...formData.promptElements, [key]: value } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="parameters-wizard-v4"
    >
      <div className="wizard-header-v4 mb-5">
         <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Activity size={10} /> CHAPTER 2</label>
         <h2 className="display-6 fw-900 border-none text-white">Visual Refinement</h2>
         <p className="tiny text-slate-500 uppercase font-black tracking-widest">Select the aesthetic seed and technical parameters for the synthesis engine.</p>
      </div>

      <div className="params-grid-aura mt-4">
         <section className="param-section-v4 glass-card p-4 mb-4">
            <h4 className="tiny-label mb-4 d-flex align-items-center gap-2"><Palette size={14} className="text-secondary" /> Cinematic Style</h4>
            <div className="style-pills-aura d-flex flex-wrap gap-2">
               {styles.map(s => (
                 <button 
                   key={s} 
                   className={`style-pill-v4 ${formData.promptElements.style === s ? 'active' : ''}`}
                   onClick={() => handleChange('style', s)}
                 >
                    {s}
                 </button>
               ))}
            </div>
         </section>

         <section className="param-section-v4 glass-card p-4 mb-4">
            <h4 className="tiny-label mb-4 d-flex align-items-center gap-2"><Monitor size={14} className="text-info" /> Output Format</h4>
            <select 
               className="param-select-aura w-100"
               value={formData.promptElements.format || '16:9 Landscape'}
               onChange={(e) => handleChange('format', e.target.value)}
            >
               {formats.map(f => <option key={f}>{f}</option>)}
            </select>
         </section>

         <section className="param-section-v4 glass-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center">
               <h4 className="tiny-label m-0 d-flex align-items-center gap-2"><Volume2 size={14} className="text-warning" /> Audio Synthesis</h4>
               <label className="aura-switch">
                  <input 
                    type="checkbox" 
                    checked={formData.promptElements.audio}
                    onChange={(e) => handleChange('audio', e.target.checked)}
                  />
                  <span className="aura-slider"></span>
               </label>
            </div>
            <p className="tiny text-slate-500 mt-3 uppercase font-black tracking-widest">Enable atmospheric audio generation synchronized to motion.</p>
         </section>
      </div>

      <div className="wizard-footer-aura mt-5 d-flex gap-4">
         <button className="primary-aura-btn" onClick={onNext}>
            <span>Initialize Engine</span>
            <ChevronRight size={18} />
         </button>
         <button className="secondary-aura-btn" onClick={onBack}>
            <ChevronLeft size={18} />
            <span>Go Back</span>
         </button>
      </div>
    </motion.div>
  );
};

export default Step2Parameters;
