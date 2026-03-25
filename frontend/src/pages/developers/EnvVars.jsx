import React, { useState } from 'react'
import { 
  Variable, Plus, Lock, Unlock, 
  Trash2, RefreshCw, Layers, 
  ShieldCheck, Server, Globe,
  CheckCircle2, AlertCircle, Copy,
  Search, Eye, EyeOff, MoreVertical
} from 'lucide-react'
import '../../styles/pages/developers/EnvVars.css'

const EnvVars = () => {
  const [showValues, setShowValues] = useState({})
  
  const [vars, setVars] = useState([
    { id: '1', key: 'REPLICATE_API_TOKEN', value: 'r8_49c...x9a2', scope: 'Production', type: 'Secret' },
    { id: '2', key: 'DATABASE_URL', value: 'postgresql://db_admin:****@aws-us-east...', scope: 'Production', type: 'System' },
    { id: '3', key: 'REDIS_CACHE_URL', value: 'redis://:****@cache-12.redis.io:1234', scope: 'Staging', type: 'Env' },
  ])

  const toggleValue = (id) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="envvars-container">
      <header className="envvars-header">
        <div className="header-left">
          <h1>Environment Configuration</h1>
          <p>Securely manage your service secrets, database credentials, and API environment variables.</p>
        </div>
        <div className="header-actions">
           <button className="secondary-btn"><Layers size={18} /> Bulk Import</button>
           <button className="primary-btn"><Plus size={18} /> Add Variable</button>
        </div>
      </header>

      <div className="envvars-layout">
        <main className="envvars-main premium-card">
           <div className="vars-toolbar">
              <div className="scope-tabs">
                 <button className="active">All Scopes</button>
                 <button>Production</button>
                 <button>Staging</button>
                 <button>Development</button>
              </div>
              <div className="search-vars glass-card">
                 <Search size={16} />
                 <input type="text" placeholder="Filter variables..." />
              </div>
           </div>

           <div className="vars-list">
              <div className="v-row header">
                 <span>Variable Key</span>
                 <span>Secret Value</span>
                 <span>Scope</span>
                 <span>Encryption</span>
                 <span>Actions</span>
              </div>
              
              {vars.map(v => (
                <div key={v.id} className="v-row item">
                   <div className="v-key">
                      <code className="key-code">{v.key}</code>
                   </div>
                   <div className="v-value">
                      <div className="value-mask glass-card">
                         <div className="code-font">{showValues[v.id] ? (v.id === '1' ? 'r8_49c124x9a2bb831' : v.value) : v.value}</div>
                         <button className="eye-btn" onClick={() => toggleValue(v.id)}>
                            {showValues[v.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                         </button>
                      </div>
                      <button className="icon-btn-env"><Copy size={16} /></button>
                   </div>
                   <div className="v-scope">
                      <span className={`scope-tag ${v.scope.toLowerCase()}`}>{v.scope}</span>
                   </div>
                   <div className="v-status">
                      <span className="enc-tag"><ShieldCheck size={12} /> AES-256</span>
                   </div>
                   <div className="v-actions">
                      <button className="icon-btn-env danger"><Trash2 size={16} /></button>
                      <button className="icon-btn-env"><RefreshCw size={16} /></button>
                   </div>
                </div>
              ))}
           </div>
        </main>

        <aside className="envvars-sidebar">
           <section className="premium-card enc-info">
              <h3><Lock size={18} /> Security Guard</h3>
              <p>Variables are encrypted at rest using **AES-256-GCM** and decrypted only at the runtime injection point.</p>
              <div className="audit-note">Next Rotation: <strong>12 Days</strong></div>
           </section>

           <section className="premium-card system-usage">
              <h3>Runtime Injection</h3>
              <div className="usage-metric">
                 <div className="label"><span>Active Injectors</span> <strong>12</strong></div>
                 <div className="label"><span>Decryption Ops</span> <strong>1.2k/hr</strong></div>
              </div>
           </section>
        </aside>
      </div>
    </div>
  )
}

export default EnvVars





