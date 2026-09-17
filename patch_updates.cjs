const fs = require('fs');
let code = fs.readFileSync('src/components/Updates.tsx', 'utf8');

code = code.replace(
  /import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase\/firestore';/,
  "import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';"
);

code = code.replace(
  /const q = query\(collection\(db, 'posts'\), orderBy\('createdAt', 'desc'\)\);/,
  "let q: any = collection(db, 'posts');\n    if (!isAdmin) {\n      q = query(collection(db, 'posts'), where('published', '==', true));\n    }"
);

code = code.replace(
  /setPosts\(fetchedPosts\);\n      setLoading\(false\);/,
  "fetchedPosts.sort((a, b) => {\n        const timeA = a.createdAt?.seconds || 0;\n        const timeB = b.createdAt?.seconds || 0;\n        return timeB - timeA;\n      });\n      setPosts(fetchedPosts);\n      setLoading(false);"
);

code = code.replace(
  /return unsubscribe;\n  }, \[\]\);/,
  "return unsubscribe;\n  }, [isAdmin]);"
);

fs.writeFileSync('src/components/Updates.tsx', code);
