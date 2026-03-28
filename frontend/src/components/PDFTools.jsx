import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import { mergePDFs } from '../utils/pdfMerge';
import { compressPDF } from '../utils/pdfCompress';
import { extractTextFromPDF } from '../utils/pdfConvert';
import PDFMerge from './PDFMerge';
import PDFCompress from './PDFCompress';
import PDFExtractText from './PDFExtractText';
import Button from './Button';

function PDFTools({ initialView }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pageCount, setPageCount] = useState(null);
  const [error, setError] = useState('');
  const [mergeFiles, setMergeFiles] = useState([]);
  const [mergeResultUrl, setMergeResultUrl] = useState('');
  const [compressResultUrl, setCompressResultUrl] = useState('');
  const [extractText, setExtractText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setError('');
    setPageCount(null);
    setCompressResultUrl('');
    setExtractText('');
    
    setPdfUrl(URL.createObjectURL(selectedFile));
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPageCount(pdf.numPages);
    } catch (err) {
      setError('Failed to read PDF.');
    }
  };

  const handleMergeFilesChange = (e) => {
    setMergeFiles(Array.from(e.target.files));
    setMergeResultUrl('');
  };

  const handleMerge = async () => {
    setLoading(true);
    setError('');
    try {
      const mergedBytes = await mergePDFs(mergeFiles);
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      setMergeResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError('Failed to merge PDFs.');
    }
    setLoading(false);
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const compressedBytes = await compressPDF(file);
      const blob = new Blob([compressedBytes], { type: 'application/pdf' });
      setCompressResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError('Failed to compress PDF.');
    }
    setLoading(false);
  };

  const handleExtractText = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const text = await extractTextFromPDF(file);
      setExtractText(text);
    } catch (err) {
      setError('Failed to extract text.');
    }
    setLoading(false);
  };

  const getTitle = () => {
      if (initialView === 'merge' || initialView === 'organize-pdf') return 'Merge PDF Files';
      if (initialView === 'compress' || initialView === 'optimize-pdf') return 'Compress PDF File';
      if (initialView === 'extract' || initialView === 'pdf-intelligence') return 'Extract Text from PDF';
      if (initialView === 'edit-pdf') return 'Edit PDF Document';
      return 'PDF Tools';
  }

  return (
    <div style={{ padding: '40px 64px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '32px' }}>{getTitle()}</h2>
      
      {initialView !== 'merge' && (
        <div style={{ marginBottom: '40px', background: '#f9f9fb', padding: '32px', borderRadius: '16px', border: '1px solid #f1f1f1' }}>
          <p style={{ fontWeight: 600, marginBottom: '20px' }}>Upload the PDF you want to process:</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <input 
                type="file" 
                id="tool-upload"
                accept="application/pdf" 
                onChange={handleFileChange} 
                className="hidden-input"
                style={{ display: 'none' }}
              />
              <Button variant="outline" icon="📂" onClick={() => document.getElementById('tool-upload').click()}>
                {file ? 'Change File' : 'Choose File'}
              </Button>
              {fileName && <span style={{ fontSize: '0.9rem', color: '#666' }}>{fileName} {pageCount && `(${pageCount} pages)`}</span>}
          </div>
        </div>
      )}
      
      {error && <p style={{ color: '#ef4444', background: '#fef2f2', padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>{error}</p>}
      
      {(initialView === 'merge' || initialView === 'organize-pdf') && (
        <PDFMerge 
          onFilesChange={handleMergeFilesChange}
          onMerge={handleMerge}
          mergeFiles={mergeFiles}
          mergeResultUrl={mergeResultUrl}
          loading={loading}
        />
      )}

      {(initialView === 'compress' || initialView === 'optimize-pdf') && (
        <PDFCompress 
          onCompress={handleCompress}
          file={file}
          compressResultUrl={compressResultUrl}
          loading={loading}
        />
      )}

      {(initialView === 'extract' || initialView === 'pdf-intelligence') && (
        <PDFExtractText 
          onExtractText={handleExtractText}
          file={file}
          extractText={extractText}
          loading={loading}
        />
      )}

      {pdfUrl && initialView !== 'merge' && !compressResultUrl && (
        <div style={{ marginTop: '48px' }}>
          <h4 style={{ marginBottom: '16px' }}>Document Preview</h4>
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="600px"
            style={{ border: '1px solid #eee', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
          />
        </div>
      )}
    </div>
  );
}

export default PDFTools;
