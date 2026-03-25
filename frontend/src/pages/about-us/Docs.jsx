import React, { useState } from 'react'
import { 
  BookOpen, Search, ChevronRight, Menu, 
  Terminal, Globe, Sparkles, Wand2,
  FileText, Copy, Check, ExternalLink,
  ChevronDown, HelpCircle, LayoutGrid,
  Shield, CreditCard, Key, Activity,
  Play, Code2, Layers
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/about-us/Docs.css'

const Docs = () => {
  const [activeTab, setActiveTab] = useState('Introduction')
  const [expanded, setExpanded] = useState(['Getting Started', 'API Reference'])
  const [copied, setCopied] = useState(false)

  const toggleExpand = (cat) => {
    setExpanded(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sections = [
    { 
      title: 'Getting Started', 
      items: ['Introduction', 'Authentication', 'System Status'] 
    },
    { 
      title: 'Video & Media', 
      items: ['Video Creator (UGC)', 'Content Highlights', 'Podcast Creator', 'Dubbing & FaceSwap'] 
    },
    { 
      title: 'Graphics & Assets', 
      items: ['Image Generation', 'Asset Management', 'Project Library'] 
    },
    { 
      title: 'PDF Tools', 
      items: ['Merge PDF', 'Split PDF', 'Compress PDF', 'Convert PDF', 'All PDF tools'] 
    },
    { 
      title: 'Developers', 
      items: ['sk_live_ API Keys', 'Usage Reporting', 'Webhooks'] 
    },
    { 
      title: 'Account', 
      items: ['Billing & Credits', 'Subscription Tiers'] 
    }
  ]

  const contentMap = {
    'Introduction': {
      title: 'Welcome to Text AI',
      lead: 'The unified programmatic platform for high-fidelity media synthesis.',
      body: 'Text AI provides a industrial-grade API for automated video creation, image synthesis, and AI-driven dubbing. Our modular architecture allows for massive scaling of content production via a single integration point.',
      code: `import textai\n\nclient = textai.Client(api_key="sk_live_xxxx")\n# Start creating viral content!`,
      lang: 'python'
    },
    'Authentication': {
      title: 'Authentication',
      lead: 'Secure your requests using standard Bearer tokens or Secret Keys.',
      body: 'All API requests must include an Authorization header. Use your personal JWT token for local testing or a Secret Key (sk_live_...) for production server-side integrations.',
      code: `curl -H "Authorization: Bearer sk_live_your_key" \\\n     https://api.textai.com/api/status`,
      lang: 'bash'
    },
    'System Status': {
      title: 'System status',
      lead: 'Monitor the health and version of the Text AI platform.',
      body: 'Retrieve the current operational status and versioning information of the unified API server.',
      code: `GET /api/status\n{\n  "status": "online",\n  "version": "4.0.0-Modular"\n}`,
      lang: 'json'
    },
    'Video Creator (UGC)': {
      title: 'Video Creator (UGC)',
      lead: 'Generate high-converting UGC style video ads at scale.',
      body: 'Use our UGC engine to combine product imagery and high-quality AI scripts into ready-to-post video assets. Cost: 50 credits per generation.',
      code: `POST /api/video/ugc\n{\n  "product_image_url": "https://example.com/item.png",\n  "script": "A cinematic script for your product..."\n}`,
      lang: 'json'
    },
    'Content Highlights': {
      title: 'Content Highlights',
      lead: 'Automatically trim long videos into viral social clips.',
      body: 'Our vision models identify high-engagement moments in long-form videos to extract the best snippets for social media. Cost: 100 credits.',
      code: `POST /api/video/highlights\n{\n  "video_url": "https://youtube.com/watch?v=...",\n  "max_clips": 5\n}`,
      lang: 'json'
    },
    'Podcast Creator': {
      title: 'Podcast Creator',
      lead: 'Transform podcast scripts into visual host-led videos.',
      body: 'Convert any text script into a full video with an AI host, high-quality audio, and optional B-roll. Cost: 150 credits.',
      code: `POST /api/video/podcast\n{\n  "script": "Welcome to our futuristic podcast...",\n  "avatar": "ai_host_01",\n  "use_broll": true\n}`,
      lang: 'json'
    },
    'Dubbing & FaceSwap': {
      title: 'Dubbing & FaceSwap',
      lead: 'Advanced video manipulation and voice translation.',
      body: 'Translate videos into target languages while preserving original voices, or swap faces seamlessly between characters. Costs: 80-120 credits.',
      code: `POST /api/video/faceswap\n{\n  "source_url": "target_video.mp4",\n  "target_url": "source_face.png"\n}`,
      lang: 'json'
    },
    'Image Generation': {
      title: 'Image Generation',
      lead: 'State-of-the-art AI imagery for your projects.',
      body: 'Generate ultra-high-resolution images using our integrated Flux models. Supports 1:1, 16:9, and mobile-first orientations. Cost: 10 credits.',
      code: `POST /api/image/generate\n{\n  "prompt": "A futuristic city at sunrise...",\n  "model": "Flux 2",\n  "orientation": "Portrait"\n}`,
      lang: 'json'
    },
    'Asset Management': {
      title: 'Asset Management (Files API)',
      lead: 'Centralized media storage for your AI workflow.',
      body: 'The Assets API allows you to upload local media, list all generated/uploaded files, and delete unwanted content. Files are automatically processed and ready for use in any video or image generation job.',
      code: `POST /api/assets/upload\n# Form-Data: file=@your_image.jpg\n\nGET /api/assets/\n# Returns a list of all assets with CDN URLs`,
      lang: 'bash'
    },
    'Project Library': {
      title: 'Project Library',
      lead: 'Organize your generative tasks into workspace projects.',
      body: 'Manage your high-level project containers to track the status of multiple concurrent AI generation jobs. Projects help group related assets and billing statements.',
      code: `GET /api/projects/\n# Returns list of active projects and their progress`,
      lang: 'json'
    },
    'Merge PDF': {
      title: 'Merge PDF',
      lead: 'Combine multiple PDF files into a single document.',
      body: 'Upload multiple PDF files and merge them together in your specified order. Perfect for consolidating reports or combining scanned documents. Cost: 5 credits per merge.',
      code: `POST /api/pdf/merge\n{\n  "files": ["file_id_1", "file_id_2"],\n  "output_name": "merged_report.pdf"\n}`,
      lang: 'json'
    },
    'Split PDF': {
      title: 'Split PDF',
      lead: 'Separate a single PDF into multiple documents.',
      body: 'Extract specific page ranges or split a large PDF into individual pages. Useful for isolating important sections of a document. Cost: 5 credits per split.',
      code: `POST /api/pdf/split\n{\n  "file_id": "file_id_1",\n  "ranges": "1-5, 8-10"\n}`,
      lang: 'json'
    },
    'Compress PDF': {
      title: 'Compress PDF',
      lead: 'Reduce the file size of your PDF documents.',
      body: 'Optimize PDF files for web use or email attachment without significant loss in visual quality. Choose between extreme, recommended, or less compression. Cost: 5 credits.',
      code: `POST /api/pdf/compress\n{\n  "file_id": "file_id_1",\n  "level": "recommended"\n}`,
      lang: 'json'
    },
    'Convert PDF': {
      title: 'Convert PDF',
      lead: 'Transform PDFs to other formats or vice versa.',
      body: 'Convert PDF documents to formats like Word, Excel, PowerPoint, or JPG. You can also convert other files into PDF format. Cost: 10 credits per conversion.',
      code: `POST /api/pdf/convert\n{\n  "file_id": "file_id_1",\n  "target_format": "docx"\n}`,
      lang: 'json'
    },
    'All PDF tools': {
      title: 'All PDF Tools API',
      lead: 'Comprehensive suite for document manipulation.',
      body: 'Our PDF toolkit includes merging, splitting, compression, conversion, unlocking, rotating, and more. Manage all your document workflows through a single unified API endpoint.',
      code: `GET /api/pdf/tools\n# Returns a list of all available PDF operations and their required parameters`,
      lang: 'bash'
    },
    'sk_live_ API Keys': {
      title: 'Managing API Keys',
      lead: 'Programmatic access for your enterprise-scale applications.',
      body: 'Manage your sk_live_ secret keys for direct integration. We recommend environment-specific keys (dev, prod) for better security and analytics.',
      code: `POST /api/apikeys/generate\n{\n  "name": "Production Key"\n}\n# Returns your sk_live_... value`,
      lang: 'json'
    },
    'Usage Reporting': {
      title: 'Usage Reporting',
      lead: 'Deep analytics for your AI generation workflow.',
      body: 'Retrieve detailed reports for specific jobs, including pronunciation metrics for audio or processing stats for batch video jobs.',
      code: `GET /api/reports/batch/job_id_123\n{\n  "files_processed": 10,\n  "errors": 0,\n  "duration": "12m 4s"\n}`,
      lang: 'json'
    },
    'Webhooks': {
      title: 'Real-time Webhooks',
      lead: 'Event-driven architecture for your application. (Beta)',
      body: 'Subscribe to event types (job.completed, job.failed, credits.low) to receive POST requests as soon as your background tasks finish processing.',
      code: `POST /api/webhooks/subscribe\n{\n  "url": "https://your-app.com/webhook",\n  "events": ["job.*"]\n}`,
      lang: 'json'
    },
    'Billing & Credits': {
      title: 'Billing & Credits',
      lead: 'Flexible pay-as-you-go credit management.',
      body: 'Monitor your credit balance and view detailed transaction history for every AI generation job across the platform.',
      code: `GET /api/billing/balance\n# Returns credits, tier, and full usage log`,
      lang: 'json'
    },
    'Subscription Tiers': {
      title: 'Subscription Tiers',
      lead: 'Choose the right plan for your generation needs.',
      body: 'Text AI offers several tiers: Free (5k credits), Standard (20k credits), Pro (100k+), and Enterprise custom plans with higher rate limits.',
      code: `POST /api/billing/upgrade\n{\n  "tier": "Pro"\n}`,
      lang: 'json'
    }
  }

  const activeContent = contentMap[activeTab] || contentMap['Introduction']

  return (
    <div className="docs-container">
      <header className="docs-search-header">
        <div className="search-bar premium-card">
          <Search size={24} />
          <input type="text" placeholder="Search documentation (e.g. 'Billing', 'Voice cloning')..." />
        </div>
      </header>

      <div className="docs-layout">
        <aside className="docs-nav">
          {sections.map(sec => (
            <div key={sec.title} className="nav-group">
              <button className="group-title" onClick={() => toggleExpand(sec.title)}>
                <div className="title-left">
                  {sec.title === 'Getting Started' && <Play size={16} />}
                  {sec.title === 'API Reference' && <Code2 size={16} />}
                  {sec.title === 'Developers' && <Terminal size={16} />}
                  {sec.title === 'Account' && <CreditCard size={16} />}
                  {sec.title === 'PDF Tools' && <FileText size={16} />}
                  <span>{sec.title}</span>
                </div>
                <ChevronDown size={14} className={`arrow ${expanded.includes(sec.title) ? 'rot' : ''}`} />
              </button>
              <AnimatePresence>
                {expanded.includes(sec.title) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="group-items"
                  >
                    {sec.items.map(item => (
                      <button 
                        key={item} 
                        className={`nav-item ${activeTab === item ? 'active' : ''}`}
                        onClick={() => setActiveTab(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </aside>

        <main className="docs-content premium-card">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="breadcrumb">Docs <ChevronRight size={12} /> {activeTab}</div>
              <h1>{activeContent.title}</h1>
              <p className="lead">{activeContent.lead}</p>
              
              <section className="docs-section">
                <h3>Context</h3>
                <p>{activeContent.body}</p>
              </section>

              <section className="docs-section code-block-wrapper">
                <div className="code-header">
                  <span><Terminal size={14} /> {activeContent.lang}</span>
                  <button className="copy-btn" onClick={() => handleCopy(activeContent.code)}>
                    {copied ? <Check size={14} color="#2ed573" /> : <Copy size={14} />} 
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="code-block">
                  <code>{activeContent.code}</code>
                </pre>
              </section>

              <div className="pagination-row">
                 <div className="p-badge"><Sparkles size={14} /> Pro Feature</div>
                 <div className="p-badge"><Shield size={14} /> SOC2 Secure</div>
              </div>
            </motion.article>
          </AnimatePresence>
        </main>

        <aside className="docs-toc side-col">
          <label>In this section</label>
          <div className="toc-links">
             <a href="#" className="active">Overview</a>
             <a href="#">Practical Usage</a>
             <a href="#">JSON Schema</a>
             <a href="#">Live Examples</a>
          </div>
          <div className="help-box premium-card">
             <HelpCircle size={24} className="icon-burn" />
             <span>Dev Support</span>
             <p>Our engineers are online to help with integration.</p>
             <button className="ask-btn"><Layers size={16} /> Open Discord</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Docs




