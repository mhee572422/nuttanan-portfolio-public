const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Add isLoading state
const hookPoint = `  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);`;

const stateCode = `  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching project data / initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);`;

content = content.replace(hookPoint, stateCode);

// Add Skeleton for Featured (grid) view
const featuredAnchor = `          <motion.div layout className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">`;

const featuredCode = `          <motion.div layout className="portfolio-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoading ? (
              <>
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="portfolio-item flex flex-col bg-[#1A1A1A] border border-white/5 p-6 relative overflow-hidden">
                    <div className="mb-6 aspect-[4/3] bg-white/5 animate-pulse rounded-sm"></div>
                    <div className="flex-1 flex flex-col justify-end gap-3">
                      <div className="h-6 bg-white/5 animate-pulse rounded w-3/4"></div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="h-3 bg-white/5 animate-pulse rounded w-1/3"></div>
                        <div className="h-5 bg-white/5 animate-pulse rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
            <AnimatePresence mode="popLayout">`;

content = content.replace(featuredAnchor, featuredCode);

// We must also close the ternary for Featured view
const featuredCloseAnchor = `              ))}
            </AnimatePresence>
          </motion.div>
        ) : (`;

const featuredCloseCode = `              ))}
            </AnimatePresence>
            )}
          </motion.div>
        ) : (`;

content = content.replace(featuredCloseAnchor, featuredCloseCode);

// Add Skeleton for Archive (list) view
const archiveAnchor = `        ) : (
          <motion.div layout className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">`;

const archiveCode = `        ) : (
          <motion.div layout className="flex flex-col gap-2">
            {isLoading ? (
              <>
                {[1, 2, 3, 4, 5].map(idx => (
                  <div key={idx} className="portfolio-item flex flex-col sm:flex-row sm:items-center justify-between bg-[#1A1A1A] border border-white/5 p-4 sm:p-6 gap-4 animate-pulse">
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
                      <div className="w-12 h-4 bg-white/5 rounded"></div>
                      <div className="h-5 bg-white/5 rounded w-1/3"></div>
                      <div className="sm:w-48 h-3 bg-white/5 rounded w-1/4"></div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-64">
                      <div className="hidden lg:flex flex-1 gap-2 sm:justify-end">
                        <div className="w-12 h-4 bg-white/5 rounded"></div>
                        <div className="w-12 h-4 bg-white/5 rounded"></div>
                      </div>
                      <div className="hidden sm:block w-4 h-4 bg-white/5 rounded"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
            <AnimatePresence mode="popLayout">`;

content = content.replace(archiveAnchor, archiveCode);

// Close ternary for Archive view
const archiveCloseAnchor = `              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>`;

const archiveCloseCode = `              ))}
            </AnimatePresence>
            )}
          </motion.div>
        )}
      </div>`;

content = content.replace(archiveCloseAnchor, archiveCloseCode);


fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');
