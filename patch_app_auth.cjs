const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('AuthProvider')) {
  content = content.replace(
    "import { AnalyticsProvider } from './context/AnalyticsContext';",
    "import { AnalyticsProvider } from './context/AnalyticsContext';\nimport { AuthProvider } from './context/AuthContext';"
  );
  
  content = content.replace(
    "<AnalyticsProvider>",
    "<AnalyticsProvider>\n        <AuthProvider>"
  );
  
  content = content.replace(
    "</AnalyticsProvider>",
    "</AuthProvider>\n      </AnalyticsProvider>"
  );
  
  fs.writeFileSync('src/App.tsx', content, 'utf8');
}
