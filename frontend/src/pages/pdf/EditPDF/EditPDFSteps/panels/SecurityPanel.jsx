import React from 'react';
import { Row, Section, SelectInput, Toggle } from './primitives';

const SecurityPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Document Properties">
            <Row label="Title">
                <input className="settings-input" value={state.docTitle}
                    onChange={e => set('docTitle', e.target.value)} placeholder="Document title..." />
            </Row>
            <Row label="Author">
                <input className="settings-input" value={state.docAuthor}
                    onChange={e => set('docAuthor', e.target.value)} placeholder="Author name..." />
            </Row>
            <Row label="Subject">
                <input className="settings-input" value={state.docSubject}
                    onChange={e => set('docSubject', e.target.value)} placeholder="Subject..." />
            </Row>
            <Row label="Keywords">
                <input className="settings-input" value={state.docKeywords}
                    onChange={e => set('docKeywords', e.target.value)} placeholder="keyword1, keyword2..." />
            </Row>
            <Row label="Language">
                <SelectInput value={state.docLanguage} onChange={v => set('docLanguage', v)}
                    options={['English','Spanish','French','German','Chinese','Japanese','Arabic','Portuguese']} />
            </Row>
        </Section>

        <Section title="Password & Permissions" defaultOpen={false}>
            <Row label="Open Password">
                <input className="settings-input" type="password" value={state.openPassword}
                    onChange={e => set('openPassword', e.target.value)} placeholder="Leave blank for none" />
            </Row>
            <Row label="Owner Password">
                <input className="settings-input" type="password" value={state.ownerPassword}
                    onChange={e => set('ownerPassword', e.target.value)} placeholder="Permissions password" />
            </Row>
            <Row label="Allow Printing"><Toggle value={state.allowPrint} onChange={v => set('allowPrint', v)} /></Row>
            <Row label="Allow Copying"><Toggle value={state.allowCopy} onChange={v => set('allowCopy', v)} /></Row>
            <Row label="Allow Editing"><Toggle value={state.allowEdit} onChange={v => set('allowEdit', v)} /></Row>
            <Row label="Allow Commenting"><Toggle value={state.allowComment} onChange={v => set('allowComment', v)} /></Row>
        </Section>
    </div>
);

export default SecurityPanel;
