const fs = require('fs');

const dataTsPath = './src/data.ts';
let content = fs.readFileSync(dataTsPath, 'utf8');

const regex = /export const projects: Record<'en' | 'th', ProjectItem\[\]> = \{[\s\S]*?\]\n\};/;

const newProjects = `export const projects: Record<'en' | 'th', ProjectItem[]> = {
  en: [
    {
      id: '1',
      title: 'E-commerce Platform',
      category: 'Web Development',
      categoryId: 'web',
      description: 'A modern e-commerce solution with real-time inventory management and seamless checkout process.',
      detailedDescription: 'This full-stack e-commerce platform was built to handle high traffic volumes and complex inventory logic. It features a custom-built cart system, seamless Stripe integration for payments, and a powerful admin dashboard for product management. The architecture ensures fast load times and a smooth user experience across all devices.',
      imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
      demoUrl: '#',
      githubUrl: '#',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      year: '2023',
      isFeatured: true,
      milestones: [
        { phase: 'Planning', date: 'Jan 2023', description: 'Requirements gathering and architecture design.' },
        { phase: 'Development', date: 'Feb - Apr 2023', description: 'Built core features including custom cart and payment integration.' },
        { phase: 'Launch', date: 'May 2023', description: 'Successful deployment and initial user onboarding.' }
      ]
    },
    {
      id: '2',
      title: 'Financial Dashboard',
      category: 'UI/UX Design',
      categoryId: 'design',
      description: 'An intuitive dashboard for tracking personal finances and investment portfolios with interactive charts.',
      detailedDescription: 'Designed and developed a comprehensive financial dashboard aimed at simplifying complex data. The project involved extensive user research to understand pain points in tracking investments. The result is a clean, data-rich interface with interactive D3.js charts that allow users to drill down into their financial habits.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      demoUrl: '#',
      githubUrl: '#',
      techStack: ['Figma', 'React', 'D3.js', 'Tailwind CSS'],
      year: '2023',
      isFeatured: true,
      milestones: [
        { phase: 'Research', date: 'Jun 2023', description: 'User interviews and pain-point analysis.' },
        { phase: 'Design', date: 'Jul 2023', description: 'UI/UX prototyping in Figma.' },
        { phase: 'Implementation', date: 'Aug - Sep 2023', description: 'Frontend development and data visualization.' }
      ]
    },
    {
      id: '3',
      title: 'Social App Concept',
      category: 'Mobile App',
      categoryId: 'mobile',
      description: 'A conceptual design for a community-driven social networking application focusing on local events.',
      detailedDescription: 'This mobile application concept bridges the gap between digital interaction and real-world community building. The app allows users to discover, join, and organize local events based on their interests. Built with React Native, it features real-time chat, location-based event discovery, and a seamless onboarding experience.',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      demoUrl: '#',
      githubUrl: '#',
      techStack: ['React Native', 'Firebase', 'GraphQL'],
      year: '2022',
      isFeatured: true
    },
    {
      id: '4',
      title: 'Corporate Website',
      category: 'Web Development',
      categoryId: 'web',
      description: 'A professional corporate website redesign to improve brand presence and lead generation.',
      detailedDescription: 'Spearheaded the redesign and development of a corporate website for a leading tech consulting firm. The new site leverages Next.js for server-side rendering, drastically improving SEO and performance. We integrated a headless CMS to empower the marketing team to easily update content without developer intervention.',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      demoUrl: '#',
      githubUrl: '#',
      techStack: ['Next.js', 'TypeScript', 'CMS'],
      year: '2022',
      isFeatured: false
    },
    {
      id: '5',
      title: 'Legacy CRM System',
      category: 'Web Development',
      categoryId: 'web',
      description: 'Internal customer relationship management system built for a local agency.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      techStack: ['Vue.js', 'Express', 'MongoDB'],
      year: '2021',
      isFeatured: false
    },
    {
      id: '6',
      title: 'Food Delivery Prototype',
      category: 'UI/UX Design',
      categoryId: 'design',
      description: 'Interactive high-fidelity prototype for a food delivery application.',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
      techStack: ['Figma', 'Framer'],
      year: '2020',
      isFeatured: false
    }
  ],
  th: [
    {
      id: '1',
      title: 'แพลตฟอร์มอีคอมเมิร์ซ',
      category: 'การพัฒนาเว็บไซต์',
      categoryId: 'web',
      description: 'โซลูชันอีคอมเมิร์ซสมัยใหม่พร้อมระบบจัดการสินค้าคงคลังแบบเรียลไทม์และขั้นตอนการชำระเงินที่ราบรื่น',
      detailedDescription: 'แพลตฟอร์มอีคอมเมิร์ซเต็มรูปแบบนี้สร้างขึ้นเพื่อรองรับปริมาณการเข้าชมที่สูงและตรรกะสินค้าคงคลังที่ซับซ้อน มีระบบตะกร้าสินค้าที่สร้างขึ้นเอง การรวม Stripe ที่ราบรื่นสำหรับการชำระเงิน และแดชบอร์ดผู้ดูแลระบบที่มีประสิทธิภาพสำหรับการจัดการผลิตภัณฑ์ สถาปัตยกรรมช่วยให้โหลดได้เร็วและประสบการณ์ผู้ใช้ที่ราบรื่นในทุกอุปกรณ์',
      imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
      demoUrl: '#',
      githubUrl: '#',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      year: '2023',
      isFeatured: true,
      milestones: [
        { phase: 'การวางแผน', date: 'ม.ค. 2023', description: 'การรวบรวมความต้องการและการออกแบบสถาปัตยกรรม' },
        { phase: 'การพัฒนา', date: 'ก.พ. - เม.ย. 2023', description: 'สร้างคุณสมบัติหลักรวมถึงรถเข็นที่กำหนดเองและการรวมการชำระเงิน' },
        { phase: 'การเปิดตัว', date: 'พ.ค. 2023', description: 'การใช้งานที่ประสบความสำเร็จและการเริ่มต้นผู้ใช้เบื้องต้น' }
      ]
    },
    {
      id: '2',
      title: 'แดชบอร์ดการเงิน',
      category: 'การออกแบบ UI/UX',
      categoryId: 'design',
      description: 'แดชบอร์ดที่ใช้งานง่ายสำหรับการติดตามการเงินส่วนบุคคลและพอร์ตการลงทุนพร้อมแผนภูมิแบบโต้ตอบ',
      detailedDescription: 'ออกแบบและพัฒนาแดชบอร์ดทางการเงินที่ครอบคลุมโดยมีจุดประสงค์เพื่อลดความซับซ้อนของข้อมูล โปรเจกต์นี้เกี่ยวข้องกับการวิจัยผู้ใช้อย่างกว้างขวางเพื่อทำความเข้าใจจุดเจ็บปวดในการติดตามการลงทุน ผลลัพธ์ที่ได้คืออินเทอร์เฟซที่สะอาดตาและเต็มไปด้วยข้อมูลพร้อมแผนภูมิ D3.js แบบโต้ตอบที่ให้ผู้ใช้เจาะลึกพฤติกรรมทางการเงินของตนได้',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      demoUrl: '#',
      githubUrl: '#',
      techStack: ['Figma', 'React', 'D3.js', 'Tailwind CSS'],
      year: '2023',
      isFeatured: true,
      milestones: [
        { phase: 'การวิจัย', date: 'มิ.ย. 2023', description: 'การสัมภาษณ์ผู้ใช้และการวิเคราะห์จุดบกพร่อง' },
        { phase: 'การออกแบบ', date: 'ก.ค. 2023', description: 'การสร้างต้นแบบ UI/UX ใน Figma' },
        { phase: 'การดำเนินการ', date: 'ส.ค. - ก.ย. 2023', description: 'การพัฒนาส่วนหน้าและการแสดงข้อมูล' }
      ]
    },
    {
      id: '3',
      title: 'คอนเซปต์แอปพลิเคชันโซเชียล',
      category: 'แอปพลิเคชันมือถือ',
      categoryId: 'mobile',
      description: 'การออกแบบเชิงแนวคิดสำหรับแอปพลิเคชันโซเชียลเน็ตเวิร์กที่ขับเคลื่อนโดยชุมชนโดยเน้นกิจกรรมในท้องถิ่น',
      imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
      techStack: ['React Native', 'Firebase', 'GraphQL'],
      year: '2022',
      isFeatured: true
    },
    {
      id: '4',
      title: 'เว็บไซต์องค์กร',
      category: 'การพัฒนาเว็บไซต์',
      categoryId: 'web',
      description: 'การออกแบบเว็บไซต์องค์กรระดับมืออาชีพใหม่เพื่อปรับปรุงภาพลักษณ์ของแบรนด์และการสร้างโอกาสในการขาย',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      techStack: ['Next.js', 'TypeScript', 'CMS'],
      year: '2022',
      isFeatured: false
    },
    {
      id: '5',
      title: 'ระบบ CRM รุ่นเก่า',
      category: 'การพัฒนาเว็บไซต์',
      categoryId: 'web',
      description: 'ระบบจัดการความสัมพันธ์ลูกค้าภายในสร้างขึ้นสำหรับเอเจนซี่ในพื้นที่',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
      techStack: ['Vue.js', 'Express', 'MongoDB'],
      year: '2021',
      isFeatured: false
    },
    {
      id: '6',
      title: 'ต้นแบบการจัดส่งอาหาร',
      category: 'การออกแบบ UI/UX',
      categoryId: 'design',
      description: 'ต้นแบบเชิงโต้ตอบความละเอียดสูงสำหรับแอปพลิเคชันจัดส่งอาหาร',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
      techStack: ['Figma', 'Framer'],
      year: '2020',
      isFeatured: false
    }
  ]
};`;

content = content.replace(regex, newProjects);
fs.writeFileSync(dataTsPath, content, 'utf8');
console.log('Done replacing projects array.');
