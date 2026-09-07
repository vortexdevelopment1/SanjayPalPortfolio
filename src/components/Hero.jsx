import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechMarquee from './TechMarquee';

export default function Hero() {
  return (
    <section className="relative pt-36 pb-20 md:pt-48 md:pb-28 px-6 md:px-10 overflow-hidden">
      {/* Radial glow background blobs */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px] pointer-events-none left-1/2 -translate-x-1/2 top-10 animate-pulse"
      />
      <div 
        className="absolute w-[300px] h-[300px] rounded-full bg-fuchsia-600/15 blur-[90px] pointer-events-none left-[15%] top-40"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs mb-8 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-gray-300">Intelligent Web Engineering &amp; AI Systems</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> OPEN TO WORK
          </span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
        >
          <span className="block text-white">Crafting High-Performance</span>
          <span className="block text-white">Software &amp;</span>
          <span className="block grad-text drop-shadow-sm">Scalable Web Systems.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          I'm <span class="text-white font-semibold">Mahak Sarla</span> — a Software Engineer specializing in modern full-stack architectures, high-concurrency backend services, and pixel-crisp frontend experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="https://github.com/mahaksarla" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full grad-btn text-white font-semibold text-sm shadow-xl shadow-purple-600/25 hover:shadow-purple-600/40 transition-all hover:scale-105 active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span>View GitHub</span>
          </a>
          <Link to="/#projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-200 hover:border-purple-500/50 hover:bg-white/[0.05] transition-all hover:scale-105 active:scale-95">
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </Link>
        </motion.div>
      </div>

      {/* Tech Marquee */}
      <div id="stack" className="mt-20 md:mt-24 relative">
        <p className="font-mono text-[11px] text-purple-300/80 tracking-widest text-center uppercase mb-6">
          Over 50+ Modern Tech &amp; Production Stack Tooling
        </p>
        <TechMarquee />
      </div>
    </section>
  );
}
