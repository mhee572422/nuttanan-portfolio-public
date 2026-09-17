const fs = require('fs');
let code = fs.readFileSync('src/components/Updates.tsx', 'utf8');

// Add Mail to imports
if (!code.includes('Mail')) {
  // It imports two sets, but we previously fixed it to import Rss, Calendar, ArrowUpRight, Tag, Plus, Edit2, Trash2, Link as LinkIcon, Check
  code = code.replace(
    /Link as LinkIcon, Check \} from 'lucide-react';/,
    "Link as LinkIcon, Check, Mail } from 'lucide-react';"
  );
  // Just in case the previous script regex matched the first import line in Updates.tsx, let's just make sure Mail is imported.
  if (!code.includes('Mail }')) {
     code = code.replace(
      /from 'lucide-react';/,
      ", Mail } from 'lucide-react';"
     );
  }
}

const copyButtonCode = `<button
                      onClick={(e) => copyPostLink(e, post.id)}
                      className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                      title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
                    >
                      {copiedId === post.id ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} />}
                    </button>`;

const combinedButtonsCode = `<a
                      href={\`mailto:?subject=\${encodeURIComponent(language === 'en' ? post.title_en : post.title_th)}&body=\${encodeURIComponent(language === 'en' ? 'Check out this post: ' : 'ลองอ่านบทความนี้ดู: ') + encodeURIComponent('\\n' + window.location.origin + '/?post=' + post.id)}\`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                      title={language === 'en' ? 'Share via Email' : 'แชร์ผ่านอีเมล'}
                    >
                      <Mail size={14} />
                    </a>
                    <button
                      onClick={(e) => copyPostLink(e, post.id)}
                      className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                      title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
                    >
                      {copiedId === post.id ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} />}
                    </button>`;

code = code.replace(copyButtonCode, combinedButtonsCode);
fs.writeFileSync('src/components/Updates.tsx', code);
