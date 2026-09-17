const fs = require('fs');

let content = fs.readFileSync('src/context/AnalyticsContext.tsx', 'utf8');

content = content.replace(
  "import { createContext, useContext, useEffect, useState, ReactNode } from 'react';",
  "import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';"
);

content = content.replace(
  "  const trackEvent = (eventName: string, eventData?: any) => {",
  "  const trackEvent = useCallback((eventName: string, eventData?: any) => {"
);

content = content.replace(
  "      return updated;\n    });\n  };",
  "      return updated;\n    });\n  }, []);"
);

content = content.replace(
  "  const clearEvents = () => {",
  "  const clearEvents = useCallback(() => {"
);

content = content.replace(
  "    localStorage.removeItem('portfolio_analytics');\n  };",
  "    localStorage.removeItem('portfolio_analytics');\n  }, []);"
);

fs.writeFileSync('src/context/AnalyticsContext.tsx', content, 'utf8');

