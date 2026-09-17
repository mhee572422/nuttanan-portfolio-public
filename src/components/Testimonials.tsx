import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '../data';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const { language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', skipSnaps: false }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <motion.section 
      id="testimonials" 
      className="py-24 px-6 sm:px-12 bg-background overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6">
              {language === 'en' ? 'Feedback' : 'ความคิดเห็น'}
            </h2>
            <h2 className="text-3xl font-serif tracking-tight text-foreground mb-4">
              {language === 'en' ? 'Client ' : 'เสียงตอบรับจาก'}<span className="italic text-foreground/80">{language === 'en' ? 'Testimonials' : 'ลูกค้า'}</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={scrollPrev}
              className="w-10 h-10 border border-foreground/10 rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={language === 'en' ? 'Previous Testimonial' : 'ความคิดเห็นก่อนหน้า'}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 border border-foreground/10 rounded-full flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={language === 'en' ? 'Next Testimonial' : 'ความคิดเห็นถัดไป'}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6 select-none">
            {testimonials[language].map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="flex-[0_0_100%] min-w-0 pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="bg-surface border border-foreground/5 p-8 flex flex-col h-full relative group hover:border-foreground/10 transition-colors">
                  <div className="text-4xl font-serif text-primary mb-4 leading-none opacity-50 group-hover:opacity-100 transition-opacity">"</div>
                  <p className="text-sm leading-relaxed text-foreground/70 mb-8 italic flex-1">
                    {testimonial.content}
                  </p>
                  <div className="mt-auto pt-6 border-t border-foreground/5">
                    <h4 className="text-foreground font-medium text-sm">{testimonial.name}</h4>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary mt-1">{testimonial.role} @ {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                index === selectedIndex ? 'bg-primary w-6' : 'bg-foreground/20 hover:bg-foreground/40'
              }`}
              aria-label={language === 'en' ? `Go to slide ${index + 1}` : `ไปยังสไลด์ที่ ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
