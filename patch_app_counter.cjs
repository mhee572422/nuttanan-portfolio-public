const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
if (!content.includes('VisitorCounter')) {
  content = content.replace(
    "import ScrollProgress from './components/ScrollProgress';",
    "import ScrollProgress from './components/ScrollProgress';\nimport VisitorCounter from './components/VisitorCounter';"
  );
  
  // Add component in footer
  const oldFooterText = `          © {currentYear} Nuttanan Foopun. {language === 'en' ? 'All rights reserved.' : 'สงวนลิขสิทธิ์.'}
        </p>
      </footer>`;
      
  const newFooterText = `          © {currentYear} Nuttanan Foopun. {language === 'en' ? 'All rights reserved.' : 'สงวนลิขสิทธิ์.'}
        </p>
        <VisitorCounter />
      </footer>`;
      
  content = content.replace(oldFooterText, newFooterText);
  fs.writeFileSync('src/App.tsx', content, 'utf8');
}
