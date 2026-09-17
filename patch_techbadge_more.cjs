const fs = require('fs');
let content = fs.readFileSync('src/components/TechBadge.tsx', 'utf8');

if(!content.includes('SiD3')) {
  content = content.replace(
    "SiGooglecloud",
    "SiGooglecloud,\n  SiD3,\n  SiStripe,\n  SiFramer"
  );
}

content = content.replace(
  "'GCP': { icon: <SiGooglecloud />, color: '#4285F4' },",
  "'GCP': { icon: <SiGooglecloud />, color: '#4285F4' },\n  'D3.js': { icon: <SiD3 />, color: '#F9A03C' },\n  'Stripe': { icon: <SiStripe />, color: '#008CDD' },\n  'Framer': { icon: <SiFramer />, color: '#0055FF' },\n  'Vue.js': { icon: <SiVuedotjs />, color: '#4FC08D' },"
);

fs.writeFileSync('src/components/TechBadge.tsx', content, 'utf8');
