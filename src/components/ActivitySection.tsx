import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, GitCommit, Rss } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ActivityItem {
  id: string;
  type: 'github' | 'twitter';
  content: string;
  date: string;
  repo?: string;
  link: string;
}

const mockFetchActivities = async (): Promise<ActivityItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: 'github',
          content: 'Implemented real-time collaboration features using WebSockets.',
          repo: 'nuttanan/collab-editor',
          date: '2 hours ago',
          link: '#'
        },
        {
          id: '2',
          type: 'github',
          content: 'Refactored state management to use Zustand for better performance.',
          repo: 'nuttanan/ecommerce-frontend',
          date: '1 day ago',
          link: '#'
        },
        {
          id: '3',
          type: 'twitter',
          content: 'Just launched my new portfolio website built with React, Vite, and Tailwind CSS! Check it out 🚀',
          date: '3 days ago',
          link: '#'
        },
        {
          id: '4',
          type: 'github',
          content: 'Fixed layout shifting issues in the main dashboard grid.',
          repo: 'nuttanan/finance-tracker',
          date: '5 days ago',
          link: '#'
        }
      ]);
    }, 800);
  });
};

export default function ActivitySection() {
  const { language } = useLanguage();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockFetchActivities().then(data => {
      setActivities(data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="activity" className="py-24 px-6 sm:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6">
              {language === 'en' ? 'Recent Updates' : 'อัปเดตล่าสุด'}
            </h2>
            <h2 className="text-3xl font-serif tracking-tight text-foreground mb-4">
              {language === 'en' ? 'Professional ' : 'กิจกรรม'}<span className="italic text-foreground/80">{language === 'en' ? 'Activity' : 'การทำงาน'}</span>
            </h2>
          </div>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 text-primary rounded-full hover:bg-primary/20 transition-all self-start sm:self-auto"
            title={language === 'en' ? 'Subscribe to RSS Feed' : 'ติดตามข่าวสารผ่าน RSS Feed'}
          >
            <Rss size={14} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {language === 'en' ? 'RSS Feed' : 'ติดตาม RSS'}
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-surface border border-foreground/5 p-6 h-48 animate-pulse rounded-sm">
                <div className="h-4 bg-foreground/10 w-1/4 mb-4 rounded"></div>
                <div className="h-3 bg-foreground/10 w-full mb-2 rounded"></div>
                <div className="h-3 bg-foreground/10 w-3/4 rounded"></div>
              </div>
            ))
          ) : (
            activities.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-surface border border-foreground/10 p-6 flex flex-col hover:border-primary/30 transition-colors group cursor-pointer"
                onClick={() => window.open(item.link, '_blank')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${item.type === 'github' ? 'bg-foreground/5 text-foreground/80' : 'bg-blue-500/10 text-blue-400'}`}>
                    {item.type === 'github' ? <Github size={16} /> : <Twitter size={16} />}
                  </div>
                  <span className="text-[10px] text-foreground/40 font-mono">{item.date}</span>
                </div>
                
                {item.type === 'github' && item.repo && (
                  <div className="flex items-center gap-1.5 text-[10px] text-primary mb-2 font-mono">
                    <GitCommit size={12} />
                    <span>{item.repo}</span>
                  </div>
                )}
                
                <p className="text-sm text-foreground/70 leading-relaxed flex-1">
                  {item.content}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
