import React from 'react';
import Button from './Button';
import '../styles/pdfActions.css';

const PDFCompress = ({ onCompress, file, compressResultUrl, loading }) => (
  <div className="pdf-tool-section">
    <h3>Compress PDF</h3>
    <div className="tool-controls">
      <Button 
        variant="primary" 
        onClick={onCompress} 
        disabled={!file || loading}
        loading={loading}
        icon="📉"
      >
        Compress Now
      </Button>
    </div>

    {compressResultUrl && (
      <div className="result-container" style={{ marginTop: '24px' }}>
        <Button variant="secondary" icon="📥">
          <a href={compressResultUrl} download="compressed.pdf" style={{color: 'inherit', textDecoration: 'none'}}>Download Compressed PDF</a>
        </Button>
        <div className="preview-frame">
          <iframe 
            src={compressResultUrl} 
            title="Compressed PDF" 
            width="100%" 
            height="300px" 
            style={{ border: '1px solid #eee', borderRadius: '12px', marginTop: '16px' }} 
          />
        </div>
      </div>
    )}
  </div>
);

export default PDFCompress;
