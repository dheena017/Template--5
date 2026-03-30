import React from 'react';
import { 
    Book, 
    Type, 
    Image,
    Layers,
    ShieldCheck
} from 'lucide-react';
import ToolSettingsPanel from './ToolSettingsPanel';

export const EbookConversionSettings = ({ open, onClose, settings, setSettings }) => {
    const handleApply = () => {
        onClose();
    };

    const handleReset = () => {
        setSettings({
            fontSize: 'Normal',
            fontFamily: 'Default',
            embedFonts: true,
            margins: 'Medium',
            optimizeImages: true
        });
    };

    return (
        <ToolSettingsPanel 
            open={open} 
            onClose={onClose} 
            title="eBook Engine Settings"
            onApply={handleApply}
            onReset={handleReset}
        >
            <div className="tsp-section">
                <label className="tsp-label">Typography Scale</label>
                <div className="tsp-toggle-stack">
                    {[
                        { id: 'Small', label: 'Compact', icon: Type },
                        { id: 'Normal', label: 'Balanced', icon: Type },
                        { id: 'Large', label: 'Accessible', icon: Type }
                    ].map(q => (
                        <div 
                            key={q.id}
                            className={`tsp-toggle-item ${settings.fontSize === q.id ? 'active' : ''}`}
                            onClick={() => setSettings({ ...settings, fontSize: q.id })}
                        >
                            <div className="item-info">
                                <span className="item-label">{q.label}</span>
                            </div>
                            <div className={`tsp-radio ${settings.fontSize === q.id ? 'checked' : ''}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tsp-section">
                <label className="tsp-label">Document Layout</label>
                <div className="tsp-select-group">
                    <Layers size={14} className="tsp-icon-inline" />
                    <select 
                        value={settings.margins}
                        onChange={(e) => setSettings({ ...settings, margins: e.target.value })}
                        className="tsp-select-element"
                    >
                        <option>Narrow</option>
                        <option>Medium</option>
                        <option>Wide</option>
                        <option>Dynamic</option>
                    </select>
                </div>
            </div>

            <div className="tsp-section">
                <label className="tsp-label">Content Processing</label>
                <div className="tsp-checkbox-list">
                    <label className="tsp-checkbox-item">
                        <input 
                            type="checkbox" 
                            checked={settings.embedFonts}
                            onChange={(e) => setSettings({ ...settings, embedFonts: e.target.checked })}
                        />
                        <span className="checkbox-label">Embed Custom Typefaces</span>
                    </label>
                    <label className="tsp-checkbox-item">
                        <input 
                            type="checkbox" 
                            checked={settings.optimizeImages}
                            onChange={(e) => setSettings({ ...settings, optimizeImages: e.target.checked })}
                        />
                        <span className="checkbox-label">Optimize Graphics Output</span>
                    </label>
                </div>
            </div>

            <div className="tsp-footer-note">
                <ShieldCheck size={12} />
                <span>Isolated sandboxed eBook synthesis engine</span>
            </div>
        </ToolSettingsPanel>
    );
};
