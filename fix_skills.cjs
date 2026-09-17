const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

code = code.replace(
  "{language === 'en' ? 'By Experience' : 'ตามประสบการณ์'}\n            </button>\n          </div>\n        </div>",
  "{language === 'en' ? 'By Experience' : 'ตามประสบการณ์'}\n            </button>\n          </div>\n          </div>\n        </div>"
);
fs.writeFileSync('src/components/Skills.tsx', code);
