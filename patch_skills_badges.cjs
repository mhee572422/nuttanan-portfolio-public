const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

const target1 = `{skill.name}
                                </button>
                                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest cursor-help">`;

const replace1 = `{skill.name}
                                </button>
                                {skill.isVerified && (
                                  <BadgeCheck size={14} className="text-[#C5A059]" title={language === 'en' ? 'Verified Skill' : 'ทักษะที่ผ่านการตรวจสอบ'} />
                                )}
                                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest cursor-help">`;

const target2 = `{skill.name}
                                </button>
                                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest">`;

const replace2 = `{skill.name}
                                </button>
                                {skill.isVerified && (
                                  <BadgeCheck size={14} className="text-[#C5A059]" title={language === 'en' ? 'Verified Skill' : 'ทักษะที่ผ่านการตรวจสอบ'} />
                                )}
                                <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 text-[8px] text-[#C5A059] rounded-sm tracking-widest">`;

code = code.replace(target1, replace1);
code = code.replace(target2, replace2);

fs.writeFileSync('src/components/Skills.tsx', code);
