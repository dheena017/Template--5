import React, { useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  ChevronRight, 
  ChevronLeft, 
  Trash2,
  Activity,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Step3Frames = ({ formData, onUpdate, onNext, onBack }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="frames-wizard-v4"
    >
      <div className="wizard-header-v4 mb-5">
         <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Activity size={10} /> CHAPTER 3</label>
         <h2 className="display-6 fw-900 border-none text-white">Visual Seed Selection</h2>
         <p className="tiny text-slate-500 uppercase font-black tracking-widest">Upload the base image or select a frame to anchor the neural movement.</p>
      </div>

      <div className="upload-container-aura mt-4">
         <div 
           className={`upload-zone-aura glass-card ${formData.image ? 'has-image' : ''}`}
           onClick={() => !formData.image && fileInputRef.current.click()}
         >
            <AnimatePresence mode="wait">
               {formData.image ? (
                 <motion.div 
                   key="preview"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="image-preview-wrapper"
                 >
                    <img src={formData.image} alt="Seed" className="seed-image-v4" />
                    <button 
                      className="remove-seed-btn" 
                      onClick={(e) => { e.stopPropagation(); onUpdate({ image: null }); }}
                    >
                       <Trash2 size={16} />
                    </button>
                 </motion.div>
               ) : (
                 <motion.div 
                   key="placeholder"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="upload-placeholder-content"
                 >
                    <div className="upload-pulse-icon-v4">
                       <Upload size={32} className="text-primary" />
                    </div>
                    <h4 className="mt-4 text-white uppercase font-black tracking-widest text-sm">Drop Vision Asset</h4>
                    <p className="tiny text-slate-500 mt-2">RAW, PNG, or JPEG formats supported (Up to 25MB)</p>
                 </motion.div>
               )}
            </AnimatePresence>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="d-none" 
              accept="image/*"
              onChange={handleFileChange}
            />
         </div>

         <div className="stock-suggestions-aura mt-5">
            <h4 className="tiny-label mb-4 d-flex align-items-center gap-2"><Sparkles size={14} className="text-secondary" /> Recent Library Masters</h4>
            <div className="stock-grid-aura d-flex gap-3 overflow-auto pb-3">
               {[
                 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=200',
                 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
                 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=200',
                 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=200'
               ].map((url, i) => (
                 <div 
                   key={i} 
                   className="stock-thumb-aura"
                   onClick={() => onUpdate({ image: url })}
                 >
                    <img src={url} alt="" />
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="wizard-footer-aura mt-5 d-flex gap-4">
         <button 
           className="primary-aura-btn" 
           onClick={onNext}
           disabled={!formData.image}
         >
            <span>Proceed to Synthesis</span>
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

export default Step3Frames;
