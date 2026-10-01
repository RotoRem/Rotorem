/**
 * Builds sofia-en-map.json from BG strings using line-sync with hand-maintained EN pairs
 * in sofia-en-pairs.jsonl (bg\t en format).
 */
import fs from 'fs';
import path from 'path';

const bgStrings = JSON.parse(
  fs.readFileSync(path.join(import.meta.dirname, 'sofia-bg-strings.json'), 'utf8'),
);
const pairsPath = path.join(import.meta.dirname, 'sofia-en-pairs.jsonl');
const map = {};

if (fs.existsSync(pairsPath)) {
  for (const line of fs.readFileSync(pairsPath, 'utf8').split(/\n/)) {
    if (!line.trim()) continue;
    const tab = line.indexOf('\t');
    if (tab === -1) continue;
    const bg = line.slice(0, tab);
    const en = line.slice(tab + 1);
    map[bg] = en;
  }
}

const missing = bgStrings.filter((s) => !map[s]);
fs.writeFileSync(path.join(import.meta.dirname, 'sofia-en-map.json'), JSON.stringify(map, null, 2));
console.log('mapped', Object.keys(map).length, 'missing', missing.length);
if (missing.length) {
  fs.writeFileSync(path.join(import.meta.dirname, 'sofia-en-missing.txt'), missing.join('\n'));
}
