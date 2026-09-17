const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import if needed
if (!content.includes('import { useState, useEffect }')) {
  content = content.replace("import { useState } from 'react';", "import { useState, useEffect } from 'react';");
}

// Modify title logic in AppContent
const oldTitleLine = "const title = language === 'en' ? 'Nuttanan | Professional Web Developer' : 'Nuttanan | นักพัฒนาเว็บไซต์มืออาชีพ';";

const newTitleLogic = `
  const baseTitle = language === 'en' ? 'Nuttanan | Professional Web Developer' : 'Nuttanan | นักพัฒนาเว็บไซต์มืออาชีพ';
  const [title, setTitle] = useState(baseTitle);

  useEffect(() => {
    setTitle(baseTitle);
  }, [baseTitle]);

  useEffect(() => {
    let timeoutId;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTitle(language === 'en' ? 'Away | ' + baseTitle : 'ไม่อยู่ | ' + baseTitle);
      } else {
        setTitle(language === 'en' ? 'Active Session | ' + baseTitle : 'เซสชันเปิดใช้งาน | ' + baseTitle);
        timeoutId = setTimeout(() => {
          setTitle(baseTitle);
        }, 3000);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [baseTitle, language]);
`;

content = content.replace(oldTitleLine, newTitleLogic);

fs.writeFileSync('src/App.tsx', content, 'utf8');
