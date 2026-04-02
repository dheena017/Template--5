import React, { useEffect, useState } from 'react'
import { 
  Image as ImageIcon, Video as VideoIcon, 
  Cpu, User, MoreHorizontal,
  Zap,
  Upload, Music, HelpCircle, ChevronRight,
  Sparkles, Star, Lock, RefreshCw,
  Activity, Shield
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import CreditErrorMessage from '../../components/CreditErrorMessage'
import PromptBar from '../../components/common/PromptBar/PromptBar'
import '../../styles/pages/image/ImageGenerator.css'

const ImageGenerator = () => {
  const [activeTab, setActiveTab] = useState('Image')
  const [stamina, setStamina] = useState(130)
  const [credit, setCredit] = useState(0)
  const [promptText, setPromptText] = useState('')
  const [selectedImageModel, setSelectedImageModel] = useState('Flux 1.1 Pro')
  const [orientation, setOrientation] = useState('Portrait')
  const [outputs, setOutputs] = useState([])
  const [generateState, setGenerateState] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [progress, setProgress] = useState(0)

  // Fetch initial outputs
  useEffect(() => {
    const fetchHistory = async () => {
      const history = await api.getImageOutputs()
      setOutputs(history)
    }
    fetchHistory()
  }, [])

  const pollJobStatus = async (jobId) => {
    const interval = setInterval(async () => {
      try {
        const res = await api.imageStatus(jobId)
        setProgress(res.progress || 0)
        setStatusMessage(res.status || 'Synthesizing...')

        if (res.is_ready) {
          clearInterval(interval)
          setGenerateState('success')
          setOutputs(prev => [res, ...prev])
          // Refresh list to get formatted objects
          const history = await api.getImageOutputs()
          setOutputs(history)
        }
      } catch (err) {
        clearInterval(interval)
        setGenerateState('error')
        setStatusMessage('Connection lost during synthesis')
      }
    }, 2000)
  }

  const handleGenerateAsset = async () => {
    if (!promptText.trim()) return
    
    setGenerateState('loading')
    setStatusMessage('Handshaking with Neural Cluster...')
    setProgress(5)

    try {
      const res = await api.generateImageAsset({
        prompt: promptText.trim(),
        model: selectedImageModel,
        orientation: orientation
      })

      if (res.job_id) {
        pollJobStatus(res.job_id)
      } else {
        throw new Error(res.error || 'Failed to initialize job')
      }
    } catch (err) {
      setGenerateState('error')
      setStatusMessage(err.message)
    }
  }

  const imageModels = ['Flux 1.1 Pro', 'Flux Schnell', 'Stable Diffusion 3']

  return (
    <div className="generator-container">
      <header className="fusion-header p-4 border-bottom border-white/5">
        <div className="fh-left">
           <div className="fh-badge"><Shield size={10} /> IMAGE SYNTHESIS v4.0</div>
           <h1 className="display-title h2 font-black text-white">Neural <span className="text-secondary">Image Canvas</span></h1>
        </div>
        <div className="fh-right d-flex gap-4">
           <div className="metric glass-card p-2 px-3 d-flex align-items-center gap-2">
              <Zap size={14} className="text-yellow-400" />
              <span className="tiny font-black uppercase">Stamina: {stamina}</span>
           </div>
           <div className="metric glass-card p-2 px-3 d-flex align-items-center gap-2">
              <Star size={14} className="text-secondary" />
              <span className="tiny font-black uppercase">Credits: {credit}</span>
           </div>
        </div>
      </header>

      <div className="gen-main-layout mt-4">
        <aside className="gen-settings-sidebar glass-card mx-3 p-4">
          <div className="setting-section mb-4">
            <label className="tiny-label mb-3 d-block text-slate-400 font-black">NEURAL MODEL</label>
            <div className="model-chip-grid d-flex flex-wrap gap-2">
              {imageModels.map((model) => (
                <button
                  key={model}
                  className={`model-chip ${selectedImageModel === model ? 'active' : ''}`}
                  onClick={() => setSelectedImageModel(model)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-section mb-4">
            <label className="tiny-label mb-3 d-block text-slate-400 font-black">ORIENTATION</label>
            <div className="orientation-toggle d-flex gap-2">
              {['Portrait', 'Landscape'].map((item) => (
                <button
                  key={item}
                  className={`tab-pill flex-fill ${orientation === item ? 'active' : ''}`}
                  onClick={() => setOrientation(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="setting-section mb-4">
             <div className="glass-card p-4 border-dashed">
                <Upload size={20} className="text-slate-500 mb-2 mx-auto" />
                <p className="tiny text-center text-slate-500 font-bold">DRAG IMAGE ANCHOR</p>
             </div>
          </div>
        </aside>

        <main className="gen-content-area flex-fill pe-3">
          <div className="engine-viewport glass-card p-5 mb-4 text-center" style={{ minHeight: '400px', display: 'grid', placeItems: 'center' }}>
            <AnimatePresence mode="wait">
              {generateState === 'loading' ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                   <div className="status-blip-large active mx-auto mb-4" />
                   <h3 className="tiny font-black uppercase tracking-widest text-white">{statusMessage}</h3>
                   <div className="nv-progress-container mt-4 mx-auto" style={{ height: '4px', maxWidth: '300px' }}>
                      <motion.div className="nv-progress-fill" animate={{ width: `${progress}%` }} />
                   </div>
                </motion.div>
              ) : (
                <div key="idle">
                   <ImageIcon size={64} className="text-slate-800 mx-auto mb-4" />
                   <p className="tiny text-slate-500 font-black uppercase">Awaiting neural commands</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="recent-outputs-v4">
             <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="tiny font-black text-white m-0">NEURAL VAULT (RECENT)</h3>
                <button className="tiny text-slate-500 font-black bg-transparent border-none">VIEW ALL</button>
             </div>
             <div className="outputs-grid-v4">
                {outputs.map(out => (
                   <div key={out.id} className="output-card-v4 glass-card overflow-hidden">
                      <div className="output-preview">
                         <img src={out.url} alt={out.prompt} />
                      </div>
                      <div className="output-footer p-3 bg-black/40">
                         <p className="tiny text-white font-bold m-0 truncate">{out.prompt}</p>
                         <span className="tiny-label text-slate-500">{out.model} • {out.created_at}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </main>
      </div>

      <PromptBar 
        placeholder="Synthesize a cinematic landscape of a futuristic neon city..."
        onExecute={(val) => {
          setPromptText(val);
          handleGenerateAsset();
        }}
        isProcessing={generateState === 'loading'}
      />
    </div>
  )
}

export default ImageGenerator
