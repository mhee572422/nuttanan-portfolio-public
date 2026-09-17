import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { language } = useLanguage();

  return (
    <motion.section 
      id="about" 
      className="py-24 px-6 sm:px-12 bg-background"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24">
        <div className="md:w-1/3 shrink-0">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6">{language === 'en' ? 'About Me' : 'เกี่ยวกับฉัน'}</h2>
          <h2 className="text-3xl font-serif tracking-tight text-foreground mb-4">
            {language === 'en' ? 'My ' : 'เรื่องราว'}<span className="italic text-foreground/80">{language === 'en' ? 'Story' : 'ของฉัน'}</span>
          </h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3 space-y-6"
        >
          {language === 'en' ? (
            <>
              <p className="text-sm leading-relaxed text-foreground/70">
                I am a passionate developer and designer with a deep appreciation for crafting digital experiences that seamlessly blend aesthetics and functionality. My journey began with a fascination for interactive design, evolving into a career where I bridge the gap between creative vision and technical execution.
              </p>
              <p className="text-sm leading-relaxed text-foreground/70">
                My inspiration stems from the belief that technology should empower and elevate the human experience. I constantly seek out new challenges, learning cutting-edge tools and methodologies to push the boundaries of what's possible on the web.
              </p>
              <p className="text-sm leading-relaxed text-foreground/70">
                My ultimate career goal is to lead multidisciplinary teams in building innovative platforms that leave a lasting impact, while continuously honing my craft in both software engineering and user experience design.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-foreground/70">
                ผมเป็นนักพัฒนาและนักออกแบบที่หลงใหลในการสร้างสรรค์ประสบการณ์ดิจิทัลที่ผสมผสานสุนทรียภาพและการใช้งานได้อย่างลงตัว การเดินทางของผมเริ่มต้นจากความชื่นชอบในการออกแบบเชิงโต้ตอบ ซึ่งพัฒนามาเป็นอาชีพที่ผมเชื่อมโยงวิสัยทัศน์เชิงสร้างสรรค์กับการลงมือทำทางเทคนิคเข้าด้วยกัน
              </p>
              <p className="text-sm leading-relaxed text-foreground/70">
                แรงบันดาลใจของผมมาจากความเชื่อที่ว่าเทคโนโลยีควรส่งเสริมและยกระดับประสบการณ์ของมนุษย์ ผมมองหาความท้าทายใหม่ๆ อยู่เสมอ เรียนรู้เครื่องมือและวิธีการล้ำสมัยเพื่อผลักดันขีดจำกัดของสิ่งที่เป็นไปได้บนเว็บ
              </p>
              <p className="text-sm leading-relaxed text-foreground/70">
                เป้าหมายสูงสุดในอาชีพของผมคือการนำทีมสหวิชาชีพในการสร้างแพลตฟอร์มนวัตกรรมที่สร้างผลกระทบที่ยั่งยืน พร้อมกับพัฒนาฝีมือทั้งในด้านวิศวกรรมซอฟต์แวร์และการออกแบบประสบการณ์ผู้ใช้อย่างต่อเนื่อง
              </p>
            </>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
