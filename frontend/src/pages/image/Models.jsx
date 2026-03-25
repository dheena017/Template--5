import React, { useState } from 'react'
import { 
  Box, Sparkles, Zap, Brain, 
  Cpu, Layers, Search, 
  ChevronRight, BadgeCheck, 
  Trophy, Activity, Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/image/Models.css'

const Models = () => {
    const [filter, setFilter] = useState('all')

    const modelCategories = [
        { id: 'all', label: 'All Models', icon: <Box size={16} /> },
        { id: 'llm', label: 'Language LLMs', icon: <Brain size={16} /> },
        { id: 'image', label: 'Image Models', icon: <Sparkles size={16} /> },
        { id: 'audio', label: 'Audio & Voice', icon: <Activity size={16} /> },
        { id: 'video', label: 'Video Gen', icon: <Layers size={16} /> }
    ]

    const models = [
        {
            id: 'gpt-4o',
            category: 'llm',
            name: 'GPT-4o',
            provider: 'OpenAI',
            description: 'Our flagship language model optimized for speed and reasoning.',
            status: 'Operational',
            latency: '240ms',
            capabilities: ['Reasoning', 'Creative Writing', 'JSON Parsing'],
            tag: 'Most Popular'
        },
        {
            id: 'claude-3-5-sonnet',
            category: 'llm',
            name: 'Claude 3.5 Sonnet',
            provider: 'Anthropic',
            description: 'Exceptional capabilities for coding and logical analysis.',
            status: 'Operational',
            latency: '310ms',
            capabilities: ['Coding', 'Analysis', 'Long Context'],
            tag: 'Highest Accuracy'
        },
        {
            id: 'flux-1-pro',
            category: 'image',
            name: 'Flux.1 Pro',
            provider: 'Black Forest Labs',
            description: 'State-of-the-art image generation with incredible prompt adherence.',
            status: 'Operational',
            latency: '4.2s',
            capabilities: ['Realistic', 'Typography', 'Hyper-detail'],
            tag: 'Featured'
        },
        {
            id: 'stable-diffusion-3',
            category: 'image',
            name: 'Stable Diffusion 3',
            provider: 'Stability AI',
            description: 'Advanced text-to-image model with great architectural depth.',
            status: 'Maintenance',
            latency: '-',
            capabilities: ['Consistency', 'Control', 'Speed'],
            tag: 'Testing'
        },
        {
            id: 'eleven-multilingual-v2',
            category: 'audio',
            name: 'Eleven Multilingual v2',
            provider: 'ElevenLabs',
            description: 'The most realistic AI voices with emotive delivery across 29 languages.',
            status: 'Operational',
            latency: '140ms',
            capabilities: ['Cloning', 'Multilingual', 'Emotional'],
            tag: 'Top Voice'
        },
        {
            id: 'sora-preview',
            category: 'video',
            name: 'Sora (Preview)',
            provider: 'OpenAI',
            description: 'Next-gen video generation for complex cinematics and realism.',
            status: 'Coming Soon',
            latency: '-',
            capabilities: ['Cinematics', 'Realistic Physics', 'Consistency'],
            tag: 'Next Gen'
        }
    ]

    const filteredModels = models.filter(m => filter === 'all' || m.category === filter)

    return (
        <div className="models-container">
            <div className="models-hero">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-content"
                >
                    <div className="models-badge">
                        <Cpu size={14} /> AI Engine Core v4.0
                    </div>
                    <h1>Model Ecosystem</h1>
                    <p>Transparent overview of the state-of-the-art AI models powering TextAI's creative orchestrations.</p>
                </motion.div>
            </div>

            <div className="models-controls">
                <div className="filter-pills">
                    {modelCategories.map(cat => (
                        <button 
                            key={cat.id}
                            className={`filter-pill ${filter === cat.id ? 'active' : ''}`}
                            onClick={() => setFilter(cat.id)}
                        >
                            {cat.icon}
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="models-grid">
                <AnimatePresence mode="popLayout">
                    {filteredModels.map(model => (
                        <motion.div 
                            key={model.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="model-card glass-card"
                        >
                            <div className="model-card-header">
                                <div className="provider-badge">{model.provider}</div>
                                {model.tag && <div className="tag-badge">{model.tag}</div>}
                            </div>
                            
                            <div className="model-info">
                                <h3>{model.name}</h3>
                                <p>{model.description}</p>
                            </div>

                            <div className="model-stats">
                                <div className="stat-item">
                                    <span className="label">Status</span>
                                    <span className={`status-pill ${model.status.toLowerCase().replace(' ', '-')}`}>
                                        {model.status}
                                    </span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">Latency</span>
                                    <span className="value">{model.latency}</span>
                                </div>
                            </div>

                            <div className="model-capabilities">
                                {model.capabilities.map(cap => (
                                    <span key={cap} className="capability-tag">
                                        <BadgeCheck size={12} /> {cap}
                                    </span>
                                ))}
                            </div>

                            <button className="view-details-btn">
                                <span>Model Architecture</span>
                                <ChevronRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="models-footer">
                <div className="info-box glass-card">
                    <Info size={24} className="icon-blue" />
                    <div>
                        <h4>Dynamic Routing</h4>
                        <p>Our system automatically routes requests to the most efficient model based on complexity and availability to ensure optimal results at the lowest latency.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Models



