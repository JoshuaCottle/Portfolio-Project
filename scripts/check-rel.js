#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const doFix = args.includes('--fix');

function readFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === '.git' || e.name === 'node_modules') continue;
      files.push(...readFiles(full));
    } else if (e.isFile() && full.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function ensureRel(tag) {
  // tag is the whole <a ...> opening tag
  // if rel exists, ensure it contains both noopener and noreferrer
  const relMatch = tag.match(/\brel\s*=\s*(["'])(.*?)\1/i);
  if (relMatch) {
    const current = relMatch[2];
    const parts = current.split(/\s+/).filter(Boolean);
    let changed = false;
    if (!parts.includes('noopener')) { parts.push('noopener'); changed = true; }
    if (!parts.includes('noreferrer')) { parts.push('noreferrer'); changed = true; }
    if (changed) {
      return tag.replace(relMatch[0], `rel=\"${parts.join(' ')}\"");
    }
    return null; // no change needed
  }
  // no rel attribute: add before final >
  // insert before the last '>' of the tag
  const insert = tag.replace(/>\s*$/, ` rel=\"noopener noreferrer\">`);
  return insert === tag ? null : insert;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // regex to find opening <a ...> tags
  const aTagRegex = /<a\b[^>]*>/gi;
  let match;
  const fixes = [];
  while ((match = aTagRegex.exec(content)) !== null) {
    const tag = match[0];
    // only consider external links (http or https)
    const hrefMatch = tag.match(/\bhref\s*=\s*(["'])(https?:\/\/[^"']+)\1/i);
    if (!hrefMatch) continue;
    const replacement = ensureRel(tag);
    if (replacement) {
      fixes.push({ start: match.index, tag, replacement });
    }
  }

  if (fixes.length === 0) return { fixed: false, count: 0 };

  if (doFix) {
    // Perform replacements from end to start to keep indices valid
    fixes.sort((a,b) => b.start - a.start);
    for (const f of fixes) {
      content = content.slice(0, f.start) + f.replacement + content.slice(f.start + f.tag.length);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    return { fixed: true, count: fixes.length };
  }
  return { fixed: false, count: fixes.length };
}

const files = readFiles(root);
let totalIssues = 0;
const report = [];
for (const f of files) {
  const res = processFile(f);
  if (res.count > 0) {
    totalIssues += res.count;
    report.push({ file: path.relative(root, f), count: res.count, fixed: res.fixed });
  }
}

if (report.length === 0) {
  console.log('No external-anchor rel issues found.');
  process.exit(0);
}

for (const r of report) {
  console.log(`${r.file}: ${r.count} external anchor(s) ${r.fixed ? 'fixed' : 'missing rel attribute'}`);
}

console.log(`Total external anchors affected: ${totalIssues}`);
if (!doFix) {
  console.log('\nRun `npm run check-rel:fix` to automatically add rel="noopener noreferrer" to these anchors.');
  process.exit(1);
}
process.exit(0);
