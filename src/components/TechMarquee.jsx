import React from 'react';

const techItems = [
  { name: 'React', icon: '⚛' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '⬡' },
  { name: 'Python', icon: '🐍' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'AWS', icon: '☁' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Redis', icon: '⚡' },
  { name: 'Go', icon: '🐹' },
];

export default function TechMarquee() {
  return (
    <div className="overflow-hidden mask-fade py-2">
      <div className="flex w-max gap-8 animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
        {[...techItems, ...techItems, ...techItems].map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-gray-300 font-mono text-xs hover:border-purple-500/40 hover:text-white transition-all shadow-sm"
          >
            <span className="text-purple-400 font-bold">{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
