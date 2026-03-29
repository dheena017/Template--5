import React from 'react';
import { Row, Section, SliderInput, SelectInput, ColorInput, ButtonGroup } from './primitives';

const DrawingPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Freehand Drawing">
            <Row label="Pen Color"><ColorInput value={state.penColor} onChange={v => set('penColor', v)} /></Row>
            <Row label={`Pen Size (${state.penSize}px)`}>
                <SliderInput min={1} max={20} value={state.penSize} onChange={v => set('penSize', v)} unit="px" />
            </Row>
            <Row label={`Opacity (${state.penOpacity}%)`}>
                <SliderInput min={0} max={100} value={state.penOpacity} onChange={v => set('penOpacity', v)} unit="%" />
            </Row>
            <Row label="Pen Style">
                <ButtonGroup options={['Solid','Dashed','Dotted']} value={state.penStyle} onChange={v => set('penStyle', v)} />
            </Row>
            <Row label={`Smoothing (${state.drawSmoothing}%)`}>
                <SliderInput min={0} max={100} value={state.drawSmoothing} onChange={v => set('drawSmoothing', v)} unit="%" />
            </Row>
            <Row label={`Eraser Size (${state.eraserSize}px)`}>
                <SliderInput min={5} max={60} value={state.eraserSize} onChange={v => set('eraserSize', v)} unit="px" />
            </Row>
        </Section>

        <Section title="Shapes" defaultOpen={false}>
            <Row label="Shape Type">
                <div className="shape-grid">
                    {['Rectangle','Circle','Line','Arrow','Triangle','Star','Heart'].map(s => (
                        <button key={s} className={`shape-btn ${state.shapeType === s ? 'active' : ''}`}
                            onClick={() => set('shapeType', s)}>{s}</button>
                    ))}
                </div>
            </Row>
            <Row label="Fill Color"><ColorInput value={state.shapeFill} onChange={v => set('shapeFill', v)} /></Row>
            <Row label={`Fill Opacity (${state.shapeFillOpacity}%)`}>
                <SliderInput min={0} max={100} value={state.shapeFillOpacity} onChange={v => set('shapeFillOpacity', v)} unit="%" />
            </Row>
            <Row label="Border Color"><ColorInput value={state.shapeBorder} onChange={v => set('shapeBorder', v)} /></Row>
            <Row label={`Border Width (${state.shapeBorderWidth}px)`}>
                <SliderInput min={1} max={10} value={state.shapeBorderWidth} onChange={v => set('shapeBorderWidth', v)} unit="px" />
            </Row>
            <Row label="Border Style">
                <ButtonGroup options={['Solid','Dashed','Dotted']} value={state.shapeBorderStyle} onChange={v => set('shapeBorderStyle', v)} />
            </Row>
        </Section>

        <Section title="Arrows & Lines" defaultOpen={false}>
            <Row label="Line Type">
                <SelectInput value={state.lineType} onChange={v => set('lineType', v)}
                    options={['Straight','Curved','Double-headed']} />
            </Row>
            <Row label="Arrowhead Style">
                <ButtonGroup options={['None','Triangle','Circle','Diamond']} value={state.arrowStyle} onChange={v => set('arrowStyle', v)} />
            </Row>
            <Row label="Arrowhead Size">
                <ButtonGroup options={['Small','Medium','Large']} value={state.arrowSize} onChange={v => set('arrowSize', v)} />
            </Row>
            <Row label="Line Color"><ColorInput value={state.lineColor} onChange={v => set('lineColor', v)} /></Row>
            <Row label={`Thickness (${state.lineThickness}px)`}>
                <SliderInput min={1} max={10} value={state.lineThickness} onChange={v => set('lineThickness', v)} unit="px" />
            </Row>
        </Section>
    </div>
);

export default DrawingPanel;
