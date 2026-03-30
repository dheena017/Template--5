import React from 'react';
import { Shield, Lock, EyeOff, Key } from 'lucide-react';

const Row = ({ label, children }) => (
    <div className="security-panel-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>{label}</span>
        {children}
    </div>
);

const Section = ({ title, icon: Icon, children }) => (
    <div className="security-panel-section" style={{ marginBottom: '2.5rem' }}>
        <div className="section-header" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10b981', marginBottom: '1.25rem' }}>
            <Icon size={16} />
            <h4 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>{title}</h4>
        </div>
        <div className="section-content">
            {children}
        </div>
    </div>
);

const GenericSecurityPanel = ({ settings, setSettings, activeTool }) => {
    const update = (key, val) => setSettings({ ...settings, [key]: val });
    const isProtect = activeTool?.name === 'Protect PDF';
    const isUnlock = activeTool?.name === 'Unlock PDF';

    return (
        <div className="security-panel-content">
            {isProtect && (
                <Section title="Required Security" icon={Key}>
                    <Row label="User Password">
                        <input 
                            type="password"
                            autoComplete="off"
                            placeholder="Enter password..."
                            value={settings.password || ''}
                            onChange={(e) => update('password', e.target.value)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 12px', color: 'white', width: '160px', outline: 'none' }}
                        />
                    </Row>
                </Section>
            )}

            {isUnlock && (
                <Section title="Verification" icon={Key}>
                    <Row label="Current Password">
                        <input 
                            type="password"
                            autoComplete="off"
                            placeholder="Unlock password..."
                            value={settings.unlockPassword || ''}
                            onChange={(e) => update('unlockPassword', e.target.value)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 12px', color: 'white', width: '160px', outline: 'none' }}
                        />
                    </Row>
                </Section>
            )}

            {activeTool?.name === 'Sign PDF' && (
                <Section title="Signature Information" icon={Key}>
                    <Row label="Signee Name">
                        <input 
                            type="text"
                            placeholder="Your name..."
                            value={settings.signeeName || 'Aura Verified User'}
                            onChange={(e) => update('signeeName', e.target.value)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 12px', color: 'white', width: '160px', outline: 'none' }}
                        />
                    </Row>
                </Section>
            )}

            <Section title="Encryption Standard" icon={Shield}>
                <Row label="Algorithm">
                    <select 
                        value={settings.algorithm || 'AES-256'}
                        onChange={(e) => update('algorithm', e.target.value)}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '6px 10px', color: 'white', outline: 'none' }}
                    >
                        <option value="AES-256">AES-256 (Strongest)</option>
                        <option value="AES-128">AES-128 (Standard)</option>
                        <option value="RC4-128">RC4-128 (Legacy)</option>
                    </select>
                </Row>
            </Section>

            <Section title="Permissions Control" icon={Lock}>
                <Row label="Allow Printing">
                    <input 
                        type="checkbox" 
                        checked={settings.allowPrinting ?? true} 
                        onChange={(e) => update('allowPrinting', e.target.checked)} 
                        style={{ accentColor: '#10b981', scale: '1.2' }}
                    />
                </Row>
                <Row label="Allow Selection/Copy">
                    <input 
                        type="checkbox" 
                        checked={settings.allowCopying ?? false} 
                        onChange={(e) => update('allowCopying', e.target.checked)} 
                        style={{ accentColor: '#10b981', scale: '1.2' }}
                    />
                </Row>
                <Row label="Sanitize Metadata">
                   <input 
                        type="checkbox" 
                        checked={settings.sanitize ?? true} 
                        onChange={(e) => update('sanitize', e.target.checked)} 
                        style={{ accentColor: '#10b981', scale: '1.2' }}
                    />
                </Row>
            </Section>
        </div>
    );
};

export default GenericSecurityPanel;
