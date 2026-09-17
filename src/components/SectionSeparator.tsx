import { motion } from 'motion/react';

export default function SectionSeparator() {
  return (
    <div className="w-full flex items-center justify-center py-4 overflow-hidden relative z-10">
      <svg width="250" height="2" viewBox="0 0 250 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.line 
          x1="0" y1="1" x2="250" y2="1" 
          stroke="url(#paint0_linear)" 
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="1" x2="250" y2="1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C5A059" stopOpacity="0" />
            <stop offset="0.5" stopColor="#C5A059" stopOpacity="0.8" />
            <stop offset="1" stopColor="#C5A059" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
