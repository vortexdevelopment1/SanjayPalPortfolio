import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle, Zap, Cpu, Layers, ShieldCheck } from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  // Lock background scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window / Detail Page */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0d0917] border border-purple-500/30 shadow-2xl shadow-purple-950/80 z-10 p-6 md:p-10 text-gray-200"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-purple-600 transition-all border border-white/10"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header category badge & status */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-xs px-3 py-1 rounded-md border border-purple-500/40 bg-purple-500/20 text-purple-300 font-semibold">
              {project.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            {project.title}
          </h2>

          {/* Featured Hero Mockup Image */}
          <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden mb-8 border border-white/10 shadow-xl">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0917] via-transparent to-transparent opacity-60" />
          </div>

          {/* Key Metric Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {(project.stats || []).map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <p className="text-2xl font-extrabold text-white grad-text mb-1">{stat.value}</p>
                <p className="text-xs text-gray-400 font-mono">{stat.label}</p>
              </div>
            ))}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <p className="text-2xl font-extrabold text-emerald-400 mb-1">100%</p>
              <p className="text-xs text-gray-400 font-mono">Test Coverage</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center">
              <p className="text-2xl font-extrabold text-purple-400 mb-1">&lt; 100ms</p>
              <p className="text-xs text-gray-400 font-mono">Response Time</p>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-8 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-400" />
              Project Overview
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-400" />
              Key Technical Features &amp; Innovations
            </h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                  <Zap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Breakdown */}
          <div className="mb-8 p-5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              System Architecture &amp; Data Pipeline
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {project.architecture}
            </p>
          </div>

          {/* Full Tech Stack */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 font-mono mb-3">TECHNOLOGY STACK USED</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-purple-300 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <a 
                href={project.githubUrl} 
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-purple-400 text-sm font-semibold text-white transition-all bg-white/[0.03]"
              >
                <Github className="w-4 h-4" />
                <span>View Code Repository</span>
              </a>
              <a 
                href={project.liveUrl} 
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full grad-btn text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition-all hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Application</span>
              </a>
            </div>
            <button 
              onClick={onClose} 
              className="text-xs text-gray-400 hover:text-white font-mono underline"
            >
              Back to Portfolio
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
