import React from 'react';
import { Row, Section, SliderInput, SelectInput, Toggle, ButtonGroup } from './primitives';

const ViewPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="View Options">
            <Row label={`Zoom (${state.viewZoom}%)`}>
                <SliderInput min={25} max={400} value={state.viewZoom} onChange={v => set('viewZoom', v)} unit="%" />
            </Row>
            <Row label="Page View">
                <SelectInput value={state.pageView} onChange={v => set('pageView', v)}
                    options={['Single Page','Continuous','Two-Page Spread']} />
            </Row>
            <Row label="Show Grid"><Toggle value={state.showGrid} onChange={v => set('showGrid', v)} /></Row>
            <Row label="Snap to Grid"><Toggle value={state.snapGrid} onChange={v => set('snapGrid', v)} /></Row>
            <Row label="Show Rulers"><Toggle value={state.showRulers} onChange={v => set('showRulers', v)} /></Row>
            <Row label="Show Guides"><Toggle value={state.showGuides} onChange={v => set('showGuides', v)} /></Row>
            <Row label="Thumbnails Panel">
                <ButtonGroup options={['Sidebar','Hidden']} value={state.thumbPanel} onChange={v => set('thumbPanel', v)} />
            </Row>
        </Section>
    </div>
);

export default ViewPanel;
