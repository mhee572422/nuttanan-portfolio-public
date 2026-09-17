const fs = require('fs');
const lines = fs.readFileSync('src/components/Portfolio.tsx', 'utf8').split('\n');

const correctEnding = `
                <div className="flex flex-wrap gap-4 mt-auto pt-8">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('demo_clicked', { projectId: selectedProject.id, title: selectedProject.title })}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#0A0A0A] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-colors"
                    >
                      <ExternalLink size={16} />
                      {language === 'en' ? 'Live Demo' : 'ดูเว็บไซต์จริง'}
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('source_clicked', { projectId: selectedProject.id, title: selectedProject.title })}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1A1A1A] text-white border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-colors"
                    >
                      <Github size={16} />
                      {language === 'en' ? 'Source Code' : 'ซอร์สโค้ด'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
`;

// Slice off everything after line 570
const newLines = lines.slice(0, 570);
fs.writeFileSync('src/components/Portfolio.tsx', newLines.join('\n') + correctEnding, 'utf8');

