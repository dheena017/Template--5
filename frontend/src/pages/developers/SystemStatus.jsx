import React, { useState, useEffect } from 'react'
import { 
  HeartPulse, ShieldCheck, Zap, 
  Server, Globe, Clock, 
  AlertCircle, CheckCircle2, 
  Activity, ArrowUpRight, ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/developers/SystemStatus.css'

const SystemStatus = () => {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const services = [
        { name: 'API Gateway', status: 'operational', uptime: '99.99%', region: 'Global' },
        { name: 'Model Orchestrator', status: 'operational', uptime: '99.95%', region: 'US-East' },
        { name: 'Video Rendering Engine', status: 'degraded', uptime: '98.54%', region: 'US-West' },
        { name: 'Audio Synthesis (V3)', status: 'operational', uptime: '99.99%', region: 'Europe' },
        { name: 'Image Processing Pipeline', status: 'operational', uptime: '99.90%', region: 'Asia' },
        { name: 'Database (Internal)', status: 'operational', uptime: '100%', region: 'Cluster' }
    ]

    const incidents = [
        {
            id: 1,
            title: 'Minor latency in Video Rendering',
            status: 'investigating',
            date: 'March 19, 2026 - 14:30 UTC',
            update: 'We are investigating a slight increase in processing time for 4K video renders. Our engineering team is currently scaling the compute clusters in US-West.'
        },
        {
            id: 2,
            title: 'API Authentication Latency',
            status: 'resolved',
            date: 'March 18, 2026 - 09:15 UTC',
            update: 'The issue has been resolved. The bottleneck was identified as a misconfigured cache layer in our auth service.'
        }
    ]

    return (
        <div className="status-container">
            <div className="status-header">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="status-hero glass-card"
                >
                    <div className="hero-top">
                        <div className="status-indicator">
                            <div className="pulse-circle"></div>
                            <span className="status-text">All systems operational</span>
                        </div>
                        <div className="live-clock">
                            <Clock size={16} /> <span>{currentTime.toUTCString()}</span>
                        </div>
                    </div>
                    <h1>System Performance & Status</h1>
                    <p>Real-time updates on the health and performance of TextAI architecture.</p>
                </motion.div>
            </div>

            <div className="status-metrics-grid">
                <div className="metric-card glass-card">
                    <div className="m-header">
                        <Activity size={20} className="icon-blue" />
                        <span>Avg Latency</span>
                    </div>
                    <div className="m-body">
                        <strong>182ms</strong>
                        <span className="m-trend positive"><ArrowUpRight size={14} /> 12% faster</span>
                    </div>
                </div>
                <div className="metric-card glass-card">
                    <div className="m-header">
                        <ShieldCheck size={20} className="icon-green" />
                        <span>Security Health</span>
                    </div>
                    <div className="m-body">
                        <strong>Optimal</strong>
                        <span className="m-trend">100% Secure</span>
                    </div>
                </div>
                <div className="metric-card glass-card">
                    <div className="m-header">
                        <Zap size={20} className="icon-amber" />
                        <span>Rendering Load</span>
                    </div>
                    <div className="m-body">
                        <strong>64%</strong>
                        <span className="m-trend">Scaling Up</span>
                    </div>
                </div>
            </div>

            <div className="services-section">
                <h3>Core Services Status</h3>
                <div className="services-list">
                    {services.map((service, i) => (
                        <div key={i} className="service-item glass-card">
                            <div className="service-main">
                                <div className="service-info">
                                    <strong>{service.name}</strong>
                                    <span>{service.region}</span>
                                </div>
                                <div className={`service-status-pill ${service.status}`}>
                                    {service.status === 'operational' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                </div>
                            </div>
                            <div className="service-uptime">
                                <span className="label">Uptime</span>
                                <span className="value">{service.uptime}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="incidents-section">
                <h3>Recent Incidents</h3>
                <div className="incidents-list">
                    {incidents.map(inc => (
                        <div key={inc.id} className={`incident-card glass-card ${inc.status}`}>
                            <div className="inc-header">
                                <div className="inc-title">
                                    <span className={`inc-tag ${inc.status}`}>{inc.status}</span>
                                    <h4>{inc.title}</h4>
                                </div>
                                <span className="inc-date">{inc.date}</span>
                            </div>
                            <p>{inc.update}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="status-footer glass-card">
                <div className="footer-content">
                    <HeartPulse size={32} className="icon-red" />
                    <div>
                        <h4>External Verification</h4>
                        <p>We believe in radical transparency. View our historical uptime on our community-run status trackers.</p>
                    </div>
                </div>
                <button className="external-link-btn">
                    Check Historical Data <ChevronRight size={18} />
                </button>
            </div>
        </div>
    )
}

export default SystemStatus



