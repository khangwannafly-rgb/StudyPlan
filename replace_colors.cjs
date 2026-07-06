const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('teal-')) {
    const newContent = content.replace(/teal-/g, 'primary-');
    fs.writeFileSync(f, newContent);
    console.log(`Updated: ${path.relative(__dirname, f)}`);
  }
});

console.log("Done.");
