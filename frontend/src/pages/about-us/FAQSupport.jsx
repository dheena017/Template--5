import React, { useState } from 'react'
import { 
  CircleHelp, Search, ChevronDown, 
  Book, MessageSquare, Mail, 
  LifeBuoy, Zap, Shield, 
  ExternalLink, ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from '../../components/common/SearchBar/SearchBar'
import '../../styles/pages/about-us/FAQSupport.css'


const FAQSupport = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState([0])

  const categories = [
    { id: 'all', name: 'All Topics', icon: <CircleHelp size={18} /> },
    { id: 'getting-started', name: 'Getting Started', icon: <Zap size={18} /> },
    { id: 'billing', name: 'Billing & Plans', icon: <Shield size={18} /> },
    { id: 'features', name: 'AI Features', icon: <LifeBuoy size={18} /> },
    { id: 'integrations', name: 'Integrations', icon: <ExternalLink size={18} /> }
  ]

  const faqs = [
    {
      id: 0,
      category: 'getting-started',
      question: "How do I create my first video with TextAI?",
      answer: "Creating your first video is simple! Just click on 'Studio' in the sidebar, enter your script or select a topic, choose your preferred AI voice and visuals, and hit generate. Our engine will then orchestrate the entire production for you."
    },
    {
      id: 1,
      category: 'billing',
      question: "What happens if I run out of credits?",
      answer: "If you run out of credits, you can upgrade your plan or purchase top-up credits from the Billing section. Your work is always saved, and you can resume generation as soon as you have more credits."
    },
    {
      id: 2,
      category: 'features',
      question: "Can I use the generated content for commercial purposes?",
      answer: "Yes! All content generated on our Standard and Pro plans includes full commercial usage rights. Free plan users are restricted to personal or trial usage with a watermark."
    },
    {
      id: 3,
      category: 'integrations',
      question: "Does TextAI support API integrations?",
      answer: "Absolutely. We offer a robust REST API for developers. You can manage your projects, generate images/videos, and now use our dedicated Assets API to manage files programmatically. Find your API keys in the Developer Console and detailed documentation in our API reference page."
    },
    {
      id: 4,
      category: 'getting-started',
      question: "How do I manage my uploaded assets and generated files?",
      answer: "All your media is centralized in the 'Asset Library' (Files). You can upload local files, view AI-generated content, organized by type, and delete content to save space. Developers can also use the /api/assets endpoint for these operations."
    },
    {
      id: 5,
      category: 'getting-started',
      question: "What languages are supported?",
      answer: "TextAI currently supports over 75 languages and 450+ high-quality AI voices. We are constantly adding new locales and dialect variations to ensure global reach."
    }
  ]

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="faq-container">
      <div className="faq-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <h1>How can we help?</h1>
          <p>Find answers to common questions or reach out to our dedicated support team.</p>
          
          <SearchBar 
            placeholder="Search for questions, features, or troubleshooting..."
            onSearch={(val) => setSearchQuery(val)}
            className="faq-search-premium"
          />

        </motion.div>
      </div>

      <div className="faq-layout">
        <aside className="faq-sidebar">
          <div className="category-list">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
                {activeCategory === cat.id && <motion.div layoutId="cat-active" className="cat-active-pill" />}
              </button>
            ))}
          </div>

          <div className="support-card glass-card">
            <div className="card-top">
              <LifeBuoy size={24} className="icon-blue" />
              <h3>Direct Support</h3>
            </div>
            <p>Can't find what you're looking for?</p>
            <div className="support-actions">
              <button className="support-btn primary"><Mail size={16} /> Contact Email</button>
              <button className="support-btn secondary"><MessageSquare size={16} /> Live Chat</button>
            </div>
          </div>
        </aside>

        <main className="faq-main">
          <div className="faq-list">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className={`faq-item ${openItems.includes(faq.id) ? 'open' : ''}`}
                  >
                    <button className="faq-question" onClick={() => toggleItem(faq.id)}>
                      <span>{faq.question}</span>
                      <ChevronDown size={20} className="chevron" />
                    </button>
                    <AnimatePresence>
                      {openItems.includes(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="faq-answer-wrapper"
                        >
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <div className="no-results">
                  <div className="empty-icon"><Search size={48} /></div>
                  <h3>No results found</h3>
                  <p>Try searching with different keywords or browse all categories.</p>
                  <button className="reset-btn" onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
                    Clear search & categories
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="additional-resources">
             <div className="resource-item glass-card">
                <Book size={24} className="icon-purple" />
                <div className="res-content">
                  <h4>Developer Docs</h4>
                  <p>In-depth guides and API reference for developers.</p>
                  <button className="text-link">Read Documentation <ArrowRight size={14} /></button>
                </div>
             </div>
             <div className="resource-item glass-card">
                <Shield size={24} className="icon-amber" />
                <div className="res-content">
                  <h4>Security & Privacy</h4>
                  <p>Learn how we protect your data and privacy.</p>
                  <button className="text-link">View Security <ArrowRight size={14} /></button>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FAQSupport



