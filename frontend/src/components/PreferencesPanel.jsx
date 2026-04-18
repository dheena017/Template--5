import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertCircle } from 'lucide-react';
import usePreferences from '../../hooks/usePreferences';
import './PreferencesPanel.css';

const PreferencesPanel = () => {
  const { getAllPreferences, clearAllPreferences, clearPreference } = usePreferences();
  const [preferences, setPreferences] = useState(() => getAllPreferences());
  const [showConfirm, setShowConfirm] = useState(false);
  const [clearingKey, setClearingKey] = useState(null);

  const handleClearOne = (key) => {
    clearPreference(key);
    setPreferences(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    setClearingKey(null);
  };

  const handleClearAll = () => {
    clearAllPreferences();
    setPreferences({});
    setShowConfirm(false);
  };

  const prefCount = Object.keys(preferences).length;
  const prefSize = new Blob([JSON.stringify(preferences)]).size;

  return (
    <div className="preferences-panel">
      <div className="pref-header">
        <h3>User Preferences & Data</h3>
        <p className="pref-subtitle">Manage saved settings and conversion history</p>
      </div>

      <div className="pref-stats">
        <div className="stat-card">
          <div className="stat-value">{prefCount}</div>
          <div className="stat-label">Saved Settings</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{Math.round(prefSize / 1024)}</div>
          <div className="stat-label">Data Size (KB)</div>
        </div>
      </div>

      <div className="pref-list">
        <h4>Stored Preferences:</h4>
        {prefCount === 0 ? (
          <p className="empty-state">No stored preferences yet. Your settings will appear here.</p>
        ) : (
          <div className="pref-items">
            {Object.entries(preferences).map(([key, value]) => (
              <div key={key} className="pref-item">
                <div className="pref-item-info">
                  <div className="pref-key">{key}</div>
                  <div className="pref-value">
                    {typeof value === 'object'
                      ? JSON.stringify(value).substring(0, 50) + '...'
                      : String(value).substring(0, 50)}
                  </div>
                </div>
                <button
                  className="pref-item-btn"
                  onClick={() => handleClearOne(key)}
                  title={`Clear ${key}`}
                  aria-label={`Delete ${key}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pref-actions">
        {prefCount > 0 && (
          <>
            {showConfirm ? (
              <div className="confirm-panel">
                <div className="confirm-message">
                  <AlertCircle size={18} />
                  <div>
                    <p>Are you sure you want to clear all preferences?</p>
                    <p className="confirm-hint">This cannot be undone.</p>
                  </div>
                </div>
                <div className="confirm-buttons">
                  <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                    Cancel
                  </button>
                  <button className="btn-danger" onClick={handleClearAll}>
                    Clear All
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn-clear-all"
                onClick={() => setShowConfirm(true)}
              >
                <RotateCcw size={16} />
                Clear All Preferences
              </button>
            )}
          </>
        )}
      </div>

      <div className="pref-info">
        <h4>About Preferences</h4>
        <ul>
          <li><strong>PDF Conversions:</strong> Last used conversion type, search query, and filters</li>
          <li><strong>Video Generator:</strong> Prompt elements, styling, and generation settings</li>
          <li><strong>Storage:</strong> Stored locally in your browser. Clear browser data to remove.</li>
          <li><strong>Privacy:</strong> No preferences are sent to servers or shared with external services</li>
        </ul>
      </div>
    </div>
  );
};

export default PreferencesPanel;
