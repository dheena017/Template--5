import React from 'react'
import { motion } from 'framer-motion'
import { Award, Flame, Heart, MessageCircle, Share2, Star, Trophy, UserPlus, Users2, Zap } from 'lucide-react'

const EngagementTab = () => {
  const followers = [
    { id: 1, name: 'Alex Rivera', handle: '@alexrivera', avatar: 'AR', following: false },
    { id: 2, name: 'Sarah Ahmed', handle: '@saraah.dev', avatar: 'SA', following: true },
    { id: 3, name: 'Marcus Chen', handle: '@marcuschen', avatar: 'MC', following: false },
    { id: 4, name: 'Elena Rossi', handle: '@elenadeep', avatar: 'ER', following: true }
  ]

  const recommendations = [
    { id: 1, from: 'Sarah Anderson', title: 'Voice Synthesis Expert', text: 'Incredible work on audio quality!' },
    { id: 2, from: 'James Wilson', title: 'Cloud Architect', text: 'Amazing scalability solutions.' },
    { id: 3, from: 'Lisa Chen', title: 'ML Engineer', text: "Best AI models I've seen!" }
  ]

  return (
    <div className="tab-grid engagement-grid">
      <div className="grid-col main">
        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3>Community Testimonials</h3>
          <div className="testimonials-list">
            {recommendations.map((rec, i) => (
              <motion.div key={rec.id} className="testimonial-card" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ x: 4 }}>
                <div className="testimonial-header">
                  <div className="author-avatar">{rec.from.split(' ').map(n => n[0]).join('')}</div>
                  <div className="author-info">
                    <span className="author-name">{rec.from}</span>
                    <span className="author-title">{rec.title}</span>
                  </div>
                </div>
                <p className="testimonial-text">"{rec.text}"</p>
                <div className="testimonial-rating">{[...Array(5)].map((_, idx) => <Star key={idx} size={14} className="star-filled" />)}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="section-head">
            <h3>Top Followers</h3>
            <motion.button className="text-btn" whileHover={{ scale: 1.05 }}>View All</motion.button>
          </div>
          <div className="followers-grid">
            {followers.map((follower, i) => (
              <motion.div key={follower.id} className="follower-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ scale: 1.05 }}>
                <div className="follower-avatar">{follower.avatar}</div>
                <h4>{follower.name}</h4>
                <span className="follower-handle">{follower.handle}</span>
                <motion.button className={`follow-btn ${follower.following ? 'following' : ''}`} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  {follower.following ? '✓ Following' : '+ Follow'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="section-head">
            <h3>Community Discussions</h3>
            <button className="text-btn"><Users2 size={14} /> Shared Workspace</button>
          </div>
          <div className="social-status-update">
            <input type="text" placeholder="Share an update or ask a question..." />
            <motion.button className="post-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Post</motion.button>
          </div>
          <div className="discussions-list">
            {[
              { user: 'James M.', text: 'Just launched my new voice model! Check it out', replies: 12, likes: 89 },
              { user: 'Sofia L.', text: "Anyone working on music generation? Let's collaborate", replies: 24, likes: 156 }
            ].map((disc, i) => (
              <motion.div key={i} className="discussion-item" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }} whileHover={{ x: 4 }}>
                <div className="disc-avatar">{disc.user.split(' ').map(n => n[0]).join('')}</div>
                <div className="disc-content">
                  <span className="disc-user">{disc.user}</span>
                  <p>{disc.text}</p>
                </div>
                <div className="disc-stats">
                  <span><MessageCircle size={14} /> {disc.replies}</span>
                  <span><Heart size={14} /> {disc.likes}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <div className="grid-col side">
        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="section-head">
            <h3>Collaboration Offers</h3>
            <button className="text-btn"><UserPlus size={14} /> Invite</button>
          </div>
          <div className="collab-items">
            {[
              { project: 'Video Game VO', from: '@game_dev_x' },
              { project: 'Podcast Series', from: '@podcast_hub' },
              { project: 'Music Festival', from: '@fest_digital' }
            ].map((collab, i) => (
              <motion.div key={i} className="collab-item" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }} whileHover={{ x: 4 }}>
                <UserPlus size={18} />
                <div className="collab-info"><span>{collab.project}</span><p>{collab.from}</p></div>
                <motion.button className="join-tiny" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>Join</motion.button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card referral-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3>Referral Program</h3>
          <div className="referral-content">
            <div className="referral-stat"><span className="label">Referrals</span><span className="value">24</span></div>
            <div className="referral-stat"><span className="label">Earned</span><span className="value">$480</span></div>
          </div>
          <motion.button className="referral-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Share2 size={14} /> Share Link</motion.button>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>XP & Badges</h3>
          <div className="xp-bar-container">
            <div className="xp-label"><span>Level 42</span><span>342/500 XP</span></div>
            <div className="xp-bar"><motion.div className="xp-fill" initial={{ width: 0 }} animate={{ width: '68%' }} transition={{ duration: 1.5, ease: 'easeOut' }}></motion.div></div>
          </div>
          <div className="mini-badges-grid">
            {[{ icon: <Flame className="glow-red" />, title: 'Fire Performer' }, { icon: <Award className="glow-yellow" />, title: 'Top Creator' }, { icon: <Zap className="glow-yellow" />, title: 'Lightning' }, { icon: <Trophy className="glow-gold" />, title: 'Champion' }].map((badge, i) => (
              <motion.div key={i} className="badge-item" title={badge.title} whileHover={{ scale: 1.15 }}>{badge.icon}</motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default EngagementTab

