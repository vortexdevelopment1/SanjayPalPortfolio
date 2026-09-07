import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, AlertCircle, Clock, Cpu, Zap, Layout, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);

  // Row 1 Refs
  const card1Ref = useRef(null);
  const title1Ref = useRef(null);
  const text1Ref = useRef(null);
  const listItemsRef = useRef([]);

  // Row 2 Refs
  const card2Ref = useRef(null);
  const title2Ref = useRef(null);
  const text2Ref = useRef(null);

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

  // Function to split text string into individual animated character spans
  const renderSplitText = (text, ref) => {
    return (
      <span ref={ref} className="inline-block">
        {text.split('').map((char, index) => (
          <span key={index} className="char inline-block opacity-10">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ------------ ROW 1 GSAP SCROLL ANIMATIONS ------------ */
      // 1. Card 1 scroll reveal (slide up & scale in)
      gsap.fromTo(card1Ref.current,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1
          }
        }
      );

      // 2. List items inside Card 1 pop in staggered
      gsap.fromTo(listItemsRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: card1Ref.current,
            start: 'top 75%'
          }
        }
      );

      // 3. Side text letter-by-letter reveal (Title 1)
      if (title1Ref.current) {
        const chars1 = title1Ref.current.querySelectorAll('.char');
        gsap.to(chars1, {
          opacity: 1,
          color: '#ffffff',
          stagger: 0.03,
          scrollTrigger: {
            trigger: title1Ref.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5
          }
        });
      }

      // 4. Side text letter-by-letter reveal (Paragraph 1)
      if (text1Ref.current) {
        const chars1Text = text1Ref.current.querySelectorAll('.char');
        gsap.to(chars1Text, {
          opacity: 1,
          color: '#9793a6',
          stagger: 0.01,
          scrollTrigger: {
            trigger: text1Ref.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5
          }
        });
      }

      /* ------------ ROW 2 GSAP SCROLL ANIMATIONS ------------ */
      // 1. Card 2 scroll reveal
      gsap.fromTo(card2Ref.current,
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: card2Ref.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1
          }
        }
      );

      // 2. Side text letter-by-letter reveal (Title 2)
      if (title2Ref.current) {
        const chars2 = title2Ref.current.querySelectorAll('.char');
        gsap.to(chars2, {
          opacity: 1,
          color: '#ffffff',
          stagger: 0.03,
          scrollTrigger: {
            trigger: title2Ref.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5
          }
        });
      }

      // 3. Side text letter-by-letter reveal (Paragraph 2)
      if (text2Ref.current) {
        const chars2Text = text2Ref.current.querySelectorAll('.char');
        gsap.to(chars2Text, {
          opacity: 1,
          color: '#9793a6',
          stagger: 0.01,
          scrollTrigger: {
            trigger: text2Ref.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

        {/* Row 1: GSAP Scroll Card Left, Alphabet Reveal Text Right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-28">
          {/* Card 1 with clean visible list items */}
          <div
            ref={card1Ref}
            className="rounded-2xl p-6 border border-white/15 bg-[#0e0b16] shadow-2xl hover:border-purple-500/50 transition-all group"
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
                    ref={el => listItemsRef.current[idx] = el}
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
          </div>

          {/* Text Right with GSAP Alphabet Scroll Reveal */}
          <div className="space-y-5">
            <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 text-purple-300 inline-block font-semibold bg-white/[0.02]">
              Distributed Systems
            </span>
            <h3 className="text-3xl font-extrabold leading-tight">
              {renderSplitText("Automate complex backend workflows", title1Ref)}
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              {renderSplitText("We engineer resilient event-driven architectures, background workers, and asynchronous queues that process high-volume tasks with zero data loss.", text1Ref)}
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
          </div>
        </div>

        {/* Row 2: Text Left with Alphabet Scroll Reveal, GSAP Scroll Card Right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-5 order-2 md:order-1">
            <span className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 text-purple-300 inline-block font-semibold bg-white/[0.02]">
              Frontend &amp; Web Apps
            </span>
            <h3 className="text-3xl font-extrabold leading-tight">
              {renderSplitText("Pixel-Perfect, High-Performance UI", title2Ref)}
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              {renderSplitText("Modern web applications built with Next.js, React, and TypeScript. Optimized for sub-second page loads, accessible interactions, and fluid animations.", text2Ref)}
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
          </div>

          {/* Card 2 with GSAP Scroll Reveal */}
          <div
            ref={card2Ref}
            className="order-1 md:order-2 rounded-2xl p-6 border border-white/15 bg-[#0e0b16] shadow-2xl hover:border-purple-500/50 transition-all"
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
          </div>
        </div>
      </div>
    </section>
  );
}
