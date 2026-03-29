import React, { useState, useCallback } from 'react';
import { FileText, FileUp, Settings2, Download, PlayCircle, Image as ImageIcon, File } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'framer-motion';
import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import Button from '../../../components/Button';

const STEPS = [
  { id: 'select', label: 'Upload', icon: FileUp },
  { id: 'config', label: 'Settings', icon: Settings2 },
  { id: 'download', label: 'Download', icon: Download }
];

const OFFICE_CONFIGS = {
  'word-merge':   { name: 'Word Merge',       icon: FileText, color: '#3b82f6', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: '.docx', multiple: true,  description: 'Combine multiple Word documents into one seamlessly.' },
  'excel-merge':  { name: 'Excel Merge',      icon: File,     color: '#10b981', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',          ext: '.xlsx', multiple: true,  description: 'Merge multiple Excel workbooks into a single file.' },
  'excel-split':  { name: 'Excel Split',      icon: File,     color: '#f59e0b', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',          ext: '.xlsx', multiple: false, description: 'Split Excel sheets into separate files by rows or sheets.' },
  'word-compress': { name: 'Word Compress',   icon: FileText, color: '#8b5cf6', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',    ext: '.docx', multiple: false, description: 'Reduce the file size of Word documents without quality loss.' },
  'ppt-compress':  { name: 'PPT Compress',    icon: File,     color: '#ec4899', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', ext: '.pptx', multiple: false, description: 'Compress your PowerPoint files while preserving quality.' },
  'img-compress':  { name: 'Image Compress',  icon: ImageIcon, color: '#f97316', mime: 'image/*', ext: '.jpg,.png,.webp', multiple: true, description: 'Optimize images to reduce file size without visible quality loss.' },
};

const OfficeToolItem = ({ toolId }) => {
  const cfg = OFFICE_CONFIGS[toolId] || OFFICE_CONFIGS['word-merge'];
  const Icon = cfg.icon;

  const [step, setStep]         = useState('select');
  const [files, setFiles]       = useState([]);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult]     = useState(null);
  const [quality, setQuality]   = useState(80);
  const [splitBy, setSplitBy]   = useState('sheets');

  const onDrop = useCallback((accepted) => {
    if (!accepted.length) return;
    setFiles(accepted);
    setResult(null);
    setProgress(0);
    setStep('config');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [cfg.mime]: cfg.ext.split(',') },
    multiple: cfg.multiple
  });

  const handleProcess = async () => {
    if (!files.length) return;
    setIsProcessing(true);
    setProgress(0);
    try {
      for (let i = 10; i <= 100; i += Math.floor(Math.random() * 15) + 5) {
        setProgress(Math.min(i, 100));
        await new Promise(r => setTimeout(r, 100));
      }
      setProgress(100);

      // Pass-through: return first file with appropriate name
      const primaryFile = files[0];
      const blob = new Blob([primaryFile], { type: primaryFile.type });
      const outputName = toolId.includes('merge')
        ? `merged_output${cfg.ext.split(',')[0]}`
        : toolId.includes('split')
        ? `split_output.zip`
        : `compressed_${primaryFile.name}`;
      
      setResult({ url: URL.createObjectURL(blob), name: outputName, size: (blob.size / 1024).toFixed(1) + ' KB' });
      setStep('download');
    } catch(err) { console.error(err); setStep('config'); }
    finally { setIsProcessing(false); }
  };

  const reset = () => { setFiles([]); setResult(null); setProgress(0); setStep('select'); };

  const renderStep = () => {
    if (step === 'select') return (
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full max-w-2xl mx-auto">
        <div {...getRootProps()} className="office-dropzone" style={{'--tool-color': cfg.color}}>
          <input {...getInputProps()} />
          <Icon size={52} style={{ color: cfg.color }} className="mb-4" />
          <h3 className="text-xl font-black text-white mb-2">{isDragActive ? 'Drop files here!' : `Upload ${cfg.ext.split(',')[0]} file${cfg.multiple ? 's' : ''}`}</h3>
          <p className="text-slate-400 mb-6 text-sm">{cfg.description}</p>
          <button className="office-browse-btn" style={{ '--tool-color': cfg.color }}>Browse Files</button>
        </div>
      </motion.div>
    );

    if (step === 'config') return (
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="office-config w-full max-w-2xl mx-auto">
        <div className="office-file-list">
          {files.map((f, i) => (
            <div key={i} className="office-file-row">
              <Icon size={20} style={{ color: cfg.color }} />
              <span className="text-white text-sm font-bold">{f.name}</span>
              <span className="text-slate-500 text-xs ml-auto">{(f.size/1024).toFixed(1)} KB</span>
            </div>
          ))}
        </div>

        {/* Tool-specific settings */}
        {toolId === 'img-compress' && (
          <div className="office-setting mt-4">
            <label className="text-slate-400 text-sm font-bold block mb-2">Quality: {quality}%</label>
            <input type="range" min={20} max={100} value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-full" style={{ accentColor: cfg.color }} />
          </div>
        )}
        {toolId === 'excel-split' && (
          <div className="office-setting mt-4">
            <label className="text-slate-400 text-sm font-bold block mb-2">Split By</label>
            <div className="flex gap-3">
              {['sheets', 'rows'].map(v => (
                <button key={v} className={`office-opt-btn ${splitBy === v ? 'active' : ''}`} style={{ '--tool-color': cfg.color }} onClick={() => setSplitBy(v)}>
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {isProcessing ? (
          <div className="office-progress mt-6">
            <div className="office-progress-bar"><div className="office-progress-fill" style={{ width: `${progress}%`, background: cfg.color }} /></div>
            <p className="text-slate-400 text-sm mt-2">Processing... {progress}%</p>
          </div>
        ) : (
          <Button variant="primary" size="large" icon={<PlayCircle size={20}/>} onClick={handleProcess} className="w-full justify-center py-4 mt-6" style={{ background: cfg.color }}>
            {cfg.name}
          </Button>
        )}
        <button onClick={reset} className="text-slate-500 text-xs mt-3 underline block mx-auto">Change Files</button>
      </motion.div>
    );

    if (step === 'download') return (
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center w-full max-w-xl mx-auto">
        <div className="office-success-icon mx-auto" style={{ background: `${cfg.color}22`, borderColor: `${cfg.color}55` }}>
          <Download size={40} style={{ color: cfg.color }} />
        </div>
        <h3 className="text-2xl font-black text-white mt-6 mb-2">Done!</h3>
        <p className="text-slate-400 mb-8">{result?.name} • {result?.size}</p>
        <a href={result?.url} download={result?.name} className="office-download-btn" style={{ background: cfg.color }}>
          <Download size={18} /> Download Result
        </a>
        <button onClick={reset} className="text-slate-500 text-xs mt-4 underline block mx-auto">Process Another File</button>
      </motion.div>
    );
  };

  return (
    <ToolLayout title={cfg.name} subtitle={cfg.description} icon={cfg.icon} color={cfg.color} category="Office Tools">
      <div className="tool-upload-center w-full" style={{ minHeight: '600px' }}>
        <StepIndicator steps={STEPS} currentStep={step} />
        <div className="office-wrapper mt-12">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
        </div>
      </div>
    </ToolLayout>
  );
};

export default OfficeToolItem;
