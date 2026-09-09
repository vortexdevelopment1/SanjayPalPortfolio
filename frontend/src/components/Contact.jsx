import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Phone, Globe, Send, Copy, Check, Loader2 } from 'lucide-react';
import { submitContactForm } from '../services/api';

const textContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04
    }
  }
};

const letterVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20, duration: 0.6 }
  }
};

const AnimatedText = ({ text, className = "" }) => {
  const isGrad = className.includes('grad-text');
  const cleanClassName = className.replace('grad-text', '').trim();

  return (
    <motion.span 
      variants={textContainerVariant} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: false, amount: 0.2 }} 
      className={`inline-block overflow-hidden py-1 ${cleanClassName}`}
    >
      {text.split('').map((char, index) => (
        <motion.span 
          key={index} 
          variants={letterVariant} 
          className={`inline-block ${isGrad ? 'grad-text' : ''}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Contact() {
  const [copied, setCopied] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Full-Time Software Engineering Role (Senior / Staff)',
    message: ''
  });

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await submitContactForm(formData);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', type: 'Full-Time Software Engineering Role (Senior / Staff)', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-[#07050c]/80 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="font-mono text-[11px] px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 tracking-wider uppercase mb-4 inline-block font-semibold"
          >
            GET IN TOUCH
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            <AnimatedText text="Let's Build Something " />
            <br className="hidden md:block" />
            <AnimatedText text="Remarkable Together." className="grad-text mt-2 block" />
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm md:text-base leading-relaxed mt-2"
          >
            Looking for a Full Stack Developer for full-time roles, contract development, or technical consulting? Let's connect.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Direct coordinates */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="card rounded-2xl p-6 md:p-8 border border-white/10 bg-panel/80 flex flex-col justify-between transition-colors"
          >
            <div>
              <h3 className="font-bold text-xl text-white mb-6">Direct Coordinates</h3>
              <div className="space-y-4">


                {/* Email */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">Email Address</p>
                      <p className="text-sm font-medium text-white">sanjaypal.1995@gmail.com</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('sanjaypal@example.com', 'email')}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct line */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">Direct Line / WhatsApp</p>
                      <p className="text-sm font-medium text-white">918878935066</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('+1 (555) 382-9014', 'phone')}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/10">
              <Globe className="w-5 h-5 text-purple-400 shrink-0" />
              <p className="text-xs text-gray-400 leading-relaxed">
                Flexible across US/EST &amp; IST timezones. Actively discussing full-time opportunities and technical advisory.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="card rounded-2xl p-6 md:p-8 border border-white/10 bg-panel/80 transition-colors"
          >
            <h3 className="font-bold text-xl text-white mb-1">Send a Message</h3>
            <p className="text-gray-400 text-xs mb-6">
              Get in touch for engineering roles, contract projects, or technical consulting.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Message Sent Successfully!</h4>
                <p className="text-xs text-gray-300">Thank you for reaching out. I will respond to your message promptly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="field w-full rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-purple-500"
                      placeholder="Full name"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Work Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="field w-full rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-purple-500"
                      placeholder="you@company.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Project / Role Type</label>
                  <select 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange} 
                    className="field w-full rounded-xl px-4 py-3 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500"
                    disabled={isLoading}
                  >
                    <option className="bg-gray-900">Full-Time Software Engineering Role (Senior / Staff)</option>
                    <option className="bg-gray-900">Contract / Freelance Project</option>
                    <option className="bg-gray-900">Technical Consulting / Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Message Context</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="field w-full rounded-xl px-4 py-3 text-sm text-white resize-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell me about your team, tech stack, goals, or upcoming technical challenges..."
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full grad-btn text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
