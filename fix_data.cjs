const fs = require('fs');

let dataTs = fs.readFileSync('src/data.ts', 'utf8');

// The file has a duplicate export because of my previous bad regex.
// I'll rebuild the file safely. 
// I'll find "export const experiences" and cut everything before it up to the imports,
// then inject the clean certifications array.

const importLine = "import { ExperienceItem, ProjectItem, TestimonialItem, SkillCategory, CertificationItem } from './types';";

const certBlock = `
export const certifications: Record<'en' | 'th', CertificationItem[]> = {
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
};
`;

const firstPart = dataTs.substring(0, dataTs.indexOf(importLine) + importLine.length);
const secondPart = dataTs.substring(dataTs.indexOf("export const experiences"));

fs.writeFileSync('src/data.ts', firstPart + '\n' + certBlock + '\n' + secondPart, 'utf8');

