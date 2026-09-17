const fs = require('fs');
let content = fs.readFileSync('src/components/Contact.tsx', 'utf8');

// Replace state and handleSubmit
const stateRegex = /const \[formData, setFormData\] = useState\(\{ name: '', email: '', message: '' \}\);\s*const \[isSubmitting, setIsSubmitting\] = useState\(false\);\s*const \[isSuccess, setIsSuccess\] = useState\(false\);\s*const \[errorMsg, setErrorMsg\] = useState\(''\);[\s\S]*?const handleCopyEmail = \(\) => \{/;

const newStateAndHandlers = `const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateField = (field, value) => {
    let error = '';
    if (field === 'name') {
      if (!value.trim()) error = language === 'en' ? 'Name is required' : 'กรุณากรอกชื่อ';
    } else if (field === 'email') {
      if (!value.trim()) {
        error = language === 'en' ? 'Email is required' : 'กรุณากรอกอีเมล';
      } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
        error = language === 'en' ? 'Invalid email format' : 'รูปแบบอีเมลไม่ถูกต้อง';
      }
    } else if (field === 'message') {
      if (!value.trim()) error = language === 'en' ? 'Message is required' : 'กรุณากรอกข้อความ';
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleBlur = (field) => {
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isMessageValid = validateField('message', formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      setErrorMsg(language === 'en' ? 'Please fix the errors above' : 'กรุณาแก้ไขข้อผิดพลาดด้านบน');
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

  const handleCopyEmail = () => {`;

content = content.replace(stateRegex, newStateAndHandlers);

// Replace form inputs
const formRegex = /<form className="space-y-6" onSubmit=\{handleSubmit\}>[\s\S]*?<button/m;

const newForm = `<form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">{language === 'en' ? 'Name' : 'ชื่อ'}</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)} 
                  onBlur={() => handleBlur('name')}
                  className={\`w-full bg-[#0A0A0A] border \${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'} px-4 py-3 text-sm text-white focus:outline-none transition-colors\`} 
                  placeholder={language === 'en' ? "Your name" : "ชื่อของคุณ"} 
                />
                {errors.name && <p className="text-red-400 text-[10px] mt-2 tracking-wide">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">{language === 'en' ? 'Email' : 'อีเมล'}</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={(e) => handleInputChange('email', e.target.value)} 
                  onBlur={() => handleBlur('email')}
                  className={\`w-full bg-[#0A0A0A] border \${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'} px-4 py-3 text-sm text-white focus:outline-none transition-colors\`} 
                  placeholder="your@email.com" 
                />
                {errors.email && <p className="text-red-400 text-[10px] mt-2 tracking-wide">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">{language === 'en' ? 'Message' : 'ข้อความ'}</label>
                <textarea 
                  id="message" 
                  value={formData.message} 
                  onChange={(e) => handleInputChange('message', e.target.value)} 
                  onBlur={() => handleBlur('message')}
                  rows={4} 
                  className={\`w-full bg-[#0A0A0A] border \${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-white/30'} px-4 py-3 text-sm text-white focus:outline-none transition-colors\`} 
                  placeholder={language === 'en' ? "Tell me about your project..." : "บอกเล่าเรื่องราวโปรเจกต์ของคุณ..."}
                ></textarea>
                {errors.message && <p className="text-red-400 text-[10px] mt-2 tracking-wide">{errors.message}</p>}
              </div>
              
              {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
              {isSuccess && <p className="text-green-400 text-xs">{language === 'en' ? 'Message sent successfully! I will get back to you soon.' : 'ส่งข้อความสำเร็จ! ฉันจะติดต่อกลับโดยเร็วที่สุด'}</p>}
              <button`;

content = content.replace(formRegex, newForm);

fs.writeFileSync('src/components/Contact.tsx', content, 'utf8');
