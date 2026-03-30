import React from 'react';
import { PlayCircle, ShieldCheck, Zap, Info, Settings, Minimize2, CheckSquare } from 'lucide-react';
import './HelpContent.css';

const CompressPDFHelp = ({ color }) => {
    return (
        <div className="help-content-aura">
            <div className="help-section animated">
                <div className="section-header">
                    <Minimize2 size={16} style={{ color: color }} /> 
                    <span className="section-badge" style={{ backgroundColor: `${color}15`, color: color }}>Optimization Guide</span>
                </div>
                <h3>Compressing PDF Files</h3>
                <p>Reduce file size without sacrificing legibility using our intelligent resource cleanup engine.</p>
                
                <ul className="help-steps-premium">
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>01</div>
                        <div className="step-content">
                            <strong>Source Selection</strong>
                            <p>Drag your heavy PDF into the workspace. Our engine will analyze internal assets instantly.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>02</div>
                        <div className="step-content">
                            <strong>Ratio Control</strong>
                            <p>Choose between Extreme, Recommended, or Less compression levels in the config step.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>03</div>
                        <div className="step-content">
                            <strong>Instant Result</strong>
                            <p>Download your optimized copy. Usually, users see a 40-70% size reduction.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="help-grid">
                <div className="help-card tip" style={{ borderColor: `${color}30` }}>
                    <div className="card-icon" style={{ backgroundColor: `${color}15`, color: color }}>
                        <Zap size={16} />
                    </div>
                    <h4>Gray-Scale</h4>
                    <p>Enable Gray-Scale conversion in settings to shave off extra megabytes from color-heavy files.</p>
                </div>
                
                <div className="help-card info">
                    <div className="card-icon" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <CheckSquare size={16} />
                    </div>
                    <h4>Verification</h4>
                    <p>All compressed files are verified against the original structure to prevent corruption.</p>
                </div>
            </div>
        </div>
    );
};

export default CompressPDFHelp;
