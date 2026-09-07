import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Zap, ArrowRight, Expand } from 'lucide-react';
import { getProjects } from '../services/api';

export default function ExpandedProjectSlider({ onOpenDetails }) {
  const [activeId, setActiveId] = useState(null);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjectsData(data);
        if (data.length > 0) setActiveId(data[0]._id);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading || projectsData.length === 0) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;

  const activeProject = projectsData.find(p => p._id === activeId) || projectsData[0];

  const handleNext = () => {
    const currentIndex = projectsData.findIndex(p => p._id === activeId);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    setActiveId(projectsData[nextIndex]._id);
  };

  const handlePrev = () => {
    const currentIndex = projectsData.findIndex(p => p._id === activeId);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setActiveId(projectsData[prevIndex]._id);
  };

  return (
    <div className="w-full">
      {/* Interactive Accordion / Sliding Cards Container */}
      <div className="flex flex-col lg:flex-row gap-4 h-[550px] w-full">
        {projectsData.map((project) => {
          const isExpanded = project._id === activeId;

          return (
            <motion.div
              key={project._id}
              onClick={() => setActiveId(project._id)}
              layout
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-colors duration-300 ${
                isExpanded 
                  ? 'lg:flex-[3.5] bg-[#0e0b16] border-purple-500/50 shadow-2xl shadow-purple-950/50' 
                  : 'lg:flex-[1] bg-white/[0.02] hover:bg-white/[0.04] border-white/10'
              }`}
            >
              {/* Card Image Background */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={`w-full h-full object-cover object-center transition-all duration-700 ${
                    isExpanded ? 'opacity-40 scale-105' : 'opacity-25 grayscale hover:grayscale-0'
                  }`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0e0b16] via-[#0e0b16]/70 to-transparent ${
                  isExpanded ? 'opacity-90' : 'opacity-95'
                }`} />
              </div>

              {/* Card Content - Unexpanded View */}
              {!isExpanded && (
                <div className="relative z-10 h-full p-6 flex flex-col justify-between items-start">
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-white/10 bg-black/60 text-purple-300 font-semibold">
                    0{projectsData.findIndex(p => p._id === project._id) + 1}
                  </span>
                  
                  <div className="lg:rotate-[-90deg] lg:origin-bottom-left lg:translate-x-6 lg:-translate-y-6 text-left whitespace-nowrap">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      {project.title.split(':')[0]}
                    </h3>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{project.category}</p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Expand className="w-4 h-4" />
                  </div>
                </div>
              )}

              {/* Card Content - Expanded View */}
              {isExpanded && (
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative z-10 h-full p-8 flex flex-col justify-between"
                  >
                    {/* Top Bar inside card */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold">
                          0{projectsData.findIndex(p => p._id === project._id) + 1} / 0{projectsData.length}
                        </span>
                        <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                          {project.category}
                        </span>
                      </div>

                      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {project.status}
                      </span>
                    </div>

                    {/* Middle Info */}
                    <div className="my-auto space-y-4 max-w-xl">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Stats */}
                      {(project.stats || []).length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {(project.stats || []).map((stat, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                            <p className="text-xl font-extrabold text-white flex items-center gap-1.5">
                              <Zap className="w-4 h-4 text-purple-400" />
                              {stat.value}
                            </p>
                            <p className="text-[11px] text-gray-400 font-mono mt-0.5">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                      )}

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {(project.techStack || []).map((tech, idx) => (
                          <span key={idx} className="font-mono text-[10px] px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-purple-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDetails(project);
                        }}
                        className="text-xs font-semibold px-5 py-2.5 rounded-full grad-btn text-white shadow-lg shadow-purple-600/30 hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <span>Explore Full Project Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-3 text-xs text-purple-300 font-mono">
                        <a href={project.githubUrl} onClick={e => e.stopPropagation()} className="hover:text-white flex items-center gap-1 hover:underline">
                          <Github className="w-4 h-4" /> Code
                        </a>
                        <a href={project.liveUrl} onClick={e => e.stopPropagation()} className="hover:text-white flex items-center gap-1 hover:underline">
                          <ExternalLink className="w-4 h-4" /> Demo
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Slider Navigation Arrows */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-xs text-gray-400 font-mono">
          Click any card to expand details (Framer Expanded Card Effect)
        </p>
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrev}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-purple-600 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-purple-600 transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
