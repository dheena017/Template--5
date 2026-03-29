import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Row, Section, SliderInput, ColorInput, Toggle, ButtonGroup } from './primitives';

const ImagePanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Add Image">
            <Row label="Upload Image">
                <label className="file-upload-btn">
                    <input type="file" accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp" style={{display:'none'}} />
                    <ImageIcon size={16} /> Browse File
                </label>
            </Row>
            <Row label="Position X">
                <SliderInput min={0} max={100} value={state.imgX} onChange={v => set('imgX', v)} unit="%" />
            </Row>
            <Row label="Position Y">
                <SliderInput min={0} max={100} value={state.imgY} onChange={v => set('imgY', v)} unit="%" />
            </Row>
            <Row label={`Width (${state.imgWidth}%)`}>
                <SliderInput min={10} max={100} value={state.imgWidth} onChange={v => set('imgWidth', v)} unit="%" />
            </Row>
            <Row label="Keep Aspect Ratio"><Toggle value={state.imgAspect} onChange={v => set('imgAspect', v)} /></Row>
            <Row label={`Rotation (${state.imgRotation}°)`}>
                <SliderInput min={0} max={360} value={state.imgRotation} onChange={v => set('imgRotation', v)} unit="°" />
            </Row>
            <Row label={`Opacity (${state.imgOpacity}%)`}>
                <SliderInput min={0} max={100} value={state.imgOpacity} onChange={v => set('imgOpacity', v)} unit="%" />
            </Row>
            <Row label="Flip">
                <ButtonGroup options={['None','Horizontal','Vertical']} value={state.imgFlip} onChange={v => set('imgFlip', v)} />
            </Row>
        </Section>

        <Section title="Image Adjustments" defaultOpen={false}>
            <Row label={`Brightness (${state.imgBrightness > 0 ? '+' : ''}${state.imgBrightness})`}>
                <SliderInput min={-100} max={100} value={state.imgBrightness} onChange={v => set('imgBrightness', v)} />
            </Row>
            <Row label={`Contrast (${state.imgContrast > 0 ? '+' : ''}${state.imgContrast})`}>
                <SliderInput min={-100} max={100} value={state.imgContrast} onChange={v => set('imgContrast', v)} />
            </Row>
            <Row label={`Saturation (${state.imgSaturation > 0 ? '+' : ''}${state.imgSaturation})`}>
                <SliderInput min={-100} max={100} value={state.imgSaturation} onChange={v => set('imgSaturation', v)} />
            </Row>
            <Row label={`Blur (${state.imgBlur}px)`}>
                <SliderInput min={0} max={10} value={state.imgBlur} onChange={v => set('imgBlur', v)} unit="px" />
            </Row>
            <Row label={`Hue Shift (${state.imgHue}°)`}>
                <SliderInput min={0} max={360} value={state.imgHue} onChange={v => set('imgHue', v)} unit="°" />
            </Row>
        </Section>

        <Section title="Image Filters" defaultOpen={false}>
            <Row label="Grayscale"><Toggle value={state.imgGrayscale} onChange={v => set('imgGrayscale', v)} /></Row>
            <Row label="Sepia"><Toggle value={state.imgSepia} onChange={v => set('imgSepia', v)} /></Row>
            <Row label="Invert Colors"><Toggle value={state.imgInvert} onChange={v => set('imgInvert', v)} /></Row>
            <Row label="Preset Filter">
                <ButtonGroup options={['None','Vintage','Cinematic']} value={state.imgFilter} onChange={v => set('imgFilter', v)} />
            </Row>
        </Section>
    </div>
);

export default ImagePanel;
