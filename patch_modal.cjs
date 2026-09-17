const fs = require('fs');
let code = fs.readFileSync('src/components/PostViewModal.tsx', 'utf8');

if (!code.includes('Link as LinkIcon')) {
  code = code.replace(
    /from 'lucide-react';/,
    ", Link as LinkIcon, Check } from 'lucide-react';"
  );
}

if (!code.includes('const [copied, setCopied] = React.useState(false);')) {
  code = code.replace(
    /const \{ language \} = useLanguage\(\);/,
    `const { language } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  
  const handleCopyLink = () => {
    if (!post) return;
    const link = \`\${window.location.origin}/?post=\${post.id}\`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };`
  );
}

// Add button next to the close button or inside the header
code = code.replace(
  /<button \n             onClick=\{onClose\}/,
  `<button 
             onClick={handleCopyLink}
             className="absolute top-4 right-14 z-10 p-2 bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground hover:text-primary transition-colors rounded-full hover:bg-foreground/5 flex items-center gap-2"
             title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
          >
            {copied ? <Check size={20} className="text-green-500" /> : <LinkIcon size={20} />}
          </button>
          <button 
             onClick={onClose}`
);

fs.writeFileSync('src/components/PostViewModal.tsx', code);
