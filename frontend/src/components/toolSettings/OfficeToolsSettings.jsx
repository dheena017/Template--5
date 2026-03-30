import React, { useState } from 'react';
import { 
    FileText, 
    Zap, 
    Layers,
    ShieldCheck,
    Minimize2,
    Settings2,
    Cpu
} from 'lucide-react';
import ToolSettingsPanel, { Sect, Row, BtnGroup, Toggle, Note } from './ToolSettingsPanel';

export const OfficeToolsSettings = ({ open, onClose, settings: propsSettings, setSettings: propsSetSettings, onApply }) => {
    const [localSettings, setLocalSettings] = useState({
        compressionLevel: 'Standard',
        quality: 85,
        keepImages: true,
        fastProcessing: true,
        compatibility: 'Office 2021+'
    });

    const settings = propsSettings || localSettings;
    const setSettings = propsSetSettings || ((newVal) => setLocalSettings(prev => ({...prev, ...newVal})));

    const handleApply = () => {
        if (onApply) onApply(settings);
        onClose();
    };

    const handleReset = () => {
        setSettings({
            compressionLevel: 'Standard',
            quality: 85,
            keepImages: true,
            fastProcessing: true,
            compatibility: 'Office 2021+'
        });
    };

    const update = (k, v) => setSettings({ [k]: v });

    return (
        <ToolSettingsPanel 
            open={open} 
            onClose={onClose} 
            toolName="Office Engine"
            toolIcon={Cpu}
            accentColor="#10b981"
            onApply={handleApply}
            onReset={handleReset}
        >
            <Sect title="Optimization Engine" icon={Zap} badge="Neural v4">
                <Row label="Performance Mode">
                    <BtnGroup 
                        options={['Low', 'Standard', 'Extreme']} 
                        value={settings.compressionLevel} 
                        onChange={v => update('compressionLevel', v)} 
                    />
                </Row>
                <Note>Extreme mode uses recursive compression for maximum savings.</Note>
            </Sect>

            <Sect title="Compatibility Layer" icon={Layers}>
                <Row label="Format Standard">
                    <select 
                        value={settings.compatibility}
                        onChange={(e) => update('compatibility', e.target.value)}
                        className="tsp-select-element"
                        style={{ paddingLeft: '12px' }}
                    >
                        <option>Office 2021+</option>
                        <option>Office 2016-2021</option>
                        <option>Legacy (2007-2016)</option>
                        <option>Universal Compatibility</option>
                    </select>
                </Row>
            </Sect>

            <Sect title="Engine Switches" icon={Settings2}>
                <Row label="Retain Image Fidelity">
                    <Toggle value={settings.keepImages} onChange={v => update('keepImages', v)} />
                </Row>
                <Row label="Turbo Synthesis">
                    <Toggle value={settings.fastProcessing} onChange={v => update('fastProcessing', v)} />
                </Row>
            </Sect>
        </ToolSettingsPanel>
    );
};
