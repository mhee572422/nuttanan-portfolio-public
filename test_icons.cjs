const si = require('./node_modules/react-icons/si/index.js');
const imports = [
  "SiReact", 
  "SiFigma", 
  "SiTailwindcss", 
  "SiNodedotjs", 
  "SiTypescript", 
  "SiPython", 
  "SiDocker", 
  "SiFirebase", 
  "SiPostgresql",
  "SiJavascript",
  "SiHtml5",
  "SiCss3",
  "SiVite",
  "SiExpress",
  "SiMongodb",
  "SiGraphql",
  "SiNextdotjs",
  "SiVuedotjs",
  "SiAngular",
  "SiGooglecloud"
];
for(let name of imports) {
  if(!si[name]) {
    console.log("Missing:", name);
  }
}
