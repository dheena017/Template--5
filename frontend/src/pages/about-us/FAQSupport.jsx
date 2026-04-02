import React, { useState, useEffect } from 'react'
import { 
  CircleHelp, Search, ChevronDown, 
  Book, MessageSquare, Mail, 
  LifeBuoy, Zap, Shield, 
  ExternalLink, ArrowRight, Star, ThumbsUp,
  Code, Lightbulb, AlertCircle, CheckCircle,
  Eye, Clock, Flame, Video, FileText,
  MessageCircle, Download, Printer, Share2, Bell, Globe,
  TrendingUp, User, Briefcase, GraduationCap, Send,
  Heart, MessageSquareText, BarChart3, Link2, X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBar from '../../components/common/SearchBar/SearchBar'
import { api } from '../../services'
import '../../styles/pages/about-us/FAQSupport.css'

const getFaqUserId = () => {
  if (typeof window === 'undefined') return 'faq-support-local'
  const storageKey = 'faq_support_user_id'
  let userId = window.localStorage.getItem(storageKey)
  if (!userId) {
    userId = `faq_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    window.localStorage.setItem(storageKey, userId)
  }
  return userId
}

const normalizeFaq = (faq) => ({
  ...faq,
  id: faq.id,
  category: faq.category?.name ? faq.category.name.toLowerCase().replace(/\s+/g, '-') : faq.category_name || faq.category || 'all',
  roles: faq.roles || ['all'],
  tags: faq.tags || [],
  relatedFAQs: faq.relatedFAQs || faq.related_faq_ids || [],
  article: faq.article || faq.article_link || '',
  updatedAt: faq.updatedAt || faq.updated_at || '',
  comments: faq.comments ?? faq.comments_count ?? 0,
  multimedia: faq.multimedia || null,
  difficulty: faq.difficulty || 'easy',
  popular: Boolean(faq.popular),
  views: faq.views ?? 0,
})

const FAQSupport = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState([0])
  const [favorites, setFavorites] = useState(new Set())
  const [helpfulVotes, setHelpfulVotes] = useState({})
  const [userRole, setUserRole] = useState('all')
  const [language, setLanguage] = useState('en')
  const [subscribedCategories, setSubscribedCategories] = useState(new Set())
  const [searchHistory, setSearchHistory] = useState([])
  const [trendingSearches, setTrendingSearches] = useState(['API integration', 'credit limits', 'video quality', 'batch processing'])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [selectedFAQToExport, setSelectedFAQToExport] = useState(null)
  const [showChatWidget,setShowChatWidget] = useState(false)
  const [selectedMultimedia, setSelectedMultimedia] = useState(null)
  const [newComment, setNewComment] = useState({})
  const [communityComments, setCommunityComments] = useState({ 0: [{author: 'John Doe', text: 'Very helpful!', votes: 2, timestamp: '2h ago'}], 8: [{author: 'Jane Smith', text: 'Great tips', votes: 5, timestamp: '1d ago'}] })
  const [faqs, setFaqs] = useState([
    { id: 0, category: 'getting-started', question: "How do I create my first video with TextAI?", answer: "Creating your first video is simple! Just click on 'Studio' in the sidebar, enter your script or select a topic, choose your preferred AI voice and visuals, and hit generate. Our engine will then orchestrate the entire production for you.", views: 2341, popular: true, tips: "Pro tip: Use descriptive keywords for better results", difficulty: 'easy', roles: ['all', 'beginner'], relatedFAQs: [4, 5], multimedia: { video: 'https://example.com/tutorial.mp4', images: ['https://images.unsplash.com/photo-1551507002-efc9a500e5d5?auto=format&fit=crop&w=300'] }, article: 'getting-started/first-video', updatedAt: '2024-10-15', comments: 3 },
    { id: 1, category: 'billing', question: "What happens if I run out of credits?", answer: "If you run out of credits, you can upgrade your plan or purchase top-up credits from the Billing section. Your work is always saved, and you can resume generation as soon as you have more credits.", views: 1847, popular: false, difficulty: 'easy', roles: ['all'], relatedFAQs: [9], updatedAt: '2024-09-20', comments: 1 },
    { id: 2, category: 'features', question: "Can I use the generated content for commercial purposes?", answer: "Yes! All content generated on our Standard and Pro plans includes full commercial usage rights. Free plan users are restricted to personal or trial usage with a watermark.", views: 3102, popular: true, tags: ['Commercial', 'Licensing'], difficulty: 'easy', roles: ['all'], relatedFAQs: [1, 9], article: 'features/commercial-usage', updatedAt: '2024-10-10', comments: 5 },
    { id: 3, category: 'integrations', question: "Does TextAI support API integrations?", answer: "Absolutely. We offer a robust REST API for developers. You can manage your projects, generate images/videos, and now use our dedicated Assets API to manage files programmatically. Find your API keys in the Developer Console and detailed documentation in our API reference page.", views: 987, popular: false, difficulty: 'hard', roles: ['developer', 'enterprise'], relatedFAQs: [10, 11], multimedia: { video: 'https://example.com/api.mp4' }, article: 'api/getting-started', updatedAt: '2024-10-05', comments: 2 },
    { id: 4, category: 'getting-started', question: "How do I manage my uploaded assets and generated files?", answer: "All your media is centralized in the 'Asset Library' (Files). You can upload local files, view AI-generated content, organized by type, and delete content to save space. Developers can also use the /api/assets endpoint for these operations.", views: 1654, popular: false, difficulty: 'easy', roles: ['all'], relatedFAQs: [0, 5], updatedAt: '2024-09-18', comments: 0 },
    { id: 5, category: 'getting-started', question: "What languages are supported?", answer: "TextAI currently supports over 75 languages and 450+ high-quality AI voices. We are constantly adding new locales and dialect variations to ensure global reach.", views: 2156, popular: false, difficulty: 'easy', roles: ['all', 'beginner'], updatedAt: '2024-10-12', comments: 3 },
    { id: 6, category: 'troubleshooting', question: "Why is my video generation taking so long?", answer: "Video generation time depends on multiple factors including video length, resolution, complexity of effects, and current server load. Standard videos (30-60 seconds) typically process within 2-5 minutes. You'll receive a notification when your content is ready.", views: 1423, popular: true, tags: ['Performance', 'Troubleshooting'], difficulty: 'easy', roles: ['all'], relatedFAQs: [8], article: 'troubleshooting/slow-generation', updatedAt: '2024-10-08', comments: 4 },
    { id: 7, category: 'troubleshooting', question: "I'm getting an 'Invalid API Key' error. What should I do?", answer: "1. Go to your Account Settings and regenerate your API key. 2. Copy the new key and update your application. 3. Clear your browser cache if using our web interface. 4. If the issue persists, check that your key is being passed in the Authorization header correctly.", views: 876, popular: false, tags: ['API', 'Authentication'], difficulty: 'medium', roles: ['developer', 'enterprise'], relatedFAQs: [3, 10], multimedia: { images: ['https://images.unsplash.com/photo-1633356122544-f134ef2944f1?auto=format&fit=crop&w=300'] }, article: 'api/authentication', updatedAt: '2024-10-01', comments: 2 },
    { id: 8, category: 'features', question: "Can I edit videos after they're generated?", answer: "Yes! Use our Video Editor suite to trim, add overlays, adjust colors, add subtitles, and more. You can also regenerate specific sections or run additional effects through our enhancement tools without re-generating the entire video.", views: 2234, popular: true, tips: "Use templates for faster editing workflows", difficulty: 'medium', roles: ['all'], relatedFAQs: [0], multimedia: { video: 'https://example.com/editing.mp4', images: ['https://images.unsplash.com/photo-1526739773649-5f3f97952433?auto=format&fit=crop&w=300'] }, article: 'features/video-editing', updatedAt: '2024-10-14', comments: 6 },
    { id: 9, category: 'billing', question: "What's included in each subscription plan?", answer: "Free Plan: 50 credits/month, watermarked exports, support via community forum. Starter: 500 credits, unlimited videos, email support. Pro: 5000 credits, priority processing, API access. Enterprise: Custom limits and dedicated support.", views: 1567, popular: false, tags: ['Plans', 'Pricing'], difficulty: 'easy', roles: ['all', 'enterprise'], relatedFAQs: [1], article: 'billing/plans-pricing', updatedAt: '2024-10-03', comments: 8 },
    { id: 10, category: 'api', question: "How do I authenticate API requests?", answer: "Include your API key in the request header: Authorization: Bearer YOUR_API_KEY. Never expose your API key in client-side code. If compromised, immediately regenerate it in your dashboard.", views: 654, popular: false, tags: ['API', 'Security'], difficulty: 'hard', roles: ['developer', 'enterprise'], relatedFAQs: [3, 7], multimedia: { images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300'] }, article: 'api/authentication', updatedAt: '2024-09-25', comments: 1 },
    { id: 11, category: 'features', question: "Does the platform support batch processing?", answer: "Yes! With our Batch API, you can submit multiple generation requests at once. Perfect for processing large content libraries. Results are processed in the background and delivered via webhook or polling.", views: 892, popular: false, tags: ['API', 'Advanced'], difficulty: 'hard', roles: ['developer', 'enterprise'], relatedFAQs: [3], article: 'api/batch-processing', updatedAt: '2024-10-06', comments: 0 }
  ])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  const userRoles = [
    { id: 'all', name: 'All Users', icon: <User size={16} /> },
    { id: 'beginner', name: 'Beginner', icon: <GraduationCap size={16} /> },
    { id: 'developer', name: 'Developer', icon: <Code size={16} /> },
    { id: 'enterprise', name: 'Enterprise', icon: <Briefcase size={16} /> }
  ]

  const categories = [
    { id: 'all', name: 'All Topics', icon: <CircleHelp size={18} /> },
    { id: 'getting-started', name: 'Getting Started', icon: <Zap size={18} /> },
    { id: 'billing', name: 'Billing & Plans', icon: <Shield size={18} /> },
    { id: 'features', name: 'AI Features', icon: <LifeBuoy size={18} /> },
    { id: 'integrations', name: 'Integrations', icon: <Code size={18} /> },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: <AlertCircle size={18} /> },
    { id: 'api', name: 'API & Developers', icon: <Code size={18} /> }
  ]

  useEffect(() => {
    let alive = true

    const loadFaqSupportData = async () => {
      setIsLoading(true)
      setApiError('')

      try {
        const userId = getFaqUserId()
        const [faqResult, prefResult, trendResult] = await Promise.allSettled([
          api.faq.getFaqs({ language, userRole, limit: 100 }),
          api.faq.getUserPreferences(userId),
          api.faq.getTrendingSearches(7, 4),
        ])

        if (!alive) return

        if (faqResult.status === 'fulfilled' && faqResult.value?.data?.faqs) {
          setFaqs(faqResult.value.data.faqs.map(normalizeFaq))
        }

        if (prefResult.status === 'fulfilled' && prefResult.value?.data) {
          const prefs = prefResult.value.data
          setLanguage(prefs.preferred_language || 'en')
          setFavorites(new Set(prefs.favorite_faq_ids || []))
          setSubscribedCategories(new Set(prefs.subscribed_categories || []))
          setSearchHistory(prefs.search_history || [])
        }

        if (trendResult.status === 'fulfilled' && trendResult.value?.data?.length) {
          setTrendingSearches(trendResult.value.data.map(item => item.query).slice(0, 4))
        }
      } catch (error) {
        if (alive) {
          setApiError(error.message)
        }
      } finally {
        if (alive) {
          setIsLoading(false)
        }
      }
    }

    loadFaqSupportData()

    return () => {
      alive = false
    }
  }, [])

  // Feature: Search Analytics
  const handleSearch = (value) => {
    setSearchQuery(value)
    if (value.trim()) {
      setSearchHistory(prev => [value, ...prev.filter(h => h !== value)].slice(0, 5))
      api.faq.logSearch({
        query: value,
        roleFilter: userRole,
        resultsCount: faqs.filter(faq => {
          const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
          const matchesSearch = faq.question.toLowerCase().includes(value.toLowerCase()) || faq.answer.toLowerCase().includes(value.toLowerCase())
          const matchesRole = userRole === 'all' || (faq.roles || []).includes(userRole)
          return matchesCategory && matchesSearch && matchesRole
        }).length,
        userId: getFaqUserId(),
      }).catch(() => {})
    }
  }

  // Feature: Toggle Subscribe
  const toggleSubscribe = (catId) => {
    const isSubscribed = subscribedCategories.has(catId)
    setSubscribedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(catId)) newSet.delete(catId)
      else newSet.add(catId)
      return newSet
    })

    const userId = getFaqUserId()
    const request = isSubscribed
      ? api.faq.unsubscribeCategory({ categoryId: catId, userId })
      : api.faq.subscribeCategory({ categoryId: catId, userId })
    request.catch(() => {})
  }

  // Feature: PDF Export
  const exportToPDF = async (faqId) => {
    const faq = faqs.find(f => f.id === faqId)
    if (faq) {
      try {
        const result = await api.faq.createExport({ faqId, exportType: 'pdf', userId: getFaqUserId() })
        console.log('Exporting to PDF:', faq.question, result)
        alert(`Exported "${faq.question}" to PDF`)
      } catch (error) {
        console.error('FAQ PDF export failed:', error)
        alert(`Export failed for "${faq.question}"`)
      }
    }
  }

  // Feature: Print
  const printFAQ = (faqId) => {
    const faq = faqs.find(f => f.id === faqId)
    if (faq) {
      const printWindow = window.open('', '', 'height=600,width=800')
      printWindow.document.write(`<h1>${faq.question}</h1><p>${faq.answer}</p>`)
      printWindow.print()
    }
  }

  const toggleItem = async (id) => {
    const willOpen = !openItems.includes(id)
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )

    if (willOpen && !communityComments[id]) {
      try {
        const response = await api.faq.getComments(id)
        if (response?.data) {
          setCommunityComments(prev => ({
            ...prev,
            [id]: response.data.map(comment => ({
              author: comment.author,
              text: comment.text,
              votes: comment.votes,
              timestamp: comment.timestamp,
            }))
          }))
        }
      } catch (error) {
        console.warn('Failed to load FAQ comments:', error.message)
      }
    }
  }

  const toggleFavorite = (id) => {
    const isFavorite = favorites.has(id)
    setFavorites(prev => {
      const newFavs = new Set(prev)
      if (newFavs.has(id)) newFavs.delete(id)
      else newFavs.add(id)
      return newFavs
    })

    const userId = getFaqUserId()
    const request = isFavorite
      ? api.faq.removeFavorite({ faqId: id, userId })
      : api.faq.addFavorite({ faqId: id, userId })
    request.catch(() => {})
  }

  const toggleHelpful = (id) => {
    const helpful = !helpfulVotes[id]
    setHelpfulVotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }))

    api.faq.vote({
      faqId: id,
      helpful,
      feedback: helpful ? 'Helpful' : 'Not helpful',
      userId: getFaqUserId(),
    }).catch(() => {})
  }

  const submitComment = async (faqId) => {
    const text = (newComment[faqId] || '').trim()
    if (!text) return

    try {
      const response = await api.faq.addComment({
        faqId,
        text,
        authorName: 'Community User',
        userId: getFaqUserId(),
      })

      const comment = response?.data
      if (comment) {
        setCommunityComments(prev => ({
          ...prev,
          [faqId]: [
            ...(prev[faqId] || []),
            {
              author: comment.author,
              text: comment.text,
              votes: comment.votes,
              timestamp: 'just now',
            },
          ],
        }))
      }

      setNewComment(prev => ({ ...prev, [faqId]: '' }))
    } catch (error) {
      console.error('Failed to add FAQ comment:', error)
    }
  }

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = userRole === 'all' || faq.roles.includes(userRole)
    return matchesCategory && matchesSearch && matchesRole
  }).sort((a, b) => {
    if (userRole !== 'all') {
      const aScore = a.roles.includes(userRole) ? 1 : 0
      const bScore = b.roles.includes(userRole) ? 1 : 0
      return bScore - aScore
    }
    return b.views - a.views
  })

  return (
    <div className="faq-container">
      {/* Header with Language & Notifications */}
      <div className="faq-top-controls">
        <div className="language-selector">
          <Globe size={18} />
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="lang-dropdown">
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
            ))}
          </select>
        </div>
        <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
          <Bell size={18} />
          {subscribedCategories.size > 0 && <span className="badge">{subscribedCategories.size}</span>}
        </button>
      </div>

      <div className="faq-header">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <h1>How can we help?</h1>
          <p>Find answers to common questions or reach out to our dedicated support team.</p>
          {isLoading && <div className="faq-loading-banner">Loading FAQ content from the support API...</div>}
          {apiError && <div className="faq-error-banner">Using local FAQ fallback: {apiError}</div>}
          
          <SearchBar 
            placeholder="Search for questions, features, or troubleshooting..."
            onSearch={handleSearch}
            className="faq-search-premium"
          />

          {/* Trending Searches */}
          <div className="trending-suggestions">
            <TrendingUp size={14} /> Trending: {trendingSearches.map((t, i) => (
              <button key={i} className="trend-btn" onClick={() => handleSearch(t)}>{t}</button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="faq-layout">
        <aside className="faq-sidebar">
          {/* Role Filter */}
          <div className="role-filter">
            <label className="filter-title">User Level</label>
            <div className="role-buttons">
              {userRoles.map(role => (
                <button
                  key={role.id}
                  className={`role-btn ${userRole === role.id ? 'active' : ''}`}
                  onClick={() => setUserRole(role.id)}
                  title={role.name}
                >
                  {role.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="category-list">
            {categories.map(cat => (
              <div key={cat.id} className="cat-item-wrapper">
                <button
                  className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-name">{cat.name}</span>
                  {activeCategory === cat.id && <motion.div layoutId="cat-active" className="cat-active-pill" />}
                </button>
                <button
                  className={`subscribe-btn ${subscribedCategories.has(cat.id) ? 'active' : ''}`}
                  onClick={() => toggleSubscribe(cat.id)}
                  title="Subscribe to updates"
                >
                  <Bell size={14} />
                </button>
              </div>
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
              <button className="support-btn secondary" onClick={() => setShowChatWidget(!showChatWidget)}><MessageSquare size={16} /> Live Chat</button>
              <button className="support-btn secondary"><Clock size={16} /> Schedule Call</button>
            </div>
          </div>

          <div className="featured-card glass-card">
            <div className="featured-header">
              <Flame size={20} className="text-orange-400" />
              <h3>Popular Topics</h3>
            </div>
            <div className="featured-list">
              {faqs.filter(f => f.popular).slice(0, 3).map(faq => (
                <button 
                  key={faq.id}
                  className="featured-item"
                  onClick={() => {
                    setActiveCategory(faq.category)
                    setOpenItems([faq.id])
                  }}
                >
                  <span>{faq.question}</span>
                  <Eye size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="search-history glass-card">
              <p className="history-title">Recent Searches</p>
              {searchHistory.map((query, i) => (
                <button key={i} className="history-item" onClick={() => handleSearch(query)}>
                  {query}
                </button>
              ))}
            </div>
          )}
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
                    <div className="faq-item-header">
                      <button className="faq-question" onClick={() => toggleItem(faq.id)}>
                        <span className="question-content">
                          {faq.popular && <Flame size={16} className="popular-badge" title="Popular question" />}
                          {faq.question}
                        </span>
                        <ChevronDown size={20} className="chevron" />
                      </button>
                      <div className="faq-header-actions">
                        <button 
                          className={`fav-btn ${favorites.has(faq.id) ? 'active' : ''}`}
                          onClick={() => toggleFavorite(faq.id)}
                          title="Add to favorites"
                        >
                          <Star size={18} />
                        </button>
                        <button className="export-btn" onClick={() => {
                          setSelectedFAQToExport(faq.id)
                          setShowExportMenu(faq.id === showExportMenu ? null : faq.id)
                        }} title="Export options">
                          <Download size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Export Menu */}
                    {showExportMenu === faq.id && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="export-menu">
                        <button onClick={() => exportToPDF(faq.id)}><FileText size={14} /> Export to PDF</button>
                        <button onClick={() => printFAQ(faq.id)}><Printer size={14} /> Print</button>
                        <button><Share2 size={14} /> Share Link</button>
                      </motion.div>
                    )}

                    <div className="faq-meta">
                      <span className="view-count"><Eye size={14} /> {faq.views} views</span>
                      <span className="difficulty-badge" data-level={faq.difficulty}>{faq.difficulty}</span>
                      {faq.tags && faq.tags.map((tag, i) => (
                        <span key={i} className="tag-badge">{tag}</span>
                      ))}
                      {faq.updatedAt && <span className="updated-link"><Clock size={12} /> Updated {faq.updatedAt}</span>}
                    </div>

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
                            {faq.tips && (
                              <div className="tips-box">
                                <Lightbulb size={16} className="tips-icon" />
                                <p>{faq.tips}</p>
                              </div>
                            )}

                            {/* Multimedia Display */}
                            {faq.multimedia && (
                              <div className="multimedia-section">
                                {faq.multimedia.video && (
                                  <button className="multimedia-btn" onClick={() => setSelectedMultimedia({ type: 'video', url: faq.multimedia.video })}>
                                    <Video size={16} /> Watch Tutorial
                                  </button>
                                )}
                                {faq.multimedia.images && (
                                  <button className="multimedia-btn" onClick={() => setSelectedMultimedia({ type: 'image', urls: faq.multimedia.images })}>
                                    📸 View Images
                                  </button>
                                )}
                              </div>
                            )}

                            {/* Related FAQs */}
                            {faq.relatedFAQs && faq.relatedFAQs.length > 0 && (
                              <div className="related-faqs">
                                <p className="related-title"><Link2 size={14} /> Related Questions:</p>
                                <div className="related-list">
                                  {faq.relatedFAQs.map(relId => {
                                    const relFaq = faqs.find(f => f.id === relId)
                                    return relFaq ? (
                                      <button key={relId} className="related-item" onClick={() => {
                                        setActiveCategory(relFaq.category)
                                        setOpenItems([relId])
                                      }}>
                                        {relFaq.question}
                                      </button>
                                    ) : null
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Link to Full Article */}
                            {faq.article && (
                              <button className="article-link">
                                <FileText size={14} /> Read Full Article: {faq.article}
                              </button>
                            )}
                          </div>

                          {/* Community Comments */}
                          <div className="community-section">
                            <h4><MessageCircle size={16} /> Community Comments ({faq.comments})</h4>
                            <div className="comments-list">
                              {communityComments[faq.id] && communityComments[faq.id].map((comment, i) => (
                                <div key={i} className="comment-item">
                                  <div className="comment-header">
                                    <strong>{comment.author}</strong>
                                    <span className="comment-time">{comment.timestamp}</span>
                                  </div>
                                  <p>{comment.text}</p>
                                  <button className="comment-vote"><Heart size={12} /> {comment.votes}</button>
                                </div>
                              ))}
                            </div>
                            <div className="add-comment">
                              <input placeholder="Share your thoughts..." value={newComment[faq.id] || ''} onChange={(e) => setNewComment({...newComment, [faq.id]: e.target.value})} />
                              <button onClick={() => submitComment(faq.id)}><Send size={16} /></button>
                            </div>
                          </div>

                          <div className="faq-footer">
                            <span className="helpful-text">Was this helpful?</span>
                            <button 
                              className={`helpful-btn ${helpfulVotes[faq.id] ? 'voted' : ''}`}
                              onClick={() => toggleHelpful(faq.id)}
                            >
                              <ThumbsUp size={16} />
                              {helpfulVotes[faq.id] ? 'Helpful' : 'Mark as helpful'}
                            </button>
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
                <div className="res-icon purple"><Book size={24} /></div>
                <div className="res-content">
                  <h4>Developer Docs</h4>
                  <p>In-depth guides and API reference for developers.</p>
                  <button className="text-link">Read Documentation <ArrowRight size={14} /></button>
                </div>
             </div>
             <div className="resource-item glass-card">
                <div className="res-icon amber"><Shield size={24} /></div>
                <div className="res-content">
                  <h4>Security & Privacy</h4>
                  <p>Learn how we protect your data and privacy.</p>
                  <button className="text-link">View Security <ArrowRight size={14} /></button>
                </div>
             </div>
             <div className="resource-item glass-card">
                <div className="res-icon green"><Video size={24} /></div>
                <div className="res-content">
                  <h4>Video Tutorials</h4>
                  <p>Step-by-step guides and feature walkthroughs.</p>
                  <button className="text-link">Watch Tutorials <ArrowRight size={14} /></button>
                </div>
             </div>
             <div className="resource-item glass-card">
                <div className="res-icon blue"><FileText size={24} /></div>
                <div className="res-content">
                  <h4>Changelog</h4>
                  <p>Latest updates, features, and improvements.</p>
                  <button className="text-link">View Changelog <ArrowRight size={14} /></button>
                </div>
             </div>
          </div>
        </main>
      </div>

      {/* Multimedia Modal */}
      {selectedMultimedia && (
        <div className="multimedia-modal" onClick={() => setSelectedMultimedia(null)}>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedMultimedia(null)}><X size={24} /></button>
            {selectedMultimedia.type === 'video' ? (
              <video src={selectedMultimedia.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            ) : (
              <img src={selectedMultimedia.urls[0]} alt="Tutorial" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
            )}
          </motion.div>
        </div>
      )}

      {/* Live Chat Widget */}
      {showChatWidget && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="chat-widget glass-card">
          <div className="chat-header">
            <h4>Support Chat</h4>
            <button onClick={() => setShowChatWidget(false)}><X size={18} /></button>
          </div>
          <div className="chat-messages">
            <div className="chat-msg bot">Hi! How can we help you today?</div>
          </div>
          <div className="chat-input">
            <input placeholder="Type your question..." />
            <button><Send size={16} /></button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FAQSupport
