import React, { useState } from 'react'
import { Video, Mic2, Palette, Sparkles, ChevronRight } from 'lucide-react'
import '../../styles/pages/studio/Playground.css'

const workflows = [
  {
    title: 'Script to video',
    description: 'Transform your scripts into engaging videos.'
  },
  {
    title: 'Blog to video',
    description: 'Convert articles, blog posts into polished videos easily.'
  },
  {
    title: 'PPT to video',
    description: 'Transform your presentations into stunning videos.'
  },
  {
    title: 'Auto edit video',
    description: 'Add subtitles and B-rolls to your existing video recordings.'
  },
  {
    title: 'Raw recording to polished video',
    description: 'Turn recordings into polished videos with subtitles.'
  },
  {
    title: 'Empty',
    description: 'Start creating video from a blank file.'
  }
]

const Playground = () => {
  const [activeMode, setActiveMode] = useState('Voiceover')

  return (
    <div className="playground-page">
      <header className="playground-hero premium-card">
        <div className="playground-title-wrap">
          <h1><Video size={28} /> Automation Video</h1>
          <p>Build production-ready content flows for fast video creation and post-production.</p>
        </div>
        <div className="mode-switch" role="tablist" aria-label="Video mode">
          <button
            className={activeMode === 'Voiceover' ? 'active' : ''}
            onClick={() => setActiveMode('Voiceover')}
          >
            <Mic2 size={16} /> Voiceover
          </button>
          <button
            className={activeMode === 'Design' ? 'active' : ''}
            onClick={() => setActiveMode('Design')}
          >
            <Palette size={16} /> Design
          </button>
        </div>
      </header>

      <section className="workflows-block">
        <div className="workflows-header">
          <h2>Other video workflows</h2>
          <span><Sparkles size={14} /> Ready to launch</span>
        </div>

        <div className="workflow-grid">
          {workflows.map((item) => (
            <article key={item.title} className="workflow-card premium-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className="workflow-open-btn">
                Open <ChevronRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Playground





