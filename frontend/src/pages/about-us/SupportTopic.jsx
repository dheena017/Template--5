import React from 'react';
import { useMemo } from 'react';
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  Globe,
  History,
  LifeBuoy,
  Mail,
  MessageSquare,
  PlayCircle,
  Rocket,
  Sparkles,
  Timer,
  Users,
  Zap
} from 'lucide-react'
import '../../styles/pages/about-us/SupportTopic.css'

const supportTopics = {
  'watch-tutorial-video': {
    theme: 'tutorial',
    layout: 'tutorial',
    icon: PlayCircle,
    heading: 'Watch Tutorial Video',
    description: 'Follow guided learning tracks for creators, teams, and developers.',
    tracks: [
      { level: 'Starter', title: 'Your First Render', duration: '12 min', to: '/docs' },
      { level: 'Growth', title: 'Production Workflow', duration: '24 min', to: '/studio' },
      { level: 'Advanced', title: 'Automation Blueprint', duration: '38 min', to: '/flows' }
    ],
    schedule: [
      'Monday: Creator onboarding session',
      'Wednesday: Tool deep dive',
      'Friday: Live Q&A and troubleshooting'
    ],
    quickActions: [
      { label: 'Open Full Docs', to: '/docs' },
      { label: 'Launch Studio', to: '/studio' }
    ]
  },
  'whats-new': {
    theme: 'whatsnew',
    layout: 'timeline',
    icon: Zap,
    heading: "What's New",
    description: 'Track platform changes by release channel and timeline.',
    timeline: [
      { tag: 'v4.1', date: 'Mar 19', title: 'New media queue prioritization', detail: 'Reduced average render wait by 32% for Pro workspaces.' },
      { tag: 'v4.0.7', date: 'Mar 15', title: 'API key scope controls', detail: 'Added granular permissions for project-level actions.' },
      { tag: 'v4.0.6', date: 'Mar 12', title: 'Image quality pass', detail: 'Improved prompt consistency and fallback behavior.' }
    ],
    channels: [
      { label: 'Release Blog', to: '/blog' },
      { label: 'System Status', to: '/system-status' },
      { label: 'Developer Docs', to: '/docs' }
    ]
  },
  'resources-and-guide': {
    theme: 'guide',
    layout: 'guide',
    icon: BookOpen,
    heading: 'Resources and Guide',
    description: 'Find curated references by job-to-be-done and team role.',
    bundles: [
      {
        title: 'Getting Started Bundle',
        items: ['Account setup checklist', 'First project template', 'Billing basics'],
        to: '/faq-support'
      },
      {
        title: 'Developer Bundle',
        items: ['Authentication flow', 'API examples', 'Webhooks and logs'],
        to: '/docs'
      },
      {
        title: 'Operations Bundle',
        items: ['Status monitoring', 'Incident response notes', 'Escalation matrix'],
        to: '/system-status'
      }
    ],
    featured: {
      title: 'Most Used Resource This Week',
      text: 'Authentication and API key setup guide',
      to: '/docs'
    }
  },
  'multi-media-tools': {
    theme: 'tools',
    layout: 'matrix',
    icon: History,
    heading: 'Multi-media Tools',
    description: 'Choose tools by output type and production stage.',
    groups: [
      { name: 'Voice Stack', tools: ['Text to Speech', 'Voice Changer', 'Audio Native'] },
      { name: 'Visual Stack', tools: ['Image Generator', 'Face Swap', 'Templates'] },
      { name: 'Video Stack', tools: ['Productions', 'Dubbing', 'Highlights'] }
    ],
    jumps: [
      { label: 'Open Templates', to: '/tools/templates' },
      { label: 'Open Productions', to: '/tools/productions' },
      { label: 'Open Highlights', to: '/tools/highlights' }
    ]
  },
  community: {
    theme: 'community',
    layout: 'community',
    icon: Globe,
    heading: 'Community',
    description: 'Meet other builders, share wins, and get practical feedback.',
    hubs: [
      { name: 'Discord', members: '45k', text: 'Daily creator threads and feature feedback.', to: '/discord' },
      { name: 'Twitter / X', members: '62k', text: 'Announcements, drops, and highlights.', to: '/twitter' }
    ],
    events: [
      'Prompt Review Friday',
      'Weekly Build Showcase',
      'Live Office Hours with Support'
    ]
  },
  'send-us-an-email': {
    theme: 'email',
    layout: 'email',
    icon: Mail,
    heading: 'Send Us an Email',
    description: 'Use the right mailbox to speed up routing and response times.',
    inboxes: [
      { title: 'General Support', address: 'support@textai.app', sla: 'Responds in ~4h' },
      { title: 'Technical Support', address: 'devsupport@textai.app', sla: 'Responds in ~2h for API issues' }
    ],
    checklist: [
      'Include your workspace name',
      'Add screenshots or request IDs',
      'Summarize the expected vs actual behavior'
    ]
  },
  chat: {
    theme: 'chat',
    layout: 'chat',
    icon: MessageSquare,
    heading: 'Chat',
    description: 'Start with AI support and escalate to specialist support when needed.',
    intents: ['Billing help', 'Generation failed', 'API errors', 'Workflow guidance'],
    flow: [
      'Tell the assistant what you were trying to do',
      'Share route and relevant inputs',
      'Escalate if answer is incomplete'
    ],
    quickActions: [
      { label: 'Open AI Chat', to: '/ask' },
      { label: 'Open FAQ', to: '/faq-support' }
    ]
  }
}

const ActionLink = ({ to, href, label, onNavigate }) => {
  if (to && onNavigate) {
    return (
      <button 
        type="button"
        className="support-action-link" 
        onClick={() => {
          // Clean the path (remove leading slash) for onTabChange
          const tabId = to.startsWith('/') ? to.substring(1) : to;
          onNavigate(tabId);
        }}
      >
        <span>{label}</span>
        <ArrowRight size={15} />
      </button>
    )
  }

  return (
    <a className="support-action-link" href={href} target={href?.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
      <span>{label}</span>
      <ArrowRight size={15} />
    </a>
  )
}

const SupportTopic = ({ topic: propTopic, onTabChange }) => {
  const topic = propTopic;

  const topicConfig = useMemo(() => {
    if (!topic || !supportTopics[topic]) return null
    return supportTopics[topic]
  }, [topic])

  if (!topicConfig) {
    return (
      <div className="support-error-state">
        <h2>Topic not found</h2>
        <button onClick={() => onTabChange('faq')}>Return to Support</button>
      </div>
    );
  }

  const TopicIcon = topicConfig.icon

  const renderLayout = () => {
    if (topicConfig.layout === 'tutorial') {
      return (
        <section className="tutorial-layout">
          <div className="tutorial-tracks">
            {topicConfig.tracks.map((track) => (
              <article key={track.title} className="tutorial-track-card">
                <span className="track-level">{track.level}</span>
                <h3>{track.title}</h3>
                <p>{track.duration}</p>
                <ActionLink label="Start Track" to={track.to} />
              </article>
            ))}
          </div>
          <div className="tutorial-schedule">
            <h2>Live Learning Calendar</h2>
            <ul>
              {topicConfig.schedule.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )
    }

    if (topicConfig.layout === 'timeline') {
      return (
        <section className="timeline-layout">
          <div className="release-timeline">
            {topicConfig.timeline.map((item) => (
              <article key={item.title} className="release-item">
                <div className="release-pill">{item.tag}</div>
                <div className="release-date">{item.date}</div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="release-channels">
            <h2>Follow Update Channels</h2>
            {topicConfig.channels.map((channel) => (
              <ActionLink key={channel.label} label={channel.label} to={channel.to} />
            ))}
          </div>
        </section>
      )
    }

    if (topicConfig.layout === 'guide') {
      return (
        <section className="guide-layout">
          <div className="guide-bundles">
            {topicConfig.bundles.map((bundle) => (
              <article key={bundle.title} className="guide-bundle-card">
                <h3>{bundle.title}</h3>
                <ul>
                  {bundle.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ActionLink label="Open Bundle" to={bundle.to} onNavigate={onTabChange} />
              </article>
            ))}
          </div>
          <aside className="guide-featured">
            <h2>{topicConfig.featured.title}</h2>
            <p>{topicConfig.featured.text}</p>
            <ActionLink label="View Resource" to={topicConfig.featured.to} onNavigate={onTabChange} />
          </aside>
        </section>
      )
    }

    if (topicConfig.layout === 'matrix') {
      return (
        <section className="matrix-layout">
          <div className="tool-group-grid">
            {topicConfig.groups.map((group) => (
              <article key={group.name} className="tool-group-card">
                <h3>{group.name}</h3>
                <div className="tool-chip-list">
                  {group.tools.map((toolName) => (
                    <span key={toolName} className="tool-chip">{toolName}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="tool-jump-list">
            {topicConfig.jumps.map((jump) => (
              <ActionLink key={jump.label} label={jump.label} to={jump.to} onNavigate={onTabChange} />
            ))}
          </div>
        </section>
      )
    }

    if (topicConfig.layout === 'community') {
      return (
        <section className="community-layout">
          <div className="community-hubs">
            {topicConfig.hubs.map((hub) => (
              <article key={hub.name} className="hub-card">
                <h3>{hub.name}</h3>
                <p>{hub.text}</p>
                <div className="hub-meta">Members: {hub.members}</div>
                <ActionLink label="Join Hub" to={hub.to} onNavigate={onTabChange} />
              </article>
            ))}
          </div>
          <div className="community-events">
            <h2>Weekly Community Events</h2>
            <ol>
              {topicConfig.events.map((event) => (
                <li key={event}>{event}</li>
              ))}
            </ol>
          </div>
        </section>
      )
    }

    if (topicConfig.layout === 'email') {
      return (
        <section className="email-layout">
          <div className="email-inboxes">
            {topicConfig.inboxes.map((box) => (
              <article key={box.title} className="email-box-card">
                <h3>{box.title}</h3>
                <div className="email-address">{box.address}</div>
                <p>{box.sla}</p>
                <ActionLink label="Compose" href={`mailto:${box.address}`} />
              </article>
            ))}
          </div>
          <div className="email-checklist">
            <h2>Before You Send</h2>
            <ul>
              {topicConfig.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )
    }

    return (
      <section className="chat-layout">
        <div className="chat-console">
          <div className="chat-row assistant">Hi, I can help with billing, tools, or API issues.</div>
          <div className="chat-row user">My generation failed after upload.</div>
          <div className="chat-row assistant">Got it. Please share your project route and last action.</div>
        </div>
        <div className="chat-side-panel">
          <h2>Popular Intents</h2>
          <div className="intent-chip-list">
            {topicConfig.intents.map((intent) => (
              <span key={intent} className="intent-chip">{intent}</span>
            ))}
          </div>
          <h2>Escalation Flow</h2>
          <ol>
            {topicConfig.flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="chat-actions">
            {topicConfig.quickActions.map((action) => (
              <ActionLink key={action.label} label={action.label} to={action.to} onNavigate={onTabChange} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className={`support-topic-page support-topic-${topicConfig.theme}`}>
      <section className="support-topic-hero">
        <div className="support-topic-badge">
          <TopicIcon size={16} />
          <span>Support and Community</span>
        </div>
        <h1>{topicConfig.heading}</h1>
        <p>{topicConfig.description}</p>
      </section>

      {renderLayout()}

      <div className="support-topic-actions">
        <button type="button" className="support-back-btn" onClick={() => onTabChange('faq')}>
          Back
        </button>
        <button type="button" className="support-home-btn" onClick={() => onTabChange('dashboard')}>
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default SupportTopic



