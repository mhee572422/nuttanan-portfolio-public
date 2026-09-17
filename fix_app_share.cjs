const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Remove the wrongly injected handleShare
const wrongCode = `const handleShare = async () => {
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

if (content.includes(wrongCode)) {
  content = content.replace(wrongCode, "return (");
}

// Now inject it in the correct place, right before the main return statement of AppContent.
// The main return statement is `return (\n    <div className="min-h-screen bg-[#0A0A0A]` or similar.

const correctHookPoint = `return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-[#E0E0E0] selection:bg-[#C5A059] selection:text-[#0A0A0A]">`;

const correctCode = `const handleShare = async () => {
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

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans text-[#E0E0E0] selection:bg-[#C5A059] selection:text-[#0A0A0A]">`;

if (content.includes(correctHookPoint)) {
  content = content.replace(correctHookPoint, correctCode);
} else {
    // If exact match fails, let's use regex
    const regex = /return\s*\(\s*<div className="min-h-screen bg-\[\#0A0A0A\]/;
    content = content.replace(regex, `const handleShare = async () => {
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

  return (
    <div className="min-h-screen bg-[#0A0A0A]`);
}

fs.writeFileSync('src/App.tsx', content, 'utf8');
