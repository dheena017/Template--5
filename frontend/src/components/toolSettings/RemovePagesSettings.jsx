import React, { useState } from 'react';
import { Trash2, Eye, ScanSearch } from 'lucide-react';
import ToolSettingsPanel, { Toggle, Slider, Sel, Row, BtnGroup, Chips, Note, Sect } from './ToolSettingsPanel';

const DEFAULT = {
    selectionMode: 'Visual',
    viewMode: 'Grid',
    thumbColumns: 'Auto',
    confirmDelete: true,
    undoHistory: true,
    detectBlank: false,
    blankThreshold: 30,
    detectDuplicates: false,
    contentAnalysis: false,
    searchKeyword: '',
    keepEven: false,
    keepOdd: false,
    compressOutput: true,
    preserveMetadata: true,
    filename: '',
};

const RemovePagesSettings = ({ open, onClose, onApply }) => {
    const [s, setS] = useState(DEFAULT);
    const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));
    const reset = () => setS(DEFAULT);

    return (
        <ToolSettingsPanel
            open={open}
            onClose={onClose}
            onApply={() => onApply(s)}
            onReset={reset}
            accentColor="#dc2626"
            toolName="Remove Pages"
            toolIcon={Trash2}
        >
            <Sect title="Selection Interface" icon={Eye} defaultOpen>
                <Row label="Selection Mode">
                    <BtnGroup options={['Visual','Range','Smart']} value={s.selectionMode}
                        onChange={v => set('selectionMode', v)} />
                </Row>
                <Row label="Thumbnail View">
                    <BtnGroup options={['Grid','List']} value={s.viewMode}
                        onChange={v => set('viewMode', v)} />
                </Row>
                <Row label="Grid Columns">
                    <Sel value={s.thumbColumns} onChange={v => set('thumbColumns', v)}
                        options={['Auto','2','3','4','5','6']} />
                </Row>
                <Row label="Confirm Before Delete">
                    <Toggle value={s.confirmDelete} onChange={v => set('confirmDelete', v)} />
                </Row>
                <Row label="Undo History">
                    <Toggle value={s.undoHistory} onChange={v => set('undoHistory', v)} />
                </Row>
            </Sect>

            <Sect title="Smart Detection" icon={ScanSearch} defaultOpen>
                <Row label="Detect Blank Pages">
                    <Toggle value={s.detectBlank} onChange={v => set('detectBlank', v)} />
                </Row>
                {s.detectBlank && (
                    <Row label={`Blank Threshold (${s.blankThreshold}%)`} sub>
                        <Slider min={5} max={90} value={s.blankThreshold}
                            onChange={v => set('blankThreshold', v)} unit="%" />
                    </Row>
                )}
                <Row label="Detect Duplicate Pages">
                    <Toggle value={s.detectDuplicates} onChange={v => set('detectDuplicates', v)} />
                </Row>
                <Row label="Content Analysis">
                    <Toggle value={s.contentAnalysis} onChange={v => set('contentAnalysis', v)} />
                </Row>
            </Sect>

            <Sect title="Quick Select" defaultOpen={false}>
                <Row label="Remove Even Pages">
                    <Toggle value={s.keepEven} onChange={v => set('keepEven', v)} />
                </Row>
                <Row label="Remove Odd Pages">
                    <Toggle value={s.keepOdd} onChange={v => set('keepOdd', v)} />
                </Row>
                <Row label="Search by Content">
                    <input className="tsp-input" value={s.searchKeyword}
                        onChange={e => set('searchKeyword', e.target.value)}
                        placeholder="Keyword to find pages..." />
                </Row>
                <Note>Pages containing the keyword will be highlighted for removal.</Note>
            </Sect>

            <Sect title="Output" defaultOpen={false}>
                <Row label="Compress Result"><Toggle value={s.compressOutput} onChange={v => set('compressOutput', v)} /></Row>
                <Row label="Preserve Metadata"><Toggle value={s.preserveMetadata} onChange={v => set('preserveMetadata', v)} /></Row>
                <Row label="Custom Filename">
                    <input className="tsp-input" value={s.filename}
                        onChange={e => set('filename', e.target.value)} placeholder="output_filename" />
                </Row>
            </Sect>
        </ToolSettingsPanel>
    );
};

export default RemovePagesSettings;
