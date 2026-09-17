import { useLanguage } from '../context/LanguageContext';
import { experiences, skillCategories, projects, certifications } from '../data';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

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
    const scale = 2;
    const style = {
      transform: `scale(${scale})`,
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

    console.error('Error generating PDF:', error);
    return false;
  } finally {
    document.body.removeChild(clone);
  }
};


export default function PrintView() {
  const { language } = useLanguage();
  const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://nuttanan.dev';

  return (
    <div id="resume-print-view" className="hidden print:block bg-foreground text-black p-8 font-sans mx-auto max-w-4xl relative">
      <header className="border-b-2 border-black pb-6 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold mb-2">Nuttanan Foopun</h1>
          <p className="text-xl text-gray-600 mb-4">
            {language === 'en' ? 'Lead Systems Administrator & Architect' : 'ผู้ดูแลระบบอาวุโส และ สถาปนิกระบบ'}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>nuttanan.f@gmail.com</span>
            <span>•</span>
            <span>github.com/mhee572422</span>
            <span>•</span>
            <span>nuttanan.dev</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <QRCodeSVG value={currentUrl} size={80} level="M" includeMargin={false} />
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">
            {language === 'en' ? 'Live Portfolio' : 'พอร์ตโฟลิโอออนไลน์'}
          </span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-widest text-gray-800">
          {language === 'en' ? 'Experience' : 'ประสบการณ์'}
        </h2>
        <div className="space-y-6">
          {experiences[language]?.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold">{exp.role}</h3>
                <span className="text-sm font-mono text-gray-600">{exp.period}</span>
              </div>
              <p className="text-md font-medium text-gray-700 mb-2">{exp.company}</p>
              <p className="text-sm text-gray-600 mb-2">{exp.description}</p>
              {exp.accomplishments && exp.accomplishments.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {exp.accomplishments.map((acc, idx) => (
                    <li key={idx}>{acc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-widest text-gray-800">
          {language === 'en' ? 'Skills' : 'ทักษะ'}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {skillCategories[language]?.map((cat) => (
            <div key={cat.id}>
              <h3 className="font-bold text-gray-800 mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-600">
                {cat.skills.map(s => s.name).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-widest text-gray-800">
          {language === 'en' ? 'Selected Projects' : 'โปรเจกต์'}
        </h2>
        <div className="space-y-6">
          {projects[language]?.filter(p => p.isFeatured).map((project) => (
            <div key={project.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <span className="text-sm font-mono text-gray-600">{project.year || ''}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{project.description}</p>
              {project.techStack && (
                <p className="text-xs text-gray-500 font-mono">
                  {language === 'en' ? 'Tech: ' : 'เทคโนโลยี: '}{project.techStack.join(' • ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {certifications[language] && certifications[language].length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-widest text-gray-800">
            {language === 'en' ? 'Certifications' : 'ใบรับรอง'}
          </h2>
          <div className="space-y-4">
            {certifications[language].map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-md font-bold">{cert.title}</h3>
                  <span className="text-sm font-mono text-gray-600">{cert.date}</span>
                </div>
                <p className="text-sm text-gray-700">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
