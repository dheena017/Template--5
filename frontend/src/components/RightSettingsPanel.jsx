import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings, X, Moon, Sun, Zap, Monitor, Grid, Sliders, Bell,
    Palette, Eye, Type, Volume2, Keyboard, ChevronRight, RotateCcw,
    Cpu, Globe, Download, Shield, Layout, PanelRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './RightSettingsPanel.css';

// ── Mini primitives ────────────────────────────────────────────────
const Toggle = ({ value, onChange }) => (
    <button className={`rsp-toggle ${value ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); onChange(!value); }}>
        <span className="rsp-thumb" />
    </button>
);

const Slider = ({ min = 0, max = 100, value, onChange, unit = '' }) => (
    <div className="rsp-slider-row" onClick={(e) => e.stopPropagation()}>
        <input type="range" min={min} max={max} value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="rsp-range" />
        <span className="rsp-range-val">{value}{unit}</span>
    </div>
);

const Select = ({ value, onChange, options }) => (
    <select className="rsp-select" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
);

const SectionTitle = ({ icon: Icon, label }) => (
    <div className="rsp-section-title">
        <Icon size={13} />
        <span>{label}</span>
    </div>
);

const Row = ({ label, children }) => (
    <div className="rsp-row">
        <span className="rsp-row-label">{label}</span>
        <div className="rsp-row-ctrl">{children}</div>
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
                <div className="rsp-section-body">
                    <SectionTitle icon={Palette} label="Theme" />
                    <Row label="Color Mode">
                        <div className="rsp-btn-group">
                            <button className={`rsp-mode-btn ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(true)}>
                                <Moon size={14}/> Dark
                            </button>
                            <button className={`rsp-mode-btn ${!darkMode ? 'active' : ''}`} onClick={() => setDarkMode(false)}>
                                <Sun size={14}/> Light
                            </button>
                        </div>
                    </Row>
                    <Row label="Accent Color">
                        <div className="rsp-swatch-grid">
                            {ACCENT_COLORS.map(c => (
                                <button
                                    key={c.value}
                                    className={`rsp-swatch ${accentColor === c.value ? 'selected' : ''}`}
                                    style={{ background: c.value }}
                                    onClick={(e) => { e.stopPropagation(); setAccentColor(c.value); }}
                                    title={c.label}
                                />
                            ))}
                        </div>
                    </Row>
                    <Row label="Custom Accent">
                        <div className="rsp-color-row">
                            <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="rsp-color-swatch" />
                            <input type="text"  value={accentColor.toUpperCase()} onChange={e => setAccentColor(e.target.value)} className="rsp-color-hex" maxLength={7} />
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
                <div className="rsp-section-body">
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
                    <Row label="Lazy Load Images"><Toggle value={lazyLoad} onChange={setLazyLoad} /></Row>

                    <SectionTitle icon={Globe} label="Localization" />
                    <Row label="Language">
                        <Select value={language} onChange={setLanguage} options={[
                            {value:'en', label:'English'},{value:'es', label:'Español'},
                            {value:'fr', label:'Français'},{value:'de', label:'Deutsch'},
                            {value:'zh', label:'中文'},{value:'ja', label:'日本語'},
                            {value:'ar', label:'العربية'},{value:'hi', label:'हिंदी'},
                        ]} />
                    </Row>
                </div>
            );

            case 'typography': return (
                <div className="rsp-section-body">
                    <SectionTitle icon={Type} label="Font Settings" />
                    <Row label="Font Family">
                        <Select value={fontFamily} onChange={setFontFamily} options={[
                            'Inter','Roboto','Open Sans','Poppins','Lato','Nunito',
                            'Source Sans Pro','Outfit','Plus Jakarta Sans'
                        ]} />
                    </Row>
                    <Row label={`Base Font Size (${fontSize}px)`}><Slider min={12} max={20} value={fontSize} onChange={setFontSize} unit="px" /></Row>
                    <Row label={`Line Height (${lineHeight}%)`}><Slider min={120} max={220} value={lineHeight} onChange={setLineHeight} unit="%" /></Row>
                    <div className="rsp-type-preview" style={{ fontFamily, fontSize, lineHeight: `${lineHeight}%` }}>
                        <p>The quick brown fox jumps over the lazy dog.</p>
                        <p className="text-sm text-slate-400">Aura Platform — Premium Toolset</p>
                    </div>
                </div>
            );

            case 'performance': return (
                <div className="rsp-section-body">
                    <SectionTitle icon={Zap} label="Rendering" />
                    <Row label="Animations"><Toggle value={animationsEnabled} onChange={setAnimationsEnabled} /></Row>
                    <Row label="Hardware Acceleration"><Toggle value={hardwareAccel} onChange={setHardwareAccel} /></Row>
                    <Row label="Lazy Loading"><Toggle value={lazyLoad} onChange={setLazyLoad} /></Row>

                    <SectionTitle icon={Download} label="Storage & Cache" />
                    <Row label="Auto-Clear Downloads"><Toggle value={autoClearDownloads} onChange={setAutoClearDownloads} /></Row>
                    <Row label="PDF Cache">
                        <button className="rsp-action-btn">Clear Cache</button>
                    </Row>
                    <Row label="Thumbnails Cache">
                        <button className="rsp-action-btn">Clear Cache</button>
                    </Row>
                </div>
            );

            case 'privacy': return (
                <div className="rsp-section-body">
                    <SectionTitle icon={Shield} label="Data & Privacy" />
                    <Row label="Usage Analytics"><Toggle value={analyticsOpt} onChange={setAnalyticsOpt} /></Row>
                    <Row label="Crash Reports"><Toggle value={crashReports} onChange={setCrashReports} /></Row>
                    <Row label="Local Storage Only"><Toggle value={localStorageOnly} onChange={setLocalStorageOnly} /></Row>
                    <Row label="Clear All Data">
                        <button className="rsp-action-btn danger">Clear Now</button>
                    </Row>
                    <div className="rsp-privacy-note">
                        <Shield size={12}/> Your files are processed locally and never stored on our servers.
                    </div>
                </div>
            );

            case 'notifications': return (
                <div className="rsp-section-body">
                    <SectionTitle icon={Bell} label="Notification Preferences" />
                    <Row label="System Alerts"><Toggle value={notifSystem} onChange={setNotifSystem} /></Row>
                    <Row label="Task Complete"><Toggle value={notifComplete} onChange={setNotifComplete} /></Row>
                    <Row label="Product Updates"><Toggle value={notifUpdates} onChange={setNotifUpdates} /></Row>
                    <Row label="Sound Effects"><Toggle value={notifSound} onChange={setNotifSound} /></Row>
                    {notifSound && <Row label="Volume"><Slider min={0} max={100} value={notifVolume} onChange={setNotifVolume} unit="%" /></Row>}
                </div>
            );

            case 'shortcuts': return (
                <div className="rsp-section-body">
                    <SectionTitle icon={Keyboard} label="Keyboard Shortcuts" />
                    {[
                        ['Open Settings',      'Ctrl + ,'],
                        ['Quick Search',       'Ctrl + K'],
                        ['Deep Focus Mode',    'Ctrl + Shift + F'],
                        ['Undo',               'Ctrl + Z'],
                        ['Redo',               'Ctrl + Y'],
                        ['Select All Pages',   'Ctrl + A'],
                        ['Delete Selected',    'Delete'],
                        ['Clear Selection',    'Escape'],
                        ['Next Tool',          'Tab'],
                        ['Toggle Sidebar',     'Ctrl + B'],
                    ].map(([name, key]) => (
                        <div key={name} className="rsp-shortcut-row">
                            <span>{name}</span>
                            <kbd>{key}</kbd>
                        </div>
                    ))}
                </div>
            );

            default: return null;
        }
    };

    return (
        <>
            {/* Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="rsp-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Slide-In Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="rsp-panel"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 340, damping: 34 }}
                        onClick={(e) => e.stopPropagation()} // Critical for avoiding overlay closers
                    >
                        {/* Header */}
                        <div className="rsp-header">
                            <div className="rsp-header-title">
                                <PanelRight size={18} />
                                <span>App Settings</span>
                            </div>
                            <div className="rsp-header-actions">
                                <button className="rsp-icon-btn" onClick={resetAll} title="Reset All">
                                    <RotateCcw size={15} />
                                </button>
                                <button className="rsp-icon-btn close" onClick={() => setOpen(false)} title="Close">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Body: sidebar nav + content */}
                        <div className="rsp-body">
                            <nav className="rsp-nav">
                                {SECTIONS.map(sec => (
                                    <button
                                        key={sec.id}
                                        className={`rsp-nav-btn ${section === sec.id ? 'active' : ''}`}
                                        onClick={() => setSection(sec.id)}
                                    >
                                        <sec.icon size={15} />
                                        <span>{sec.label}</span>
                                        {section === sec.id && <ChevronRight size={12} className="rsp-nav-arrow" />}
                                    </button>
                                ))}
                            </nav>

                            <div className="rsp-content">
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

                        {/* Footer */}
                        <div className="rsp-footer">
                            <span>Aura Platform v2.1.0</span>
                            <button className="rsp-save-btn" onClick={() => setOpen(false)}>
                                Save & Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RightSettingsPanel;
