import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, UploadCloud, Trash2, FolderOpen } from 'lucide-react';
import '../../styles/pages/dashboards/UserDashboard.css';
import { api } from '../../services/api';

const UserDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Prompt 5: Setup integration using useEffect and fetch
  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const data = await api.documents.list();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      // Fallback data for preview purposes if API fails
      setDocuments([
        { id: 1, filename: 'Q3_Financial_Report.pdf', status: 'Uploaded', created_at: new Date().toISOString() },
        { id: 2, filename: 'Logo_Assets.zip', status: 'Processing', created_at: new Date().toISOString() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    
    try {
      const ok = await api.documents.remove(id);
      if (ok) {
        setDocuments(documents.filter(doc => doc.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const handleUpload = () => {
    // Basic stub for the upload button interactions
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        await api.documents.upload(file);
        fetchDocuments(); // Refresh table
      } catch (err) {
         console.error("Upload error", err);
      }
    };
    fileInput.click();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="user-dashboard-wrapper">
      <main className="ud-main-content">
        <div className="ud-header">
          <h1>User Dashboard</h1>
          <button className="ud-upload-btn" onClick={handleUpload}>
            <UploadCloud size={20} />
            Upload New File
          </button>
        </div>

        {/* Data Table Container */}
        <div className="ud-table-container">
          {isLoading ? (
            <div className="ud-spinner-container">
              <div className="ud-spinner"></div>
            </div>
          ) : documents.length === 0 ? (
             <div className="ud-empty">
                <FolderOpen size={48} opacity={0.2} />
                <p>You haven't uploaded any documents yet.</p>
             </div>
          ) : (
            <table className="ud-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Uploaded</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Prompt 5: Map array to populate UI table rows dynamically */}
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500 }}>
                        <FileText size={18} color="#9ca3af" />
                        {doc.filename || `Document_${doc.id}`}
                      </div>
                    </td>
                    <td>{formatDate(doc.created_at)}</td>
                    <td>
                      <span className={`ud-status ${doc.status?.toLowerCase() === 'uploaded' ? 'uploaded' : 'processing'}`}>
                        {doc.status || 'Uploaded'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="ud-action-btn"
                        onClick={() => handleDelete(doc.id)}
                        title="Delete Document"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

