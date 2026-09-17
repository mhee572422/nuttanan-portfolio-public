const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add Share2 import
if (!content.includes('Share2')) {
  content = content.replace(
    "import { Download } from 'lucide-react';",
    "import { Download, Share2 } from 'lucide-react';"
  );
}

// Add handleShare function before return statement
const handleShareFunction = `  const handleShare = async () => {
    const shareData = {
      title: title,
      text: description,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(currentUrl);
        alert(language === 'en' ? 'Link copied to clipboard!' : 'คัดลอกลิงก์แล้ว!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (`;
  
content = content.replace("  return (", handleShareFunction);

// Update footer buttons
const oldFooter = `<footer className="bg-[#0A0A0A] text-white/40 py-12 flex flex-col items-center justify-center border-t border-white/10 relative">
        <button 
          onClick={downloadVCard}
          className="mb-8 flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs text-white/80 transition-colors uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
        >
          <Download size={14} />
          {language === 'en' ? 'Save Contact (vCard)' : 'บันทึกข้อมูลติดต่อ (vCard)'}
        </button>
        <div className="flex gap-6 mb-6">`;
        
const newFooter = `<footer className="bg-[#0A0A0A] text-white/40 py-12 flex flex-col items-center justify-center border-t border-white/10 relative">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            onClick={downloadVCard}
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-xs text-white/80 transition-colors uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <Download size={14} />
            {language === 'en' ? 'Save Contact (vCard)' : 'บันทึกข้อมูลติดต่อ (vCard)'}
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center justify-center gap-2 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] px-4 py-2 rounded-full text-xs transition-colors uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <Share2 size={14} />
            {language === 'en' ? 'Share Portfolio' : 'แชร์พอร์ตโฟลิโอ'}
          </button>
        </div>
        <div className="flex gap-6 mb-6">`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync('src/App.tsx', content, 'utf8');
