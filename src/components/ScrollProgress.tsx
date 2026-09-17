import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function ScrollProgress() {
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [percentLeft, setPercentLeft] = useState(100);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Calculate how much is left (100 - current progress)
      setPercentLeft(Math.max(0, Math.round((1 - latest) * 100)));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C5A059] to-[#E2C792] origin-left z-[100] drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]"
        style={{ scaleX }}
      />
      
      {/* Subtle indicator of how much content is left */}
      <motion.div 
        className="fixed top-4 right-4 z-[90] bg-background/80 backdrop-blur-md border border-foreground/5 rounded-full px-3 py-1 flex items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: percentLeft < 100 && percentLeft > 0 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
        <span className="text-[9px] text-foreground/60 font-mono tracking-wider">
          {percentLeft}% {language === 'en' ? 'LEFT' : 'เหลือ'}
        </span>
      </motion.div>
    </>
  );
}
