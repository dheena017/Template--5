import React, { useState } from 'react'
import { 
  Terminal, ListOrdered, RefreshCw, 
  Search, Filter, Download, 
  AlertCircle, CheckCircle2, 
  Info, Shield, Clock, Search as LucidSearch,
  Zap, Database, Server, Smartphone,
  Activity, Globe, Cpu, MoreHorizontal
} from 'lucide-react'
import '../../styles/pages/developers/DevLogs.css'

const DevLogs = () => {
  const [filterType, setFilterType] = useState('All')

  const logs = [
    { id: '1', level: 'INFO', service: 'AUTH', event: 'Token generated for user: dheen_dev', time: '12:42:01', status: '200' },
    { id: '2', level: 'WARN', service: 'TTS', event: 'Voice clone model: MF-1 - High Latency', time: '12:41:58', status: '200' },
    { id: '3', level: 'ERROR', service: 'STT', event: 'Input file size: 1.2GB exceeds limit', time: '12:41:42', status: '413' },
    { id: '4', level: 'DEBUG', service: 'DB', event: 'DB Connection Pooled: 84ms', time: '12:41:38', status: '200' }
  ]

  return (
    <div className="logs-container">
      <header className="logs-header">
        <div className="header-left">
          <h1>System Logs & Traces</h1>
          <p>Global event logging for distributed services and neural orchestrators.</p>
        </div>
        <div className="header-actions">
           <div className="search-logs glass-card">
              <Search size={16} />
              <input type="text" placeholder="Search by event, id, or trace..." />
           </div>
           <button className="secondary-btn"><Download size={18} /> Export</button>
        </div>
      </header>

      <div className="logs-content premium-card">
        <div className="logs-toolbar">
           <div className="filter-group">
              {['All', 'Info', 'Warn', 'Error', 'Debug'].map(f => (
                <button 
                  key={f} 
                  className={`filter-btn ${filterType === f ? 'active' : ''}`}
                  onClick={() => setFilterType(f)}
                >
                  {f}
                </button>
              ))}
           </div>
           <div className="live-status">
              <div className="s-dot active"></div>
              <span>Live Streaming: 124 eps</span>
           </div>
        </div>

        <div className="logs-table">
           <div className="log-row header">
              <span>Level</span><span>Service</span><span>Event Summary</span><span>Status</span><span>Timestamp</span>
           </div>
           {logs.map(l => (
             <div key={l.id} className="log-row item">
                <span className={`level ${l.level.toLowerCase()}`}>{l.level}</span>
                <span className="service">{l.service}</span>
                <span className="event">{l.event}</span>
                <span className="status">{l.status}</span>
                <span className="time">{l.time}</span>
             </div>
           ))}
        </div>

        <div className="logs-footer">
           <span>Showing 4 / 241,802 results</span>
           <div className="pagination">
              <button>Prev</button>
              <button className="active">1</button>
              <button>2</button>
              <button>Next</button>
           </div>
        </div>
      </div>
    </div>
  )
}

export default DevLogs





