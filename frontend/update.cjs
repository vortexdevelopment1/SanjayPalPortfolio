const fs = require('fs');

const homePath = 'C:/template to html/frontend/src/pages/Home.jsx';
let homeCode = fs.readFileSync(homePath, 'utf8');

homeCode = homeCode.replace(/import \{ ArrowRight \} from 'lucide-react';/, "import { ArrowRight } from 'lucide-react';\nimport { Link } from 'react-router-dom';");

homeCode = homeCode.replace(/<button[\s\S]*?onClick=\{handleScrollToProjects\}[\s\S]*?className="(.*?)"[\s\S]*?>\s*<span>(.*?)<\/span>\s*<ArrowRight className="(.*?)" \/>\s*<\/button>/, '<Link to="/#projects" className="">\n                <span></span>\n                <ArrowRight className="" />\n              </Link>');

homeCode = homeCode.replace(/const handleScrollToProjects = \(\) => \{[\s\S]*?\};\n/, '');

fs.writeFileSync(homePath, homeCode);

const heroPath = 'C:/template to html/frontend/src/components/Hero.jsx';
let heroCode = fs.readFileSync(heroPath, 'utf8');

heroCode = heroCode.replace(/import \{ Github, ArrowRight, Sparkles \} from 'lucide-react';/, "import { Github, ArrowRight, Sparkles } from 'lucide-react';\nimport { Link } from 'react-router-dom';");

heroCode = heroCode.replace(/<a \s*href="#projects" \s*className="(.*?)"\s*>\s*<span>(.*?)<\/span>\s*<ArrowRight className="(.*?)" \/>\s*<\/a>/, '<Link to="/#projects" className="">\n            <span></span>\n            <ArrowRight className="" />\n          </Link>');

fs.writeFileSync(heroPath, heroCode);
console.log('Updated components');
