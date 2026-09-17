const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

// Add import
const importResend = "import { Resend } from 'resend';";
if (!content.includes(importResend)) {
  content = content.replace("import express from 'express';", "import express from 'express';\n" + importResend);
}

// Add API endpoint
const endpoint = `
  // Contact Form API endpoint
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
          subject: \`New Contact Request from \${name}\`,
          text: \`Name: \${name}\\nEmail: \${email}\\n\\nMessage:\\n\${message}\`,
          replyTo: email
        });
      } else {
        // Simulate delay and log to console if no API key is provided
        console.log('\\n--- NEW CONTACT MESSAGE ---');
        console.log(\`From: \${name} <\${email}>\`);
        console.log(\`Message: \${message}\`);
        console.log('---------------------------\\n');
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Error handling contact form:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });
`;

if (!content.includes('/api/contact')) {
  content = content.replace("// Vite middleware for development", endpoint + "\n  // Vite middleware for development");
}

fs.writeFileSync('server.ts', content, 'utf8');
