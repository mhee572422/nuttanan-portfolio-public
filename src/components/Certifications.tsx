import { useState } from 'react';
import { certifications } from '../data';
import { Award, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CertificationItem } from '../types';

export default function Certifications() {
  const { language } = useLanguage();
  const currentCerts = certifications[language];
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <motion.section 
      id="certifications" 
      className="py-24 bg-[#0F0F0F] relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface transform -skew-x-12 opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              {language === 'en' ? 'Certifications' : 'ใบรับรองและทักษะ'}
            </h2>
            <div className="w-24 h-1 bg-primary" />
          </div>
          <p className="text-gray-400 max-w-md text-sm leading-relaxed">
            {language === 'en' 
              ? 'Professional qualifications and certifications that validate my technical expertise and commitment to continuous learning.' 
              : 'คุณวุฒิและใบรับรองวิชาชีพที่รับรองความเชี่ยวชาญด้านเทคนิคและความมุ่งมั่นในการเรียนรู้อย่างต่อเนื่องของฉัน'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCerts.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(cert.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="bg-[#141414] border border-foreground/5 p-8 relative overflow-hidden group hover:border-primary/30 transition-colors"
            >
              {/* Decorative top border */}
              <div 
                className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
                style={{ width: hoveredId === cert.id ? '100%' : '0%' }}
              />
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-foreground/5 rounded-lg text-primary overflow-hidden">
                  {cert.imageUrl ? (
                    <img src={cert.imageUrl} alt={cert.issuer} className="w-8 h-8 object-contain" />
                  ) : (
                    <Award size={24} />
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-mono">
                  {cert.date}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                {cert.title}
              </h3>
              
              <p className="text-primary text-xs uppercase tracking-wider mb-4">
                {cert.issuer}
              </p>
              
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                {cert.description}
              </p>
              
              <button
                onClick={() => setSelectedCert(cert)}
                className="inline-flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-widest group-hover:text-primary transition-colors mt-auto"
              >
                {language === 'en' ? 'View Details' : 'ดูรายละเอียด'}
                <ExternalLink size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={() => setSelectedCert(null)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#141414] border border-foreground/10 shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-foreground/10">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">
                  {language === 'en' ? 'Certification Details' : 'รายละเอียดใบรับรอง'}
                </h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-foreground/40 hover:text-foreground transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 flex flex-col gap-6">
                <div className="flex items-center gap-6">
                  {selectedCert.imageUrl && (
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-foreground/5 rounded-xl p-3 border border-foreground/10">
                      <img src={selectedCert.imageUrl} alt={selectedCert.issuer} className="w-full h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <h4 className="text-2xl font-serif text-foreground mb-2">{selectedCert.title}</h4>
                    <p className="text-primary text-sm uppercase tracking-wider">{selectedCert.issuer}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-foreground/40 uppercase tracking-widest mb-1">
                      {language === 'en' ? 'Date Issued' : 'วันที่ออก'}
                    </p>
                    <p className="text-foreground font-mono">{selectedCert.date}</p>
                  </div>
                  
                  {selectedCert.credentialId && (
                    <div>
                      <p className="text-[10px] text-foreground/40 uppercase tracking-widest mb-1">
                        {language === 'en' ? 'Credential ID' : 'รหัสใบรับรอง'}
                      </p>
                      <p className="text-foreground font-mono">{selectedCert.credentialId}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-[10px] text-foreground/40 uppercase tracking-widest mb-1">
                      {language === 'en' ? 'Description' : 'รายละเอียด'}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">{selectedCert.description}</p>
                  </div>
                </div>
                
                {selectedCert.credentialUrl && (
                  <div className="pt-4 border-t border-foreground/10 mt-2">
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-foreground text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-foreground/90 transition-colors"
                    >
                      {language === 'en' ? 'Verify Credential' : 'ตรวจสอบใบรับรอง'}
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
