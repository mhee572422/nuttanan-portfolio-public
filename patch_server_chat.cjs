const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `res.status(500).json({ error: 'Internal Server Error' });`;
const fallback = `
      // Provide a graceful fallback if the Gemini API is unavailable (e.g., 503 Overloaded or 429 Quota Exceeded)
      const fallbackReply = language === 'en' 
        ? "I am currently experiencing high demand and cannot connect to my intelligence core. Please contact Nuttanan directly at nuttanan.f@gmail.com."
        : "ขณะนี้ระบบมีผู้ใช้งานจำนวนมาก ทำให้ไม่สามารถเชื่อมต่อกับระบบ AI ได้ กรุณาติดต่อคุณณัฐนันท์โดยตรงที่ nuttanan.f@gmail.com ครับ";
        
      res.json({ reply: fallbackReply, isFallback: true });`;

code = code.replace(target, fallback);
fs.writeFileSync('server.ts', code);
