import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, ChevronRight, ChevronLeft, 
  FileText, Image as ImageIcon, ExternalLink,
  Trash2, Download, Maximize2, Zap
} from 'lucide-react';
import { api, resolveAssetUrl } from '../../services/api';

const VisualAssetTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Poll for latest assets
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await api.getFiles();
        // Take last 5
        setAssets((data || []).slice(0, 5));
      } catch (e) {
        console.error('Failed to fetch tray assets', e);
      }
    };

    fetchAssets();
    const interval = setInterval(fetchAssets, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`visual-asset-tray-wrapper ${isOpen ? 'is-open' : ''}`}>
      {/* Toggle Button */}
      <button 
        className="tray-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Production Asset Tray"
      >
        <div className="toggle-glow"></div>
        {isOpen ? <ChevronRight size={20} /> : <History size={20} />}
        {!isOpen && assets.length > 0 && (
          <span className="asset-count-badge">{assets.length}</span>
        )}
      </button>

      {/* Tray Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside 
            className="asset-tray-panel"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="tray-header">
               <div className="flex items-center gap-3">
                 <Zap size={16} className="text-secondary" />
                 <h3>Asset Tray</h3>
               </div>
               <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Recent Outputs</span>
            </div>

            <div className="tray-scroll-area">
              {assets.length > 0 ? (
                assets.map((asset, idx) => (
                  <motion.div 
                    key={asset.id || idx}
                    className="tray-asset-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    draggable="true"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('assetUrl', resolveAssetUrl(asset.file_url));
                      e.dataTransfer.setData('assetType', asset.file_type);
                    }}
                  >
                    <div className="asset-thumb-container">
                       {asset.file_type?.includes('image') || asset.file_url?.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                         <img src={resolveAssetUrl(asset.file_url)} alt="Recent asset" />
                       ) : (
                         <div className="pdf-thumb-placeholder">
                            <FileText size={24} />
                         </div>
                       )}
                       <div className="asset-quick-actions">
                          <button onClick={() => window.open(resolveAssetUrl(asset.file_url), '_blank')}><Maximize2 size={12} /></button>
                          <a href={resolveAssetUrl(asset.file_url)} download><Download size={12} /></a>
                       </div>
                    </div>
                    <div className="asset-card-info">
                       <span className="asset-name-short">{asset.filename || 'Untitled Asset'}</span>
                       <span className="asset-timestamp-mini">{new Date(asset.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="tray-empty-state">
                   <div className="empty-ring"></div>
                   <p>No recent assets generated yet.</p>
                </div>
              )}
            </div>

            <div className="tray-footer">
               <button className="view-library-btn" onClick={() => window.location.href='/files'}>
                 View Complete Library <ExternalLink size={12} />
               </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VisualAssetTray;
