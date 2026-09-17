const fs = require('fs');
let content = fs.readFileSync('src/components/ActivitySection.tsx', 'utf8');

content = content.replace(
  "import { Github, Twitter, GitCommit } from 'lucide-react';",
  "import { Github, Twitter, GitCommit, Rss } from 'lucide-react';"
);

content = content.replace(
  /        <div className="mb-16">\s*<h2 className="text-\[10px\] uppercase tracking-\[0\.2em\] text-white\/40 mb-6">\s*\{language === 'en' \? 'Recent Updates' : 'อัปเดตล่าสุด'\}\s*<\/h2>\s*<h2 className="text-3xl font-serif tracking-tight text-white mb-4">\s*\{language === 'en' \? 'Professional ' : 'กิจกรรม'\}<span className="italic text-white\/80">\{language === 'en' \? 'Activity' : 'การทำงาน'\}<\/span>\s*<\/h2>\s*<\/div>/g,
  `        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6">
              {language === 'en' ? 'Recent Updates' : 'อัปเดตล่าสุด'}
            </h2>
            <h2 className="text-3xl font-serif tracking-tight text-white mb-4">
              {language === 'en' ? 'Professional ' : 'กิจกรรม'}<span className="italic text-white/80">{language === 'en' ? 'Activity' : 'การทำงาน'}</span>
            </h2>
          </div>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] rounded-full hover:bg-[#C5A059]/20 transition-all self-start sm:self-auto"
            title={language === 'en' ? 'Subscribe to RSS Feed' : 'ติดตามข่าวสารผ่าน RSS Feed'}
          >
            <Rss size={14} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {language === 'en' ? 'RSS Feed' : 'ติดตาม RSS'}
            </span>
          </a>
        </div>`
);

fs.writeFileSync('src/components/ActivitySection.tsx', content, 'utf8');
