import fs from 'fs';
import express from 'express';
import { Resend } from 'resend';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { experiences, skillCategories, projects, certifications } from './src/data.ts';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Chatbot API endpoint
  app.post('/api/chat', async (req, res) => {
    const { message, language } = req.body;
    try {

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Create a context string from the portfolio data
      const contextData = {
        skills: skillCategories[language as 'en' | 'th'] || skillCategories['th'],
        experiences: experiences[language as 'en' | 'th'] || experiences['th'],
        projects: projects[language as 'en' | 'th'] || projects['th'],
        certifications: certifications[language as 'en' | 'th'] || certifications['th'],
      };

      const systemPrompt = `You are a helpful AI assistant for Nuttanan's portfolio website. 
You act as Nuttanan's personal representative.
Answer questions politely and concisely based ONLY on the following portfolio data. 
If asked about something not in the data, say you don't have that information but they can contact Nuttanan directly at nuttanan.f@gmail.com.
Respond in the language requested: ${language === 'en' ? 'English' : 'Thai'}.
When answering in Thai, use polite particles like ครับ.

Portfolio Data:
${JSON.stringify(contextData, null, 2)}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: message,
        config: {
          systemInstruction: systemPrompt,
          
          // thinking mode does not allow maxOutputTokens to be set, so omit it.
        }
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.warn('AI API high demand, using fallback for chat.');
      
      // Provide a graceful fallback if the Gemini API is unavailable (e.g., 503 Overloaded or 429 Quota Exceeded)
      const fallbackReply = language === 'en' 
        ? "I am currently experiencing high demand and cannot connect to my intelligence core. Please contact Nuttanan directly at nuttanan.f@gmail.com."
        : "ขณะนี้ระบบมีผู้ใช้งานจำนวนมาก ทำให้ไม่สามารถเชื่อมต่อกับระบบ AI ได้ กรุณาติดต่อคุณณัฐนันท์โดยตรงที่ nuttanan.f@gmail.com ครับ";
        
      res.json({ reply: fallbackReply, isFallback: true });
    }
  });

  

  // AI Lab endpoints
  app.post('/api/generate/:type', async (req, res) => {
    try {
      const { type } = req.params;
      const { prompt } = req.body;
      
      if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

      // If we hit quota issues, we want to at least attempt the API
      // so the user knows it's real code.
      if (type === 'image') {
        const interaction = await ai.interactions.create({
          model: 'gemini-3.1-flash-image-preview', // Requested by user constraint
          input: prompt,
          response_modalities: ['image'],
        });
        
        // Find image output
        let imageData = null;
        let mimeType = null;
        for (const step of interaction.steps || []) {
          if (step.type === 'model_output') {
            const imgContent = step.content?.find(c => c.type === 'image');
            if (imgContent && imgContent.data) {
              imageData = imgContent.data;
              mimeType = imgContent.mime_type || 'image/png';
            }
          }
        }
        if (imageData) {
          return res.json({ data: imageData, mimeType });
        }
      } else if (type === 'music') {
        const response = await ai.models.generateContentStream({
          model: 'lyria-3-clip-preview',
          contents: prompt,
        });
        let audioBase64 = "";
        let mimeType = "audio/wav";
        for await (const chunk of response) {
          const parts = chunk.candidates?.[0]?.content?.parts;
          if (!parts) continue;
          for (const part of parts) {
            if (part.inlineData?.data) {
              if (!audioBase64 && part.inlineData.mimeType) mimeType = part.inlineData.mimeType;
              audioBase64 += part.inlineData.data;
            }
          }
        }
        if (audioBase64) {
          return res.json({ data: audioBase64, mimeType });
        }
      } else if (type === 'video') {
        const interaction = await ai.interactions.create({
          model: 'veo-3.1-fast-generate-preview', // Or gemini-omni-1.1-flash
          input: prompt,
          background: false,
          store: false,
          stream: false,
          response_format: { type: 'video', aspect_ratio: '16:9' }
        }, { timeout: 300000 });
        
        const videoPart = interaction.output_video;
        if (videoPart && videoPart.data) {
          return res.json({ data: videoPart.data, mimeType: videoPart.mime_type || 'video/mp4' });
        }
      }
      
      throw new Error("No output generated or unsupported type");
    } catch (error: any) {
      console.warn('AI Generation High Demand / Error:', error.message);
      res.status(500).json({ error: error.message || 'Generation failed' });
    }
  });

  // Contact Form API endpoint

  let cachedSkillsSummary = { en: '', th: '' };

  app.get('/api/skills-summary', async (req, res) => {
    const lang = (req.query.language === 'th' ? 'th' : 'en');
    
    if (cachedSkillsSummary[lang]) {
      return res.json({ summary: cachedSkillsSummary[lang] });
    }

    try {
      const skillsData = skillCategories[lang] || skillCategories['en'];
      
      const prompt = `Analyze the following skills list for an IT professional and write a brief, professional summary (1-2 sentences) of their core competencies. 
      Focus on their strongest areas based on proficiency.
      Respond in ${lang === 'en' ? 'English' : 'Thai'}. 
      Skills: ${JSON.stringify(skillsData)}
      Do not include any greetings, just the professional summary paragraph. No markdown formatting.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
      });

      cachedSkillsSummary[lang] = response.text.trim();
      res.json({ summary: cachedSkillsSummary[lang] });
    } catch (error) {
      console.warn('AI API high demand, using fallback for skills summary.');
      
      // Provide a graceful fallback if the Gemini API is unavailable (e.g., 503 Overloaded)
      const fallbackSummary = lang === 'en' 
        ? "Highly skilled professional with extensive experience across modern cloud architectures, agentic AI frameworks, and distributed data pipelines."
        : "ผู้เชี่ยวชาญระดับสูงที่มีประสบการณ์อย่างกว้างขวางในสถาปัตยกรรมคลาวด์ยุคใหม่, โครงสร้างระบบ AI แบบเอเจนต์, และไปป์ไลน์ข้อมูลแบบกระจาย";
        
      res.json({ summary: fallbackSummary, isFallback: true });
    }
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'nuttanan.f@gmail.com', // Your email
          subject: `New Contact Request from ${name}`,
          html: `<h3>New Contact Request</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
          replyTo: email
        });
      } else {
        // Simulate delay and log to console if no API key is provided
        console.log('\n--- NEW CONTACT MESSAGE ---');
        console.log(`From: ${name} <${email}>`);
        console.log(`Message: ${message}`);
        console.log('---------------------------\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error handling contact form:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  
  // RSS Feed endpoint
  app.get('/rss.xml', (req, res) => {
    try {
      const enProjects = projects['en'] || [];
      const domain = req.protocol + '://' + req.get('host');
      
      const items = enProjects.map(p => {
        const milestonesHtml = (p.milestones && p.milestones.length > 0)
          ? `<h3>Milestones</h3><ul>${p.milestones.map(m => `<li><strong>${m.phase} (${m.date})</strong>: ${m.description}</li>`).join('')}</ul>`
          : '';
          
        return `
      <item>
        <title><![CDATA[${p.title}]]></title>
        <link>${domain}/?project=${p.id}</link>
        <description><![CDATA[
          <p>${p.detailedDescription || p.description}</p>
          ${milestonesHtml}
        ]]></description>
        <pubDate>${new Date(p.year ? p.year : new Date().getFullYear().toString()).toUTCString()}</pubDate>
        <guid>${domain}/?project=${p.id}</guid>
      </item>`;
      }).join('');

      const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[Professional Portfolio Updates]]></title>
    <description><![CDATA[Activity and milestones from my latest projects.]]></description>
    <link>${domain}</link>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

      res.set('Content-Type', 'application/rss+xml');
      res.send(rssXml);
    } catch (error) {
      console.error('Error generating RSS feed:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
      
      const projectId = req.query.project;
      if (projectId) {
        const project = projects['en']?.find(p => p.id === projectId);
        if (project) {
          const ogTags = `
    <title>${project.title} | Portfolio</title>
    <meta property="og:title" content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <meta property="og:image" content="${project.imageUrl}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${project.title}" />
    <meta name="twitter:description" content="${project.description}" />
    <meta name="twitter:image" content="${project.imageUrl}" />`;
          html = html.replace('</head>', ogTags + '\n  </head>');
        }
      }
      res.send(html);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
