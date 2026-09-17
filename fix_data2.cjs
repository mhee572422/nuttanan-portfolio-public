const fs = require('fs');
let dataTs = fs.readFileSync('src/data.ts', 'utf8');

dataTs = dataTs.replace(/export const experiences[\s\S]*?\]\n\};/, '');
dataTs = dataTs.replace(/export const certifications[\s\S]*?\]\n\};/, '');

fs.writeFileSync('src/data.ts', dataTs, 'utf8');
