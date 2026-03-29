import React from 'react';
import { Palette, AlignCenter, Type, Droplet } from 'lucide-react';
import './TextCustomizationPanel.css';

const TextCustomizationPanel = ({ activeTool, customization, setCustomization }) => {
    const needsText = ['Add Watermark', 'Add Page Numbers', 'Edit PDF'].includes(activeTool?.name);
    if (!needsText) return null;

    return (
        <div className="edit-customization-panel">
            <div className="edit-custom-header">
                <Palette size={20} className="edit-custom-icon" />
                <h4>Appearance Engine</h4>
            </div>
            
            <div className="edit-custom-grid">
                <div className="edit-form-group full-width">
                    <label className="edit-form-label"><Type size={12} className="inline mr-1" /> Input Text</label>
                    <div className="edit-input-wrapper">
                        <input 
                            type="text" 
                            className="edit-input"
                            placeholder="Type watermark or text..."
                            value={customization.text}
                            onChange={e => setCustomization({...customization, text: e.target.value})}
                        />
                    </div>
                </div>

                <div className="edit-form-group">
                    <label className="edit-form-label">Typography</label>
                    <div className="edit-input-wrapper">
                        <select 
                            className="edit-select"
                            value={customization.font || 'Inter'}
                            onChange={e => setCustomization({...customization, font: e.target.value})}
                        >
                            <option value="Inter">Inter (Modern)</option>
                            <option value="Roboto">Roboto (Clean)</option>
                            <option value="Times New Roman">Times New Roman (Serif)</option>
                            <option value="Courier New">Courier (Monospace)</option>
                            <option value="Outfit">Outfit (Geometric)</option>
                        </select>
                        <Type size={16} className="edit-select-icon" />
                    </div>
                </div>
                
                <div className="edit-form-group">
                    <label className="edit-form-label">Text Color</label>
                    <div className="edit-input-wrapper">
                        <input 
                            type="color" 
                            className="edit-color-picker"
                            value={customization.color}
                            onChange={e => setCustomization({...customization, color: e.target.value})}
                        />
                        <span className="edit-color-value">{customization.color.toUpperCase()}</span>
                    </div>
                </div>

                <div className="edit-form-group">
                    <label className="edit-form-label">
                        Font Size ({customization.size}px)
                    </label>
                    <div className="edit-input-wrapper">
                        <input 
                            type="range" 
                            min="10" max="120"
                            className="edit-range-slider"
                            value={customization.size}
                            onChange={e => setCustomization({...customization, size: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="edit-form-group">
                    <label className="edit-form-label">
                        <Droplet size={12} className="inline mr-1" /> Opacity ({customization.opacity || 100}%)
                    </label>
                    <div className="edit-input-wrapper">
                        <input 
                            type="range" 
                            min="10" max="100"
                            className="edit-range-slider"
                            value={customization.opacity || 100}
                            onChange={e => setCustomization({...customization, opacity: parseInt(e.target.value)})}
                        />
                    </div>
                </div>
                
                <div className="edit-form-group full-width">
                    <label className="edit-form-label">Position Alignment</label>
                    <div className="edit-input-wrapper">
                        <select 
                            className="edit-select"
                            value={customization.position}
                            onChange={e => setCustomization({...customization, position: e.target.value})}
                        >
                            <option value="center">Center of Document</option>
                            <option value="top-left">Top Left</option>
                            <option value="top-right">Top Right</option>
                            <option value="bottom-left">Bottom Left</option>
                            <option value="bottom-right">Bottom Right</option>
                        </select>
                        <AlignCenter size={16} className="edit-select-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextCustomizationPanel;
