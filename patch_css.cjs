const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Replace the current @media print block with a more sophisticated one.
const oldPrintBlockRegex = /@media print \{[\s\S]*?\}(?=\n\n|\n\/\* Markdown Styles)/;

const newPrintBlock = `@media print {
  @page { margin: 1.5cm; }
  
  body {
    background-color: white !important;
    color: black !important;
    font-size: 11pt !important;
  }
  
  /* Hide interactive and unneeded elements */
  nav, button, .fixed, .sticky, form, iframe, #visitor-counter, .VisitorCounter {
    display: none !important;
  }
  
  /* Sections should be able to break across pages */
  section, main, article, div {
    page-break-inside: auto !important;
    break-inside: auto !important;
  }
  
  /* Remove heavy padding from sections for printing */
  section {
    padding: 1.5rem 0 !important;
    margin: 0 !important;
  }

  /* Experience Items */
  #experience .flex-col.sm\\:flex-row {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    margin-bottom: 1.5rem !important;
    border-left: 2px solid #ccc !important;
    padding-left: 1rem !important;
  }
  
  /* Make sure experience descriptions are visible (expand them conceptually or remove max-height) */
  #experience .overflow-hidden {
    height: auto !important;
    max-height: none !important;
    opacity: 1 !important;
    display: block !important;
  }
  
  /* Skills Items */
  #skills {
    page-break-inside: auto !important;
    break-inside: auto !important;
  }
  
  #skills > div > div {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }
  
  /* Project / Portfolio Items */
  #projects, .portfolio-grid {
    page-break-inside: auto !important;
    break-inside: auto !important;
  }
  
  .portfolio-item, .project-card {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
    border: 1px solid #ccc !important;
    margin-bottom: 1rem !important;
    box-shadow: none !important;
  }

  /* Typography formatting */
  h1, h2, h3, h4, h5, h6 {
    color: black !important;
    page-break-after: avoid !important;
    break-after: avoid !important;
  }
  
  p, span, div, li {
    color: #333 !important;
  }

  /* Borders and backgrounds */
  * {
    border-color: #ccc !important;
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }
  
  /* Keep some backgrounds for badges but very light */
  .bg-primary\\/10, .bg-surface-alt, .bg-foreground\\/5 {
    background-color: #f5f5f5 !important;
    border: 1px solid #ccc !important;
    color: #333 !important;
  }

  a {
    color: #000 !important;
    text-decoration: none !important;
  }
  
  /* Show links if they are external */
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #555 !important;
  }
  
  /* Hide internal anchor links or buttons dressed as links */
  a[href^="#"]:after, a[href^="mailto:"]:after {
    content: "";
  }
}`;

if (oldPrintBlockRegex.test(css)) {
  css = css.replace(oldPrintBlockRegex, newPrintBlock);
} else {
  // If the regex doesn't match for some reason, just append it
  css += '\n' + newPrintBlock;
}

fs.writeFileSync('src/index.css', css);
