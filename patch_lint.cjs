const fs = require('fs');

function addReactImport(file) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes("import React")) {
        content = "import React from 'react';\n" + content;
        fs.writeFileSync(file, content);
    }
}

addReactImport('src/components/Contact.tsx');
addReactImport('src/context/AuthContext.tsx');
addReactImport('src/components/Portfolio.tsx');

let portfolio = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');
if (!portfolio.includes('Maximize2')) {
    portfolio = portfolio.replace(
        "import { ExternalLink, Search, X, Github, Clock, Code, Folder } from 'lucide-react';",
        "import { ExternalLink, Search, X, Github, Clock, Code, Folder, Maximize2 } from 'lucide-react';"
    );
    fs.writeFileSync('src/components/Portfolio.tsx', portfolio);
}
