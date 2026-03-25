import React, { useState } from 'react'
import { 
  Mic2, Video, Sparkles, 
  ChevronRight, Play, Layout,
  Layers, MessageSquare, Plus,
  Settings, Download
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import CreditErrorMessage from '../../components/CreditErrorMessage'
import '../../styles/pages/speech/PodcastCreator.css'

const PodcastCreator = () => {
  const [formData, setFormData] = useState({
    script: '',
    avatar: 'ai_host_01',
    useBroll: true
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [_jobId, setJobId] = useState(null)
  const [status, setStatus] = useState(null)
  const [result, setResult] = useState(null)
  const [_error, setError] = useState(null)

  const avatars = [
      { id: 'ai_host_01', name: 'James (Professional)', color: '#06b6d4' },
      { id: 'ai_host_02', name: 'Sarah (Energetic)', color: '#22c55e' },
      { id: 'ai_host_03', name: 'David (News)', color: '#f59e0b' }
  ]

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!formData.script) return
    
    setIsGenerating(true)
    setError(null)
    setResult(null)
    
    try {
        const res = await api.video.getPodcast({ script: formData.script, avatar: formData.avatar, use_broll: formData.useBroll })
        if (res.error) {
            setError(res.error)
         setIsGenerating(false)
            return
        }
        if (res.job_id) {
            setJobId(res.job_id)
            pollStatus(res.job_id)
        }
    } catch {
        setError("Failed to start podcast assembly.")
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
                setError("Generation failed")
                setIsGenerating(false)
                clearInterval(timer)
            }
        } catch {
            clearInterval(timer)
            setIsGenerating(false)
        }
    }, 2000)
  }

  return (
    <div className="podcast-wrapper">
      <div className="p-sidebar premium-card">
         <div className="p-header">
            <Mic2 className="p-icon" />
            <div>
               <h3>Video Podcast Creator</h3>
               <p>Script to professional podcast video</p>
            </div>
         </div>

         <form className="p-form" onSubmit={handleGenerate}>
            <div className="p-form-group">
               <label>Script / Dialogue</label>
               <textarea 
                 placeholder="Write or paste your podcast script here..."
                 value={formData.script}
                 onChange={e => setFormData({...formData, script: e.target.value})}
               />
            </div>

            <div className="p-form-group">
               <label>AI Host Avatar</label>
               <div className="avatar-selector">
                  {avatars.map(a => (
                    <div 
                      key={a.id}
                      className={`avatar-option ${formData.avatar === a.id ? 'active' : ''}`}
                      onClick={() => setFormData({...formData, avatar: a.id})}
                      style={{ '--theme': a.color }}
                    >
                       <div className="a-circle"></div>
                       <span>{a.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-toggle">
               <label>
                  <input 
                    type="checkbox" 
                    checked={formData.useBroll}
                    onChange={e => setFormData({...formData, useBroll: e.target.checked})}
                  />
                  <span>Automatically generate B-roll overlays</span>
               </label>
            </div>

            <CreditErrorMessage error={_error} />
            <button type="submit" className="p-generate-btn" disabled={isGenerating}>
               {isGenerating ? 'Assembling Podcast...' : 'Generate Podcast Video'}
            </button>
         </form>
      </div>

      <div className="p-preview-main">
         <div className="p-viewport glass-card">
            {result ? (
              <div className="p-success">
                 <img src={result.preview_url} alt="" />
                 <div className="p-overlay">
                    <Play size={64} fill="#fff" />
                 </div>
                 <div className="p-meta">
                    <div className="p-meta-left">
                       <h4>{result.id}</h4>
                       <span>{result.meta.duration}s • {result.meta.broll_count} B-roll scenes</span>
                    </div>
                    <button className="p-download"><Download size={18} /> Download 4K</button>
                 </div>
              </div>
            ) : isGenerating ? (
              <div className="p-loader">
                 <div className="p-orb-wrap">
                    <div className="p-orb"></div>
                    <div className="p-orb-blur"></div>
                 </div>
                 <h3>AI Engine Active</h3>
                 <div className="p-status-step">{status?.status || 'Queuing'}</div>
                 <p>{status?.status === 'Processing' ? 'Generating lip-synced avatar and audio...' : 'Synchronizing cinematic B-roll overlays...'}</p>
                 <div className="progress-bar-wrap">
                    <div className="progress-bar">
                       <motion.div 
                         className="progress-fill-hq" 
                         initial={{ width: 0 }}
                         animate={{ width: `${status?.progress || 0}%` }}
                       />
                    </div>
                    <div className="progress-stats">
                       <span>Job Progress</span>
                       <strong>{status?.progress || 0}%</strong>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="p-empty">
                 <Video size={48} />
                 <p>Configure your host and script to begin rendering your podcast video.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  )
}

export default PodcastCreator





