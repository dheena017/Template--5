import React, { useState, useEffect } from 'react'
import { 
  Box, Sparkles, Zap, Brain, 
  Cpu, Layers, Search, 
  ChevronRight, BadgeCheck, 
  Trophy, Activity, Info,
  Globe, Server, HardDrive, RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../services/api'
import '../../styles/pages/image/Models.css'

const Models = () => {
    const [filter, setFilter] = useState('all')
    const [ollamaStatus, setOllamaStatus] = useState({ status: 'Synchronizing...' })
    const [isLoading, setIsLoading] = useState(true)

    const modelCategories = [
        { id: 'all', label: 'All Models', icon: <Box size={16} /> },
        { id: 'llm', label: 'Language LLMs', icon: <Brain size={16} /> },
        { id: 'image', label: 'Image Models', icon: <Sparkles size={16} /> },
        { id: 'video', label: 'Video Gen', icon: <Layers size={16} /> },
        { id: 'local', label: 'Local Ollama', icon: <Server size={16} /> }
    ]

    useEffect(() => {
        const checkOllama = async () => {
            const status = await api.ollama.health()
            setOllamaStatus(status)
            setIsLoading(false)
        }
        checkOllama()
        const interval = setInterval(checkOllama, 10000)
        return () => clearInterval(interval)
    }, [])

    const cloudModels = [
        {
            id: 'gpt-4o',
            category: 'llm',
            name: 'GPT-4o',
            provider: 'OpenAI',
            description: 'Flagship language model optimized for speed and reasoning.',
            status: 'Operational',
            latency: '240ms',
            capabilities: ['Reasoning', 'Creative Writing', 'JSON Parsing'],
            tag: 'Cloud High'
        },
        {
            id: 'flux-1.1-pro',
            category: 'image',
            name: 'Flux 1.1 Pro',
            provider: 'Black Forest Labs',
            description: 'State-of-the-art image generation with incredible prompt adherence.',
            status: 'Operational',
            latency: '4.2s',
            capabilities: ['Realistic', 'Typography', 'Hyper-detail'],
            tag: 'Synthesis Core'
        },
        {
            id: 'wan-2.1',
            category: 'video',
            name: 'WAN 2.1',
            provider: 'replicate',
            description: 'High-performance cinematic video generation.',
            status: 'Operational',
            latency: '45s',
            capabilities: ['Cinematics', 'Temporal Stability'],
            tag: 'Active'
        }
    ]

    // Construct local models list from Ollama status
    const localModels = (ollamaStatus.models || []).map(m => ({
        id: m.name,
        category: 'local',
        name: m.name.charAt(0).toUpperCase() + m.name.slice(1),
        provider: 'Ollama (Local)',
        description: `Local LLM instance running on your machine. Size: ${(m.size / 1e9).toFixed(1)} GB.`,
        status: 'Online',
        latency: 'Local (~50ms)',
        capabilities: ['Privacy First', 'Zero Cost', 'Offline'],
        tag: 'Local Active'
    }))

    const allModels = [...cloudModels, ...localModels]
    const filteredModels = allModels.filter(m => filter === 'all' || m.category === filter || (filter === 'llm' && m.category === 'local'))

    return (
        <div className="models-container">
            <header className="fusion-header p-5 border-bottom border-white/5">
                <div className="fh-left">
                   <div className="fh-badge"><Globe size={10} /> NEURAL REGISTRY v5.2</div>
                   <h1 className="display-title font-black text-white">Aura <span className="text-secondary">Intelligence Hub</span></h1>
                   <p className="tiny text-slate-500 font-black uppercase tracking-widest mt-1">Global & Local Model Orchestration Center</p>
                </div>
                <div className="fh-right d-flex gap-4">
                   <div className={`gpu-cluster-card p-3 glass-card border-none ${ollamaStatus.status === 'Online' ? 'bg-emerald-500/10' : 'bg-slate-800/40'}`}>
                      <div className="tiny font-black uppercase text-slate-400 d-flex align-items-center gap-2 mb-1">
                         <Server size={12} className={ollamaStatus.status === 'Online' ? 'text-emerald-400' : 'text-slate-500'} /> Ollama Node
                      </div>
                      <div className="d-flex align-items-center gap-2">
                         <div className={`status-blip ${ollamaStatus.status === 'Online' ? 'active' : ''}`} />
                         <span className="tiny font-black text-white">{ollamaStatus.status}</span>
                      </div>
                   </div>
                </div>
            </header>

            <div className="models-controls mt-5 p-4 pe-5">
                <div className="filter-pills d-flex gap-3">
                    {modelCategories.map(cat => (
                        <button 
                            key={cat.id}
                            className={`tab-pill flex-fill ${filter === cat.id ? 'active' : ''}`}
                            onClick={() => setFilter(cat.id)}
                        >
                            {cat.icon}
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="models-grid mt-4 p-4">
                <AnimatePresence mode="popLayout">
                    {filteredModels.map((model, idx) => (
                        <motion.div 
                            key={model.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="model-card-v5 glass-card mb-4"
                        >
                            <div className="mc-header d-flex justify-content-between p-4 border-bottom border-white/5">
                                <div className="d-flex align-items-center gap-3">
                                   <div className="provider-badge-v5 tiny font-black">{model.provider}</div>
                                   <h3 className="tiny font-black text-white m-0 uppercase tracking-widest">{model.name}</h3>
                                </div>
                                <div className="mc-badges d-flex gap-2">
                                   <div className="status-pill-v5 tiny font-black text-emerald-400">{model.status}</div>
                                   <div className="tag-pill-v5 tiny font-black text-slate-500 border border-white/10 px-2 rounded">{model.tag}</div>
                                </div>
                            </div>
                            
                            <div className="mc-body p-4">
                               <p className="tiny text-slate-400 font-medium mb-4">{model.description}</p>
                               <div className="capabilities-row d-flex flex-wrap gap-2 mb-4">
                                  {model.capabilities.map(cap => (
                                      <span key={cap} className="cap-tag-v5">
                                         <BadgeCheck size={10} /> {cap}
                                      </span>
                                  ))}
                               </div>
                               <div className="mc-meta d-flex justify-content-between pt-3 border-top border-white/5">
                                  <div className="meta-item">
                                     <label className="tiny-label">Latency</label>
                                     <span className="tiny font-black text-white block">{model.latency}</span>
                                  </div>
                                  <button className="connect-btn-v5">
                                     <span>Deploy Model</span>
                                     <ChevronRight size={14} />
                                  </button>
                               </div>
                            </div>
                        </motion.div>
                    ))}
                    
                    {filteredModels.length === 0 && (
                      <div className="empty-models-v5 glass-card p-5 text-center">
                         <Activity size={48} className="text-slate-800 mb-4 mx-auto" />
                         <h3 className="tiny font-black text-white uppercase">No Local Models Detected</h3>
                         <p className="tiny text-slate-500 uppercase font-black tracking-widest">Connect to an Ollama node to enable local LLM acceleration.</p>
                      </div>
                    )}
                </AnimatePresence>
            </div>

            <div className="models-footer p-5">
                <div className="info-box-v5 glass-card p-4 d-flex gap-4 align-items-center border-none" style={{ background: 'rgba(99, 102, 241, 0.05)' }}>
                    <Brain size={32} className="text-secondary" />
                    <div>
                        <h4 className="tiny font-black text-white m-0">AUTOMATED BRAINSTORMING ENHANCED</h4>
                        <p className="tiny text-slate-500 font-black uppercase tracking-widest m-0 mt-1">Prompt expansion now utilizes local Ollama cycles for 0-latency creative ideation.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Models
