const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('Updates')) {
    code = code.replace("import AILab from './components/AILab';", "import AILab from './components/AILab';\nimport Updates from './components/Updates';");
    code = code.replace("<FadeInSection><AILab /></FadeInSection>\n        <SectionSeparator />", "<FadeInSection><AILab /></FadeInSection>\n        <SectionSeparator />\n        <FadeInSection><Updates /></FadeInSection>\n        <SectionSeparator />");
}

fs.writeFileSync('src/App.tsx', code);
