import React, { useEffect, useState } from 'react'
import { Clock, Download, Trash2, Share2, AlertCircle, Loader2 } from 'lucide-react'
import useConversionHistory from '../hooks/useConversionHistory'
import './ConversionHistorySidebar.css'

const ConversionHistorySidebar = ({ conversionKey = null, onSelectConversion = null, maxHeight = '400px' }) => {
  const { history, loading, error, getRecent } = useConversionHistory()
  const [expanded, setExpanded] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (expanded) {
      getRecent(conversionKey, 10, 30)
    }
  }, [expanded, conversionKey, getRecent])

  const handleSelectConversion = (conversion) => {
    setSelectedId(conversion.id)
    if (onSelectConversion) {
      onSelectConversion(conversion)
    }
  }

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString()
  }

  return (
    <div className="conversion-history-sidebar">
      <button
        className={`history-toggle ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
        title="View recent conversions"
      >
        <Clock size={18} />
        <span>History</span>
        <span className="count-badge">{history.length}</span>
      </button>

      {expanded && (
        <div className="history-panel" style={{ maxHeight }}>
          {loading ? (
            <div className="history-loading">
              <Loader2 size={20} className="spinner" />
              <p>Loading history...</p>
            </div>
          ) : error ? (
            <div className="history-error">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          ) : history.length === 0 ? (
            <div className="history-empty">
              <Clock size={24} />
              <p>No conversions yet</p>
              <span className="hint">Your recent conversions will appear here</span>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div
                  key={item.id}
                  className={`history-item ${selectedId === item.id ? 'selected' : ''}`}
                  onClick={() => handleSelectConversion(item)}
                >
                  <div className="item-header">
                    <div className="item-title">
                      <span className="conversion-key">{item.conversion_key}</span>
                      <span className="format-badge">
                        {item.from_format} → {item.to_format}
                      </span>
                    </div>
                    <span className={`status-badge status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="item-details">
                    <div className="detail">
                      <span className="label">File:</span>
                      <span className="value" title={item.file_name}>
                        {item.file_name.length > 30
                          ? item.file_name.substring(0, 27) + '...'
                          : item.file_name}
                      </span>
                    </div>
                    {item.file_size_bytes && (
                      <div className="detail">
                        <span className="label">Size:</span>
                        <span className="value">{formatBytes(item.file_size_bytes)}</span>
                      </div>
                    )}
                    {item.processing_time_ms && (
                      <div className="detail">
                        <span className="label">Time:</span>
                        <span className="value">{item.processing_time_ms}ms</span>
                      </div>
                    )}
                    <div className="detail time">
                      <Clock size={12} />
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                  </div>

                  {item.output_url && (
                    <div className="item-actions">
                      <button className="action-btn download" title="Download result">
                        <Download size={16} />
                      </button>
                      <button className="action-btn share" title="Share result">
                        <Share2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="history-footer">
            <small>Showing {history.length} recent conversions</small>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConversionHistorySidebar
