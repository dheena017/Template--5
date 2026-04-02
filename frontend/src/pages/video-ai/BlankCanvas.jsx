import React from 'react';
import { 
  PlusCircle, 
  ArrowUpRight, 
  Zap, 
  Video, 
  Layers,
  History,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/pages/video-ai/BlankCanvas.css';

const BlankCanvas = () => {
  return (
    <div className="video-tool-page">
      <header className="vt-header text-center mx-auto" style={{maxWidth:'800px'}}>
        <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="justify-content-center">
          <PlusCircle size={48} className="text-secondary opacity-50" /> Start from Blank
        </motion.h1>
        <p className="text-secondary">Unleash your creativity. Build your own storyboard and video from our professional AI toolsets on a clean slate.</p>
      </header>

      <div className="vt-grid gap-5 mt-5">
         <div className="vt-upload-card premium-card d-flex flex-column justify-content-center align-items-center gap-4 py-5" style={{borderStyle: 'solid'}}>
            <div className="icon-circle mb-3 bg-dark p-4 rounded-circle border border-white-05 shadow-lg"><Video size={48} /></div>
            <h3>Empty Video Master</h3>
            <p className="text-secondary max-w-400">Initialize a new video production session without any predefined context or templates.</p>
            <button className="vt-btn-primary max-w-300">Create New Project</button>
         </div>

         <aside className="vt-settings-panel d-flex flex-column gap-3">
            <h4 className="tiny fw-bold text-secondary text-uppercase ls-1"><Layers /> Components Hub</h4>
            <div className="preset-list d-grid grid-1 gap-2">
               {['Scene Builder', 'Avatar Library', 'Audio Palette', 'Subtitle Engine'].map(p => (
                  <div key={p} className="glass-card p-3 d-flex align-items-center gap-3 border border-white-05 hover-border-primary cursor-pointer">
                     <div className="bg-dark p-2 rounded"><FileText size={16} /></div>
                     <span className="tiny fw-bold">{p}</span>
                     <ArrowUpRight size={14} className="ms-auto opacity-20" />
                  </div>
               ))}
            </div>

            <div className="credits-kit glass-card p-4 mt-auto">
               <div className="d-flex justify-content-between mb-2">
                 <span className="tiny text-secondary">Project Capacity</span>
                 <span className="tiny fw-800">100%</span>
               </div>
               <div className="progress mb-3 bg-dark" style={{height:'3px'}}><div className="progress-bar bg-primary" style={{width:'100%'}} /></div>
               <div className="tiny text-secondary d-flex align-items-center gap-1"><Zap size={10} /> Consumes standard production nodes</div>
            </div>
         </aside>
      </div>
    </div>
  );
};

export default BlankCanvas;
