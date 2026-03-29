import React from 'react';
import { Dropdown, DropdownItem } from './index';
import { 
    ChevronDown, Combine, Scissors, Eraser, MousePointer2, Scan, Layers, 
    Zap, FileUp, FileText, Edit2, Shield, Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PDF_TOOL_LIST = [
    { name: 'Organize PDF', path: '/organize-pdf', icon: Layers, color: '#42a5f5' },
    { name: 'Optimize PDF', path: '/optimize-pdf', icon: Zap, color: '#10b981' },
    { name: 'Convert to PDF', path: '/convert-to-pdf', icon: FileUp, color: '#0ea5e9' },
    { name: 'Convert from PDF', path: '/convert-from-pdf', icon: FileText, color: '#f59e0b' },
    { name: 'Edit PDF', path: '/edit-pdf', icon: Edit2, color: '#7c3aed' },
    { name: 'PDF Security', path: '/pdf-security', icon: Shield, color: '#2563eb' },
    { name: 'PDF Intelligence', path: '/pdf-intelligence', icon: Bot, color: '#db2777' },
    { name: 'Merge PDF', path: '/merge', icon: Combine, color: '#ef4444' },
    { name: 'Split PDF', path: '/split', icon: Scissors, color: '#ff5252' }
];

const PDFToolSwitcher = ({ activeTool }) => {
    const navigate = useNavigate();

    const activeInfo = PDF_TOOL_LIST.find(t => t.name === activeTool) || PDF_TOOL_LIST[4];

    return (
        <div className="tool-switcher-header mb-6">
            <style>{`
                .tool-switcher-btn-aura {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: #fff;
                    padding: 4px 12px 4px 4px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    font-size: 13px;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 
                        0 4px 12px rgba(0,0,0,0.2), 
                        inset 0 0 0 1px rgba(255,255,255,0.03);
                    position: relative;
                }

                .tool-switcher-btn-aura:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 
                        0 20px 40px rgba(0,0,0,0.5), 
                        0 0 15px var(--glow-color, rgba(255,255,255,0.1));
                }

                .mini-icon-canvas {
                    width: 34px;
                    height: 34px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.4s ease;
                }

                .tool-switcher-btn-aura:hover .mini-icon-canvas {
                    transform: rotate(-5deg) scale(1.1);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }

                .tool-switcher-list {
                    padding: 16px;
                    min-width: 280px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .dropdown-item-aura {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 16px;
                    border-radius: 20px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    cursor: pointer;
                    width: 100%;
                    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
                }

                .dropdown-item-aura:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.15);
                    transform: translateX(8px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                }

                .item-icon-box {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.3);
                }

                .item-label-aura {
                    font-size: 13px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.8);
                }

                .dropdown-item-aura.active {
                    background: var(--accent-primary-faded);
                    border-color: var(--accent-primary);
                }

                .dropdown-item-aura.active .item-label-aura {
                    color: #fff;
                    font-weight: 800;
                }
            `}</style>
            <Dropdown 
                trigger={
                    <button className="tool-switcher-btn-aura" style={{ '--glow-color': `${activeInfo.color}30` }}>
                        <div className="mini-icon-canvas" style={{ color: activeInfo.color, background: `${activeInfo.color}15` }}>
                            <activeInfo.icon size={18} />
                        </div>
                        <span style={{ textTransform: 'uppercase', fontStyle: 'italic', opacity: 0.9 }}>{activeInfo.name}</span>
                        <ChevronDown size={14} style={{ opacity: 0.4, marginLeft: '6px' }} />
                    </button>
                }
            >
                <div className="menu-header" style={{ padding: '20px 20px 12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '4px' }}>
                    <strong style={{ display: 'block', fontSize: '13px', fontWeight: 900, marginBottom: '4px' }}>Workspace Activity</strong>
                    <span style={{ fontSize: '12px', opacity: 0.5 }}>Updates and tools.</span>
                </div>
                <div className="tool-switcher-list">
                    {PDF_TOOL_LIST.map(tool => (
                        <div 
                            key={tool.name} 
                            onClick={() => navigate(tool.path)}
                            className={`dropdown-item-aura ${tool.name === activeTool ? 'active' : ''}`}
                        >
                            <div className="item-icon-box" style={{ color: tool.color, background: `${tool.color}15` }}>
                                <tool.icon size={18} />
                            </div>
                            <span className="item-label-aura" style={{ fontSize: '14px', fontWeight: 700 }}>{tool.name}</span>
                        </div>
                    ))}
                </div>
            </Dropdown>
        </div>
    );
};

export default PDFToolSwitcher;
