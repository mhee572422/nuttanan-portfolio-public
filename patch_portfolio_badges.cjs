const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Add import
if (!content.includes('TechBadge')) {
  content = content.replace(
    "import { Helmet } from 'react-helmet-async';",
    "import { Helmet } from 'react-helmet-async';\nimport TechBadge from './TechBadge';"
  );
}

// Replace in 'featured' view mode (around line 328)
//                         {project.techStack.map(tech => (
//                           <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/60 rounded-full">
//                             {tech}
//                           </span>
//                         ))}

content = content.replace(
  /<span key=\{tech\} className="px-2 py-1 bg-white\/5 border border-white\/10 text-\[10px\] uppercase tracking-wider text-white\/60 rounded-full">\s*\{tech\}\s*<\/span>/g,
  "<TechBadge key={tech} tech={tech} />"
);

// Replace in 'archive' view mode (around line 361)
//                         {project.techStack.slice(0, 2).map(tech => (
//                           <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 text-[8px] uppercase tracking-wider text-white/60 rounded-full whitespace-nowrap">
//                             {tech}
//                           </span>
//                         ))}

content = content.replace(
  /<span key=\{tech\} className="px-2 py-1 bg-white\/5 border border-white\/10 text-\[8px\] uppercase tracking-wider text-white\/60 rounded-full whitespace-nowrap">\s*\{tech\}\s*<\/span>/g,
  "<TechBadge key={tech} tech={tech} size=\"sm\" />"
);

// We should also replace the tech stack inside the selected project modal
//                         {selectedProject.techStack.map(tech => (
//                           <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/80 rounded-full">
//                             {tech}
//                           </span>
//                         ))}

content = content.replace(
  /<span key=\{tech\} className="px-3 py-1\.5 bg-white\/5 border border-white\/10 text-\[10px\] uppercase tracking-wider text-white\/80 rounded-full">\s*\{tech\}\s*<\/span>/g,
  "<TechBadge key={tech} tech={tech} />"
);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');

