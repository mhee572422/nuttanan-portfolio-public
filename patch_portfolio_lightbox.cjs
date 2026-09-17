const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Add Chevron imports
if (!code.includes('ChevronLeft')) {
  code = code.replace(
    /import \{ ExternalLink, Search, X, Github, Clock, Code, Folder, Maximize2 \} from 'lucide-react';/,
    "import { ExternalLink, Search, X, Github, Clock, Code, Folder, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';"
  );
}

// Ensure it's imported in case the previous regex failed
if (!code.includes('ChevronLeft')) {
  code = code.replace(
    /from 'lucide-react';/,
    ", ChevronLeft, ChevronRight } from 'lucide-react';"
  );
}

// Add the Lightbox markup before the final closing tags
const closingTags = `    </motion.section>
  );
}`;

const lightboxMarkup = `
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxOpen(false)}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-2 rounded-full backdrop-blur-md transition-colors z-10"
            >
              <X size={24} />
            </button>
            
            <div 
              className="relative max-w-5xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center mb-6">
                <img 
                  src={[selectedProject.imageUrl, ...(selectedProject.gallery || [])][activeImageIndex]}
                  alt={selectedProject.title}
                  className="max-w-full max-h-full object-contain rounded-sm"
                />
                
                {([selectedProject.imageUrl, ...(selectedProject.gallery || [])].length > 1) && (
                  <>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setActiveImageIndex((prev) => 
                          prev === 0 ? [selectedProject.imageUrl, ...(selectedProject.gallery || [])].length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full backdrop-blur-md hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setActiveImageIndex((prev) => 
                          prev === [selectedProject.imageUrl, ...(selectedProject.gallery || [])].length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full backdrop-blur-md hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              <div className="text-center text-white/80 max-w-2xl">
                <h3 className="text-xl font-serif text-white mb-2">{selectedProject.title}</h3>
                <p className="text-sm opacity-80">{selectedProject.description}</p>
                <div className="mt-4 text-xs font-mono opacity-50 tracking-widest uppercase">
                  {language === 'en' ? 'Image' : 'รูปที่'} {activeImageIndex + 1} / {[selectedProject.imageUrl, ...(selectedProject.gallery || [])].length}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
`;

if (!code.includes('z-[100] bg-black/95')) {
  // Try to replace the exact closing tags if possible
  if (code.includes(closingTags)) {
    code = code.replace(closingTags, lightboxMarkup + closingTags);
  } else {
    // Alternatively, just inject before the last </motion.section>
    const parts = code.split('</motion.section>');
    if (parts.length >= 2) {
      parts[parts.length - 2] += lightboxMarkup;
      code = parts.join('</motion.section>');
    }
  }
}

fs.writeFileSync('src/components/Portfolio.tsx', code);
