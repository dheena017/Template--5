import React, { useState } from 'react';
import { FileOutput, Grid, Star, Archive } from 'lucide-react';
import ToolSettingsPanel, { Toggle, Slider, Sel, Row, BtnGroup, Chips, Note, Sect, Inp } from './ToolSettingsPanel';

const DEFAULT = {
    selectionMode: 'Visual',
    ranges: '',
    smartPreset: '',
    outputType: 'Single PDF',
    namingPattern: '{name}_extracted',
    preserveOrder: true,
    addSeparator: false,
    generateTOC: false,
    zipMultiple: true,
    reorderSelected: false,
    compressionLevel: 'Medium',
    embedFonts: true,
    keepMetadata: true,
    addPageNums: false,
};

const ExtractPagesSettings = ({ open, onClose, onApply }) => {
    const [s, setS] = useState(DEFAULT);
    const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));
    const reset = () => setS(DEFAULT);

    return (
        <ToolSettingsPanel
            open={open}
            onClose={onClose}
            onApply={() => onApply(s)}
            onReset={reset}
            accentColor="#0891b2"
            toolName="Extract Pages"
            toolIcon={FileOutput}
        >
            <Sect title="Selection Mode" icon={Grid} defaultOpen>
                <Row label="Mode">
                    <Chips options={['Visual','Range','Smart']}
                        value={s.selectionMode} onChange={v => set('selectionMode', v)} />
                </Row>

                {s.selectionMode === 'Range' && (
                    <>
                        <Row label="Page Ranges">
                            <Inp value={s.ranges} onChange={v => set('ranges', v)}
                                placeholder="1-5, 8, 10-12" />
                        </Row>
                        <Note>Supports: <b>1-5</b> (range), <b>1,3,5</b> (list), <b>-5</b> (first 5), <b>5-</b> (from 5 onwards).</Note>
                    </>
                )}

                {s.selectionMode === 'Smart' && (
                    <>
                        <Row label="Smart Preset">
                            <Sel value={s.smartPreset} onChange={v => set('smartPreset', v)} options={[
                                {value:'', label:'Choose preset...'},
                                {value:'first', label:'First page only'},
                                {value:'last', label:'Last page only'},
                                {value:'even', label:'Even pages'},
                                {value:'odd', label:'Odd pages'},
                                {value:'images', label:'Pages with images'},
                                {value:'text', label:'Pages with text only'},
                                {value:'prime', label:'Prime-numbered pages'},
                            ]} />
                        </Row>
                    </>
                )}
            </Sect>

            <Sect title="Output Configuration" icon={Archive} defaultOpen>
                <Row label="Output Type">
                    <BtnGroup options={['Single PDF','Multiple PDFs']}
                        value={s.outputType} onChange={v => set('outputType', v)} />
                </Row>
                {s.outputType === 'Multiple PDFs' && (
                    <Row label="Zip All Files">
                        <Toggle value={s.zipMultiple} onChange={v => set('zipMultiple', v)} />
                    </Row>
                )}
                <Row label="File Name Pattern">
                    <Inp value={s.namingPattern} onChange={v => set('namingPattern', v)} placeholder="{name}_extracted" />
                </Row>
                <Note>Variables: <b>{'{name}'}</b>, <b>{'{page}'}</b>, <b>{'{range}'}</b></Note>
                <Row label="Preserve Original Order">
                    <Toggle value={s.preserveOrder} onChange={v => set('preserveOrder', v)} />
                </Row>
            </Sect>

            <Sect title="Document Extras" icon={Star} defaultOpen={false}>
                <Row label="Add Separator Pages"><Toggle value={s.addSeparator} onChange={v => set('addSeparator', v)} /></Row>
                <Row label="Generate Table of Contents"><Toggle value={s.generateTOC} onChange={v => set('generateTOC', v)} /></Row>
                <Row label="Add Page Numbers"><Toggle value={s.addPageNums} onChange={v => set('addPageNums', v)} /></Row>
            </Sect>

            <Sect title="Advanced" defaultOpen={false}>
                <Row label="Compression">
                    <BtnGroup options={['None','Medium','High']} value={s.compressionLevel} onChange={v => set('compressionLevel', v)} />
                </Row>
                <Row label="Embed Fonts"><Toggle value={s.embedFonts} onChange={v => set('embedFonts', v)} /></Row>
                <Row label="Keep Metadata"><Toggle value={s.keepMetadata} onChange={v => set('keepMetadata', v)} /></Row>
            </Sect>
        </ToolSettingsPanel>
    );
};

export default ExtractPagesSettings;
