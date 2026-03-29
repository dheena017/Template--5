import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronRight, Settings2 } from 'lucide-react';
import './ToolSettingsPanel.css';

/** Reusable primitives exported for tool panels to use */
export const Toggle = ({ value, onChange }) => (
    <button className={`tsp-toggle ${value ? 'on' : ''}`} onClick={() => onChange(!value)}>
        <span className="tsp-toggle-thumb" />
    </button>
);

export const Slider = ({ min = 0, max = 100, value, onChange, unit = '' }) => (
    <div className="tsp-slider-wrap">
        <input type="range" min={min} max={max} value={value}
            onChange={e => onChange(Number(e.target.value))} className="tsp-range" />
        <span className="tsp-range-val">{value}{unit}</span>
    </div>
);

export const Sel = ({ value, onChange, options }) => (
    <select className="tsp-select" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
);

export const Inp = ({ value, onChange, placeholder, type = 'text' }) => (
    <input type={type} className="tsp-input" value={value}
        onChange={e => onChange(e.target.value)} placeholder={placeholder} />
);

export const Row = ({ label, children, sub }) => (
    <div className="tsp-row" style={sub ? { paddingLeft: 12 } : {}}>
        <span className="tsp-row-label">{label}</span>
        <div className="tsp-row-ctrl">{children}</div>
    </div>
);

export const BtnGroup = ({ options, value, onChange }) => (
    <div className="tsp-btn-group">
        {options.map(o => (
            <button key={o} className={`tsp-group-btn ${value === o ? 'active' : ''}`}
                onClick={() => onChange(o)}>{o}</button>
        ))}
    </div>
);

export const Chips = ({ options, value, onChange, multi = false }) => (
    <div className="tsp-chip-group">
        {options.map(o => {
            const active = multi ? (value || []).includes(o) : value === o;
            return (
                <button key={o} className={`tsp-chip ${active ? 'active' : ''}`} onClick={() => {
                    if (multi) {
                        const cur = value || [];
                        onChange(active ? cur.filter(x => x !== o) : [...cur, o]);
                    } else onChange(o);
                }}>{o}</button>
            );
        })}
    </div>
);

export const ColorPick = ({ value, onChange }) => (
    <div className="tsp-color-row">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="tsp-color-sw" />
        <input type="text" value={value.toUpperCase()} onChange={e => onChange(e.target.value)} className="tsp-color-hex" maxLength={7} />
    </div>
);

export const Note = ({ children }) => <div className="tsp-note">{children}</div>;

export const Sect = ({ title, icon: Icon, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="tsp-section">
            <button className="tsp-section-header" onClick={() => setOpen(v => !v)}>
                <span className="tsp-section-label">
                    {Icon && <Icon size={12} />}
                    {title}
                </span>
                {open ? <ChevronDown size={13} color="#334155" /> : <ChevronRight size={13} color="#334155" />}
            </button>
            {open && <div className="tsp-section-body">{children}</div>}
        </div>
    );
};

/**
 * ToolSettingsPanel — wrapper that renders any tool-specific panel
 * 
 * Props:
 *   open         boolean
 *   onClose      () => void
 *   onApply      (settings) => void
 *   accentColor  string (hex)
 *   toolName     string
 *   toolIcon     LucideIcon
 *   children     React.ReactNode  (the tool-specific content)
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
                        className="tsp-overlay"
                        style={{ position:'fixed', inset:0, zIndex:8499, background:'rgba(0,0,0,0.35)', backdropFilter:'blur(3px)', WebkitBackdropFilter:'blur(3px)' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        className="tsp-panel"
                        style={{ '--tool-accent': accentColor }}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 360, damping: 36 }}
                    >
                        {/* Header */}
                        <div className="tsp-header">
                            <div className="tsp-header-left">
                                {ToolIcon && (
                                    <div className="tsp-icon-wrap" style={{ background: `${accentColor}22` }}>
                                        <ToolIcon size={18} style={{ color: accentColor }} />
                                    </div>
                                )}
                                <div>
                                    <h3>{toolName} Settings</h3>
                                    <p>Configure tool behaviour</p>
                                </div>
                            </div>
                            <button className="tsp-close-btn" onClick={onClose}><X size={14} /></button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="tsp-content">{children}</div>

                        {/* Footer */}
                        <div className="tsp-footer">
                            <button className="tsp-apply-btn" style={{ background: accentColor }} onClick={onApply}>
                                Apply Settings
                            </button>
                            {onReset && (
                                <button className="tsp-reset-link" onClick={onReset}>Reset to defaults</button>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ToolSettingsPanel;
