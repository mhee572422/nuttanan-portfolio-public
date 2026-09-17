const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const oldProdBlock = `  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }`;

const newProdBlock = `  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
      
      const projectId = req.query.project;
      if (projectId) {
        const project = projects['en']?.find(p => p.id === projectId);
        if (project) {
          const ogTags = \`
    <title>\${project.title} | Portfolio</title>
    <meta property="og:title" content="\${project.title}" />
    <meta property="og:description" content="\${project.description}" />
    <meta property="og:image" content="\${project.imageUrl}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="\${project.title}" />
    <meta name="twitter:description" content="\${project.description}" />
    <meta name="twitter:image" content="\${project.imageUrl}" />\`;
          html = html.replace('</head>', ogTags + '\\n  </head>');
        }
      }
      res.send(html);
    });
  }`;

if (code.includes('app.use(express.static(distPath));')) {
  code = code.replace(oldProdBlock, newProdBlock);
} else {
  console.log("Could not find the block to replace.");
}

// Ensure fs is imported at the top of server.ts if not already there, but we only need it in the else block.
// Actually, fs is usually imported or we need to import it.
if (!code.includes("import fs from 'fs'")) {
  code = "import fs from 'fs';\n" + code;
}

fs.writeFileSync('server.ts', code);
