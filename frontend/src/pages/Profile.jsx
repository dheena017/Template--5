import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Camera,
  MapPin,
  Link as LinkIcon,
  Globe,
  Edit3,
  Bell,
  CheckCircle2,
  FileText,
  Share2,
  Users,
  HelpCircle,
  Flame,
  Award,
  Clock,
  Settings,
  BarChart4,
  Users2,
  CircleX,
  Calendar,
  Eye
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { api } from '../services/api'
import { OverviewTab, ContentTab, EngagementTab, NotificationsTab, ConnectionsTab, SettingsTab, AnalyticsTab, SupportTab } from './profile/tabs'
import '../styles/pages/Profile.css'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [saveState, setSaveState] = useState('idle')
  const [toast, setToast] = useState('')
  const [statsData, setStatsData] = useState(null)
  const [projectsData, setProjectsData] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState('public')
  const [profileDraft, setProfileDraft] = useState({})
  const [completionTasks, setCompletionTasks] = useState([
    { id: 'photo', label: 'Profile Photo', done: true },
    { id: 'bio', label: 'Bio', done: true },
    { id: 'portfolio', label: 'Portfolio Link', done: false },
    { id: 'social', label: 'Social Links', done: false }
  ])
  const [profile, setProfile] = useState({
    display_name: "Dheenathayalan",
    username: "dheen_dev",
    bio: "Full Stack AI Engineer | Building the future of audio synthesis and media automation. 🚀",
    location: "Chennai, India",
    email: "dheen@example.com",
    status: "online",
    joined_at: '2024-02-01',
    timezone: 'Asia/Kolkata',
    creator_tier: 'Pro Creator',
    response_time: '~2h'
  })

  const { 
    theme, setTheme, 
    accentColor, setAccentColor,
    fontFamily, setFontFamily,
    borderRadius, setBorderRadius,
    glassStrength, setGlassStrength
  } = useTheme()

  useEffect(() => {
    const savedDraft = localStorage.getItem('profile-draft')
    if (savedDraft) {
      try {
        setProfileDraft(JSON.parse(savedDraft))
      } catch (err) {
        console.error('Draft parse failed', err)
      }
    }

    const fetchProfileData = async () => {
      setIsLoadingData(true)
      try {
        const [profileRes, statsRes, projectsRes] = await Promise.all([
          api.getProfile(),
          api.getStats(),
          api.getProjects()
        ])

        if (profileRes) {
          setProfile(prev => ({ ...prev, ...profileRes }))
          setProfileDraft(prev => ({ ...prev, ...profileRes }))
        }
        if (statsRes) setStatsData(statsRes)
        if (Array.isArray(projectsRes)) setProjectsData(projectsRes)
      } catch (err) {
        console.error('Failed to fetch profile data', err)
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchProfileData()
  }, [])

  useEffect(() => {
    if (!profileDraft || Object.keys(profileDraft).length === 0) return
    localStorage.setItem('profile-draft', JSON.stringify(profileDraft))
  }, [profileDraft])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const handleStatusChange = async (newStatus) => {
    try {
       const updated = await api.updateProfile({ status: newStatus })
       if (updated) setProfile(updated)
    } catch (err) { console.error(err) }
  }

  const handleDraftChange = (field, value) => {
    setProfileDraft(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    setSaveState('saving')
    try {
      const payload = {
        display_name: profileDraft.display_name,
        bio: profileDraft.bio,
        location: profileDraft.location,
        email: profileDraft.email,
        timezone: profileDraft.timezone,
        status: profile.status
      }
      const updated = await api.updateProfile(payload)
      if (updated) {
        setProfile(prev => ({ ...prev, ...updated, ...payload }))
      } else {
        setProfile(prev => ({ ...prev, ...payload }))
      }
      setSaveState('saved')
      setIsEditingProfile(false)
      setToast('Profile updated')
      localStorage.removeItem('profile-draft')
    } catch (err) {
      console.error(err)
      setSaveState('error')
      setToast('Save failed')
    }
  }

  const handleCancelEdit = () => {
    setProfileDraft(profile)
    setIsEditingProfile(false)
    setSaveState('idle')
  }

  const toggleCompletionTask = (taskId) => {
    setCompletionTasks(prev => prev.map(task => task.id === taskId ? { ...task, done: !task.done } : task))
  }

  const completionPercent = useMemo(() => {
    const doneCount = completionTasks.filter(t => t.done).length
    return Math.round((doneCount / completionTasks.length) * 100)
  }, [completionTasks])

  const quickStats = useMemo(() => {
    const raw = statsData?.total_projects
    const rawCreations = (raw === null || raw === undefined) ? projectsData.length : raw
    const displayCreations = rawCreations || '156'

    return [
      { label: 'Followers', value: statsData?.followers !== undefined ? statsData.followers : '12.4K' },
      { label: 'Following', value: statsData?.following !== undefined ? statsData.following : '842' },
      { label: 'Creations', value: displayCreations },
      { label: 'Profile', value: `${completionPercent}%` }
    ]
  }, [statsData, projectsData, completionPercent])

  const tabs = [
    { id: 'Overview', icon: <User size={18} /> },
    { id: 'Content', icon: <FileText size={18} /> },
    { id: 'Engagement', icon: <Users size={18} /> },
    { id: 'Notifications', icon: <Bell size={18} /> },
    { id: 'Connections', icon: <Users2 size={18} /> },
    { id: 'Settings', icon: <Settings size={18} /> },
    { id: 'Analytics', icon: <BarChart4 size={18} /> },
    { id: 'Support', icon: <HelpCircle size={18} /> }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview': return <OverviewTab completionPercent={completionPercent} completionTasks={completionTasks} onToggleTask={toggleCompletionTask} />
      case 'Content': return <ContentTab projectsData={projectsData} />
      case 'Engagement': return <EngagementTab />
      case 'Notifications': return <NotificationsTab />
      case 'Connections': return <ConnectionsTab />
      case 'Settings': return (
        <SettingsTab 
          theme={theme} setTheme={setTheme} 
          accentColor={accentColor} setAccentColor={setAccentColor}
          fontFamily={fontFamily} setFontFamily={setFontFamily}
          borderRadius={borderRadius} setBorderRadius={setBorderRadius}
          glassStrength={glassStrength} setGlassStrength={setGlassStrength}
          setToast={setToast}
        />
      )
      case 'Analytics': return <AnalyticsTab statsData={statsData} />
      case 'Support': return <SupportTab />
      default: return null
    }
  }

  return (
    <div className="profile-wrapper full-site">
      <header className="profile-super-header">
        <div className="banner-area">
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <button className="banner-action"><Camera size={16} /> Edit Banner</button>
          </div>
        </div>
        
        <div className="header-meta">
          <div className="avatar-section">
            <motion.div 
              className="avatar-frame"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="avatar-inner">DH</div>
              <div className={`status-glow ${profile.status}`}></div>
            </motion.div>
            <motion.div 
              className="xp-badge"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Level 42
            </motion.div>
          </div>
          
          <div className="info-section">
            <div className="identity-block">
              <div className="name-line">
                {isEditingProfile ? (
                  <input
                    className="inline-edit-input name-edit"
                    value={profileDraft.display_name || ''}
                    onChange={(e) => handleDraftChange('display_name', e.target.value)}
                    placeholder="Display name"
                  />
                ) : (
                  <h1>{profile.display_name} <CheckCircle2 size={24} className="verified-icon" /></h1>
                )}
                <span className="handle">@{profile.username}</span>
              </div>
              <div className="status-badge-container">
                <select value={profile.status} onChange={(e) => handleStatusChange(e.target.value)} className="status-select">
                  <option value="online">🟢 Online</option>
                  <option value="busy">🔴 Busy</option>
                  <option value="offline">⚪ Offline</option>
                </select>
              </div>
            </div>
            {isEditingProfile ? (
              <textarea
                className="inline-edit-input bio-edit"
                value={profileDraft.bio || ''}
                onChange={(e) => handleDraftChange('bio', e.target.value)}
                placeholder="Tell people about your profile"
              />
            ) : (
              <p className="super-bio">{profile.bio}</p>
            )}
            <div className="links-row">
              <span className="link-item"><MapPin size={14} /> {isEditingProfile ? <input className="inline-edit-input tiny-edit" value={profileDraft.location || ''} onChange={(e) => handleDraftChange('location', e.target.value)} /> : profile.location}</span>
              <span className="link-item"><LinkIcon size={14} /> textai.com/{profile.username}</span>
              <span className="link-item"><Mail size={14} /> {isEditingProfile ? <input className="inline-edit-input tiny-edit" value={profileDraft.email || ''} onChange={(e) => handleDraftChange('email', e.target.value)} /> : profile.email}</span>
              <span className="link-item"><Flame size={14} /> 125 Day Streak</span>
            </div>
            <div className="trust-signals">
              <span className="link-item"><Award size={14} /> {profile.creator_tier}</span>
              <span className="link-item"><Clock size={14} /> Response: {profile.response_time}</span>
              <span className="link-item"><Globe size={14} /> {profile.timezone}</span>
              <span className="link-item"><Calendar size={14} /> Joined {profile.joined_at}</span>
            </div>
            <div className="visibility-row">
              <label className="visibility-label"><Eye size={14} /> Visibility</label>
              <select className="status-select" value={profileVisibility} onChange={(e) => setProfileVisibility(e.target.value)}>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          
          <div className="quick-stats-bar">
            {isLoadingData ? (
              <div className="loading-inline">Loading stats...</div>
            ) : (
              quickStats.map((item) => (
                <motion.div key={item.label} className="stat-card" whileHover={{ scale: 1.05 }}>
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </motion.div>
              ))
            )}
          </div>
          
          <div className="action-section">
            <motion.button 
              className="primary-action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={18} /> Share Profile
            </motion.button>
            <motion.button 
              className="secondary-action-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditingProfile((prev) => !prev)}
            >
              <Edit3 size={18} /> {isEditingProfile ? 'Close Edit' : 'Edit Profile'}
            </motion.button>
            {isEditingProfile && (
              <>
                <button className="primary-action-btn" onClick={handleSaveProfile}>
                  <CheckCircle2 size={16} /> {saveState === 'saving' ? 'Saving...' : 'Save'}
                </button>
                <button className="secondary-action-btn" onClick={handleCancelEdit}>
                  <CircleX size={16} /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <nav className="profile-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.id}</span>
              {activeTab === tab.id && (
                <motion.div layoutId="tab-underline" className="tab-underline" />
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="profile-main-content">
        {toast && <div className="profile-toast" role="status">{toast}</div>}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default Profile

