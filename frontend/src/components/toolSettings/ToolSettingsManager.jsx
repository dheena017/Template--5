import React from 'react';
import { 
    MergePDFSettings, 
    SplitPDFSettings, 
    RemovePagesSettings, 
    ExtractPagesSettings, 
    ScanToPDFSettings, 
    OrganizePDFSettings,
    OCRPDFSettings,
    OfficeToolsSettings,
    EbookConversionSettings,
    AudioConversionSettings,
    ImageConversionSettings
} from './index';

/**
 * ToolSettingsManager renders the correct tool-specific settings panel
 * based on the active tool/tab.
 */
const ToolSettingsManager = ({ toolId, open, onClose }) => {
    if (!open) return null;

    // Map tool IDs to their corresponding settings components
    switch (toolId) {
        case 'merge':
        case 'pdf/merge':
            return <MergePDFSettings open={open} onClose={onClose} onApply={() => onClose()} />;
        
        case 'split':
        case 'pdf/split':
            return <SplitPDFSettings open={open} onClose={onClose} onApply={() => onClose()} />;
        
        case 'remove-pages':
            return <RemovePagesSettings open={open} onClose={onClose} onApply={() => onClose()} />;
        
        case 'extract-pages':
            return <ExtractPagesSettings open={open} onClose={onClose} onApply={() => onClose()} />;
        
        case 'organize-pdf':
            return <OrganizePDFSettings open={open} onClose={onClose} onApply={() => onClose()} />;
        
        case 'scan-to-pdf':
            return <ScanToPDFSettings open={open} onClose={onClose} onApply={() => onClose()} />;
        
        case 'ocr-pdf':
            return <OCRPDFSettings open={open} onClose={onClose} onApply={() => onClose()} />;

        // Hubs/Categories that use generic settings panels
        case 'video-conversion':
            return <OfficeToolsSettings open={open} onClose={onClose} onApply={() => onClose()} />;
            
        case 'audio-conversion':
            return <AudioConversionSettings open={open} onClose={onClose} onApply={() => onClose()} />;
            
        case 'image-conversion':
            return <ImageConversionSettings open={open} onClose={onClose} onApply={() => onClose()} />;
            
        case 'document-conversion':
            return <OfficeToolsSettings open={open} onClose={onClose} onApply={() => onClose()} />;

        case 'ebook-conversion':
            return <EbookConversionSettings open={open} onClose={onClose} onApply={() => onClose()} />;

        default:
            return null;
    }
};

export default ToolSettingsManager;
