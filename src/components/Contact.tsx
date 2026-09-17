import React from 'react';
import { useState } from 'react';
import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Copy, Check, QrCode, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import { z } from 'zod';

const getContactSchema = (language: string) => z.object({
  name: z.string().min(2, language === 'en' ? 'Name must be at least 2 characters' : 'ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร'),
  email: z.string().email(language === 'en' ? 'Invalid email format' : 'รูปแบบอีเมลไม่ถูกต้อง'),
  message: z.string().min(10, language === 'en' ? 'Message must be at least 10 characters' : 'ข้อความต้องมีความยาวอย่างน้อย 10 ตัวอักษร')
});

export default function Contact() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateField = (field: 'name' | 'email' | 'message', value: string) => {
    const schema = getContactSchema(language);
    try {
      schema.shape[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: '' }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0]?.message || '' }));
      }
      return false;
    }
  };

  const handleInputChange = (field: 'name' | 'email' | 'message', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const schema = getContactSchema(language);
    
    try {
      schema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = { name: '', email: '', message: '' };
        error.issues.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as 'name' | 'email' | 'message'] = err.message;
          }
        });
        setErrors(newErrors);
        setErrorMsg(language === 'en' ? 'Please fix the errors above' : 'กรุณาแก้ไขข้อผิดพลาดด้านบน');
      }
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send');
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setErrorMsg(language === 'en' ? 'Failed to send message. Please try again later.' : 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('nuttanan.f@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <motion.section 
      id="contact" 
      className="py-24 px-6 sm:px-12 bg-background text-[#E0E0E0] relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center flex-wrap gap-4 mb-6">
              <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                {language === 'en' ? 'Contact' : 'ติดต่อ'}
              </h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full" title={language === 'en' ? 'Accepting new projects' : 'เปิดรับงานใหม่'}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-green-400 font-medium">
                  {language === 'en' ? 'Available for freelance' : 'รับงานฟรีแลนซ์'}
                </span>
              </div>
            </div>
            <h2 className="text-3xl font-serif tracking-tight text-foreground mb-6">
              {language === 'en' ? "Let's work " : 'มาร่วมงาน'}<span className="italic text-foreground/80">{language === 'en' ? 'together' : 'กันเถอะ'}</span>
            </h2>
            <p className="text-sm text-foreground/70 mb-12 max-w-md leading-relaxed">
              {language === 'en' 
                ? "I'm currently available for freelance work and full-time opportunities. If you have a project that needs some creative touch, I'd love to hear about it."
                : "ปัจจุบันฉันรับงานฟรีแลนซ์และงานประจำ หากคุณมีโปรเจกต์ที่ต้องการความคิดสร้างสรรค์ ฉันยินดีที่จะรับฟัง"}
            </p>
            
            <div className="space-y-6">
              <div className="relative inline-block">
                <button 
                  onClick={handleCopyEmail}
                  className="group flex items-center gap-4 text-foreground/70 hover:text-foreground transition-colors text-sm cursor-pointer"
                  title={language === 'en' ? 'Copy email address' : 'คัดลอกที่อยู่อีเมล'}
                  type="button"
                >
                  <Mail size={16} />
                  <span>nuttanan.f@gmail.com</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-1.5 rounded bg-foreground/5 border border-foreground/10">
                    {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
                  </div>
                </button>
              </div>
              <div className="flex items-center gap-4 text-foreground/70 hover:text-foreground transition-colors text-sm">
                <Phone size={16} />
                <span>+66 (0) 123 4567</span>
              </div>
              <div className="flex items-center gap-4 text-foreground/70 text-sm">
                <MapPin size={16} />
                <span>Bangkok, Thailand</span>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border border-foreground/10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label="GitHub" className="w-10 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border border-foreground/10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors">
                <Github size={16} />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border border-foreground/10 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors">
                <Twitter size={16} />
              </a>
              <button 
                onClick={() => setShowQR(true)}
                aria-label="Show QR Code" 
                className="w-10 h-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary border border-foreground/10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors ml-auto"
                title={language === 'en' ? 'Scan to save contact' : 'สแกนเพื่อบันทึกข้อมูลติดต่อ'}
              >
                <QrCode size={16} />
              </button>
            </div>
          </div>

          <div className="bg-surface border border-foreground/5 p-8 sm:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">{language === 'en' ? 'Name' : 'ชื่อ'}</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                  onBlur={() => handleBlur('name')}
                  className={`w-full bg-background border ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'} px-4 py-3 text-sm text-foreground focus:outline-none transition-colors`} 
                  placeholder={language === 'en' ? "Your name" : "ชื่อของคุณ"} 
                />
                {errors.name && <p className="text-red-400 text-[10px] mt-2 tracking-wide">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">{language === 'en' ? 'Email' : 'อีเมล'}</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  onBlur={() => handleBlur('email')}
                  className={`w-full bg-background border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'} px-4 py-3 text-sm text-foreground focus:outline-none transition-colors`} 
                  placeholder="your@email.com" 
                />
                {errors.email && <p className="text-red-400 text-[10px] mt-2 tracking-wide">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-3">{language === 'en' ? 'Message' : 'ข้อความ'}</label>
                <textarea 
                  id="message" 
                  value={formData.message} 
                  onChange={(e) => handleInputChange('message', e.target.value)} 
                  onBlur={() => handleBlur('message')}
                  rows={4} 
                  className={`w-full bg-background border ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-foreground/10 focus:border-foreground/30'} px-4 py-3 text-sm text-foreground focus:outline-none transition-colors`} 
                  placeholder={language === 'en' ? "Tell me about your project..." : "บอกเล่าเรื่องราวโปรเจกต์ของคุณ..."}
                ></textarea>
                {errors.message && <p className="text-red-400 text-[10px] mt-2 tracking-wide">{errors.message}</p>}
              </div>
              
              {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
              {isSuccess && <p className="text-green-400 text-xs">{language === 'en' ? 'Message sent successfully! I will get back to you soon.' : 'ส่งข้อความสำเร็จ! ฉันจะติดต่อกลับโดยเร็วที่สุด'}</p>}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-foreground text-background font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-4 hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                {language === 'en' ? 'Send Message' : 'ส่งข้อความ'}
              </button>

            </form>
          </div>
        </div>

        <div className="mt-24 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl font-serif text-foreground mb-2">
              {language === 'en' ? 'Subscribe to Newsletter' : 'สมัครรับจดหมายข่าว'}
            </h3>
            <p className="text-sm text-foreground/60">
              {language === 'en' ? 'Get occasional updates on my latest projects and insights.' : 'รับการอัปเดตเกี่ยวกับโปรเจกต์และข้อมูลเชิงลึกใหม่ๆ เป็นครั้งคราว'}
            </p>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.querySelector('input');
              if (input) input.value = '';
              setSubscribed(true);
              setTimeout(() => setSubscribed(false), 3000);
            }} 
            className="flex w-full md:w-auto flex-col sm:flex-row gap-3"
          >
            <input 
              type="email" 
              required 
              placeholder={language === 'en' ? 'Email address' : 'ที่อยู่อีเมล'} 
              className="w-full sm:w-64 bg-surface border border-foreground/10 px-4 py-3 rounded-none text-sm text-foreground focus:outline-none focus:border-foreground/30 transition-colors"
            />
            <button 
              type="submit" 
              className="whitespace-nowrap bg-foreground text-background font-bold text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              {language === 'en' ? 'Subscribe' : 'ติดตาม'}
            </button>
          </form>
        </div>
      </div>
      
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 bg-foreground text-background px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-50 text-[10px] uppercase tracking-[0.1em] font-bold"
          >
            <div className="bg-background text-foreground p-1 rounded-full">
              <Check size={12} />
            </div>
            {language === 'en' ? 'Email copied to clipboard' : 'คัดลอกอีเมลลงคลิปบอร์ดแล้ว'}
          </motion.div>
        )}
        {subscribed && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 bg-primary text-[#0A0A0A] px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl z-50 text-[10px] uppercase tracking-[0.1em] font-bold"
          >
            <div className="bg-background text-foreground p-1 rounded-full">
              <Check size={12} />
            </div>
            {language === 'en' ? 'Subscribed to newsletter' : 'สมัครรับจดหมายข่าวเรียบร้อยแล้ว'}
          </motion.div>
        )}
        
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface border border-foreground/10 p-8 flex flex-col items-center max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors"
              >
                ✕
              </button>
              
              <h3 className="text-xl font-serif text-foreground mb-2 text-center">
                {language === 'en' ? 'Connect with me' : 'ติดต่อฉัน'}
              </h3>
              <p className="text-sm text-foreground/60 text-center mb-8">
                {language === 'en' ? 'Scan to view my LinkedIn profile' : 'สแกนเพื่อดูโปรไฟล์ LinkedIn ของฉัน'}
              </p>
              
              <div className="bg-foreground p-4 rounded-lg">
                <QRCodeSVG 
                  value="https://linkedin.com/in/nuttanan-foopun-46s4906s" 
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#0A0A0A"
                  level="H"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
