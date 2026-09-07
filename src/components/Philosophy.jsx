import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const containerRef = useRef(null);

  // Row 1 Scroll Progress
  const { scrollYProgress: scrollY1 } = useScroll({
    target: containerRef,
    offset: ["0 1", "0.4 0.6"] 
  });

  // Row 2 Scroll Progress (slight delay)
  const { scrollYProgress: scrollY2 } = useScroll({
    target: containerRef,
    offset: ["0.2 1", "0.8 0.6"] 
  });

  // Row 1 Transforms
  const r1LeftX = useTransform(scrollY1, [0, 1], [-150, 0]);
  const r1RightX = useTransform(scrollY1, [0, 1], [150, 0]);
  const r1Scale = useTransform(scrollY1, [0, 1], [0.7, 1]);
  const r1Opacity = useTransform(scrollY1, [0, 1], [0, 1]);

  // Row 2 Transforms
  const r2LeftX = useTransform(scrollY2, [0, 1], [-150, 0]);
  const r2RightX = useTransform(scrollY2, [0, 1], [150, 0]);
  const r2Scale = useTransform(scrollY2, [0, 1], [0.7, 1]);
  const r2Opacity = useTransform(scrollY2, [0, 1], [0, 1]);

  const getStyle = (idx) => {
    const isRow1 = idx < 3;
    const pos = idx % 3; // 0: Left, 1: Center, 2: Right
    
    if (isRow1) {
      if (pos === 0) return { x: r1LeftX, opacity: r1Opacity };
      if (pos === 1) return { scale: r1Scale, opacity: r1Opacity };
      if (pos === 2) return { x: r1RightX, opacity: r1Opacity };
    } else {
      if (pos === 0) return { x: r2LeftX, opacity: r2Opacity };
      if (pos === 1) return { scale: r2Scale, opacity: r2Opacity };
      if (pos === 2) return { x: r2RightX, opacity: r2Opacity };
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-[#07050c] overflow-hidden">
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

        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophyItems.map((item, idx) => (
            <motion.div 
              key={idx}
              style={getStyle(idx)}
              whileHover={{ y: -6 }}
              className="card rounded-2xl p-6 border border-white/10 bg-panel/70 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-950/30 transition-colors duration-300"
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
