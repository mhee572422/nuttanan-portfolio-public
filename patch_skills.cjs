const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

code = code.replace(
  /<BadgeCheck size={14} className="text-primary" title={language === 'en' \? 'Verified Skill' : 'ทักษะที่ผ่านการตรวจสอบ'} \/>/g,
  '<span title={language === "en" ? "Verified Skill" : "ทักษะที่ผ่านการตรวจสอบ"}><BadgeCheck size={14} className="text-primary" /></span>'
);

fs.writeFileSync('src/components/Skills.tsx', code);
