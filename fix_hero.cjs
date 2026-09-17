const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

code = code.replace(
`            </motion.div>
          </motion.div>
          </motion.div>
        </div>`,
`            </motion.div>
          </motion.div>
        </div>`
);
fs.writeFileSync('src/components/Hero.tsx', code);
