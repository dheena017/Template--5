import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ShieldCheck, UserPlus, Box, Lock, Smartphone, Landmark, Clock, XCircle,
  RotateCw, GripVertical, AlertCircle, FileOutput, Zap
} from 'lucide-react';

const generalFaq = [
  {
    question: "Is my data secure?",
    answer: "Yes, 100%. Your files never leave your device. We use client-side technology to process PDFs directly in your browser, meaning your sensitive data is never uploaded to any server.",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
  },
  {
    question: "Do I need to create an account?",
    answer: "No account required. You can start using our PDF tools instantly without signing up or providing any personal information. We believe in privacy and convenience.",
    icon: <UserPlus className="w-5 h-5 text-blue-400" />
  },
  {
    question: "Does it work on mobile?",
    answer: "Absolutely! Our tool is fully responsive and works on any modern mobile browser. You can process files directly from your smartphone's storage or cloud drives.",
    icon: <Smartphone className="w-5 h-5 text-pink-400" />
  }
];

const toolSpecificFaq = {
  merge: [
    {
        question: "How many PDFs can I merge?",
        answer: "There is no hard limit. You can merge as many files as your browser's memory can handle, typically hundreds of pages. The final file size is also only limited by your system's capabilities.",
        icon: <Box className="w-5 h-5 text-purple-400" />
    }
  ],
  split: [
    {
      question: "What split methods are available?",
      answer: "You can split by 'Every X pages', 'Custom page ranges' (e.g., 1-3, 5, 8-10), 'Extract all pages', or manually 'Select individual pages' from the preview.",
      icon: <Box className="w-5 h-5 text-purple-400" />
    },
    {
      question: "Can I split password-protected PDFs?",
      answer: "You will need to unlock the PDF first. We recommend our 'Unlock PDF' tool to remove the password before splitting.",
      icon: <Lock className="w-5 h-5 text-orange-400" />
    }
  ],
  organize: [
    {
      question: "Can I rotate individual pages?",
      answer: "Yes, you can rotate any page by 90-degree increments by clicking the rotation icon on each page thumbnail.",
      icon: <RotateCw className="w-5 h-5 text-blue-400" />
    },
    {
      question: "How do I reorder pages?",
      answer: "Simply drag any page thumbnail to its new desired position. The rest of the pages will automatically shift to accommodate the change.",
      icon: <GripVertical className="w-5 h-5 text-slate-400" />
    }
  ],
  remove: [
    {
      question: "Is it possible to recover removed pages?",
      answer: "Since all processing is client-side, we don't save copies. If you make a mistake, you'll need to re-upload the original file and try again.",
      icon: <AlertCircle className="w-5 h-5 text-red-400" />
    }
  ],
  extract: [
    {
      question: "Can I extract several pages into a single file?",
      answer: "Yes, selecting multiple pages will combine them into a single new PDF document in the order they appear in the original.",
      icon: <FileOutput className="w-5 h-5 text-cyan-400" />
    }
  ],
  compress: [
    {
      question: "Will compression reduce the quality of my images?",
      answer: "Depending on the level (Extreme/Recommended/Low), some compression of high-resolution images occurs to save space. 'Recommended' typically maintains excellent visual quality.",
      icon: <Zap className="w-5 h-5 text-amber-400" />
    }
  ]
};

export default function FAQSection({ isDarkMode = true, tool = 'general' }) {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const displayData = toolSpecificFaq[tool] 
    ? [...generalFaq, ...toolSpecificFaq[tool]]
    : generalFaq;

  return (
    <section className="w-full max-w-4xl mx-auto py-20 px-4">
      <div className="text-center mb-16 space-y-4">
        <h2 className={`text-3xl md:text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Frequently Asked <span className="text-blue-500">Questions</span>
        </h2>
        <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Everything you need to know about our privacy-first PDF merging tool.
          Clear answers to build your trust.
        </p>
      </div>

      <div className="grid gap-4">
        {displayData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`
              rounded-[28px] border transition-all duration-500 overflow-hidden
              ${activeIndex === index
                ? isDarkMode ? 'bg-white/[0.03] border-blue-500/30 shadow-2xl shadow-blue-500/5' : 'bg-white border-blue-500/30 shadow-xl shadow-blue-500/5'
                : isDarkMode ? 'bg-white/[0.01] border-white/5 hover:border-white/10' : 'bg-white border-slate-200 hover:border-slate-300'}
            `}
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full p-6 flex items-center justify-between gap-4 text-left group"
            >
              <div className="flex items-center gap-5">
                <div className={`
                  p-3 rounded-2xl transition-all duration-500
                  ${activeIndex === index ? 'bg-blue-500/20 scale-110' : isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-slate-100 group-hover:bg-slate-200'}
                `}>
                  {faq.icon}
                </div>
                <span className={`text-lg font-bold transition-colors ${activeIndex === index ? (isDarkMode ? 'text-white' : 'text-blue-600') : (isDarkMode ? 'text-slate-200' : 'text-slate-700')}`}>
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-500 ${activeIndex === index ? 'rotate-180 text-blue-500' : 'text-slate-500'}`}
              />
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-6 pb-8 pt-0 ml-[4.75rem]">
                    <div className={`h-px mb-6 mr-6 ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`} />
                    <p className={`leading-relaxed text-lg font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className={`mt-16 p-8 rounded-[40px] border text-center relative overflow-hidden group
        ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-sm'}
      `}>
        <div className="relative z-10">
          <p className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Still have questions?</p>
          <p className={`mb-6 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>We're here to help you with anything else you might need.</p>
          <button className={`px-8 py-3 rounded-2xl font-black transition-all active:scale-95
            ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' : 'bg-slate-900 hover:bg-black text-white'}
            border
          `}>
            Contact Support
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -ml-16 -mb-16 group-hover:bg-indigo-500/20 transition-colors" />
      </div>
    </section>
  );
}
