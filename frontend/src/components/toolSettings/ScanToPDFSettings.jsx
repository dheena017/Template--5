import React, { useState } from 'react';
import { Scan, Image as ImageIcon, FileText, Sliders } from 'lucide-react';
import ToolSettingsPanel, { Toggle, Slider, Sel, Row, BtnGroup, Chips, Note, Sect } from './ToolSettingsPanel';

const DEFAULT = {
    pageSize: 'Auto',
    orientation: 'Auto',
    marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
    imageFit: 'Contain',
    dpi: 200,
    compression: 'Medium',
    imageQuality: 90,
    enableOCR: false,
    ocrLanguage: 'eng',
    ocrMode: 'Text Layer',
    autoRotate: true,
    autoEnhance: false,
    brightness: 0,
    contrast: 0,
    sharpen: false,
    denoise: false,
    grayscale: false,
    addWatermark: false,
    watermarkText: '',
    addPageNumbers: false,
    filename: '',
};

const ScanToPDFSettings = ({ open, onClose, onApply }) => {
    const [s, setS] = useState(DEFAULT);
    const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));
    const reset = () => setS(DEFAULT);

    return (
        <ToolSettingsPanel
            open={open}
            onClose={onClose}
            onApply={() => onApply(s)}
            onReset={reset}
            accentColor="#ec4899"
            toolName="Scan to PDF"
            toolIcon={Scan}
        >
            <Sect title="Page Layout" icon={FileText} defaultOpen>
                <Row label="Page Size">
                    <Sel value={s.pageSize} onChange={v => set('pageSize', v)}
                        options={['Auto','A4','Letter','Legal','A3','A5','Custom']} />
                </Row>
                <Row label="Orientation">
                    <BtnGroup options={['Auto','Portrait','Landscape']} value={s.orientation}
                        onChange={v => set('orientation', v)} />
                </Row>
                <Row label="Image Fit">
                    <BtnGroup options={['Contain','Cover','Stretch']} value={s.imageFit}
                        onChange={v => set('imageFit', v)} />
                </Row>
                <Row label="Margins (px)">
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, width:150 }}>
                        {['marginTop','marginRight','marginBottom','marginLeft'].map((k, i) => (
                            <input key={k} type="number" className="tsp-input" value={s[k]}
                                onChange={e => set(k, Number(e.target.value))}
                                placeholder={['T','R','B','L'][i]} style={{padding:'4px 6px', textAlign:'center'}} />
                        ))}
                    </div>
                </Row>
            </Sect>

            <Sect title="Image Processing" icon={ImageIcon} defaultOpen>
                <Row label={`DPI (${s.dpi})`}>
                    <Slider min={72} max={600} value={s.dpi} onChange={v => set('dpi', v)} unit=" dpi" />
                </Row>
                <Row label={`Quality (${s.imageQuality}%)`}>
                    <Slider min={50} max={100} value={s.imageQuality} onChange={v => set('imageQuality', v)} unit="%" />
                </Row>
                <Row label="Auto Rotate from EXIF"><Toggle value={s.autoRotate} onChange={v => set('autoRotate', v)} /></Row>
                <Row label="Auto Enhance"><Toggle value={s.autoEnhance} onChange={v => set('autoEnhance', v)} /></Row>
                <Row label="Grayscale"><Toggle value={s.grayscale} onChange={v => set('grayscale', v)} /></Row>
                <Row label="Sharpen"><Toggle value={s.sharpen} onChange={v => set('sharpen', v)} /></Row>
                <Row label="Denoise"><Toggle value={s.denoise} onChange={v => set('denoise', v)} /></Row>
                <Row label={`Brightness (${s.brightness > 0 ? '+' : ''}${s.brightness})`}>
                    <Slider min={-100} max={100} value={s.brightness} onChange={v => set('brightness', v)} />
                </Row>
                <Row label={`Contrast (${s.contrast > 0 ? '+' : ''}${s.contrast})`}>
                    <Slider min={-100} max={100} value={s.contrast} onChange={v => set('contrast', v)} />
                </Row>
            </Sect>

            <Sect title="OCR (Text Recognition)" icon={Scan} defaultOpen={false}>
                <Row label="Enable OCR"><Toggle value={s.enableOCR} onChange={v => set('enableOCR', v)} /></Row>
                {s.enableOCR && (<>
                    <Row label="Language">
                        <Sel value={s.ocrLanguage} onChange={v => set('ocrLanguage', v)}
                            options={[
                                {value:'eng', label:'English'},
                                {value:'spa', label:'Spanish'},
                                {value:'fra', label:'French'},
                                {value:'deu', label:'German'},
                                {value:'chi_sim', label:'Chinese (Simple)'},
                                {value:'jpn', label:'Japanese'},
                                {value:'ara', label:'Arabic'},
                                {value:'hin', label:'Hindi'},
                                {value:'por', label:'Portuguese'},
                            ]} />
                    </Row>
                    <Row label="OCR Mode">
                        <BtnGroup options={['Text Layer','Text File']} value={s.ocrMode}
                            onChange={v => set('ocrMode', v)} />
                    </Row>
                    <Note>Creates a searchable PDF with a hidden text layer using Tesseract.js.</Note>
                </>)}
            </Sect>

            <Sect title="Overlays & Output" icon={Sliders} defaultOpen={false}>
                <Row label="Add Watermark"><Toggle value={s.addWatermark} onChange={v => set('addWatermark', v)} /></Row>
                {s.addWatermark && (
                    <Row label="Watermark Text" sub>
                        <input className="tsp-input" value={s.watermarkText}
                            onChange={e => set('watermarkText', e.target.value)} placeholder="DRAFT, CONFIDENTIAL..." />
                    </Row>
                )}
                <Row label="Add Page Numbers"><Toggle value={s.addPageNumbers} onChange={v => set('addPageNumbers', v)} /></Row>
                <Row label="Compression">
                    <BtnGroup options={['None','Medium','High']} value={s.compression} onChange={v => set('compression', v)} />
                </Row>
                <Row label="Output Filename">
                    <input className="tsp-input" value={s.filename}
                        onChange={e => set('filename', e.target.value)} placeholder="scanned_document" />
                </Row>
            </Sect>
        </ToolSettingsPanel>
    );
};

export default ScanToPDFSettings;
