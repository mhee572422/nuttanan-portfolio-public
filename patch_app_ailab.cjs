const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('AILab')) {
    code = code.replace("import Portfolio from './components/Portfolio';", "import Portfolio from './components/Portfolio';\nimport AILab from './components/AILab';");
    code = code.replace("<FadeInSection><Portfolio /></FadeInSection>\n        <SectionSeparator />", "<FadeInSection><Portfolio /></FadeInSection>\n        <SectionSeparator />\n        <FadeInSection><AILab /></FadeInSection>\n        <SectionSeparator />");
}
fs.writeFileSync('src/App.tsx', code);
