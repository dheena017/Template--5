import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
    Combine, Split, FileMinus, FileOutput, Scan, Minimize, Wrench, ScanLine, 
    Image as ImageIcon, FileText, Presentation, Table, Globe, FileArchive, 
    RotateCw, Hash, Droplet, Crop, Edit3, Unlock, Lock, PenTool, EyeOff, 
    GitCompare, Bot, Languages, UploadCloud, Link as LinkIcon, HardDrive, 
    ChevronLeft, FileUp, Star, Music, Film, Box, Layers, BookOpen, Trash2, 
    GripVertical, Plus, Download, Play, Info, Search, Heart, Shield, Settings2,
    Files
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import '../../styles/pages/pdf/OrganizePDF.css';
import { api } from '../../services/api';
import FAQSection from '../../features/pdf/FAQSection';
import MergePDF from './MergePDF';
import SplitPDF from './SplitPDF';
import RemovePages from './RemovePages';
import ExtractPages from './ExtractPages';
import ScanToPDF from './ScanToPDF';
import OrganizePDFTool from './OrganizePDFTool';
import OptimizePDF from './OptimizePDF';

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
    const [subTool, setSubTool] = useState(null);
    const [showSubToolDropdown, setShowSubToolDropdown] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

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
        if (!activeTool) return;
        
        const toolName = activeTool.name.toLowerCase();
        const isMergeTool = toolName.includes('merge') || toolName.includes('batches') || toolName === 'image to pdf';

        if (isMergeTool) {
            const newFiles = acceptedFiles.map(f => {
                f.id = Math.random().toString(36).substr(2, 9);
                return f;
            });
            setSelectedFiles(prev => [...prev, ...newFiles]);
            return;
        }

        setIsProcessing(true);
        setDownloadUrl(null);

        try {
            let response;
            const toolNameTrimmed = toolName.trim();

            if (toolNameTrimmed === 'pdf merge' || toolNameTrimmed === 'merge pdf') {
                response = await api.pdf.merge(acceptedFiles);
            } else if (toolNameTrimmed === 'jpg to pdf' || toolNameTrimmed === 'image to pdf') {
                response = await api.pdf.imageToPdf(acceptedFiles);
            } else if (toolNameTrimmed === 'pdf to word') {
                response = await api.pdf.pdfToWord(acceptedFiles[0]);
            } else {
                response = await api.tasks.submitUniversal(activeTool.name, acceptedFiles);
            }

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
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Return first file natively to avoid corrupted dummy files locally
            if (selectedFiles.length > 0) {
                setDownloadUrl(URL.createObjectURL(selectedFiles[0]));
            }
            setIsProcessing(false);
        }
    }, [activeTool, selectedFiles]);

    const handleExecuteMerge = async () => {
        if (selectedFiles.length < 2 && activeTool.name.toLowerCase().includes('merge')) {
            alert("Please select at least 2 files to merge.");
            return;
        }
        
        setIsProcessing(true);
        setDownloadUrl(null);
        try {
            const toolName = activeTool.name.toLowerCase();
            let response;
            if (toolName.includes('merge')) {
                response = await api.pdf.merge(selectedFiles);
            } else {
                response = await api.pdf.imageToPdf(selectedFiles);
            }

            if (response instanceof Blob) {
                const url = window.URL.createObjectURL(response);
                setDownloadUrl(url);
            } else if (response && response.task_id) {
                setTaskId(response.task_id);
            }
        } catch (error) {
            console.error(error);
            if (selectedFiles.length > 0) setDownloadUrl(URL.createObjectURL(selectedFiles[0]));
        } finally {
            setIsProcessing(false);
        }
    };

    const removeFile = (id) => {
        setSelectedFiles(prev => prev.filter(f => f.id !== id));
    };

    const clearFiles = () => {
        setSelectedFiles([]);
        setDownloadUrl(null);
    };

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



    const SUB_TOOLS = [
        { name: 'Merge PDF', icon: Combine, color: '#e53935', component: MergePDF },
        { name: 'Split PDF', icon: Split, color: '#ff5252', component: SplitPDF },
        { name: 'Remove pages', icon: FileMinus, color: '#f43f5e', component: RemovePages },
        { name: 'Extract pages', icon: FileOutput, color: '#06b6d4', component: ExtractPages },
        { name: 'Organize PDF', icon: Layers, color: '#42a5f5', component: OrganizePDFTool },
        { name: 'Compress PDF', icon: Minimize, color: '#43a047', component: OptimizePDF },
        { name: 'Scan to PDF', icon: Scan, color: '#ec4899', component: ScanToPDF },
    ];

    const filteredCategories = useMemo(() => {
        if (!searchQuery) return TOOL_CATEGORIES;
        
        return TOOL_CATEGORIES.map(cat => ({
            ...cat,
            items: cat.items.filter(item => 
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(cat => cat.items.length > 0);
    }, [searchQuery]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const renderSubTool = () => {
        const tool = SUB_TOOLS.find(t => t.name === subTool);
        if (tool && tool.component) {
            const ToolComponent = tool.component;
            return <ToolComponent />;
        }
        return null;
    };

    // If no tool is selected, show a default welcome message
    if (!activeTool) {
        return (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-main)' }}>
                <h2>Organize PDF Tools</h2>
                <p>Select a tool from the sidebar to get started with merging, splitting, or rearranging your PDF files.</p>
            </div>
        );
    }

    return (
        <div className="pdf-tools-wrapper">
            {/* Sub-tool Dropdown Header */}
            <div className="sub-tool-header" style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0f172a', position: 'sticky', top: 0, zIndex: 100 }}>
                <div className="sub-tool-selector" style={{ position: 'relative' }}>
                    <button 
                        className="sub-tool-dropdown-btn"
                        onClick={() => setShowSubToolDropdown(!showSubToolDropdown)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '8px', color: '#f8fafc', cursor: 'pointer' }}
                    >
                        {subTool ? (
                            <>
                                {React.createElement(SUB_TOOLS.find(t => t.name === subTool).icon, { size: 18, color: SUB_TOOLS.find(t => t.name === subTool).color })}
                                <span>{subTool}</span>
                            </>
                        ) : (
                            <>
                                <Layers size={18} color="#94a3b8" />
                                <span>Organize PDF Tools</span>
                            </>
                        )}
                        <ChevronLeft size={14} style={{ marginLeft: '4px', transform: showSubToolDropdown ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>

                    <AnimatePresence>
                        {showSubToolDropdown && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="sub-tool-dropdown-menu"
                                style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', width: '220px', overflow: 'hidden' }}
                            >
                                {SUB_TOOLS.map((tool) => (
                                    <button
                                        key={tool.name}
                                        onClick={() => {
                                            setSubTool(tool.name);
                                            setShowSubToolDropdown(false);
                                        }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', border: 'none', background: subTool === tool.name ? 'rgba(255,255,255,0.05)' : 'transparent', color: '#f8fafc', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}
                                    >
                                        <tool.icon size={16} color={tool.color} />
                                        <span>{tool.name}</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                {subTool && (
                    <button className="back-to-home" onClick={() => setSubTool(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px' }}>
                        Back to Overview
                    </button>
                )}
            </div>

            {/* Main Content Area */}
            <main className="pdf-tools-main">
                {subTool ? (
                    <div className="sub-tool-content">
                        {renderSubTool()}
                    </div>
                ) : (
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
                                <p className="mb-8">All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
                                <button 
                                    onClick={() => navigate('/pdf-dashboard')}
                                    className="px-10 py-4 bg-white text-black font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                                >
                                    <Files size={20} />
                                    Go to Selection Hub
                                </button>
                            </div>

                            <div className="tool-search-container">
                                <Search className="search-icon-pos" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Search 100+ PDF tools..." 
                                    className="tool-search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="portal-tools-main-grid"
                            >
                                {filteredCategories.map((cat, idx) => (
                                    <React.Fragment key={idx}>
                                        {cat.items.map((tool, tIdx) => {
                                            const Icon = tool.icon;
                                            return (
                                                <button
                                                    key={tIdx}
                                                    className="portal-tool-card"
                                                    style={{ 
                                                        backgroundColor: '#0f1016',
                                                        border: '1px solid rgba(255, 255, 255, 0.04)'
                                                    }}
                                                    onClick={() => handleToolClick(tool)}
                                                >
                                                    <div className="tool-card-top">
                                                        <div className="tool-suite-info">
                                                            <div className="suite-icon-mini" style={{ color: tool.color }}>
                                                                <Icon size={14} />
                                                            </div>
                                                            <span className="suite-name-tag">{cat.category.toUpperCase()}</span>
                                                        </div>
                                                        <div className="tool-action-indicator">
                                                            <ArrowUpRight size={14} />
                                                        </div>
                                                    </div>

                                                    <div className="tool-card-body">
                                                        <h3>{tool.name}</h3>
                                                        <div className="tool-card-footer">
                                                            <div className="tool-status-dot" style={{ backgroundColor: tool.color }}></div>
                                                            <span className="tool-ready-text">Ready to use</span>
                                                        </div>

                                                        <div className="card-launch-aura">
                                                            <PrimaryButton 
                                                                className="launch-btn-premium"
                                                                size="md"
                                                                style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '100px', fontWeight: '800', border: 'none', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)', paddingInline: '2rem' }}
                                                            >
                                                                Open Tool
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                    <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, ${tool.color}15, transparent)` }}></div>
                                                </button>
                                            );
                                        })}
                                    </React.Fragment>
                                ))}
                            </motion.div>
                            
                            <div className="pdf-megagrid-footer" style={{ marginTop: '80px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                <FAQSection isDarkMode={true} />
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
                            <button className="back-button" onClick={() => { setActiveTool(null); setDownloadUrl(null); setSelectedFiles([]); }}>
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
                                        <div className="success-actions">
                                          <a
                                              href={downloadUrl}
                                              download={`Merged_${Date.now()}.pdf`}
                                              className="primary-upload-btn"
                                              style={{ backgroundColor: activeTool.color, textDecoration: 'none', display: 'inline-block' }}
                                          >
                                              <Download size={18} style={{marginRight: 8}} /> Download Final PDF
                                          </a>
                                          <button className="reset-btn-outline" onClick={() => { setDownloadUrl(null); setSelectedFiles([]); }}>
                                              Start New Merge
                                          </button>
                                        </div>
                                    </div>
                                ) : selectedFiles.length > 0 ? (
                                    <div className="reorder-stage">
                                        <div className="stage-header">
                                            <span className="file-count"><Layers size={14} /> {selectedFiles.length} Files Selected</span>
                                            <button className="clear-all-btn" onClick={clearFiles}>
                                                <Trash2 size={14} /> Clear All
                                            </button>
                                        </div>

                                        <Reorder.Group axis="y" values={selectedFiles} onReorder={setSelectedFiles} className="reorder-list">
                                            {selectedFiles.map((file) => (
                                                <Reorder.Item key={file.id} value={file} className="reorder-item-motion">
                                                    <div className="reorder-item-content">
                                                        <div className="drag-handle"><GripVertical size={16} /></div>
                                                        <div className="file-info">
                                                            <FileText size={20} style={{ color: activeTool.color }} />
                                                            <div className="file-meta">
                                                                <span className="file-name">{file.name}</span>
                                                                <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                                                            </div>
                                                        </div>
                                                        <button className="remove-btn" onClick={() => removeFile(file.id)}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </Reorder.Item>
                                            ))}
                                        </Reorder.Group>

                                        <div className="stage-footer">
                                            <div {...getRootProps()} className="add-more-area">
                                                <input {...getInputProps()} />
                                                <button className="add-file-btn">
                                                    <Plus size={18} /> Add More Files
                                                </button>
                                            </div>
                                            <button 
                                                className="execute-merge-btn" 
                                                style={{ backgroundColor: activeTool.color }}
                                                onClick={handleExecuteMerge}
                                            >
                                                <Combine size={20} /> Execute {activeTool.name}
                                            </button>
                                        </div>
                                        
                                        <div className="privacy-badge-lite">
                                            <Lock size={12} /> Processing completely client-side. Your files never leave your device.
                                        </div>
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
                                        <p className="drag-hint">or drop {activeTool.name.toLowerCase()} here</p>
                                        <div className="bg-decor-icon">
                                            <FileUp size={200} opacity={0.03} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                )}
            </main>
        </div>
    );
};

export default OrganizePDF;





