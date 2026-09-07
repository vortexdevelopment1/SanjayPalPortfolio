import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Zap, 
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectDetailModal from '../components/ProjectDetailModal';
import { getProjects } from '../services/api';

export default function AllProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const timelineRef = useRef(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjectsData(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // Scroll direction detection
  const [scrollDir, setScrollDir] = useState('down');
  const lastY = useRef(0);
  useEffect(() => {
    const handler = () => {
      const curY = window.scrollY;
      setScrollDir(curY > lastY.current ? 'down' : 'up');
      lastY.current = curY;
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const cardVariants = {
    hidden: (custom) => ({
      opacity: 0,
      x: custom,
      filter: 'blur(8px)'
    }),
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#07050c] text-[#f1eefb] selection:bg-purple-600 selection:text-white flex flex-col overflow-x-hidden">
      {/* Background glow ambiance */}
      <div 
        className="fixed w-[700px] h-[700px] rounded-full bg-purple-600/15 blur-[160px] pointer-events-none left-1/2 -translate-x-1/2 -top-40 z-0"
      />
      <div 
        className="fixed w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none right-10 top-1/3 z-0"
      />

      {/* Navigation Header */}
      <Header />

      <main className="flex-1 pt-32 pb-28 px-4 sm:px-6 md:px-10 relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Navigation / Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-2 text-sm font-mono text-purple-300 hover:text-white transition-colors bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 rounded-full border border-purple-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Page Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="font-mono text-[11px] px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 tracking-wider uppercase font-semibold inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Engineering Portfolio &amp; Case Studies
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            All Featured <span className="grad-text">Projects</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            A chronological showcase of distributed systems, high-concurrency engines, and developer platforms.
          </p>
        </motion.div>

        {/* Full-width Centered Timeline Container */}
        <div ref={timelineRef} className="relative py-4 w-full">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-16 md:space-y-24">
            {projectsData.map((project, idx) => {
              // Alternate layout for variety
              const isImageLeft = idx % 2 === 0;

              return (
                <React.Fragment key={project._id}>
                  {/* Subtle gradient connector between cards */}
                  {idx > 0 && (
                    <div className="hidden md:flex justify-center -my-12 relative z-0">
                      <motion.div
                        initial={{ scaleY: 0, opacity: 0 }}
                        whileInView={{ scaleY: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="w-[2px] h-16 bg-gradient-to-b from-purple-500/60 via-indigo-500/30 to-transparent origin-top rounded-full"
                      />
                    </div>
                  )}
                <div className="relative w-full flex items-center justify-center">

                  {/* Split Layout Container */}
                  <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch w-full gap-8 md:gap-16`}>
                    
                    {/* Left Box (Image) */}
                    <motion.div
                      variants={cardVariants}
                      custom={isImageLeft ? (scrollDir === 'down' ? -100 : 100) : (scrollDir === 'down' ? 100 : -100)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.2 }}
                      className="relative w-full md:w-[calc(50%-2rem)] h-64 md:h-auto min-h-[350px] rounded-3xl overflow-hidden shadow-2xl group z-10"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                      <div className={`absolute top-6 ${isImageLeft ? 'left-6' : 'right-6'} font-mono text-sm px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-purple-300 border border-white/10 font-bold shadow-lg z-20`}>
                        0{idx + 1}
                      </div>
                    </motion.div>

                    {/* Right Box (Content) */}
                    <motion.div
                      variants={cardVariants}
                      custom={isImageLeft ? (scrollDir === 'down' ? 100 : -100) : (scrollDir === 'down' ? -100 : 100)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.2 }}
                      className="relative w-full md:w-[calc(50%-2rem)] p-6 sm:p-8 lg:p-12 flex flex-col justify-center bg-white/[0.02] backdrop-blur-xl rounded-3xl shadow-2xl transition-all z-10"
                    >
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono text-xs px-3 py-1 rounded-md border border-purple-500/30 bg-purple-500/10 text-purple-300 font-semibold inline-flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            {project.category}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="hidden sm:inline">{project.status}</span>
                          </span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-gray-300 text-sm lg:text-base leading-relaxed truncate">
                          {project.summary}
                        </p>

                        <div className="flex items-center flex-wrap gap-3 pt-4 border-t border-white/10">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full grad-btn text-white text-xs lg:text-sm font-semibold shadow-md shadow-purple-600/30 hover:scale-105 transition-all"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>

                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl}
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-purple-400 text-xs lg:text-sm font-medium text-gray-300 hover:text-white transition-all font-mono"
                            >
                              <Github className="w-4 h-4" />
                              <span>Code</span>
                            </a>
                          )}

                          {project.liveUrl && (
                            <a 
                              href={project.liveUrl}
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-purple-400 text-xs lg:text-sm font-medium text-gray-300 hover:text-white transition-all font-mono"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                </React.Fragment>
              );
            })}
          </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Selected Project Full Modal Deep Dive */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
