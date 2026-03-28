import React, { useState, useCallback } from 'react';
import { Scan, Download, FileText, Lock, ChevronLeft, FileUp, Trash2, Camera, Plus, Layers } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import '../../styles/pages/pdf/OrganizePDF.css';

const ScanToPDF = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const activeTool = { name: 'Scan to PDF', icon: Scan, color: '#ec4899' };

    const onDrop = useCallback(async (acceptedFiles) => {
        const newFiles = acceptedFiles.map(f => {
            f.id = Math.random().toString(36).substr(2, 9);
            return f;
        });
        setSelectedFiles(prev => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
        multiple: true
    });

    const handleExecuteScan = async () => {
        if (selectedFiles.length === 0) return;
        
        setIsProcessing(true);
        setDownloadUrl(null);
        try {
            const response = await api.pdf.imageToPdf(selectedFiles);
            if (response instanceof Blob) {
                const url = window.URL.createObjectURL(response);
                setDownloadUrl(url);
            }
        } catch (error) {
            console.error(error);
            alert("Scanning to PDF failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const clearFiles = () => {
        setSelectedFiles([]);
        setDownloadUrl(null);
    };

    const removeFile = (id) => {
        setSelectedFiles(prev => prev.filter(f => f.id !== id));
    };

    return (
        <div className="pdf-tools-wrapper">
            <main className="pdf-tools-main">
                <div className="pdf-tool-active-view">
                    <div className="tool-upload-center">
                        <div className="tool-title-wrapper">
                            <activeTool.icon size={48} color={activeTool.color} className="tool-main-icon" />
                            <h2>{activeTool.name}</h2>
                            <p>Capture document images via mobile or upload photos to convert them into high-quality PDFs.</p>
                        </div>

                        {isProcessing ? (
                            <div className="processing-state" style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <div className="spinner" style={{ borderTopColor: activeTool.color }}></div>
                                <h3 style={{ marginTop: '1rem', color: '#f8fafc' }}>Generating PDF...</h3>
                            </div>
                        ) : downloadUrl ? (
                            <div className="success-state" style={{ textAlign: 'center', padding: '4rem 0' }}>
                                <div style={{ color: '#22c55e', marginBottom: '1rem' }}><FileUp size={64} /></div>
                                <h3 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '1.5rem' }}>Success!</h3>
                                <div className="success-actions">
                                    <a href={downloadUrl} download={`scanned_${Date.now()}.pdf`} className="primary-upload-btn" style={{ backgroundColor: activeTool.color, textDecoration: 'none', display: 'inline-block' }}>
                                        <Download size={18} style={{marginRight: 8}} /> Download Scanned PDF
                                    </a>
                                    <button className="reset-btn-outline" onClick={clearFiles}>Start Over</button>
                                </div>
                            </div>
                        ) : selectedFiles.length > 0 ? (
                            <div className="reorder-stage">
                                <div className="stage-header">
                                    <span className="file-count"><Layers size={14} /> {selectedFiles.length} Images Selected</span>
                                    <button className="clear-all-btn" onClick={clearFiles}><Trash2 size={14} /> Clear All</button>
                                </div>
                                <div className="file-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem', margin: '2rem 0' }}>
                                    {selectedFiles.map((file) => (
                                        <div key={file.id} style={{ position: 'relative', aspectRatio: '1', background: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
                                            <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button 
                                                onClick={() => removeFile(file.id)}
                                                style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', color: 'white', padding: '4px', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="stage-footer">
                                    <div {...getRootProps()} className="add-more-area">
                                        <input {...getInputProps()} />
                                        <button className="add-file-btn"><Plus size={18} /> Add Images</button>
                                    </div>
                                    <button className="execute-merge-btn" style={{ backgroundColor: activeTool.color }} onClick={handleExecuteScan}>
                                        Convert to PDF
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div {...getRootProps()} className={`upload-dropzone ${isDragActive ? 'drag-active' : ''}`}>
                                <input {...getInputProps()} />
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
                                    <button type="button" className="primary-upload-btn" style={{ backgroundColor: activeTool.color }}>Select Photos</button>
                                </div>
                                <p className="drag-hint">or drop images here</p>
                                <div style={{ marginTop: '2rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <Camera size={20} />
                                    <span>Supports JPG, PNG, WEBP</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScanToPDF;
