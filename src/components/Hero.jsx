import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechMarquee from './TechMarquee';
import SpotlightText from './SpotlightText';

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

        {/* Main Hero Headline */}
        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: [0.5, 1.05, 1],
            y: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6"
        >

          {/* Line 1 */}
          <motion.span
            className="block text-white"
            animate={{
              color: ["#ffffff", "#f8fafc", "#ffffff"],
            }}
            transition={{
              duration: 1.2,
              delay: 3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            <SpotlightText colors="from-fuchsia-500 via-purple-500 to-violet-600">
              Crafting High-Performance
            </SpotlightText>
          </motion.span>

          {/* Line 2 */}
          <motion.span
            className="block text-white"
            animate={{
              color: ["#ffffff", "#f8fafc", "#ffffff"],
            }}
            transition={{
              duration: 1.2,
              delay: 3.15,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            <SpotlightText colors="from-violet-600 via-purple-500 to-fuchsia-500">
              Software &amp;
            </SpotlightText>
          </motion.span>

          {/* Line 3 */}
          <motion.span
            className="block grad-text drop-shadow-sm"
            animate={{
              opacity: [1, 0.75, 1],
            }}
            transition={{
              duration: 1.2,
              delay: 3.3,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            Scalable Web Systems.
          </motion.span>

        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          <SpotlightText colors="from-fuchsia-500 via-purple-500 to-violet-600" className="w-full">
            I'm{" "}
            <span className="text-white font-semibold">
              Mahak Sarla
            </span>{" "}
            — a Software Engineer specializing in modern full-stack
            architectures, high-concurrency backend services, and
            pixel-crisp frontend experiences.
          </SpotlightText>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
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

          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-200 hover:border-purple-500/50 hover:bg-white/[0.05] transition-all hover:scale-105 active:scale-95"
          >
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