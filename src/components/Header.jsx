import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#07050c] py-4">
      {/* Absolute glow container matching Hero's top position */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px] left-1/2 -translate-x-1/2 -top-40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-2.5 group text-left">
          <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold font-mono">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white font-sans">
            MAHAK SARLA
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/#services" className="hover:text-white transition-colors">Services</Link>
          <Link to="/#projects" className="hover:text-white transition-colors">Projects</Link>
          <Link to="/#about" className="hover:text-white transition-colors">About</Link>
          <Link to="/#contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center">
          <Link 
            to="/#contact" 
            className="text-xs font-semibold px-5 py-2.5 rounded-lg bg-[#8b5cf6] text-white hover:bg-[#7c3aed] transition-colors shadow-md shadow-purple-600/20"
          >
            Book a call
          </Link>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07050c] px-6 py-6 space-y-4 mt-4 border-t border-white/5">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-left w-full text-gray-300 hover:text-white font-medium text-sm">Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="block text-left w-full text-gray-300 hover:text-white font-medium text-sm">Services</Link>
          <Link to="/projects" onClick={() => setMobileMenuOpen(false)} className="block text-left w-full text-gray-300 hover:text-white font-medium text-sm">Projects</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-left w-full text-gray-300 hover:text-white font-medium text-sm">About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-left w-full text-gray-300 hover:text-white font-medium text-sm">Contact</Link>
        </div>
      )}
    </header>
  );
}