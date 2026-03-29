import React from 'react';
import { Bold, Italic } from 'lucide-react';
import { Row, Section, SliderInput, SelectInput, ColorInput, Toggle, ButtonGroup } from './primitives';

const TextPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Add Text">
            <Row label="Text Content">
                <textarea className="settings-textarea" value={state.addText}
                    onChange={e => set('addText', e.target.value)} placeholder="Type text here..." rows={3} />
            </Row>
            <Row label="Font Family">
                <SelectInput value={state.fontFamily} onChange={v => set('fontFamily', v)}
                    options={['Arial','Helvetica','Times New Roman','Courier','Verdana','Georgia','Calibri','Roboto','Open Sans']} />
            </Row>
            <Row label={`Font Size (${state.fontSize}px)`}>
                <SliderInput min={8} max={72} value={state.fontSize} onChange={v => set('fontSize', v)} unit="px" />
            </Row>
            <Row label="Font Color">
                <ColorInput value={state.fontColor} onChange={v => set('fontColor', v)} />
            </Row>
            <Row label="Font Style">
                <ButtonGroup options={[
                    {value:'normal',label:'N'},{value:'bold',icon:Bold,label:'B'},
                    {value:'italic',icon:Italic,label:'I'},{value:'bold italic',label:'BI'}
                ]} value={state.fontStyle} onChange={v => set('fontStyle', v)} />
            </Row>
            <Row label={`Opacity (${state.textOpacity}%)`}>
                <SliderInput min={0} max={100} value={state.textOpacity} onChange={v => set('textOpacity', v)} unit="%" />
            </Row>
            <Row label={`Rotation (${state.textRotation}°)`}>
                <SliderInput min={0} max={360} value={state.textRotation} onChange={v => set('textRotation', v)} unit="°" />
            </Row>
        </Section>

        <Section title="Position" defaultOpen={false}>
            <Row label="Position X">
                <SliderInput min={0} max={100} value={state.posX} onChange={v => set('posX', v)} unit="%" />
            </Row>
            <Row label="Position Y">
                <SliderInput min={0} max={100} value={state.posY} onChange={v => set('posY', v)} unit="%" />
            </Row>
        </Section>

        <Section title="Background & Border" defaultOpen={false}>
            <Row label="Background">
                <ButtonGroup options={['Transparent','Solid','Rounded']} value={state.textBg} onChange={v => set('textBg', v)} />
            </Row>
            {state.textBg !== 'Transparent' && (
                <Row label="Background Color"><ColorInput value={state.bgColor} onChange={v => set('bgColor', v)} /></Row>
            )}
            <Row label={`Padding (${state.textPadding}px)`}>
                <SliderInput min={0} max={20} value={state.textPadding} onChange={v => set('textPadding', v)} unit="px" />
            </Row>
            <Row label="Border">
                <ButtonGroup options={['None','Solid','Dashed','Dotted']} value={state.textBorder} onChange={v => set('textBorder', v)} />
            </Row>
            {state.textBorder !== 'None' && (<>
                <Row label="Border Color"><ColorInput value={state.borderColor} onChange={v => set('borderColor', v)} /></Row>
                <Row label={`Border Width (${state.borderWidth}px)`}>
                    <SliderInput min={1} max={5} value={state.borderWidth} onChange={v => set('borderWidth', v)} unit="px" />
                </Row>
            </>)}
            <Row label="Layer">
                <ButtonGroup options={['Foreground','Background']} value={state.textLayer} onChange={v => set('textLayer', v)} />
            </Row>
        </Section>

        <Section title="Page Range" defaultOpen={false}>
            <Row label="Apply To">
                <SelectInput value={state.textPageRange} onChange={v => set('textPageRange', v)}
                    options={['All pages','Current page','Custom range']} />
            </Row>
            {state.textPageRange === 'Custom range' && (
                <Row label="Range"><input type="text" className="settings-input" placeholder="e.g. 1-5,8,10-12" /></Row>
            )}
        </Section>

        <Section title="Highlight & Strikethrough" defaultOpen={false}>
            <Row label="Highlight Color"><ColorInput value={state.highlightColor} onChange={v => set('highlightColor', v)} /></Row>
            <Row label={`Highlight Opacity (${state.highlightOpacity}%)`}>
                <SliderInput min={20} max={100} value={state.highlightOpacity} onChange={v => set('highlightOpacity', v)} unit="%" />
            </Row>
            <Row label="Highlight Shape">
                <ButtonGroup options={['Rectangle','Underline','Squiggly']} value={state.highlightShape} onChange={v => set('highlightShape', v)} />
            </Row>
            <Row label="Search & Highlight">
                <input type="text" className="settings-input" placeholder="Search text to highlight..." />
            </Row>
            <Row label="Strikethrough Color"><ColorInput value={state.strikeColor} onChange={v => set('strikeColor', v)} /></Row>
            <Row label="Strike Style">
                <ButtonGroup options={['Solid','Dashed','Dotted']} value={state.strikeStyle} onChange={v => set('strikeStyle', v)} />
            </Row>
        </Section>
    </div>
);

export default TextPanel;
