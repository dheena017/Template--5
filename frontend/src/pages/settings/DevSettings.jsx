import React, { useState } from 'react'
import './SettingsUniversal.css'
import { 
  Terminal, Key, Webhook, Activity, Code2, Cpu, 
  Globe, ShieldCheck, Lock, RefreshCw, Layers, 
  Box, Braces, Rocket
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const DevSettings = () => {
  const [rateLimit, setRateLimit] = useState(100);
  const [retryBackoff, setRetryBackoff] = useState(250);
  const [region, setRegion] = useState('Auto-Optimize (Latency)');
  const [autoRotate, setAutoRotate] = useState(false);
  const [breachDetect, setBreachDetect] = useState(true);
  const [webhookEvents, setWebhookEvents] = useState('errors');
  const [retryWebhooks, setRetryWebhooks] = useState(true);
  const [telemetry, setTelemetry] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [sandboxMode, setSandboxMode] = useState(true);

  return (
    <div className="settings-content-grid">
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
           <Terminal size={32} className="text-secondary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Aura Engine API Core</h3>
             <p className="text-sm text-slate-500">Universal endpoint management and cryptographic key rotation for developers.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">API Global Rate Limit</label>
               <span className="radius-numerical-badge">{rateLimit}/min</span>
             </div>
             <input
               type="range" min="10" max="1000" step="10"
               value={rateLimit}
               onChange={e => setRateLimit(Number(e.target.value))}
             />
             <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Protective threshold for all private API tokens to prevent runaway costs.</p>
           </div>
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">Retry Backoff (ms)</label>
               <span className="radius-numerical-badge">{retryBackoff}ms</span>
             </div>
             <input
               type="range" min="100" max="2000" step="50"
               value={retryBackoff}
               onChange={e => setRetryBackoff(Number(e.target.value))}
             />
             <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Exponential delay interval between failed engine requests.</p>
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Globe size={24} />
          <h3>Infrastructure Region</h3>
        </div>
        <p className="setting-desc">Primary cluster for orchestrating AI tasks.</p>
        <div className="space-y-4 mt-4">
           {['Auto-Optimize (Latency)', 'US-East (Virginia)', 'EU-Central (Frankfurt)', 'Asia-Pacific (Mumbai)'].map(loc => (
             <button
               key={loc}
               className={`seg-btn ${region === loc ? 'active' : ''}`}
               onClick={() => setRegion(loc)}
             >
               {loc}
             </button>
           ))}
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Key size={24} />
          <h3>Key Lifecycle</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
           <div className="toggle-row">
             <label>Auto-Rotate Monthly</label>
             <OnOffButton checked={autoRotate} onChange={setAutoRotate} />
           </div>
           <div className="toggle-row">
             <label>Revoke on Breach Detection</label>
             <OnOffButton checked={breachDetect} onChange={setBreachDetect} />
           </div>
           <button className="premium-button-secondary w-full py-3 text-xs uppercase font-black tracking-widest mt-4">
             Generate Fresh Token Suite
           </button>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Braces size={24} />
          <h3>Webhook Intelligence</h3>
        </div>
        <p className="setting-desc">Universal event notifications for automation.</p>
        <select
          className="setting-select mt-4"
          value={webhookEvents}
          onChange={e => setWebhookEvents(e.target.value)}
        >
          <option value="errors">Events: Success/Errors Only</option>
          <option value="lifecycle">Events: Detailed Lifecycle Logs</option>
          <option value="raw">Events: Full Raw State Traces</option>
        </select>
        <div className="toggle-list mt-8">
           <div className="toggle-row">
             <label>Retry Failed Webhooks</label>
             <OnOffButton checked={retryWebhooks} onChange={setRetryWebhooks} />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Rocket size={24} />
          <h3>Environmental Mode</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>Real-time Telemetry</label>
            <OnOffButton checked={telemetry} onChange={setTelemetry} />
          </div>
          <div className="toggle-row">
            <label>Detailed Request Debugger</label>
            <OnOffButton checked={debugMode} onChange={setDebugMode} />
          </div>
          <div className="toggle-row">
            <label>Enable Sandbox Mode</label>
            <OnOffButton checked={sandboxMode} onChange={setSandboxMode} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default DevSettings
