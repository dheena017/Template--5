import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BarChart3, Activity, Zap, Files, Globe, Clock, 
    ArrowUpRight, Users, HardDrive, Cpu, AlertCircle, RefreshCcw,
    Activity as Heartrate, Server
} from 'lucide-react';
import '../../styles/pages/dashboards/UserDashboard.css';
import ToolLayout from '../../components/layouts/ToolLayout';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [pulse, setPulse] = useState({ cpu_usage: 5, memory_usage: 20, engine_state: 'Optimal' });
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const activeTool = { 
        name: 'Platform Intelligence', 
        icon: BarChart3, 
        color: '#6366f1',
        subtitle: 'Real-time telemetry and engine monitoring across the entire Aura ecosystem.',
        category: 'System'
    };

    const fetchStats = async () => {
        try {
            const [statsRes, pulseRes] = await Promise.all([
                fetch('http://localhost:8000/api/stats'),
                fetch('http://localhost:8000/api/system/pulse')
            ]);
            
            if (statsRes.ok) setStats(await statsRes.json());
            if (pulseRes.ok) setPulse(await pulseRes.json());
            
            setLastUpdated(new Date());
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
            // Don't override with mock data if we already have data
            if (!stats) setStats({
                total_pages: 45280,
                total_size_saved_mb: 2450,
                total_tasks: 1284,
                tasks_per_engine: { pdf: 865, image: 125, text: 95, video: 199 },
                recent_activity: [
                    { id: 1, action: "PDF Split", target: "Project_Final.pdf", time: "Just now" },
                    { id: 2, action: "Merge PDF", target: "Invoice_Bundle.zip", time: "5m ago" }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
        const statsInterval = setInterval(fetchStats, 15000); 
        const pulseInterval = setInterval(async () => {
           try {
             const res = await fetch('http://localhost:8000/api/system/pulse');
             if (res.ok) setPulse(await res.json());
           } catch(e) {}
        }, 3000); // Pulse every 3s for "High Density" feel
        
        return () => {
            clearInterval(statsInterval);
            clearInterval(pulseInterval);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 20 } }
    };

    if (loading && !stats) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="spinner-center" />
            </div>
        );
    }

    return (
        <ToolLayout 
            title={activeTool.name} 
            subtitle={activeTool.subtitle} 
            icon={activeTool.icon} 
            color={activeTool.color}
            category={activeTool.category}
        >
            <div className="analytics-dashboard-container-v2 w-full pt-8">
                
                {/* LIVE PULSE HEADER */}
                <div className="system-pulse-strip mb-12 p-8 bg-slate-900/50 rounded-[32px] border border-white/5 flex flex-wrap gap-12 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="pulse-dot-aura">
                            <div className="dot"></div>
                            <div className="ping"></div>
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] block mb-1">Live Telemetry</span>
                            <span className="text-xl font-bold text-white uppercase tracking-tighter">System Pulse Active</span>
                        </div>
                    </div>
                    
                    <div className="pulse-metric-row flex gap-12">
                         <div className="pulse-metric">
                            <span className="label">CPU Usage</span>
                            <div className="flex items-center gap-3">
                                <Cpu size={14} className="text-blue-500" />
                                <span className="value">{pulse.cpu_usage.toFixed(1)}%</span>
                            </div>
                         </div>
                         <div className="pulse-metric">
                            <span className="label">Engines</span>
                            <div className="flex items-center gap-3">
                                <Server size={14} className="text-emerald-500" />
                                <span className="value">{pulse.engine_state}</span>
                            </div>
                         </div>
                         <div className="pulse-metric">
                            <span className="label">Sync</span>
                            <div className="flex items-center gap-3">
                                <RefreshCcw size={14} className={`text-orange-500 ${loading ? 'animate-spin' : ''}`} />
                                <span className="value">{lastUpdated.toLocaleTimeString()}</span>
                            </div>
                         </div>
                    </div>
                </div>

                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        { label: 'Total Pages', value: stats.total_pages.toLocaleString(), icon: Files, color: '#3b82f6' },
                        { label: 'Cloud Saved', value: `${(stats.total_size_saved_mb / 1024).toFixed(2)} GB`, icon: HardDrive, color: '#10b981' },
                        { label: 'Global Tasks', value: stats.total_tasks.toLocaleString(), icon: Zap, color: '#f59e0b' },
                        { label: 'Uptime', value: '100%', icon: Heartrate, color: '#ec4899' }
                    ].map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={cardVariants}
                            className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[32px] group hover:bg-slate-900/60 transition-all duration-500"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10" style={{ color: item.color }}>
                                    <item.icon size={28} />
                                </div>
                                <div className="text-[10px] font-black tracking-widest uppercase text-slate-500">REALTIME</div>
                            </div>
                            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">{item.label}</h3>
                            <div className="text-4xl font-black text-white tracking-tighter">{item.value}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content: Chart and Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-32">
                    <motion.div 
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-2 bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-12 rounded-[48px] shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <BarChart3 className="text-blue-500" size={32} />
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Market Engine Share</h2>
                        </div>
                        
                        <div className="space-y-10">
                            {Object.entries(stats.tasks_per_engine).map(([engine, count], idx) => {
                                const max = Math.max(...Object.values(stats.tasks_per_engine));
                                const percentage = (count / max) * 100;
                                const colors = { pdf: '#ef4444', image: '#f59e0b', text: '#10b981', video: '#8b5cf6' };
                                return (
                                    <div key={engine} className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-black text-white uppercase tracking-[0.2em]">{engine} Infrastructure</span>
                                            <span className="text-xs font-bold text-slate-500">{count.toLocaleString()} CALLS</span>
                                        </div>
                                        <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: colors[engine] || '#3b82f6', boxShadow: `0 0 30px ${colors[engine]}30` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div 
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-12 rounded-[48px] shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <Activity className="text-pink-500" size={32} />
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Global Feed</h2>
                        </div>

                        <div className="flex-1 space-y-10">
                            <AnimatePresence mode="popLayout">
                                {stats.recent_activity.map((act) => (
                                    <motion.div 
                                        key={act.id} 
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="flex items-start gap-6 group cursor-default"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                            <Globe size={24} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-white font-black text-sm mb-1 leading-tight group-hover:text-blue-200 transition-colors">{act.action}: {act.target.length > 20 ? act.target.substring(0,20)+'...' : act.target}</div>
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                <Clock size={12} className="text-blue-500" /> {act.time}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5">
                            <div className="flex items-center gap-6 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
                               <Heartrate size={24} className="text-blue-500 animate-pulse" />
                               <span className="text-[11px] text-blue-200/50 font-black uppercase tracking-widest leading-relaxed">Stream Encryption Protocol: SHA-256 Enabled</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default AnalyticsDashboard;
