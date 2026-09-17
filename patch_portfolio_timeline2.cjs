const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

const regex = /\{selectedProject\.milestones && selectedProject\.milestones\.length > 0 && \([\s\S]*?<\/ResponsiveContainer>\s*<\/div>\s*\{\/\* Fallback accessible list \(screen readers only\) \*\/\}\s*<div className="sr-only">[\s\S]*?<\/div>\s*<\/div>\s*\)\}/;

content = content.replace(regex, `<ProjectTimeline milestones={selectedProject.milestones} />`);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');

