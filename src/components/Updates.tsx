
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Rss, Calendar, ArrowUpRight, Tag, Plus, Edit2, Trash2, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import PostEditorModal from './PostEditorModal';
import PostViewModal from './PostViewModal';

export default function Updates() {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewingPost, setViewingPost] = useState<Post | null>(null);

  useEffect(() => {
    let q: any = collection(db, 'posts');
    if (!isAdmin) {
      q = query(collection(db, 'posts'), where('published', '==', true));
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts: Post[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedPosts.push({
          id: doc.id,
          title_en: data.title_en,
          title_th: data.title_th,
          excerpt_en: data.excerpt_en,
          excerpt_th: data.excerpt_th,
          content_en: data.content_en,
          content_th: data.content_th,
          category: data.category,
          tag: data.tag,
          readTime: data.readTime,
          published: data.published,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          authorId: data.authorId
        });
      });
      fetchedPosts.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });
      setPosts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [isAdmin]);

  const handleEdit = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleDelete = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleOpenNew = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleView = (post: Post) => {
    setViewingPost(post);
    setIsViewOpen(true);
  };

  // Filter out unpublished posts for non-admins
  const visiblePosts = isAdmin ? posts : posts.filter(p => p.published);

  return (
    <section id="updates" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-primary uppercase tracking-widest text-xs font-semibold mb-2 flex items-center gap-2">
            <Rss size={14} /> {language === 'en' ? 'Feed' : 'ข่าวสารใหม่'}
          </h2>
          <h3 className="text-3xl sm:text-5xl font-serif text-foreground">
            {language === 'en' ? 'Updates &' : 'อัปเดตและ'} <span className="italic text-foreground/80">{language === 'en' ? 'Notes' : 'บทความ'}</span>
          </h3>
        </div>
        <div className="flex flex-col items-start md:items-end gap-4">
          <p className="text-foreground/50 text-sm max-w-md text-left md:text-right">
            {language === 'en' 
              ? 'Recent thoughts, technical notes, and architecture patterns from my professional engineering journey.'
              : 'บันทึกทางเทคนิค แนวคิด และรูปแบบสถาปัตยกรรมล่าสุดจากการทำงานด้านวิศวกรรมซอฟต์แวร์ของผม'}
          </p>
          {isAdmin && (
            <button 
              onClick={handleOpenNew}
              className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} /> New Post
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : visiblePosts.length === 0 ? (
        <div className="text-center py-20 text-foreground/40 font-mono text-sm border border-foreground/5 rounded-2xl bg-surface/30">
          {language === 'en' ? 'No posts found.' : 'ยังไม่มีบทความ'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post, idx) => {
            const dateStr = post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString(language === 'en' ? 'en-US' : 'th-TH', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleView(post)}
                className="bg-surface-alt border border-foreground/10 rounded-2xl p-6 flex flex-col group hover:border-primary/50 hover:bg-[#151515] transition-colors relative cursor-pointer"
              >
                {!post.published && (
                  <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-md">
                    Draft
                  </div>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-sm">
                    <Tag size={10} /> {post.tag}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-foreground/40 font-mono">
                    <Calendar size={12} /> {dateStr}
                  </span>
                </div>
                
                <h4 className="text-lg text-foreground font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {language === 'en' ? post.title_en : post.title_th}
                </h4>
                
                <p className="text-sm text-foreground/60 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {language === 'en' ? post.excerpt_en : post.excerpt_th}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-foreground/5">
                  <span className="text-xs text-foreground/30 font-mono flex items-center gap-1">
                    {post.readTime}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:?subject=${encodeURIComponent(language === 'en' ? post.title_en : post.title_th)}&body=${encodeURIComponent(language === 'en' ? 'Check out this post: ' : 'ลองอ่านบทความนี้ดู: ') + encodeURIComponent('\n' + window.location.origin + '/?post=' + post.id)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                      title={language === 'en' ? 'Share via Email' : 'แชร์ผ่านอีเมล'}
                    >
                      <Mail size={14} />
                    </a>
                    <button
                      onClick={(e) => copyPostLink(e, post.id)}
                      className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                      title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
                    >
                      {copiedId === post.id ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} />}
                    </button>
                    {isAdmin && (
                      <div className="flex items-center gap-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => handleEdit(post, e)}
                          className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(post.id, e)}
                          className="p-1.5 text-foreground/40 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                    <span 
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-foreground group-hover:text-primary transition-colors font-bold"
                    >
                      {language === 'en' ? 'Read Note' : 'อ่านบทความ'} <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* CMS Modals */}
      <PostEditorModal 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        postToEdit={editingPost} 
      />
      
      <PostViewModal 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)} 
        post={viewingPost} 
      />
    </section>
  );
}
