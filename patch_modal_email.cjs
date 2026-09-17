const fs = require('fs');
let code = fs.readFileSync('src/components/PostViewModal.tsx', 'utf8');

// Add Mail to imports
if (!code.includes('Mail')) {
  code = code.replace(
    /import \{ X, Calendar, Tag, Clock, Link as LinkIcon, Check \} from 'lucide-react';/,
    "import { X, Calendar, Tag, Clock, Link as LinkIcon, Check, Mail } from 'lucide-react';"
  );
}

// Replace the scattered absolute buttons with a flex container containing all three
const oldButtons = `<button 
             onClick={handleCopyLink}
             className="absolute top-4 right-14 z-10 p-2 bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground hover:text-primary transition-colors rounded-full hover:bg-foreground/5 flex items-center gap-2"
             title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
          >
            {copied ? <Check size={20} className="text-green-500" /> : <LinkIcon size={20} />}
          </button>
          <button 
             onClick={onClose}
             className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground hover:text-primary transition-colors rounded-full hover:bg-foreground/5"
          >
            <X size={20} />
          </button>`;

const newButtons = `<div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <a 
               href={\`mailto:?subject=\${encodeURIComponent(title)}&body=\${encodeURIComponent(language === 'en' ? 'Check out this post: ' : 'ลองอ่านบทความนี้ดู: ') + encodeURIComponent('\\n' + window.location.origin + '/?post=' + post.id)}\`}
               className="p-2 bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground hover:text-primary transition-colors rounded-full hover:bg-foreground/5 flex items-center gap-2"
               title={language === 'en' ? 'Share via Email' : 'แชร์ผ่านอีเมล'}
            >
              <Mail size={20} />
            </a>
            <button 
               onClick={handleCopyLink}
               className="p-2 bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground hover:text-primary transition-colors rounded-full hover:bg-foreground/5 flex items-center gap-2"
               title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
            >
              {copied ? <Check size={20} className="text-green-500" /> : <LinkIcon size={20} />}
            </button>
            <button 
               onClick={onClose}
               className="p-2 bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground hover:text-primary transition-colors rounded-full hover:bg-foreground/5"
            >
              <X size={20} />
            </button>
          </div>`;

code = code.replace(oldButtons, newButtons);
fs.writeFileSync('src/components/PostViewModal.tsx', code);
