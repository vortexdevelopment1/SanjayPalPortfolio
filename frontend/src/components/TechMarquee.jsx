import React, { useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { 
  Atom, 
  Triangle, 
  FileCode2, 
  Hexagon, 
  Terminal, 
  Database, 
  Box, 
  Cloud, 
  Network, 
  Wind, 
  Zap, 
  Cpu 
} from 'lucide-react';

const techItems = [
  { name: 'React', icon: Atom },
  { name: 'Next.js', icon: Triangle },
  { name: 'TypeScript', icon: FileCode2 },
  { name: 'Node.js', icon: Hexagon },
  { name: 'Python', icon: Terminal },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Docker', icon: Box },
  { name: 'AWS', icon: Cloud },
  { name: 'GraphQL', icon: Network },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'Redis', icon: Zap },
  { name: 'Go', icon: Cpu },
];

export default function TechMarquee() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    itemsRef.current.forEach((item) => {
      if (!item) return;
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      
      const distance = Math.abs(containerCenter - itemCenter);
      const maxDistance = containerRect.width / 2; 
      
      // Use sine/cosine curve for a more natural "circular/cylinder" 3D feel
      // normalizedDistance: 0 at center, 1 at edge
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      
      // Opacity drops less aggressively (1 at center, 0.4 at edge)
      const opacity = 1 - (normalizedDistance * 0.6); 
      
      // Subtle scale (1 at center, 0.9 at edges) instead of extreme 3D
      const scale = 1 - (normalizedDistance * 0.1); 

      // Color interpolation: Center is white (255,255,255), edges are gray-400 (156,163,175)
      const r = Math.round(156 + (255 - 156) * (1 - normalizedDistance));
      const g = Math.round(163 + (255 - 163) * (1 - normalizedDistance));
      const b = Math.round(175 + (255 - 175) * (1 - normalizedDistance));

      // Halka sa glow sirf center ke liye (max 4px blur, 40% opacity)
      const glowIntensity = (1 - normalizedDistance) * 4; 
      const glowOpacity = (1 - normalizedDistance) * 0.4;

      item.style.opacity = opacity.toFixed(3);
      item.style.transform = `scale(${scale.toFixed(3)})`;
      item.style.color = `rgb(${r}, ${g}, ${b})`;
      item.style.textShadow = `0 0 ${glowIntensity.toFixed(1)}px rgba(255,255,255,${glowOpacity.toFixed(2)})`;
      
      // Also apply color to the SVG icon inside
      const svg = item.querySelector('svg');
      if (svg) {
        svg.style.color = `rgb(${r}, ${g}, ${b})`;
        svg.style.filter = `drop-shadow(0 0 ${glowIntensity.toFixed(1)}px rgba(255,255,255,${glowOpacity.toFixed(2)}))`;
      }
    });
  });

  return (
    // approx 20cm width (~768px), centered
    <div 
      className="mx-auto w-full max-w-4xl overflow-hidden py-10 relative" 
      ref={containerRef}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
      }}
    >
      <motion.div 
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 35,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* Render 2 identical sets for seamless continuous looping */}
        {[0, 1].map((setIndex) => (
          <div key={setIndex} className="flex gap-12 px-6 items-center">
            {techItems.map((item, index) => {
              const globalIndex = setIndex * techItems.length + index;
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  ref={el => itemsRef.current[globalIndex] = el}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Icon className="w-6 h-6" strokeWidth={2.5} />
                  <span className="whitespace-nowrap font-bold text-lg tracking-wide">{item.name}</span>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
