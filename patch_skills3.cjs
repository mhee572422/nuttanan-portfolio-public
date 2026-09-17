const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

code = code.split('<BadgeCheck size={14} className="text-primary" title={language === \'en\' ? \'Verified Skill\' : \'ทักษะที่ผ่านการตรวจสอบ\'} />').join('<span title={language === "en" ? "Verified Skill" : "ทักษะที่ผ่านการตรวจสอบ"}><BadgeCheck size={14} className="text-primary" /></span>');

fs.writeFileSync('src/components/Skills.tsx', code);
