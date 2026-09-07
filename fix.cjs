const fs = require('fs');

const homePath = 'C:/template to html/src/pages/Home.jsx';
let homeCode = fs.readFileSync(homePath, 'utf8');

homeCode = homeCode.replace(
  /<Link to="\/#projects" className="">[\s\S]*?<\/Link>/g,
  '<Link to="/#projects" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/25 hover:shadow-purple-500/40 group">\n                <span>View All Projects</span>\n                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />\n              </Link>'
);

fs.writeFileSync(homePath, homeCode);

const heroPath = 'C:/template to html/src/components/Hero.jsx';
let heroCode = fs.readFileSync(heroPath, 'utf8');

console.log("Hero Code snippet:");
const heroMatch = heroCode.match(/<Link to="\/#projects".*?<\/Link>/s);
if (heroMatch) console.log(heroMatch[0]);

