const fs = require('fs');

const heroPath = 'C:/template to html/src/components/Hero.jsx';
let heroCode = fs.readFileSync(heroPath, 'utf8');

heroCode = heroCode.replace(
  /<Link to="\/#projects" className="">[\s\S]*?<\/Link>/g,
  '<Link to="/#projects" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.02] text-sm font-medium text-gray-200 hover:border-purple-500/50 hover:bg-white/[0.05] transition-all hover:scale-105 active:scale-95">\n            <span>Explore Projects</span>\n            <ArrowRight className="w-4 h-4 text-purple-400" />\n          </Link>'
);

fs.writeFileSync(heroPath, heroCode);
console.log("Fixed Hero.jsx");
