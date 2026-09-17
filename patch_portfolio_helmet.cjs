const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Add Helmet import
if (!content.includes('react-helmet-async')) {
  content = content.replace(
    "import { X, ExternalLink, Github, Clock, Folder, Code, Search } from 'lucide-react';",
    "import { X, ExternalLink, Github, Clock, Folder, Code, Search } from 'lucide-react';\nimport { Helmet } from 'react-helmet-async';"
  );
  // Also try to catch if the imports are just the generic ones
  if (!content.includes('react-helmet-async')) {
     content = content.replace(
        "import { useLanguage } from '../context/LanguageContext';",
        "import { useLanguage } from '../context/LanguageContext';\nimport { Helmet } from 'react-helmet-async';"
     );
  }
}

// Check for the modal opening logic
// When selectedProject is true, we want to render Helmet
const helmetCode = `
          <Helmet>
            <title>{selectedProject.title} | {language === 'en' ? 'Portfolio' : 'ผลงาน'}</title>
            <meta name="description" content={selectedProject.description} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={\`\${selectedProject.title} - \${selectedProject.category}\`} />
            <meta property="og:description" content={selectedProject.description} />
            <meta property="og:image" content={selectedProject.imageUrl} />
            <meta property="og:url" content={typeof window !== 'undefined' ? \`\${window.location.origin}/#project-\${selectedProject.id}\` : ''} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={\`\${selectedProject.title} - \${selectedProject.category}\`} />
            <meta name="twitter:description" content={selectedProject.description} />
            <meta name="twitter:image" content={selectedProject.imageUrl} />
          </Helmet>
`;

content = content.replace(
  "{selectedProject && (",
  "{selectedProject && (\n        <>\n" + helmetCode
);

content = content.replace(
  /<\/motion\.div>\n\s*<\/motion\.div>\n\s*\)\}/s,
  "</motion.div>\n          </motion.div>\n        </>\n        )}"
);

// Add URL hash sync logic
const urlSyncLogic = `
  useEffect(() => {
    // Check hash on mount
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#project-')) {
        const id = hash.replace('#project-', '');
        // find project in all languages just in case
        const proj = projects[language].find(p => p.id === id);
        if (proj) setSelectedProject(proj);
      }
    }
  }, [language]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', \`#project-\${selectedProject.id}\`);
      }
      trackEvent('project_viewed', { projectId: selectedProject.id, title: selectedProject.title });
    } else {
      document.body.style.overflow = 'auto';
      if (typeof window !== 'undefined' && window.location.hash.startsWith('#project-')) {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject, trackEvent]);
`;

content = content.replace(
  /useEffect\(\(\) => \{\n\s*if \(selectedProject\) \{\n\s*document\.body\.style\.overflow = 'hidden';\n\s*trackEvent\('project_viewed', \{ projectId: selectedProject\.id, title: selectedProject\.title \}\);\n\s*\} else \{\n\s*document\.body\.style\.overflow = 'auto';\n\s*\}\n\s*return \(\) => \{\n\s*document\.body\.style\.overflow = 'auto';\n\s*\};\n\s*\}, \[selectedProject, trackEvent\]\);/s,
  urlSyncLogic
);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');

