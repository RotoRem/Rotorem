import fs from 'fs';
import path from 'path';

const root = path.join(import.meta.dirname, '..', 'src/pages/en/services/sofia');
const cachePath = path.join(import.meta.dirname, 'sofia-translate-cache.json');
const files = (process.env.SOFIA_EN_FILES || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const defaultFiles = [
  'dishwasher-repair.astro',
  'washing-machine-repair.astro',
  'dryer-repair.astro',
  'oven-repair.astro',
  'boiler-repair.astro',
];
const targetFiles = files.length ? files : defaultFiles;

const CYR = /[А-Яа-яЁё]/;
const BAD = /MYMEMORY|USAGE.?LIMIT|WARNING:/i;
const cache = new Map(
  fs.existsSync(cachePath)
    ? Object.entries(JSON.parse(fs.readFileSync(cachePath, 'utf8')))
    : [],
);

function saveCache() {
  fs.writeFileSync(cachePath, JSON.stringify(Object.fromEntries(cache), null, 2));
}

const APPLIANCE_ATTR = /prioritizeAppliance="([^"]+)"/;

async function translate(text) {
  const t = text.trim();
  if (!t || !CYR.test(t)) return text;
  if (cache.has(t) && !BAD.test(cache.get(t)) && !CYR.test(cache.get(t))) {
    return cache.get(t);
  }
  await new Promise((r) => setTimeout(r, 500));
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=bg|en&de=n.ivanov.ivanov@abv.bg`;
  const res = await fetch(url);
  const json = await res.json();
  let out = json.responseData?.translatedText ?? t;
  if (BAD.test(out) || CYR.test(out)) {
    console.warn('skip bad translation for:', t.slice(0, 50));
    return t;
  }
  out = out.replace(/Roto\s*Rem/gi, 'RotoRem').replace(/Rotorem/gi, 'RotoRem');
  cache.set(t, out);
  saveCache();
  return out;
}

function collectQuotedStrings(block, set) {
  const pattern = /(['"])((?:\\.|(?!\1).)*)\1/g;
  let m;
  while ((m = pattern.exec(block))) {
    if (CYR.test(m[2])) set.add(m[2]);
  }
}

function collectHtmlText(block, set) {
  const pattern = />[^<>{}]+</g;
  let m;
  while ((m = pattern.exec(block))) {
    const inner = m[0].slice(1, -1);
    if (CYR.test(inner)) set.add(inner.trim());
  }
}

function applyMapToQuoted(block, mapFn) {
  const pattern = /prioritizeAppliance=(['"])(.*?)\1|(['"])((?:\\.|(?!\3).)*)\3/g;
  return block.replace(pattern, (full, q1, s1, q2, s2) => {
    if (q1 !== undefined) return full;
    if (!CYR.test(s2)) return full;
    return q2 + mapFn(s2) + q2;
  });
}

function applyMapToHtmlText(block, mapFn) {
  return block.replace(/>[^<>{}]+</g, (segment) => {
    const inner = segment.slice(1, -1);
    if (!CYR.test(inner)) return segment;
    const lead = inner.match(/^\s*/)[0];
    const trail = inner.match(/\s*$/)[0];
    const core = inner.trim();
    if (!CYR.test(core)) return segment;
    return '>' + lead + mapFn(core) + trail + '<';
  });
}

const POST = [
  ['| On address |', '| At Your Home |'],
  ['| At the address |', '| At Your Home |'],
  ['| To address |', '| At Your Home |'],
  ['Visit and diagnosis', 'Visit and diagnostics'],
  ['After diagnosis', 'After diagnostics'],
  ['Upon clarification', 'Upon agreement'],
  ['Laundry Repair', 'Washing Machine Repair'],
  ['Rotorrem', 'RotoRem'],
];

function postprocess(text) {
  for (const [a, b] of POST) text = text.split(a).join(b);
  return text;
}

for (const file of targetFiles) {
  const fp = path.join(root, file);
  let c = fs.readFileSync(fp, 'utf8');
  const applianceMatch = c.match(APPLIANCE_ATTR);
  const applianceValue = applianceMatch?.[1];

  const parts = c.split('---');
  if (parts.length < 3) continue;
  const front = parts[1];
  const body = parts.slice(2).join('---');

  const strings = new Set();
  collectQuotedStrings(front, strings);
  collectQuotedStrings(body, strings);
  collectHtmlText(body, strings);

  const pending = [...strings].filter(
    (s) => !cache.has(s) || BAD.test(cache.get(s)) || CYR.test(cache.get(s)),
  );
  console.log(file, 'pending', pending.length, '/', strings.size);
  for (const s of pending) {
    await translate(s);
  }

  const map = (s) => {
    const v = cache.get(s);
    if (v && !BAD.test(v) && !CYR.test(v)) return v;
    return s;
  };
  let newFront = applyMapToQuoted(front, map);
  let newBody = applyMapToQuoted(body, map);
  newBody = applyMapToHtmlText(newBody, map);

  c = postprocess(parts[0] + '---' + newFront + '---' + newBody);

  if (applianceValue && applianceMatch) {
    c = c.replace(/prioritizeAppliance="[^"]+"/, `prioritizeAppliance="${applianceValue}"`);
  }

  fs.writeFileSync(fp, c, 'utf8');
  console.log('Done', file);
}

console.log('Cache size', cache.size);
