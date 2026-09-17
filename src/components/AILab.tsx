import React, { useState } from 'react';
import { Play, Image as ImageIcon, Music, Video, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AILab() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'video' | 'music' | 'image'>('image');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setResultUrl(null);
    setError('');
    
    try {
      const response = await fetch(`/api/generate/${activeTab}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) throw new Error('Generation failed');
      const data = await response.json();
      
      if (data.url) {
        setResultUrl(data.url);
      } else if (data.data && data.mimeType) {
        setResultUrl(`data:${data.mimeType};base64,${data.data}`);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.warn('AI Lab generation error:', err);
      setError(language === 'en' ? 'Generation failed. Please try again later.' : 'การสร้างล้มเหลว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="ai-lab" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-primary uppercase tracking-widest text-xs font-semibold mb-2 flex items-center gap-2">
          <Play size={14} /> {language === 'en' ? 'AI Sandbox' : 'ห้องทดลอง AI'}
        </h2>
        <h3 className="text-3xl sm:text-5xl font-serif text-foreground mb-6">
          {language === 'en' ? 'Generative AI' : 'Generative AI'}
        </h3>
        <p className="text-foreground/60 max-w-2xl text-sm">
          {language === 'en' 
            ? 'Explore my integrations with Google Gemini models for generating images, music, and videos directly within this portfolio.'
            : 'ทดลองใช้งานการเชื่อมต่อกับ Google Gemini โมเดลสำหรับการสร้างภาพ เพลง และวิดีโอโดยตรงในพอร์ตโฟลิโอนี้'}
        </p>
      </div>

      <div className="bg-surface-alt border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex border-b border-foreground/10 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('image')} 
            className={`flex items-center gap-2 px-6 py-4 text-sm whitespace-nowrap transition-colors ${activeTab === 'image' ? 'text-primary border-b-2 border-primary bg-foreground/5' : 'text-foreground/40 hover:text-foreground/80'}`}
          >
            <ImageIcon size={18} /> Image Generation
          </button>
          <button 
            onClick={() => setActiveTab('music')} 
            className={`flex items-center gap-2 px-6 py-4 text-sm whitespace-nowrap transition-colors ${activeTab === 'music' ? 'text-primary border-b-2 border-primary bg-foreground/5' : 'text-foreground/40 hover:text-foreground/80'}`}
          >
            <Music size={18} /> Music Generation
          </button>
          <button 
            onClick={() => setActiveTab('video')} 
            className={`flex items-center gap-2 px-6 py-4 text-sm whitespace-nowrap transition-colors ${activeTab === 'video' ? 'text-primary border-b-2 border-primary bg-foreground/5' : 'text-foreground/40 hover:text-foreground/80'}`}
          >
            <Video size={18} /> Video Generation
          </button>
        </div>
        
        <div className="p-6 md:p-10">
          <form onSubmit={handleGenerate} className="flex flex-col gap-4 mb-8">
            <textarea 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={language === 'en' ? "Describe what you want to generate..." : "อธิบายสิ่งที่คุณต้องการสร้าง..."}
              className="w-full bg-surface border border-foreground/10 rounded-xl p-4 text-foreground placeholder-white/30 focus:outline-none focus:border-primary transition-colors resize-none h-24"
            />
            <button 
              type="submit" 
              disabled={isGenerating || !prompt.trim()}
              className="self-end bg-primary text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#D5B069] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? <Loader2 size={16} className="animate-spin" /> : null}
              {language === 'en' ? 'Generate' : 'สร้าง'}
            </button>
          </form>

          {error && <div className="text-red-400 text-sm mb-6">{error}</div>}

          <div className="bg-background border border-foreground/5 rounded-xl min-h-[300px] flex items-center justify-center p-4 relative overflow-hidden">
            {!resultUrl && !isGenerating && (
              <span className="text-foreground/20 text-sm">
                {language === 'en' ? 'Generated content will appear here' : 'เนื้อหาที่ถูกสร้างจะแสดงที่นี่'}
              </span>
            )}
            
            {isGenerating && (
              <div className="flex flex-col items-center gap-4 text-primary">
                <Loader2 size={32} className="animate-spin" />
                <span className="text-sm animate-pulse">
                  {language === 'en' ? 'Generating with Gemini...' : 'กำลังสร้างด้วย Gemini...'}
                </span>
              </div>
            )}

            {resultUrl && !isGenerating && activeTab === 'image' && (
              <img src={resultUrl} alt="Generated" className="max-w-full max-h-[500px] rounded-lg object-contain" />
            )}

            {resultUrl && !isGenerating && activeTab === 'music' && (
              <audio src={resultUrl} controls className="w-full max-w-md" />
            )}

            {resultUrl && !isGenerating && activeTab === 'video' && (
              <video src={resultUrl} controls autoPlay loop className="max-w-full max-h-[500px] rounded-lg object-contain" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
