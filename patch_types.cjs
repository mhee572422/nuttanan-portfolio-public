const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "export interface SkillItem {\n  name: string;\n  proficiency: number;\n  description?: string;\n  yearsOfExperience?: number;\n}",
  "export interface SkillItem {\n  name: string;\n  proficiency: number;\n  description?: string;\n  yearsOfExperience?: number;\n  isVerified?: boolean;\n}"
);

fs.writeFileSync('src/types.ts', code);
