const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// add imports
const importsToAdd = `import PrintView from './components/PrintView';
import ActivitySection from './components/ActivitySection';
`;

content = content.replace("import { useState } from 'react';", "import { useState } from 'react';\n" + importsToAdd);

// wrap AppContent inside print:hidden div except for PrintView
content = content.replace(
  '<div className="min-h-screen bg-[#0A0A0A] font-sans text-[#E0E0E0] selection:bg-[#C5A059] selection:text-[#0A0A0A]">' +
  '\n      <Helmet>',
  '<div className="min-h-screen bg-[#0A0A0A] font-sans text-[#E0E0E0] selection:bg-[#C5A059] selection:text-[#0A0A0A]">\n      <PrintView />\n      <div className="print:hidden">\n      <Helmet>'
);

content = content.replace(
  '    </div>\n  );\n}\n\nexport default function App()',
  '      </div>\n    </div>\n  );\n}\n\nexport default function App()'
);

// add ActivitySection after Portfolio
content = content.replace(
  '<Portfolio />\n        <SectionSeparator />',
  '<Portfolio />\n        <SectionSeparator />\n        <ActivitySection />\n        <SectionSeparator />'
);

fs.writeFileSync('src/App.tsx', content, 'utf8');
