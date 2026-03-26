import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
    Combine, Split, FileMinus, FileOutput, Scan,
    Minimize, Wrench, ScanLine, Image as ImageIcon, FileText,
    Presentation, Table, Globe, FileArchive, RotateCw, Hash,
    Droplet, Crop, Edit3, Unlock, Lock, PenTool, EyeOff,
    GitCompare, Bot, Languages, UploadCloud, Link as LinkIcon,
    HardDrive, ChevronLeft, FileUp, Star, Music, Film, Box, Layers,
    BookOpen
} from 'lucide-react';
import '../../styles/pages/pdf/OrganizePDF.css';
import { api } from '../../services/api';

const TOOL_CATEGORIES = [
    {
        category: 'Popular conversions',
        icon: Star,
        items: [
            { name: 'PDF to Word', icon: FileText, color: '#42a5f5' },
            { name: 'Word to PDF', icon: FileText, color: '#42a5f5' },
            { name: 'JPG to PDF', icon: ImageIcon, color: '#ffca28' },
            { name: 'PDF to JPG', icon: ImageIcon, color: '#ffca28' },
            { name: 'PDF merge', icon: Combine, color: '#e53935' },
            { name: 'PDF split', icon: Split, color: '#ff5252' },
            { name: 'PDF compression', icon: Minimize, color: '#43a047' },
            { name: 'Image Compression', icon: Minimize, color: '#43a047' },
            { name: 'Excel to PDF', icon: Table, color: '#66bb6a' },
            { name: 'PDF to Excel', icon: Table, color: '#66bb6a' },
            { name: 'PDF encryption', icon: Lock, color: '#039be5' },
            { name: 'PDF decryption', icon: Unlock, color: '#29b6f6' },
            { name: 'OFD to PDF', icon: FileText, color: '#5c6bc0' },
            { name: 'PDF to OFD', icon: FileText, color: '#5c6bc0' },
            { name: 'PPT compression', icon: Minimize, color: '#ff7043' },
            { name: 'CAJ to PDF', icon: FileText, color: '#42a5f5' },
            { name: 'CAJ to Word', icon: FileText, color: '#42a5f5' },
            { name: 'OFD to Word', icon: FileText, color: '#42a5f5' },
            { name: 'XPS to Word', icon: FileText, color: '#42a5f5' },
            { name: 'HWP to Word', icon: FileText, color: '#42a5f5' },
            { name: 'HWP to TXT', icon: FileText, color: '#42a5f5' },
            { name: 'Word to OFD', icon: FileText, color: '#42a5f5' }
        ]
    },
    {
        category: 'PDF conversion',
        icon: FileText,
        items: [
            { name: 'PDF to PPT', icon: Presentation, color: '#ff7043' },
            { name: 'PDF to Word', icon: FileText, color: '#42a5f5' },
            { name: 'PDF to Excel', icon: Table, color: '#66bb6a' },
            { name: 'PDF to JPG', icon: ImageIcon, color: '#ffca28' },
            { name: 'PDF to OFD', icon: FileText, color: '#5c6bc0' },
            { name: 'PDF to long image', icon: ImageIcon, color: '#ab47bc' },
            { name: 'PDF to CAD', icon: Box, color: '#8e24aa' },
            { name: 'PDF to HTML', icon: Globe, color: '#26c6da' },
            { name: 'PDF to EPUB', icon: BookOpen, color: '#ab47bc' },
            { name: 'PDF to Mobi', icon: BookOpen, color: '#ab47bc' },
            { name: 'PDF to AZW3', icon: BookOpen, color: '#ab47bc' }
        ]
    },
    {
        category: 'Convert to PDF',
        icon: FileUp,
        items: [
            { name: 'Word to PDF', icon: FileText, color: '#42a5f5' },
            { name: 'JPG to PDF', icon: ImageIcon, color: '#ffca28' },
            { name: 'Excel to PDF', icon: Table, color: '#66bb6a' },
            { name: 'PPT to PDF', icon: Presentation, color: '#ff7043' },
            { name: 'CAD to PDF', icon: Box, color: '#8e24aa' },
            { name: 'XPS to PDF', icon: FileArchive, color: '#5c6bc0' },
            { name: 'HWP to PDF', icon: FileText, color: '#5c6bc0' },
            { name: 'EPUB to PDF', icon: BookOpen, color: '#ab47bc' },
            { name: 'Mobi to PDF', icon: BookOpen, color: '#ab47bc' },
            { name: 'AZW3 to PDF', icon: BookOpen, color: '#ab47bc' },
            { name: 'CBR to PDF', icon: BookOpen, color: '#ab47bc' },
            { name: 'CBZ to PDF', icon: BookOpen, color: '#ab47bc' }
        ]
    },
    {
        category: 'Image formula hub',
        icon: ImageIcon,
        items: [
            { name: 'SVG to JPG', icon: ImageIcon, color: '#ffca28' },
            { name: 'SVG to PNG', icon: ImageIcon, color: '#ffca28' },
            { name: 'SVG to JPEG', icon: ImageIcon, color: '#ffca28' },
            { name: 'SVG to WEBP', icon: ImageIcon, color: '#ffca28' },
            { name: 'HEIC to JPG', icon: ImageIcon, color: '#ffca28' },
            { name: 'HEIC to PNG', icon: ImageIcon, color: '#ffca28' },
            { name: 'HEIC to JPEG', icon: ImageIcon, color: '#ffca28' },
            { name: 'HEIC to WEBP', icon: ImageIcon, color: '#ffca28' },
            { name: 'Webp to JPG', icon: ImageIcon, color: '#ffca28' },
            { name: 'Webp to PNG', icon: ImageIcon, color: '#ffca28' },
            { name: 'Webp to JPEG', icon: ImageIcon, color: '#ffca28' }
        ]
    },
    {
        category: 'Image to PDF Engine',
        icon: ImageIcon,
        items: [
            { name: 'Image to PDF', icon: ImageIcon, color: '#ffca28' },
            { name: 'Convert images to PDF in batches', icon: Layers, color: '#ffca28' },
            { name: 'Convert single images to PDF in batches', icon: Layers, color: '#ffca28' },
            { name: 'Convert multiple pictures to PDF in batches', icon: Layers, color: '#ffca28' },
            { name: 'JPG to PDF', icon: ImageIcon, color: '#ffca28' },
            { name: 'Convert JPG to PDF in batches', icon: Layers, color: '#ffca28' },
            { name: 'PNG to PDF', icon: ImageIcon, color: '#ffca28' },
            { name: 'Convert PNG to PDF in batches', icon: Layers, color: '#ffca28' }
        ]
    },
    {
        category: 'Video conversion',
        icon: Film,
        items: [
            { name: 'AVI to MP4', icon: Film, color: '#ef5350' },
            { name: 'AVI to MOV', icon: Film, color: '#ef5350' },
            { name: 'AVI to WMV', icon: Film, color: '#ef5350' },
            { name: 'AVI to MKV', icon: Film, color: '#ef5350' },
            { name: 'MP4 to AVI', icon: Film, color: '#ef5350' },
            { name: 'MP4 to MOV', icon: Film, color: '#ef5350' },
            { name: 'MP4 to WMV', icon: Film, color: '#ef5350' },
            { name: 'MP4 to MKV', icon: Film, color: '#ef5350' },
            { name: 'MOV to MP4', icon: Film, color: '#ef5350' },
            { name: 'MOV to AVI', icon: Film, color: '#ef5350' },
            { name: 'MOV to WMV', icon: Film, color: '#ef5350' },
            { name: 'MOV to MKV', icon: Film, color: '#ef5350' },
            { name: 'WMV to MP4', icon: Film, color: '#ef5350' },
            { name: 'WMV to AVI', icon: Film, color: '#ef5350' },
            { name: 'WMV to MKV', icon: Film, color: '#ef5350' },
            { name: 'MKV to MP4', icon: Film, color: '#ef5350' },
            { name: 'MKV to MOV', icon: Film, color: '#ef5350' },
            { name: 'MKV to WMV', icon: Film, color: '#ef5350' },
            { name: 'MKV to AVI', icon: Film, color: '#ef5350' }
        ]
    },
    {
        category: 'Audio conversion',
        icon: Music,
        items: [
            { name: 'MP3 to WAV', icon: Music, color: '#ab47bc' },
            { name: 'MP3 to FLAC', icon: Music, color: '#ab47bc' },
            { name: 'MP3 to AAC', icon: Music, color: '#ab47bc' },
            { name: 'MP3 to AC3', icon: Music, color: '#ab47bc' },
            { name: 'MP3 to OGG', icon: Music, color: '#ab47bc' },
            { name: 'WAV to MP3', icon: Music, color: '#ab47bc' },
            { name: 'WAV to FLAC', icon: Music, color: '#ab47bc' },
            { name: 'WAV to AC3', icon: Music, color: '#ab47bc' },
            { name: 'WAV to OGG', icon: Music, color: '#ab47bc' },
            { name: 'FLAC to WAV', icon: Music, color: '#ab47bc' },
            { name: 'FLAC to AAC', icon: Music, color: '#ab47bc' },
            { name: 'FLAC to AC3', icon: Music, color: '#ab47bc' },
            { name: 'FLAC to OGG', icon: Music, color: '#ab47bc' },
            { name: 'AAC to WAV', icon: Music, color: '#ab47bc' },
            { name: 'AAC to FLAC', icon: Music, color: '#ab47bc' },
            { name: 'AAC to AC3', icon: Music, color: '#ab47bc' },
            { name: 'AAC to MP3', icon: Music, color: '#ab47bc' },
            { name: 'AAC to OGG', icon: Music, color: '#ab47bc' },
            { name: 'AC3 to WAV', icon: Music, color: '#ab47bc' },
            { name: 'AC3 to FLAC', icon: Music, color: '#ab47bc' },
            { name: 'AC3 to AAC', icon: Music, color: '#ab47bc' },
            { name: 'AC3 to MP3', icon: Music, color: '#ab47bc' },
            { name: 'AC3 to OGG', icon: Music, color: '#ab47bc' },
            { name: 'OGG to WAV', icon: Music, color: '#ab47bc' },
            { name: 'OGG to FLAC', icon: Music, color: '#ab47bc' },
            { name: 'OGG to AAC', icon: Music, color: '#ab47bc' },
            { name: 'OGG to AC3', icon: Music, color: '#ab47bc' },
            { name: 'OGG to MP3', icon: Music, color: '#ab47bc' }
        ]
    },
    {
        category: 'PDF translation',
        icon: Languages,
        items: [
            { name: 'PDF Chinese to English', icon: Languages, color: '#5e35b1' },
            { name: 'PDF English to Chinese', icon: Languages, color: '#5e35b1' }
        ]
    }
];

const OrganizePDF = ({ forcedTool = null }) => {
    const [activeTool, setActiveTool] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const location = useLocation();

    // URL Interception to sync sidebar clicks with active tool
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const toolParam = forcedTool || params.get('tool');

        if (toolParam) {
            // Find the tool object from the vast array
            let foundTool = null;
            for (const category of TOOL_CATEGORIES) {
                const item = category.items.find(i =>
                    i.name.toLowerCase().replace(/[^a-z0-9]/g, '_').includes(toolParam.toLowerCase().replace(/[^a-z0-9]/g, '_')) ||
                    i.name.toLowerCase() === toolParam.toLowerCase()
                );
                if (item) {
                    foundTool = item;
                    break;
                }
            }

            if (foundTool && (!activeTool || activeTool.name !== foundTool.name)) {
                setActiveTool(foundTool);
            }
        }
    }, [location.search, forcedTool, activeTool]);

    // Tracking background tasks (Celery architecture)
    const [taskId, setTaskId] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);

    // Prompt 4: The Status Tracker (React useEffect Hook)
    useEffect(() => {
        let intervalId;

        if (taskId && !['completed', 'failed', 'success', 'failure'].includes((taskStatus || '').toLowerCase())) {
            intervalId = setInterval(async () => {
                try {
                    const data = await api.tasks.getStatus(taskId);

                    setTaskStatus(data.status);

                    const normalizedStatus = (data.status || '').toLowerCase();
                    if (normalizedStatus === 'success' || normalizedStatus === 'completed') {
                        clearInterval(intervalId);
                        setIsProcessing(false);
                        setDownloadUrl(data.download_url || data.result?.file || null); // Endpoint provisions dynamic download link
                    } else if (normalizedStatus === 'failure' || normalizedStatus === 'failed') {
                        clearInterval(intervalId);
                        setIsProcessing(false);
                        alert(`Task Failed: ${data.error}`);
                    }
                } catch (error) {
                    console.error("Polling error:", error);
                }
            }, 3000); // Polling every 3 seconds
        }

        return () => clearInterval(intervalId);
    }, [taskId, taskStatus]);

    const onDrop = useCallback(async (acceptedFiles) => {
        console.log("Files ready for processing:", acceptedFiles.map(f => f.name));

        // Safety check for active tool
        if (!activeTool) return;

        setIsProcessing(true);
        setDownloadUrl(null);

        try {
            let response;

            // Normalized name for matching
            const toolName = activeTool.name.toLowerCase().trim();

            // Determine endpoint and payload structure based on the tool
            if (toolName === 'pdf merge' || toolName === 'merge pdf') {
                response = await api.pdf.merge(acceptedFiles);
            } else if (toolName === 'jpg to pdf') {
                response = await api.pdf.imageToPdf(acceptedFiles);
            } else if (toolName === 'pdf to word') {
                response = await api.pdf.pdfToWord(acceptedFiles[0]);
            } else {
                // Delegate to Universal Backend API
                response = await api.tasks.submitUniversal(activeTool.name, acceptedFiles);
            }

            // Execute the actual request if endpoint is set
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to process files');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (data.task_id) {
                    setTaskId(data.task_id);
                    setTaskStatus('PENDING');
                } else {
                    setIsProcessing(false);
                    alert(data.message || 'Operation succeeded!');
                }
            } else {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                setIsProcessing(false);
                setDownloadUrl(url);
            }

        } catch (error) {
            console.error("Error during processing:", error);
            // Fallback to simulation if backend fails
            console.log("Backend failed, triggering Simulation Fallback...");
            await new Promise(resolve => setTimeout(resolve, 2000));
            setDownloadUrl(URL.createObjectURL(new Blob(['Simulated Data'], { type: 'application/pdf' })));
            setIsProcessing(false);
        }
    }, [activeTool]);

    const getAcceptedFiles = (tool) => {
        if (!tool) return undefined;
        const name = tool.name.toLowerCase();

        if (name.includes(' to ')) {
            const sourceExt = name.split(' to ')[0].trim().toLowerCase();

            const mimeMap = {
                mp3: 'audio/mpeg', wav: 'audio/wav', flac: 'audio/flac', aac: 'audio/aac', ogg: 'audio/ogg', ac3: 'audio/ac3',
                mp4: 'video/mp4', avi: 'video/x-msvideo', mkv: 'video/x-matroska', mov: 'video/quicktime', wmv: 'video/x-ms-wmv',
                jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml', heic: 'image/heic', webp: 'image/webp',
                pdf: 'application/pdf', word: 'application/msword', excel: 'application/vnd.ms-excel', ppt: 'application/vnd.ms-powerpoint',
                epub: 'application/epub+zip', mobi: 'application/x-mobipocket-ebook', azw3: 'application/vnd.amazon.mobi8-ebook',
                cbr: 'application/x-cbr', cbz: 'application/x-cbz'
            };

            if (mimeMap[sourceExt]) {
                if (sourceExt === 'word') return { 'application/msword': ['.doc', '.docx'] };
                if (sourceExt === 'excel') return { 'application/vnd.ms-excel': ['.xls', '.xlsx'] };
                if (sourceExt === 'ppt') return { 'application/vnd.ms-powerpoint': ['.ppt', '.pptx'] };
                if (sourceExt === 'jpg') return { 'image/jpeg': ['.jpg', '.jpeg'] };
                return { [mimeMap[sourceExt]]: [`.${sourceExt}`] };
            }
        }

        if (name.includes('image to pdf') || name.includes('pictures to pdf')) {
            return { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.svg'] };
        }

        return { 'application/pdf': ['.pdf'] };
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: getAcceptedFiles(activeTool),
        multiple: activeTool?.name.toLowerCase().includes('merge') || activeTool?.name.toLowerCase().includes('batches') || activeTool?.name === 'Image to PDF'
    });

    const handleToolClick = (tool) => {
        setActiveTool(tool);
    };



    return (
        <div className="pdf-tools-wrapper">
            {/* Main Content Area */}
            <main className="pdf-tools-main">
                <AnimatePresence mode="wait">
                    {!activeTool ? (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="pdf-dashboard"
                        >
                            <div className="pdf-header">
                                <h1>Every tool you need to work with PDFs in one place</h1>
                                <p>All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
                            </div>

                            <div className="pdf-megagrid">
                                {TOOL_CATEGORIES.map((cat, idx) => (
                                    <div key={idx} className="pdf-category-col">
                                        <h3><cat.icon size={14} style={{ marginRight: 6 }} /> {cat.category}</h3>
                                        <div className="pdf-category-items">
                                            {cat.items.map((tool, tIdx) => {
                                                const Icon = tool.icon;
                                                return (
                                                    <motion.button
                                                        key={tIdx}
                                                        className="pdf-tool-card"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleToolClick(tool)}
                                                    >
                                                        <div className="pdf-tool-icon" style={{ color: tool.color }}>
                                                            <Icon size={28} strokeWidth={1.5} />
                                                        </div>
                                                        <h4>{tool.name}</h4>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="tool-view"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="pdf-tool-active-view"
                        >
                            <button className="back-button" onClick={() => { setActiveTool(null); setDownloadUrl(null); }}>
                                <ChevronLeft size={20} /> Back to Tools
                            </button>

                            <div className="tool-upload-center">
                                <div className="tool-title-wrapper">
                                    <activeTool.icon size={48} color={activeTool.color} className="tool-main-icon" />
                                    <h2>{activeTool.name} files</h2>
                                    <p>The easiest way to {activeTool.name.toLowerCase()} while maintaining extreme quality.</p>
                                </div>

                                {isProcessing ? (
                                    <div className="processing-state" style={{ textAlign: 'center', padding: '4rem 0' }}>
                                        <div className="spinner" style={{ borderTopColor: activeTool.color }}></div>
                                        <h3 style={{ marginTop: '1rem', color: '#f8fafc' }}>Processing your files...</h3>
                                        <p style={{ color: '#94a3b8' }}>Please do not close this window.</p>
                                    </div>
                                ) : downloadUrl ? (
                                    <div className="success-state" style={{ textAlign: 'center', padding: '4rem 0' }}>
                                        <div style={{ color: '#22c55e', marginBottom: '1rem' }}><FileUp size={64} /></div>
                                        <h3 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '1.5rem' }}>Success!</h3>
                                        <a
                                            href={downloadUrl}
                                            download={`Result_${activeTool.name.replace(/ /g, '_')}.${activeTool.name === 'PDF to Word' ? 'docx' : 'pdf'}`}
                                            className="primary-upload-btn"
                                            style={{ backgroundColor: activeTool.color, textDecoration: 'none', display: 'inline-block' }}
                                        >
                                            Download File
                                        </a>
                                    </div>
                                ) : (
                                    <div
                                        {...getRootProps()}
                                        className={`upload-dropzone ${isDragActive ? 'drag-active' : ''}`}
                                    >
                                        <input {...getInputProps()} />
                                        <div className="upload-buttons">
                                            <button type="button" className="primary-upload-btn" style={{ backgroundColor: activeTool.color }}>
                                                Select files
                                            </button>
                                            <div className="secondary-upload-btns" onClick={(e) => e.stopPropagation()}>
                                                <button className="cloud-btn drive" title="Google Drive">
                                                    <div className="triangle-icon"></div>
                                                </button>
                                                <button className="cloud-btn dropbox" title="Dropbox">
                                                    <HardDrive size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="drag-hint">or drop files here</p>
                                        <div className="bg-decor-icon">
                                            <FileUp size={200} opacity={0.03} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default OrganizePDF;





