import { useState } from 'react';
import { experiences } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown } from 'lucide-react';

export default function Experience() {
  const { language } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.section 
      id="experience" 
      className="py-24 px-6 sm:px-12 bg-background"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6">
            {language === 'en' ? 'Career Trajectory' : 'เส้นทางอาชีพ'}
          </h2>
          <h2 className="text-3xl font-serif tracking-tight text-foreground mb-4">
            {language === 'en' ? 'Professional ' : 'ประสบการณ์'}<span className="italic text-foreground/80">{language === 'en' ? 'Experience' : 'การทำงาน'}</span>
          </h2>
        </div>

        <div className="space-y-6 max-w-3xl">
          {experiences[language].map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 sm:pl-0"
              >
                <div className="flex flex-col sm:flex-row items-start group">
                  <div className="sm:w-32 shrink-0 pt-1">
                    <span className="text-xs font-serif italic text-primary">{exp.period}</span>
                  </div>
                  <div className="flex-1 sm:border-l border-foreground/10 sm:pl-6 pb-6">
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-2 -ml-2"
                      aria-expanded={isExpanded}
                      aria-controls={`exp-details-${exp.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg text-foreground font-medium">{exp.role} <span className="text-foreground/60">@ {exp.company}</span></h4>
                        {exp.accomplishments && exp.accomplishments.length > 0 && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} className="text-foreground/40" aria-hidden="true" />
                          </motion.div>
                        )}
                      </div>
                      <p className="text-xs text-foreground/50 mt-2 tracking-wide leading-relaxed">{exp.description}</p>
                    </button>

                    <AnimatePresence>
                      {isExpanded && exp.accomplishments && exp.accomplishments.length > 0 && (
                        <motion.div
                          id={`exp-details-${exp.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2 list-disc pl-5 text-foreground/70 text-sm">
                            {exp.accomplishments.map((acc, i) => (
                              <li key={i} className="pl-2 marker:text-primary">{acc}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
