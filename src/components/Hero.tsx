import { ArrowRight, Mail, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  const { language } = useLanguage();
  const enWords = ['Systems Administrator', 'S-CODE Architect', 'Mobile App Developer', 'Creative Problem Solver'];
  const thWords = ['นักพัฒนาเว็บไซต์', 'นักออกแบบ UI/UX', 'นักพัฒนาแอปพลิเคชันมือถือ', 'นักแก้ปัญหาเชิงสร้างสรรค์'];

  const { scrollY } = useScroll();
  // Move the background down at half the speed of the scroll for parallax depth
  const y = useTransform(scrollY, [0, 1000], ['0%', '30%']);
  const opacity = useTransform(scrollY, [0, 500], [0.3, 0]);

  return (
    <section 
      id="home" 
      aria-label={language === 'en' ? 'Hero Section' : 'ส่วนแนะนำตัว'}
      className="relative min-h-screen flex items-center pt-20 pb-12 px-6 sm:px-12 overflow-hidden"
    >
      {/* Background Parallax Image */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/10 via-[#0A0A0A]/80 to-[#0A0A0A] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=2000" 
          alt="Abstract Background" 
          className="w-full h-[120%] object-cover object-center -mt-[10%] mix-blend-luminosity"
        />
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-3xl">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
          >
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="text-primary uppercase tracking-widest text-xs font-semibold mb-4 drop-shadow-md">
              {language === 'en' ? 'Portfolio & Resume' : 'พอร์ตโฟลิโอและเรซูเม่'}
            </motion.h2>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="text-5xl sm:text-7xl font-serif text-foreground tracking-tight leading-none mb-6 drop-shadow-lg">
              {language === 'en' ? 'Crafting digital' : 'สร้างสรรค์ประสบการณ์'} <br className="hidden sm:block" />
              <span className="italic text-foreground/80">{language === 'en' ? 'experiences with purpose.' : 'ดิจิทัลอย่างมีจุดมุ่งหมาย'}</span>
            </motion.h1>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="text-xl sm:text-2xl text-primary font-serif mb-8 h-8 drop-shadow-md" aria-hidden="true">
              <Typewriter
                words={language === 'en' ? enWords : thWords}
                loop={0}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </motion.div>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="text-sm leading-relaxed text-foreground/70 mb-10 max-w-2xl drop-shadow-md">
              {language === 'en' 
                ? "Hello, I'm Nuttanan Foopun. Lead Systems Administrator / S-CODE Architect / Founder & Chief Architect at BTRU Logic Co., Ltd. / GSII. Welcome to my professional portfolio."
                : "สวัสดี ผมณัฐนันท์ ผู้เชี่ยวชาญด้านการสร้างสรรค์โซลูชันดิจิทัลที่สวยงาม ใช้งานได้จริง และเน้นผู้ใช้เป็นศูนย์กลาง ยินดีต้อนรับสู่พอร์ตโฟลิโอของผม"}
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="#projects" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xl">
                {language === 'en' ? 'View My Work' : 'ดูผลงาน'}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface/80 backdrop-blur-sm text-foreground border border-foreground/10 rounded-full hover:bg-foreground/10 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xl">
                {language === 'en' ? 'Contact Me' : 'ติดต่อฉัน'}
                <Mail size={18} aria-hidden="true" />
              </a>
              <a href="/resume.pdf" download="Nuttanan Foopun_Resume.pdf" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-alt/50 backdrop-blur-sm text-primary border border-primary/30 rounded-full hover:bg-primary/10 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xl">
                {language === 'en' ? 'Download PDF' : 'ดาวน์โหลด PDF'}
                <Download size={18} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
