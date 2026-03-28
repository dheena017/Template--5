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
  Eye,
  Mic,
  Video,
  Code,
  Database,
  Code2,
  X,
  Plus
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { api } from '../services/api'
import '../styles/pages/profile/common.css'
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
    response_time: '~2h',
    banner_url: 'C:/Users/dheen/.gemini/antigravity/brain/15a5a6da-47ef-4566-bfd9-eaa4db11f606/ai_banner_background_1774537758105.png',
    github_url: 'https://github.com/dheena-dev',
    portfolio_url: 'https://dheena.tech',
    email: 'dheen@example.com'
  })

  const { 
    theme, setTheme, 
    accentColor, setAccentColor,
    fontFamily, setFontFamily,
    borderRadius, setBorderRadius,
    glassStrength, setGlassStrength,
    animationsEnabled,
    setAnimationsEnabled,
    neonGlows,
    setNeonGlows,
    noiseOverlay,
    setNoiseOverlay,
    auraBackground,
    setAuraBackground
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
          api.getStats ? api.getStats() : Promise.resolve(null),
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
        github_url: profileDraft.github_url,
        portfolio_url: profileDraft.portfolio_url,
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
      case 'Overview': return <OverviewTab completionPercent={completionPercent} completionTasks={completionTasks} onToggleTask={toggleCompletionTask} statsData={statsData} setActiveTab={setActiveTab} profile={profile} profileDraft={profileDraft} isEditingProfile={isEditingProfile} />
      case 'Content': return <ContentTab projectsData={projectsData} setToast={setToast} />
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
        animationsEnabled={animationsEnabled}
        setAnimationsEnabled={setAnimationsEnabled}
        neonGlows={neonGlows}
        setNeonGlows={setNeonGlows}
        noiseOverlay={noiseOverlay}
        setNoiseOverlay={setNoiseOverlay}
        auraBackground={auraBackground}
        setAuraBackground={setAuraBackground}
        setToast={setToast}
          profileDraft={profileDraft}
          handleDraftChange={handleDraftChange}
        />
      )
      case 'Analytics': return <AnalyticsTab statsData={statsData} />
      case 'Support': return <SupportTab />
      default: return null
    }
  }

  // Banner & Photo Upload & Preview
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile(prev => ({ ...prev, banner_url: ev.target.result }));
        setToast('Banner updated locally');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileDraft(prev => ({ ...prev, photo: ev.target.result }));
        setToast('Avatar updated');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page-aura">
      <header className="profile-super-header">
        <div 
          className="banner-area" 
          style={{ backgroundImage: `url(${profile.banner_url})` }}
        >
          <div className="banner-overlay"></div>
          
          <div className="banner-action-top">
            <input 
              type="file" 
              id="banner-upload" 
              className="hidden" 
              accept="image/*" 
              onChange={handleBannerChange} 
            />
            <button className="banner-action" onClick={() => document.getElementById('banner-upload').click()}>
              <Camera size={16} /> Edit Banner
            </button>
          </div>

          <div className="floating-banner-items">
            <div className="floating-item cursor-pointer hover:scale-110 transition-transform" onClick={() => setActiveTab('Content')}>
              <div className="floating-icon-circle"><Mic size={24} /></div>
              <span className="floating-label">TTS</span>
            </div>
            <div className="floating-item cursor-pointer hover:scale-110 transition-transform" onClick={() => setActiveTab('Content')}>
              <div className="floating-icon-circle"><Camera size={24} /></div>
              <span className="floating-label">TTI</span>
            </div>
            <div className="floating-item cursor-pointer hover:scale-110 transition-transform" onClick={() => setActiveTab('Content')}>
              <div className="floating-icon-circle"><Code size={24} /></div>
              <span className="floating-label">Code</span>
            </div>
          </div>

          <div className="banner-right-actions">
            <button className="side-action-btn"><Users size={18} /></button>
            <button className="side-action-btn"><Database size={18} /></button>
            <button className="side-action-btn"><Code2 size={18} /></button>
          </div>
        </div>
        
        <div className="header-meta">
          {/* LEFT COLUMN: Avatar & Name */}
          <div className="avatar-section">
            <motion.div 
              className="avatar-frame relative"
              whileHover={{ scale: 1.02 }}
            >
              <div className="avatar-inner">DH</div>
              <div className={`status-glow ${profile.status} absolute bottom-4 right-4`}></div>
            </motion.div>
            
            <div className="left-identity-info">
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {profile.display_name}
              </motion.h2>
              <motion.div 
                className="xp-badge cursor-pointer" 
                onClick={() => setActiveTab('Analytics')}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Level {profile.experience_level || 0}
              </motion.div>
            </div>
          </div>
          
          {/* CENTER COLUMN: Info Card */}
          <div className="info-section">
            <div className="info-header-row">
              <div className="info-label-group">
                <label className="field-label">Ecosystem Name</label>
                <div className="field-value-wrapper group">
                  {isEditingProfile ? (
                    <input 
                      className="bg-transparent border-none text-white focus:outline-none w-full"
                      value={profileDraft.display_name || ''}
                      onChange={(e) => handleDraftChange('display_name', e.target.value)}
                    />
                  ) : (
                    <span className="field-value">{profile.display_name}</span>
                  )}
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    {!isEditingProfile && <Edit3 size={14} className="text-dim opacity-0 group-hover:opacity-100 cursor-pointer" onClick={() => setIsEditingProfile(true)} />}
                  </div>
                </div>
              </div>
              <div className="info-label-group">
                <label className="field-label">Domain Username</label>
                <div className="field-value-wrapper">
                  <span className="field-value">@{profile.username}</span>
                </div>
              </div>
            </div>

            <div className="info-body-content">
              <div className="mission-block">
                <div className="flex justify-between items-center mb-2">
                  <label className="field-label mb-0">Platform Mission</label>
                  {!isEditingProfile && <Edit3 size={14} className="text-dim cursor-pointer opacity-50 hover:opacity-100" onClick={() => setIsEditingProfile(true)} />}
                </div>
                <div className="description-box">
                  {isEditingProfile ? (
                    <textarea 
                      className="bg-transparent border-none text-white focus:outline-none w-full resize-none h-20"
                      value={profileDraft.bio || ''}
                      onChange={(e) => handleDraftChange('bio', e.target.value)}
                    />
                  ) : (
                    profile.bio
                  )}
                </div>
              </div>

              <div className="links-grid">
                <div className="input-with-icon group">
                  <Globe size={16} />
                  {isEditingProfile ? (
                    <input 
                      className="bg-transparent border-none text-white focus:outline-none w-full"
                      value={profileDraft.location || ''}
                      onChange={(e) => handleDraftChange('location', e.target.value)}
                    />
                  ) : (
                    <span>{profile.location}</span>
                  )}
                  {!isEditingProfile && <Edit3 size={14} className="text-dim opacity-0 group-hover:opacity-100 cursor-pointer ml-auto" onClick={() => setIsEditingProfile(true)} />}
                </div>
                <div className="input-with-icon">
                  <LinkIcon size={16} />
                  <span>textai.com/{profile.username}</span>
                </div>
              </div>

              <div className="streak-bar">
                <Flame size={16} className="text-orange-500" />
                <span>{profile.joined_at ? Math.floor((new Date() - new Date(profile.joined_at)) / (1000 * 60 * 60 * 24)) : 0} Days Stable Uptime</span>
              </div>

              <div className="info-tags-row">
                <span className="info-tag" onClick={() => setActiveTab('Content')} style={{ cursor: 'pointer' }}><Mic size={14} /> Text-to-Speech</span>
                <span className="info-tag" onClick={() => setActiveTab('Content')} style={{ cursor: 'pointer' }}><Camera size={14} /> Text-to-Image</span>
                <span className="info-tag" onClick={() => setActiveTab('Content')} style={{ cursor: 'pointer' }}><Code size={14} /> Code Generation</span>
              </div>

              <div className="plan-info-row">
                <Award size={16} className="plan-icon" />
                <span>Plan: {profile.creator_tier} | Joined {profile.joined_at}</span>
              </div>

              <div className="visibility-box">
                <Eye size={16} />
                <span className="field-label" style={{ marginBottom: 0 }}>Visibility</span>
                <select className="visibility-select-styled" value={profileVisibility} onChange={(e) => setProfileVisibility(e.target.value)}>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN: Stats & Actions */}
          <div className="right-profile-block">
            <div className="quick-stats-bar">
              {quickStats.map((item, idx) => (
                <motion.div key={item.label} className="stat-card" whileHover={{ y: -5 }}>
                  <div className="stat-card-icon">
                    {idx === 0 && <Users2 size={20} />}
                    {idx === 1 && <Globe size={20} />}
                    {idx === 2 && <Settings size={20} />}
                    {idx === 3 && <FileText size={20} />}
                  </div>
                  <div className="stat-value">{item.value}</div>
                  <div className="stat-label">{item.label} Accounts</div>
                </motion.div>
              ))}
            </div>

            <div className="action-section">
              <button className="btn-action-wide btn-share" onClick={() => setToast('Profile link copied!')}>
                <Share2 size={18} /> Share Platform
              </button>
              <button className="btn-action-wide btn-config" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                <Settings size={18} /> {isEditingProfile ? 'Close Configuration' : 'Platform Configuration'}
              </button>
              <div className="actions-bottom-row">
                <button className="btn-action-wide btn-apply" onClick={handleSaveProfile} disabled={saveState === 'saving'}>
                  <CheckCircle2 size={18} /> {saveState === 'saving' ? 'Applying...' : 'Apply Changes'}
                </button>
                <button className="btn-action-wide btn-discard" onClick={() => setIsEditingProfile(false)}>
                  <X size={18} /> {isEditingProfile ? 'Cancel' : 'Discard'}
                </button>
              </div>
            </div>
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

