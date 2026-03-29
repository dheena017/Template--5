import React from 'react';
import { motion } from 'framer-motion';

const OCRHowTo = () => {
    return (
        <section className="max-w-4xl mx-auto p-6 md:p-12 mt-12 mb-24 bg-slate-800/20 border border-slate-700/50 rounded-[2rem]">
            <h2 className="text-3xl font-black text-white mb-6 text-center">To perform OCR on a PDF, follow these steps:</h2>
            <div className="space-y-6 text-slate-300">
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 font-black flex items-center justify-center shrink-0 mt-1">1</div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Upload the PDF</h3>
                        <p className="leading-relaxed opacity-80">Use an online OCR tool like Adobe Acrobat, PDF24, or Smallpdf. Click the "Select a file" button or drag and drop your PDF into the designated area.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 font-black flex items-center justify-center shrink-0 mt-1">2</div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Start the OCR Process</h3>
                        <p className="leading-relaxed opacity-80">After uploading, the tool will automatically apply Optical Character Recognition (OCR) to convert scanned text into machine-readable text.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 font-black flex items-center justify-center shrink-0 mt-1">3</div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Download the Result</h3>
                        <p className="leading-relaxed opacity-80">Once the OCR process is complete, download the newly searchable PDF or use the tool to share it.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 font-black flex items-center justify-center shrink-0 mt-1">4</div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Edit if Necessary</h3>
                        <p className="leading-relaxed opacity-80">Some tools allow you to edit the recognized text before downloading, enhancing the document's usability.</p>
                    </div>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-500 font-black flex items-center justify-center shrink-0 mt-1">5</div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Check for Accuracy</h3>
                        <p className="leading-relaxed opacity-80">Open the downloaded PDF and verify that the text is searchable and editable. Adjust any necessary text as needed.</p>
                    </div>
                </div>
            </div>
            <div className="mt-10 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-200 text-center font-medium">
                These steps will help you convert scanned PDFs into editable and searchable documents using OCR technology.
            </div>
        </section>
    );
};

export default OCRHowTo;
