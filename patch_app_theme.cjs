const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (!code.includes('ThemeProvider')) {
    code = code.replace("import { AuthProvider } from './context/AuthContext';", "import { AuthProvider } from './context/AuthContext';\nimport { ThemeProvider } from './context/ThemeContext';");
    code = code.replace("<AuthProvider>", "<ThemeProvider>\n        <AuthProvider>");
    code = code.replace("</AuthProvider>", "</AuthProvider>\n      </ThemeProvider>");
}

fs.writeFileSync('src/App.tsx', code);
