import React, { useState } from 'react';
import {
    Type, Pen, Image as ImageIcon, FileText, AlignLeft, Droplet,
    Link, Shield, Eye, Download, Layers, ChevronDown, ChevronRight
} from 'lucide-react';
import './EditSettingsHub.css';

// ── Separate panel files ──────────────────────────────────────
import TextPanel     from './panels/TextPanel';
import DrawingPanel  from './panels/DrawingPanel';
import ImagePanel    from './panels/ImagePanel';
import PagePanel     from './panels/PagePanel';
import HeaderPanel   from './panels/HeaderPanel';
import WatermarkPanel from './panels/WatermarkPanel';
import FormPanel     from './panels/FormPanel';
import LinkPanel     from './panels/LinkPanel';
import SecurityPanel from './panels/SecurityPanel';
import ViewPanel     from './panels/ViewPanel';
import ExportPanel   from './panels/ExportPanel';

// ── Panel registry ────────────────────────────────────────────
const PANELS = [
    { id: 'text',      label: 'Text Editing',       icon: Type,      color: '#f59e0b', Component: TextPanel },
    { id: 'drawing',   label: 'Drawing & Annotation',icon: Pen,       color: '#8b5cf6', Component: DrawingPanel },
    { id: 'image',     label: 'Image Editing',       icon: ImageIcon, color: '#06b6d4', Component: ImagePanel },
    { id: 'page',      label: 'Page Operations',     icon: FileText,  color: '#10b981', Component: PagePanel },
    { id: 'header',    label: 'Header & Footer',     icon: AlignLeft, color: '#f472b6', Component: HeaderPanel },
    { id: 'watermark', label: 'Watermark',           icon: Droplet,   color: '#60a5fa', Component: WatermarkPanel },
    { id: 'form',      label: 'Form Fields',         icon: Layers,    color: '#a78bfa', Component: FormPanel },
    { id: 'link',      label: 'Links',               icon: Link,      color: '#34d399', Component: LinkPanel },
    { id: 'security',  label: 'Security & Meta',     icon: Shield,    color: '#fb923c', Component: SecurityPanel },
    { id: 'view',      label: 'View & Preview',      icon: Eye,       color: '#94a3b8', Component: ViewPanel },
    { id: 'export',    label: 'Export Settings',     icon: Download,  color: '#e879f9', Component: ExportPanel },
];

// ── Default state ─────────────────────────────────────────────
const DEFAULT_STATE = {
    // Text
    addText: '', fontFamily: 'Roboto', fontSize: 24, fontColor: '#f59e0b',
    fontStyle: 'normal', textOpacity: 100, textRotation: 0, posX: 50, posY: 50,
    textBg: 'Transparent', bgColor: '#ffffff', textPadding: 4,
    textBorder: 'None', borderColor: '#000000', borderWidth: 1,
    textLayer: 'Foreground', textPageRange: 'All pages',
    highlightColor: '#ffff00', highlightOpacity: 60, highlightShape: 'Rectangle',
    strikeColor: '#ef4444', strikeStyle: 'Solid',
    // Drawing
    penColor: '#ef4444', penSize: 3, penOpacity: 100, penStyle: 'Solid',
    drawSmoothing: 50, eraserSize: 20, shapeType: 'Rectangle',
    shapeFill: '#3b82f6', shapeFillOpacity: 40, shapeBorder: '#1d4ed8',
    shapeBorderWidth: 2, shapeBorderStyle: 'Solid',
    lineType: 'Straight', arrowStyle: 'Triangle', arrowSize: 'Medium',
    lineColor: '#ef4444', lineThickness: 2,
    // Image
    imgX: 10, imgY: 10, imgWidth: 50, imgAspect: true, imgRotation: 0,
    imgOpacity: 100, imgFlip: 'None', imgBrightness: 0, imgContrast: 0,
    imgSaturation: 0, imgBlur: 0, imgHue: 0, imgGrayscale: false,
    imgSepia: false, imgInvert: false, imgFilter: 'None',
    // Page
    pageRotation: '90°', pageSize: 'A4', pageOrientation: 'Portrait',
    marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
    numPosition: 'Bottom Center', numFormat: '1, 2, 3', numStart: 1,
    numOffset: 0, numFontSize: 12, numColor: '#64748b',
    // Header/Footer
    headerEnabled: false, headerLeft: '', headerCenter: 'Page {page} of {total}', headerRight: '{date}',
    headerMargin: 20, headerApply: 'All pages',
    footerEnabled: false, footerLeft: '{filename}', footerCenter: '', footerRight: '{page}',
    footerMargin: 20, footerApply: 'All pages',
    // Watermark
    wmText: 'CONFIDENTIAL', wmFont: 'Inter', wmSize: 64, wmColor: '#ef4444',
    wmOpacity: 30, wmRotation: 45, wmPosition: 'Center', wmScale: 100,
    wmImgScale: 30, wmImgOpacity: 50, wmImgRotation: 0, wmImgTile: false,
    // Form
    fieldType: 'Text', fieldName: '', fieldTooltip: '', fieldRequired: false,
    fieldDefault: '', fieldFontSize: 12, fieldBorderColor: '#334155', fieldBgColor: '#ffffff',
    // Link
    linkType: 'URL', linkUrl: '', linkPage: 1, linkEmail: '', linkFile: '',
    linkArea: 'Rectangle', linkBorder: false, linkTooltip: '',
    // Security
    docTitle: '', docAuthor: '', docSubject: '', docKeywords: '', docLanguage: 'English',
    openPassword: '', ownerPassword: '',
    allowPrint: true, allowCopy: true, allowEdit: false, allowComment: true,
    // View
    viewZoom: 100, pageView: 'Single Page', showGrid: false, snapGrid: false,
    showRulers: false, showGuides: false, thumbPanel: 'Sidebar',
    // Export
    exportFormat: 'PDF', exportCompression: 'Medium', exportImgQuality: 90,
    embedFonts: true, optimizeWeb: false, flattenAnnotations: false, removeMetadata: false,
};

// ── Main hub ──────────────────────────────────────────────────
const EditSettingsHub = ({ onApply }) => {
    const [activePanel, setActivePanel] = useState('text');
    const [settings, setSettings] = useState(DEFAULT_STATE);

    const set = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

    const active = PANELS.find(p => p.id === activePanel);
    const ActiveComponent = active?.Component;

    return (
        <div className="edit-settings-hub">
            {/* ── Sidebar nav ── */}
            <div className="hub-sidebar">
                <div className="hub-sidebar-title">Settings</div>
                {PANELS.map(panel => (
                    <button
                        key={panel.id}
                        className={`hub-nav-item ${activePanel === panel.id ? 'active' : ''}`}
                        onClick={() => setActivePanel(panel.id)}
                    >
                        <panel.icon size={16} style={{ color: activePanel === panel.id ? panel.color : undefined }} />
                        <span>{panel.label}</span>
                        {activePanel === panel.id && <div className="active-bar" style={{ background: panel.color }} />}
                    </button>
                ))}
            </div>

            {/* ── Panel content ── */}
            <div className="hub-panel-area">
                <div className="hub-panel-header">
                    {active && (
                        <>
                            <active.icon size={20} style={{ color: active.color }} />
                            <span>{active.label}</span>
                        </>
                    )}
                </div>

                <div className="hub-panel-scroll">
                    {ActiveComponent && <ActiveComponent state={settings} set={set} />}
                </div>

                <div className="hub-panel-footer">
                    <button className="hub-reset-btn" onClick={() => setSettings(DEFAULT_STATE)}>Reset Panel</button>
                    <button className="hub-apply-btn" onClick={() => onApply && onApply(settings)}>
                        Apply Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSettingsHub;
