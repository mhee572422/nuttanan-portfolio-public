const fs = require('fs');

// --- 1. PATCH PrintView.tsx ---
let printViewContent = fs.readFileSync('src/components/PrintView.tsx', 'utf8');

const imports = `import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadResumeAsPDF = async (): Promise<boolean> => {
  const originalElement = document.getElementById('resume-print-view');
  if (!originalElement) return false;

  // Clone element to prevent UI flashes and allow off-screen rendering
  const clone = originalElement.cloneNode(true) as HTMLElement;
  clone.style.display = 'block';
  clone.style.position = 'absolute';
  clone.style.top = '-9999px';
  clone.style.left = '0';
  clone.style.width = '800px'; 
  clone.style.backgroundColor = '#ffffff';
  document.body.appendChild(clone);

  try {
    const canvas = await html2canvas(clone, { 
      scale: 2, // High DPI for crisp text
      useCORS: true, 
      logging: false 
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Nuttanan_Professional_Resume.pdf');
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  } finally {
    document.body.removeChild(clone);
  }
};
`;

if (!printViewContent.includes('jsPDF')) {
  printViewContent = printViewContent.replace("import { QRCodeSVG } from 'qrcode.react';", "import { QRCodeSVG } from 'qrcode.react';\n" + imports);
}

if (!printViewContent.includes('id="resume-print-view"')) {
  printViewContent = printViewContent.replace(
    '<div className="hidden print:block bg-white text-black p-8 font-sans mx-auto max-w-4xl relative">',
    '<div id="resume-print-view" className="hidden print:block bg-white text-black p-8 font-sans mx-auto max-w-4xl relative">'
  );
}

fs.writeFileSync('src/components/PrintView.tsx', printViewContent, 'utf8');

// --- 2. PATCH ResumePreviewModal.tsx ---
let modalContent = fs.readFileSync('src/components/ResumePreviewModal.tsx', 'utf8');

if (!modalContent.includes('downloadResumeAsPDF')) {
  modalContent = modalContent.replace(
    "import { useAnalytics } from '../context/AnalyticsContext';",
    "import { useAnalytics } from '../context/AnalyticsContext';\nimport { downloadResumeAsPDF } from './PrintView';"
  );
}

const newHandleDownload = `const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    trackEvent('resume_download_started', { component: 'ResumePreviewModal', language, emailProvided: !!email });
    
    // Call the actual PDF generator
    const success = await downloadResumeAsPDF();
    
    if (success) {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
        onClose();
      }, 2000);
    } else {
      setIsSubmitting(false);
      alert(language === 'en' ? 'Failed to generate PDF. Please try again.' : 'สร้าง PDF ไม่สำเร็จ กรุณาลองใหม่');
    }
  };`;

// Replace the old handleDownload block safely
modalContent = modalContent.replace(
  /const handleDownload = \(e: React\.FormEvent\) => \{[\s\S]*?\}, 800\);\n  \};/,
  newHandleDownload
);

fs.writeFileSync('src/components/ResumePreviewModal.tsx', modalContent, 'utf8');

