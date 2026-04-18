import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  Upload, 
  Camera, 
  Sparkles, 
  Check, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  User,
  Activity,
  Shield,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import '../video-ai/ImageToVideo/ImageToVideo.css';
import '../../styles/pages/avatar/AvatarCreator.css';

const AvatarCreator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    method: null,
    name: '',
    file: null,
    settings: { precision: 'High', style: 'Realistic', voiceSync: true }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [tickerText, setTickerText] = useState('IDLE');
  const [resultAvatar, setResultAvatar] = useState(null);

  const methods = [
    { id: 'photo', icon: <Camera size={28} />, title: 'Visual Synthesis', desc: 'Generate from a single anchor photo', color: '#a855f7' },
    { id: 'video', icon: <Upload size={28} />, title: 'Kinetic Training', desc: '5-minute deep-drive video training', color: '#10b981', badge: 'ULTRA' },
    { id: 'preset', icon: <Bot size={28} />, title: 'Neural Template', desc: 'Selection of studio-tuned personas', color: '#f59e0b' },
  ];

  const handleUpdateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleInitializeTraining = async () => {
    setCurrentStep(3); // Training Phase
    setIsProcessing(true);
    setGenProgress(0);
    setTickerText('UPLOADING NEURAL ANCHORS...');

    const interval = setInterval(() => {
      setGenProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setTickerText('TRAINING COMPLETE');
          setResultAvatar({ id: 'av_1', name: formData.name });
          setCurrentStep(4);
          return 100;
        }
        if (p > 30) setTickerText('OPTIMIZING LATENT SPACE...');
        if (p > 70) setTickerText('STABILIZING PERSONA BIOMETRICS...');
        return p + 1.25;
      });
    }, 100);
  };

  return (
    <div className="fusion-dashboard">
      <header className="fusion-header">
        <div className="fh-left">
           <div className="fh-badge"><Shield size={10} /> PERSONA ENGINE v4.8</div>
           <h1 className="display-title">Aura <span className="text-secondary">Persona Engine</span></h1>
           <p className="tiny text-slate-500 uppercase font-black tracking-widest mt-1">Autonomous digital identity synthesis & neural character training hub.</p>
        </div>
        <div className="fh-right d-flex align-items-center gap-4">
           {currentStep > 1 && (
             <div className="step-nav-pills d-flex gap-2">
                {[1, 2, 3, 4].map(s => (
                   <div 
                     key={s} 
                     className={`step-dot ${currentStep === s ? 'active' : ''} ${currentStep > s ? 'done' : ''}`} 
                   />
                ))}
             </div>
           )}
           <div className="gpu-cluster-card p-3 glass-card">
              <div className="gpu-label-v4 tiny font-black uppercase text-slate-400 d-flex align-items-center gap-2">
                 <Activity size={12} className="text-emerald-400" /> Training State
              </div>
              <div className="gpu-mini-progress mt-1">
                <motion.div 
                    className="gpu-fill" 
                    animate={{ width: isProcessing ? '85%' : '5%' }} 
                    transition={{ duration: 1 }}
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="brainstorm-wizard-v4"
                >
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Zap size={10} /> CHAPTER 1</label>
                      <h2 className="display-6 fw-900 border-none text-white">Select Methodology</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Choose the synthesis pipeline for your digital identity.</p>
                   </div>

                   <div className="method-grid-aura">
                      {methods.map(m => (
                        <div 
                           key={m.id} 
                           className={`method-card-aura glass-card p-4 mb-3 ${formData.method === m.id ? 'active' : ''}`}
                           onClick={() => handleUpdateData({ method: m.id })}
                        >
                           <div className="d-flex align-items-center gap-3">
                              <div className="m-icon" style={{ color: m.color }}>{m.icon}</div>
                              <div>
                                 <h4 className="tiny font-black text-white m-0">{m.title}</h4>
                                 <p className="tiny text-slate-500 m-0">{m.desc}</p>
                              </div>
                           </div>
                           {m.badge && <span className="m-badge">{m.badge}</span>}
                        </div>
                      ))}
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button 
                        className="primary-aura-btn w-100" 
                        disabled={!formData.method}
                        onClick={() => setCurrentStep(2)}
                      >
                         <span>Initialize Setup</span>
                         <ChevronRight size={18} />
                      </button>
                   </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="brainstorm-wizard-v4"
                >
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Layers size={10} /> CHAPTER 2</label>
                      <h2 className="display-6 fw-900 border-none text-white">Identity Parameters</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Provide labels and visual anchors for neural indexing.</p>
                   </div>

                   <div className="glass-card p-4 mb-4">
                      <label className="tiny-label mb-2">Persona Name</label>
                      <input 
                         type="text" 
                         className="aura-input w-100" 
                         placeholder="e.g. Executive Avatar V1"
                         value={formData.name}
                         onChange={(e) => handleUpdateData({ name: e.target.value })}
                      />
                   </div>

                   <div className="upload-zone-aura mb-4" onClick={() => document.getElementById('persona-file').click()}>
                      <Upload size={32} className="text-primary mb-2 mx-auto" />
                      <p className="tiny text-white font-black uppercase">Upload Visual Anchor</p>
                      <span className="tiny text-slate-500 block">Drag & Drop JPG/MP4</span>
                      <input id="persona-file" type="file" hidden />
                   </div>

                   <div className="wizard-footer-aura mt-5 d-flex gap-3">
                      <button className="secondary-aura-btn flex-fill" onClick={() => setCurrentStep(1)}>
                         <ChevronLeft size={18} />
                         <span>Method</span>
                      </button>
                      <button 
                         className="primary-aura-btn flex-fill" 
                         disabled={!formData.name}
                         onClick={handleInitializeTraining}
                      >
                         <span>Start Training</span>
                         <Sparkles size={18} />
                      </button>
                   </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <div key="step3" className="processing-wizard-aura brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Activity size={10} /> NEURAL TRAINING</label>
                      <h2 className="display-6 fw-900 border-none text-white">Synthesis Phase</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Training neural nodes. Calibrating lip-sync weights and facial skinning.</p>
                   </div>
                   <div className="glass-card p-5 text-center border-none" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="status-blip-large active mx-auto mb-4" />
                      <h4 className="tiny font-black text-white uppercase tracking-widest">{tickerText}</h4>
                      <div className="nv-progress-container mt-4" style={{ height: '4px' }}>
                         <motion.div 
                            className="nv-progress-fill" 
                            animate={{ width: `${genProgress}%` }}
                         />
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div key="step4" className="brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-emerald-400 d-flex align-items-center gap-2"><Check size={10} /> FINAL CHAPTER</label>
                      <h2 className="display-6 fw-900 border-none text-white">Persona Verified</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Aura synthesis successful. Character is now ready for global production.</p>
                   </div>

                   <div className="glass-card p-4 mb-4 text-center">
                      <div className="avatar-placeholder-v4 mx-auto mb-4">
                         <User size={64} className="text-secondary" />
                      </div>
                      <h3 className="tiny font-black uppercase text-white">{formData.name}</h3>
                      <p className="tiny text-emerald-400">STATUS: READY FOR PRODUCTION</p>
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button className="primary-aura-btn w-100 mb-3" onClick={() => window.location.reload()}>
                         <Zap size={18} />
                         <span>Deploy in Video Studio</span>
                      </button>
                      <button className="secondary-aura-btn w-100" onClick={() => setCurrentStep(1)}>
                         Initialization New Training
                      </button>
                   </div>
                </div>
              )}
           </AnimatePresence>
        </aside>

        <section className="fusion-viewport-container">
           <div className="neural-viewport-v4 persona-viewport">
              <div className="nv-header">
                 <div className="d-flex align-items-center gap-3">
                    <div className="status-blip active" />
                    <span className="tiny font-black text-white uppercase tracking-widest">LIVE BIOMETRIC MONITOR</span>
                 </div>
              </div>
              <div className="nv-content d-grid place-items-center">
                 <div className="text-center">
                    {currentStep === 3 ? (
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="biometric-mesh"
                      >
                         <Layers size={80} className="text-primary mb-4" />
                         <p className="tiny font-black text-primary uppercase">MESHING IDENTITY...</p>
                      </motion.div>
                    ) : resultAvatar ? (
                      <div className="avatar-preview-final">
                         <div className="status-circle pulse"></div>
                         <Bot size={120} className="text-white mb-4" />
                         <h2 className="text-white font-black uppercase tracking-widest">PERSONA_001_ACTIVE</h2>
                      </div>
                    ) : (
                      <div className="text-center opacity-25">
                         <User size={80} className="mb-4" />
                         <p className="tiny font-black uppercase">Awaiting Neural Link</p>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default AvatarCreator;
