import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Eye, Edit2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../lib/firebase';
import { collection, doc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Post } from '../types';
import Markdown from 'react-markdown';
import { useAuth } from '../context/AuthContext';

interface PostEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  postToEdit?: Post | null;
}

export default function PostEditorModal({ isOpen, onClose, postToEdit }: PostEditorModalProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title_en: '',
    title_th: '',
    excerpt_en: '',
    excerpt_th: '',
    content_en: '',
    content_th: '',
    category: 'Tech',
    tag: '',
    readTime: '5 min read',
    published: true,
  });

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        title_en: postToEdit.title_en || '',
        title_th: postToEdit.title_th || '',
        excerpt_en: postToEdit.excerpt_en || '',
        excerpt_th: postToEdit.excerpt_th || '',
        content_en: postToEdit.content_en || '',
        content_th: postToEdit.content_th || '',
        category: postToEdit.category || 'Tech',
        tag: postToEdit.tag || '',
        readTime: postToEdit.readTime || '5 min read',
        published: postToEdit.published ?? true,
      });
    } else {
      setFormData({
        title_en: '',
        title_th: '',
        excerpt_en: '',
        excerpt_th: '',
        content_en: '',
        content_th: '',
        category: 'Tech',
        tag: '',
        readTime: '5 min read',
        published: true,
      });
    }
    setActiveTab('edit');
    setError('');
  }, [postToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!user) return;
    setIsSubmitting(true);
    setError('');
    
    try {
      const postData = {
        ...formData,
        authorId: user.uid,
        updatedAt: serverTimestamp(),
      };

      if (postToEdit?.id) {
        // Update existing
        await setDoc(doc(db, 'posts', postToEdit.id), postData, { merge: true });
      } else {
        // Create new
        await addDoc(collection(db, 'posts'), {
          ...postData,
          createdAt: serverTimestamp(),
        });
      }
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-surface border border-foreground/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-foreground/10 bg-surface/50">
            <h2 className="text-xl font-serif text-foreground">
              {postToEdit ? 'Edit Post' : 'New Post'}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'edit' ? 'bg-primary text-background' : 'text-foreground/60 hover:bg-foreground/5'}`}
              >
                <Edit2 size={14} /> Edit
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs uppercase tracking-widest font-bold transition-colors ${activeTab === 'preview' ? 'bg-primary text-background' : 'text-foreground/60 hover:bg-foreground/5'}`}
              >
                <Eye size={14} /> Preview
              </button>
              <button onClick={onClose} className="p-2 text-foreground/50 hover:text-foreground transition-colors rounded-sm hover:bg-foreground/5">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-sm text-sm">
                {error}
              </div>
            )}

            {activeTab === 'edit' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-foreground/10 pb-2">English</h3>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Title (EN)</label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Excerpt (EN)</label>
                    <textarea
                      value={formData.excerpt_en}
                      onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 h-24 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Content (EN) - Markdown</label>
                    <textarea
                      value={formData.content_en}
                      onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 h-64 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-foreground/10 pb-2">Thai</h3>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Title (TH)</label>
                    <input
                      type="text"
                      value={formData.title_th}
                      onChange={(e) => setFormData({ ...formData, title_th: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Excerpt (TH)</label>
                    <textarea
                      value={formData.excerpt_th}
                      onChange={(e) => setFormData({ ...formData, excerpt_th: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 h-24 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Content (TH) - Markdown</label>
                    <textarea
                      value={formData.content_th}
                      onChange={(e) => setFormData({ ...formData, content_th: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 h-64 font-mono"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 p-4 border border-foreground/10 rounded-sm bg-background/50">
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                      <option value="Tech">Tech</option>
                      <option value="Life">Life</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Tag (e.g. AI & Agents)</label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-foreground/60 mb-1">Read Time (e.g. 5 min)</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full bg-background border border-foreground/10 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer mt-4">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="rounded border-foreground/20 text-primary focus:ring-primary/50 bg-background"
                      />
                      <span className="text-sm font-bold uppercase tracking-widest text-foreground">Published</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-foreground/10 pb-2 mb-4">English Preview</h3>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <h1>{formData.title_en}</h1>
                    <div className="markdown-body">
                      <Markdown>{formData.content_en}</Markdown>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-primary uppercase tracking-widest border-b border-foreground/10 pb-2 mb-4">Thai Preview</h3>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <h1>{formData.title_th}</h1>
                    <div className="markdown-body">
                      <Markdown>{formData.content_th}</Markdown>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-foreground/10 bg-surface/50 flex justify-end gap-4">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-primary text-background px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
            >
              <Save size={14} />
              {isSubmitting ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
