import React from 'react';
import { 
    Languages, 
    Zap, 
    Type, 
    BrainCircuit,
    Cpu,
    Shield
} from 'lucide-react';
import ToolSettingsPanel, { Sect, Row, BtnGroup, NumberedStep, PremiumCard } from './ToolSettingsPanel';

export const OCRPDFSettings = ({ open, onClose, onApply }) => {
    const [settings, setSettings] = React.useState({
        language: 'Auto-detect',
        engine: 'Aura Neural v4',
        performance: 'Balanced',
        precision: 'High',
        keepLayout: true,
        smartEnhance: true
    });

    const handleApply = () => {
        onApply(settings);
        onClose();
    };

    const handleReset = () => {
        setSettings({
            language: 'Auto-detect',
            engine: 'Aura Neural v4',
            performance: 'Balanced',
            precision: 'High',
            keepLayout: true,
            smartEnhance: true
        });
    };

    return (
        <ToolSettingsPanel 
            open={open} 
            onClose={onClose} 
            title="OCR Document Settings"
            onApply={handleApply}
            onReset={handleReset}
        >
            <Sect title="System Configuration" icon={Zap} badge="Selection Guide">
                <div className="tsp-numbered-list">
                    <NumberedStep 
                        number="01" 
                        title="Neural Engine Selection" 
                        description="Choose the balance between file size and visual fidelity. Medium is recommended for most docs." 
                    />
                    <div className="tsp-toggle-stack">
                        {[
                            { id: 'aura', label: 'Aura Neural v4', desc: 'Highest precision with layout preservation' },
                            { id: 'tesseract', label: 'Legacy Core', desc: 'Fast, basic text extraction' }
                        ].map(engine => (
                            <div 
                                key={engine.id}
                                className={`tsp-toggle-item ${settings.engine.toLowerCase().includes(engine.id) ? 'active' : ''}`}
                                onClick={() => setSettings({ ...settings, engine: engine.label })}
                            >
                                <div className="item-info">
                                    <span className="item-label">{engine.label}</span>
                                    <span className="item-desc">{engine.desc}</span>
                                </div>
                                <div className={`tsp-radio ${settings.engine.toLowerCase().includes(engine.id) ? 'checked' : ''}`}></div>
                            </div>
                        ))}
                    </div>

                    <NumberedStep 
                        number="02" 
                        title="Neural Language Analysis" 
                        description="Define how the engine should identify linguistic characters." 
                    />
                    <div className="tsp-select-group">
                        <Languages size={14} className="tsp-icon-inline" />
                        <select 
                            value={settings.language}
                            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                            className="tsp-select-element"
                        >
                            <option>Auto-detect</option>
                            <option>English</option>
                            <option>Spanish</option>
                            <option>Chinese</option>
                        </select>
                    </div>

                    <NumberedStep 
                        number="03" 
                        title="Engine Performance Mode" 
                        description="Optimize for speed or extreme scanning depth." 
                    />
                    <Row label="Mode">
                        <BtnGroup options={['Economy','Balanced','Studio']} value={settings.performance} onChange={v => setSettings({ ...settings, performance: v })} />
                    </Row>
                </div>

                <div className="tsp-premium-cards-grid">
                    <PremiumCard 
                        icon={BrainCircuit} 
                        title="Precision" 
                        color="#3b82f6" 
                        description="99.8% Accuracy on specialized fonts." 
                    />
                    <PremiumCard 
                        icon={Shield} 
                        title="Integrity" 
                        color="#10b981" 
                        description="Ensures zero data leaks or artifacts." 
                    />
                </div>
            </Sect>

            <Sect title="Output Engine Switches" defaultOpen={false}>
                <div className="tsp-checkbox-list">
                    <label className="tsp-checkbox-item">
                        <input 
                            type="checkbox" 
                            checked={settings.keepLayout}
                            onChange={(e) => setSettings({ ...settings, keepLayout: e.target.checked })}
                        />
                        <span className="checkbox-label">Maintain Original Document Layout</span>
                    </label>
                    <label className="tsp-checkbox-item">
                        <input 
                            type="checkbox" 
                            checked={settings.smartEnhance}
                            onChange={(e) => setSettings({ ...settings, smartEnhance: e.target.checked })}
                        />
                        <span className="checkbox-label">Neural Image Upscaling</span>
                    </label>
                </div>
            </Sect>
        </ToolSettingsPanel>
    );
};
