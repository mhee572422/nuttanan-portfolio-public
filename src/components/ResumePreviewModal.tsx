import React from 'react';
import { useState } from 'react';
import { X, Download, Mail, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { downloadResumeAsPDF } from './PrintView';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumePreviewModal({ isOpen, onClose }: ResumePreviewModalProps) {
  const { language } = useLanguage();
  const { trackEvent } = useAnalytics();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    trackEvent('resume_download_started', { component: 'ResumePreviewModal', language, emailProvided: !!email });
    
    // Call the actual PDF generator
    const success = await downloadResumeAsPDF();
    
    if (success) {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
        onClose();
      }, 2000);
    } else {
      setIsSubmitting(false);
      alert(language === 'en' ? 'Failed to generate PDF. Please try again.' : 'สร้าง PDF ไม่สำเร็จ กรุณาลองใหม่');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#141414] border border-foreground/10 w-full max-w-md shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-foreground/10">
              <h2 className="text-sm font-bold text-foreground uppercase tracking-[0.2em]">
                {language === 'en' ? 'Resume Summary' : 'สรุปเรซูเม่'}
              </h2>
              <button
                onClick={onClose}
                className="text-foreground/40 hover:text-foreground transition-colors"
                disabled={isSubmitting || isSuccess}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-primary mb-4"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h3 className="text-xl font-serif text-foreground mb-2">
                    {language === 'en' ? 'Download Started' : 'เริ่มการดาวน์โหลดแล้ว'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {language === 'en' 
                      ? (email ? 'A copy has also been sent to your email.' : 'Your resume is downloading.')
                      : (email ? 'สำเนาถูกส่งไปยังอีเมลของคุณแล้ว' : 'เรซูเม่ของคุณกำลังดาวน์โหลด')}
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-serif text-foreground mb-4">Nuttanan Foopun</h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      {language === 'en' 
                        ? 'Download my full resume to view detailed experience, technical skills, certifications, and educational background.'
                        : 'ดาวน์โหลดเรซูเม่ฉบับเต็มของฉันเพื่อดูรายละเอียดประสบการณ์ ทักษะทางเทคนิค ใบรับรอง และประวัติการศึกษา'}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {language === 'en' ? 'Senior Web Developer Experience' : 'ประสบการณ์นักพัฒนาเว็บอาวุโส'}
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {language === 'en' ? 'Modern Frameworks (React, TS, Node)' : 'เฟรมเวิร์กสมัยใหม่ (React, TS, Node)'}
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {language === 'en' ? 'Google Cloud Certifications' : 'ใบรับรองจาก Google Cloud'}
                      </li>
                    </ul>
                  </div>

                  <form onSubmit={handleDownload} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-[10px] text-foreground/40 uppercase tracking-widest mb-2">
                        {language === 'en' ? 'Receive a copy via email (Optional)' : 'รับสำเนาทางอีเมล (ไม่บังคับ)'}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={16} />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={language === 'en' ? 'your@email.com' : 'your@email.com'}
                          className="w-full bg-foreground/5 border border-foreground/10 text-foreground text-sm px-11 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full"
                        />
                      ) : (
                        <Download size={16} />
                      )}
                      {isSubmitting 
                        ? (language === 'en' ? 'Generating PDF...' : 'กำลังสร้าง PDF...') 
                        : (language === 'en' ? 'Download Resume' : 'ดาวน์โหลดเรซูเม่')
                      }
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
