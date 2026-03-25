import React, { useState, useEffect } from 'react'
import { 
  Key, Plus, Copy, Trash2, 
  RefreshCw, Shield, Eye, EyeOff,
  CheckCircle2, AlertCircle, Clock,
  Terminal, ShieldCheck, Zap, Info,
  Search, Filter, Lock, Unlock,
  MoreVertical, Download, X,
  ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import '../../styles/pages/developers/ApiKeys.css'

const ApiKeys = () => {
  useEffect(() => {
    logger.log('APIKEYS', 'Component mounted')
  }, [])
  const [showKeyId, setShowKeyId] = useState(null)
  const [keys, setKeys] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const loadKeys = async () => {
    setIsLoading(true)
    logger.log('APIKEYS', 'Loading API keys')
    const data = await api.getApiKeys()
    setKeys(data)
    logger.success('APIKEYS', 'API keys loaded', { count: data?.length || 0 })
    setIsLoading(false)
  }
  
  React.useEffect(() => {
    const loadData = async () => {
      await loadKeys()
    }
    loadData()
  }, [])

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return
    setIsCreating(true)
    logger.log('APIKEYS', 'Creating new API key', { keyName: newKeyName })
    const newKey = await api.createApiKey(newKeyName)
    if (newKey) {
      logger.success('APIKEYS', 'API key created', { keyId: newKey.id })
      setKeys([...keys, newKey])
      setNewKeyName('')
      setShowCreateForm(false)
    } else {
      logger.error('APIKEYS', 'Failed to create API key')
    }
    setIsCreating(false)
  }

  const handleDeleteKey = async (id) => {
    if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      logger.log('APIKEYS', 'Revoking API key', { keyId: id })
      const success = await api.deleteApiKey(id)
      if (success) {
        logger.success('APIKEYS', 'API key revoked', { keyId: id })
        setKeys(keys.filter(k => k.id !== id))
      } else {
        logger.error('APIKEYS', 'Failed to revoke API key', id)
      }
    }
  }

  const handleRotateKey = async (id) => {
    if (window.confirm('Rotating this key will invalidate the current one. Continue?')) {
      logger.log('APIKEYS', 'Rotating API key', { keyId: id })
      const updatedKey = await api.rotateApiKey(id)
      if (updatedKey) {
        logger.success('APIKEYS', 'API key rotated', { keyId: id })
        setKeys(keys.map(k => k.id === id ? updatedKey : k))
      } else {
        logger.error('APIKEYS', 'Failed to rotate API key', id)
      }
    }
  }

  const toggleKey = (id) => {
    setShowKeyId(showKeyId === id ? null : id)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    logger.log('APIKEYS', 'API key copied to clipboard')
    // Optional: add a toast or feedback
  }

  return (
    <div className="apikeys-container">
      <header className="apikeys-header">
        <div className="header-left">
          <h1>API Security <span className="hq-badge">v3 Keys</span></h1>
          <p>Manage your programmatic access. Keep these keys secret and secure.</p>
        </div>
        <div className="header-actions">
           {!showCreateForm ? (
             <button className="primary-btn" onClick={() => setShowCreateForm(true)}>
               <Plus size={18} /> Create New Secret Key
             </button>
           ) : (
             <div className="create-key-form glass-card">
               <input 
                 type="text" 
                 placeholder="Enter key name..." 
                 value={newKeyName}
                 onChange={(e) => setNewKeyName(e.target.value)}
                 autoFocus
               />
               <button onClick={handleCreateKey} disabled={isCreating}>
                 {isCreating ? 'Creating...' : 'Create'}
               </button>
               <button className="cancel-btn" onClick={() => setShowCreateForm(false)}>
                 <X size={18} />
               </button>
             </div>
           )}
        </div>
      </header>

      <div className="apikeys-layout">
        <main className="apikeys-main premium-card">
           <div className="keys-toolbar">
              <div className="search-keys glass-card">
                 <Search size={16} />
                 <input type="text" placeholder="Search by key name..." />
              </div>
              <div className="filter-group">
                 <button className="filter-btn active">All Keys</button>
                 <button className="filter-btn">Active</button>
                 <button className="filter-btn">Revoked</button>
              </div>
           </div>

           <div className="keys-table">
               <div className="k-row label-row">
                  <span>Secret Key Name</span>
                  <span>Key Preview</span>
                  <span>Usage (Req)</span>
                  <span>Last Used</span>
                  <span>Actions</span>
               </div>
              
              <AnimatePresence>
                {isLoading ? (
                  <div className="loading-state">Loading API keys...</div>
                ) : (
                  keys.map(k => (
                    <motion.div 
                      key={k.id} 
                      className="k-row item-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                       <div className="k-name">
                          <strong>{k.name}</strong>
                          <span className="status-dot-text"><div className={`dot ${k.status === 'Active' ? 'active' : ''}`}></div> {k.status}</span>
                       </div>
                       <div className="k-preview">
                          <div className="key-string glass-card">
                             <div className="code-font">
                               {showKeyId === k.id ? k.key : (k.key?.substring(0, 12) + '...' + k.key?.substring(k.key.length - 4))}
                             </div>
                             <button className="reveal-btn" onClick={() => toggleKey(k.id)}>
                                {showKeyId === k.id ? <EyeOff size={14} /> : <Eye size={14} />}
                             </button>
                          </div>
                          <button className="icon-btn-key" onClick={() => copyToClipboard(k.key)}><Copy size={16} /></button>
                       </div>
                       <div className="k-usage"><strong>{k.usage_count || 0}</strong></div>
                       <div className="k-created">{k.last_used ? new Date(k.last_used).toLocaleDateString() : 'Never'}</div>
                       <div className="k-actions">
                          <button className="icon-btn-key danger" onClick={() => handleDeleteKey(k.id)}><Trash2 size={16} /></button>
                          <button className="icon-btn-key rotate" onClick={() => handleRotateKey(k.id)}><RefreshCw size={16} /></button>
                       </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
           </div>
        </main>

        <aside className="apikeys-sidebar">
           <section className="premium-card best-practices">
              <h3><ShieldCheck size={18} /> Key Security</h3>
              <p>Never share your secret keys in client-side code, public repositories, or any other location where they can be compromised.</p>
              <div className="learn-more-link">Security Guide <ChevronRight size={14} /></div>
           </section>

           <section className="premium-card rate-limits">
              <h3>Default Rate Limits</h3>
              <div className="limit-list">
                 <div className="limit-row"><span>Read</span> <strong>1000/s</strong></div>
                 <div className="limit-row"><span>Write</span> <strong>200/s</strong></div>
                 <div className="limit-row"><span>Streaming</span> <strong>50/s</strong></div>
              </div>
           </section>
        </aside>
      </div>
    </div>
  )
}

export default ApiKeys





