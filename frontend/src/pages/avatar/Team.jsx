import React, { useState } from 'react'
import { 
  Users, UserPlus, Search, 
  MoreVertical, Mail, Shield, 
  Trash2, UserCheck, Zap, 
  Globe, LayoutGrid, Clock,
  CheckCircle2, AlertCircle,
  Activity, ArrowUpRight,
  Filter, Grid, List,
  Star, Crown, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/Team.css'

const Team = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [activeFilter, setActiveFilter] = useState('all')

    const members = [
        {
            id: 1,
            name: 'Kj. Dheena',
            role: 'Administrator',
            email: 'dheena@aura-engine.io',
            status: 'Active',
            lastActive: 'Now',
            avatar: 'https://i.pravatar.cc/150?u=dheena',
            projects: 124,
            credits: 'Unlimited'
        },
        {
            id: 2,
            name: 'Alex Rover',
            role: 'Creative Lead',
            email: 'alex@aura-studio.com',
            status: 'Active',
            lastActive: '12m ago',
            avatar: 'https://i.pravatar.cc/150?u=alex',
            projects: 45,
            credits: '25.4k'
        },
        {
            id: 3,
            name: 'Sarah Chen',
            role: 'Editor',
            email: 'sarah@creative-lab.ai',
            status: 'Invited',
            lastActive: '-',
            avatar: 'https://i.pravatar.cc/150?u=sarah',
            projects: 0,
            credits: '10.0k'
        },
        {
            id: 4,
            name: 'Marcus Volt',
            role: 'Member',
            email: 'marcus@aura-users.io',
            status: 'Active',
            lastActive: '1h ago',
            avatar: 'https://i.pravatar.cc/150?u=marcus',
            projects: 12,
            credits: '5.2k'
        }
    ]

    const filteredMembers = members.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    }

    return (
        <motion.div 
            className="team-container-premium"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="team-bg-gradient"></div>

            <header className="team-header-premium">
                <div className="title-section-main">
                    <motion.div className="team-badge-aura" variants={itemVariants}>
                         <Users size={14} /> <span>WORKSPACE CONSOLE</span>
                    </motion.div>
                    <motion.h1 variants={itemVariants}>Human <span className="text-gradient">Intelligence</span></motion.h1>
                    <motion.p variants={itemVariants}>Manage your high-performance team and resource distribution.</motion.p>
                </div>
                <motion.div className="header-actions-premium" variants={itemVariants}>
                    <button className="aura-btn secondary"><Shield size={18} /> Roles</button>
                    <button className="aura-btn primary"><UserPlus size={18} /> Invite Human</button>
                </motion.div>
            </header>

            <motion.div className="team-stats-grid-premium" variants={itemVariants}>
                <div className="stat-card-premium">
                    <div className="stat-icon-aura blue"><Users size={24} /></div>
                    <div className="stat-content">
                        <span className="stat-label">Total Seats</span>
                        <div className="stat-value-row">
                            <span className="stat-value text-white">08</span>
                            <span className="stat-delta positive">+2 This Month</span>
                        </div>
                    </div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-aura green"><Activity size={24} /></div>
                    <div className="stat-content">
                        <span className="stat-label">Active Now</span>
                        <div className="stat-value-row">
                            <span className="stat-value text-white">03</span>
                            <div className="active-signals">
                               <span className="signal-dot"></span>
                               <span className="signal-dot"></span>
                               <span className="signal-dot"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stat-card-premium">
                    <div className="stat-icon-aura purple"><Crown size={24} /></div>
                    <div className="stat-content">
                        <span className="stat-label">Usage Hub</span>
                        <div className="stat-value-row">
                            <span className="stat-value text-white">84%</span>
                            <div className="mini-progress-track">
                                <div className="mini-progress-fill" style={{ width: '84%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="team-controls-hub" variants={itemVariants}>
                <div className="search-box-premium">
                    <Search size={20} className="search-icon-aura" />
                    <input 
                        placeholder="Search for humans, roles or neural IDs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="view-filter-rail">
                    <div className="filter-group">
                        {['all', 'admins', 'members'].map(f => (
                            <button 
                                key={f}
                                className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="view-toggle-aura">
                        <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><Grid size={18} /></button>
                        <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><List size={18} /></button>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                    <motion.div 
                        key="grid"
                        className="members-grid-premium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                    >
                        {filteredMembers.map(member => (
                            <motion.div 
                                key={member.id}
                                className="member-card-premium"
                                whileHover={{ y: -8, boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6)' }}
                            >
                                <div className="member-card-header">
                                    <div className="status-indicator">
                                        <div className={`status-dot ${member.status.toLowerCase()}`}></div>
                                        <span>{member.status}</span>
                                    </div>
                                    <button className="card-options"><MoreVertical size={16} /></button>
                                </div>

                                <div className="member-profile-main">
                                    <div className="avatar-wrapper-premium">
                                        <img src={member.avatar} alt={member.name} />
                                        <div className="avatar-shimmer"></div>
                                    </div>
                                    <h3>{member.name}</h3>
                                    <span className="member-role-tag">{member.role}</span>
                                </div>

                                <div className="member-stats-row">
                                    <div className="m-stat">
                                        <LayoutGrid size={14} />
                                        <span>{member.projects} Pj</span>
                                    </div>
                                    <div className="m-stat">
                                        <Zap size={14} />
                                        <span>{member.credits}</span>
                                    </div>
                                </div>

                                <div className="member-card-footer">
                                    <div className="email-link">
                                        <Mail size={14} />
                                        <span>{member.email}</span>
                                    </div>
                                    <button className="member-manage-btn">MANAGE CPU</button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="list"
                        className="members-list-premium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="list-header-aura">
                            <div className="l-col col-name">Member Identity</div>
                            <div className="l-col col-role">Neural Role</div>
                            <div className="l-col col-stats">Throughput</div>
                            <div className="l-col col-status">Signal</div>
                            <div className="l-col col-action">Control</div>
                        </div>
                        {filteredMembers.map(member => (
                            <div key={member.id} className="list-row-aura">
                                <div className="l-col col-name">
                                    <img src={member.avatar} className="list-avatar" />
                                    <div className="name-box">
                                        <strong>{member.name}</strong>
                                        <span>{member.email}</span>
                                    </div>
                                </div>
                                <div className="l-col col-role">
                                    <div className={`role-pill-aura ${member.role.toLowerCase().replace(' ', '-')}`}>
                                        <Sparkles size={12} /> {member.role}
                                    </div>
                                </div>
                                <div className="l-col col-stats">
                                    <span className="stat-p">{member.projects} Pj / {member.credits} Cr</span>
                                </div>
                                <div className="l-col col-status">
                                    <div className={`status-signal-aura ${member.status.toLowerCase()}`}>
                                        {member.status === 'Active' ? 'SYNCED' : 'PENDING'}
                                    </div>
                                </div>
                                <div className="l-col col-action">
                                     <button className="list-action-btn"><Trash2 size={16} /></button>
                                     <button className="list-action-btn"><ArrowUpRight size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="team-org-box-premium" variants={itemVariants}>
                <div className="org-glow-aura"></div>
                <div className="org-content-aura">
                    <div className="org-icon-section">
                        <Globe size={40} className="text-secondary" strokeWidth={1} />
                    </div>
                    <div className="org-text-section">
                        <h2>Global Neural Fleet</h2>
                        <p>Deploy mission-critical AI workspaces across your entire organization with unified SSO and security protocols.</p>
                    </div>
                    <button className="org-upgrade-btn">ESTABLISH FLEET</button>
                </div>
            </div>
        </motion.div>
    )
}

export default Team
