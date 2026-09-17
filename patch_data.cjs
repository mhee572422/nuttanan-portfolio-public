const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// Just do string replaces for specific skills to add isVerified: true

const skillsToVerify = [
  "name: 'GCP / GKE'",
  "name: 'Gemini Enterprise'",
  "name: 'Vertex AI Agent Engine'",
  "name: 'BigQuery / PubSub'",
  "name: 'Python / FastAPI'",
  "name: 'Docker / Linux'"
];

for (const skillName of skillsToVerify) {
  // It replaces all instances (both EN and TH) if we do global or multiple runs
  let regex = new RegExp(`(${skillName},)(\\s*proficiency: \\d+,\\s*yearsOfExperience: \\d+,)`, "g");
  code = code.replace(regex, `$1 isVerified: true,$2`);
}

fs.writeFileSync('src/data.ts', code);
