import React, { useEffect, useState } from 'react'
import {
  History as HistoryIcon,
  Clock3,
  FileAudio,
  Sparkles,
  Layers,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import '../../styles/pages/studio/History.css'

const statusColors = {
  'Completed': '#2ed573',
  'Failed': '#ff4757',
  'Processing': '#ffa502',
  'In Queue': '#747d8c',
  'Accepted': '#1e90ff'
}

const statusIcons = {
  'Completed': <CheckCircle2 size={14} />,
  'Failed': <AlertCircle size={14} />,
  'Processing': <Loader2 size={14} className="spin" />,
  'In Queue': <Clock3 size={14} />,
  'Accepted': <Sparkles size={14} />
}

const typeIcons = {
  'ugc': <FileAudio size={16} />,
  'highlights': <Sparkles size={16} />,
  'podcast': <FileAudio size={16} />,
  'dubbing': <Layers size={16} />,
  'batch': <Layers size={16} />,
  'broll': <Sparkles size={16} />,
  'faceswap': <Sparkles size={16} />,
  'pronunciation': <FileAudio size={16} />,
  'image': <Sparkles size={16} />
}

const History = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadHistory = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getProjects()
      if (Array.isArray(data)) {
        setEvents(data)
      } else {
        setEvents([])
      }
    } catch (err) {
      console.error('Failed to load history:', err)
      setError('Failed to load activity history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const formatTime = (dateStr) => {
    if (!dateStr) return '—'
    const date = new Date(dateStr)
    const diff = Date.now() - date.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Just now'
    if (mins < 60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} hour${hrs !== 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="history-page-v3 cinematic-view">
      <section className="history-hero-aura">
         <motion.div 
           className="hero-inner-aura"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
         >
           <span className="hero-tag-aura"><HistoryIcon size={14} /> SYSTEM AUDIT LOG</span>
           <h1>Activity Timeline</h1>
           <p>Monitor your distributed AI processing, generation events, and identity synthesis in real-time.</p>
         </motion.div>
         
         <div className="hero-actions-aura">
           <button className="premium-refresh-btn" onClick={loadHistory} disabled={loading}>
             <RefreshCw size={18} className={loading ? 'spin' : ''} />
             {loading ? 'Synchronizing...' : 'Refresh Logs'}
           </button>
         </div>
      </section>

      <div className="history-content-bridge">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="history-loading-aura"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <div className="loading-orbit">
                <Loader2 size={48} className="spin text-secondary" />
                <div className="orbit-ring"></div>
              </div>
              <p>Scanning Neural Network...</p>
            </motion.div>
          ) : error ? (
            <motion.div key="error" className="history-error-aura" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="error-icon-box">
                <AlertCircle size={40} />
              </div>
              <h3>Connection Terminated</h3>
              <p>{error}</p>
              <button className="retry-btn-aura" onClick={loadHistory}> Reconnect </button>
            </motion.div>
          ) : events.length === 0 ? (
            <motion.div key="empty" className="history-empty-aura" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="empty-symbol"><Ghost size={64} /></div>
              <h3>Void Detected</h3>
              <p>No activity logs found in the current temporal window.</p>
              <button className="action-btn-primary" onClick={() => window.location.href='/dashboard'}>Launch Tool</button>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="history-timeline-v3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {events.map((event, idx) => {
                const status = event.status || 'Accepted';
                const jobType = event.type || event.tool_name || 'Workflow';
                const statusColor = statusColors[status] || '#747d8c';
                const icon = typeIcons[jobType.toLowerCase()] || <Layers size={16} />;
                
                return (
                  <motion.article 
                    key={event.id || idx} 
                    className="history-event-card glass-ui-active"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="event-marker">
                       <div className="marker-dot" style={{ backgroundColor: statusColor, boxShadow: `0 0 15px ${statusColor}` }}></div>
                       <div className="marker-line"></div>
                    </div>
                    
                    <div className="event-body-premium">
                      <div className="event-type-icon" style={{ background: `${statusColor}15`, color: statusColor }}>
                        {icon}
                      </div>
                      
                      <div className="event-main-content">
                        <div className="event-header-flex">
                          <h3 className="event-title">{event.name || `Session_ID: ${String(event.id || idx).slice(0, 10)}`}</h3>
                          <span className="event-time-stamp">{formatTime(event.created_at || event.timestamp)}</span>
                        </div>
                        
                        <div className="event-meta-row">
                          <div className="event-status-badge" style={{ color: statusColor, background: `${statusColor}10` }}>
                            {statusIcons[status]}
                            <span>{status.toUpperCase()}</span>
                          </div>
                          
                          <span className="event-sep">|</span>
                          <span className="event-category">{jobType}</span>
                          
                          {event.progress != null && (
                            <div className="event-progress-mini">
                               <div className="progress-track"><div className="progress-fill" style={{ width: `${event.progress}%`, background: statusColor }}></div></div>
                               <span>{event.progress}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="event-actions-hub">
                        {event.result?.url ? (
                          <a href={event.result.url} target="_blank" rel="noopener noreferrer" className="event-link-btn">
                            Retrieve <ExternalLink size={14} />
                          </a>
                        ) : (
                          <button className="event-view-btn" title="View details"> Inspect </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default History





