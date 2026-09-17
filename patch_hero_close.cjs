const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

code = code.replace(
    '</motion.div>\n        </div>\n      </div>',
    '</motion.div>\n          </motion.div>\n        </div>\n      </div>'
);

code = code.replace(
`              <a href="/resume.pdf" download="Nuttanan Foopun_Resume.pdf" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111]/50 backdrop-blur-sm text-[#C5A059] border border-[#C5A059]/30 rounded-full hover:bg-[#C5A059]/10 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] shadow-xl">
                {language === 'en' ? 'Download PDF' : 'ดาวน์โหลด PDF'}
                <Download size={18} aria-hidden="true" />
              </a>
            </div>
          </motion.div>`,
`              <a href="/resume.pdf" download="Nuttanan Foopun_Resume.pdf" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111]/50 backdrop-blur-sm text-[#C5A059] border border-[#C5A059]/30 rounded-full hover:bg-[#C5A059]/10 transition-colors text-[10px] uppercase tracking-[0.2em] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] shadow-xl">
                {language === 'en' ? 'Download PDF' : 'ดาวน์โหลด PDF'}
                <Download size={18} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>`);
          
fs.writeFileSync('src/components/Hero.tsx', code);
