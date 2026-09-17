const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Replace the hash logic with hash + query logic
code = code.replace(
  /const hash = window\.location\.hash;\n\s*if \(hash && hash\.startsWith\('#project-'\)\) \{\n\s*const id = hash\.replace\('#project-', ''\);/,
  `const hash = window.location.hash;
      const queryParams = new URLSearchParams(window.location.search);
      const projectId = queryParams.get('project') || (hash.startsWith('#project-') ? hash.replace('#project-', '') : null);
      if (projectId) {
        const id = projectId;`
);

// We should also replace the pushState when opening a project to set the query param
code = code.replace(
  /window\.history\.pushState\(null, '', \`#project-\$\{selectedProject\.id\}\`\);/,
  "window.history.pushState(null, '', `/?project=${selectedProject.id}`);"
);

// We should also replace the cleanup when closing
code = code.replace(
  /if \(typeof window !== 'undefined' && window\.location\.hash\.startsWith\('#project-'\)\) \{\n\s*window\.history\.pushState\(null, '', window\.location\.pathname\);\n\s*\}/,
  `if (typeof window !== 'undefined') {
        window.history.pushState(null, '', window.location.pathname);
      }`
);

fs.writeFileSync('src/components/Portfolio.tsx', code);
