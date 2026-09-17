const fs = require('fs');
let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const oldNavLinks = `  const navLinks = [
    { name: language === 'th' ? 'หน้าแรก' : 'Home', href: '#home' },
    { name: language === 'th' ? 'เกี่ยวกับ' : 'About', href: '#about' },
    { name: language === 'th' ? 'ทักษะ' : 'Skills', href: '#skills' },
    { name: language === 'th' ? 'ประสบการณ์' : 'Experience', href: '#experience' },
    { name: language === 'th' ? 'ผลงาน' : 'Projects', href: '#projects' },
    { name: language === 'th' ? 'รีวิว' : 'Reviews', href: '#testimonials' },
    { name: language === 'th' ? 'ติดต่อ' : 'Contact', href: '#contact' },
  ];`;

const newNavLinks = `  const navLinks = [
    { 
      name: language === 'th' ? 'หน้าแรก' : 'Home', 
      href: '#home',
      desc: language === 'th' ? 'กลับสู่หน้าเริ่มต้น' : 'Back to top'
    },
    { 
      name: language === 'th' ? 'เกี่ยวกับ' : 'About', 
      href: '#about',
      desc: language === 'th' ? 'ประวัติส่วนตัวและแนวคิด' : 'My background & philosophy'
    },
    { 
      name: language === 'th' ? 'ทักษะ' : 'Skills', 
      href: '#skills',
      desc: language === 'th' ? 'ความเชี่ยวชาญทางเทคนิค' : 'Technical expertise'
    },
    { 
      name: language === 'th' ? 'ประสบการณ์' : 'Experience', 
      href: '#experience',
      desc: language === 'th' ? 'ประวัติการทำงานที่ผ่านมา' : 'Work history & roles'
    },
    { 
      name: language === 'th' ? 'ผลงาน' : 'Projects', 
      href: '#projects',
      desc: language === 'th' ? 'เคสสตาดีและโปรเจกต์' : 'Case studies & work'
    },
    { 
      name: language === 'th' ? 'รีวิว' : 'Reviews', 
      href: '#testimonials',
      desc: language === 'th' ? 'คำชมจากผู้ร่วมงาน' : 'Client & peer feedback'
    },
    { 
      name: language === 'th' ? 'ติดต่อ' : 'Contact', 
      href: '#contact',
      desc: language === 'th' ? 'ช่องทางการติดต่อ' : 'Get in touch with me'
    },
  ];`;

content = content.replace(oldNavLinks, newNavLinks);

const oldDesktopNavMap = `{navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm">
              {link.name}
            </a>
          ))}`;

const newDesktopNavMap = `{navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <a 
                href={link.href} 
                className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm py-2 block"
                aria-label={\`\${link.name}: \${link.desc}\`}
                title="" // Override default tooltip
              >
                {link.name}
              </a>
              {/* Tooltip */}
              <div 
                role="tooltip"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#1A1A1A] border border-white/10 rounded-md text-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none w-max z-50 shadow-xl transform translate-y-1 group-hover:translate-y-0"
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1A1A1A] border-l border-t border-white/10 rotate-45"></div>
                <p className="relative z-10 text-[11px] text-white/90 font-sans tracking-wide whitespace-nowrap">{link.desc}</p>
              </div>
            </div>
          ))}`;

content = content.replace(oldDesktopNavMap, newDesktopNavMap);

fs.writeFileSync('src/components/Navbar.tsx', content, 'utf8');
