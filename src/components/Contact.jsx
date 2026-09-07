import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Phone, Globe, Send, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-[#07050c]/80">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-[11px] px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 tracking-wider uppercase mb-4 inline-block font-semibold">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Let's Build Something <span className="grad-text block">Remarkable Together.</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Looking for a Senior Full-Stack Engineer for full-time roles, contract development, or technical consulting? Let's connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Direct coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card rounded-2xl p-6 md:p-8 border border-white/10 bg-panel/80 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-xl text-white mb-6">Direct Coordinates</h3>
              <div className="space-y-4">
                {/* LinkedIn */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">LinkedIn Profile</p>
                      <p className="text-sm font-medium text-white">linkedin.com/in/mahaksarla</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('linkedin.com/in/mahaksarla', 'linkedin')}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied === 'linkedin' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* GitHub */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">GitHub Profile</p>
                      <p className="text-sm font-medium text-white">github.com/mahaksarla</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('github.com/mahaksarla', 'github')}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied === 'github' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-mono">Email Address</p>
                      <p className="text-sm font-medium text-white">mahaksarla@example.com</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('mahaksarla@example.com', 'email')}
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
                      <p className="text-sm font-medium text-white">+1 (555) 382-9014</p>
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
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card rounded-2xl p-6 md:p-8 border border-white/10 bg-panel/80"
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      className="field w-full rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-purple-500"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-gray-400 block mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      className="field w-full rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-purple-500"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Project / Role Type</label>
                  <select className="field w-full rounded-xl px-4 py-3 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500">
                    <option className="bg-gray-900">Full-Time Software Engineering Role (Senior / Staff)</option>
                    <option className="bg-gray-900">Contract / Freelance Project</option>
                    <option className="bg-gray-900">Technical Consulting / Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-400 block mb-1">Message Context</label>
                  <textarea
                    rows={4}
                    required
                    className="field w-full rounded-xl px-4 py-3 text-sm text-white resize-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell me about your team, tech stack, goals, or upcoming technical challenges..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full grad-btn text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
