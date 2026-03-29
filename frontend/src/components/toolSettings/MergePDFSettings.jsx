import React, { useState } from 'react';
import { Combine, FileStack, AlignLeft, Download, Settings2 } from 'lucide-react';
import ToolSettingsPanel, { Toggle, Slider, Sel, Row, BtnGroup, Chips, Note, Sect } from './ToolSettingsPanel';

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
            <Sect title="Output Settings" icon={Download} defaultOpen>
                <Row label="Compression">
                    <BtnGroup options={['None','Low','Medium','High']} value={s.compression} onChange={v => set('compression', v)} />
                </Row>
                <Row label="Output Format">
                    <BtnGroup options={['PDF','PDF/A','PDF/X']} value={s.outputFormat} onChange={v => set('outputFormat', v)} />
                </Row>
                <Row label="Custom Filename">
                    <input className="tsp-input" value={s.filename} onChange={e => set('filename', e.target.value)} placeholder="merged_document" />
                </Row>
                <Row label="PDF Version">
                    <Sel value={s.pdfVersion} onChange={v => set('pdfVersion', v)} options={['PDF 1.4','PDF 1.5','PDF 1.6','PDF 1.7','PDF 2.0']} />
                </Row>
            </Sect>

            <Sect title="Page Numbering" icon={FileStack} defaultOpen>
                <Row label="Numbering Scheme">
                    <BtnGroup options={['Continuous','Reset']} value={s.pageNumbering} onChange={v => set('pageNumbering', v)} />
                </Row>
                <Note>
                    <b>Continuous:</b> Pages 1,2,3... across all files.<br/>
                    <b>Reset:</b> Each file starts at page 1.
                </Note>
            </Sect>

            <Sect title="Extra Pages" icon={AlignLeft} defaultOpen={false}>
                <Row label="Insert Blank Between Files">
                    <Toggle value={s.insertBlank} onChange={v => set('insertBlank', v)} />
                </Row>
                <Row label="Generate Table of Contents">
                    <Toggle value={s.generateTOC} onChange={v => set('generateTOC', v)} />
                </Row>
            </Sect>

            <Sect title="Document Metadata" icon={Settings2} defaultOpen={false}>
                <Row label="Title">
                    <input className="tsp-input" value={s.title} onChange={e => set('title', e.target.value)} placeholder="Document title..." />
                </Row>
                <Row label="Author">
                    <input className="tsp-input" value={s.author} onChange={e => set('author', e.target.value)} placeholder="Author name..." />
                </Row>
                <Row label="Subject">
                    <input className="tsp-input" value={s.subject} onChange={e => set('subject', e.target.value)} placeholder="Description..." />
                </Row>
            </Sect>

            <Sect title="Advanced" defaultOpen={false}>
                <Row label="Embed Fonts"><Toggle value={s.embedFonts} onChange={v => set('embedFonts', v)} /></Row>
                <Row label="Flatten Annotations"><Toggle value={s.flattenAnnotations} onChange={v => set('flattenAnnotations', v)} /></Row>
                <Row label="Remove Metadata"><Toggle value={s.removeMetadata} onChange={v => set('removeMetadata', v)} /></Row>
                <Row label="Optimize for Web"><Toggle value={s.optimizeForWeb} onChange={v => set('optimizeForWeb', v)} /></Row>
            </Sect>
        </ToolSettingsPanel>
    );
};

export default MergePDFSettings;
