const fs = require('fs');
let content = fs.readFileSync('src/components/Skills.tsx', 'utf8');

const radialProgressCode = `
const RadialProgress = ({ proficiency, delay }: { proficiency: number, delay: number }) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
      <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
        />
        <motion.circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="#C5A059"
          strokeWidth="2"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - (proficiency / 100) * circumference }}
          transition={{ duration: 1.5, ease: "easeOut", delay }}
          viewport={{ once: true, margin: "-50px" }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[9px] font-mono text-white/60">{proficiency}%</span>
    </div>
  );
};

export default function Skills() {`;

content = content.replace("export default function Skills() {", radialProgressCode);


// Replace the first occurrence (category view)
const categoryBlockOld = `<div className="flex justify-between items-end text-[10px] uppercase tracking-wider text-white/80">
                              <div className="flex items-center gap-2">
                                <button
                                   onClick={() => handleCategoryClick(skill.name)}
                                  className="cursor-pointer hover:text-[#C5A059] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm"
                                >
                                  {skill.name}
                                </button>
                                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest cursor-help">
                                  {getProficiencyLabel(skill.proficiency, language)}
                                </span>
                              </div>
                              <span className="text-white/40 font-mono">{skill.proficiency}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                              <motion.div 
                                className="h-full bg-[#C5A059]"
                                initial={{ width: 0 }}
                                whileInView={{ width: \`\${skill.proficiency}%\` }}
                                transition={{ duration: 1, ease: "easeOut", delay: (idx * 0.1) + (skillIdx * 0.1) }}
                                viewport={{ once: true, margin: "-50px" }}
                              />
                            </div>`;

const categoryBlockNew = `<div className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                              <div className="flex items-center gap-4">
                                <RadialProgress proficiency={skill.proficiency} delay={(idx * 0.1) + (skillIdx * 0.1)} />
                                <div className="flex flex-col items-start gap-1">
                                  <button
                                     onClick={() => handleCategoryClick(skill.name)}
                                    className="cursor-pointer hover:text-[#C5A059] text-[11px] uppercase tracking-wider text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm"
                                  >
                                    {skill.name}
                                  </button>
                                  <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest cursor-help">
                                    {getProficiencyLabel(skill.proficiency, language)}
                                  </span>
                                </div>
                              </div>
                            </div>`;

content = content.replace(categoryBlockOld, categoryBlockNew);

// Replace the second occurrence (experience view)
const experienceBlockOld = `<div className="flex justify-between items-end text-[10px] uppercase tracking-wider text-white/80">
                              <div className="flex items-center gap-2">
                                <button
                                   onClick={() => handleCategoryClick(skill.name)}
                                  className="cursor-pointer hover:text-[#C5A059] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm"
                                >
                                  {skill.name}
                                </button>
                                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest">
                                  {skill.yearsOfExperience} {language === 'en' ? (skill.yearsOfExperience === 1 ? 'Year' : 'Years') : 'ปี'}
                                </span>
                              </div>
                              <span className="text-white/40 font-mono">{skill.proficiency}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                              <motion.div 
                                className="h-full bg-[#C5A059]"
                                initial={{ width: 0 }}
                                whileInView={{ width: \`\${skill.proficiency}%\` }}
                                transition={{ duration: 1, ease: "easeOut", delay: (idx * 0.1) + (skillIdx * 0.1) }}
                                viewport={{ once: true, margin: "-50px" }}
                              />
                            </div>`;

const experienceBlockNew = `<div className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                              <div className="flex items-center gap-4">
                                <RadialProgress proficiency={skill.proficiency} delay={(idx * 0.1) + (skillIdx * 0.1)} />
                                <div className="flex flex-col items-start gap-1">
                                  <button
                                     onClick={() => handleCategoryClick(skill.name)}
                                    className="cursor-pointer hover:text-[#C5A059] text-[11px] uppercase tracking-wider text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-sm"
                                  >
                                    {skill.name}
                                  </button>
                                  <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest cursor-help">
                                    {skill.yearsOfExperience} {language === 'en' ? (skill.yearsOfExperience === 1 ? 'Year' : 'Years') : 'ปี'}
                                  </span>
                                </div>
                              </div>
                            </div>`;

content = content.replace(experienceBlockOld, experienceBlockNew);


fs.writeFileSync('src/components/Skills.tsx', content);

