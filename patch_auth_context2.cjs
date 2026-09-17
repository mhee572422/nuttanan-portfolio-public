const fs = require('fs');
let code = fs.readFileSync('src/context/AuthContext.tsx', 'utf8');

code = code.replace(
  /if \(adminSnap\.exists\(\)\) setIsAdmin\(true\);/,
  "if (adminSnap.exists()) { setIsAdmin(true); } else if (currentUser.email === 'nuttanan.f@gmail.com') { await setDoc(adminRef, { email: currentUser.email }); setIsAdmin(true); }"
);

fs.writeFileSync('src/context/AuthContext.tsx', code);
