import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings, X, Moon, Sun, Zap, Monitor, Grid, Sliders, Bell,
    Palette, Eye, Type, Volume2, Keyboard, ChevronRight, RotateCcw,
    Cpu, Globe, Download, Shield, Layout, PanelRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import '../styles/SettingsPanel.css';

// ── Mini primitives ────────────────────────────────────────────────
const Toggle = ({ value, onChange }) => (
    <button className={`aura-toggle ${value ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); onChange(!value); }}>
        <span className="aura-toggle-thumb" />
    </button>
);

const Slider = ({ min = 0, max = 100, value, onChange, unit = '' }) => (
    <div className="aura-slider-row" onClick={(e) => e.stopPropagation()}>
        <input type="range" min={min} max={max} value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="aura-range" />
        <span className="aura-range-val">{value}{unit}</span>
    </div>
);

const Select = ({ value, onChange, options }) => (
    <select className="aura-select" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
);

const SectionTitle = ({ icon: Icon, label }) => (
    <div className="aura-sect-label">
        <Icon size={12} />
        <span>{label}</span>
    </div>
);

const Row = ({ label, children }) => (
    <div className="aura-row">
        <span className="aura-row-label">{label}</span>
        <div className="aura-row-ctrl">{children}</div>
    </div>
);

// ── Color swatches ─────────────────────────────────────────────────
const ACCENT_COLORS = [
    { label: 'Violet',  value: '#8b5cf6' },
    { label: 'Blue',    value: '#3b82f6' },
    { label: 'Cyan',    value: '#06b6d4' },
    { label: 'Green',   value: '#10b981' },
    { label: 'Amber',   value: '#f59e0b' },
    { label: 'Rose',    value: '#f43f5e' },
    { label: 'Pink',    value: '#ec4899' },
    { label: 'Orange',  value: '#f97316' },
];

// ── Panel Sections ─────────────────────────────────────────────────
const SECTIONS = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'display',    label: 'Display',    icon: Monitor },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'performance',label: 'Performance',icon: Cpu },
    { id: 'privacy',    label: 'Privacy',    icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'shortcuts',  label: 'Shortcuts',  icon: Keyboard },
];

// ── Main Component ─────────────────────────────────────────────────
const RightSettingsPanel = ({ open, setOpen }) => {
    const [section, setSection] = useState('appearance');
    const { animationsEnabled, setAnimationsEnabled, auraBackground, setAuraBackground } = useTheme();

    // Local settings state
    const [accentColor, setAccentColor]     = useState('#8b5cf6');
    const [darkMode, setDarkMode]           = useState(true);
    const [sidebarWidth, setSidebarWidth]   = useState(260);
    const [contentWidth, setContentWidth]   = useState(1500);
    const [fontSize, setFontSize]           = useState(14);
    const [fontFamily, setFontFamily]       = useState('Inter');
    const [lineHeight, setLineHeight]       = useState(160);
    const [uiBlur, setUiBlur]               = useState(20);
    const [uiOpacity, setUiOpacity]         = useState(90);
    const [panelRounded, setPanelRounded]   = useState(true);
    const [compactMode, setCompactMode]     = useState(false);
    const [showPageNums, setShowPageNums]   = useState(true);
    const [thumbnailSize, setThumbnailSize] = useState('medium');
    const [gridColumns, setGridColumns]     = useState('auto');
    const [lazyLoad, setLazyLoad]           = useState(true);
    const [hardwareAccel, setHardwareAccel] = useState(true);
    const [autoClearDownloads, setAutoClearDownloads] = useState(false);
    const [localStorageOnly, setLocalStorageOnly] = useState(true);
    const [analyticsOpt, setAnalyticsOpt]   = useState(false);
    const [crashReports, setCrashReports]   = useState(true);
    const [notifSystem, setNotifSystem]     = useState(true);
    const [notifComplete, setNotifComplete] = useState(true);
    const [notifUpdates, setNotifUpdates]   = useState(false);
    const [notifSound, setNotifSound]       = useState(false);
    const [notifVolume, setNotifVolume]     = useState(60);
    const [language, setLanguage]           = useState('en');

    // Apply accent color to CSS vars
    useEffect(() => {
        document.documentElement.style.setProperty('--accent-primary', accentColor);
    }, [accentColor]);

    const resetAll = () => {
        setAccentColor('#8b5cf6');
        setDarkMode(true);
        setSidebarWidth(260);
        setContentWidth(1500);
        setFontSize(14);
        setFontFamily('Inter');
        setLineHeight(160);
        setUiBlur(20);
        setUiOpacity(90);
        setPanelRounded(true);
        setCompactMode(false);
        setThumbnailSize('medium');
        setGridColumns('auto');
        setAutoClearDownloads(false);
        setLocalStorageOnly(true);
        setNotifVolume(60);
        setAnimationsEnabled(true);
        setAuraBackground(true);
        document.documentElement.style.setProperty('--accent-primary', '#8b5cf6');
    };

    const renderSection = () => {
        switch (section) {
            case 'appearance': return (
                <div className="aura-panel-content" style={{ padding: 0 }}>
                    <SectionTitle icon={Palette} label="Theme" />
                    <Row label="Color Mode">
                        <div className="aura-btn-group">
                            <button className={`aura-group-btn ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(true)}>
                                <Moon size={14}/> Dark
                            </button>
                            <button className={`aura-group-btn ${!darkMode ? 'active' : ''}`} onClick={() => setDarkMode(false)}>
                                <Sun size={14}/> Light
                            </button>
                        </div>
                    </Row>
                    <Row label="Accent Color">
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {ACCENT_COLORS.map(c => (
                                <button
                                    key={c.value}
                                    style={{ width: '22px', height: '22px', borderRadius: '6px', border: accentColor === c.value ? '2px solid white' : '2px solid transparent', background: c.value, cursor: 'pointer' }}
                                    onClick={(e) => { e.stopPropagation(); setAccentColor(c.value); }}
                                    title={c.label}
                                />
                            ))}
                        </div>
                    </Row>

                    <SectionTitle icon={Eye} label="Visual Effects" />
                    <Row label="Aura Background"><Toggle value={auraBackground} onChange={setAuraBackground} /></Row>
                    <Row label="Animations"><Toggle value={animationsEnabled} onChange={setAnimationsEnabled} /></Row>
                    <Row label="Glassmorphism"><Toggle value={panelRounded} onChange={setPanelRounded} /></Row>
                    <Row label={`Blur Intensity (${uiBlur}px)`}><Slider min={0} max={40} value={uiBlur} onChange={setUiBlur} unit="px" /></Row>
                    <Row label={`Panel Opacity (${uiOpacity}%)`}><Slider min={60} max={100} value={uiOpacity} onChange={setUiOpacity} unit="%" /></Row>
                </div>
            );

            case 'display': return (
                <div className="aura-panel-content" style={{ padding: 0 }}>
                    <SectionTitle icon={Layout} label="Layout" />
                    <Row label="Compact Mode"><Toggle value={compactMode} onChange={setCompactMode} /></Row>
                    <Row label="Show Page Numbers"><Toggle value={showPageNums} onChange={setShowPageNums} /></Row>
                    <Row label={`Sidebar Width (${sidebarWidth}px)`}><Slider min={200} max={340} value={sidebarWidth} onChange={setSidebarWidth} unit="px" /></Row>
                    <Row label={`Content Width (${contentWidth}px)`}><Slider min={900} max={1800} value={contentWidth} onChange={setContentWidth} unit="px" /></Row>

                    <SectionTitle icon={Grid} label="Grid & Thumbnails" />
                    <Row label="Thumbnail Size">
                        <Select value={thumbnailSize} onChange={setThumbnailSize} options={['small','medium','large']} />
                    </Row>
                    <Row label="Grid Columns">
                        <Select value={gridColumns} onChange={setGridColumns} options={['auto','2','3','4','6']} />
                    </Row>

                    <SectionTitle icon={Globe} label="Localization" />
                    <Row label="Language">
                        <Select value={language} onChange={setLanguage} options={[
                            {value:'en', label:'English'},{value:'es', label:'Español'},
                            {value:'fr', label:'Français'},{value:'de', label:'Deutsch'}
                        ]} />
                    </Row>
                </div>
            );

            case 'typography': return (
                <div className="aura-panel-content" style={{ padding: 0 }}>
                    <SectionTitle icon={Type} label="Font Settings" />
                    <Row label="Font Family">
                        <Select value={fontFamily} onChange={setFontFamily} options={[
                            'Inter','Roboto','Outfit','Plus Jakarta Sans'
                        ]} />
                    </Row>
                    <Row label={`Base Font Size (${fontSize}px)`}><Slider min={12} max={20} value={fontSize} onChange={setFontSize} unit="px" /></Row>
                    <Row label={`Line Height (${lineHeight}%)`}><Slider min={120} max={220} value={lineHeight} onChange={setLineHeight} unit="%" /></Row>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px', color: 'white', marginTop: '12px', fontFamily, fontSize, lineHeight: `${lineHeight}%` }}>
                        <p>The quick brown fox jumps over the lazy dog.</p>
                        <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Aura Platform — Premium Toolset</p>
                    </div>
                </div>
            );

            case 'privacy': return (
                <div className="aura-panel-content" style={{ padding: 0 }}>
                    <SectionTitle icon={Shield} label="Data & Privacy" />
                    <Row label="Usage Analytics"><Toggle value={analyticsOpt} onChange={setAnalyticsOpt} /></Row>
                    <Row label="Crash Reports"><Toggle value={crashReports} onChange={setCrashReports} /></Row>
                    <Row label="Local Storage Only"><Toggle value={localStorageOnly} onChange={setLocalStorageOnly} /></Row>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: '#64748b', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', marginTop: '12px' }}>
                        <Shield size={12}/> Your files stay on your device and are never exported to external servers.
                    </div>
                </div>
            );

            case 'shortcuts': return (
                <div className="aura-panel-content" style={{ padding: 0 }}>
                    <SectionTitle icon={Keyboard} label="Keyboard Shortcuts" />
                    {[
                        ['Open Settings',      'Ctrl + ,'],
                        ['Quick Search',       'Ctrl + K'],
                        ['Toggle Sidebar',     'Ctrl + B'],
                    ].map(([name, key]) => (
                        <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.85rem' }}>
                            <span style={{ color: '#94a3b8' }}>{name}</span>
                            <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>{key}</kbd>
                        </div>
                    ))}
                </div>
            );

            default: return (
                <div className="aura-panel-content" style={{ padding: 0 }}>
                    <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.3 }}>
                        <Cpu size={48} style={{ margin: '0 auto 16px' }} />
                        <p>Advanced feature config under development.</p>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="aura-panel-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="aura-settings-panel"
                        style={{ '--aura-accent-rgb': hexToRgb(accentColor) }}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="aura-panel-header">
                            <div className="aura-header-group">
                                <div className="aura-header-icon">
                                    <PanelRight size={22} style={{ color: accentColor }} />
                                </div>
                                <div className="aura-header-text">
                                    <h3>App Settings</h3>
                                    <p>Global Configuration</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="aura-close-btn" onClick={resetAll} title="Reset All">
                                    <RotateCcw size={15} />
                                </button>
                                <button className="aura-close-btn" onClick={() => setOpen(false)} title="Close">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="aura-panel-split-body">
                            <nav className="aura-panel-nav">
                                {SECTIONS.map(sec => (
                                    <button
                                        key={sec.id}
                                        className={`aura-nav-link ${section === sec.id ? 'active' : ''}`}
                                        onClick={() => setSection(sec.id)}
                                    >
                                        <sec.icon size={15} />
                                        <span>{sec.label}</span>
                                        {section === sec.id && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
                                    </button>
                                ))}
                            </nav>

                            <div className="aura-panel-tab-content">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={section}
                                        initial={{ opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -8 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        {renderSection()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="aura-panel-footer">
                            <button className="aura-apply-btn" onClick={() => setOpen(false)}>
                                Save & Close
                            </button>
                            <div className="aura-footer-info">
                                <span>Aura Platform v2.1.0</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Helper
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '139, 92, 246';
}

export default RightSettingsPanel;
