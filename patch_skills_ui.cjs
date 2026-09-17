const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

// Replace Toggle Group
const oldToggles = `<div className="flex bg-[#1A1A1A] p-1 rounded-full border border-white/10 self-start md:self-end">`;
const newToggles = `
          <div className="flex flex-col sm:flex-row gap-3 self-start md:self-end items-end sm:items-center">
            {/* Filter Toggle */}
            <div className="flex bg-[#1A1A1A] p-1 rounded-full border border-white/10">
              <button
                onClick={() => setFilterMode('all')}
                className={\`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors \${
                  filterMode === 'all' ? 'bg-[#C5A059] text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                {language === 'en' ? 'All' : 'ทั้งหมด'}
              </button>
              <button
                onClick={() => setFilterMode('verified')}
                className={\`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors \${
                  filterMode === 'verified' ? 'bg-[#C5A059] text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                {language === 'en' ? 'Verified' : 'ตรวจสอบแล้ว'}
              </button>
              <button
                onClick={() => setFilterMode('self')}
                className={\`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors \${
                  filterMode === 'self' ? 'bg-[#C5A059] text-black font-bold' : 'text-white/60 hover:text-white'
                }\`}
              >
                {language === 'en' ? 'Self-Assessed' : 'ประเมินตนเอง'}
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-[#1A1A1A] p-1 rounded-full border border-white/10">`;
code = code.replace(oldToggles, newToggles);

// Add BadgeCheck
const oldSkillButton1 = `{skill.name}
                                  </button>`;
const newSkillButton1 = `{skill.name}
                                  </button>
                                  {skill.isVerified && (
                                    <BadgeCheck size={14} className="text-[#C5A059]" title={language === 'en' ? 'Verified Skill' : 'ทักษะที่ผ่านการตรวจสอบ'} />
                                  )}`;
// We might have to replace it twice (once for category view, once for experience view)
// Let's use string replace (which replaces first) and then loop or regex
code = code.split(oldSkillButton1).join(newSkillButton1);

// But wait, the previous code used:
// <button onClick={() => handleCategoryClick(skill.name)} className="..."> {skill.name} </button>
fs.writeFileSync('src/components/Skills.tsx', code);
