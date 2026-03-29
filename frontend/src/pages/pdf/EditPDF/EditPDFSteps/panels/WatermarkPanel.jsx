import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Row, Section, SliderInput, SelectInput, ColorInput, Toggle, ButtonGroup } from './primitives';

const WatermarkPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Text Watermark">
            <Row label="Watermark Text">
                <input className="settings-input" value={state.wmText}
                    onChange={e => set('wmText', e.target.value)} placeholder="Confidential, Draft..." />
            </Row>
            <Row label="Font Family">
                <SelectInput value={state.wmFont} onChange={v => set('wmFont', v)}
                    options={['Inter','Arial','Georgia','Times New Roman','Courier']} />
            </Row>
            <Row label={`Font Size (${state.wmSize}px)`}>
                <SliderInput min={12} max={120} value={state.wmSize} onChange={v => set('wmSize', v)} unit="px" />
            </Row>
            <Row label="Color"><ColorInput value={state.wmColor} onChange={v => set('wmColor', v)} /></Row>
            <Row label={`Opacity (${state.wmOpacity}%)`}>
                <SliderInput min={10} max={100} value={state.wmOpacity} onChange={v => set('wmOpacity', v)} unit="%" />
            </Row>
            <Row label={`Rotation (${state.wmRotation}°)`}>
                <SliderInput min={0} max={360} value={state.wmRotation} onChange={v => set('wmRotation', v)} unit="°" />
            </Row>
            <Row label="Position">
                <ButtonGroup options={['Center','Tile','Custom']} value={state.wmPosition} onChange={v => set('wmPosition', v)} />
            </Row>
            <Row label={`Scale (${state.wmScale}%)`}>
                <SliderInput min={50} max={200} value={state.wmScale} onChange={v => set('wmScale', v)} unit="%" />
            </Row>
        </Section>

        <Section title="Image Watermark" defaultOpen={false}>
            <Row label="Upload Watermark Image">
                <label className="file-upload-btn">
                    <input type="file" accept="image/png,image/svg+xml" style={{display:'none'}} />
                    <ImageIcon size={16} /> PNG / SVG with transparency
                </label>
            </Row>
            <Row label={`Scale (${state.wmImgScale}%)`}>
                <SliderInput min={10} max={200} value={state.wmImgScale} onChange={v => set('wmImgScale', v)} unit="%" />
            </Row>
            <Row label={`Opacity (${state.wmImgOpacity}%)`}>
                <SliderInput min={10} max={100} value={state.wmImgOpacity} onChange={v => set('wmImgOpacity', v)} unit="%" />
            </Row>
            <Row label={`Rotation (${state.wmImgRotation}°)`}>
                <SliderInput min={0} max={360} value={state.wmImgRotation} onChange={v => set('wmImgRotation', v)} unit="°" />
            </Row>
            <Row label="Tile Across Page">
                <Toggle value={state.wmImgTile} onChange={v => set('wmImgTile', v)} />
            </Row>
        </Section>
    </div>
);

export default WatermarkPanel;
