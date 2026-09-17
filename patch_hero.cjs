const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const oldMotionDivStart = `<motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >`;

const newMotionDivStart = `
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
              className="text-[#C5A059] uppercase tracking-widest text-xs font-semibold mb-4 drop-shadow-md">
              {language === 'en' ? 'Portfolio & Resume' : 'พอร์ตโฟลิโอและเรซูเม่'}
            </motion.h2>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="text-5xl sm:text-7xl font-serif text-white tracking-tight leading-none mb-6 drop-shadow-lg">
              {language === 'en' ? 'Crafting digital' : 'สร้างสรรค์ประสบการณ์'} <br className="hidden sm:block" />
              <span className="italic text-white/80">{language === 'en' ? 'experiences with purpose.' : 'ดิจิทัลอย่างมีจุดมุ่งหมาย'}</span>
            </motion.h1>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="text-xl sm:text-2xl text-[#C5A059] font-serif mb-8 h-8 drop-shadow-md" aria-hidden="true">
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
              className="text-sm leading-relaxed text-white/70 mb-10 max-w-2xl drop-shadow-md">
              {language === 'en' 
                ? "Hello, I'm Nuttanan Foopun. Lead Systems Administrator / S-CODE Architect / Founder & Chief Architect at BTRU Logic Co., Ltd. / GSII. Welcome to my professional portfolio."
                : "สวัสดี ผมณัฐนันท์ ผู้เชี่ยวชาญด้านการสร้างสรรค์โซลูชันดิจิทัลที่สวยงาม ใช้งานได้จริง และเน้นผู้ใช้เป็นศูนย์กลาง ยินดีต้อนรับสู่พอร์ตโฟลิโอของผม"}
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } }}
              className="flex flex-col sm:flex-row flex-wrap gap-4">`;

const oldContentRegex = /<motion\.div\s+initial=\{\{\s*opacity:\s*0,\s*y:\s*20\s*\}\}\s+animate=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}\s+transition=\{\{\s*duration:\s*0\.5\s*\}\}\s*>\s*<h2.*?<\/h2>\s*<h1.*?<\/h1>\s*<div.*?Typewriter.*?<\/div>\s*<p.*?<\/p>\s*<div.*?flex-wrap gap-4">/s;

code = code.replace(oldContentRegex, newMotionDivStart);
fs.writeFileSync('src/components/Hero.tsx', code);
