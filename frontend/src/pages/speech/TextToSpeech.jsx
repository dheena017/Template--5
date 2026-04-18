import React, { useState } from 'react';
import { 
  Speaker, 
  Settings, 
  Play, 
  Download, 
  Sparkles, 
  Activity, 
  Shield, 
  ChevronRight, 
  ChevronLeft,
  Mic,
  Waves,
  Music,
  Check,
  Zap,
  BotIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import '../video-ai/ImageToVideo/ImageToVideo.css';
import '../../styles/pages/speech/TextToSpeech.css';

const TextToSpeech = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    text: '',
    voice: 'Narrator Prime',
    settings: { stability: 0.65, similarity: 0.75, style: 0.1 },
    audioUrl: null
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('IDLE');

  const voices = [
    { id: 'v1', name: 'Narrator Prime', desc: 'Cinematic documentary tone', gender: 'Male' },
    { id: 'v2', name: 'Executive Aura', desc: 'Professional corporate clarity', gender: 'Female' },
    { id: 'v3', name: 'Nova Synth', desc: 'Futuristic AI assistant', gender: 'Non-binary' },
    { id: 'v4', name: 'Storyteller Pro', desc: 'Deep emotional narrative', gender: 'Male' },
  ];

  const handleSynthesize = async () => {
    setCurrentStep(3); // Synthesis Phase
    setIsProcessing(true);
    setProgress(10);
    setStatusMessage('UPLOADING NEURAL SCRIPT...');

    // Simulate multi-stage synthesis
    const stages = [
      { p: 30, m: 'WARPING VOCAL CORDS...' },
      { p: 60, m: 'BLENDING EMOTIONAL PITCH...' },
      { p: 85, m: 'CLEANING SONIC NOISE...' },
      { p: 100, m: 'GENERATING LOSSLESS MASTER...' }
    ];

    for (const stage of stages) {
      await new Promise(r => setTimeout(r, 1200));
      setProgress(stage.p);
      setStatusMessage(stage.m);
    }

    setIsProcessing(false);
    setFormData(prev => ({ 
      ...prev, 
      audioUrl: 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13e69d2.mp3' // Mock Result
    }));
    setCurrentStep(4);
  };

  return (
    <div className="fusion-dashboard">
      <header className="fusion-header">
        <div className="fh-left">
           <div className="fh-badge"><Shield size={10} /> SONIC SYNTH v5.2</div>
           <h1 className="display-title h1 font-black text-white">Aura <span className="text-secondary text-indigo-400">Voice Synth</span></h1>
           <p className="tiny text-slate-500 uppercase font-black tracking-widest mt-1">Autonomous neural text-to-speech and vocal mastering studio.</p>
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
                 <Activity size={12} className="text-indigo-400" /> Sonic Sync Pulse
              </div>
              <div className="gpu-mini-progress mt-1">
                <motion.div 
                    className="gpu-fill" 
                    animate={{ width: isProcessing ? '90%' : '5%' }} 
                    transition={{ duration: 1.5 }}
                    style={{ background: '#818cf8' }}
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
                      <label className="tiny-label text-indigo-400 d-flex align-items-center gap-2"><Sparkles size={10} /> CHAPTER 1</label>
                      <h2 className="display-6 fw-900 border-none text-white">Voice Selection</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Select the neural signature for your synthesis.</p>
                   </div>

                   <div className="voice-grid-aura mb-4">
                      {voices.map(v => (
                         <div 
                           key={v.id} 
                           className={`voice-card-v5 glass-card p-4 mb-2 ${formData.voice === v.name ? 'active' : ''}`}
                           onClick={() => setFormData(p => ({ ...p, voice: v.name }))}
                         >
                            <div className="d-flex align-items-center gap-3">
                               <div className="v-icon-box"><Mic size={18} /></div>
                               <div>
                                  <h4 className="tiny font-black text-white m-0">{v.name}</h4>
                                  <p className="tiny text-slate-500 m-0">{v.desc}</p>
                               </div>
                            </div>
                            <button className="play-btn-mini"><Play size={12} fill="currentColor" /></button>
                         </div>
                      ))}
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button 
                        className="primary-aura-btn w-100" 
                        onClick={() => setCurrentStep(2)}
                        disabled={!formData.voice}
                        style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                      >
                         <span>Configure Parameters</span>
                         <Settings size={18} />
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
                      <label className="tiny-label text-indigo-400 d-flex align-items-center gap-2"><Zap size={10} /> CHAPTER 2</label>
                      <h2 className="display-6 fw-900 border-none text-white">Vocal Scripting</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Provide the raw text for neural re-skinning.</p>
                   </div>

                   <div className="glass-card p-4 mb-4">
                      <textarea 
                         className="aura-input w-100" 
                         rows={6}
                         placeholder="Enter cinematic narration or dialogue here..."
                         value={formData.text}
                         onChange={(e) => setFormData(p => ({ ...p, text: e.target.value }))}
                      />
                   </div>

                   <div className="sonic-parameters glass-card p-4">
                      <div className="p-item mb-3">
                         <div className="d-flex justify-content-between mb-1">
                            <label className="tiny-label">Stability</label>
                            <span className="tiny text-indigo-400">65%</span>
                         </div>
                         <div className="p-slider-track"><div className="fill" style={{ width: '65%', background: '#818cf8' }}></div></div>
                      </div>
                      <div className="p-item">
                         <div className="d-flex justify-content-between mb-1">
                            <label className="tiny-label">Clarity / Similarity</label>
                            <span className="tiny text-indigo-400">75%</span>
                         </div>
                         <div className="p-slider-track"><div className="fill" style={{ width: '75%', background: '#818cf8' }}></div></div>
                      </div>
                   </div>

                   <div className="wizard-footer-aura mt-5 d-flex gap-3">
                      <button className="secondary-aura-btn flex-fill" onClick={() => setCurrentStep(1)}>
                         <ChevronLeft size={18} />
                         <span>Voices</span>
                      </button>
                      <button 
                         className="primary-aura-btn flex-fill" 
                         disabled={!formData.text}
                         onClick={handleSynthesize}
                         style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                      >
                         <span>Synthesize Master</span>
                         <Waves size={18} />
                      </button>
                   </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <div key="step3" className="processing-wizard-aura brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-indigo-400 d-flex align-items-center gap-2"><Activity size={10} /> SONIC SYNTHESIS</label>
                      <h2 className="display-6 fw-900 border-none text-white">Kinetic Fusion</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Synthesizing vocal anchors. Stabilizing pitch nodes and temporal breath.</p>
                   </div>
                   <div className="glass-card p-5 text-center border-none" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="status-blip-large active mx-auto mb-4 bg-indigo-500" />
                      <h4 className="tiny font-black text-white uppercase tracking-widest">{statusMessage}</h4>
                      <div className="nv-progress-container mt-4" style={{ height: '4px' }}>
                         <motion.div 
                            className="nv-progress-fill" 
                            style={{ background: 'linear-gradient(90deg, #6366f1, #a855f7)' }}
                            animate={{ width: `${progress}%` }}
                         />
                      </div>
                   </div>
                </div>
              )}

              {currentStep === 4 && (
                <div key="step4" className="brainstorm-wizard-v4">
                   <div className="wizard-header-v4 mb-5">
                      <label className="tiny-label text-indigo-400 d-flex align-items-center gap-2"><Check size={10} /> FINAL CHAPTER</label>
                      <h2 className="display-6 fw-900 border-none text-white">Vocal Master Ready</h2>
                      <p className="tiny text-slate-500 uppercase font-black tracking-widest">Aura sonic synthesis successful. Audio is now ready for production.</p>
                   </div>

                   <div className="glass-card p-4 mb-4 text-center">
                      <div className="audio-player-v5 mb-3">
                         <div className="d-flex align-items-center gap-3 justify-content-center p-3 bg-white/5 rounded-2xl">
                            <button className="play-circle-btn"><Play size={24} fill="white" /></button>
                            <div className="wave-sim-v5 flex-fill d-flex gap-1 align-items-center">
                               {[20, 60, 40, 80, 50, 30, 70, 90, 40, 60].map((h, i) => (
                                 <motion.div 
                                    key={i} 
                                    className="wave-bar bg-indigo-400" 
                                    style={{ height: `${h}%`, width: '4px', borderRadius: '2px' }} 
                                 />
                               ))}
                            </div>
                         </div>
                      </div>
                      <p className="tiny text-indigo-400 font-black">BITRATE: 320KBPS LOSSLESS</p>
                   </div>

                   <div className="wizard-footer-aura mt-5">
                      <button className="primary-aura-btn w-100 mb-3" onClick={() => window.open(formData.audioUrl)}>
                         <Download size={18} />
                         <span>Download Master WAV</span>
                      </button>
                      <button className="secondary-aura-btn w-100" onClick={() => setCurrentStep(1)}>
                         Synthesize New Script
                      </button>
                   </div>
                </div>
              )}
           </AnimatePresence>
        </aside>

        <section className="fusion-viewport-container">
           <div className="neural-viewport-v4 sonic-viewport">
              <div className="nv-header border-bottom border-white/5">
                 <div className="d-flex align-items-center gap-3">
                    <div className="status-blip active bg-indigo-500" />
                    <span className="tiny font-black text-white uppercase tracking-widest">Sonic Waveform Monitor</span>
                 </div>
              </div>
              <div className="nv-content d-grid place-items-center">
                 <div className="text-center">
                    {currentStep === 3 ? (
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                      >
                         <BotIcon size={120} className="text-indigo-500 mb-4 opacity-50" />
                         <div className="kinetic-pulse-waves"></div>
                      </motion.div>
                    ) : (
                      <div className="vocal-spectrogram-sim">
                         <Activity size={100} className="text-indigo-400 opacity-20 mb-4" />
                         <p className="tiny font-black text-white uppercase tracking-widest">Neural Vocal Registry Idle</p>
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

export default TextToSpeech;
