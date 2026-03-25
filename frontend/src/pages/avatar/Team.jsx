import React, { useState } from 'react'
import { 
  Users, UserPlus, Search, 
  MoreVertical, Mail, Shield, 
  Trash2, UserCheck, Zap, 
  Globe, LayoutGrid, Clock,
  CheckCircle2, AlertCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/avatar/Team.css'

const Team = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const members = [
        {
            id: 1,
            name: 'Dheena v.',
            role: 'Administrator',
            email: 'dheena@textai.com',
            status: 'Active',
            lastActive: 'Now',
            avatar: 'DV'
        },
        {
            id: 2,
            name: 'Alex Rover',
            role: 'Creative Lead',
            email: 'alex@textai.com',
            status: 'Active',
            lastActive: '12m ago',
            avatar: 'AR'
        },
        {
            id: 3,
            name: 'Sarah Chen',
            role: 'Member',
            email: 'sarah@textai.com',
            status: 'Invited',
            lastActive: '-',
            avatar: 'SC'
        }
    ]

    return (
        <div className="team-container">
            <header className="team-header">
                <div className="title-section">
                    <h1><Users size={28} /> Team Workspace</h1>
                    <p>Collaborative environment for AI content orchestration and creation.</p>
                </div>
                <div className="team-actions">
                    <button className="invite-btn"><UserPlus size={18} /> Invite Member</button>
                    <button className="settings-btn"><Shield size={18} /> Permissions</button>
                </div>
            </header>

            <div className="team-stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-head">
                        <Users size={18} className="icon-blue" />
                        <span>Total Seats</span>
                    </div>
                    <div className="stat-body">
                        <strong>8</strong>
                        <span className="sub">3 Active / 5 Available</span>
                    </div>
                </div>
                <div className="stat-card glass-card">
                    <div className="stat-head">
                        <UserCheck size={18} className="icon-green" />
                        <span>Active Now</span>
                    </div>
                    <div className="stat-body">
                        <strong>2</strong>
                        <span className="sub">Collaborating in Studio</span>
                    </div>
                </div>
                <div className="stat-card glass-card">
                    <div className="stat-head">
                        <LayoutGrid size={18} className="icon-purple" />
                        <span>Total Projects</span>
                    </div>
                    <div className="stat-body">
                        <strong>142</strong>
                        <span className="sub">Across 8 Series</span>
                    </div>
                </div>
            </div>

            <div className="team-table-controls glass-card">
                <div className="search-wrap">
                    <Search size={18} />
                    <input 
                        type="text" 
                        placeholder="Filter members by name or email..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-actions">
                    <button className="filter-label">All Members</button>
                    <button className="filter-label">Admins</button>
                    <button className="filter-label">External</button>
                </div>
            </div>

            <div className="team-table glass-card">
                <div className="table-header">
                    <div className="col person">Member</div>
                    <div className="col role">Access Role</div>
                    <div className="col email">E-mail Address</div>
                    <div className="col status">Status</div>
                    <div className="col last-active">Last Active</div>
                    <div className="col actions"></div>
                </div>
                <div className="table-body">
                    {members.map((member, i) => (
                        <motion.div 
                            key={member.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="table-row"
                        >
                            <div className="col person">
                                <div className="avatar">{member.avatar}</div>
                                <div className="member-info">
                                    <strong>{member.name}</strong>
                                    <span>{member.role === 'Administrator' ? 'Full Access' : 'Limited Access'}</span>
                                </div>
                            </div>
                            <div className="col role">
                                <span className={`role-badge ${member.role.toLowerCase().replace(' ', '-')}`}>
                                    {member.role === 'Administrator' ? <Shield size={12} /> : member.role === 'Member' ? <Users size={12} /> : <Zap size={12} />}
                                    {member.role}
                                </span>
                            </div>
                            <div className="col email">
                                <div className="email-wrap">
                                    <Mail size={14} />
                                    <span>{member.email}</span>
                                </div>
                            </div>
                            <div className="col status">
                                <span className={`status-pill ${member.status.toLowerCase()}`}>
                                    {member.status === 'Active' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                    {member.status}
                                </span>
                            </div>
                            <div className="col last-active">{member.lastActive}</div>
                            <div className="col actions">
                                <button className="row-action-btn"><Trash2 size={16} /></button>
                                <button className="row-action-btn"><MoreVertical size={16} /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="team-promo-box glass-card">
                <div className="promo-icon"><Globe size={32} /></div>
                <div className="promo-text">
                    <h3>Enterprise Organizations</h3>
                    <p>Scale your workspace with unlimited seats, custom SSO, and dedicated success management with our Enterprise plan.</p>
                </div>
                <button className="upgrade-link">Contact Sales for Org Plan</button>
            </div>
        </div>
    )
}

export default Team





