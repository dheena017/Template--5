import React, { useState } from 'react'
import './SettingsUniversal.css'
import { 
  FileText, Languages, MessageSquare, ListChecks, Zap, 
  BookOpen, Brain, PenTool, Hash, Globe, 
  Workflow, Database
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const TextSettings = () => {
  const [llmModel, setLlmModel] = useState('gpt');
  const [translationProvider, setTranslationProvider] = useState('DeepL Pro (Fastest)');
  const [regionalSlang, setRegionalSlang] = useState(true);
  const [grammarFix, setGrammarFix] = useState(true);
  const [layoutPrep, setLayoutPrep] = useState(true);
  const [smartQuotes, setSmartQuotes] = useState(true);
  const [autoSummary, setAutoSummary] = useState(false);
  const [semanticSearch, setSemanticSearch] = useState(true);
  const [summarizationStyle, setSummarizationStyle] = useState('concise');
  const [region, setRegion] = useState('en-us');
  const [tone, setTone] = useState('Marketing');

  return (
    <div className="settings-content-grid">
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
           <Brain size={32} className="text-primary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Linguistic Intelligence</h3>
             <p className="text-sm text-slate-500">Universal Large Language Model (LLM) configuration for text processing.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
           {[
             { id: 'gpt', label: 'GPT-4o Omnis', icon: Zap, desc: 'Highest reasoning and coding ability.' },
             { id: 'claude', label: 'Claude 3.5 Sonnet', icon: PenTool, desc: 'Superior creative writing and feel.' },
             { id: 'deepseek', label: 'DeepSeek-V3', icon: Workflow, desc: 'Optimized technical and logic tasks.' }
           ].map(opt => (
             <button 
               key={opt.id}
               className={`theme-selection-card ${llmModel === opt.id ? 'active' : ''}`}
               onClick={() => setLlmModel(opt.id)}
             >
                <opt.icon size={20} className="mb-3" />
                <span className="font-bold block text-sm">{opt.label}</span>
                <p className="text-[9px] opacity-60 leading-tight">{opt.desc}</p>
             </button>
           ))}
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Languages size={24} />
          <h3>Universal Translation</h3>
        </div>
        <p className="setting-desc">Primary neural engine for real-time localization.</p>
        <div className="space-y-4 mt-4">
           {['DeepL Pro (Fastest)', 'Google Cloud Advanced', 'Neural GPT-4o Vision'].map(prov => (
             <button
               key={prov}
               className={`seg-btn ${translationProvider === prov ? 'active' : ''}`}
               onClick={() => setTranslationProvider(prov)}
             >
               {prov}
             </button>
           ))}
        </div>
        <div className="toggle-list mt-8">
           <div className="toggle-row">
             <label>Regional Slang Detection</label>
             <OnOffButton checked={regionalSlang} onChange={setRegionalSlang} />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Hash size={24} />
          <h3>Structure &amp; Formatting</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
           <div className="toggle-row">
             <label>Auto-Grammar Calibration</label>
             <OnOffButton checked={grammarFix} onChange={setGrammarFix} />
           </div>
           <div className="toggle-row">
             <label>Preserve Visual Layout</label>
             <OnOffButton checked={layoutPrep} onChange={setLayoutPrep} />
           </div>
           <div className="toggle-row">
             <label>Smart Aesthetic Quotes</label>
             <OnOffButton checked={smartQuotes} onChange={setSmartQuotes} />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <BookOpen size={24} />
          <h3>Content Orchestration</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>Auto-Summary on Import</label>
            <OnOffButton checked={autoSummary} onChange={setAutoSummary} />
          </div>
          <div className="toggle-row">
            <label>Semantic Search Indexing</label>
            <OnOffButton checked={semanticSearch} onChange={setSemanticSearch} />
          </div>
        </div>
        <select
          className="setting-select mt-4"
          value={summarizationStyle}
          onChange={e => setSummarizationStyle(e.target.value)}
        >
          <option value="concise">Summarization: Concise (3-5 Bullet Points)</option>
          <option value="detailed">Summarization: Detailed (Full Paragraphs)</option>
        </select>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Globe size={24} />
          <h3>Regional Constraints</h3>
        </div>
        <p className="setting-desc">Universal tone applied to narrative outputs.</p>
        <select
          className="setting-select mt-4"
          value={region}
          onChange={e => setRegion(e.target.value)}
        >
          <option value="en-us">English: US (Standard)</option>
          <option value="en-uk">English: UK (Oxford Style)</option>
          <option value="global">Global (Neutral Tone)</option>
        </select>
        <div className="flex flex-wrap gap-2 mt-4">
           {['Marketing', 'Academic', 'Casual', 'Hard Technical'].map(t => (
             <button
               key={t}
               className={`seg-btn mt-2 ${tone === t ? 'active' : ''}`}
               onClick={() => setTone(t)}
             >
               {t}
             </button>
           ))}
        </div>
      </section>
    </div>
  )
}

export default TextSettings
