import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down past the Hero section
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-40 flex items-center justify-center cursor-pointer group"
          onClick={scrollToTop}
          title={language === 'en' ? 'Back to top' : 'กลับขึ้นด้านบน'}
        >
          {/* SVG Progress Circle */}
          <svg className="absolute w-12 h-12 -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#C5A059"
              strokeWidth="2"
              strokeDasharray="138" // 2 * PI * 22 ~= 138
              style={{ pathLength: smoothProgress }}
            />
          </svg>
          
          <div className="bg-surface group-hover:bg-primary text-primary group-hover:text-[#0A0A0A] w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg">
            <ArrowUp size={18} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
