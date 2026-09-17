const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

// The useEffect for the AI summary accidentally got its dependency changed to [filteredSkillCategories]
code = code.replace(
  "return () => { isMounted = false; };\n  }, [filteredSkillCategories]);",
  "return () => { isMounted = false; };\n  }, [language]);"
);

// We also need to fix the radarData useMemo dependency, which was missed
code = code.replace(
  "    }));\n  }, [language]);",
  "    }));\n  }, [filteredSkillCategories, language]);"
);

fs.writeFileSync('src/components/Skills.tsx', code);
