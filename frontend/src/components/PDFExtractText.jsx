import React from 'react';
import Button from './Button';
import '../styles/pdfActions.css';

const PDFExtractText = ({ onExtractText, file, extractText, loading }) => (
  <div className="pdf-tool-section">
    <h3>Extract Text</h3>
    <div className="tool-controls">
      <Button 
        variant="primary" 
        onClick={onExtractText} 
        disabled={!file || loading}
        loading={loading}
        icon="📝"
      >
        Extract Text
      </Button>
    </div>

    {extractText && (
      <div className="text-result-container">
        <h4>Extracted Text</h4>
        <pre className="text-preview">
          {extractText}
        </pre>
        <Button variant="outline" size="sm" icon="📋" onClick={() => navigator.clipboard.writeText(extractText)}>
          Copy to Clipboard
        </Button>
      </div>
    )}
  </div>
);

export default PDFExtractText;
