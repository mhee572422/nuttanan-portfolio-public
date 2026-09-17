import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export default function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'model',
    content: language === 'en' ? "Hi! I'm Nuttanan's AI assistant. How can I help you today?" : "สวัสดีครับ! ผมคือผู้ช่วย AI ของคุณณัฐนันท์ มีอะไรให้ผมช่วยไหมครับ?"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          language,
          history: messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }))
        })
      });

      const data = await response.json();
      
      setMessages([...newMessages, { 
        role: 'model', 
        content: data.reply || (language === 'en' ? 'Sorry, I encountered an error.' : 'ขออภัย เกิดข้อผิดพลาดบางอย่าง') 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([...newMessages, { 
        role: 'model', 
        content: language === 'en' ? 'Connection error. Please try again later.' : 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[320px] sm:w-[380px] bg-surface-alt border border-foreground/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[450px]"
          >
            <div className="bg-surface border-b border-foreground/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="text-primary" size={20} />
                <span className="font-serif text-foreground">{language === 'en' ? 'AI Assistant' : 'ผู้ช่วย AI'}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-foreground/40 hover:text-foreground transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-black' 
                      : 'bg-foreground/10 text-foreground/90'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-foreground/10 text-foreground/50 rounded-lg p-3 flex gap-2 items-center">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="p-3 bg-surface border-t border-foreground/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={language === 'en' ? "Ask me anything..." : "สอบถามข้อมูลได้เลยครับ..."}
                className="flex-1 bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary text-black p-2 rounded-lg disabled:opacity-50 transition-colors hover:bg-[#D5B069]"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-primary text-black shadow-lg hover:scale-105 transition-transform"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
