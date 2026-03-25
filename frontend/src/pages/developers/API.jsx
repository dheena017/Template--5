import React from 'react'
import { 
  Code2, Terminal,
  Webhook, Key, Zap, 
  ArrowRight, Activity, Shield, 
  Server, Globe, Bot,
  ExternalLink, Layers, Copy,
  CheckCircle2, ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { providerService } from '../../services'
import '../../styles/pages/developers/API.css'

const API = () => {
    const navigate = useNavigate()
    const [copied, setCopied] = React.useState(false)
    const [providerStatus, setProviderStatus] = React.useState(null)
    const [providerError, setProviderError] = React.useState('')
    const [providerDraft, setProviderDraft] = React.useState(null)
    const [savingProviderConfig, setSavingProviderConfig] = React.useState(false)
    const [providerSaveMessage, setProviderSaveMessage] = React.useState('')

    React.useEffect(() => {
        let mounted = true

        const loadProviderStatus = async () => {
            const status = await providerService.getStatus()
            if (!mounted) return

            if (!status) {
                setProviderError('Provider status unavailable')
                return
            }

            setProviderStatus(status)
            setProviderDraft(status)
            setProviderError('')
        }

        loadProviderStatus()
        return () => {
            mounted = false
        }
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText('pip install fliki-sdk')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleProviderSelect = (domain, value) => {
        if (!providerDraft) return
        setProviderDraft((prev) => ({
            ...prev,
            [domain]: {
                ...prev[domain],
                selected: value,
            },
        }))
    }

    const handleSaveProviderConfig = async () => {
        if (!providerDraft) return
        setSavingProviderConfig(true)
        setProviderSaveMessage('')

        const result = await providerService.updateStatus({
            image: providerDraft.image.selected,
            avatarVideo: providerDraft.avatarVideo.selected,
            textToSpeech: providerDraft.textToSpeech.selected,
        })

        setSavingProviderConfig(false)
        if (result.error) {
            setProviderSaveMessage(result.error)
            return
        }

        setProviderStatus(result.providers)
        setProviderDraft(result.providers)
        setProviderSaveMessage('Provider configuration saved.')
    }

    const features = [
        {
            icon: <Terminal size={24} className="icon-blue" />,
            title: 'Full SDK Support',
            description: 'Native libraries for Python, Node.js, and Go to accelerate your integration.'
        },
        {
            icon: <Webhook size={24} className="icon-purple" />,
            title: 'Real-time Webhooks',
            description: 'Get notified instantly when your generations are complete or state changes.'
        },
        {
            icon: <Shield size={24} className="icon-amber" />,
            title: 'Enterprise Security',
            description: 'OAuth2 authentication with granular permission scopes for team access.'
        }
    ]

    const endpoints = [
        { method: 'POST', path: '/v1/neural/faceswap', desc: 'Perform AI-driven facial replacement', cost: '15' },
        { method: 'POST', path: '/v1/video/ugc', desc: 'Create a video from script or topic', cost: '20' },
        { method: 'POST', path: '/v1/audio/dubbing', desc: 'High-fidelity audio synthesis', cost: '5' },
        { method: 'GET', path: '/v1/jobs/:id', desc: 'Poll status of active executions', cost: 'Free' }
    ]

    return (
        <div className="api-landing-container">
            <div className="api-hero">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="hero-content"
                >
                    <div className="api-badge">
                      <div className="pulse-dot"></div>
                      <Code2 size={14} /> Developer Node v1.2.4-stable
                    </div>
                    <h1>Orchestrate AI with <br />a Single <span className="text-glow">API Call</span></h1>
                    <p>Integrate our state-of-the-art video, audio, and neural processing capabilities directly into your production application with enterprise-grade reliability.</p>
                    
                    <div className="hero-actions">
                        <button className="primary-btn" onClick={() => navigate('/docs')}>
                            Explore Docs <ArrowRight size={18} />
                        </button>
                        <button className="secondary-btn" onClick={() => navigate('/dev/api-keys')}>
                            <Key size={18} /> API Keys
                        </button>
                    </div>

                    <div className="install-cmd" onClick={handleCopy}>
                      <Terminal size={16} />
                      <code>pip install fliki-sdk</code>
                      <div className="copy-btn">
                        {copied ? <CheckCircle2 size={14} color="#10b981" /> : <Copy size={14} />}
                      </div>
                    </div>
                </motion.div>

                <motion.div 
                    className="hero-terminal glass-card"
                    initial={{ opacity: 0, x: 30, rotateY: 15 }}
                    animate={{ opacity: 1, x: 0, rotateY: -5 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="terminal-header">
                        <div className="t-dots"><span></span><span></span><span></span></div>
                        <div className="t-title">faceswap_example.py</div>
                        <div className="t-lang">Python 3.10</div>
                    </div>
                    <div className="terminal-body">
                        <pre>
                            <code>
<span className="code-keyword">import</span> fliki_ai <span className="code-keyword">as</span> ai

<span className="code-comment"># Initializing Neural Orchestrator</span>
client = ai.Client(api_key=<span className="code-string">"sk_live_XXXXX"</span>)

<span className="code-comment"># Triggering Face Swap Execution</span>
job = client.neural.faceswap(
    source_url=<span className="code-string">"https://assets.io/scene.jpg"</span>,
    target_url=<span className="code-string">"https://assets.io/face.jpg"</span>,
    engine=<span className="code-string">"realistic"</span>
)

<span className="code-keyword">print</span>(<span className="code-string">f"Execution Node Started: {'{'}job.id{'}'}"</span>)
<span className="code-comment"># Result: Completed in 8.4s</span>
                            </code>
                        </pre>
                    </div>
                </motion.div>
            </div>

            <motion.div 
              className="api-stats-bar glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
                <div className="stat-item">
                    <Activity size={24} className="icon-green" />
                    <div className="stat-info">
                        <strong>99.999%</strong>
                        <span>Realtime Uptime</span>
                    </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <Server size={24} className="icon-blue" />
                    <div className="stat-info">
                        <strong>&lt; 85ms</strong>
                        <span>Global Latency</span>
                    </div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <Globe size={24} className="icon-purple" />
                    <div className="stat-info">
                        <strong>12 Regions</strong>
                        <span>Edge Distribution</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
              className="provider-status-panel glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
                <div className="ref-header">
                    <h3>Provider Routing</h3>
                    <button className="view-all" onClick={() => navigate('/dev/env-vars')}>
                        Environment Config <ExternalLink size={14} />
                    </button>
                </div>

                {providerError && <div className="provider-empty">{providerError}</div>}
                {!providerError && !providerStatus && <div className="provider-empty">Loading provider configuration...</div>}

                {providerStatus && providerDraft && (
                    <div className="provider-grid">
                        <div className="provider-item">
                            <span className="provider-label">Image</span>
                            <strong>{providerStatus.image.active}</strong>
                            <small>selected: {providerStatus.image.selected}</small>
                            <select
                              className="provider-select"
                              value={providerDraft.image.selected}
                              onChange={(e) => handleProviderSelect('image', e.target.value)}
                            >
                                {providerStatus.image.available.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="provider-item">
                            <span className="provider-label">Avatar Video</span>
                            <strong>{providerStatus.avatarVideo.active}</strong>
                            <small>selected: {providerStatus.avatarVideo.selected}</small>
                            <select
                              className="provider-select"
                              value={providerDraft.avatarVideo.selected}
                              onChange={(e) => handleProviderSelect('avatarVideo', e.target.value)}
                            >
                                {providerStatus.avatarVideo.available.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="provider-item">
                            <span className="provider-label">Text to Speech</span>
                            <strong>{providerStatus.textToSpeech.active}</strong>
                            <small>selected: {providerStatus.textToSpeech.selected}</small>
                            <select
                              className="provider-select"
                              value={providerDraft.textToSpeech.selected}
                              onChange={(e) => handleProviderSelect('textToSpeech', e.target.value)}
                            >
                                {providerStatus.textToSpeech.available.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {providerStatus && (
                    <div className="provider-actions-row">
                        <button className="secondary-btn" onClick={handleSaveProviderConfig} disabled={savingProviderConfig}>
                            {savingProviderConfig ? 'Saving...' : 'Save Provider Config'}
                        </button>
                        {providerSaveMessage && <span className="provider-save-message">{providerSaveMessage}</span>}
                    </div>
                )}
            </motion.div>

            <div className="api-features-grid">
                {features.map((feat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="feature-card glass-card"
                    >
                        <div className="feat-icon">{feat.icon}</div>
                        <h3>{feat.title}</h3>
                        <p>{feat.description}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div 
              className="api-quick-reference glass-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
                <div className="ref-header">
                    <h3>Operational Endpoints</h3>
                    <button className="view-all" onClick={() => navigate('/docs')}>
                        Technical Reference <ExternalLink size={14} />
                    </button>
                </div>
                <div className="endpoints-list">
                    {endpoints.map((ep, i) => (
                        <div key={i} className="endpoint-item">
                            <span className={`method ${ep.method.toLowerCase()}`}>{ep.method}</span>
                            <div className="path-chip">
                              <code>{ep.path}</code>
                            </div>
                            <span className="desc">{ep.desc}</span>
                            <div className="cost-tag">
                              <Zap size={10} fill="currentColor" /> {ep.cost}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="api-cta-section">
                <motion.div 
                  className="cta-content glass-card"
                  whileHover={{ scale: 1.01 }}
                >
                    <div className="cta-left">
                        <div className="cta-icon-wrap">
                          <Bot size={42} color="#fff" />
                        </div>
                        <div>
                            <h2>Scale your vision.</h2>
                            <p>Get started with 2,500 complimentary node credits. No commitments until you hit scale.</p>
                        </div>
                    </div>
                    <button className="start-build-btn" onClick={() => navigate('/register')}>
                        Deploy Node <ArrowRight size={20} />
                    </button>
                </motion.div>
            </div>
            
            <footer className="api-footer-support">
              <div className="support-card glass-card">
                 <div className="s-icon"><Layers size={20} /></div>
                 <div>
                    <strong>Developer Community</strong>
                    <span>Join 12,000+ engineers on Discord</span>
                 </div>
                 <ChevronRight size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
              </div>
              <div className="support-card glass-card">
                 <div className="s-icon"><Shield size={20} /></div>
                 <div>
                    <strong>Security Audit</strong>
                    <span>Standard SOC2 Type II Certified</span>
                 </div>
                 <ChevronRight size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
              </div>
            </footer>
        </div>
    )
}

export default API
