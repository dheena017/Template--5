import React from 'react'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Globe, Search, Share2, TrendingUp } from 'lucide-react'

const AnalyticsTab = ({ statsData }) => {
  const insights = [
    { label: 'Total Views', value: statsData?.total_views || '124.5K', trend: '+15.2%', color: '#06b6d4' },
    { label: 'Downloads', value: statsData?.downloads || '28.9K', trend: '+8.7%', color: '#22c55e' },
    { label: 'Engagement Rate', value: statsData?.engagement_rate || '6.2%', trend: '-0.3%', color: '#f59e0b' },
    { label: 'Revenue', value: statsData?.revenue || '$2,450', trend: '+24.1%', color: '#ec4899' }
  ]

  const heatmapStrengths = Array.from({ length: 35 }, (_, i) => {
    const seed = (i * 7 + 3) % 5
    const strengths = ['weak', 'medium', 'strong']
    return strengths[seed % 3]
  })

  return (
    <div className="tab-grid analytics-grid">
      <div className="grid-col main">
        <div className="metrics-grid">
          {insights.map((metric, i) => (
            <motion.div key={i} className="metric-card premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} style={{ borderTopColor: metric.color, borderTopWidth: '3px' }}>
              <div className="metric-header">
                <span className="metric-label">{metric.label}</span>
                <span className={`metric-trend ${metric.trend.startsWith('+') ? 'positive' : 'negative'}`}>{metric.trend}</span>
              </div>
              <div className="metric-value">{metric.value}</div>
            </motion.div>
          ))}
        </div>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>Engagement Patterns</h3>
          <div className="heatmap-demo">
            {heatmapStrengths.map((strength, i) => <motion.div key={i} className={`heat-box ${strength}`} whileHover={{ scale: 1.1 }} />)}
          </div>
          <div className="heatmap-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3>Monthly Trends</h3>
          <div className="bar-chart-sim">
            {[30, 60, 40, 80, 50, 70, 45, 90, 60, 85, 75, 95].map((h, i) => (
              <motion.div key={i} className="bar" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.3 + i * 0.03, duration: 0.5 }} style={{ background: `linear-gradient(0deg, hsl(${180 - i * 5}, 70%, 50%), hsl(${200 - i * 5}, 70%, 60%))`, cursor: 'pointer' }} whileHover={{ filter: 'brightness(1.3)' }} title={`Month ${i + 1}: ${h}%`} />
            ))}
          </div>
          <div className="chart-footer"><span>Jan</span><span>...</span><span>Dec</span></div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3>Content Distribution</h3>
          <div className="content-breakdown">
            {[
              { type: 'Voice Models', percent: 35, count: 54 },
              { type: 'Music Tracks', percent: 28, count: 43 },
              { type: 'Video Projects', percent: 22, count: 34 },
              { type: 'Templates', percent: 15, count: 23 }
            ].map((item, i) => (
              <motion.div key={i} className="breakdown-item" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05 }}>
                <div className="breakdown-header">
                  <span className="type-name">{item.type}</span>
                  <span className="type-count">{item.count} items</span>
                </div>
                <div className="breakdown-bar">
                  <motion.div className="breakdown-fill" initial={{ width: 0 }} animate={{ width: `${item.percent}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }} style={{ background: `linear-gradient(90deg, hsl(${i * 80}, 70%, 50%), hsl(${i * 80 + 30}, 70%, 60%))` }} />
                </div>
                <span className="percent-label">{item.percent}%</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid-col side">
        <motion.section className="premium-card revenue-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="section-head"><h3>Revenue Dashboard</h3></div>
          <div className="rev-main"><span className="amount">$1,245.80</span><span className="trend positive">+8.2% <TrendingUp size={14} /></span></div>
          <p className="sub">Est. Earnings this month</p>
          <div className="revenue-breakdown-mini">
            <div className="rev-item"><span>Subscriptions</span><span className="rev-value">$890</span></div>
            <div className="rev-item"><span>Royalties</span><span className="rev-value">$355.80</span></div>
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3>Audience Geo</h3>
          <div className="demographics-sim">
            {[{ region: 'US', percent: 65 }, { region: 'India', percent: 20 }, { region: 'UK', percent: 10 }, { region: 'Others', percent: 5 }].map((demo, i) => (
              <motion.div key={i} className="demo-bar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.05 }}>
                <motion.div className="fill" initial={{ width: 0 }} animate={{ width: `${demo.percent}%` }} transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }} />
                <span>{demo.region} / {demo.percent}%</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>Top Traffic Sources</h3>
          <div className="sources-list">
            {[{ name: 'Direct', views: 12450, icon: <Globe size={14} /> }, { name: 'Search', views: 9230, icon: <Search size={14} /> }, { name: 'Social', views: 6890, icon: <Share2 size={14} /> }, { name: 'Referral', views: 3450, icon: <ExternalLink size={14} /> }].map((source, i) => (
              <motion.div key={i} className="source-item" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }} whileHover={{ x: 4 }}>
                <div className="source-icon">{source.icon}</div>
                <div className="source-info"><span className="source-name">{source.name}</span><span className="source-views">{source.views.toLocaleString()}</span></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3>Export Report</h3>
          <div className="export-buttons">
            <motion.button className="export-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Download size={14} /> PDF</motion.button>
            <motion.button className="export-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Download size={14} /> CSV</motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default AnalyticsTab

