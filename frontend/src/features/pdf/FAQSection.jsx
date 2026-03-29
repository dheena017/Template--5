import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ShieldCheck, UserPlus, Box, Lock, Smartphone, Landmark, Clock, XCircle,
  RotateCw, GripVertical, AlertCircle, FileOutput, Zap
} from 'lucide-react';
import './FAQSection.css';

const generalFaq = [
  {
    question: "Is my data secure?",
    answer: "Yes, 100%. Your files never leave your device. We use client-side technology to process PDFs directly in your browser, meaning your sensitive data is never uploaded to any server.",
    icon: <ShieldCheck className="w-7 h-7 text-emerald-400" />
  },
  {
    question: "Do I need to create an account?",
    answer: "No account required. You can start using our PDF tools instantly without signing up or providing any personal information. We believe in privacy and convenience.",
    icon: <UserPlus className="w-7 h-7 text-blue-400" />
  },
  {
    question: "Does it work on mobile?",
    answer: "Absolutely! Our tool is fully responsive and works on any modern mobile browser. You can process files directly from your smartphone's storage or cloud drives.",
    icon: <Smartphone className="w-7 h-7 text-pink-400" />
  }
];

const toolSpecificFaq = {
  merge: [
    {
        question: "How many PDFs can I merge?",
        answer: "There is no hard limit. You can merge as many files as your browser's memory can handle, typically hundreds of pages. The final file size is also only limited by your system's capabilities.",
        icon: <Box className="w-7 h-7 text-purple-400" />
    }
  ],
  split: [
    {
      question: "What split methods are available?",
      answer: "You can split by 'Every X pages', 'Custom page ranges' (e.g., 1-3, 5, 8-10), 'Extract all pages', or manually 'Select individual pages' from the preview.",
      icon: <Box className="w-7 h-7 text-purple-400" />
    },
    {
      question: "Can I split password-protected PDFs?",
      answer: "You will need to unlock the PDF first. We recommend our 'Unlock PDF' tool to remove the password before splitting.",
      icon: <Lock className="w-7 h-7 text-orange-400" />
    }
  ],
  organize: [
    {
      question: "Can I rotate individual pages?",
      answer: "Yes, you can rotate any page by 90-degree increments by clicking the rotation icon on each page thumbnail.",
      icon: <RotateCw className="w-7 h-7 text-blue-400" />
    },
    {
      question: "How do I reorder pages?",
      answer: "Simply drag any page thumbnail to its new desired position. The rest of the pages will automatically shift to accommodate the change.",
      icon: <GripVertical className="w-7 h-7 text-slate-400" />
    }
  ],
  remove: [
    {
      question: "Is it possible to recover removed pages?",
      answer: "Since all processing is client-side, we don't save copies. If you make a mistake, you'll need to re-upload the original file and try again.",
      icon: <AlertCircle className="w-7 h-7 text-red-400" />
    }
  ],
  extract: [
    {
      question: "Can I extract several pages into a single file?",
      answer: "Yes, selecting multiple pages will combine them into a single new PDF document in the order they appear in the original.",
      icon: <FileOutput className="w-7 h-7 text-cyan-400" />
    }
  ],
  compress: [
    {
      question: "Will compression reduce the quality of my images?",
      answer: "Depending on the level (Extreme/Recommended/Low), some compression of high-resolution images occurs to save space. 'Recommended' typically maintains excellent visual quality.",
      icon: <Zap className="w-7 h-7 text-amber-400" />
    }
  ]
};

export default function FAQSection({ isDarkMode = true, tool = 'general' }) {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const displayData = toolSpecificFaq[tool] 
    ? [...generalFaq, ...toolSpecificFaq[tool]]
    : generalFaq;

  return (
    <section className="faq-section-container">
      <div className="text-center mb-16 space-y-4">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="faq-title text-white"
        >
          Frequently Asked <span className="text-blue-500">Questions</span>
        </motion.h2>
        <p className="faq-subtitle">
          Everything you need to know about our privacy-first {tool === 'general' ? 'PDF' : tool} tool.
          Clear answers to build your trust.
        </p>
      </div>

      <div className="faq-grid">
        {displayData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`faq-card ${activeIndex === index ? 'active' : ''}`}
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="faq-header"
            >
              <div className="flex items-center gap-6">
                <div className="faq-icon-wrapper">
                  {faq.icon}
                </div>
                <span className="faq-question">
                  {faq.question}
                </span>
              </div>
              <div className="faq-chevron-box">
                <ChevronDown className={`w-7 h-7 ${activeIndex === index ? 'text-blue-500' : 'text-slate-500'}`} />
              </div>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="faq-answer-container">
                    <div className="faq-divider" />
                    <p className="faq-answer">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="support-card group"
      >
        <div className="relative z-10">
          <div className="support-icon-box group-hover:scale-110 transition-transform duration-500">
             <Zap className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="support-title">Still have questions?</h3>
          <p className="support-desc">
            We're here to help you with anything else you might need. Our studio team is ready.
          </p>
          <button className="btn-support active:scale-95">
            Contact Support
          </button>
        </div>
      </motion.div>
    </section>
  );
}
