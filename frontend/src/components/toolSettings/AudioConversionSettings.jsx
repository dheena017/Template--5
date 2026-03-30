import React from 'react';
import { 
    Music, 
    Zap, 
    Volume2,
    Activity,
    Mic2,
    ShieldCheck
} from 'lucide-react';
import ToolSettingsPanel, { Sect, Row, BtnGroup, NumberedStep, PremiumCard } from './ToolSettingsPanel';

export const AudioConversionSettings = ({ open, onClose, settings, setSettings }) => {
    const handleApply = () => {
        onClose();
    };

    const handleReset = () => {
        setSettings({
            quality: 'High',
            bitrate: '320kbps',
            sampleRate: '44100Hz',
            channels: 'Stereo',
            normalize: true
        });
    };

    return (
        <ToolSettingsPanel 
            open={open} 
            onClose={onClose} 
            toolName="Audio Engine"
            toolIcon={Music}
            accentColor="#a855f7"
            onApply={handleApply}
            onReset={handleReset}
        >
            <Sect title="Fidelity Configuration" icon={Activity} badge="Pro Mode">
                <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.03)', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', margin: 0 }}>Acoustic Synthesis</h2>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Configure high-fidelity audio parameters for studio-grade results.</p>
                </div>

                <div className="tsp-section-premium">
                    <label className="tsp-label-premium">Output Quality Profile</label>
                    <div className="tsp-toggle-stack">
                        {[
                            { id: 'Low', label: 'Ecomony (128k)', desc: 'Optimized for low bandwidth' },
                            { id: 'Balanced', label: 'Standard (192k)', desc: 'Balanced for all devices' },
                            { id: 'High', label: 'Studio (320k)', desc: 'Maximum acoustic fidelity' }
                        ].map(q => (
                            <div 
                                key={q.id}
                                className={`tsp-toggle-item ${settings.quality === q.id ? 'active' : ''}`}
                                onClick={() => setSettings({ ...settings, quality: q.id })}
                            >
                                <div className="item-info">
                                    <span className="item-label">{q.label}</span>
                                    <span className="item-desc">{q.desc}</span>
                                </div>
                                <div className={`tsp-radio ${settings.quality === q.id ? 'checked' : ''}`}></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="tsp-premium-cards-grid">
                    <PremiumCard 
                        icon={Mic2} 
                        title="Dynamics" 
                        color="#a855f7" 
                        description="Maintains original amplitude range." 
                    />
                    <PremiumCard 
                        icon={ShieldCheck} 
                        title="Integrity" 
                        color="#10b981" 
                        description="Ensures zero artifacting in high ranges." 
                    />
                </div>
            </Sect>

            <Sect title="Digital Signal Processing" icon={Zap}>
                <Row label="Sample Rate Profile">
                    <select 
                        value={settings.sampleRate}
                        onChange={(e) => setSettings({ ...settings, sampleRate: e.target.value })}
                        className="tsp-select-element"
                        style={{ maxWidth: '140px' }}
                    >
                        <option>44100Hz</option>
                        <option>48000Hz</option>
                        <option>96000Hz</option>
                    </select>
                </Row>
                <div style={{ marginTop: '16px' }} className="tsp-checkbox-list">
                    <label className="tsp-checkbox-item">
                        <input 
                            type="checkbox" 
                            checked={settings.normalize}
                            onChange={(e) => setSettings({ ...settings, normalize: e.target.checked })}
                        />
                        <span className="checkbox-label">Normalize Neural Loudness</span>
                    </label>
                </div>
            </Sect>
        </ToolSettingsPanel>
    );
};
