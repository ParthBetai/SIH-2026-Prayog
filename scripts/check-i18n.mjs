/**
 * Every `t('key')` in the product resolves to a real string, in every language.
 *
 * A missing key does not throw: i18next falls back to English and, failing
 * that, prints the key itself. So a half-finished translation looks like a
 * working page with `deptCases.pipeline.heading` written across the top of it,
 * and nothing in the build says otherwise. This says otherwise.
 *
 * It also catches the opposite: a key in the bundles that nothing calls, which
 * is dead weight the next translator would waste time on.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const SRC = join(ROOT, 'src');

/** Every .ts/.tsx under src. */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.tsx?$/.test(full)) out.push(full);
  }
  return out;
}

/**
 * Flatten a bundle module into dotted keys.
 *
 * The bundles are TypeScript, not JSON, so they are read with a deliberately
 * small parser rather than imported: a build step that has to compile the app
 * before it can check the app is a build step nobody runs.
 */
function keysOf(file) {
  const text = readFileSync(file, 'utf8');
  const found = new Set();
  const path = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*')) continue;

    const open = /^([A-Za-z0-9_]+)\s*:\s*\{$/.exec(line);
    if (open) {
      path.push(open[1]);
      continue;
    }
    if (line.startsWith('}')) {
      path.pop();
      continue;
    }
    /*
     * `key: 'value'`, or `key:` with the value wrapped onto the next line.
     * The test is whether the line OPENS an object — it ends with `{` — not
     * whether it contains one: half these values carry `{{interpolation}}`,
     * and treating those as nested objects hid every one of them.
     */
    const leaf = /^([A-Za-z0-9_]+)\s*:/.exec(line);
    if (leaf && !line.endsWith('{')) found.add([...path, leaf[1]].join('.'));
  }
  return found;
}

/*
 * Read the languages from the list the product itself runs on, rather than
 * from a pair of names hard-coded here. A language added to
 * `src/i18n/languages.ts` is checked from the moment its bundle lands — and one
 * added there WITHOUT a bundle fails here, which is the error you want rather
 * than a product that quietly serves English under a Marathi label.
 */
const LANGUAGES = [
  ...readFileSync(join(SRC, 'i18n', 'languages.ts'), 'utf8').matchAll(/^\s*\{ code: '([a-z]+)'/gm),
].map((m) => m[1]);
const SOURCE = 'en';

if (!LANGUAGES.includes(SOURCE)) {
  console.error('\ncheck-i18n: could not read the language list from src/i18n/languages.ts\n');
  process.exit(1);
}

const bundles = new Map();
for (const code of LANGUAGES) {
  const file = join(SRC, 'i18n', `${code}.ts`);
  if (!existsSync(file)) {
    console.error(`\ncheck-i18n: '${code}' is in LANGUAGES but src/i18n/${code}.ts does not exist\n`);
    process.exit(1);
  }
  bundles.set(code, keysOf(file));
}
const en = bundles.get(SOURCE);

/** Plural keys are declared as `x_one`/`x_other` and called as `x`. */
const resolves = (bundle, key) =>
  bundle.has(key) || bundle.has(`${key}_one`) || bundle.has(`${key}_other`);

/*
 * Two shapes carry a key.
 *
 * `t('x.y')` is the obvious one. The other is a key held in a data structure —
 * `{ to: '/d', labelKey: 'bar.whosWaiting' }` — which every portal's navigation
 * uses so the bar can be declared once and resolved at render. Those are never
 * inside a `t(` call at the point they are written, so a typo in one renders
 * the key across the top of the product and this would have missed it.
 *
 * A key assembled at run time (`t(`x.${id}`)`) cannot be checked from here and
 * is deliberately not attempted. Reference data uses `src/config/taxonomy.ts`
 * instead, which falls back to a readable English value rather than to a key.
 */
const PATTERNS = [/\bt\(\s*'([A-Za-z0-9_.]+)'/g, /\b(?:labelKey|hintKey|titleKey|bodyKey)\s*:\s*'([A-Za-z0-9_.]+)'/g];

const used = new Map();
for (const file of walk(SRC)) {
  if (file.includes(`${join('src', 'i18n')}`)) continue;
  const text = readFileSync(file, 'utf8');
  for (const pattern of PATTERNS) {
    for (const m of text.matchAll(pattern)) {
      if (!used.has(m[1])) used.set(m[1], relative(ROOT, file).replace(/\\/g, '/'));
    }
  }
}

const missingEn = [...used].filter(([k]) => !resolves(en, k));

let bad = false;

if (missingEn.length > 0) {
  bad = true;
  console.error(`\ncheck-i18n: ${missingEn.length} key(s) called but absent from en.ts\n`);
  for (const [key, file] of missingEn.slice(0, 40)) console.error(`  ${key}  —  ${file}`);
  if (missingEn.length > 40) console.error(`  ... and ${missingEn.length - 40} more`);
}

for (const code of LANGUAGES) {
  if (code === SOURCE) continue;
  const bundle = bundles.get(code);
  const missing = [...used].filter(([k]) => resolves(en, k) && !resolves(bundle, k));
  if (missing.length === 0) continue;
  bad = true;
  console.error(`\ncheck-i18n: ${missing.length} key(s) in en.ts with no ${code}\n`);
  for (const [key, file] of missing.slice(0, 40)) console.error(`  ${key}  —  ${file}`);
  if (missing.length > 40) console.error(`  ... and ${missing.length - 40} more`);
}

if (bad) {
  console.error('\nA missing key renders as the key itself. Add it to every bundle.\n');
  process.exit(1);
}

console.log(
  `check-i18n: clean — ${used.size} keys called, all present in ${LANGUAGES.join(', ')} (${en.size} declared).`,
);
