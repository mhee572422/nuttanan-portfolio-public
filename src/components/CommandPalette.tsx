import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, Send, Loader2, User, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (messages.length === 0) {
        setMessages([
          {
            role: 'assistant',
            content: language === 'en' 
              ? "Hi! I am Nuttanan Foopun's Smart Portfolio Assistant. You can ask me anything about his experience, skills, or projects!\n\n💡 Tip: Power users can press single keys like 'H' (Home), 'A' (About), 'P' (Projects), or 'C' (Contact) to quick-navigate!" 
              : "สวัสดีครับ! ผมคือผู้ช่วยพอร์ตโฟลิโออัจฉริยะของคุณณัฐนันท์ คุณสามารถถามเกี่ยวกับประสบการณ์ทำงาน ทักษะ หรือโปรเจกต์ต่างๆ ได้เลยครับ!\n\n💡 ทิปส์: คุณสามารถกดปุ่มบนคีย์บอร์ดเช่น 'H' (หน้าแรก), 'P' (ผลงาน), หรือ 'C' (ติดต่อ) เพื่อนำทางอย่างรวดเร็วได้เลยครับ!"
          }
        ]);
      }
    }
  }, [isOpen, language, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const closePalette = () => setIsOpen(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg = query.trim();
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, language })
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: language === 'en' ? 'Sorry, I encountered an error connecting to the AI.' : 'ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI' 
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closePalette}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-surface-alt border border-foreground/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[70vh]"
          >
            <div className="flex items-center px-4 py-4 border-b border-foreground/10 bg-surface">
              <Sparkles className="w-5 h-5 text-primary mr-3" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">
                  {language === 'en' ? 'Smart Portfolio Assistant' : 'ผู้ช่วยพอร์ตโฟลิโออัจฉริยะ'}
                </h3>
                <p className="text-[10px] text-foreground/50 uppercase tracking-widest mt-0.5">Powered by Google Gemini</p>
              </div>
              <div className="text-[10px] font-medium px-2 py-1 bg-foreground/10 text-foreground/50 rounded uppercase tracking-wider ml-2 cursor-pointer hover:bg-foreground/20 transition-colors" onClick={closePalette}>
                ESC
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-foreground/10 text-foreground/70' : 'bg-primary/20 text-primary'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-foreground/10 text-foreground rounded-tr-sm' 
                        : 'bg-surface border border-foreground/5 text-foreground/90 rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-surface border border-foreground/5 text-foreground/90 rounded-tl-sm flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-primary" />
                    <span className="text-sm text-foreground/50">
                      {language === 'en' ? 'Thinking...' : 'กำลังคิด...'}
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-foreground/10 bg-surface">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'en' ? "Ask me anything... (Press Enter to send)" : "ถามอะไรก็ได้... (กด Enter เพื่อส่ง)"}
                  className="flex-1 bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 pr-12 text-foreground placeholder-white/30 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="absolute right-2 p-2 rounded-lg text-foreground/40 hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
