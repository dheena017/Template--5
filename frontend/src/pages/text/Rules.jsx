import React, { useEffect } from 'react'
import { CheckCircle, AlertCircle, BookOpen, Eye, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { logger } from '../../services/api'
import '../../styles/pages/text/Rules.css'

const Rules = () => {
  useEffect(() => {
    logger.log('RULES', 'Rules page mounted')
  }, [])
  
  const rules = [
    {
      category: 'Content Guidelines',
      icon: <BookOpen size={24} />,
      items: [
        'Keep videos between 15 seconds to 10 minutes',
        'Ensure high video quality (minimum 1080p)',
        'Use clear, audible audio (no background noise)',
        'Include proper lighting and framing',
        'Avoid watermarks from other platforms'
      ]
    },
    {
      category: 'Intellectual Property',
      icon: <CheckCircle size={24} />,
      items: [
        'You must own all content or have proper licensing',
        'No copyrighted music without permission',
        'Cannot use content from other creators',
        'Respect trademark and brand guidelines',
        'Original audio is highly preferred'
      ]
    },
    {
      category: 'Prohibited Content',
      icon: <AlertCircle size={24} />,
      items: [
        'No hate speech or discriminatory content',
        'No violence or graphic content',
        'No explicit or adult content',
        'No misleading or false information',
        'No spam or repetitive content'
      ]
    },
    {
      category: 'Technical Requirements',
      icon: <Sparkles size={24} />,
      items: [
        'MP4 format preferred',
        'File size must not exceed 2GB',
        'Frame rate: 24fps or higher',
        'Aspect ratio flexible (vertical, landscape, square)',
        'Maximum 8 uploads per hour'
      ]
    }
  ]

  return (
    <div className="rules-page">
      <div className="rules-header">
        <h1>Creator Rules & Guidelines</h1>
        <p>Learn what we expect from all content on our platform</p>
      </div>

      <div className="rules-content">
        <div className="rules-intro">
          <div className="rules-intro-card">
            <Eye size={32} />
            <h3>Quality First</h3>
            <p>We maintain high standards for all creator content to ensure the best user experience.</p>
          </div>
          <div className="rules-intro-card">
            <CheckCircle size={32} />
            <h3>Fair Use</h3>
            <p>All creators must respect intellectual property rights and original content ownership.</p>
          </div>
          <div className="rules-intro-card">
            <AlertCircle size={32} />
            <h3>Safe Community</h3>
            <p>We enforce strict policies to keep our community safe, respectful, and inclusive.</p>
          </div>
        </div>

        <div className="rules-grid">
          {rules.map((section, idx) => (
            <motion.div 
              key={idx}
              className="rules-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="rules-header-section">
                {section.icon}
                <h3>{section.category}</h3>
              </div>
              <ul className="rules-list">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <span className="rules-bullet">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="rules-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Need Help?</h3>
          <p>If you have questions about these guidelines, contact our support team or check our FAQ.</p>
          <button className="rules-help-btn">Contact Support</button>
        </motion.div>
      </div>
    </div>
  )
}

export default Rules





