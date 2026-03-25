import React from 'react'
import { Link } from 'react-router-dom'
import { Clapperboard, Sparkles, Layers, Film, ArrowRight } from 'lucide-react'
import '../../styles/pages/studio/ArtistsHome.css'

const cards = [
  {
    title: 'UGC Ads Studio',
    desc: 'Create short-form creator-style ad variations in minutes.',
    tag: 'Top Use Case',
    path: '#'
  },
  {
    title: 'Instant Highlights',
    desc: 'Auto-cut long recordings into clip-ready social highlights.',
    tag: 'Automation',
    path: '#'
  },
  {
    title: 'Face Swap AI',
    desc: 'Realistic face replacement for photos and cinematic scenes.',
    tag: 'New Tool',
    path: '/artists/face-swap'
  }
]

const ArtistsHome = () => {
  return (
    <div className="artists-home-page">
      <header className="artists-hero premium-card">
        <div className="hero-copy">
          <h1><Clapperboard size={28} /> Artists Home</h1>
          <p>Build high-impact content pipelines for creators, campaigns, and studios from one creative control panel.</p>
        </div>
        <button className="artists-cta-btn">Start New Campaign <ArrowRight size={16} /></button>
      </header>

      <section className="artists-grid">
        {cards.map((card) => (
          <Link key={card.title} to={card.path} className="artists-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
            <article className="artists-card premium-card">
              <span className="card-tag"><Sparkles size={13} /> {card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6366f1', fontSize: '0.9rem', fontWeight: 600 }}>
                Try Tool <ArrowRight size={14} />
              </div>
            </article>
          </Link>
        ))}
      </section>

      <section className="artists-strip premium-card">
        <div className="strip-item"><Layers size={18} /> Batch mode for multi-variant publishing</div>
        <div className="strip-item"><Film size={18} /> Product placement and B-roll generation</div>
      </section>
    </div>
  )
}

export default ArtistsHome




