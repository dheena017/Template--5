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
    <div className="history-page">
      <header className="history-header">
        <div>
          <h1><HistoryIcon size={26} /> Activity History</h1>
          <p>Track your recent creations, edits, exports, and automation events in one place.</p>
        </div>
        <button className="history-refresh-btn" onClick={loadHistory} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </header>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="history-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}
          >
            <Loader2 size={32} className="spin" style={{ marginBottom: '16px' }} />
            <p>Loading activity...</p>
          </motion.div>
        ) : error ? (
          <motion.div key="error" className="history-error" style={{ padding: '40px', textAlign: 'center' }}>
            <AlertCircle size={32} color="#ff4757" style={{ marginBottom: '12px' }} />
            <p style={{ color: '#ff4757' }}>{error}</p>
            <button onClick={loadHistory} style={{ marginTop: '16px', padding: '10px 24px', background: 'var(--primary)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
              Retry
            </button>
          </motion.div>
        ) : events.length === 0 ? (
          <motion.div key="empty" style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
            <HistoryIcon size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <h3>No activity yet</h3>
            <p>Your job history will appear here once you start using the AI tools.</p>
          </motion.div>
        ) : (
          <motion.section
            key="list"
            className="history-timeline premium-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {events.map((event, idx) => {
              const status = event.status || 'Accepted'
              const jobType = event.type || event.tool_name || 'job'
              const statusColor = statusColors[status] || '#747d8c'
              const icon = typeIcons[jobType.toLowerCase()] || <Layers size={16} />
              return (
                <article key={event.id || idx} className="history-item">
                  <div className="history-icon" style={{ background: `${statusColor}22`, color: statusColor }}>
                    {icon}
                  </div>
                  <div className="history-copy">
                    <h3>{event.name || `Job #${String(event.id).slice(0, 8)}`}</h3>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: statusColor, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {statusIcons[status] || null}
                        {status}
                      </span>
                      {event.progress != null && ` • ${event.progress}%`}
                      {jobType && ` • ${jobType}`}
                    </p>
                  </div>
                  <div className="history-meta">
                    <span>{formatTime(event.created_at || event.timestamp)}</span>
                    {event.result?.url && (
                      <a
                        href={event.result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="history-open-btn"
                      >
                        Open <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default History





