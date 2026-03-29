import React from 'react';
import { Row, Section, SliderInput, Toggle, ButtonGroup } from './primitives';

const ExportPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Output Format & Quality">
            <Row label="Save As">
                <ButtonGroup options={['PDF','PDF/A','PDF/X']} value={state.exportFormat} onChange={v => set('exportFormat', v)} />
            </Row>
            <Row label="Compression">
                <ButtonGroup options={['None','Low','Medium','High']} value={state.exportCompression} onChange={v => set('exportCompression', v)} />
            </Row>
            <Row label={`Image Quality (${state.exportImgQuality}%)`}>
                <SliderInput min={50} max={100} value={state.exportImgQuality} onChange={v => set('exportImgQuality', v)} unit="%" />
            </Row>
        </Section>

        <Section title="Options" defaultOpen={false}>
            <Row label="Embed Fonts"><Toggle value={state.embedFonts} onChange={v => set('embedFonts', v)} /></Row>
            <Row label="Optimize for Web"><Toggle value={state.optimizeWeb} onChange={v => set('optimizeWeb', v)} /></Row>
            <Row label="Flatten Annotations"><Toggle value={state.flattenAnnotations} onChange={v => set('flattenAnnotations', v)} /></Row>
            <Row label="Remove Metadata"><Toggle value={state.removeMetadata} onChange={v => set('removeMetadata', v)} /></Row>
        </Section>
    </div>
);

export default ExportPanel;
