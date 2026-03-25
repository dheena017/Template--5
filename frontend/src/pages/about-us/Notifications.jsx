import React, { useState } from 'react'
import {
  Bell,
  Check,
  AlertTriangle,
  Info,
  Sparkles,
  Clock3,
  Filter,
  CheckCheck
} from 'lucide-react'
import '../../styles/pages/about-us/Notifications.css'

const seedNotifications = [
  {
    id: 1,
    title: 'Render Completed',
    message: 'Your voice generation for "Podcast Intro Glow" is ready.',
    time: '2 min ago',
    type: 'success',
    read: false
  },
  {
    id: 2,
    title: 'Credits Low',
    message: 'You have 120 credits remaining. Consider topping up soon.',
    time: '18 min ago',
    type: 'warning',
    read: false
  },
  {
    id: 3,
    title: 'System Update',
    message: 'New Speech-to-Text model is now available in tools.',
    time: '1 hr ago',
    type: 'info',
    read: true
  },
  {
    id: 4,
    title: 'Workflow Triggered',
    message: 'Automation flow "Publish Pipeline" ran successfully.',
    time: '3 hr ago',
    type: 'success',
    read: true
  }
]

const Notifications = () => {
  const [items, setItems] = useState(seedNotifications)
  const [filter, setFilter] = useState('all')

  const filtered = items.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'unread') return !item.read
    return item.type === filter
  })

  const markAllAsRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markOneAsRead = (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const iconFor = (type) => {
    if (type === 'success') return <Check size={16} />
    if (type === 'warning') return <AlertTriangle size={16} />
    return <Info size={16} />
  }

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <div className="title-wrap">
          <h1><Bell size={26} /> Notifications</h1>
          <p>Track alerts, system updates, renders, and workflow activity across all pages.</p>
        </div>
        <button className="mark-all-btn" onClick={markAllAsRead}>
          <CheckCheck size={16} /> Mark all as read
        </button>
      </header>

      <section className="filter-bar premium-card">
        <div className="filter-label"><Filter size={15} /> Filter</div>
        <div className="filter-actions">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>Unread</button>
          <button className={filter === 'success' ? 'active' : ''} onClick={() => setFilter('success')}>Success</button>
          <button className={filter === 'warning' ? 'active' : ''} onClick={() => setFilter('warning')}>Warning</button>
          <button className={filter === 'info' ? 'active' : ''} onClick={() => setFilter('info')}>Info</button>
        </div>
      </section>

      <section className="notifications-list">
        {filtered.map((item) => (
          <article key={item.id} className={`notification-item premium-card ${item.read ? 'read' : 'unread'}`}>
            <div className={`noti-icon ${item.type}`}>
              {iconFor(item.type)}
            </div>
            <div className="noti-copy">
              <h3>{item.title}</h3>
              <p>{item.message}</p>
              <div className="noti-meta">
                <span><Clock3 size={13} /> {item.time}</span>
                {!item.read && <span className="badge-new"><Sparkles size={13} /> New</span>}
              </div>
            </div>
            {!item.read && (
              <button className="read-btn" onClick={() => markOneAsRead(item.id)}>
                <Check size={14} /> Mark read
              </button>
            )}
          </article>
        ))}
      </section>
    </div>
  )
}

export default Notifications




