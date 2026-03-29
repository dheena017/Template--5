import React from 'react';
import { Row, Section, ButtonGroup, SelectInput, Toggle, SliderInput } from '../../../EditPDF/EditPDFSteps/panels/primitives';
import { Zap, Settings2, Sliders, Monitor, Film } from 'lucide-react';

const GenericVideoPanel = ({ settings, setSettings }) => {
    const update = (key, val) => setSettings({ ...settings, [key]: val });

    return (
        <div className="video-panel-content">
            <Section title="Video Processing" icon={Zap}>
                <Row label="Output Quality">
                    <ButtonGroup 
                        options={['High', 'Balanced', 'Small']}
                        value={settings.quality || 'High'}
                        onChange={(v) => update('quality', v)}
                    />
                </Row>
                <Row label="Codec Profile">
                    <SelectInput 
                        value={settings.codec || 'H.264'}
                        onChange={(v) => update('codec', v)}
                        options={['H.264', 'H.265 (HEVC)', 'Passthrough']}
                    />
                </Row>
                <Row label="Hardware Accel"><Toggle value={settings.hwAccel ?? true} onChange={(v) => update('hwAccel', v)} /></Row>
            </Section>

            <Section title="Resolution & Format" icon={Monitor}>
                <Row label="Scaling">
                    <SelectInput 
                        value={settings.scaling || 'original'}
                        onChange={(v) => update('scaling', v)}
                        options={[
                            { label: 'Original Size', value: 'original' },
                            { label: 'Full HD (1080p)', value: '1080p' },
                            { label: 'HD (720p)', value: '720p' },
                            { label: 'SD (480p)', value: '480p' }
                        ]}
                    />
                </Row>
                <Row label="Aspect Ratio">
                    <SelectInput 
                        value={settings.aspectRatio || 'auto'}
                        onChange={(v) => update('aspectRatio', v)}
                        options={['Auto', '16:9', '4:3', '1:1', '21:9']}
                    />
                </Row>
                <Row label="Frame Rate">
                    <SelectInput 
                        value={settings.frameRate || 'original'}
                        onChange={(v) => update('frameRate', v)}
                        options={['Original', '60 FPS', '30 FPS', '24 FPS']}
                    />
                </Row>
            </Section>

            <Section title="Bitrate Control" icon={Sliders}>
                <Row label="Video Bitrate">
                    <SliderInput 
                        min={1000} max={10000} step={500}
                        value={settings.vBitrate || 4000}
                        onChange={(v) => update('vBitrate', v)}
                        unit=" kbps"
                    />
                </Row>
                <Row label="Audio Bitrate">
                    <SliderInput 
                        min={64} max={320} step={32}
                        value={settings.aBitrate || 192}
                        onChange={(v) => update('aBitrate', v)}
                        unit=" kbps"
                    />
                </Row>
            </Section>

            <Section title="Advanced" icon={Film}>
                <Row label="2-Pass Encoding"><Toggle value={settings.twoPass || false} onChange={(v) => update('twoPass', v)} /></Row>
                <Row label="Strip Audio"><Toggle value={settings.stripAudio || false} onChange={(v) => update('stripAudio', v)} /></Row>
                <Row label="Optimize for Web"><Toggle value={settings.webOptimize ?? true} onChange={(v) => update('webOptimize', v)} /></Row>
            </Section>
        </div>
    );
};

export default GenericVideoPanel;
