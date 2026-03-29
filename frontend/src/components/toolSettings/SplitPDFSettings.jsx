import React, { useState } from 'react';
import { Scissors, FileText, Hash, FolderArchive } from 'lucide-react';
import ToolSettingsPanel, { Toggle, Slider, Sel, Row, BtnGroup, Chips, Note, Sect, Inp } from './ToolSettingsPanel';

const DEFAULT = {
    splitMethod: 'Pages',
    everyNPages: 1,
    customRanges: '',
    targetSizeKB: 500,
    namingPattern: '{name}_part_{n}',
    outputFormat: 'PDF',
    zipOutput: true,
    preserveBookmarks: true,
    compression: 'Medium',
    embedFonts: true,
    addPageNumbers: false,
    splitByBookmark: false,
};

const SplitPDFSettings = ({ open, onClose, onApply }) => {
    const [s, setS] = useState(DEFAULT);
    const set = (k, v) => setS(prev => ({ ...prev, [k]: v }));
    const reset = () => setS(DEFAULT);

    return (
        <ToolSettingsPanel
            open={open}
            onClose={onClose}
            onApply={() => onApply(s)}
            onReset={reset}
            accentColor="#7c3aed"
            toolName="Split PDF"
            toolIcon={Scissors}
        >
            <Sect title="Split Method" icon={Scissors} defaultOpen>
                <Row label="Method">
                    <Chips options={['Pages','Ranges','File Size','Bookmarks','All Pages']}
                        value={s.splitMethod} onChange={v => set('splitMethod', v)} />
                </Row>

                {s.splitMethod === 'Pages' && (
                    <>
                        <Row label={`Every ${s.everyNPages} Page${s.everyNPages > 1 ? 's' : ''}`}>
                            <Slider min={1} max={50} value={s.everyNPages}
                                onChange={v => set('everyNPages', v)} unit=" pg" />
                        </Row>
                        <Note>Creates one file per <b>{s.everyNPages}</b> page chunk.</Note>
                    </>
                )}

                {s.splitMethod === 'Ranges' && (
                    <>
                        <Row label="Page Ranges">
                            <Inp value={s.customRanges} onChange={v => set('customRanges', v)}
                                placeholder="1-5, 6-10, 11-15" />
                        </Row>
                        <Note>e.g. <b>1-5, 8, 10-12</b> creates 3 output files.</Note>
                    </>
                )}

                {s.splitMethod === 'File Size' && (
                    <>
                        <Row label={`Target Size: ${s.targetSizeKB} KB`}>
                            <Slider min={50} max={5000} value={s.targetSizeKB}
                                onChange={v => set('targetSizeKB', v)} unit=" KB" />
                        </Row>
                        <Note>Split into chunks no larger than <b>{s.targetSizeKB} KB</b> each.</Note>
                    </>
                )}

                {s.splitMethod === 'Bookmarks' && (
                    <Note>Splits at each top-level bookmark/chapter header. Requires a bookmarked PDF.</Note>
                )}
            </Sect>

            <Sect title="Output & Naming" icon={FolderArchive} defaultOpen>
                <Row label="Zip All Files"><Toggle value={s.zipOutput} onChange={v => set('zipOutput', v)} /></Row>
                <Row label="File Name Pattern">
                    <Inp value={s.namingPattern} onChange={v => set('namingPattern', v)} placeholder="{name}_part_{n}" />
                </Row>
                <Note>Variables: <b>{'{name}'}</b> original name, <b>{'{n}'}</b> part number, <b>{'{page}'}</b> start page, <b>{'{range}'}</b> page range.</Note>
                <Row label="Output Format">
                    <BtnGroup options={['PDF','PDF/A']} value={s.outputFormat} onChange={v => set('outputFormat', v)} />
                </Row>
            </Sect>

            <Sect title="Advanced" icon={FileText} defaultOpen={false}>
                <Row label="Preserve Bookmarks"><Toggle value={s.preserveBookmarks} onChange={v => set('preserveBookmarks', v)} /></Row>
                <Row label="Add Page Numbers"><Toggle value={s.addPageNumbers} onChange={v => set('addPageNumbers', v)} /></Row>
                <Row label="Compression"><BtnGroup options={['None','Medium','High']} value={s.compression} onChange={v => set('compression', v)} /></Row>
                <Row label="Embed Fonts"><Toggle value={s.embedFonts} onChange={v => set('embedFonts', v)} /></Row>
            </Sect>
        </ToolSettingsPanel>
    );
};

export default SplitPDFSettings;
