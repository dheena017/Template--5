import React, { useState } from 'react'
import { 
  BookOpen, MessageSquare, Mail, Phone, Video, 
  Search, ArrowRight, Zap, Shield, Code, 
  AlertCircle, Lightbulb, CheckCircle,
  Clock, TrendingUp, Users, Award, MapPin, ExternalLink,
  Hash, Share2
} from 'lucide-react'
import { motion } from 'framer-motion'
import SearchBar from '../../components/common/SearchBar/SearchBar'
import '../../styles/pages/support/HelpCenter.css'

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('quick-help')
  const [searchQuery, setSearchQuery] = useState('')

  const quickHelpTopics = [
    { id: 1, icon: <Zap size={24} />, title: 'Getting Started', desc: 'Set up your account and create your first video', link: '/faq?category=getting-started' },
    { id: 2, icon: <Code size={24} />, title: 'API Documentation', desc: 'Integrate TextAI into your application', link: '/faq?category=api' },
    { id: 3, icon: <Shield size={24} />, title: 'Billing & Plans', desc: 'Understand credits, pricing, and subscriptions', link: '/faq?category=billing' },
    { id: 4, icon: <AlertCircle size={24} />, title: 'Troubleshooting', desc: 'Fix common issues and errors', link: '/faq?category=troubleshooting' },
    { id: 5, icon: <Video size={24} />, title: 'Video Tutorials', desc: 'Watch step-by-step walkthroughs', link: '/docs/tutorials' },
    { id: 6, icon: <Lightbulb size={24} />, title: 'Best Practices', desc: 'Tips and tricks for optimal results', link: '/docs/best-practices' }
  ]

  const supportChannels = [
    { id: 1, icon: <Mail size={20} />, title: 'Email Support', desc: 'support@textai.com', response: 'Response in 24-48 hours', color: 'blue' },
    { id: 2, icon: <MessageSquare size={20} />, title: 'Live Chat', desc: 'Available 9 AM - 6 PM EST', response: 'Typical response: <5 minutes', color: 'green' },
    { id: 3, icon: <Phone size={20} />, title: 'Phone Support', desc: '+1 (555) 123-4567', response: 'Pro & Enterprise only', color: 'purple' },
    { id: 4, icon: <Hash size={20} />, title: 'Slack Community', desc: 'Join 15,000+ users', response: 'Peer support & updates', color: 'pink' }
  ]

  const resources = [
    { id: 1, icon: <BookOpen size={20} />, title: 'Knowledge Base', desc: '500+ detailed articles', stats: '95% of questions answered', color: 'indigo' },
    { id: 2, icon: <Video size={20} />, title: 'Video Academy', desc: '50+ tutorial videos', stats: '20+ hours of content', color: 'red' },
    { id: 3, icon: <Code size={20} />, title: 'Code Examples', desc: 'Open source integrations', stats: '30+ ready-to-use samples', color: 'gray' },
    { id: 4, icon: <Users size={20} />, title: 'Community Forum', desc: 'Ask & answer questions', stats: '10K+ monthly discussions', color: 'cyan' }
  ]

  const stats = [
    { label: 'Knowledge Base Articles', value: '500+', icon: '📚' },
    { label: 'Average Response Time', value: '<2 min', icon: '⚡' },
    { label: 'Customer Satisfaction', value: '98%', icon: '⭐' },
    { label: 'Uptime Guarantee', value: '99.9%', icon: '✅' }
  ]

  const recentUpdates = [
    { date: '2024-10-15', title: 'New Batch Processing API Released', category: 'API', link: '/docs/batch-api' },
    { date: '2024-10-12', title: 'Video Editor Enhancements', category: 'Features', link: '/docs/features/editor' },
    { date: '2024-10-10', title: 'Commercial Usage Rights Guide', category: 'Billing', link: '/docs/commercial' },
    { date: '2024-10-08', title: 'Performance Optimization Tips', category: 'Best Practices', link: '/docs/performance' }
  ]

  return (
    <div className="help-center-container">
      {/* Hero Section */}
      <section className="hc-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hc-hero-content"
        >
          <h1>Help Center</h1>
          <p>Get answers, tutorials, and support from our expert team</p>
          
          <div className="hc-hero-search">
            <SearchBar 
              placeholder="Search for help..." 
              onSearch={(val) => setSearchQuery(val)}
              className="hc-search-bar"
            />
          </div>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="stat-item"
              >
                <span className="stat-icon">{stat.icon}</span>
                <div>
                  <p className="stat-value">{stat.value}</p>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quick Help Section */}
      <section className="hc-quick-help">
        <div className="section-header">
          <h2>Quick Help Topics</h2>
          <p>Start with one of these popular topics</p>
        </div>

        <div className="quick-help-grid">
          {quickHelpTopics.map((topic, i) => (
            <motion.a 
              key={topic.id}
              href={topic.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="quick-help-card glass-card"
            >
              <div className="qh-icon">{topic.icon}</div>
              <h3>{topic.title}</h3>
              <p>{topic.desc}</p>
              <div className="qh-arrow"><ArrowRight size={16} /></div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section className="hc-tabs-section">
        <div className="tabs-header">
          <div className="tabs-nav">
            <button 
              className={`tab-btn ${activeTab === 'quick-help' ? 'active' : ''}`}
              onClick={() => setActiveTab('quick-help')}
            >
              <Zap size={18} /> Quick Answers
            </button>
            <button 
              className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              <BookOpen size={18} /> Resources
            </button>
            <button 
              className={`tab-btn ${activeTab === 'support' ? 'active' : ''}`}
              onClick={() => setActiveTab('support')}
            >
              <MessageSquare size={18} /> Support Channels
            </button>
            <button 
              className={`tab-btn ${activeTab === 'updates' ? 'active' : ''}`}
              onClick={() => setActiveTab('updates')}
            >
              <TrendingUp size={18} /> Recent Updates
            </button>
          </div>
        </div>

        {/* Quick Answers Tab */}
        {activeTab === 'quick-help' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="answers-container">
              <div className="answer-item">
                <div className="answer-header">
                  <CheckCircle size={20} className="text-green-500" />
                  <h3>Most Asked Question</h3>
                </div>
                <p>How do I create my first video with TextAI?</p>
                <button className="learn-more">Learn More <ArrowRight size={14} /></button>
              </div>
              <div className="answer-item">
                <div className="answer-header">
                  <CheckCircle size={20} className="text-blue-500" />
                  <h3>Trending This Week</h3>
                </div>
                <p>What's included in each subscription plan?</p>
                <button className="learn-more">Learn More <ArrowRight size={14} /></button>
              </div>
              <div className="answer-item">
                <div className="answer-header">
                  <CheckCircle size={20} className="text-purple-500" />
                  <h3>API Integration Help</h3>
                </div>
                <p>How do I authenticate API requests?</p>
                <button className="learn-more">Learn More <ArrowRight size={14} /></button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="resources-grid">
              {resources.map((resource, i) => (
                <motion.div 
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="resource-card glass-card"
                >
                  <div className={`res-icon res-${resource.color}`}>
                    {resource.icon}
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.desc}</p>
                  <div className="res-stats">{resource.stats}</div>
                  <button className="res-action">Explore <ArrowRight size={14} /></button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Support Channels Tab */}
        {activeTab === 'support' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="support-channels">
              {supportChannels.map((channel, i) => (
                <motion.div 
                  key={channel.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`support-channel glass-card sc-${channel.color}`}
                >
                  <div className="sc-icon">{channel.icon}</div>
                  <div className="sc-content">
                    <h3>{channel.title}</h3>
                    <p className="sc-desc">{channel.desc}</p>
                    <p className="sc-response">⚡ {channel.response}</p>
                  </div>
                  <button className="sc-action"><ArrowRight size={16} /></button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Updates Tab */}
        {activeTab === 'updates' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tab-content">
            <div className="updates-timeline">
              {recentUpdates.map((update, i) => (
                <motion.a 
                  key={i}
                  href={update.link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="update-item glass-card"
                >
                  <div className="update-date">
                    <span className="date">{update.date}</span>
                  </div>
                  <div className="update-content">
                    <h3>{update.title}</h3>
                    <span className="update-category">{update.category}</span>
                  </div>
                  <div className="update-arrow"><ArrowRight size={16} /></div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* Community Section */}
      <section className="hc-community">
        <div className="community-wrapper glass-card">
          <div className="community-content">
            <h2>Join Our Community</h2>
            <p>Connect with other users, share ideas, and learn best practices</p>
            <div className="community-links">
              <a href="#" className="community-link">
                <Users size={18} /> Community Forum <ExternalLink size={14} />
              </a>
              <a href="#" className="community-link">
                <MessageSquare size={18} /> Slack Community <ExternalLink size={14} />
              </a>
              <a href="#" className="community-link">
                <Code size={18} /> GitHub Discussions <ExternalLink size={14} />
              </a>
              <a href="#" className="community-link">
                <Share2 size={18} /> Twitter @TextAI <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hc-cta">
        <div className="cta-wrapper">
          <h2>Didn't find what you're looking for?</h2>
          <p>Our support team is ready to help you get the most out of TextAI</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">
              <MessageSquare size={18} /> Start Live Chat
            </button>
            <button className="cta-btn secondary">
              <Mail size={18} /> Send Email
            </button>
            <button className="cta-btn secondary">
              <Phone size={18} /> Schedule Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="hc-footer-links">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Documentation</h4>
            <a href="#">Getting Started Guide</a>
            <a href="#">API Reference</a>
            <a href="#">Webhooks</a>
            <a href="#">SDK Docs</a>
          </div>
          <div className="footer-col">
            <h4>Learn</h4>
            <a href="#">Video Tutorials</a>
            <a href="#">Case Studies</a>
            <a href="#">Blog</a>
            <a href="#">Webinars</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press Kit</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Security</a>
            <a href="#">Compliance</a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HelpCenter
