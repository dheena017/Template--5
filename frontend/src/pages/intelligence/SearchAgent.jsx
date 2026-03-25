import React, { useState } from 'react'
import { Globe, Search, Command, ArrowUpRight, Zap, BookOpen, Layers, Bot, Sparkles, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/intelligence/SearchAgent.css'

const SearchAgent = () => {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState(null)

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    if (!query.trim()) return
    setIsSearching(true)
    // Simulate multi-step agent research
    setTimeout(() => {
      setResults({
        summary: "Based on real-time neural indexing of 14 high-authority sources, I've synthesized a comprehensive overview of your request.",
        clusters: [
          { title: "Market Trends", items: ["Increasing adoption of multimodal LLM interfaces", "Neural hardware acceleration at the edge", "Open source supremacy in small-scale models"] },
          { title: "Key Players", items: ["OpenAI (Sora/GPT-4o)", "Anthropic (Claude 3.5 Sonnet)", "Google (Gemini 1.5 Pro)"] },
          { title: "Emerging Risks", items: ["Data privacy in localized deployments", "Hallucination rates in RAG-based systems"] }
        ],
        citations: ["Wikipedia", "TechCrunch", "ArXiv Research", "Reuters"]
      })
      setIsSearching(false)
    }, 2800)
  }

  return (
    <div className="search-agent-container">
      <div className="agent-hero">
        <div className="agent-badge">
          <Zap size={14} fill="currentColor" /> Web Search Agent v2.4
        </div>
        <h1>Intelligence Research Hub</h1>
        <p>AI-driven autonomous research that scans, synthesizes, and clusters the world's real-time data.</p>
      </div>

      <div className={`search-interface-wrapper ${results ? 'results-active' : ''}`}>
        <form className="agent-search-box glass-card" onSubmit={handleSearch}>
          <Search className="search-icon" size={24} />
          <input 
            placeholder="Search anything with autonomous deep-dive..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="agent-send-btn" disabled={!query || isSearching}>
            {isSearching ? <div className="spinning-loader" /> : <Send size={20} />}
          </button>
        </form>

        <div className="agent-quick-prompts">
          <button onClick={() => setQuery('Latest trends in AI video generation')}>Trends in AI Video</button>
          <button onClick={() => setQuery('Compare Claude 3.5 vs Gemini 1.5 Pro')}>Claude vs Gemini</button>
          <button onClick={() => setQuery('How to build autonomous AI agents')}>AI Agents Tutorial</button>
        </div>
      </div>

      <AnimatePresence>
        {isSearching && (
          <motion.div 
            className="agent-scanning-status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="status-item"><Globe size={16} className="pulse" /> Indexing global neural networks...</div>
            <div className="status-timeline">
              <div className="line" />
            </div>
            <div className="status-sub">Synthesizing insights from reliable citations</div>
          </motion.div>
        )}

        {results && !isSearching && (
          <motion.div 
            className="agent-result-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="result-main-card glass-card">
              <div className="result-header">
                <Sparkles size={20} color="var(--primary)" fill="rgba(var(--primary-rgb), 0.1)" />
                <h2>Research Synthesis</h2>
                <div className="meta-tag">Verified Sources: 14</div>
              </div>
              <p className="summary-text">{results.summary}</p>

              <div className="insight-grid">
                {results.clusters.map((cluster, i) => (
                  <div key={i} className="insight-cluster">
                    <div className="cluster-header"><Layers size={14} /> {cluster.title}</div>
                    <ul>
                      {cluster.items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="citation-footer">
                <span className="cit-label"><BookOpen size={14} /> Sources:</span>
                <div className="cit-list">
                  {results.citations.map(c => <span key={c} className="cit-tag">{c}</span>)}
                </div>
              </div>
            </div>

            <div className="agent-follow-up">
              <button className="follow-btn">Deep Dive into Market Trends <ArrowUpRight size={14} /></button>
              <button className="follow-btn">Generate Report PDF <ArrowUpRight size={14} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!results && !isSearching && (
        <div className="agent-features-grid">
          <div className="feature-card glass-card">
            <Bot size={24} />
            <h3>Autonomous Agents</h3>
            <p>Delegates research to specialized bot clusters for 10x speed.</p>
          </div>
          <div className="feature-card glass-card">
            <Command size={24} />
            <h3>Direct Integration</h3>
            <p>Export results directly to your workflow flows or studio.</p>
          </div>
          <div className="feature-card glass-card">
            <Globe size={24} />
            <h3>Real-time Data</h3>
            <p>Indexes the web in milliseconds for the most current data.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchAgent
