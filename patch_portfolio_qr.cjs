const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

if (!content.includes('import { QRCodeSVG } from')) {
  content = content.replace(
    "import { useAnalytics } from '../context/AnalyticsContext';",
    "import { useAnalytics } from '../context/AnalyticsContext';\nimport { QRCodeSVG } from 'qrcode.react';"
  );
}

// Find the title and add the QR code next to it
const regex = /<h3 className="text-3xl sm:text-4xl font-serif text-white mb-6">\s*\{selectedProject\.title\}\s*<\/h3>/;

const newBlock = `<div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl sm:text-4xl font-serif text-white">
                    {selectedProject.title}
                  </h3>
                  
                  {/* QR Code linking to Print/Resume view */}
                  <div className="hidden md:flex flex-col items-center gap-2 bg-[#1A1A1A] p-3 border border-white/10 rounded-lg" title={language === 'en' ? 'Scan to view/download full resume' : 'สแกนเพื่อดู/ดาวน์โหลดเรซูเม่ฉบับเต็ม'}>
                    <QRCodeSVG 
                      value={typeof window !== 'undefined' ? \`\${window.location.origin}?print=true\` : 'https://nuttanan.dev?print=true'}
                      size={64}
                      bgColor="transparent"
                      fgColor="#C5A059"
                      level="L"
                    />
                    <span className="text-[8px] text-white/40 uppercase tracking-widest whitespace-nowrap">
                      {language === 'en' ? 'Scan Resume' : 'สแกนเรซูเม่'}
                    </span>
                  </div>
                </div>`;

content = content.replace(regex, newBlock);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');
