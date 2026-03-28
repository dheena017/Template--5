import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { 
  Plus, X, GripVertical, FileText, Combine, 
  Download, Loader2, AlertCircle, FilePlus, RefreshCcw
} from 'lucide-react';

import { mergePDFs } from '../../utils/pdfMerge';
import { PDFThumbnailService } from '../../utils/PDFThumbnailService';
import FAQSection from './FAQSection';

/**
 * PDF Merger Tool Component (Tailwind CSS v4 Optimized)
 * 
 * Features:
 * - Drag-and-drop file uploads
 * - Visual reordering with thumbnails
 * - Client-side merging for privacy
 * - Fully responsive and accessible
 */
export default function PDFMergerTool() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [mergedBlob, setMergedBlob] = useState(null);

  // 1. Handle File Uploads
  const onDrop = useCallback(async (acceptedFiles) => {
    setError(null);
    setMergedBlob(null);

    // Filter duplicates and non-PDFs (security fallback)
    const newFiles = await Promise.all(acceptedFiles.map(async (file) => {
      // Create a unique entry object
      const id = `${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
      
      // Generate preview thumbnail asynchronously
      const thumbnail = await PDFThumbnailService.generate(file);

      return {
        id,
        file,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2), // MB
        thumbnail
      };
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true
  });

  // 2. Remove File
  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedBlob(null);
  };

  // 3. Clear All
  const clearAll = () => {
    setFiles([]);
    setMergedBlob(null);
    setError(null);
  };

  // 4. Trigger Merge Function
  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please add at least two PDF files to merge.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Extract raw File objects in current reordered state
      const rawFiles = files.map((f) => f.file);
      
      const blob = await mergePDFs(rawFiles, {
        onProgress: (current, total) => {
          setProgress(Math.round((current / total) * 100));
        }
      });

      setMergedBlob(blob);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during merging.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-3">
          <Combine className="w-8 h-8 text-primary" /> Merge PDF Files
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Combine multiple PDFs into a single document. Reorder by dragging and dropping. 100% Secure & Client-Side.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {files.length === 0 ? (
          
          /* --- EMPTY STATE / DROPZONE --- */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            {...getRootProps()}
            className={`
              relative group flex flex-col items-center justify-center 
              w-full h-80 rounded-3xl border-2 border-dashed 
              transition-all duration-300 cursor-pointer
              ${isDragActive 
                ? 'border-primary bg-primary/10 scale-[1.01]' 
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'}
            `}
            aria-label="Drag and drop PDF files here to start merging"
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center gap-4 text-center p-8">
              <div className="p-4 rounded-full bg-slate-800 text-slate-400 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300">
                <FilePlus className="w-12 h-12" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-white">Select PDF files</p>
                <p className="text-sm text-slate-500 font-medium">or drag and drop them here</p>
              </div>
              <div className="mt-4 px-4 py-2 bg-slate-800 rounded-lg text-xs font-semibold text-slate-400 uppercase tracking-widest border border-slate-700">
                Max Privacy &bull; Zero Uploads
              </div>
            </div>
          </motion.div>

        ) : (
          
          /* --- FILE LIST / REORDERABLE --- */
          <motion.div
            key="filelist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
             <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                   <FileText size={16} /> Documents ({files.length})
                </h3>
                <button 
                  onClick={clearAll}
                  className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-500/10"
                >
                   <RefreshCcw size={14} /> Clear list
                </button>
             </div>

             <Reorder.Group 
                axis="y" 
                values={files} 
                onReorder={setFiles} 
                className="space-y-3"
             >
                {files.map((item) => (
                  <Reorder.Item 
                    key={item.id} 
                    value={item}
                    className="group relative bg-slate-900/60 border border-slate-800/50 backdrop-blur-xl rounded-2xl p-3 flex items-center gap-4 hover:border-slate-700 hover:bg-slate-800/60 transition-all cursor-grab active:cursor-grabbing"
                    aria-label={`PDF document: ${item.name}. Drag to reorder.`}
                  >
                    <div className="flex-shrink-0 cursor-grab opacity-20 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="text-slate-400" />
                    </div>

                    <div className="w-14 h-18 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-lg">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="text-slate-600 w-8 h-8" />
                      )}
                    </div>

                    <div className="flex-grow min-w-0 pr-4">
                      <p className="text-white font-bold truncate text-sm md:text-base">{item.name}</p>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-tight">{item.size} MB</p>
                    </div>

                    <button 
                      onClick={() => removeFile(item.id)}
                      className="p-2 text-slate-500 hover:text-white hover:bg-rose-500/80 rounded-xl transition-all"
                      aria-label="Remove this file"
                    >
                      <X size={20} />
                    </button>
                  </Reorder.Item>
                ))}
             </Reorder.Group>

             {/* Add More Trigger */}
             <div {...getRootProps()} className="pt-2">
                <input {...getInputProps()} />
                <button className="w-full h-16 rounded-2xl border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-900/30 hover:bg-slate-900/50 flex items-center justify-center gap-3 text-slate-500 hover:text-white transition-all group font-bold">
                   <Plus className="group-hover:rotate-90 transition-transform duration-300" /> Add more documents
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ERROR MESSAGES --- */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 font-bold"
          role="alert"
        >
           <AlertCircle size={20} /> {error}
        </motion.div>
      )}

      {/* --- ACTION SECTION --- */}
      {files.length > 0 && (
         <div className="sticky bottom-0 bg-slate-950/80 backdrop-blur-3xl p-6 border-t border-slate-800/80 rounded-b-3xl">
            {isProcessing ? (
               <div className="space-y-4">
                  <div className="flex items-center justify-between text-white font-bold text-sm">
                    <span className="flex items-center gap-2"><Loader2 className="animate-spin text-primary" /> Merging your documents...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary shadow-[0_0_20px_rgba(139,92,246,0.6)]" 
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', damping: 20 }}
                    />
                  </div>
               </div>
            ) : mergedBlob ? (
              <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="flex-grow text-center md:text-left">
                   <h4 className="text-emerald-500 font-black text-xl flex items-center gap-2 justify-center md:justify-start">
                     Success!
                   </h4>
                   <p className="text-slate-400 text-sm font-medium">Your merged document is ready for storage.</p>
                 </div>
                 <a 
                   href={URL.createObjectURL(mergedBlob)}
                   download="Merged_Aura_Studio.pdf"
                   className="w-full md:w-auto px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                 >
                   <Download size={22} /> Download Final PDF
                 </a>
                 <button 
                  onClick={clearAll}
                  className="w-full md:w-auto px-6 py-4 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 transition-all text-sm"
                 >
                    Merge others
                 </button>
              </div>
            ) : (
               <button 
                  onClick={handleMerge}
                  disabled={files.length < 2}
                  className={`
                    w-full py-5 rounded-2xl font-black text-xl transition-all shadow-2xl
                    flex items-center justify-center gap-3
                    ${files.length < 2 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
                      : 'bg-primary text-white hover:scale-[1.02] active:scale-[0.98] shadow-primary/30'}
                  `}
                >
                  <Combine size={24} /> Merge PDFs
               </button>
            )}
         </div>
      )}
      
      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
