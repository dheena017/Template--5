import React from 'react';
import { 
    ChevronDown, Layers, Zap, FileUp, FileText, 
    Edit2, Shield, Bot, LayoutTemplate
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from './index';

const DASHBOARDS = [
    { id: 'pdf-select', label: 'PDF Dashboard', icon: LayoutTemplate, color: '#94a3b8' },
    { id: 'organize-pdf', label: 'Organize PDF', icon: Layers, color: '#42a5f5' },
    { id: 'optimize-pdf', label: 'Optimize PDF', icon: Zap, color: '#10b981' },
    { id: 'convert-to-pdf', label: 'Convert to PDF', icon: FileUp, color: '#0ea5e9' },
    { id: 'convert-from-pdf', label: 'Convert from PDF', icon: FileText, color: '#f59e0b' },
    { id: 'edit-pdf', label: 'Edit PDF', icon: Edit2, color: '#7c3aed' },
    { id: 'pdf-security', label: 'PDF security', icon: Shield, color: '#2563eb' },
    { id: 'pdf-intelligence', label: 'PDF Intelligence', icon: Bot, color: '#db2777' },
];

const SidebarCategorySwitcher = ({ activeId }) => {
    const navigate = useNavigate();
    const active = DASHBOARDS.find(d => d.id === activeId) || DASHBOARDS[1];

    return (
        <div className="sidebar-cat-switcher mb-6">
            <style>{`
                .cat-switcher-trigger {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .cat-switcher-trigger:hover {
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(255, 255, 255, 0.12);
                }
                .cat-icon-frame {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: rgba(0, 0, 0, 0.2);
                }
                .cat-label-text {
                    flex: 1;
                    font-size: 13px;
                    font-weight: 800;
                    color: #fff;
                    text-align: left;
                    letter-spacing: -0.01em;
                }
                .cat-dropdown-menu {
                    padding: 8px;
                    min-width: 220px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .cat-menu-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .cat-menu-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                .cat-menu-item.active {
                    background: rgba(255, 255, 255, 0.08);
                }
                .cat-menu-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.7);
                }
                .cat-menu-item.active .cat-menu-label {
                    color: #fff;
                }
            `}</style>

            <Dropdown 
                trigger={
                    <button className="cat-switcher-trigger">
                        <div className="cat-icon-frame" style={{ color: active.color }}>
                            <active.icon size={16} />
                        </div>
                        <span className="cat-label-text">{active.label}</span>
                        <ChevronDown size={14} style={{ opacity: 0.4 }} />
                    </button>
                }
            >
                <div className="cat-dropdown-menu">
                    {DASHBOARDS.map(db => (
                        <div 
                            key={db.id}
                            className={`cat-menu-item ${db.id === activeId ? 'active' : ''}`}
                            onClick={() => navigate(`/${db.id}`)}
                        >
                            <db.icon size={14} style={{ color: db.color }} />
                            <span className="cat-menu-label">{db.label}</span>
                        </div>
                    ))}
                </div>
            </Dropdown>
        </div>
    );
};

export default SidebarCategorySwitcher;
