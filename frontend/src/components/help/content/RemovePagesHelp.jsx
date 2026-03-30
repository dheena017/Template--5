import React from 'react';
import { PlayCircle, ShieldCheck, Zap, Scissors, FileText, Trash2, XCircle } from 'lucide-react';
import './HelpContent.css';

const RemovePagesHelp = ({ color }) => {
    return (
        <div className="help-content-aura">
            <div className="help-section animated">
                <div className="section-header">
                    <Trash2 size={16} style={{ color: color }} /> 
                    <span className="section-badge" style={{ backgroundColor: `${color}15`, color: color }}>Management Guide</span>
                </div>
                <h3>Removing PDF Pages</h3>
                <p>Delete unwanted content from your documents with a simple, visual selection process.</p>
                
                <ul className="help-steps-premium">
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>01</div>
                        <div className="step-content">
                            <strong>Interactive Selection</strong>
                            <p>Upload your PDF. Hover over thumbnails and click the 'Remove' icon to mark pages for deletion.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>02</div>
                        <div className="step-content">
                            <strong>Bulk Operations</strong>
                            <p>Use the "Select All" or "Clear All" shortcuts to quickly manage larger documents.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>03</div>
                        <div className="step-content">
                            <strong>Engine Execution</strong>
                            <p>Finalize your choice. Our engine will strip the selected binary data from the file stream.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="help-grid">
                <div className="help-card tip" style={{ borderColor: `${color}30` }}>
                    <div className="card-icon" style={{ backgroundColor: `${color}15`, color: color }}>
                        <Zap size={16} />
                    </div>
                    <h4>Undo Action</h4>
                    <p>Accidentally removed a page? Click the red 'Undo' icon on the thumbnail before processing.</p>
                </div>
                
                <div className="help-card info">
                    <div className="card-icon" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <XCircle size={16} />
                    </div>
                    <h4>Total Control</h4>
                    <p>Selection is maintained even if you go back to the upload step for a different file.</p>
                </div>
            </div>
        </div>
    );
};

export default RemovePagesHelp;
