const si = require('./node_modules/react-icons/si/index.js');
const imports = [
  "SiD3dotjs",
  "SiStripe",
  "SiFramer",
  "SiVuejs"
];
for(let name of imports) {
  if(!si[name]) {
    console.log("Missing:", name);
  } else {
    console.log("Found:", name);
  }
}
