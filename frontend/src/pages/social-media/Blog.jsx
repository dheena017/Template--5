import React, { useState } from 'react'
import { 
  Rss, Search, Calendar, 
  User, ArrowRight, BookOpen, 
  TrendingUp, Clock, Tag,
  ChevronRight, ExternalLink
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/social-media/Blog.css'

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')

    const blogCategories = [
        { id: 'all', label: 'All Updates' },
        { id: 'product', label: 'Product News' },
        { id: 'engineering', label: 'Engineering' },
        { id: 'creative', label: 'AI Creativity' },
        { id: 'community', label: 'Community' }
    ]

    const posts = [
        {
            id: 1,
            category: 'product',
            title: 'Introducing TextAI Orchestrator v4.0',
            excerpt: 'Our most powerful update yet, featuring real-time collaborative editing and enhanced model orchestration.',
            author: 'Dheena v.',
            date: 'March 18, 2026',
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
            featured: true
        },
        {
            id: 2,
            category: 'engineering',
            title: 'Optimizing Latency in High-Throughput AI Pipelines',
            excerpt: 'How we reduced end-to-end inference time by 45% using a custom-built distributed model mesh.',
            author: 'Tech Team',
            date: 'March 15, 2026',
            readTime: '12 min read',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4628c9757?auto=format&fit=crop&q=80&w=800'
        },
        {
            id: 3,
            category: 'creative',
            title: 'The Art of Prompt Engineering for Flux.1',
            excerpt: 'Unlock the full potential of hyper-realistic image generation with our comprehensive guide to prompt structural analysis.',
            author: 'Creative Lead',
            date: 'March 12, 2026',
            readTime: '8 min read'
        },
        {
            id: 4,
            category: 'community',
            title: 'Winners of the Spring AI Creative Challenge',
            excerpt: 'Showcasing the incredible work of our community members who pushed the boundaries of AI-driven storytelling.',
            author: 'Community Mgr',
            date: 'March 10, 2026',
            readTime: '5 min read'
        }
    ]

    const filteredPosts = posts.filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    const featuredPost = posts.find(p => p.featured)
    const regularPosts = filteredPosts.filter(p => !p.featured || selectedCategory !== 'all')

    return (
        <div className="blog-container">
            <div className="blog-header">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="header-content"
                >
                    <div className="blog-badge"><Rss size={14} /> The TextAI Pulse</div>
                    <h1>News, Ideas & <br />Engineering Insights</h1>
                    <p>Stay ahead of the curve with latest updates on AI orchestration and creative technology.</p>
                </motion.div>
            </div>

            <div className="blog-navigation">
                <div className="category-scroller">
                    {blogCategories.map(cat => (
                        <button 
                            key={cat.id}
                            className={`blog-nav-item ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {selectedCategory === 'all' && featuredPost && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="featured-post glass-card"
                >
                    <div className="featured-image">
                        <img src={featuredPost.image} alt={featuredPost.title} />
                        <div className="featured-badge">Featured Strategy</div>
                    </div>
                    <div className="featured-info">
                        <span className="post-category">{featuredPost.category}</span>
                        <h2>{featuredPost.title}</h2>
                        <p>{featuredPost.excerpt}</p>
                        <div className="post-meta">
                            <span className="meta-item"><User size={14} /> {featuredPost.author}</span>
                            <span className="meta-item"><Clock size={14} /> {featuredPost.readTime}</span>
                        </div>
                        <button className="read-featured-btn">Read Deep Dive <ArrowRight size={18} /></button>
                    </div>
                </motion.div>
            )}

            <div className="blog-grid">
                {regularPosts.map(post => (
                    <motion.article 
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="blog-card"
                    >
                        {post.image && (
                            <div className="card-image">
                                <img src={post.image} alt={post.title} />
                            </div>
                        )}
                        <div className="card-content">
                            <div className="card-top">
                                <span className="post-cat-tag">{post.category}</span>
                                <span className="read-time">{post.readTime}</span>
                            </div>
                            <h3>{post.title}</h3>
                            <p>{post.excerpt}</p>
                            <div className="card-footer">
                                <div className="post-author">
                                    <div className="author-avatar">{post.author.charAt(0)}</div>
                                    <div className="author-info">
                                        <strong>{post.author}</strong>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                                <button className="card-link"><ChevronRight size={20} /></button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            <div className="blog-newsletter glass-card">
                <div className="newsletter-icon"><TrendingUp size={32} /></div>
                <div className="newsletter-text">
                    <h3>Subscribe to the Pulse</h3>
                    <p>Get bi-weekly updates on new models, tutorials and community showcases directly in your inbox.</p>
                </div>
                <div className="newsletter-form">
                    <input type="email" placeholder="email@example.com" />
                    <button className="sub-btn">Join 12,000+ Readers</button>
                </div>
            </div>
        </div>
    )
}

export default Blog



