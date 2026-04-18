import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  Layout, 
  Trash2, 
  Plus, 
  Maximize2,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../../services/api';

const Step1Brainstorm = ({ formData, onUpdate, onNext }) => {
  const [isParsing, setIsParsing] = useState(false);
  const [scenes, setScenes] = useState([
    { id: 1, text: 'Opening scene: Cyberpunk city at night.', prompt: 'Atmospheric cyberpunk cityscape, rainy night, neon signs.', duration: 5 },
    { id: 2, text: 'The protagonist walking towards the neural link.', prompt: 'Cinematic wide shot, hooded figure, glowing cables.', duration: 4 }
  ]);

  const [isBrainstorming, setIsBrainstorming] = useState(false);

  const handleBrainstorm = async () => {
    if (!formData.concept) return;
    setIsBrainstorming(true);
    try {
      const res = await api.video.breakdown({ prompt: formData.concept });
      if (res && res.scenes) {
        setScenes(res.scenes.map((s, idx) => ({
          id: Date.now() + idx,
          text: s.description || s.text,
          prompt: s.visual_prompt || s.prompt,
          duration: s.duration || 5
        })));
      }
    } catch (err) {
      console.error("Brainstorming failed:", err);
    } finally {
      setIsBrainstorming(false);
    }
  };

  const handleApply = () => {
    onUpdate({ scenes });
    onNext();
  };

  const addScene = () => {
    setScenes([...scenes, { id: Date.now(), text: '', prompt: '', duration: 5 }]);
  };

  const removeScene = (id) => {
    setScenes(scenes.filter(s => s.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="brainstorm-wizard-v4"
    >
      <div className="wizard-header-v4 mb-5">
         <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Activity size={10} /> CHAPTER 1</label>
         <h2 className="display-6 fw-900 border-none text-white">Concept & Storyboarding</h2>
         <p className="tiny text-slate-500 uppercase font-black tracking-widest">Aura will automatically split your semantic vision into synchronized visual scenes.</p>
      </div>

      <div className="storyboard-track mt-4">
         <AnimatePresence mode="popLayout">
           {scenes.map((scene, idx) => (
             <motion.div 
               key={scene.id}
               layout
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="scene-block-v4 glass-card p-4 mb-3"
             >
                <div className="scene-block-header d-flex justify-content-between">
                   <span className="scene-tag-v4">SCENE {idx + 1}</span>
                   <button onClick={() => removeScene(scene.id)} className="scene-del-btn"><Trash2 size={12} /></button>
                </div>
                <div className="scene-fields-v4 mt-3">
                   <textarea 
                     placeholder="Semantic description of this scene..."
                     value={scene.text}
                     onChange={(e) => {
                        const newScenes = [...scenes];
                        newScenes[idx].text = e.target.value;
                        setScenes(newScenes);
                     }}
                   />
                </div>
             </motion.div>
           ))}
         </AnimatePresence>

         <button onClick={addScene} className="add-scene-btn-v4 w-100 p-4 dashed-aura mt-2">
            <Plus size={20} />
            <span>Integrate New Scene</span>
         </button>
      </div>

      <div className="wizard-footer-aura mt-5 d-flex gap-4">
         <button className="primary-aura-btn" onClick={handleApply}>
            <span>Initialize Production</span>
            <ChevronRight size={18} />
         </button>
         <button className="secondary-aura-btn" onClick={handleBrainstorm} disabled={isBrainstorming}>
            {isBrainstorming ? <Activity size={18} className="spinning" /> : <Sparkles size={18} />}
            <span>{isBrainstorming ? 'Brainstorming...' : 'Auto-Brainstorm'}</span>
         </button>
      </div>
    </motion.div>
  );
};

export default Step1Brainstorm;
