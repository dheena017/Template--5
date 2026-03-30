import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight, Settings2, ShieldCheck, Zap } from 'lucide-react';
import '../../styles/SettingsPanel.css';

/** Reusable primitives exported for tool panels to use */
export const Toggle = ({ value, onChange }) => (
    <button className={`aura-toggle ${value ? 'on' : ''}`} onClick={() => onChange(!value)}>
        <span className="aura-toggle-thumb" />
    </button>
);

export const Slider = ({ min = 0, max = 100, value, onChange, unit = '' }) => (
    <div className="aura-slider-row">
        <input type="range" min={min} max={max} value={value}
            onChange={e => onChange(Number(e.target.value))} className="aura-range" />
        <span className="aura-range-val">{value}{unit}</span>
    </div>
);

export const Sel = ({ value, onChange, options }) => (
    <select className="aura-select" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
);

export const Inp = ({ value, onChange, placeholder, type = 'text' }) => (
    <input type={type} className="aura-input" value={value}
        onChange={e => onChange(e.target.value)} placeholder={placeholder} 
        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px', color: 'white', outline: 'none' }} />
);

export const Row = ({ label, children, sub }) => (
    <div className="aura-row" style={sub ? { paddingLeft: 12 } : {}}>
        <span className="aura-row-label">{label}</span>
        <div className="aura-row-ctrl">{children}</div>
    </div>
);

export const BtnGroup = ({ options, value, onChange }) => (
    <div className="aura-btn-group">
        {options.map(o => (
            <button key={o} className={`aura-group-btn ${value === o ? 'active' : ''}`}
                onClick={() => onChange(o)}>{o}</button>
        ))}
    </div>
);

export const Chips = ({ options, value, onChange, multi = false }) => (
    <div className="aura-chip-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {options.map(o => {
            const active = multi ? (value || []).includes(o) : value === o;
            return (
                <button 
                    key={o} 
                    className={`aura-chip ${active ? 'active' : ''}`} 
                    style={{ padding: '6px 12px', borderRadius: '20px', background: active ? 'rgb(var(--aura-accent-rgb))' : 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600 }}
                    onClick={() => {
                        if (multi) {
                            const cur = value || [];
                            onChange(active ? cur.filter(x => x !== o) : [...cur, o]);
                        } else onChange(o);
                    }}
                >
                    {o}
                </button>
            );
        })}
    </div>
);

export const Note = ({ children }) => <div className="aura-note" style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '8px', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', borderLeft: '2px solid rgb(var(--aura-accent-rgb))' }}>{children}</div>;

export const Sect = ({ title, icon: Icon, children, badge }) => {
    return (
        <div className="aura-sect">
            <div className="aura-sect-label">
                {Icon && <Icon size={12} />}
                <span>{title}</span>
                {badge && (
                    <span style={{ fontSize: '0.6rem', fontWeight: 850, padding: '2px 8px', borderRadius: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginLeft: 'auto' }}>
                        {badge}
                    </span>
                )}
            </div>
            <div className="aura-sect-body">{children}</div>
        </div>
    );
};

export const NumberedStep = ({ number, title, description }) => (
    <div className="aura-step-item" style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <div className="aura-step-number" style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900 }}>{number}</div>
        <div className="aura-step-content">
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>{title}</h4>
            <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#64748b' }}>{description}</p>
        </div>
    </div>
);

export const PremiumCard = ({ icon: Icon, title, description, color }) => (
    <div className="aura-premium-card" style={{ marginBottom: '16px' }}>
        <div className="aura-card-icon" style={{ color: color, background: `${color}15` }}>
            {Icon && <Icon size={16} />}
        </div>
        <h5 className="aura-card-title">{title}</h5>
        <p className="aura-card-desc">{description}</p>
    </div>
);

/**
 * ToolSettingsPanel — premium wrapper that renders any tool-specific panel
 */
const ToolSettingsPanel = ({
    open, onClose, onApply,
    accentColor = '#8b5cf6', toolName, toolIcon: ToolIcon,
    onReset, children
}) => {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="aura-panel-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        className="aura-settings-panel"
                        style={{ '--aura-accent-rgb': accentColor.startsWith('#') ? hexToRgb(accentColor) : '139, 92, 246' }}
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        <div className="aura-panel-header">
                            <div className="aura-header-group">
                                <div className="aura-header-icon" style={{ background: `${accentColor}15`, borderColor: `${accentColor}25` }}>
                                    {ToolIcon ? <ToolIcon size={22} style={{ color: accentColor }} /> : <Settings2 size={22} style={{ color: accentColor }} />}
                                </div>
                                <div className="aura-header-text">
                                    <h3>Tool Settings</h3>
                                    <p>{toolName} • Engine Hub</p>
                                </div>
                            </div>
                            <button className="aura-close-btn" onClick={onClose}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="aura-panel-content">
                            {children}
                        </div>

                        {/* Footer */}
                        <div className="aura-panel-footer">
                            <button className="aura-apply-btn" style={{ background: accentColor }} onClick={onApply}>
                                Apply Settings
                            </button>
                            {onReset && (
                                <button className="aura-reset-btn" onClick={onReset}>
                                    Restore Engine Defaults
                                </button>
                            )}
                            
                            <div className="aura-footer-info">
                                <ShieldCheck size={12} />
                                <span>Aura Platform • Neural v2.4</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Helper to convert hex to rgb for styling
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
        : '139, 92, 246';
}

export default ToolSettingsPanel;
