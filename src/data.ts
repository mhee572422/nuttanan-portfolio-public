
export const skillCategories: Record<'en' | 'th', SkillCategory[]> = {
  en: [
    {
      id: 'cloud',
      title: 'Cloud & Enterprise Infrastructure',
      skills: [
        { name: 'GCP / GKE', isVerified: true, proficiency: 95, yearsOfExperience: 5, description: 'Expertise in Google Cloud Platform, Kubernetes Engine, and Cloud Run architectures.' },
        { name: 'Hybrid/Multi-Cloud', proficiency: 85, yearsOfExperience: 4, description: 'Designing distributed data structures into multi-cloud architectures.' },
        { name: 'VPC & IAM Security', proficiency: 90, yearsOfExperience: 5, description: 'Implementing enterprise-grade cloud environments leveraging PSC and hierarchical firewalls.' }
      ]
    },
    {
      id: 'ai',
      title: 'AI & Agentic Frameworks',
      skills: [
        { name: 'Gemini Enterprise', isVerified: true, proficiency: 90, yearsOfExperience: 2, description: 'Developing Gemini Enterprise Applications and structural-logic AI.' },
        { name: 'Agent Development Kit', proficiency: 95, yearsOfExperience: 2, description: 'Building robust multi-agent orchestration frameworks using ADK and Model Context Protocol.' },
        { name: 'Vertex AI Agent Engine', isVerified: true, proficiency: 85, yearsOfExperience: 2, description: 'Implementing AI agent pipelines for real-time anomaly detection.' }
      ]
    },
    {
      id: 'data',
      title: 'Data Architecture',
      skills: [
        { name: 'BigQuery / PubSub', isVerified: true, proficiency: 85, yearsOfExperience: 4, description: 'Designing autonomous data pipelines with continuous queries and message transforms.' },
        { name: 'Event-Driven Arch', proficiency: 90, yearsOfExperience: 5, description: 'Architecting scalable event-driven solutions and real-time data pipelines.' }
      ]
    },
    {
      id: 'software',
      title: 'Software Engineering',
      skills: [
        { name: 'Python / FastAPI', isVerified: true, proficiency: 95, yearsOfExperience: 5, description: 'Backend development, automated technical ecosystems, and API design.' },
        { name: 'Docker / Linux', isVerified: true, proficiency: 90, yearsOfExperience: 5, description: 'Containerization, authorized Linux environments, and CI/CD pipelines.' }
      ]
    }
  ],
  th: [
    {
      id: 'cloud',
      title: 'ระบบคลาวด์และโครงสร้างพื้นฐาน',
      skills: [
        { name: 'GCP / GKE', isVerified: true, proficiency: 95, yearsOfExperience: 5, description: 'ความเชี่ยวชาญด้าน Google Cloud Platform, Kubernetes Engine และสถาปัตยกรรม Cloud Run' },
        { name: 'Hybrid/Multi-Cloud', proficiency: 85, yearsOfExperience: 4, description: 'การออกแบบโครงสร้างข้อมูลแบบกระจายสำหรับสถาปัตยกรรมมัลติคลาวด์' },
        { name: 'VPC & IAM Security', proficiency: 90, yearsOfExperience: 5, description: 'การวางระบบคลาวด์ระดับองค์กรด้วย PSC และนโยบายไฟร์วอลล์ตามลำดับชั้น' }
      ]
    },
    {
      id: 'ai',
      title: 'AI และระบบเอเจนต์',
      skills: [
        { name: 'Gemini Enterprise', isVerified: true, proficiency: 90, yearsOfExperience: 2, description: 'การพัฒนาแอปพลิเคชันระดับองค์กรด้วย Gemini และ AI เชิงโครงสร้างตรรกะ' },
        { name: 'Agent Development Kit', proficiency: 95, yearsOfExperience: 2, description: 'การสร้างโครงสร้างการจัดการเอเจนต์แบบหลายตัว (Multi-agent) ด้วย ADK และ MCP' },
        { name: 'Vertex AI Agent Engine', isVerified: true, proficiency: 85, yearsOfExperience: 2, description: 'การสร้างไปป์ไลน์ AI เอเจนต์สำหรับการตรวจจับความผิดปกติแบบเรียลไทม์' }
      ]
    },
    {
      id: 'data',
      title: 'สถาปัตยกรรมข้อมูล',
      skills: [
        { name: 'BigQuery / PubSub', isVerified: true, proficiency: 85, yearsOfExperience: 4, description: 'การออกแบบไปป์ไลน์ข้อมูลอัตโนมัติด้วยคำสั่งสืบค้นต่อเนื่องและการแปลงข้อความ' },
        { name: 'Event-Driven Arch', proficiency: 90, yearsOfExperience: 5, description: 'การออกแบบสถาปัตยกรรมที่ขับเคลื่อนด้วยเหตุการณ์ที่รองรับการขยายตัวและไปป์ไลน์ข้อมูลแบบเรียลไทม์' }
      ]
    },
    {
      id: 'software',
      title: 'วิศวกรรมซอฟต์แวร์',
      skills: [
        { name: 'Python / FastAPI', isVerified: true, proficiency: 95, yearsOfExperience: 5, description: 'การพัฒนาแบคเอนด์, ระบบเทคโนโลยีอัตโนมัติ, และการออกแบบ API' },
        { name: 'Docker / Linux', isVerified: true, proficiency: 90, yearsOfExperience: 5, description: 'การจัดการคอนเทนเนอร์, สภาพแวดล้อม Linux, และไปป์ไลน์ CI/CD' }
      ]
    }
  ]
};





export const testimonials: Record<'en' | 'th', TestimonialItem[]> = {
  en: [
    {
      id: '1',
      name: 'John Doe',
      role: 'CEO',
      company: 'Startup Inc',
      content: 'Great developer!'
    }
  ],
  th: [
    {
      id: '1',
      name: 'John Doe',
      role: 'ซีอีโอ',
      company: 'Startup Inc',
      content: 'นักพัฒนาที่ยอดเยี่ยมมาก!'
    }
  ]
};

import { ExperienceItem, ProjectItem, TestimonialItem, SkillCategory, CertificationItem } from './types';

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

export const experiences: Record<'en' | 'th', ExperienceItem[]> = {
  en: [
    {
      id: '1',
      role: 'Senior Developer',
      company: 'Tech Corp',
      period: '2023 - Present',
      description: 'Led the development of scalable web applications. Improved system performance by 40% and mentored junior developers in modern frontend practices.',
      accomplishments: [
        'Architected a micro-frontend structure that reduced load times by 40%.',
        'Mentored a team of 5 junior developers, improving overall team velocity by 25%.',
        'Implemented CI/CD pipelines that reduced deployment times from hours to minutes.'
      ]
    },
    {
      id: '2',
      role: 'Full Stack Engineer',
      company: 'Digital Solutions',
      period: '2020 - 2023',
      description: 'Developed and maintained various client projects. Collaborated closely with designers to implement pixel-perfect user interfaces and robust APIs.',
      accomplishments: [
        'Built a custom headless CMS using Node.js and PostgreSQL for 10+ clients.',
        'Integrated third-party payment gateways like Stripe and PayPal processing over $50k monthly.',
        'Ensured WCAG 2.1 AA accessibility compliance across all major client websites.'
      ]
    },
    {
      id: '3',
      role: 'Frontend Developer',
      company: 'Creative Agency',
      period: '2018 - 2020',
      description: 'Created responsive and interactive user interfaces for e-commerce and portfolio websites using modern web technologies.',
      accomplishments: [
        'Developed 20+ responsive marketing websites using React and Tailwind CSS.',
        'Optimized images and assets, improving average Lighthouse scores to 95+.',
        'Collaborated with designers using Figma to deliver pixel-perfect UI components.'
      ]
    }
  ],
  th: [
    {
      id: '1',
      role: 'นักพัฒนาอาวุโส',
      company: 'Tech Corp',
      period: '2566 - ปัจจุบัน',
      description: 'นำทีมพัฒนาเว็บแอปพลิเคชันที่รองรับการขยายตัว เพิ่มประสิทธิภาพระบบ 40% และให้คำแนะนำนักพัฒนารุ่นน้องในด้านการพัฒนาฟรอนต์เอนด์',
      accomplishments: [
        'ออกแบบโครงสร้าง micro-frontend ที่ช่วยลดเวลาในการโหลดหน้าเว็บได้ถึง 40%',
        'เป็นที่ปรึกษาและดูแลทีมพัฒนารุ่นน้อง 5 คน ช่วยเพิ่มความเร็วในการทำงานของทีมโดยรวม 25%',
        'วางระบบ CI/CD pipelines ที่ช่วยลดระยะเวลาในการนำระบบขึ้นใช้งานจริง (Deployment) จากหลักชั่วโมงเหลือเพียงไม่กี่นาที'
      ]
    },
    {
      id: '2',
      role: 'วิศวกรฟูลสแต็ก',
      company: 'Digital Solutions',
      period: '2563 - 2566',
      description: 'พัฒนาและดูแลโปรเจกต์ลูกค้าหลากหลาย ทำงานร่วมกับนักออกแบบอย่างใกล้ชิดเพื่อสร้าง UI ที่สมบูรณ์แบบและ API ที่แข็งแกร่ง',
      accomplishments: [
        'สร้าง headless CMS ด้วย Node.js และ PostgreSQL สำหรับลูกค้ามากกว่า 10 ราย',
        'เชื่อมต่อระบบชำระเงิน third-party เช่น Stripe และ PayPal ที่มีการทำธุรกรรมมากกว่า 50,000 ดอลลาร์ต่อเดือน',
        'พัฒนาเว็บไซต์ลูกค้าให้รองรับมาตรฐานการเข้าถึง WCAG 2.1 AA'
      ]
    },
    {
      id: '3',
      role: 'นักพัฒนาฟรอนต์เอนด์',
      company: 'Creative Agency',
      period: '2561 - 2563',
      description: 'สร้างส่วนติดต่อผู้ใช้ที่ตอบสนองและโต้ตอบได้สำหรับอีคอมเมิร์ซและเว็บไซต์พอร์ตโฟลิโอด้วยเทคโนโลยีเว็บสมัยใหม่',
      accomplishments: [
        'พัฒนาเว็บไซต์การตลาดแบบ Responsive มากกว่า 20 โปรเจกต์โดยใช้ React และ Tailwind CSS',
        'ปรับแต่งรูปภาพและแอสเซท (Assets) เพื่อเพิ่มคะแนน Lighthouse เฉลี่ยให้สูงกว่า 95',
        'ประสานงานร่วมกับนักออกแบบบน Figma เพื่อสร้าง UI Component ที่ถูกต้องแม่นยำระดับพิกเซล'
      ]
    }
  ]
};

export const projects: Record<'en' | 'th', ProjectItem[]> = {
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
      challenges: 'Handling real-time inventory sync across multiple concurrent checkouts without overselling. We solved this by implementing Redis-based distributed locks and a robust message queue.',
      technicalSpecs: ['Microservices architecture', 'Redis caching layer', '99.9% Uptime SLA', '<200ms API response time'],
      gallery: [
        'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800'
      ],
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
      challenges: 'การจัดการสต็อกสินค้าแบบเรียลไทม์เมื่อมีผู้สั่งซื้อพร้อมกันจำนวนมากเพื่อป้องกันการขายสินค้าที่ไม่มีอยู่จริง เราแก้ปัญหานี้โดยใช้ระบบล็อคแบบกระจายตัวด้วย Redis และคิวข้อความที่เสถียร',
      technicalSpecs: ['สถาปัตยกรรม Microservices', 'ระบบแคชด้วย Redis', 'รับประกัน Uptime 99.9%', 'ความเร็ว API <200ms'],
      gallery: [
        'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800'
      ],
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
};
