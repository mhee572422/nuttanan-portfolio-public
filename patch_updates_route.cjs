const fs = require('fs');
let code = fs.readFileSync('src/components/Updates.tsx', 'utf8');

// Add link icon import
code = code.replace(
  /from 'lucide-react';/,
  "from 'lucide-react';"
);
if (!code.includes('Link as LinkIcon')) {
  code = code.replace(
    /import { Rss, Calendar, ArrowUpRight, Tag, Plus, Edit2, Trash2 } from 'lucide-react';/,
    "import { Rss, Calendar, ArrowUpRight, Tag, Plus, Edit2, Trash2, Link as LinkIcon, Check } from 'lucide-react';"
  );
}

// Add state for copied link in card
if (!code.includes('copiedId')) {
  code = code.replace(
    /const \[viewingPost, setViewingPost\] = useState<Post \| null>\(null\);/,
    `const [viewingPost, setViewingPost] = useState<Post | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);`
  );
}

// Add useEffect for initial route processing
if (!code.includes("const queryParams = new URLSearchParams(window.location.search);")) {
  code = code.replace(
    /useEffect\(\(\) => \{\n    let q: any = collection\(db, 'posts'\);/,
    `useEffect(() => {
    // Check URL for post query parameter
    if (typeof window !== 'undefined') {
      const queryParams = new URLSearchParams(window.location.search);
      const postId = queryParams.get('post');
      
      // We can't immediately set viewingPost because we don't have the posts loaded yet.
      // So we'll handle this in the onSnapshot callback.
    }
  }, []);

  useEffect(() => {
    let q: any = collection(db, 'posts');`
  );
}

// Modify the onSnapshot callback to open post if in URL
code = code.replace(
  /setPosts\(fetchedPosts\);\n      setLoading\(false\);/,
  `setPosts(fetchedPosts);
      setLoading(false);
      
      if (typeof window !== 'undefined') {
        const queryParams = new URLSearchParams(window.location.search);
        const urlPostId = queryParams.get('post');
        if (urlPostId && !viewingPost) {
          const postToOpen = fetchedPosts.find(p => p.id === urlPostId);
          if (postToOpen) {
            setViewingPost(postToOpen);
            setIsViewOpen(true);
          }
        }
      }`
);

// Update handleView to push state
code = code.replace(
  /const handleView = \(post: Post\) => \{\n    setViewingPost\(post\);\n    setIsViewOpen\(true\);\n  \};/,
  `const handleView = (post: Post) => {
    setViewingPost(post);
    setIsViewOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', \`/?post=\${post.id}\`);
    }
  };
  
  const handleCloseView = () => {
    setIsViewOpen(false);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };
  
  const copyPostLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const link = \`\${window.location.origin}/?post=\${id}\`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };`
);

// Update PostViewModal close handler
code = code.replace(
  /onClose=\{() => setIsViewOpen\(false\)\}/,
  "onClose={handleCloseView}"
);

// Add Copy Link button in the card
code = code.replace(
  /<button \n                           onClick=\{\(e\) => handleEdit\(post, e\)\}/,
  `
                        <button
                          onClick={(e) => copyPostLink(e, post.id)}
                          className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                          title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
                        >
                          {copiedId === post.id ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} />}
                        </button>
                        <button 
                           onClick={(e) => handleEdit(post, e)}`
);

// Add the Copy Link button for non-admins as well, inside the non-admin portion. Wait, the edit buttons are inside `if (isAdmin)`.
// We should put the Copy button outside `if (isAdmin)` so anyone can copy.
// Let's manually replace that section.
