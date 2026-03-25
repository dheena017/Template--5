import React from 'react';
import Button from './Button';
import '../styles/pdfActions.css';

const PDFMerge = ({ onFilesChange, onMerge, mergeFiles, mergeResultUrl, loading }) => (
  <div className="pdf-tool-section">
    <h3>Merge PDFs</h3>
    <div className="tool-controls">
      <input 
        type="file" 
        id="merge-upload" 
        accept="application/pdf" 
        multiple 
        onChange={onFilesChange} 
        hidden
      />
      <label htmlFor="merge-upload" className="custom-file-upload">
        <Button variant="outline" icon="📂" onClick={() => document.getElementById('merge-upload').click()}>
          Select PDF Files
        </Button>
      </label>
      
      <Button 
        variant="primary" 
        onClick={onMerge} 
        disabled={mergeFiles.length < 2 || loading}
        loading={loading}
        icon="🔗"
      >
        Merge PDFs
      </Button>
    </div>

    {mergeFiles.length > 0 && (
      <div className="selected-files-list">
        <p>Selected {mergeFiles.length} files:</p>
        <ul>
          {mergeFiles.map((f, i) => <li key={i}>{f.name}</li>)}
        </ul>
      </div>
    )}

    {mergeResultUrl && (
      <div className="result-container">
        <Button variant="secondary" icon="📥" onClick={() => window.open(mergeResultUrl, '_blank')}>
          <a href={mergeResultUrl} download="merged.pdf" style={{color: 'inherit', textDecoration: 'none'}}>Download Merged PDF</a>
        </Button>
        <div className="preview-frame">
          <iframe src={mergeResultUrl} title="Merged PDF" width="100%" height="300px" style={{ border: '1px solid #eee', borderRadius: '12px', marginTop: '16px' }} />
        </div>
      </div>
    )}
  </div>
);

export default PDFMerge;
