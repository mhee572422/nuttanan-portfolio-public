import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { projects } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Search, X, Github, Clock, Code, Folder, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';
import ProjectTimeline from './ProjectTimeline';
import TechBadge from './TechBadge';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ProjectItem } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';
import { QRCodeSVG } from 'qrcode.react';

const getReadingTime = (project: ProjectItem, lang: string) => {
  // Aggregate all text content from the project for a more accurate reading time
  const texts = [
    project.detailedDescription || project.description,
    project.challenges || '',
    ...(project.technicalSpecs || []),
    ...(project.milestones ? project.milestones.map(m => `${m.phase} ${m.description}`) : [])
  ];
  
  const fullText = texts.join(' ');
  // Calculate word count (splitting by whitespace)
  const wordCount = fullText.split(/\s+/).filter(w => w.trim().length > 0).length;
  // Average reading speed: 200 words per minute
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return lang === 'en' ? `${minutes} min read` : `อ่าน ${minutes} นาที`;
};


const CustomTimelineTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-surface border border-primary/30 p-4 rounded-md shadow-2xl max-w-[250px]">
        <p className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1">{data.name}</p>
        <p className="text-foreground/40 text-[10px] font-mono mb-2">{data.date}</p>
        <p className="text-foreground/80 text-xs leading-relaxed">{data.description}</p>
      </div>
    );
  }
  return null;
};

export default function Portfolio() {
  const { language } = useLanguage();
  const { trackEvent } = useAnalytics();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<'featured' | 'archive'>('featured');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate fetching project data / initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setActiveImageIndex(0);
      setLightboxOpen(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    setImageLoaded(false);
    if (lightboxOpen && selectedProject) {
      const images = [selectedProject.imageUrl, ...(selectedProject.gallery || [])];
      
      // Preload current, next, and prev
      const indexesToPreload = [
        activeImageIndex,
        (activeImageIndex + 1) % images.length,
        (activeImageIndex - 1 + images.length) % images.length
      ];
      
      indexesToPreload.forEach(idx => {
        if (images[idx]) {
          const img = new Image();
          img.src = images[idx];
        }
      });
    }
  }, [activeImageIndex, lightboxOpen, selectedProject]);


  useEffect(() => {
    const handleFilterProjects = (e: CustomEvent) => {
      const skillName = e.detail;
      setSearchQuery(skillName);
      setActiveFilter('all');
      
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    window.addEventListener('filter-projects', handleFilterProjects as EventListener);
    return () => {
      window.removeEventListener('filter-projects', handleFilterProjects as EventListener);
    };
  }, []);

  
  useEffect(() => {
    // Check hash on mount
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const queryParams = new URLSearchParams(window.location.search);
      const projectId = queryParams.get('project') || (hash.startsWith('#project-') ? hash.replace('#project-', '') : null);
      if (projectId) {
        const id = projectId;
        // find project in all languages just in case
        const proj = projects[language].find(p => p.id === id);
        if (proj) setSelectedProject(proj);
      }
    }
  }, [language]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `/?project=${selectedProject.id}`);
      }
      trackEvent('project_viewed', { projectId: selectedProject.id, title: selectedProject.title });
    } else {
      document.body.style.overflow = 'auto';
      if (typeof window !== 'undefined') {
        window.history.pushState(null, '', window.location.pathname);
      }
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject, trackEvent]);


  const categories = [
    { id: 'all', label: language === 'en' ? 'All' : 'ทั้งหมด' },
    { id: 'web', label: language === 'en' ? 'Web Development' : 'การพัฒนาเว็บไซต์' },
    { id: 'design', label: language === 'en' ? 'UI/UX Design' : 'การออกแบบ UI/UX' },
    { id: 'mobile', label: language === 'en' ? 'Mobile App' : 'แอปพลิเคชันมือถือ' }
  ];

  const filteredProjects = useMemo(() => {
    return projects[language].filter(project => {
      const matchesFilter = activeFilter === 'all' || project.categoryId === activeFilter;
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(lowerQuery) || 
        project.category.toLowerCase().includes(lowerQuery) ||
        (project.techStack && project.techStack.some(tech => tech.toLowerCase().includes(lowerQuery))) ||
        project.description.toLowerCase().includes(lowerQuery);
      
      return matchesFilter && matchesSearch;
    });
  }, [language, activeFilter, searchQuery]);

  const displayedProjects = useMemo(() => {
    if (viewMode === 'featured') {
      return filteredProjects.filter(p => p.isFeatured);
    }
    return filteredProjects;
  }, [filteredProjects, viewMode]);

  return (
    <motion.section 
      id="projects" 
      className="py-24 px-6 sm:px-12 bg-background"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6">
            {language === 'en' ? 'Selected Works' : 'ผลงานที่คัดสรร'}
          </h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-0">
              <h2 className="text-3xl font-serif tracking-tight text-foreground">
                {language === 'en' ? 'Creative ' : 'โปรเจกต์'}<span className="italic text-foreground/80">{language === 'en' ? 'Projects' : 'สร้างสรรค์'}</span>
              </h2>
              <div className="flex items-center gap-1 bg-surface p-1 rounded-full border border-foreground/10 sm:ml-4 w-fit">
                <button
                  onClick={() => setViewMode('featured')}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                    viewMode === 'featured' ? 'bg-foreground text-background' : 'text-foreground/40 hover:text-foreground'
                  }`}
                >
                  {language === 'en' ? 'Featured' : 'คัดสรร'}
                </button>
                <button
                  onClick={() => setViewMode('archive')}
                  className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                    viewMode === 'archive' ? 'bg-foreground text-background' : 'text-foreground/40 hover:text-foreground'
                  }`}
                >
                  {language === 'en' ? 'Archive' : 'คลังผลงาน'}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    activeFilter === category.id 
                      ? 'text-[#0A0A0A] font-bold border border-transparent' 
                      : 'bg-surface text-foreground/70 hover:bg-foreground/10 border border-foreground/10 hover:text-foreground'
                  }`}
                >
                  {activeFilter === category.id && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="absolute inset-0 bg-foreground rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-surface border border-foreground/10 p-6 flex items-center gap-4 hover:border-primary/30 transition-colors">
              <div className="p-3 bg-foreground/5 text-primary rounded-lg">
                <Clock size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest">{language === 'en' ? 'Hours Spent' : 'ชั่วโมงการทำงาน'}</p>
                <p className="text-2xl font-serif text-foreground">2,500+</p>
              </div>
            </div>
            <div className="bg-surface border border-foreground/10 p-6 flex items-center gap-4 hover:border-primary/30 transition-colors">
              <div className="p-3 bg-foreground/5 text-primary rounded-lg">
                <Folder size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest">{language === 'en' ? 'Completed Projects' : 'โปรเจกต์ที่เสร็จสิ้น'}</p>
                <p className="text-2xl font-serif text-foreground">{projects[language].length}</p>
              </div>
            </div>
            <div className="bg-surface border border-foreground/10 p-6 flex items-center gap-4 hover:border-primary/30 transition-colors">
              <div className="p-3 bg-foreground/5 text-primary rounded-lg">
                <Code size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] text-foreground/40 uppercase tracking-widest">{language === 'en' ? 'Lines of Code' : 'บรรทัดของโค้ด'}</p>
                <p className="text-2xl font-serif text-foreground">100k+</p>
              </div>
            </div>
            
            {/* Heatmap Visualization */}
            <div className="bg-surface border border-foreground/10 p-6 md:col-span-3 hover:border-primary/30 transition-colors overflow-hidden">
              <div className="mb-4 flex items-center justify-between">
                 <p className="text-[10px] text-foreground/40 uppercase tracking-widest">
                   {language === 'en' ? 'Activity Timeline' : 'ไทม์ไลน์กิจกรรม'}
                 </p>
                 <div className="flex gap-2 items-center text-[8px] text-foreground/40 uppercase tracking-widest">
                    <span>{language === 'en' ? 'Less' : 'น้อย'}</span>
                    <div className="w-2 h-2 rounded-sm bg-foreground/5" aria-hidden="true" />
                    <div className="w-2 h-2 rounded-sm bg-primary/30" aria-hidden="true" />
                    <div className="w-2 h-2 rounded-sm bg-primary/60" aria-hidden="true" />
                    <div className="w-2 h-2 rounded-sm bg-primary" aria-hidden="true" />
                    <span>{language === 'en' ? 'More' : 'มาก'}</span>
                 </div>
              </div>
              <div className="overflow-x-auto pb-2 custom-scrollbar">
                <div className="min-w-[832px]">
                  <div className="flex justify-between w-full mb-2 text-[10px] text-foreground/40 uppercase tracking-widest">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                      <span key={m}>{language === 'en' ? m : ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'][i]}</span>
                    ))}
                  </div>
                  <div className="flex gap-1 w-full" role="grid" aria-label={language === 'en' ? 'Contribution activity' : 'กิจกรรมการมีส่วนร่วม'}>
                    {Array.from({ length: 52 }).map((_, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1 flex-1" role="row">
                        {Array.from({ length: 7 }).map((_, dIdx) => {
                           const seed = wIdx * 7 + dIdx;
                           const isProject = (seed % 19 === 0) || (seed % 29 === 0);
                           const isCommit = seed % 3 === 0 || seed % 7 === 0;
                           let intensity = 0;
                           if (isProject) intensity = 3;
                           else if (isCommit && seed % 2 !== 0) intensity = 2;
                           else if (isCommit) intensity = 1;
                           
                           return (
                             <div 
                               key={dIdx} 
                               role="gridcell"
                               className={`w-full aspect-square rounded-[2px] transition-colors hover:ring-1 hover:ring-foreground/50 ${
                                 intensity === 0 ? 'bg-foreground/5' : 
                                 intensity === 1 ? 'bg-primary/30' : 
                                 intensity === 2 ? 'bg-primary/60' : 
                                 'bg-primary'
                               }`} 
                               title={language === 'en' ? `Activity level: ${intensity}` : `ระดับกิจกรรม: ${intensity}`}
                             />
                           );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={16} className="text-foreground/40" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? "Search by title or tech stack..." : "ค้นหาตามชื่อหรือเทคโนโลยี..."}
              className="w-full bg-surface border border-foreground/10 rounded-full py-3 pl-10 pr-4 text-sm text-foreground placeholder-white/40 focus:outline-none focus:border-foreground/30 transition-colors"
            />
          </div>
        </div>

        {viewMode === 'featured' ? (
          <motion.div layout className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="portfolio-item flex flex-col bg-surface border border-foreground/5 p-6 relative overflow-hidden">
                    <div className="mb-6 aspect-[4/3] bg-foreground/5 animate-pulse rounded-sm"></div>
                    <div className="flex-1 flex flex-col justify-end gap-3">
                      <div className="h-6 bg-foreground/5 animate-pulse rounded w-3/4"></div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="h-3 bg-foreground/5 animate-pulse rounded w-1/3"></div>
                        <div className="h-5 bg-foreground/5 animate-pulse rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, index) => (
                <motion.div 
                  layout
                  key={project.id}
                  onClick={() => { setSelectedProject(project); setActiveImageIndex(0); }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="portfolio-item group cursor-pointer flex flex-col bg-surface border border-foreground/5 p-6 relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 text-[8px] tracking-[0.2em] text-foreground/20 uppercase z-10">
                    {language === 'en' ? 'Case' : 'เคส'} 0{index + 1}
                  </div>
                  <div className="relative overflow-hidden mb-6 aspect-[4/3] bg-black">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                         <div className="bg-foreground text-background p-3 rounded-full shadow-lg">
                           <ExternalLink size={24} />
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-end">
                    <h3 className="text-2xl font-serif italic text-foreground">{project.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-[10px] text-foreground/40 uppercase tracking-widest">{project.category}</p>
                      <div className="flex items-center gap-1.5 text-foreground/40 bg-foreground/5 px-2 py-1 rounded-sm border border-foreground/10" title="Estimated reading time">
                        <Clock size={10} aria-hidden="true" />
                        <span className="text-[8px] uppercase tracking-widest">
                          {getReadingTime(project, language)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/60 mt-4 leading-relaxed hidden sm:block">{project.description}</p>
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.techStack.map(tech => (
                          <TechBadge key={tech} tech={tech} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            )}
          </motion.div>
        ) : (
          <motion.div layout className="flex flex-col gap-2">
            {isLoading ? (
              <>
                {[1, 2, 3, 4, 5].map(idx => (
                  <div key={idx} className="portfolio-item flex flex-col sm:flex-row sm:items-center justify-between bg-surface border border-foreground/5 p-4 sm:p-6 gap-4 animate-pulse">
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                      <div className="w-12 h-4 bg-foreground/5 rounded"></div>
                      <div className="h-5 bg-foreground/5 rounded w-1/3"></div>
                      <div className="sm:w-48 h-3 bg-foreground/5 rounded w-1/4"></div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-64">
                      <div className="hidden lg:flex flex-1 gap-2 sm:justify-end">
                        <div className="w-12 h-4 bg-foreground/5 rounded"></div>
                        <div className="w-12 h-4 bg-foreground/5 rounded"></div>
                      </div>
                      <div className="hidden sm:block w-4 h-4 bg-foreground/5 rounded"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedProject(project)}
                  className="portfolio-item group cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between bg-surface border border-foreground/5 p-4 sm:p-6 hover:bg-[#222] transition-colors gap-4"
                >
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                    <span className="text-foreground/40 font-mono text-xs w-12">{project.year || '2023'}</span>
                    <h3 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors flex-1">{project.title}</h3>
                    <span className="text-[10px] text-foreground/40 uppercase tracking-widest sm:w-48">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-64">
                    {project.techStack && (
                      <div className="flex flex-wrap gap-2 sm:justify-end hidden lg:flex flex-1">
                        {project.techStack.slice(0, 2).map(tech => (
                          <TechBadge key={tech} tech={tech} size="sm" />
                        ))}
                        {project.techStack.length > 2 && (
                          <span className="text-[8px] text-foreground/40 px-2 py-1">+{project.techStack.length - 2}</span>
                        )}
                      </div>
                    )}
                    <div className="hidden sm:block">
                      <ExternalLink size={16} className="text-foreground/20 group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
        <>

          <Helmet>
            <title>{selectedProject.title} | {language === 'en' ? 'Portfolio' : 'ผลงาน'}</title>
            <meta name="description" content={selectedProject.description} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="article" />
            <meta property="og:title" content={`${selectedProject.title} - ${selectedProject.category}`} />
            <meta property="og:description" content={selectedProject.description} />
            <meta property="og:image" content={selectedProject.imageUrl} />
            <meta property="og:url" content={typeof window !== 'undefined' ? `${window.location.origin}/?project=${selectedProject.id}` : ''} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${selectedProject.title} - ${selectedProject.category}`} />
            <meta name="twitter:description" content={selectedProject.description} />
            <meta name="twitter:image" content={selectedProject.imageUrl} />
          </Helmet>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-surface-alt border border-foreground/10 w-full max-w-5xl max-h-full overflow-y-auto flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-foreground/70 hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
              
              
              <div className="md:w-[45%] relative h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-foreground/10 bg-black flex flex-col">
                <div className="flex-1 relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
                  <img
                    src={[selectedProject.imageUrl, ...(selectedProject.gallery || [])][activeImageIndex]}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-black/60 p-3 rounded-full backdrop-blur-sm text-foreground border border-foreground/20">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </div>
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="h-24 sm:h-32 border-t border-foreground/10 flex gap-1 p-1 overflow-x-auto custom-scrollbar shrink-0">
                    {[selectedProject.imageUrl, ...selectedProject.gallery].map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        alt="Gallery" 
                        className={`h-full aspect-video object-cover cursor-pointer transition-all duration-300 ${activeImageIndex === i ? 'ring-2 ring-primary ring-inset opacity-100' : 'opacity-40 hover:opacity-100'}`} 
                        onClick={() => { setActiveImageIndex(i); setLightboxOpen(true); }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="md:w-[55%] p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] text-primary uppercase tracking-widest">
                    {selectedProject.category}
                  </p>
                  <div className="flex items-center gap-1.5 text-foreground/40">
                    <Clock size={12} />
                    <span className="text-[10px] uppercase tracking-widest">
                      {getReadingTime(selectedProject, language)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl sm:text-4xl font-serif text-foreground">
                    {selectedProject.title}
                  </h3>
                  
                  {/* QR Code linking to Print/Resume view */}
                  <div className="hidden md:flex flex-col items-center gap-2 bg-surface p-3 border border-foreground/10 rounded-lg" title={language === 'en' ? 'Scan to view/download full resume' : 'สแกนเพื่อดู/ดาวน์โหลดเรซูเม่ฉบับเต็ม'}>
                    <QRCodeSVG 
                      value={typeof window !== 'undefined' ? `${window.location.origin}?print=true` : 'https://nuttanan.dev?print=true'}
                      size={64}
                      bgColor="transparent"
                      fgColor="#C5A059"
                      level="L"
                    />
                    <span className="text-[8px] text-foreground/40 uppercase tracking-widest whitespace-nowrap">
                      {language === 'en' ? 'Scan Resume' : 'สแกนเรซูเม่'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-foreground/70 leading-relaxed mb-8 flex-grow">
                  {selectedProject.detailedDescription || selectedProject.description}
                </p>
                
                
                {selectedProject.challenges && (
                  <div className="mb-8 p-4 sm:p-6 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="text-[10px] text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      {language === 'en' ? 'Project Challenges & Solutions' : 'อุปสรรคและการแก้ไข'}
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {selectedProject.challenges}
                    </p>
                  </div>
                )}
                
                {selectedProject.technicalSpecs && selectedProject.technicalSpecs.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-4">
                      {language === 'en' ? 'Technical Specifications' : 'ข้อกำหนดทางเทคนิค'}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.technicalSpecs.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="text-primary mt-1">▹</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.techStack && (
                  <div className="mb-8">
                    <h4 className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] mb-4">
                      {language === 'en' ? 'Technologies Used' : 'เทคโนโลยีที่ใช้'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                        <TechBadge key={tech} tech={tech} />
                      ))}
                    </div>
                  </div>
                )}
                
                
                <ProjectTimeline milestones={selectedProject.milestones} />
                <div className="flex flex-wrap gap-4 mt-auto pt-8">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('demo_clicked', { projectId: selectedProject.id, title: selectedProject.title })}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-foreground/90 transition-colors"
                    >
                      <ExternalLink size={16} />
                      {language === 'en' ? 'Live Demo' : 'ดูเว็บไซต์จริง'}
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('source_clicked', { projectId: selectedProject.id, title: selectedProject.title })}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-surface text-foreground border border-foreground/10 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-foreground/5 transition-colors"
                    >
                      <Github size={16} />
                      {language === 'en' ? 'Source Code' : 'ซอร์สโค้ด'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div 
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center mb-6">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={[selectedProject.imageUrl, ...(selectedProject.gallery || [])][activeImageIndex]}
                  alt={selectedProject.title}
                  className={`max-w-full max-h-full object-contain rounded-sm transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                />
                
                {([selectedProject.imageUrl, ...(selectedProject.gallery || [])].length > 1) && (
                  <>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setActiveImageIndex((prev) => 
                          prev === 0 ? [selectedProject.imageUrl, ...(selectedProject.gallery || [])].length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full backdrop-blur-md hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setActiveImageIndex((prev) => 
                          prev === [selectedProject.imageUrl, ...(selectedProject.gallery || [])].length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full backdrop-blur-md hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              <div className="text-center text-white/80 max-w-2xl">
                <h3 className="text-xl font-serif text-white mb-2">{selectedProject.title}</h3>
                <p className="text-sm opacity-80">{selectedProject.description}</p>
                <div className="mt-4 text-xs font-mono opacity-50 tracking-widest uppercase">
                  {language === 'en' ? 'Image' : 'รูปที่'} {activeImageIndex + 1} / {[selectedProject.imageUrl, ...(selectedProject.gallery || [])].length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
