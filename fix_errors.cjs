const fs = require('fs');

// --- 1. Fix server.ts (Gemini Rate Limits) ---
let serverContent = fs.readFileSync('server.ts', 'utf8');

serverContent = serverContent.replace(
  "model: 'gemini-3.1-pro-preview',",
  "model: 'gemini-3.5-flash',"
);
serverContent = serverContent.replace(
  "thinkingConfig: { thinkingBudget: 1024 },",
  ""
);

fs.writeFileSync('server.ts', serverContent, 'utf8');

// --- 2. Fix PrintView.tsx (dom-to-image instead of html2canvas) ---
let printViewContent = fs.readFileSync('src/components/PrintView.tsx', 'utf8');

printViewContent = printViewContent.replace(
  "import html2canvas from 'html2canvas';",
  "import domtoimage from 'dom-to-image';"
);

const newPdfLogic = `
  try {
    const scale = 2;
    const style = {
      transform: \`scale(\${scale})\`,
      transformOrigin: 'top left',
      width: clone.offsetWidth + 'px',
      height: clone.offsetHeight + 'px'
    };

    const param = {
      height: clone.offsetHeight * scale,
      width: clone.offsetWidth * scale,
      quality: 1,
      style,
      bgcolor: '#ffffff'
    };

    const imgData = await domtoimage.toJpeg(clone, param);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (clone.offsetHeight * pdfWidth) / clone.offsetWidth;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Nuttanan_Foopun_Resume.pdf');
    return true;
  } catch (error) {
`;

printViewContent = printViewContent.replace(
  /try\s*\{\s*const canvas = await html2canvas[\s\S]*?return true;\s*\}\s*catch \(error\)\s*\{/,
  newPdfLogic
);

fs.writeFileSync('src/components/PrintView.tsx', printViewContent, 'utf8');

