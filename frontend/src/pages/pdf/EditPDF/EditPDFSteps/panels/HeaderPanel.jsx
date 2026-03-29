import React from 'react';
import { Row, Section, SliderInput, SelectInput, Toggle } from './primitives';

const HeaderPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Header">
            <Row label="Enable Header"><Toggle value={state.headerEnabled} onChange={v => set('headerEnabled', v)} /></Row>
            {state.headerEnabled && (<>
                <Row label="Left Section">
                    <input className="settings-input" value={state.headerLeft}
                        onChange={e => set('headerLeft', e.target.value)} placeholder="e.g. {title}" />
                </Row>
                <Row label="Center Section">
                    <input className="settings-input" value={state.headerCenter}
                        onChange={e => set('headerCenter', e.target.value)} placeholder="e.g. Page {page} of {total}" />
                </Row>
                <Row label="Right Section">
                    <input className="settings-input" value={state.headerRight}
                        onChange={e => set('headerRight', e.target.value)} placeholder="e.g. {date}" />
                </Row>
                <Row label={`Margin Top (${state.headerMargin}px)`}>
                    <SliderInput min={0} max={100} value={state.headerMargin} onChange={v => set('headerMargin', v)} unit="px" />
                </Row>
                <Row label="Apply To">
                    <SelectInput value={state.headerApply} onChange={v => set('headerApply', v)}
                        options={['All pages','First page only','Even pages','Odd pages']} />
                </Row>
                <p className="hint-text">Variables: {'{page}'} {'{total}'} {'{date}'} {'{title}'} {'{filename}'}</p>
            </>)}
        </Section>

        <Section title="Footer" defaultOpen={false}>
            <Row label="Enable Footer"><Toggle value={state.footerEnabled} onChange={v => set('footerEnabled', v)} /></Row>
            {state.footerEnabled && (<>
                <Row label="Left Section">
                    <input className="settings-input" value={state.footerLeft}
                        onChange={e => set('footerLeft', e.target.value)} placeholder="e.g. {filename}" />
                </Row>
                <Row label="Center Section">
                    <input className="settings-input" value={state.footerCenter}
                        onChange={e => set('footerCenter', e.target.value)} placeholder="e.g. Page {page}" />
                </Row>
                <Row label="Right Section">
                    <input className="settings-input" value={state.footerRight}
                        onChange={e => set('footerRight', e.target.value)} placeholder="e.g. {date}" />
                </Row>
                <Row label={`Margin Bottom (${state.footerMargin}px)`}>
                    <SliderInput min={0} max={100} value={state.footerMargin} onChange={v => set('footerMargin', v)} unit="px" />
                </Row>
                <Row label="Apply To">
                    <SelectInput value={state.footerApply} onChange={v => set('footerApply', v)}
                        options={['All pages','Last page only','Even pages','Odd pages']} />
                </Row>
            </>)}
        </Section>
    </div>
);

export default HeaderPanel;
