const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// The original lines before my regex:
// 503:                 {selectedProject.milestones && selectedProject.milestones.length > 0 && (
// 504:                   <div className="mb-8">
// ...
// 521:                   </div>
// 522:                 )}
// 523:                 
// 524:                 <div className="flex flex-wrap gap-4 mt-auto pt-8">

// Since my regex destroyed the end of the file, let's fix it by appending the lost footer!
const fixedFooter = `
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

content = content.replace(
  /\{\/\* Fallback accessible list \(screen readers only\) \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*\)\}\s*<\/AnimatePresence>\s*<\/motion\.section>\s*\}\s*/,
  `{/* Fallback accessible list (screen readers only) */}
                    <div className="sr-only">
                      {selectedProject.milestones.map((milestone, idx) => (
                        <div key={idx}>
                          <p>{milestone.phase} - {milestone.date}</p>
                          <p>{milestone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
${fixedFooter}`
);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');
