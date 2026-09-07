import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ExpandedProjectSlider from '../components/ExpandedProjectSlider';
import ProjectDetailModal from '../components/ProjectDetailModal';
import Philosophy from '../components/Philosophy';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  
  return (
    <div className="min-h-screen bg-[#07050c] text-[#f1eefb] selection:bg-purple-600 selection:text-white">
      {/* Navbar Header */}
      <Header />

      <main id="top">
        {/* Hero Banner */}
        <Hero />

        {/* Services & GSAP Scroll Animated Workflow List */}
        <Services />

        {/* Featured Projects Section with Framer Expanded Sliding Card Effect */}
        <section id="projects" className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mb-14"
            >
              <span className="font-mono text-[11px] px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 tracking-wider uppercase mb-4 inline-block font-semibold">
                FEATURED WORK &amp; CASE STUDIES
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-white">
                Production Engineering &amp; Projects
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Explore featured engineering projects. Click or slide through cards to expand full preview details.
              </p>
            </motion.div>

            {/* Framer-style Interactive Sliding Expanded Cards */}
            <ExpandedProjectSlider 
              onOpenDetails={(p) => setSelectedProject(p)} 
            />

            {/* View All Projects Button */}
            <div className="mt-12 text-center">
              <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 group">
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Engineering Philosophy */}
        <Philosophy />

        {/* Contact Form & Coordinates */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Separate Project Detail View / Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
