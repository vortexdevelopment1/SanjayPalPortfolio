const fs = require('fs');

const p = 'C:/template to html/frontend/src/components/Header.jsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/className=\{ixed top-0 inset-x-0 z-50 transition-all duration-300 \}/, "className={ixed top-0 inset-x-0 z-50 transition-all duration-300 }");

fs.writeFileSync(p, c);
console.log('Fixed backticks');
