import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, AlertCircle, Clock, Cpu, Zap, Layout, Sparkles } from 'lucide-react';

export default function Services() {
  const sectionRef = useRef(null);

  // Row 1 Refs
  const row1Ref = useRef(null);
  const { scrollYProgress: scrollY1 } = useScroll({
    target: row1Ref,
    offset: ["0 1", "0.6 0.5"] // Starts when top hits bottom, ends when slightly past center
  });
  
  const row1CardX = useTransform(scrollY1, [0, 1], [-150, 0]);
  const row1TextX = useTransform(scrollY1, [0, 1], [150, 0]);
  const row1Opacity = useTransform(scrollY1, [0, 1], [0, 1]);

  // Row 2 Refs
  const row2Ref = useRef(null);
  const { scrollYProgress: scrollY2 } = useScroll({
    target: row2Ref,
    offset: ["0 1", "0.6 0.5"]
  });

  const row2TextX = useTransform(scrollY2, [0, 1], [-150, 0]);
  const row2CardX = useTransform(scrollY2, [0, 1], [150, 0]);
  const row2Opacity = useTransform(scrollY2, [0, 1], [0, 1]);

  const taskItems = [
    {
      title: "Payroll management architecture",
      subtitle: "Scheduled recurring execution · Due on 2nd July",
      status: "completed",
      icon: <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
    },
    {
      title: "Employee Tracking & Telemetry",
      subtitle: "Real-time WebSocket stream · 2 days ago",
      status: "completed",
      icon: <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
    },
    {
      title: "Social media post automated queue",
      subtitle: "Action cancelled by user policy",
      status: "cancelled",
      icon: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
    },
    {
      title: "Lead list automated ingestion",
      subtitle: "70% high-throughput items processed",
      status: "progress",
      progress: 70,
      icon: <Clock className="w-4 h-4 text-purple-300 shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32 px-6 md:px-10 border-t border-white/10 bg-[#07050c]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <span className="font-mono text-[11px] px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 tracking-wider uppercase mb-4 inline-block font-semibold">
            OUR SERVICES &amp; CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Full-Stack Engineering &amp; Scalable Systems
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            End-to-end technical expertise across modern web stacks, distributed APIs, and reliable infrastructure.
          </p>
        </div>

        {/* Row 1: Left Card, Right Text */}
        <div ref={row1Ref} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-28 overflow-hidden">
          {/* Card 1 */}
          <motion.div
            style={{ x: row1CardX, opacity: row1Opacity }}
            className="rounded-2xl p-6 border border-white/15 bg-[#0e0b16] shadow-2xl hover:border-purple-500/50 transition-colors group"
          >
            <div className="bg-[#07050c] rounded-xl border border-white/10 p-5 shadow-inner">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-sm">All Tasks</span>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-mono font-medium border border-amber-500/30">
                  Waiting for approval
                </span>
                <span className="font-mono text-[10px] text-gray-400">Group · 4</span>
              </div>

              {/* High-visibility list items */}
              <div className="space-y-3">
                {taskItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-purple-500/60 hover:bg-white/[0.06] transition-all flex items-center justify-between shadow-sm"
                  >
                    <div className="space-y-1">
                      <p className="text-white font-semibold text-xs md:text-sm tracking-wide">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-gray-400">{item.subtitle}</p>
                      {item.progress && (
                        <div className="w-36 h-1.5 rounded-full bg-white/10 overflow-hidden mt-1.5">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="ml-3 shrink-0">
                      {item.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Text Right */}
          <motion.div style={{ x: row1TextX, opacity: row1Opacity }} className="space-y-5">
            <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 text-purple-300 inline-block font-semibold bg-white/[0.02]">
              Distributed Systems
            </span>
            <h3 className="text-3xl font-extrabold leading-tight text-white">
              Automate complex backend workflows
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-[#9793a6]">
              We engineer resilient event-driven architectures, background workers, and asynchronous queues that process high-volume tasks with zero data loss.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> Event Queues
              </span>
              <span className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-400" /> Microservices
              </span>
              <span className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> 100k+ Jobs/sec
              </span>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Text Left, Card Right */}
        <div ref={row2Ref} className="grid md:grid-cols-2 gap-10 md:gap-16 items-center overflow-hidden">
          <motion.div style={{ x: row2TextX, opacity: row2Opacity }} className="space-y-5 order-2 md:order-1">
            <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 text-purple-300 inline-block font-semibold bg-white/[0.02]">
              Frontend &amp; Web Apps
            </span>
            <h3 className="text-3xl font-extrabold leading-tight text-white">
              Pixel-Perfect, High-Performance UI
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-[#9793a6]">
              Modern web applications built with Next.js, React, and TypeScript. Optimized for sub-second page loads, accessible interactions, and fluid animations.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-300 flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-purple-400" /> Next.js / React
              </span>
              <span className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-300 flex items-center gap-1.5">
                🌊 Tailwind CSS
              </span>
              <span className="font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-300 flex items-center gap-1.5">
                🎨 Design Systems
              </span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            style={{ x: row2CardX, opacity: row2Opacity }}
            className="order-1 md:order-2 rounded-2xl p-6 border border-white/15 bg-[#0e0b16] shadow-2xl hover:border-purple-500/50 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-600/40">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-lg text-white mb-2">What can I build with you?</h4>
              <p className="text-xs text-gray-400 max-w-[260px] mb-5 leading-relaxed">
                Whether you need high-concurrency microservices, AI pipelines, or a design system overhaul.
              </p>

              <div className="w-full rounded-xl px-4 py-3 text-xs text-gray-200 mb-4 text-left border border-white/10 bg-white/[0.03] flex items-center justify-between font-mono">
                <span>Architect microservice with Redis queue</span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 text-gray-300 bg-white/[0.02]">
                  Analyze schema
                </span>
                <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 text-gray-300 bg-white/[0.02]">
                  Generate API
                </span>
                <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 text-gray-300 bg-white/[0.02]">
                  Optimize queries
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
