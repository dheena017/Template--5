import React from 'react';
import { PlayCircle, ShieldCheck, Zap, Info, Settings, HelpCircle, FileVideo, Cpu, Download } from 'lucide-react';
import './HelpContent.css';

const MP4ToAVIHelp = ({ color }) => {
    return (
        <div className="help-content-aura">
            <div className="help-section animated">
                <div className="section-header">
                    <PlayCircle size={16} style={{ color: color }} /> 
                    <span className="section-badge" style={{ backgroundColor: `${color}15`, color: color }}>Usage Guide</span>
                </div>
                <h3>How to Convert MP4 to AVI</h3>
                <p>The Aura Video Engine uses hardware acceleration to provide near-instant conversion between formats while preserving maximum bit-depth.</p>
                
                <ul className="help-steps-premium">
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>01</div>
                        <div className="step-content">
                            <strong>Target File</strong>
                            <p>Select or drag your .mp4 file into the workspace. Ensure the file is not corrupted for best results.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>02</div>
                        <div className="step-content">
                            <strong>Adjust Parameters</strong>
                            <p>Use the <Settings size={14} style={{ display: 'inline' }} /> Tool Settings to choose between High Compatibility or High Efficiency codecs.</p>
                        </div>
                    </li>
                    <li>
                        <div className="step-num" style={{ backgroundColor: `${color}10`, color: color }}>03</div>
                        <div className="step-content">
                            <strong>Local Processing</strong>
                            <p>Your video is processed directly in your browser's WebAssembly sandbox. No data is sent to our servers.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="help-grid">
                <div className="help-card tip" style={{ borderColor: `${color}30` }}>
                    <div className="card-icon" style={{ backgroundColor: `${color}15`, color: color }}>
                        <Zap size={16} />
                    </div>
                    <h4>Swift Mode</h4>
                    <p>Enable "HW Acceleration" in settings for 3x faster processing on modern GPUs.</p>
                </div>
                
                <div className="help-card info">
                    <div className="card-icon" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                        <ShieldCheck size={16} />
                    </div>
                    <h4>Private Cloud</h4>
                    <p>Processed files are stored in your session memory and wiped upon page exit.</p>
                </div>
            </div>

            <div className="faq-section-help">
                <div className="section-header">
                    <Info size={16} /> <span>Common Questions</span>
                </div>
                <div className="faq-item">
                    <h5>Can I convert HEVC (H.265) files?</h5>
                    <p>Yes, our engine supports H.264, H.265, and VP9 source codecs through the browser's native decoder.</p>
                </div>
                <div className="faq-item">
                    <h5>What is the file size limit?</h5>
                    <p>Aura supports files up to 1GB per conversion. Contact support for Enterprise quotas.</p>
                </div>
            </div>
        </div>
    );
};

export default MP4ToAVIHelp;
