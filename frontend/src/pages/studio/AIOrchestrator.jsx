import React, { useState, useEffect } from 'react'
import { Sparkles, Play, CheckCircle2, AlertCircle, Loader2, Music, Clapperboard, BrainCircuit, ExternalLink, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import '../../styles/pages/AIOrchestrator.css'

const AIOrchestrator = () => {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobs, setJobs] = useState([])
  const [activeJob, setActiveJob] = useState(null)

  // Polling for active jobs
  useEffect(() => {
    let interval
    const activeJobs = jobs.filter(job => job.status !== 'completed' && job.status !== 'failed')
    
    if (activeJobs.length > 0) {
      interval = setInterval(async () => {
        try {
          const updatedJobs = await Promise.all(jobs.map(async (job) => {
            if (job.status === 'completed' || job.status === 'failed') return job
            return await api.workflow.getStatus(job.id)
          }))
          setJobs(updatedJobs)
        } catch (err) {
          console.error("Polling error", err)
        }
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [jobs])

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const data = await api.workflow.generate(prompt)
      
      if (data.error) {
        console.error("Workflow error:", data.error)
        return
      }

      const newJob = {
        id: data.job_id,
        prompt,
        status: data.status || 'pending',
        progress: 0,
        result: {},
        created_at: new Date().toISOString()
      }
      
      setJobs(prev => [newJob, ...prev])
      setPrompt('')
    } catch (err) {
      console.error("Failed to start generation", err)
    } finally {
      setIsGenerating(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-emerald-400" />
      case 'failed': return <AlertCircle className="text-rose-400" />
      default: return <Loader2 className="animate-spin text-indigo-400" />
    }
  }

  return (
    <div className="ai-orchestrator-page">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="page-header mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/20">
                <BrainCircuit className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white leading-tight tracking-tight">AI Orchestrator</h1>
                <p className="text-slate-400 font-medium text-lg">Harness multiple AI models in a single unified workflow.</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Left: Prompt Input */}
          <div className="lg:col-span-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card prompt-section p-10 overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Sparkles size={160} />
              </div>
              
              <form onSubmit={handleGenerate} className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-white font-bold text-xl block">What are we creating?</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      System Online
                    </span>
                  </div>
                </div>

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your vision... e.g. 'A professional AI avatar presenting a quarterly report in a modern office with cinematic lighting and a crisp, corporate voice.'"
                  className="w-full bg-slate-950/40 border border-slate-800/80 rounded-3xl p-8 text-white text-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:outline-none placeholder-slate-600 transition-all min-h-[160px] shadow-inner"
                />
                
                <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/40 hover:bg-slate-800/60 px-5 py-2.5 rounded-2xl border border-slate-700/30 transition-colors">
                      <Music size={18} className="text-indigo-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Audio Engine</span>
                        <span className="font-semibold">ElevenLabs v2</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/40 hover:bg-slate-800/60 px-5 py-2.5 rounded-2xl border border-slate-700/30 transition-colors">
                      <Clapperboard size={18} className="text-purple-400" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Visual Engine</span>
                        <span className="font-semibold">HeyGen Avatar</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isGenerating || !prompt.trim()}
                    className={`group/btn flex items-center gap-4 px-10 py-5 rounded-2xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl relative overflow-hidden ${
                      isGenerating ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-white text-slate-900 shadow-indigo-500/20'
                    }`}
                  >
                    {!isGenerating && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover/btn:opacity-10 transition-opacity" />
                    )}
                    {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Play size={24} fill="currentColor" />}
                    {isGenerating ? 'Synthesizing...' : 'Ignite Workflow'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Bottom: Recent Jobs Dashboard */}
          <div className="lg:col-span-12 mt-4">
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">Generation Hub</h2>
                <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-3 py-1 rounded-lg border border-indigo-500/20">
                  {jobs.length} ACTIVE
                </span>
              </div>
              <button 
                onClick={() => setJobs([])}
                className="text-slate-500 hover:text-white text-sm font-medium transition-colors"
              >
                Clear History
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
              <AnimatePresence mode="popLayout">
                {jobs.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-28 text-center glass-card border-dashed border-slate-800/50 flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-slate-900/50 rounded-3xl flex items-center justify-center mb-6 border border-slate-800">
                      <BrainCircuit className="text-slate-700" size={40} />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">No active workflows</h3>
                    <p className="text-slate-500 text-lg max-w-sm mx-auto">Enter a prompt above to witness the power of unified AI generation.</p>
                  </motion.div>
                )}
                
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="premium-card p-8 flex flex-col gap-6 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 px-4 py-2 bg-slate-800/50 border-bl border-slate-700/50 rounded-bl-xl text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                      ID-{job.id.slice(0, 8)}
                    </div>

                    <div className="flex justify-between items-start pt-2">
                       <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors ${
                          job.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 
                          job.status === 'failed' ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/20 text-indigo-400'
                        }`}>
                          {getStatusIcon(job.status)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-lg capitalize">{job.status.replace('_', ' ')}</span>
                          <span className="text-slate-500 text-xs font-medium">Started {new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                       </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 bg-slate-950/30 p-4 rounded-xl border border-slate-800/50 italic">
                      "{job.prompt}"
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Workflow Progress</span>
                        <span className={`text-sm font-black ${job.status === 'completed' ? 'text-emerald-400' : 'text-indigo-400'}`}>
                          {job.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50 p-[2px]">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                          className={`h-full rounded-full ${
                            job.status === 'failed' ? 'bg-rose-500' : 
                            job.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          } shadow-[0_0_10px_rgba(99,102,241,0.3)] transition-all duration-1000`}
                        />
                      </div>
                    </div>

                    {job.status === 'completed' && job.result?.video_url && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 mt-2"
                      >
                        <a 
                          href={job.result.video_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex-1 flex items-center justify-center gap-3 py-3.5 bg-white text-slate-900 hover:bg-indigo-50 text-sm font-black rounded-xl transition-all shadow-xl shadow-indigo-500/5"
                        >
                          <Play size={18} fill="currentColor" /> Watch Result
                        </a>
                        <button className="w-14 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700/50">
                          <Download size={20} />
                        </button>
                      </motion.div>
                    )}

                    {job.status === 'failed' && (
                      <div className="mt-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                        <p className="text-rose-400 text-xs font-medium text-center">Generation failed. Please try a different prompt.</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIOrchestrator
