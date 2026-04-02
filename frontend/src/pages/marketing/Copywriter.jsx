import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Activity,
  Shield,
  BotIcon,
  Copy,
  Layout,
  MessageSquare,
  RefreshCw,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import '../video-ai/ImageToVideo/ImageToVideo.css';

const Copywriter = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    objective: 'Sales Copy',
    context: '',
    tone: 'Professional',
    result: null
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [tickerText, setTickerText] = useState('IDLE');

  const objectives = [
    { id: 'sales', icon: <Rocket size={28} />, title: 'Sales Copy', desc: 'High-conversion direct response copy', color: '#f59e0b' },
    { id: 'social', icon: <MessageSquare size={28} />, title: 'Social Posts', desc: 'Engaging content for all platforms', color: '#3b82f6' },
    { id: 'email', icon: <Zap size={28} />, title: 'Email Engine', desc: 'Nurture sequences and newsletters', color: '#10b981' },
    { id: 'blog', icon: <Layout size={28} />, title: 'Content Forge', desc: 'SEO-optimized articles and blogs', color: '#a855f7' },
  ];

  const handleSynthesize = async () => {
    setCurrentStep(3); // Synthesis Phase
    setIsProcessing(true);
    setTickerText('CONNECTING TO LOCAL BRAIN (OLLAMA)...');

    try {
       const prompt = `Write a professional ${formData.objective} for the following context: ${formData.context}. Use a ${formData.tone} tone. Be creative and concise.`;
       const res = await api.ollama.generate(prompt);
       
       setTickerText('REFYNING SEMANTIC DENSITY...');
       await new Promise(r => setTimeout(r, 1500));
       
       setFormData(p => ({ ...p, result: res.response }));
       setCurrentStep(4);
    } catch (e) {
       setTickerText('NEURAL HANDSHAKE FAILED. FALLBACK ACTIVE.');
       setFormData(p => ({ ...p, result: "Fallback Copy: Discover the peak of AI innovation with Aura. Experience autonomous creative production at the speed of thought." }));
       await new Promise(r => setTimeout(r, 2000));
       setCurrentStep(4);
    } finally {
       setIsProcessing(false);
    }
  };

  return (
    <div className="fusion-dashboard" style={{ background: '#0a0a0c' }}>
      <header className="fusion-header p-5 border-bottom border-white/5">
        <div className="fh-left">
           <div className="fh-badge"><Shield size={10} /> GROWTH NEXUS v4.5</div>
           <h1 className="display-title h1 font-black text-white">Neural <span className="text-secondary text-amber-400">Copywriter</span></h1>
           <p className="tiny text-slate-500 uppercase font-black tracking-widest mt-1">Autonomous high-velocity copywriting and semantic growth engine.</p>
        </div>
        <div className="fh-right d-flex align-items-center gap-4">
           {currentStep > 1 && (
             <div className="step-nav-pills d-flex gap-2">
                {[1, 2, 3, 4].map(s => (
                   <div key={s} className={`step-dot ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'done' : ''}`} />
                ))}
             </div>
           )}
           <div className="gpu-cluster-card p-3 glass-card">
              <div className="gpu-label-v4 tiny font-black uppercase text-slate-400 d-flex align-items-center gap-2">
                 <Activity size={12} className={isProcessing ? 'text-amber-400' : 'text-slate-500'} /> LLM Sync State
              </div>
              <div className="gpu-mini-progress mt-1">
                <motion.div 
                    className="gpu-fill" 
                    animate={{ width: isProcessing ? '95%' : '4%' }} 
                    style={{ background: '#f59e0b' }}
                />
              </div>
           </div>
        </div>
      </header>

      <div className="fusion-grid mt-5">
        <aside className="fusion-control-panel glass-card p-4">
           <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="brainstorm-wizard-v4"
                >
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-amber-400 d-flex align-items-center gap-2"><Sparkles size={10} /> CHAPTER 1</label>
                      <h2 className="display-6 fw-900 border-none text-white">Select Objective</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Choose the semantic goal for your growth content.</p>
                   </div>

                   <div className="method-grid-aura">
                      {objectives.map(obj => (
                        <div 
                           key={obj.id} 
                           className={`method-card-aura glass-card p-4 mb-3 ${formData.objective === obj.title ? 'active' : ''}`}
                           onClick={() => setFormData(p => ({ ...p, objective: obj.title }))}
                        >
                           <div className="d-flex align-items-center gap-3">
                              <div className="m-icon" style={{ color: obj.color }}>{obj.icon}</div>
                              <div>
                                 <h4 className="tiny font-black text-white m-0">{obj.title}</h4>
                                 <p className="tiny text-slate-500 m-0">{obj.desc}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button className="primary-aura-btn w-100" onClick={() => setCurrentStep(2)} style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                         <span>Initialize Setup</span>
                         <ChevronRight size={18} />
                      </button>
                   </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="brainstorm-wizard-v4"
                >
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-amber-400 d-flex align-items-center gap-2"><PenTool size={10} /> CHAPTER 2</label>
                      <h2 className="display-6 fw-900 border-none text-white">Semantic Context</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Provide the raw context for the neural authoring engine.</p>
                   </div>

                   <div className="glass-card p-4 mb-4">
                      <textarea 
                         className="aura-input w-100" 
                         rows={5}
                         placeholder="e.g. A new luxury watch collection launch for young professionals..."
                         value={formData.context}
                         onChange={(e) => setFormData(p => ({ ...p, context: e.target.value }))}
                      />
                   </div>

                   <div className="tone-picker d-flex flex-wrap gap-2 mb-4">
                      {['Professional', 'Excited', 'Minimalist', 'Punchy'].map(tone => (
                        <button 
                           key={tone} 
                           className={`tab-pill px-3 flex-fill ${formData.tone === tone ? 'active' : ''}`}
                           onClick={() => setFormData(p => ({ ...p, tone }))}
                        >
                           {tone}
                        </button>
                      ))}
                   </div>

                   <div className="wizard-footer-aura mt-5 d-flex gap-3">
                      <button className="secondary-aura-btn flex-fill" onClick={() => setCurrentStep(1)}>
                         <ChevronLeft size={18} />
                         <span>Objective</span>
                      </button>
                      <button 
                         className="primary-aura-btn flex-fill" 
                         disabled={!formData.context}
                         onClick={handleSynthesize}
                         style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                      >
                         <span>Synthesize Copy</span>
                         <Zap size={18} />
                      </button>
                   </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <div key="step3" className="processing-wizard-aura brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-amber-400 d-flex align-items-center gap-2"><Activity size={10} /> NEURAL AUTHORING</label>
                      <h2 className="display-6 fw-900 border-none text-white">Processing Brain</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Synthesizing narrative nodes. Calibrating conversion weights and persuasive arcs.</p>
                   </div>
                   <div className="glass-card p-5 text-center border-none" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <RefreshCw size={48} className="text-amber-500 spin mx-auto mb-4" />
                      <h4 className="tiny font-black text-white uppercase tracking-widest">{tickerText}</h4>
                      <div className="nv-progress-container mt-4" style={{ height: '4px' }}>
                         <motion.div 
                            className="nv-progress-fill" 
                            style={{ background: '#f59e0b' }}
                            animate={{ width: ['0%', '100%'] }}
                            transition={{ duration: 5 }}
                         />
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div key="step4" className="brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-amber-400 d-flex align-items-center gap-2"><Check size={10} /> FINAL CHAPTER</label>
                      <h2 className="display-6 fw-900 border-none text-white">Copy Synthesized</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Aura growth authoring successful. Content is now ready for deployment.</p>
                   </div>

                   <div className="glass-card p-5 mb-4 position-relative">
                      <button 
                        className="btn-copy-absolute p-2 bg-white/5 border border-white/10 rounded-lg"
                        onClick={() => navigator.clipboard.writeText(formData.result)}
                      >
                         <Copy size={16} className="text-amber-400" />
                      </button>
                      <p className="tiny text-white font-medium m-0 leading-relaxed italic">"{formData.result}"</p>
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button className="primary-aura-btn w-100 mb-3" onClick={() => window.location.reload()} style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                         <Zap size={18} />
                         <span>Deploy in Social Campaigns</span>
                      </button>
                      <button className="secondary-aura-btn w-100" onClick={() => setCurrentStep(1)}>
                         Generate New Variant
                      </button>
                   </div>
                </div>
              )}
           </AnimatePresence>
        </aside>

        <section className="fusion-viewport-container">
           <div className="neural-viewport-v4 marketing-viewport p-5 overflow-auto">
              <div className="nv-content d-grid place-items-center h-100">
                 <div className="text-center">
                    <BotIcon size={140} className="text-amber-500 mx-auto mb-5 opacity-20" />
                    <h2 className="display-4 font-black text-white m-0 tracking-tighter opacity-10">AURA GROWTH NEXUS</h2>
                    <p className="tiny font-black text-slate-800 uppercase tracking-[1em]">Local LLM Integrated</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Copywriter;
