import React from 'react';
import { 
    Image, 
    Zap, 
    Maximize,
    Eye,
    ShieldCheck
} from 'lucide-react';
import ToolSettingsPanel from './ToolSettingsPanel';

export const ImageConversionSettings = ({ open, onClose, settings, setSettings }) => {
    const handleApply = () => {
        onClose();
    };

    const handleReset = () => {
        setSettings({
            quality: 'High',
            progressive: true,
            stripMetadata: true,
            colorSpace: 'sRGB',
            sampling: '4:4:4'
        });
    };

    return (
        <ToolSettingsPanel 
            open={open} 
            onClose={onClose} 
            title="Image Engine Settings"
            onApply={handleApply}
            onReset={handleReset}
        >
            <div className="tsp-section">
                <label className="tsp-label">Compression Quality</label>
                <div className="tsp-toggle-stack">
                    {[
                        { id: 'Low', label: 'High Comp (60%)', icon: Eye },
                        { id: 'Balanced', label: 'Balanced (85%)', icon: Zap },
                        { id: 'High', label: 'Studio (95%)', icon: Image }
                    ].map(q => (
                        <div 
                            key={q.id}
                            className={`tsp-toggle-item ${settings.quality === q.id ? 'active' : ''}`}
                            onClick={() => setSettings({ ...settings, quality: q.id })}
                        >
                            <div className="item-info">
                                <span className="item-label">{q.label}</span>
                            </div>
                            <div className={`tsp-radio ${settings.quality === q.id ? 'checked' : ''}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tsp-section">
                <label className="tsp-label">Color Profile</label>
                <div className="tsp-select-group">
                    <Maximize size={14} className="tsp-icon-inline" />
                    <select 
                        value={settings.colorSpace}
                        onChange={(e) => setSettings({ ...settings, colorSpace: e.target.value })}
                        className="tsp-select-element"
                    >
                        <option>sRGB</option>
                        <option>Adobe RGB</option>
                        <option>Display P3</option>
                        <option>Original</option>
                    </select>
                </div>
            </div>

            <div className="tsp-section">
                <label className="tsp-label">Advanced Processing</label>
                <div className="tsp-checkbox-list">
                    <label className="tsp-checkbox-item">
                        <input 
                            type="checkbox" 
                            checked={settings.progressive}
                            onChange={(e) => setSettings({ ...settings, progressive: e.target.checked })}
                        />
                        <span className="checkbox-label">Progressive Rendering</span>
                    </label>
                    <label className="tsp-checkbox-item">
                        <input 
                            type="checkbox" 
                            checked={settings.stripMetadata}
                            onChange={(e) => setSettings({ ...settings, stripMetadata: e.target.checked })}
                        />
                        <span className="checkbox-label">Strip EXIF Metadata</span>
                    </label>
                </div>
            </div>

            <div className="tsp-footer-note">
                <ShieldCheck size={12} />
                <span>Private browser-side asset synthesis</span>
            </div>
        </ToolSettingsPanel>
    );
};
