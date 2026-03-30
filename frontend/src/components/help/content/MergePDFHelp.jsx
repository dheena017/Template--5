import React from 'react';
import { PlayCircle, ShieldCheck, Zap, Info, Settings, HelpCircle, FileText, Layers, Download, CheckCircle } from 'lucide-react';
import './HelpContent.css';

const MergePDFHelp = ({ color }) => {
    return (
        <div className="help-content-aura">
            <div className="help-section animated">
                <div className="section-header">
                    <Layers size={16} style={{ color: color }} /> 
                    <span className="section-badge" style={{ backgroundColor: `${color}15`, color: color }}>Workspace Guide</span>
                </div>
                <h3>Merging PDF Files</h3>
                <p>Combine multiple PDF documents into a single, high-fidelity file using our cloud-native merging engine.</p>
                
                <ul className="help-steps-premium">
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>01</div>
                        <div className="step-content">
                            <strong>Add Documents</strong>
                            <p>Upload your PDFs. You can reorder them by dragging thumbnails after the initial upload.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>02</div>
                        <div className="step-content">
                            <strong>Global Optimization</strong>
                            <p>Enable "Fast Web View" in settings to optimize the merged file for browser viewing.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>03</div>
                        <div className="step-content">
                            <strong>One-Click Fusion</strong>
                            <p>Click "Merge PDF" to trigger the backend server. Your files are combined in secure, ephemeral storage.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="help-grid">
                <div className="help-card tip" style={{ borderColor: `${color}30` }}>
                    <div className="card-icon" style={{ backgroundColor: `${color}15`, color: color }}>
                        <Zap size={16} />
                    </div>
                    <h4>Reorder Flow</h4>
                    <p>Simply click and drag any file in the second step to change the merge sequence.</p>
                </div>
                
                <div className="help-card info">
                    <div className="card-icon" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <ShieldCheck size={16} />
                    </div>
                    <h4>Encryption</h4>
                    <p>Password-protected files can be merged; you'll be prompted for the master password.</p>
                </div>
            </div>

            <div className="faq-section-help">
                <div className="section-header">
                    <Info size={16} /> <span>Common Questions</span>
                </div>
                <div className="faq-item">
                    <h5>Can I merge files of different sizes?</h5>
                    <p>Yes, our engine automatically scales internal page boxes to maintain a consistent output format.</p>
                </div>
                <div className="faq-item">
                    <h5>Are there page limits?</h5>
                    <p>Standard users can merge up to 500 pages. Pro subscribers have no page limit.</p>
                </div>
            </div>
        </div>
    );
};

export default MergePDFHelp;
