const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { regex: /bg-\[\#0A0A0A\]/g, replacement: 'bg-background' },
  { regex: /bg-\[\#1A1A1A\]/g, replacement: 'bg-surface' },
  { regex: /bg-\[\#111\]/g, replacement: 'bg-surface-alt' },
  { regex: /bg-\[\#111111\]/g, replacement: 'bg-surface-alt' },
  { regex: /text-\[\#C5A059\]/g, replacement: 'text-primary' },
  { regex: /bg-\[\#C5A059\]/g, replacement: 'bg-primary' },
  { regex: /border-\[\#C5A059\]/g, replacement: 'border-primary' },
  { regex: /ring-\[\#C5A059\]/g, replacement: 'ring-primary' },
  { regex: /from-\[\#1A1A1A\]/g, replacement: 'from-surface' },
  { regex: /to-\[\#111\]/g, replacement: 'to-surface-alt' },
  { regex: /to-\[\#111111\]/g, replacement: 'to-surface-alt' },
  // text-white and text-white/XX -> text-foreground and text-foreground/XX
  // border-white/XX -> border-foreground/XX
  // bg-white/XX -> bg-foreground/XX
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let newContent = content;
      for (const { regex, replacement } of replacements) {
        newContent = newContent.replace(regex, replacement);
      }
      
      // Need a careful regex for text-white, border-white, bg-white
      // to avoid matching things like "text-white-500" if they existed, but they don't here.
      // E.g., border-white/10 -> border-foreground/10
      newContent = newContent.replace(/text-white(\/[0-9]+)?/g, 'text-foreground$1');
      newContent = newContent.replace(/border-white(\/[0-9]+)?/g, 'border-foreground$1');
      newContent = newContent.replace(/bg-white(\/[0-9]+)?/g, 'bg-foreground$1');
      newContent = newContent.replace(/from-white(\/[0-9]+)?/g, 'from-foreground$1');
      newContent = newContent.replace(/to-white(\/[0-9]+)?/g, 'to-foreground$1');
      newContent = newContent.replace(/ring-white(\/[0-9]+)?/g, 'ring-foreground$1');
      newContent = newContent.replace(/fill-white(\/[0-9]+)?/g, 'fill-foreground$1');
      newContent = newContent.replace(/stroke-white(\/[0-9]+)?/g, 'stroke-foreground$1');

      // Revert any unintended "bg-foreground" that was actually purely "bg-white" and should stay white?
      // Actually, if we are doing full light/dark mode, the text/bg that was white should flip.
      // Wait, what if there are elements that *must* be white even in light mode? Like buttons?
      // E.g. "bg-white text-black" in dark mode meant a light button. In light mode, it might need to be "bg-black text-white".
      // Let's do a more targeted text replace.
      newContent = newContent.replace(/bg-white text-\[\#0A0A0A\]/g, 'bg-foreground text-background');
      newContent = newContent.replace(/bg-foreground text-\[\#0A0A0A\]/g, 'bg-foreground text-background'); // if bg-white was already replaced
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

processDirectory(directoryPath);
console.log('Replaced colors in ' + directoryPath);
