const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

// Insert filtered categories hook
const hookInsert = `
  const filteredSkillCategories = useMemo(() => {
    return skillCategories[language].map(category => {
      const filteredSkills = category.skills.filter(skill => {
        if (filterMode === 'all') return true;
        if (filterMode === 'verified') return skill.isVerified;
        if (filterMode === 'self') return !skill.isVerified;
        return true;
      });
      return { ...category, skills: filteredSkills };
    }).filter(category => category.skills.length > 0);
  }, [language, filterMode]);
`;

code = code.replace("const radarData = useMemo(() => {", hookInsert + "\n  const radarData = useMemo(() => {");

// Now replace skillCategories[language] with filteredSkillCategories inside useMemo for radarData and experienceGroups, and also in the render loop.
// Note: wait, radarData uses skillCategories[language], let's change that:
code = code.replace("return skillCategories[language].map(category => ({", "return filteredSkillCategories.map(category => ({");
code = code.replace("}, [language]);", "}, [filteredSkillCategories]);"); // first occurrence is radarData
code = code.replace("skillCategories[language].forEach(category => {", "filteredSkillCategories.forEach(category => {");
// replace second occurrence of }, [language]); with }, [filteredSkillCategories, language]);
code = code.replace("return groups.filter(g => g.skills.length > 0);\n  }, [language]);", "return groups.filter(g => g.skills.length > 0);\n  }, [filteredSkillCategories, language]);");

// Render loop:
code = code.replace("skillCategories[language].map((category, idx) =>", "filteredSkillCategories.map((category, idx) =>");

fs.writeFileSync('src/components/Skills.tsx', code);
