const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const hookPoint = `app.post('/api/contact', async (req, res) => {`;

const newCode = `let cachedSkillsSummary = { en: '', th: '' };

  app.get('/api/skills-summary', async (req, res) => {
    const lang = (req.query.language === 'th' ? 'th' : 'en');
    
    if (cachedSkillsSummary[lang]) {
      return res.json({ summary: cachedSkillsSummary[lang] });
    }

    try {
      const skillsData = skillCategories[lang] || skillCategories['en'];
      
      const prompt = \`Analyze the following skills list for an IT professional and write a brief, professional summary (1-2 sentences) of their core competencies. 
      Focus on their strongest areas based on proficiency.
      Respond in \${lang === 'en' ? 'English' : 'Thai'}. 
      Skills: \${JSON.stringify(skillsData)}
      Do not include any greetings, just the professional summary paragraph. No markdown formatting.\`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
      });

      cachedSkillsSummary[lang] = response.text.trim();
      res.json({ summary: cachedSkillsSummary[lang] });
    } catch (error) {
      console.error('Error generating skills summary:', error);
      res.status(500).json({ error: 'Failed to generate summary' });
    }
  });

  app.post('/api/contact', async (req, res) => {`;

content = content.replace(hookPoint, newCode);
fs.writeFileSync('server.ts', content, 'utf8');
