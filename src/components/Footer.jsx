import React from 'react';
import { Code, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 md:px-10 bg-[#050309] text-xs text-gray-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg grad-btn flex items-center justify-center text-white text-[10px] font-bold font-mono">
            <Code className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white tracking-wider">MAHAK SARLA</span>
          <span>· © {new Date().getFullYear()} All rights reserved.</span>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#stack" className="hover:text-white transition-colors">Tech Stack</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/mahaksarla" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a 
            href="https://linkedin.com/in/mahaksarla" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href="#" 
            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
