const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

const oldFunc = `const getReadingTime = (project: ProjectItem, lang: string) => {
  const text = project.detailedDescription || project.description;
  const wordCount = text.split(/\\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return lang === 'en' ? \`\${minutes} min read\` : \`\${minutes} นาทีในการอ่าน\`;
};`;

const newFunc = `const getReadingTime = (project: ProjectItem, lang: string) => {
  // Aggregate all text content from the project for a more accurate reading time
  const texts = [
    project.detailedDescription || project.description,
    project.challenges || '',
    ...(project.technicalSpecs || []),
    ...(project.milestones ? project.milestones.map(m => \`\${m.phase} \${m.description}\`) : [])
  ];
  
  const fullText = texts.join(' ');
  // Calculate word count (splitting by whitespace)
  const wordCount = fullText.split(/\\s+/).filter(w => w.trim().length > 0).length;
  // Average reading speed: 200 words per minute
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return lang === 'en' ? \`\${minutes} min read\` : \`อ่าน \${minutes} นาที\`;
};`;

if (content.includes(oldFunc)) {
  content = content.replace(oldFunc, newFunc);
  fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');
  console.log("Successfully patched getReadingTime");
} else {
  console.log("Could not find the exact old function to replace");
}
