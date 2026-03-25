import React, { useEffect, useState } from 'react'
import { 
  Sparkles, Video, Image as ImageIcon, 
  Type, Palette, AlignLeft, 
  CheckCircle, Play, ChevronRight, 
  Waves, Settings, Layout, Layers,
  AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import CreditErrorMessage from '../../components/CreditErrorMessage'
import '../../styles/pages/studio/UGCCreator.css'

const UGCCreator = () => {
  const [formData, setFormData] = useState({
    productImage: null,
    script: '',
    avatar: 'ai_pro_01',
    tone: 'energetic',
    ratio: '9:16'
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [_jobId, setJobId] = useState(null)
  const [status, setStatus] = useState(null)
  const [result, setResult] = useState(null)
  const [_error, setError] = useState(null)

  useEffect(() => {
    logger.log('UGC', 'Component mounted')
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, productImage: file })
      logger.log('UGC', 'Product image uploaded', { fileName: file.name })
    }
  }

  const startGeneration = async (e) => {
    e.preventDefault()
    if (!formData.productImage || !formData.script) {
        setError("Please provide a product image and a script.")
        return
    }
    logger.log('UGC', 'Starting UGC generation', { avatar: formData.avatar, tone: formData.tone })
    setError(null)
    setIsGenerating(true)
    
    try {
        // Step 1: Upload the actual product image
        const uploadRes = await api.uploadFile(formData.productImage)
        if (!uploadRes || !uploadRes.url) {
            throw new Error("File upload failed")
        }
        
        const fileUrl = uploadRes.url
        
        // Step 2: Create the UGC job with the uploaded file URL
        const res = await api.video.generateUGC({ product_image_url: fileUrl, script: formData.script })
        if (res.error) {
            setError(res.error)
            setIsGenerating(false)
            return
        }
        if (res.job_id) {
            setJobId(res.job_id)
            pollStatus(res.job_id)
        }
    } catch (err) {
        setError(err.message || "Generation failed. Check connection.")
        setIsGenerating(false)
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
        try {
            const res = await api.video.getStatus(id)
            setStatus(res)
            if (res.status === 'Completed') {
                setResult(res.result)
                setIsGenerating(false)
                clearInterval(timer)
            } else if (res.status === 'Failed') {
                setError(res.error || "Generation crashed")
                setIsGenerating(false)
                clearInterval(timer)
            }
        } catch {
            clearInterval(timer)
            setIsGenerating(false)
            setError("Lost signal to rendering worker.")
        }
    }, 2000)
  }

  return (
    <div className="ugc-creator-wrapper">
      <div className="ugc-layout">
        <aside className="ugc-config-panel premium-card">
           <header className="panel-header">
              <Sparkles className="spark-icon" />
              <div>
                 <h3>UGC Ads Generator</h3>
                 <p>AI-driven promotional video engine</p>
              </div>
           </header>

           <form className="ugc-form" onSubmit={startGeneration}>
              <div className="form-group">
                 <label><ImageIcon size={16} /> Product Media</label>
                 <div className="file-drop-zone premium-card">
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                    {formData.productImage ? (
                      <div className="file-preview-mini">
                         <CheckCircle size={16} color="var(--success-color)" /> {formData.productImage.name}
                      </div>
                    ) : (
                      <div className="drop-hint">Drop your product photo here</div>
                    )}
                 </div>
              </div>

              <div className="form-group">
                 <label><Type size={16} /> Ad Script / Hook</label>
                 <textarea 
                   placeholder="e.g. Stop scrolling! You need this amazing minimal desk setup..."
                   value={formData.script}
                   onChange={e => setFormData({...formData, script: e.target.value})}
                 />
              </div>

              <div className="form-grid">
                 <div className="form-group">
                    <label><Palette size={16} /> Style Tone</label>
                    <select value={formData.tone} onChange={e => setFormData({...formData, tone: e.target.value})}>
                       <option value="energetic">Energetic / Fast</option>
                       <option value="luxury">Minimal / Luxury</option>
                       <option value="story">Storytelling</option>
                    </select>
                 </div>
                 <div className="form-group">
                    <label><Layout size={16} /> Ratio</label>
                    <select value={formData.ratio} onChange={e => setFormData({...formData, ratio: e.target.value})}>
                       <option value="9:16">Portrait (9:16)</option>
                       <option value="1:1">Square (1:1)</option>
                       <option value="16:9">Wide (16:9)</option>
                    </select>
                 </div>
              </div>

               <CreditErrorMessage error={_error} />

              <button 
                type="submit" 
                className="ugc-generate-btn" 
                disabled={isGenerating}
              >
                 {isGenerating ? (
                   <>Processing <div className="spining-loader"></div></>
                 ) : (
                   <>Generate Video <ChevronRight size={18} /></>
                 )}
              </button>
           </form>
        </aside>

        <main className="ugc-render-output">
           <div className="player-viewport glass-card">
              {result ? (
                <div className="video-success">
                   <img src={result.preview_url} alt="Result Preview" className="v-preview-img" />
                   <div className="success-overlay">
                      <Play size={48} fill="#fff" />
                   </div>
                   <div className="success-footer">
                      <div className="s-info">
                         <strong>{result.meta.product}</strong>
                         <span>{result.meta.duration}s • {result.meta.resolution}</span>
                      </div>
                      <button className="download-hq-btn">Download HQ Video</button>
                   </div>
                </div>
              ) : isGenerating ? (
                <div className="renderer-status">
                   <div className="render-orb">
                      <Waves size={64} className="flowing" />
                   </div>
                   <h3>AI Rendering Engine Active</h3>
                   <div className="status-badge">{status?.status || 'In Queue'}</div>
                   <div className="progress-bar-wrap">
                      <div className="progress-bar">
                         <motion.div 
                           className="progress-fill-hq" 
                           initial={{ width: 0 }}
                           animate={{ width: `${status?.progress || 0}%` }}
                         />
                      </div>
                      <div className="progress-stats">
                         <span>Status</span>
                         <strong>{status?.progress || 0}%</strong>
                      </div>
                   </div>
                   <p className="status-msg">
                       {status?.status === 'Processing' ? 'Animating avatar and stitching frames...' : 'Synchronizing neural audio...'}
                   </p>
                </div>
              ) : (
                <div className="empty-viewport">
                   <div className="e-icon-ring">
                      <Video size={32} />
                   </div>
                   <p>Adjust settings and click generate to begin rendering</p>
                </div>
              )}
           </div>
        </main>
      </div>
    </div>
  )
}

export default UGCCreator




