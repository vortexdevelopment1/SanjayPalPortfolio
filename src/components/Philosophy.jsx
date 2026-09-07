import React from 'react';
import { motion } from 'framer-motion';
import { Code, Settings, Star, ShieldCheck, Clock, TrendingUp } from 'lucide-react';

const philosophyItems = [
  {
    icon: <Code className="w-5 h-5 text-purple-400" />,
    title: "Clean & Maintainable Code",
    description: "Strict typing, modular components, declarative state, and clear documentation that your entire engineering team will love maintaining."
  },
  {
    icon: <Settings className="w-5 h-5 text-purple-400" />,
    title: "High Concurrency & Scalability",
    description: "Architected from day one for zero-downtime horizontal scaling, smart caching layers, and fault-tolerant distributed resilience."
  },
  {
    icon: <Star className="w-5 h-5 text-purple-400" />,
    title: "Pixel-Perfect UI/UX",
    description: "Fluid 60fps micro-interactions, WCAG AA accessibility compliance, responsive cross-device layouts, and rapid web-vital performance."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    title: "Production Reliability",
    description: "Robust testing culture with unit, integration, and E2E suites achieving 90%+ code coverage, automated CI rollbacks, and alerts."
  },
  {
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    title: "Fast Execution & Delivery",
    description: "Agile iterative shipping, rapid prototyping, and shipping features to production fast without compromising craftsmanship."
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
    title: "Continuous Learning & Modern Stack",
    description: "Constantly adopting emerging standards, cloud native paradigms, serverless primitives, and cutting-edge software design patterns."
  }
];

export default function Philosophy() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-[#07050c]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-mono text-[11px] px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 tracking-wider uppercase mb-4 inline-block font-semibold">
            ENGINEERING PHILOSOPHY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            How I Deliver Value as an Engineer
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Pragmatic software engineering principles focused on clean code, scalability, and business impact.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophyItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="card rounded-2xl p-6 border border-white/10 bg-panel/70 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-950/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
