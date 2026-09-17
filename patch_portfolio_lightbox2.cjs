const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

const regexImageSection = /<div className="md:w-\[45%\] relative h-\[300px\] md:h-auto border-b md:border-b-0 md:border-r border-white\/10 bg-black flex flex-col">[\s\S]*?<\/div>\s*<div className="md:w-\[55%\] p-8 md:p-12 flex flex-col">/;

const newImageSection = `<div className="md:w-[45%] relative h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-white/10 bg-black flex flex-col">
                <div className="flex-1 relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
                  <img
                    src={[selectedProject.imageUrl, ...(selectedProject.gallery || [])][activeImageIndex]}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-black/60 p-3 rounded-full backdrop-blur-sm text-white border border-white/20">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </div>
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div className="h-24 sm:h-32 border-t border-white/10 flex gap-1 p-1 overflow-x-auto custom-scrollbar shrink-0">
                    {[selectedProject.imageUrl, ...selectedProject.gallery].map((img, i) => (
                      <img 
                        key={i} 
                        src={img} 
                        alt="Gallery" 
                        className={\`h-full aspect-video object-cover cursor-pointer transition-all duration-300 \${activeImageIndex === i ? 'ring-2 ring-[#C5A059] ring-inset opacity-100' : 'opacity-40 hover:opacity-100'}\`} 
                        onClick={() => setActiveImageIndex(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="md:w-[55%] p-8 md:p-12 flex flex-col">`;

content = content.replace(regexImageSection, newImageSection);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');
