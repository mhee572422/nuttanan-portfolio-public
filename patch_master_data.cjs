const fs = require('fs');

// 1. Update data.ts
let dataTs = fs.readFileSync('src/data.ts', 'utf8');

const newCertifications = `export const certifications: Record<'en' | 'th', CertificationItem[]> = {
  en: [
    {
      id: '1',
      title: 'Google AI Professional Certificate',
      issuer: 'Coursera',
      date: 'April 2026',
      description: 'Professional certification demonstrating proficiency in Google AI technologies and solutions.',
      credentialUrl: '#',
      credentialId: '3fb42eaf-4454-44ab-bb4d-5a1e5a114427',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '2',
      title: 'Hello, Python!',
      issuer: 'Coursera',
      date: 'August 2026',
      description: 'Foundational programming skills in Python for data analysis and general-purpose programming.',
      credentialUrl: '#',
      credentialId: 'New Course',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '3',
      title: 'Foundations of Project Management',
      issuer: 'Coursera',
      date: 'August 2026',
      description: 'Core project management skills, including traditional and agile methodologies.',
      credentialUrl: '#',
      credentialId: 'New Course',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '4',
      title: 'Build Your First Agent with ADK',
      issuer: 'Google Cloud',
      date: 'June 2026',
      description: 'Practical experience in building AI agents using the Agent Development Kit (ADK).',
      credentialUrl: '#',
      credentialId: 'JW8XNBEIIWKX',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '5',
      title: 'Create Your First Gemini Enterprise App',
      issuer: 'Google Cloud',
      date: 'May 2026',
      description: 'Skill Badge for developing enterprise-ready applications using the Gemini model.',
      credentialUrl: '#',
      credentialId: 'Skill Badge',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '6',
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud',
      date: 'May 2026',
      description: 'Foundational understanding of Generative AI principles and Google Cloud tools.',
      credentialUrl: '#',
      credentialId: 'CNHXVMDFGAR6',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    }
  ],
  th: [
    {
      id: '1',
      title: 'Google AI Professional Certificate',
      issuer: 'Coursera',
      date: 'เม.ย. 2026',
      description: 'ใบรับรองความเชี่ยวชาญระดับมืออาชีพด้านเทคโนโลยีและโซลูชัน Google AI',
      credentialUrl: '#',
      credentialId: '3fb42eaf-4454-44ab-bb4d-5a1e5a114427',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '2',
      title: 'Hello, Python!',
      issuer: 'Coursera',
      date: 'ส.ค. 2026',
      description: 'ทักษะการเขียนโปรแกรมภาษา Python ขั้นพื้นฐานสำหรับการวิเคราะห์ข้อมูลและการเขียนโปรแกรมทั่วไป',
      credentialUrl: '#',
      credentialId: 'New Course',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '3',
      title: 'Foundations of Project Management',
      issuer: 'Coursera',
      date: 'ส.ค. 2026',
      description: 'ทักษะการจัดการโครงการหลัก รวมถึงระเบียบวิธีแบบดั้งเดิมและแบบอไจล์ (Agile)',
      credentialUrl: '#',
      credentialId: 'New Course',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '4',
      title: 'Build Your First Agent with ADK',
      issuer: 'Google Cloud',
      date: 'มิ.ย. 2026',
      description: 'ประสบการณ์เชิงปฏิบัติในการสร้างตัวแทน AI โดยใช้ Agent Development Kit (ADK)',
      credentialUrl: '#',
      credentialId: 'JW8XNBEIIWKX',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '5',
      title: 'Create Your First Gemini Enterprise App',
      issuer: 'Google Cloud',
      date: 'พ.ค. 2026',
      description: 'Skill Badge สำหรับการพัฒนาแอปพลิเคชันระดับองค์กรโดยใช้โมเดล Gemini',
      credentialUrl: '#',
      credentialId: 'Skill Badge',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
      id: '6',
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud',
      date: 'พ.ค. 2026',
      description: 'ความเข้าใจพื้นฐานเกี่ยวกับหลักการของ Generative AI และเครื่องมือต่างๆ ของ Google Cloud',
      credentialUrl: '#',
      credentialId: 'CNHXVMDFGAR6',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    }
  ]
};`;

dataTs = dataTs.replace(
  /export const certifications: Record<'en' | 'th', CertificationItem\[\]> = \{[\s\S]*?\};\n/,
  newCertifications + '\n'
);

fs.writeFileSync('src/data.ts', dataTs, 'utf8');

// 2. Global replace Name, Roles, and Links
const replaceInFile = (file, replacements) => {
  if (fs.existsSync(file)) {
    let text = fs.readFileSync(file, 'utf8');
    let original = text;
    for (const {from, to} of replacements) {
      if (typeof from === 'string') {
        text = text.split(from).join(to);
      } else {
        text = text.replace(from, to);
      }
    }
    if (original !== text) {
      fs.writeFileSync(file, text, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
};

const components = [
  'src/components/PrintView.tsx',
  'src/components/CommandPalette.tsx',
  'src/components/ActivitySection.tsx',
  'src/components/Contact.tsx',
  'src/components/Hero.tsx',
  'src/components/ResumePreviewModal.tsx',
  'src/components/Navbar.tsx',
  'src/App.tsx'
];

for (const file of components) {
  replaceInFile(file, [
    { from: 'Nuttanan Portfolio', to: 'Nuttanan Foopun Portfolio' },
    { from: 'Nuttanan', to: 'Nuttanan Foopun' }, // General name replace
    { from: 'github.com/nuttanan', to: 'github.com/mhee572422' },
    { from: 'linkedin.com/in/nuttanan', to: 'linkedin.com/in/nuttanan-foopun-46s4906s' },
    { from: 'Professional Web Developer', to: 'Lead Systems Administrator & Architect' },
    { from: 'นักพัฒนาเว็บไซต์มืออาชีพ', to: 'ผู้ดูแลระบบอาวุโส และ สถาปนิกระบบ' },
    { from: 'professional web developer specializing in modern web applications, UI/UX design, and mobile app development.', to: 'Lead Systems Administrator / S-CODE Architect / Founder & Chief Architect at BTRU Logic Co., Ltd. / GSII.' },
    { from: 'นักพัฒนาเว็บไซต์มืออาชีพที่มีความเชี่ยวชาญด้านแอปพลิเคชันเว็บสมัยใหม่, การออกแบบ UI/UX และการพัฒนาแอปพลิเคชันมือถือ', to: 'Lead Systems Administrator / S-CODE Architect / Founder & Chief Architect ที่ BTRU Logic Co., Ltd. / GSII.' },
    // Also fix the name back to just Nuttanan in some places if needed, but let's keep Nuttanan Foopun.
  ]);
}

// Check Hero specifically for the title
let hero = fs.readFileSync('src/components/Hero.tsx', 'utf8');
hero = hero.replace('Full Stack Developer', 'Lead Systems Administrator & Architect');
hero = hero.replace('นักพัฒนาฟูลสแต็ก', 'ผู้ดูแลระบบอาวุโสและสถาปนิกระบบ');
hero = hero.replace('Web Developer', 'Systems Administrator');
hero = hero.replace('UI/UX Designer', 'S-CODE Architect');
hero = hero.replace('Mobile Developer', 'Chief Architect');
hero = hero.replace('A professional dedicated to building elegant, functional, and user-centric digital solutions.', 'Lead Systems Administrator / S-CODE Architect / Founder & Chief Architect at BTRU Logic Co., Ltd. / GSII.');
fs.writeFileSync('src/components/Hero.tsx', hero, 'utf8');

// Check PrintView specifically
let printView = fs.readFileSync('src/components/PrintView.tsx', 'utf8');
printView = printView.replace('Full Stack Web Developer', 'Lead Systems Administrator & Architect');
printView = printView.replace('Nuttanan Foopun_Professional_Resume.pdf', 'Nuttanan_Foopun_Resume.pdf');
fs.writeFileSync('src/components/PrintView.tsx', printView, 'utf8');

