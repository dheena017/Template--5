import React, { useState, useRef } from 'react';
import { 
  Circle,
  Mic, 
  Camera, 
  Settings, 
  Sparkles, 
  Zap, 
  Video, 
  Maximize,
  Download,
  Trash2,
  Play,
  History,
  Monitor,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/pages/video-ai/RecordToVideo.css';

const RecordToVideo = () => {
  const [recording, setRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('Default Webcam');

  const startRecording = () => {
    setRecording(true);
    setTimeout(() => {
       setRecording(false);
       setIsGenerating(true);
       setTimeout(() => setIsGenerating(false), 5000);
    }, 4000);
  };

  return (
    <div className="video-tool-page">
      <header className="vt-header">
        <motion.h1 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <Mic size={40} className="text-secondary" /> Record to Video
        </motion.h1>
        <p className="text-secondary">Capture your screen or webcam and instantly turn the raw footage into polished, subtitled videos ready for sharing.</p>
      </header>

      <div className="vt-grid">
        <div className="vt-main-content">
          <div className="vt-preview-placeholder premium-card overflow-hidden position-relative h-500 border-2">
             <div className="viewport-overlay" />
             {recording ? (
               <div className="text-center p-5">
                  <div className="record-circle mb-3"><div className="record-dot" /></div>
                  <h3 className="h5 fw-bold font-monospace">RECORDING_STREAM_ACTIVE</h3>
                  <p className="small text-secondary font-monospace">BUFFERING TO TEMPORAL_STORAGE // 00:04:12</p>
                  <button className="btn btn-danger btn-sm mt-4 px-5 rounded-pill" onClick={() => setRecording(false)}>Stop & AI-Polish</button>
               </div>
             ) : isGenerating ? (
               <div className="text-center px-5">
                  <div className="render-pulse mb-4 text-warning"><Zap size={48} /></div>
                  <h3 className="h5">Atmospheric Polishing</h3>
                  <p className="small text-secondary">Enhancing audio clarity and generating smart subtitle-masks...</p>
                  <div className="progress mt-4 w-75 mx-auto" style={{height:'3px'}}>
                     <motion.div className="progress-bar bg-warning" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 5 }} />
                  </div>
               </div>
             ) : (
               <div className="text-center">
                 <div className="record-interface mb-4 opacity-40">
                    <Monitor size={80} className="mb-2" />
                    <Camera size={40} className="position-relative" style={{top:'-20px', left:'20px'}} />
                 </div>
                 <h3 className="h5 opacity-50">Select sources to begin recording</h3>
                 <button className="btn btn-primary mt-4 px-5 rounded-pill" onClick={startRecording}>Start Session</button>
               </div>
             )}
          </div>

          <div className="d-flex gap-4 p-4 glass-card border-dashed">
             <div className="d-flex align-items-center gap-2"><div className="rounded-circle bg-success" style={{width:'8px', height:'8px'}} /> <span className="tiny fw-bold">Camera Active</span></div>
             <div className="d-flex align-items-center gap-2"><div className="rounded-circle bg-success" style={{width:'8px', height:'8px'}} /> <span className="tiny fw-bold">Mic Input Live</span></div>
             <div className="d-flex align-items-center gap-2 border-start ps-4 opacity-50"><span className="tiny fw-bold">Screen Capture Idle</span></div>
          </div>
        </div>

        <aside className="vt-settings-panel glass-card p-4">
           <div className="vt-param-group">
              <label className="vt-param-label"><Settings size={18} /> Capture Settings</label>
              <div className="d-flex flex-column gap-3">
                 <div className="input-field-group">
                    <span className="tiny text-secondary mb-1 d-block">Video Source</span>
                    <select className="form-select-dark small w-100" value={selectedDevice} onChange={e=>setSelectedDevice(e.target.value)}>
                       <option>Integrated Webcam</option>
                       <option>Logitech StreamCam</option>
                       <option>Virtual Camera (OBS)</option>
                    </select>
                 </div>
                 <div className="input-field-group">
                    <span className="tiny text-secondary mb-1 d-block">Microphone Level</span>
                    <div className="audio-meter w-100 bg-dark rounded overflow-hidden" style={{height:'8px'}}>
                       <motion.div className="h-100 bg-success" animate={{ width: ['20%', '60%', '40%', '85%', '30%'] }} transition={{ repeat: Infinity, duration: 1 }} />
                    </div>
                 </div>
              </div>
           </div>

           <div className="vt-param-group">
              <label className="vt-param-label"><Sparkles size={18} /> AI Enhancement</label>
              <div className="checkbox-list d-flex flex-column gap-2">
                 <div className="d-flex align-items-center gap-3 glass-card p-2 rounded cursor-pointer border border-white-05">
                    <input type="checkbox" defaultChecked /> <span className="tiny">Noise Suppression</span>
                 </div>
                 <div className="d-flex align-items-center gap-3 glass-card p-2 rounded cursor-pointer border border-white-05">
                    <input type="checkbox" defaultChecked /> <span className="tiny">Smart Background Blur</span>
                 </div>
                 <div className="d-flex align-items-center gap-3 glass-card p-2 rounded cursor-pointer border border-white-05">
                    <input type="checkbox" defaultChecked /> <span className="tiny">Auto Subtitles</span>
                 </div>
              </div>
           </div>

           <div className="vt-param-group pt-3 border-top border-white-05">
              <button 
                className="btn btn-danger w-100 p-3 rounded-pill fw-bold" 
                onClick={startRecording}
                disabled={recording || isGenerating}
              >
                {recording ? 'Stop Recording' : isGenerating ? 'Polishing...' : 'Launch Recording Hub'}
              </button>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default RecordToVideo;
