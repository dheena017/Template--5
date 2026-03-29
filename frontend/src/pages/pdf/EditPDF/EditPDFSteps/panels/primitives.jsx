/**
 * Shared primitives for all Edit PDF panel components.
 * Import these in each panel file.
 */
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const Row = ({ label, children }) => (
    <div className="settings-row">
        <label className="settings-label">{label}</label>
        <div className="settings-control">{children}</div>
    </div>
);

export const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="settings-section">
            <button className="section-header" onClick={() => setOpen(v => !v)}>
                <span>{title}</span>
                {open ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
            </button>
            {open && <div className="section-body">{children}</div>}
        </div>
    );
};

export const SliderInput = ({ min = 0, max = 100, value, onChange, unit = '' }) => (
    <div className="slider-input-row">
        <input type="range" min={min} max={max} value={value}
            onChange={e => onChange(Number(e.target.value))} className="range-slider" />
        <span className="slider-value">{value}{unit}</span>
    </div>
);

export const SelectInput = ({ value, onChange, options }) => (
    <select value={value} onChange={e => onChange(e.target.value)} className="settings-select">
        {options.map(o => (
            <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
                {typeof o === 'string' ? o : o.label}
            </option>
        ))}
    </select>
);

export const ColorInput = ({ value, onChange }) => (
    <div className="color-input-row">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="color-swatch" />
        <input type="text" value={value.toUpperCase()} onChange={e => onChange(e.target.value)} className="color-hex" maxLength={7} />
    </div>
);

export const Toggle = ({ value, onChange }) => (
    <button className={`toggle-btn ${value ? 'active' : ''}`} onClick={() => onChange(!value)}>
        <div className="toggle-thumb" />
        <span>{value ? 'On' : 'Off'}</span>
    </button>
);

export const ButtonGroup = ({ options, value, onChange }) => (
    <div className="btn-group">
        {options.map(o => (
            <button
                key={typeof o === 'string' ? o : o.value}
                className={`btn-group-item ${value === (typeof o === 'string' ? o : o.value) ? 'active' : ''}`}
                onClick={() => onChange(typeof o === 'string' ? o : o.value)}
            >
                {typeof o === 'string' ? o : (o.icon ? <o.icon size={14}/> : o.label)}
            </button>
        ))}
    </div>
);
