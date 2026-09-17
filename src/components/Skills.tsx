import { useState, useMemo, useEffect } from 'react';
import { Sparkles, BadgeCheck } from 'lucide-react';
import { skillCategories } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';


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
      <span className="absolute text-[9px] font-mono text-foreground/60">{proficiency}%</span>
    </div>
  );
};

export default function Skills() {
  const { language } = useLanguage();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'category' | 'experience'>('category');
  const [filterMode, setFilterMode] = useState<'all' | 'verified' | 'self'>('all');
  
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsAiLoading(true);
    
    fetch(`/api/skills-summary?language=${language}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          if (data.summary) {
            setAiSummary(data.summary);
          } else {
            setAiSummary(language === 'en' ? 'Unable to generate summary at this time.' : 'ไม่สามารถสร้างบทสรุปได้ในขณะนี้');
          }
          setIsAiLoading(false);
        }
      })
      .catch(err => {
        console.warn('Error fetching AI summary, using fallback UI');
        if (isMounted) setIsAiLoading(false);
      });
      
    return () => { isMounted = false; };
  }, [language]);

  const getProficiencyLabel = (score: number, lang: 'en' | 'th') => {
    if (score >= 90) return lang === 'en' ? 'Expert' : 'เชี่ยวชาญ';
    if (score >= 70) return lang === 'en' ? 'Intermediate' : 'ปานกลาง';
    return lang === 'en' ? 'Beginner' : 'เริ่มต้น';
  };

  
  const filteredSkillCategories = useMemo(() => {
    return skillCategories[language].map(category => {
      const filteredSkills = category.skills.filter(skill => {
        if (filterMode === 'all') return true;
        if (filterMode === 'verified') return skill.isVerified;
        if (filterMode === 'self') return !skill.isVerified;
        return true;
      });
      return { ...category, skills: filteredSkills };
    }).filter(category => category.skills.length > 0);
  }, [language, filterMode]);

  const radarData = useMemo(() => {
    return filteredSkillCategories.map(category => ({
      subject: category.title,
      score: Math.round(category.skills.reduce((acc, skill) => acc + skill.proficiency, 0) / category.skills.length),
      fullMark: 100
    }));
  }, [filteredSkillCategories, language]);

  const experienceGroups = useMemo(() => {
    const groups = [
      { id: '5plus', label: language === 'en' ? '5+ Years' : '5 ปีขึ้นไป', skills: [] as typeof skillCategories['en'][0]['skills'] },
      { id: '3to4', label: language === 'en' ? '3-4 Years' : '3-4 ปี', skills: [] as typeof skillCategories['en'][0]['skills'] },
      { id: '1to2', label: language === 'en' ? '1-2 Years' : '1-2 ปี', skills: [] as typeof skillCategories['en'][0]['skills'] }
    ];
    
    filteredSkillCategories.forEach(category => {
      category.skills.forEach(skill => {
        const yrs = skill.yearsOfExperience || 0;
        if (yrs >= 5) groups[0].skills.push(skill);
        else if (yrs >= 3) groups[1].skills.push(skill);
        else groups[2].skills.push(skill);
      });
    });
    
    groups.forEach(g => g.skills.sort((a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0) || b.proficiency - a.proficiency));
    return groups.filter(g => g.skills.length > 0);
  }, [filteredSkillCategories, language]);

  const handleCategoryClick = (categoryName: string) => {
    window.dispatchEvent(new CustomEvent('filter-projects', { detail: categoryName }));
  };

  const CustomTick = (props: any) => {
    const { payload, x, y, textAnchor, stroke, radius } = props;
    
    return (
      <g className="cursor-pointer" onClick={() => handleCategoryClick(payload.value)}>
        <text
          radius={radius}
          stroke={stroke}
          x={x}
          y={y}
          className="fill-foreground/60 text-[10px] hover:fill-[#C5A059] transition-colors"
          textAnchor={textAnchor}
        >
          <tspan x={x} dy="0em">
            {payload.value}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <section id="skills" className="py-24 px-6 sm:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6">
              {language === 'en' ? 'Expertise' : 'ความเชี่ยวชาญ'}
            </h2>
            <h2 className="text-3xl font-serif tracking-tight text-foreground mb-4 md:mb-0">
              {language === 'en' ? 'Skills & ' : 'ทักษะและ'}<span className="italic text-foreground/80">{language === 'en' ? 'Proficiency' : 'ความชำนาญ'}</span>
            </h2>
          </div>
          
          
          <div className="flex flex-col sm:flex-row gap-3 self-start md:self-end items-end sm:items-center">
            {/* Filter Toggle */}
            <div className="flex bg-surface p-1 rounded-full border border-foreground/10">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors ${
                  filterMode === 'all' ? 'bg-primary text-black font-bold' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {language === 'en' ? 'All' : 'ทั้งหมด'}
              </button>
              <button
                onClick={() => setFilterMode('verified')}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors ${
                  filterMode === 'verified' ? 'bg-primary text-black font-bold' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {language === 'en' ? 'Verified' : 'ตรวจสอบแล้ว'}
              </button>
              <button
                onClick={() => setFilterMode('self')}
                className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors ${
                  filterMode === 'self' ? 'bg-primary text-black font-bold' : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {language === 'en' ? 'Self-Assessed' : 'ประเมินตนเอง'}
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-surface p-1 rounded-full border border-foreground/10">
            <button
              onClick={() => setViewMode('category')}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors ${
                viewMode === 'category' ? 'bg-foreground text-background font-bold' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {language === 'en' ? 'By Category' : 'ตามหมวดหมู่'}
            </button>
            <button
              onClick={() => setViewMode('experience')}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-colors ${
                viewMode === 'experience' ? 'bg-foreground text-background font-bold' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {language === 'en' ? 'By Experience' : 'ตามประสบการณ์'}
            </button>
          </div>
          </div>
        </div>
        
        {/* AI Summary Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 p-6 bg-gradient-to-br from-surface to-surface-alt border border-foreground/10 rounded-lg relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-2 bg-primary/10 rounded-md shrink-0">
              <Sparkles size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-[10px] text-primary uppercase tracking-[0.2em] mb-2 font-bold flex items-center gap-2">
                {language === 'en' ? 'AI Competency Analysis' : 'บทวิเคราะห์ความสามารถโดย AI'}
              </h3>
              {isAiLoading ? (
                <div className="animate-pulse flex flex-col gap-2 w-full mt-2">
                  <div className="h-3 bg-foreground/10 rounded w-full"></div>
                  <div className="h-3 bg-foreground/10 rounded w-4/5"></div>
                </div>
              ) : (
                <p className="text-sm text-foreground/80 leading-relaxed font-sans border-l-2 border-foreground/5 pl-4 ml-1 italic">
                  "{aiSummary}"
                </p>
              )}
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-1/3 aspect-square max-w-sm mx-auto bg-[#141414] border border-foreground/5 p-4 rounded-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={<CustomTick />}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar 
                  name="Proficiency" 
                  dataKey="score" 
                  stroke="#C5A059" 
                  fill="#C5A059" 
                  fillOpacity={0.3} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#C5A059' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence mode="wait">
              {viewMode === 'category' ? (
                <motion.div 
                  key="category-view" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                  {filteredSkillCategories.map((category, idx) => (
                    <motion.div 
                      key={category.id} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <button 
                        onClick={() => handleCategoryClick(category.title)}
                        className="text-xs font-serif italic text-primary mb-6 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm text-left"
                      >
                        {category.title}
                      </button>
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIdx) => (
                          <div 
                            key={skill.name} 
                            className="space-y-2 relative group"
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex justify-between items-end text-[10px] uppercase tracking-wider text-foreground/80">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleCategoryClick(skill.name)}
                                  className="cursor-pointer hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                                >
                                  {skill.name}
                                </button>
                                {skill.isVerified && (
                                  <span title={language === "en" ? "Verified Skill" : "ทักษะที่ผ่านการตรวจสอบ"}><BadgeCheck size={14} className="text-primary" /></span>
                                )}
                                <span className="px-1.5 py-0.5 bg-foreground/5 border border-foreground/10 text-[8px] text-primary rounded-sm tracking-widest cursor-help">
                                  {getProficiencyLabel(skill.proficiency, language)}
                                </span>
                              </div>
                              <span className="text-foreground/40 font-mono">{skill.proficiency}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-foreground/5 overflow-hidden">
                              <motion.div 
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: (idx * 0.1) + (skillIdx * 0.1) }}
                                viewport={{ once: true, margin: "-50px" }}
                              />
                            </div>
                            
                            <AnimatePresence>
                              {skill.description && hoveredSkill === skill.name && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 bottom-full mb-3 z-10 w-full sm:w-64 pointer-events-none"
                                >
                                  <div className="bg-surface border border-foreground/10 text-gray-300 text-[10px] sm:text-xs leading-relaxed p-3 shadow-xl relative">
                                    {skill.description}
                                    <div className="absolute -bottom-[5px] left-4 w-2 h-2 bg-surface border-b border-r border-foreground/10 transform rotate-45" />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="experience-view" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                  {experienceGroups.map((group, idx) => (
                    <motion.div 
                      key={group.id} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <h3 className="text-xs font-serif italic text-primary mb-6">{group.label}</h3>
                      <div className="space-y-4">
                        {group.skills.map((skill, skillIdx) => (
                          <div 
                            key={skill.name} 
                            className="space-y-2 relative group"
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                          >
                            <div className="flex justify-between items-end text-[10px] uppercase tracking-wider text-foreground/80">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleCategoryClick(skill.name)}
                                  className="cursor-pointer hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                                >
                                  {skill.name}
                                </button>
                                {skill.isVerified && (
                                  <span title={language === "en" ? "Verified Skill" : "ทักษะที่ผ่านการตรวจสอบ"}><BadgeCheck size={14} className="text-primary" /></span>
                                )}
                                <span className="px-1.5 py-0.5 bg-foreground/5 border border-foreground/10 text-[8px] text-primary rounded-sm tracking-widest">
                                  {skill.yearsOfExperience} {language === 'en' ? (skill.yearsOfExperience === 1 ? 'Year' : 'Years') : 'ปี'}
                                </span>
                              </div>
                              <span className="text-foreground/40 font-mono">{skill.proficiency}%</span>
                            </div>
                            <div className="h-[2px] w-full bg-foreground/5 overflow-hidden">
                              <motion.div 
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.proficiency}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: (idx * 0.1) + (skillIdx * 0.1) }}
                                viewport={{ once: true, margin: "-50px" }}
                              />
                            </div>
                            
                            <AnimatePresence>
                              {skill.description && hoveredSkill === skill.name && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="absolute left-0 bottom-full mb-3 z-10 w-full sm:w-64 pointer-events-none"
                                >
                                  <div className="bg-surface border border-foreground/10 text-gray-300 text-[10px] sm:text-xs leading-relaxed p-3 shadow-xl relative">
                                    {skill.description}
                                    <div className="absolute -bottom-[5px] left-4 w-2 h-2 bg-surface border-b border-r border-foreground/10 transform rotate-45" />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
