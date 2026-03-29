import React from 'react';
import { Row, Section, Toggle, ButtonGroup } from './primitives';

const LinkPanel = ({ state, set }) => (
    <div className="panel-content">
        <Section title="Add Hyperlink">
            <Row label="Link Type">
                <ButtonGroup options={['URL','Page','Email','File']} value={state.linkType} onChange={v => set('linkType', v)} />
            </Row>
            {state.linkType === 'URL' && (
                <Row label="URL">
                    <input className="settings-input" value={state.linkUrl}
                        onChange={e => set('linkUrl', e.target.value)} placeholder="https://..." />
                </Row>
            )}
            {state.linkType === 'Page' && (
                <Row label="Target Page">
                    <input className="settings-input" type="number" value={state.linkPage}
                        onChange={e => set('linkPage', Number(e.target.value))} min={1} />
                </Row>
            )}
            {state.linkType === 'Email' && (
                <Row label="Email Address">
                    <input className="settings-input" value={state.linkEmail}
                        onChange={e => set('linkEmail', e.target.value)} placeholder="email@example.com" />
                </Row>
            )}
            {state.linkType === 'File' && (
                <Row label="File Path">
                    <input className="settings-input" value={state.linkFile || ''}
                        onChange={e => set('linkFile', e.target.value)} placeholder="./path/to/file.pdf" />
                </Row>
            )}
            <Row label="Link Area">
                <ButtonGroup options={['Rectangle','Text Selection']} value={state.linkArea} onChange={v => set('linkArea', v)} />
            </Row>
            <Row label="Show Border"><Toggle value={state.linkBorder} onChange={v => set('linkBorder', v)} /></Row>
            <Row label="Tooltip">
                <input className="settings-input" value={state.linkTooltip}
                    onChange={e => set('linkTooltip', e.target.value)} placeholder="Hover text..." />
            </Row>
        </Section>
    </div>
);

export default LinkPanel;
