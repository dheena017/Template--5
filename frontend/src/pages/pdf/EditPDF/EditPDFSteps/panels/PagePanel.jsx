import React from 'react';
import { Row, Section, SliderInput, SelectInput, ColorInput, ButtonGroup } from './primitives';

const PagePanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Page Operations">
            <Row label="Add Blank Page">
                <div className="action-btn-row">
                    <button className="action-btn">Before</button>
                    <button className="action-btn">After</button>
                    <button className="action-btn">At Position</button>
                </div>
            </Row>
            <Row label="Rotate Page">
                <ButtonGroup options={['90°','180°','270°']} value={state.pageRotation} onChange={v => set('pageRotation', v)} />
            </Row>
            <Row label="Page Size">
                <SelectInput value={state.pageSize} onChange={v => set('pageSize', v)}
                    options={['Letter','A4','Legal','A3','A5','Custom']} />
            </Row>
            <Row label="Orientation">
                <ButtonGroup options={['Portrait','Landscape']} value={state.pageOrientation} onChange={v => set('pageOrientation', v)} />
            </Row>
            <Row label="Margins (T/R/B/L)">
                <div className="quad-input">
                    {['marginTop','marginRight','marginBottom','marginLeft'].map(k => (
                        <input key={k} type="number" className="mini-input" value={state[k] || 0}
                            onChange={e => set(k, Number(e.target.value))} placeholder="0" />
                    ))}
                </div>
            </Row>
        </Section>

        <Section title="Page Numbering" defaultOpen={false}>
            <Row label="Position">
                <SelectInput value={state.numPosition} onChange={v => set('numPosition', v)}
                    options={['Bottom Center','Bottom Left','Bottom Right','Top Center','Top Left','Top Right']} />
            </Row>
            <Row label="Format">
                <SelectInput value={state.numFormat} onChange={v => set('numFormat', v)}
                    options={['1, 2, 3','Page 1 of X','i, ii, iii','I, II, III','A, B, C','001, 002']} />
            </Row>
            <Row label="Start At">
                <input type="number" className="settings-input" value={state.numStart}
                    onChange={e => set('numStart', Number(e.target.value))} min={1} />
            </Row>
            <Row label="Skip First N Pages">
                <input type="number" className="settings-input" value={state.numOffset}
                    onChange={e => set('numOffset', Number(e.target.value))} min={0} />
            </Row>
            <Row label="Font Size (num)">
                <SliderInput min={8} max={24} value={state.numFontSize} onChange={v => set('numFontSize', v)} unit="px" />
            </Row>
            <Row label="Font Color (num)">
                <ColorInput value={state.numColor} onChange={v => set('numColor', v)} />
            </Row>
        </Section>
    </div>
);

export default PagePanel;
