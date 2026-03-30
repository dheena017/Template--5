import React from 'react';
import { PlayCircle, ShieldCheck, Zap, Scissors, FileText, Layers } from 'lucide-react';
import './HelpContent.css';

const SplitPDFHelp = ({ color }) => {
    return (
        <div className="help-content-aura">
            <div className="help-section animated">
                <div className="section-header">
                    <Scissors size={16} style={{ color: color }} /> 
                    <span className="section-badge" style={{ backgroundColor: `${color}15`, color: color }}>Selection Guide</span>
                </div>
                <h3>Splitting PDF Files</h3>
                <p>Divide your PDFs into individual pages or specific ranges with surgical precision.</p>
                
                <ul className="help-steps-premium">
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>01</div>
                        <div className="step-content">
                            <strong>Source Document</strong>
                            <p>Upload the PDF you want to split. Each page will be visualized as a thumbnail.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>02</div>
                        <div className="step-content">
                            <strong>Mode Selection</strong>
                            <p>Choose "Fixed Ranges" for uniform splits or "Custom Ranges" for specific spans.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>03</div>
                        <div className="step-content">
                            <strong>Output Creation</strong>
                            <p>Run the process. You'll receive a .zip archive containing your new documents.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="help-grid">
                <div className="help-card tip" style={{ borderColor: `${color}30` }}>
                    <div className="card-icon" style={{ backgroundColor: `${color}15`, color: color }}>
                        <Zap size={16} />
                    </div>
                    <h4>Extraction</h4>
                    <p>Want just one page? Our "Extract Mode" allows clicking thumbnails to pick individual pages.</p>
                </div>
                
                <div className="help-card info">
                    <div className="card-icon" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <ShieldCheck size={16} />
                    </div>
                    <h4>Integrity</h4>
                    <p>All internal links and metadata are preserved in the resulting split documents.</p>
                </div>
            </div>
        </div>
    );
};

export default SplitPDFHelp;
