import React from 'react';
import { Row, Section, SliderInput, SelectInput, ColorInput, Toggle } from './primitives';

const FormPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Add Form Field">
            <Row label="Field Type">
                <SelectInput value={state.fieldType} onChange={v => set('fieldType', v)}
                    options={['Text','Checkbox','Radio Button','Dropdown','Signature','Date']} />
            </Row>
            <Row label="Field Name">
                <input className="settings-input" value={state.fieldName}
                    onChange={e => set('fieldName', e.target.value)} placeholder="field_name" />
            </Row>
            <Row label="Tooltip">
                <input className="settings-input" value={state.fieldTooltip}
                    onChange={e => set('fieldTooltip', e.target.value)} placeholder="Help text..." />
            </Row>
            <Row label="Required"><Toggle value={state.fieldRequired} onChange={v => set('fieldRequired', v)} /></Row>
            <Row label="Default Value">
                <input className="settings-input" value={state.fieldDefault}
                    onChange={e => set('fieldDefault', e.target.value)} placeholder="Default..." />
            </Row>
            <Row label="Font Size">
                <SliderInput min={8} max={24} value={state.fieldFontSize} onChange={v => set('fieldFontSize', v)} unit="px" />
            </Row>
            <Row label="Border Color">
                <ColorInput value={state.fieldBorderColor} onChange={v => set('fieldBorderColor', v)} />
            </Row>
            <Row label="Background Color">
                <ColorInput value={state.fieldBgColor} onChange={v => set('fieldBgColor', v)} />
            </Row>
        </Section>
    </div>
);

export default FormPanel;
