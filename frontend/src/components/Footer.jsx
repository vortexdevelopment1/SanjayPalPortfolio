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
          <span className="font-bold text-white tracking-wider"> SANJAY PAL</span>
          <span>· © {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
