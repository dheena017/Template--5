import React, { useState, useRef, useEffect } from 'react';
import { 
  Wand2, 
  Image as ImageIcon, 
  Video, 
  Upload, 
  Settings, 
  Play, 
  Download, 
  Trash2, 
  Check, 
  Clock, 
  Sparkles, 
  Zap, 
  Search, 
  Maximize2,
  ChevronDown,
  Info,
  Maximize,
  Sliders,
  Scissors,
  Share2,
  MoreVertical,
  Volume2,
  MousePointer2,
  Palette,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pages/video-ai/TextToVideo.css';

const TextToVideo = () => {
  const [mode, setMode] = useState('text-to-video');
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [cameraMotion, setCameraMotion] = useState(['static']);
  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState({
    aspectRatio: '16:9',
    duration: '5s',
    resolution: '1080p',
    motion: 5,
    seed: -1,
    guidance: 7.5,
    steps: 30
  });

  const styles = [
    { id: 'cinematic', label: 'Cinematic', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=200' },
    { id: 'sci-fi', label: 'Sci-Fi', img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=200' },
    { id: 'anime', label: 'Anime', img: 'https://images.unsplash.com/photo-1578632738981-05391697262c?auto=format&fit=crop&q=80&w=200' },
    { id: 'pixar', label: 'Pixar 3D', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=200' },
    { id: 'noir', label: 'Film Noir', img: 'https://images.unsplash.com/photo-1502472545331-cf11ccf20815?auto=format&fit=crop&q=80&w=200' },
    { id: 'cyberpunk', label: 'Cyberpunk', img: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=200' }
  ];

  const cameraOptions = [
    { id: 'pan-left', label: 'Pan Left' },
    { id: 'pan-right', label: 'Pan Right' },
    { id: 'zoom-in', label: 'Zoom In' },
    { id: 'zoom-out', label: 'Zoom Out' },
    { id: 'tilt-up', label: 'Tilt Up' },
    { id: 'static', label: 'Static' }
  ];

  const handleToggleCamera = (camId) => {
    if (camId === 'static') {
      setCameraMotion(['static']);
      return;
    }
    setCameraMotion(prev => {
      const filtered = prev.filter(c => c !== 'static');
      if (filtered.includes(camId)) {
        const next = filtered.filter(c => c !== camId);
        return next.length === 0 ? ['static'] : next;
      }
      return [...filtered, camId];
    });
  };

  const [recentGenerations, setRecentGenerations] = useState([
    {
      id: 1,
      title: 'Neon city with flying cars in rainy night',
      type: 'Text to Video',
      date: '12m ago',
      thumbnail: '/brain/38e31e54-dd54-42aa-9e57-3529b460a23b/text_to_video_preview_example_1775015625127.png',
      status: 'ready'
    },
    {
      id: 2,
      name: 'Cyberpunk Girl Portrait',
      type: 'Image to Video',
      date: '1h ago',
      thumbnail: 'https://images.unsplash.com/photo-1578632738981-05391697262c?auto=format&fit=crop&q=80&w=500',
      status: 'ready'
    }
  ]);

  const [genProgress, setGenProgress] = useState(0);
  const [tickerText, setTickerText] = useState('IDLE');

  useEffect(() => {
    if (isGenerating) {
      const texts = ['ANALYZING PROMPT...', 'SAMPLING NOISE...', 'DENOISING STEP 12/30...', 'INTERPOLATING FRAMES...', 'ENCODING MP4...'];
      let i = 0;
      const iv = setInterval(() => {
        setTickerText(texts[i % texts.length]);
        setGenProgress(prev => Math.min(99, prev + (100/texts.length/5)));
        i++;
      }, 500);
      return () => clearInterval(iv);
    } else {
      setTickerText('IDLE');
      setGenProgress(0);
    }
  }, [isGenerating]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newGen = {
        id: Date.now(),
        title: mode === 'text-to-video' ? prompt.substring(0, 30) : 'Animated Masterpiece',
        type: mode === 'text-to-video' ? 'Text to Video' : 'Image to Video',
        date: 'Just now',
        thumbnail: selectedImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500',
        status: 'ready'
      };
      setRecentGenerations([newGen, ...recentGenerations]);
    }, 6000);
  };

  return (
    <div className="video-ai-container">
      <header className="video-ai-header">
        <div>
          <h1>Video AI Text-to-Video <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }} className="badge bg-primary ms-2 tiny">BETA 2.0</motion.span></h1>
          <p className="text-secondary">Next-generation text-to-video synthesis powered by Atmospheric-v4 models.</p>
        </div>
        <div className="header-actions d-flex gap-3">
          <div className="premium-status glass-card px-3 py-1 d-flex align-items-center gap-2">
            <Zap size={14} className="text-warning" fill="currentColor" />
            <span className="small fw-600">1,240 Nodes</span>
          </div>
          <button className="btn btn-outline-light btn-sm rounded-pill px-4">Pro Benefits</button>
        </div>
      </header>

      <div className="generator-grid">
        <div className="control-panel glass-card">
          <div className="mode-toggle mb-4">
            <button className={`mode-btn ${mode === 'text-to-video' ? 'active' : ''}`} onClick={() => setMode('text-to-video')}>
              <Video size={18} /> Text-to-Video
            </button>
            <button className={`mode-btn ${mode === 'image-to-video' ? 'active' : ''}`} onClick={() => setMode('image-to-video')}>
              <ImageIcon size={18} /> Image-to-Video
            </button>
          </div>

          <div className="input-section">
            <div className="input-label-wrapper">
              <label className="input-label"><Wand2 size={16} /> Prompt Definition</label>
              <span className="tiny text-secondary">{prompt.length} / 1000</span>
            </div>
            {mode === 'text-to-video' ? (
              <textarea 
                className="prompt-area"
                placeholder="A cinematic drone shot of a lush tropical island surrounded by turquoise waters, 8k, highly detailed..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            ) : (
              <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                 {selectedImage ? (
                   <img src={selectedImage} alt="Preview" className="w-100 rounded" />
                 ) : (
                   <div className="text-center">
                     <Upload size={32} className="text-primary mb-2" />
                     <p className="small mb-0">Select high-res image</p>
                   </div>
                 )}
                 <input ref={fileInputRef} type="file" hidden onChange={(e) => {
                   const f = e.target.files[0];
                   if (f) { const r = new FileReader(); r.onload = (ev) => setSelectedImage(ev.target.result); r.readAsDataURL(f); }
                 }} />
              </div>
            )}
            
            <div className="style-section mt-2">
               <label className="input-label mb-2"><Palette size={16} /> Artistic Style</label>
               <div className="style-preset-grid">
                 {styles.map(s => (
                   <div key={s.id} className={`style-preset-item ${selectedStyle === s.id ? 'active' : ''}`} onClick={() => setSelectedStyle(s.id)}>
                     <img src={s.img} alt={s.label} />
                     <span>{s.label}</span>
                   </div>
                 ))}
               </div>
            </div>

            <div className="advanced-toggle mt-4">
               <button className="btn-link-sec small d-flex align-items-center gap-2 border-0 bg-transparent p-0" onClick={() => setShowAdvanced(!showAdvanced)}>
                 {showAdvanced ? <ChevronDown size={14} className="rotate-180" /> : <ChevronDown size={14} />}
                 Advanced Control Hub
               </button>
            </div>

            <AnimatePresence>
               {showAdvanced && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="advanced-panel-content overflow-hidden pt-3 d-flex flex-column gap-4"
                 >
                    <div className="param-item">
                      <label className="input-label small mb-2 d-flex justify-content-between">Negative Prompt <Info size={12} /></label>
                      <textarea 
                        className="prompt-area" 
                        style={{ minHeight: '60px', fontSize: '0.8rem' }}
                        placeholder="low quality, blurry, text, distorted..."
                        value={negativePrompt}
                        onChange={e => setNegativePrompt(e.target.value)}
                      />
                    </div>

                    <div className="advanced-form-grid">
                       <div className="settings-item">
                         <label className="tiny text-secondary mb-1">Aspect Ratio</label>
                         <select className="form-select-dark small" value={settings.aspectRatio} onChange={e => setSettings({...settings, aspectRatio: e.target.value})}>
                           <option value="16:9">Wide (16:9)</option>
                           <option value="9:16">Portrait (9:16)</option>
                           <option value="1:1">Square (1:1)</option>
                         </select>
                       </div>
                       <div className="settings-item">
                         <label className="tiny text-secondary mb-1">Duration</label>
                         <select className="form-select-dark small" value={settings.duration} onChange={e => setSettings({...settings, duration: e.target.value})}>
                           <option value="5s">5 Seconds</option>
                           <option value="10s">10 Seconds</option>
                         </select>
                       </div>
                    </div>

                    <div className="param-item">
                       <label className="input-label small d-flex justify-content-between">Motion Intensity <span>{settings.motion}</span></label>
                       <div className="range-input-wrapper">
                         <input type="range" min="1" max="10" step="1" value={settings.motion} onChange={e => setSettings({...settings, motion: e.target.value})} />
                         <div className="range-labels"><span>Static</span><span>Dynamic</span></div>
                       </div>
                    </div>

                    <div className="param-item">
                       <label className="input-label small mb-2">Camera Movement</label>
                       <div className="camera-controls">
                         {cameraOptions.map(c => (
                           <button 
                             key={c.id} 
                             className={`camera-btn ${cameraMotion.includes(c.id) ? 'active' : ''}`}
                             onClick={() => handleToggleCamera(c.id)}
                           >
                             <Camera size={14} /> {c.label}
                           </button>
                         ))}
                       </div>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>

          <button 
            className="generate-btn-lg mt-4" 
            disabled={isGenerating || !prompt}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity }}>
                 <Zap size={24} fill="#fff" />
              </motion.div>
            ) : (
              <Sparkles size={24} />
            )}
            {isGenerating ? 'Synthesizing...' : 'Generate Fusion'}
          </button>
        </div>

        <div className="preview-panel">
          <div className="main-preview-viewport glass-card">
            <div className="viewport-overlay" />
            
            {isGenerating && (
              <div className="generation-ticker">
                <div className="ticker-dot" />
                <span>STATUS: {tickerText}</span>
              </div>
            )}

            <div className="canvas-content d-flex align-items-center justify-content-center h-100 flex-column text-center p-5">
              {isGenerating ? (
                <div className="w-100 px-5">
                   <div className="progress mb-3" style={{ height: '2px', background: 'rgba(255,255,255,0.05)' }}>
                     <motion.div 
                        className="progress-bar bg-primary shadow-glow" 
                        initial={{ width: 0 }}
                        animate={{ width: `${genProgress}%` }}
                     />
                   </div>
                   <p className="tiny text-secondary font-monospace">INTERFERENCE PATTERN DETECTED // SEED_{settings.seed === -1 ? 'RAND' : settings.seed}</p>
                </div>
              ) : (
                <>
                  <div className="empty-stage-visual mb-4">
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    >
                      <Video size={64} className="text-secondary opacity-20" />
                    </motion.div>
                  </div>
                  <h3 className="h5 opacity-50 mb-2">Cinematic Output Monitor</h3>
                  <p className="small text-secondary max-w-400 mx-auto">Click generate to start the neural render pipeline. High-quality 4K output will be available here.</p>
                </>
              )}
            </div>

            <div className="viewport-controls">
               <div className="vp-left d-flex gap-2">
                 <button className="icon-btn rounded-circle"><Volume2 size={16} /></button>
                 <button className="icon-btn rounded-circle"><Clock size={16} /></button>
               </div>
               <div className="vp-right d-flex gap-2">
                 <button className="icon-btn rounded-circle"><Maximize size={16} /></button>
                 <button className="glass-btn small px-3"><Settings size={14} /> Render Settings</button>
               </div>
            </div>
          </div>

          <div className="recent-grid-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="h6 mb-0 d-flex align-items-center gap-2"><History size={16} className="text-primary" /> Visual History</h3>
              <button className="btn-link-sec tiny p-0">Clear Storage</button>
            </div>

            <div className="row g-4">
              {recentGenerations.map(gen => (
                <div key={gen.id} className="col-md-6 col-lg-4">
                  <motion.div 
                    className="generation-card glass-card h-100"
                    whileHover={{ y: -5 }}
                  >
                    <div className="card-media position-relative overflow-hidden aspect-video border-bottom border-white-05">
                       <img src={gen.thumbnail} alt="" className="w-100 h-100 object-fit-cover" />
                       <div className="media-play-icon position-absolute top-50 left-50 translate-middle">
                          <Play size={24} fill="currentColor" />
                       </div>
                       <div className="media-meta position-absolute bottom-0 left-0 p-2 d-flex gap-1">
                          <span className="badge bg-dark-70 tiny">{gen.type}</span>
                       </div>
                    </div>
                    <div className="card-body p-3">
                       <h4 className="tiny fw-800 mb-1 line-clamp-1">{gen.title}</h4>
                       <div className="d-flex justify-content-between align-items-center">
                          <span className="tiny text-secondary">{gen.date}</span>
                          <div className="card-actions d-flex gap-2">
                             <button className="icon-btn-sm"><Download size={14} /></button>
                             <button className="icon-btn-sm"><Share2 size={14} /></button>
                             <button className="icon-btn-sm"><MoreVertical size={14} /></button>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToVideo;
