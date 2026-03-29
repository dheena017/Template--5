import React, { useState } from 'react';
import { Layers, Grid, RotateCw, Download } from 'lucide-react';
import ToolSettingsPanel, { Toggle, Slider, Sel, Row, BtnGroup, Chips, Note, Sect } from './ToolSettingsPanel';

const DEFAULT = {
    thumbnailSize: 'Medium',
    gridColumns: 'Auto',
    showPageNums: true,
    showFileSize: true,
    showRotationBadge: true,
    enableMultiSelect: true,
    autoSaveHistory: true,
    undoLevels: 30,
    snapToGrid: false,
    confirmDelete: true,
    blankPageSize: 'A4',
    blankPageOrientation: 'Portrait',
    processMode: 'All Pages',
    compression: 'Medium',
    embedFonts: true,
    preserveMetadata: true,
    flattenAnnotations: false,
    outputFormat: 'PDF',
    filename: '',
};

const OrganizePDFSettings = ({ open, onClose, onApply }) => {
    const [s, setS] = useState(DEFAULT);
    const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));
    const reset = () => setS(DEFAULT);

    return (
        <ToolSettingsPanel
            open={open}
            onClose={onClose}
            onApply={() => onApply(s)}
            onReset={reset}
            accentColor="#42a5f5"
            toolName="Organize PDF"
            toolIcon={Layers}
        >
            <Sect title="Thumbnail Grid" icon={Grid} defaultOpen>
                <Row label="Thumbnail Size">
                    <BtnGroup options={['Small','Medium','Large']} value={s.thumbnailSize}
                        onChange={v => set('thumbnailSize', v)} />
                </Row>
                <Row label="Grid Columns">
                    <Sel value={s.gridColumns} onChange={v => set('gridColumns', v)}
                        options={['Auto','2','3','4','5','6']} />
                </Row>
                <Row label="Show Page Numbers"><Toggle value={s.showPageNums} onChange={v => set('showPageNums', v)} /></Row>
                <Row label="Show File Size Badge"><Toggle value={s.showFileSize} onChange={v => set('showFileSize', v)} /></Row>
                <Row label="Show Rotation Indicator"><Toggle value={s.showRotationBadge} onChange={v => set('showRotationBadge', v)} /></Row>
                <Row label="Snap to Grid"><Toggle value={s.snapToGrid} onChange={v => set('snapToGrid', v)} /></Row>
            </Sect>

            <Sect title="Editing Behaviour" icon={RotateCw} defaultOpen>
                <Row label="Enable Multi-Select"><Toggle value={s.enableMultiSelect} onChange={v => set('enableMultiSelect', v)} /></Row>
                <Row label="Confirm Before Delete"><Toggle value={s.confirmDelete} onChange={v => set('confirmDelete', v)} /></Row>
                <Row label="Auto-Save Undo History"><Toggle value={s.autoSaveHistory} onChange={v => set('autoSaveHistory', v)} /></Row>
                <Row label={`Undo Levels (${s.undoLevels})`}>
                    <Slider min={5} max={100} value={s.undoLevels}
                        onChange={v => set('undoLevels', v)} />
                </Row>
            </Sect>

            <Sect title="Blank Page Defaults" defaultOpen={false}>
                <Row label="Blank Page Size">
                    <Sel value={s.blankPageSize} onChange={v => set('blankPageSize', v)}
                        options={['A4','Letter','Legal','A3','A5','Custom']} />
                </Row>
                <Row label="Orientation">
                    <BtnGroup options={['Portrait','Landscape']} value={s.blankPageOrientation}
                        onChange={v => set('blankPageOrientation', v)} />
                </Row>
            </Sect>

            <Sect title="Output" icon={Download} defaultOpen={false}>
                <Row label="Output Format">
                    <BtnGroup options={['PDF','PDF/A']} value={s.outputFormat}
                        onChange={v => set('outputFormat', v)} />
                </Row>
                <Row label="Compression">
                    <BtnGroup options={['None','Medium','High']} value={s.compression}
                        onChange={v => set('compression', v)} />
                </Row>
                <Row label="Embed Fonts"><Toggle value={s.embedFonts} onChange={v => set('embedFonts', v)} /></Row>
                <Row label="Preserve Metadata"><Toggle value={s.preserveMetadata} onChange={v => set('preserveMetadata', v)} /></Row>
                <Row label="Flatten Annotations"><Toggle value={s.flattenAnnotations} onChange={v => set('flattenAnnotations', v)} /></Row>
                <Row label="Custom Filename">
                    <input className="tsp-input" value={s.filename}
                        onChange={e => set('filename', e.target.value)} placeholder="organized_document" />
                </Row>
            </Sect>
        </ToolSettingsPanel>
    );
};

export default OrganizePDFSettings;
