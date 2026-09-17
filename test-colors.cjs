// Not running in browser, just testing a regex
const regex = /oklch\([\d.%]+\s+[\d.]+\s+[\d.]+(?:\s*\/\s*[\d.%]+)?\)/g;
console.log("oklch(100% 0 0)".match(regex));
