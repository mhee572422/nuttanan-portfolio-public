import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Tag, Clock, Link as LinkIcon, Check, Mail, List as ListIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Post } from '../types';
import Markdown from 'react-markdown';

interface PostViewModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PostViewModal({ post, isOpen, onClose }: PostViewModalProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  
  const handleCopyLink = () => {
    if (!post) return;
    const link = `${window.location.origin}/?post=${post.id}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen || !post) return null;

  const title = language === 'en' ? post.title_en : post.title_th;
  const content = language === 'en' ? post.content_en : post.content_th;
  
  const headings = React.useMemo(() => {
    const matches = Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm));
    return matches.map(match => {
      // Clean markdown characters from the heading text for the ID
      const plainText = match[2].replace(/[^\w\s\u0E00-\u0E7F]/g, '').trim();
      return {
        level: match[1].length,
        text: match[2].replace(/\*\*/g, '').replace(/_/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\(/g, '').replace(/\)/g, ''), // just clean basic markdown for display
        id: plainText.toLowerCase().replace(/[^\w\u0E00-\u0E7F]+/g, '-')
      };
    });
  }, [content]);

  const flattenText = (children: any): string => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(flattenText).join('');
    if (children && typeof children === 'object' && children.props && children.props.children) return flattenText(children.props.children);
    return '';
  };

  const generateId = (children: any) => flattenText(children).toLowerCase().replace(/[^\w\u0E00-\u0E7F]+/g, '-');

  const components = {
    h2: ({node, children, ...props}: any) => <h2 id={generateId(children)} className="scroll-mt-6" {...props}>{children}</h2>,
    h3: ({node, children, ...props}: any) => <h3 id={generateId(children)} className="scroll-mt-6" {...props}>{children}</h3>,
  };


  const date = post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString(language === 'en' ? 'en-US' : 'th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative bg-surface border border-foreground/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-md border border-foreground/10 text-foreground hover:text-primary transition-colors rounded-full hover:bg-foreground/5"
          >
            <X size={20} />
          </button>

          <div className="flex-1 overflow-y-auto p-6 sm:p-12">
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-sm">
                  <Tag size={12} /> {post.tag}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-foreground/50 font-mono">
                  <Calendar size={14} /> {date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-foreground/50 font-mono">
                  <Clock size={14} /> {post.readTime}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
                {title}
              </h1>

              <div className="w-full h-px bg-foreground/10 mb-8" />

              {headings.length > 0 && (
                <div className="mb-10 p-5 bg-surface-alt border border-foreground/10 rounded-xl">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 mb-4 flex items-center gap-2">
                    <ListIcon size={16} />
                    {language === 'en' ? 'Table of Contents' : 'สารบัญ'}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {headings.map((h, i) => (
                      <li key={i} style={{ paddingLeft: `${(h.level - 2) * 1.5}rem` }}>
                        <a 
                          href={`#${h.id}`} 
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(h.id);
                            if (el) {
                              // We need to scroll the modal container, not the window
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="text-foreground/70 hover:text-primary transition-colors flex items-start gap-2"
                        >
                          <span className="text-primary mt-1 text-[10px] shrink-0">▹</span>
                          <span>{h.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}


              <div className="prose prose-invert prose-lg max-w-none markdown-body prose-p:leading-relaxed prose-headings:font-serif prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <Markdown components={components}>{content}</Markdown>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
