const fs = require('fs');
let code = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Inject state
if (!code.includes('const [imageLoaded, setImageLoaded]')) {
  code = code.replace(
    /const \[isLoading, setIsLoading\] = useState\(true\);/,
    `const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);`
  );
}

// Inject useEffect for preloading
const preloadEffect = `
  useEffect(() => {
    setImageLoaded(false);
    if (lightboxOpen && selectedProject) {
      const images = [selectedProject.imageUrl, ...(selectedProject.gallery || [])];
      
      // Preload current, next, and prev
      const indexesToPreload = [
        activeImageIndex,
        (activeImageIndex + 1) % images.length,
        (activeImageIndex - 1 + images.length) % images.length
      ];
      
      indexesToPreload.forEach(idx => {
        if (images[idx]) {
          const img = new Image();
          img.src = images[idx];
        }
      });
    }
  }, [activeImageIndex, lightboxOpen, selectedProject]);
`;

if (!code.includes('indexesToPreload.forEach')) {
  code = code.replace(
    /useEffect\(\(\) => \{\n    if \(selectedProject\) \{\n      setActiveImageIndex\(0\);\n      setLightboxOpen\(false\);\n    \}\n  \}, \[selectedProject\]\);/,
    `useEffect(() => {
    if (selectedProject) {
      setActiveImageIndex(0);
      setLightboxOpen(false);
    }
  }, [selectedProject]);
${preloadEffect}`
  );
}

// Update the img inside the Lightbox
const oldLightboxImg = `<img 
                  src={[selectedProject.imageUrl, ...(selectedProject.gallery || [])][activeImageIndex]}
                  alt={selectedProject.title}
                  className="max-w-full max-h-full object-contain rounded-sm"
                />`;

const newLightboxImg = `{!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={[selectedProject.imageUrl, ...(selectedProject.gallery || [])][activeImageIndex]}
                  alt={selectedProject.title}
                  className={\`max-w-full max-h-full object-contain rounded-sm transition-opacity duration-300 \${imageLoaded ? 'opacity-100' : 'opacity-0'}\`}
                  onLoad={() => setImageLoaded(true)}
                />`;

if (code.includes(oldLightboxImg)) {
  code = code.replace(oldLightboxImg, newLightboxImg);
} else {
  console.log("Could not find the exact oldLightboxImg. Trying fallback...");
  // Fallback regex if spacing differs
  code = code.replace(
    /<img\s+src=\{\[selectedProject\.imageUrl, \.\.\.\(selectedProject\.gallery \|\| \[\]\)\]\[activeImageIndex\]\}\s+alt=\{selectedProject\.title\}\s+className="max-w-full max-h-full object-contain rounded-sm"\s*\/>/m,
    newLightboxImg
  );
}

fs.writeFileSync('src/components/Portfolio.tsx', code);
