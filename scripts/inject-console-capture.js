const fs = require('fs');
const path = require('path');

function injectScript() {
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  const htmlFiles = [];
  
  function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        findHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    }
  }
  
  const outDir = path.join(process.cwd(), 'out');
  if (fs.existsSync(outDir)) {
    findHtmlFiles(outDir);
    
    htmlFiles.forEach(file => {
      let content = fs.readFileSync(file, 'utf8');
      if (!content.includes('dashboard-console-capture.js')) {
        content = content.replace('</head>', `${scriptTag}</head>`);
        fs.writeFileSync(file, content);
        console.log(`Injected console capture script into ${file}`);
      }
    });
  }
}

injectScript();