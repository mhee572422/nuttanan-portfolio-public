const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const endpoints = `
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
      console.error('AI Generation Error:', error);
      res.status(500).json({ error: error.message || 'Generation failed' });
    }
  });

  // Contact Form API endpoint
`;

code = code.replace('  // Contact Form API endpoint', endpoints);
fs.writeFileSync('server.ts', code);
