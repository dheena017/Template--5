import React, { useState } from 'react';
import { Combine, FileStack, AlignLeft, Download, Settings2, Shield } from 'lucide-react';
import ToolSettingsPanel, { Toggle, Slider, Sel, Row, BtnGroup, Chips, Note, Sect, NumberedStep, PremiumCard } from './ToolSettingsPanel';

const DEFAULT = {
    compression: 'Medium',
    pageNumbering: 'Continuous',
    insertBlank: false,
    generateTOC: false,
    outputFormat: 'PDF',
    filename: '',
    embedFonts: true,
    flattenAnnotations: false,
    removeMetadata: false,
    pdfVersion: 'PDF 1.7',
    author: '',
    title: '',
    subject: '',
    optimizeForWeb: false,
    language: 'en',
};

const MergePDFSettings = ({ open, onClose, onApply }) => {
    const [s, setS] = useState(DEFAULT);
    const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));
    const reset = () => setS(DEFAULT);

    return (
        <ToolSettingsPanel
            open={open}
            onClose={onClose}
            onApply={() => onApply(s)}
            onReset={reset}
            accentColor="#e53935"
            toolName="Merge PDF"
            toolIcon={Combine}
        >
            <Sect title="System Configuration" icon={Settings2} badge="Selection Guide">
                <div className="tsp-numbered-list">
                    <NumberedStep 
                        number="01" 
                        title="Neural Compression" 
                        description="Choose the balance between file size and visual fidelity. Medium is recommended for most docs." 
                    />
                    <Row label="Intensity">
                        <BtnGroup options={['None','Low','Medium','High']} value={s.compression} onChange={v => set('compression', v)} />
                    </Row>

                    <NumberedStep 
                        number="02" 
                        title="Page Sequencing" 
                        description="Define how page numbers should behave across the merged stack." 
                    />
                    <Row label="Scheme">
                        <BtnGroup options={['Continuous','Reset']} value={s.pageNumbering} onChange={v => set('pageNumbering', v)} />
                    </Row>

                    <NumberedStep 
                        number="03" 
                        title="Synthesis Output" 
                        description="Configure the final format and metadata of the generated document." 
                    />
                    <Row label="Profile">
                        <BtnGroup options={['PDF','PDF/A','PDF/X']} value={s.outputFormat} onChange={v => set('outputFormat', v)} />
                    </Row>
                </div>

                <div className="tsp-premium-cards-grid">
                    <PremiumCard 
                        icon={AlignLeft} 
                        title="Integration" 
                        color="#ef4444" 
                        description="Preserves all layers and annotations during merge." 
                    />
                    <PremiumCard 
                        icon={Shield} 
                        title="Security" 
                        color="#3b82f6" 
                        description="Documents remain encrypted throughout the process." 
                    />
                </div>
            </Sect>

            <Sect title="Advanced Engine Switches" defaultOpen={false}>
                <Row label="Insert Blank Interstitial"><Toggle value={s.insertBlank} onChange={v => set('insertBlank', v)} /></Row>
                <Row label="Neural TOC Generation"><Toggle value={s.generateTOC} onChange={v => set('generateTOC', v)} /></Row>
                <Row label="Embed Custom Fonts"><Toggle value={s.embedFonts} onChange={v => set('embedFonts', v)} /></Row>
                <Row label="Strip Private Metadata"><Toggle value={s.removeMetadata} onChange={v => set('removeMetadata', v)} /></Row>
            </Sect>
        </ToolSettingsPanel>
    );
};

export default MergePDFSettings;
