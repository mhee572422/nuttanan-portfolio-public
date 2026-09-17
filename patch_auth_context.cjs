const fs = require('fs');
let code = fs.readFileSync('src/context/AuthContext.tsx', 'utf8');

if (!code.includes('isAdmin')) {
  code = code.replace(
    /user: User \| null;/,
    "user: User | null;\n  isAdmin: boolean;"
  );
  
  code = code.replace(
    /const \[user, setUser\] = useState<User \| null>\(null\);/,
    "const [user, setUser] = useState<User | null>(null);\n  const [isAdmin, setIsAdmin] = useState(false);"
  );
  
  code = code.replace(
    /setUser\(currentUser\);/,
    "setUser(currentUser);\n            setIsAdmin(false);"
  );
  
  code = code.replace(
    /const userSnap = await getDoc\(userRef\);/,
    "const userSnap = await getDoc(userRef);\n          const adminRef = doc(db, 'admins', currentUser.uid);\n          const adminSnap = await getDoc(adminRef);\n          if (adminSnap.exists()) setIsAdmin(true);"
  );

  code = code.replace(
    /value={{ user, loading, signInWithGoogle, logout }}/,
    "value={{ user, isAdmin, loading, signInWithGoogle, logout }}"
  );

  fs.writeFileSync('src/context/AuthContext.tsx', code);
}
