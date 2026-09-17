const fs = require('fs');
let content = fs.readFileSync('src/components/CommandPalette.tsx', 'utf8');

content = content.replace(
  `? "Hi! I am Nuttanan Foopun's Smart Portfolio Assistant. You can ask me anything about his experience, skills, or projects!"`,
  `? "Hi! I am Nuttanan Foopun's Smart Portfolio Assistant. You can ask me anything about his experience, skills, or projects!\\n\\n💡 Tip: Power users can press single keys like 'H' (Home), 'A' (About), 'P' (Projects), or 'C' (Contact) to quick-navigate!"`
);

content = content.replace(
  `: "สวัสดีครับ! ผมคือผู้ช่วยพอร์ตโฟลิโออัจฉริยะของคุณณัฐนันท์ คุณสามารถถามเกี่ยวกับประสบการณ์ทำงาน ทักษะ หรือโปรเจกต์ต่างๆ ได้เลยครับ!"`,
  `: "สวัสดีครับ! ผมคือผู้ช่วยพอร์ตโฟลิโออัจฉริยะของคุณณัฐนันท์ คุณสามารถถามเกี่ยวกับประสบการณ์ทำงาน ทักษะ หรือโปรเจกต์ต่างๆ ได้เลยครับ!\\n\\n💡 ทิปส์: คุณสามารถกดปุ่มบนคีย์บอร์ดเช่น 'H' (หน้าแรก), 'P' (ผลงาน), หรือ 'C' (ติดต่อ) เพื่อนำทางอย่างรวดเร็วได้เลยครับ!"`
);

fs.writeFileSync('src/components/CommandPalette.tsx', content, 'utf8');
