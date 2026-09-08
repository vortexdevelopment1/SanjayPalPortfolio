import React, { useState } from 'react';
import { X, Plus, Save, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: project?.title || '',
    category: project?.category || '',
    status: project?.status || 'Live in Production',
    summary: project?.summary || '',
    image: project?.image || '',
    techStack: project?.techStack || [],
    overview: project?.overview || '',
    keyFeatures: project?.keyFeatures || [''],
    architecture: project?.architecture || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    featured: project?.featured || false
  });

  const [techInput, setTechInput] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function addTech() {
    if (techInput.trim()) {
      setForm(prev => ({ ...prev, techStack: [...prev.techStack, techInput.trim()] }));
      setTechInput('');
    }
  }

  function removeTech(idx) {
    setForm(prev => ({ ...prev, techStack: prev.techStack.filter((_, i) => i !== idx) }));
  }

  function handleFeatureChange(idx, value) {
    setForm(prev => {
      const updated = [...prev.keyFeatures];
      updated[idx] = value;
      return { ...prev, keyFeatures: updated };
    });
  }

  function addFeature() {
    setForm(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, ''] }));
  }

  function removeFeature(idx) {
    setForm(prev => ({ ...prev, keyFeatures: prev.keyFeatures.filter((_, i) => i !== idx) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Filter out empty features
    const cleaned = {
      ...form,
      keyFeatures: form.keyFeatures.filter(f => f.trim()),
      techStack: form.techStack.filter(t => t.trim())
    };
    onSave(cleaned);
  }

  const inputClass = "w-full px-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-10 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl bg-[#0d0917] border border-white/[0.08] rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className={labelClass}>Project Title *</label>
            <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="My Awesome Project" />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category *</label>
              <input name="category" value={form.category} onChange={handleChange} required className={inputClass} placeholder="Web Development" />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass + " cursor-pointer"}>
                <option value="Live in Production" className="bg-[#0d0917] text-white">Live in Production</option>
                <option value="In Development" className="bg-[#0d0917] text-white">In Development</option>
                <option value="Completed" className="bg-[#0d0917] text-white">Completed</option>
                <option value="Archived" className="bg-[#0d0917] text-white">Archived</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className={labelClass}>Image URL *</label>
            <input name="image" value={form.image} onChange={handleChange} required className={inputClass} placeholder="https://images.unsplash.com/..." />
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-white/10" />
            )}
          </div>

          {/* Summary */}
          <div>
            <label className={labelClass}>Summary *</label>
            <textarea name="summary" value={form.summary} onChange={handleChange} required rows={3} className={inputClass + " resize-none"} placeholder="Brief description of what this project does..." />
          </div>

          {/* Overview */}
          <div>
            <label className={labelClass}>Overview</label>
            <textarea name="overview" value={form.overview} onChange={handleChange} rows={3} className={inputClass + " resize-none"} placeholder="Detailed overview of the project..." />
          </div>

          {/* Tech Stack */}
          <div>
            <label className={labelClass}>Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className={inputClass} placeholder="React, Node.js, etc."
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
              />
              <button type="button" onClick={addTech} className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex-shrink-0">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300">
                  {tech}
                  <button type="button" onClick={() => removeTech(i)} className="text-purple-400 hover:text-red-400 ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <label className={labelClass}>Key Features</label>
            <div className="space-y-2">
              {form.keyFeatures.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input value={feat} onChange={(e) => handleFeatureChange(i, e.target.value)} className={inputClass} placeholder={`Feature ${i + 1}`} />
                  {form.keyFeatures.length > 1 && (
                    <button type="button" onClick={() => removeFeature(i)} className="px-2 text-gray-400 hover:text-red-400 transition-colors flex-shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addFeature} className="mt-2 text-xs text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Feature
            </button>
          </div>

          {/* Architecture */}
          <div>
            <label className={labelClass}>Architecture Notes</label>
            <textarea name="architecture" value={form.architecture} onChange={handleChange} rows={2} className={inputClass + " resize-none"} placeholder="Architecture overview..." />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-white/20 bg-white/[0.04] text-purple-600 focus:ring-purple-500/30 focus:ring-offset-0"
            />
            <label className="text-sm font-medium text-gray-300">Featured Project</label>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input name="githubUrl" value={form.githubUrl} onChange={handleChange} className={inputClass} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={labelClass}>Demo URL</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange} className={inputClass} placeholder="https://demo.example.com" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-lg shadow-purple-600/20"
            >
              <Save className="w-4 h-4" />
              {project ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-gray-300 text-sm font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
