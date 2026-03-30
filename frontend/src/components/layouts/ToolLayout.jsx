import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Home, Settings, HelpCircle, ArrowLeft, X, BookOpen, Lightbulb, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ToolLayout.css';
import { useSettings } from '../../context/SettingsContext';
import ToolHelpDrawer from '../help/ToolHelpDrawer';

const ToolLayout = ({ children, title, subtitle, icon: Icon, color, category }) => {
    const navigate = useNavigate();
    const { toggleTool } = useSettings();
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <div className="aura-tool-layout-shell">
            <ToolHelpDrawer 
                isOpen={helpOpen} 
                onClose={() => setHelpOpen(false)} 
                toolName={title}
                toolCategory={category}
                color={color}
            />

            <div className="tool-layout-background">
                <div className="layout-orb orb-top" style={{ background: `radial-gradient(circle, ${color}15 0%, transparent 70%)` }}></div>
                <div className="layout-orb orb-bottom" style={{ background: `radial-gradient(circle, ${color}10 0%, transparent 70%)` }}></div>
            </div>

            <header className="tool-layout-navbar">
                <div className="breadcrumb-line premium">
                    <button className="bc-home-aura" onClick={() => navigate('/dashboard')}>
                        <Home size={14} />
                    </button>
                    <ChevronRight size={12} className="bc-sep" />
                    <span className="bc-cat-aura">{category}</span>
                    <ChevronRight size={12} className="bc-sep" />
                    <span className="bc-active-aura">{title}</span>
                </div>
                <div className="tool-nav-actions-premium">
                    <button className="nav-action-btn-aura" onClick={toggleTool} title="Tool Settings">
                        <Settings size={18} />
                    </button>
                    <button 
                        className={`nav-action-btn-aura ${helpOpen ? 'active' : ''}`} 
                        onClick={() => setHelpOpen(true)}
                        title="Help & Documentation"
                    >
                        <HelpCircle size={18} />
                    </button>
                    <button className="nav-action-btn-aura close" onClick={() => navigate(-1)} title="Close Tool">
                        <X size={18} />
                    </button>
                </div>
            </header>

            <main className="tool-layout-content">
                <div className="tool-header-hero">
                    <motion.div 
                        className="tool-icon-canvas-premium"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ background: `${color}15`, color: color }}
                    >
                        <Icon size={40} />
                    </motion.div>
                    <div className="tool-header-text">
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {title}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {subtitle}
                        </motion.p>
                    </div>
                </div>

                <div className="tool-workspace">
                    {children}
                </div>
            </main>

            <footer className="tool-layout-footer">
                <button className="footer-back-link" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back
                </button>
                <div className="footer-meta">
                    <span className="meta-tag">Aura Engine v2.4</span>
                    <span className="meta-sep"></span>
                    <span className="meta-tag">Secure Mode Active</span>
                </div>
            </footer>
        </div>
    );
};

export default ToolLayout;
