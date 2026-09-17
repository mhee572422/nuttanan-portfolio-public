const fs = require('fs');
let content = fs.readFileSync('src/components/Contact.tsx', 'utf8');

// Add states
content = content.replace(
  "  const [showQR, setShowQR] = useState(false);",
  "  const [showQR, setShowQR] = useState(false);\n  const [formData, setFormData] = useState({ name: '', email: '', message: '' });\n  const [isSubmitting, setIsSubmitting] = useState(false);\n  const [isSuccess, setIsSuccess] = useState(false);\n  const [errorMsg, setErrorMsg] = useState('');"
);

// Add Loader2 import if missing
if (!content.includes('Loader2')) {
  content = content.replace(
    "import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Copy, Check, QrCode } from 'lucide-react';",
    "import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Copy, Check, QrCode, Loader2 } from 'lucide-react';"
  );
}

// Add handleSubmit
const handleSubmit = `
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg(language === 'en' ? 'Please fill in all fields' : 'กรุณากรอกข้อมูลให้ครบถ้วน');
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
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setErrorMsg(language === 'en' ? 'Failed to send message. Please try again later.' : 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };
`;

content = content.replace(
  "  const handleCopyEmail = () => {",
  handleSubmit + "\n  const handleCopyEmail = () => {"
);

// Update Form UI
content = content.replace(
  '<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>',
  '<form className="space-y-6" onSubmit={handleSubmit}>'
);

content = content.replace(
  'id="name" className=',
  'id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className='
);

content = content.replace(
  'id="email" className=',
  'id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className='
);

content = content.replace(
  'id="message" rows={4} className=',
  'id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className='
);

const newBtn = `
              {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
              {isSuccess && <p className="text-green-400 text-xs">{language === 'en' ? 'Message sent successfully! I will get back to you soon.' : 'ส่งข้อความสำเร็จ! ฉันจะติดต่อกลับโดยเร็วที่สุด'}</p>}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white text-[#0A0A0A] font-bold text-[10px] uppercase tracking-[0.2em] px-4 py-4 hover:bg-white/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                {language === 'en' ? 'Send Message' : 'ส่งข้อความ'}
              </button>
`;

content = content.replace(
  /<button type="submit"[\s\S]*?<\/button>/,
  newBtn
);

fs.writeFileSync('src/components/Contact.tsx', content, 'utf8');
