#!/usr/bin/env node
/**
 * A link inside a portal must not throw the reader onto the public site.
 *
 * Nine pages are mounted under every portal — the challenge register and its
 * documents, results, the catalogue, the template library, transparency, the
 * startup profiles. They are also mounted on the public site. Linking one of
 * them by its public path from inside a portal swaps the entire shell: a
 * startup clicks a challenge on "Matches" and lands on the public navigation
 * with no way back to their own.
 *
 * `usePortalLink()` exists to prevent that, and six screens simply did not use
 * it — which nothing caught, because the link works. It just works somewhere
 * else.
 *
 * This fails the build on an absolute link to a shared path from any page that
 * is not the public site's own.
 *
 * It then checks the opposite direction. Most of those same shared pages are
 * `open: false` — `RequireAccount` refuses them to a signed-out reader. A page
 * on the PUBLIC site that links to one is offering a locked door: it looks like
 * navigation and behaves like a wall, and the reader finds out after the click.
 * That shipped twice — an empty state pointing at the challenge register, and a
 * figure panel pointing at the transparency register — so it is checked here.
 * `AccountOnlyLink` is the way to link one: it renders nothing when the reader
 * cannot follow it.
 *
 * Run: node scripts/check-links.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

/** The paths that exist on the public site AND inside every portal. */
const SHARED = [
  'challenges',
  'results',
  'catalogue',
  'templates',
  'how-it-works',
  'transparency',
  'startups',
  'legal',
];

/*
 * Pages that ARE the public site. A link to `/challenges` from the demand
 * board is the public register, correctly — there is no portal to stay in.
 * `usePortalLink` returns the same path there anyway, so these are allowed
 * either way; they are listed so the guard does not report a non-problem.
 */
const PUBLIC_ONLY = new Set([
  'src/pages/public/DemandBoard.tsx',
  'src/pages/public/Login.tsx',
  'src/pages/public/Register.tsx',
  'src/pages/public/RegisterStartup.tsx',
  'src/pages/public/RegisterExpert.tsx',
  'src/pages/dev/Styleguide.tsx',
  /* The 'this page needs an account' screen. It is only ever mounted on the
     public site — inside a portal you are signed in by definition. */
  'src/components/layout/RequireAccount.tsx',
]);

/** `to="/challenges"` and ``to={`/challenges/${slug}`}`` — but not `to={link(...)}`. */
const ABSOLUTE = new RegExp(`to=(?:"/(${SHARED.join('|')})[^"]*"|\\{\`/(${SHARED.join('|')})[^\`]*\`\\})`, 'g');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (name.endsWith('.tsx')) out.push(path);
  }
  return out;
}

const problems = [];
for (const file of walk(SRC)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  if (PUBLIC_ONLY.has(rel)) continue;

  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');
  lines.forEach((line, i) => {
    ABSOLUTE.lastIndex = 0;
    const match = ABSOLUTE.exec(line);
    if (match) problems.push({ rel, line: i + 1, text: match[0].trim() });
  });
}

/* ------------------------------------------- the other direction
 *
 * Which shared paths need an account is read out of the nav config, so this
 * cannot drift from what `RequireAccount` actually enforces.
 */
const nav = readFileSync(join(SRC, 'config', 'nav.ts'), 'utf8');
const GATED = [...nav.matchAll(/\{ to: '([^']+)'[^}]*open: (true|false) \}/g)]
  .filter((m) => m[2] === 'false')
  .map((m) => m[1]);
GATED.push('/challenges', '/startups');

const locked = [];
if (GATED.length > 0) {
  const paths = GATED.map((g) => g.replace('/', '')).join('|');
  const OFFERED = new RegExp(`to=(?:"/(?:${paths})[^"]*"|\\{'/(?:${paths})[^']*'\\})|to: '/(?:${paths})[^']*'`, 'g');

  for (const rel of PUBLIC_ONLY) {
    /* The component gallery is not navigation. Its links are sample props
       standing in for a caller, so a path there is an illustration of an
       empty state rather than an offer made to a reader. */
    if (rel.startsWith('src/pages/dev/')) continue;
    let source;
    try {
      source = readFileSync(join(ROOT, rel), 'utf8');
    } catch {
      continue;
    }
    source.split('\n').forEach((line, i) => {
      OFFERED.lastIndex = 0;
      const match = OFFERED.exec(line);
      if (!match) return;
      /* The component that renders nothing when the reader cannot follow it.
         The tag may open a line or two above the `to=`. */
      const context = source.split('\n').slice(Math.max(0, i - 3), i + 1).join(' ');
      if (context.includes('AccountOnlyLink')) return;
      locked.push({ rel, line: i + 1, text: match[0].trim() });
    });
  }
}

if (locked.length > 0) {
  console.error(
    `\ncheck-links: ${locked.length} link${locked.length === 1 ? '' : 's'} on the public site point at a page that needs an account\n`,
  );
  for (const l of locked) console.error(`  ${l.rel}:${l.line}  ${l.text}`);
  console.error('\n  Use <AccountOnlyLink to="...">, which renders nothing for a signed-out reader.');
  console.error('  Offering a locked door is worse than offering nothing: it only fails after the click.');
  process.exit(1);
}

if (problems.length > 0) {
  console.error(`check-links: ${problems.length} link${problems.length === 1 ? '' : 's'} would leave the portal\n`);
  for (const p of problems) console.error(`  ${p.rel}:${p.line}  ${p.text}`);
  console.error('\n  Wrap the path in usePortalLink(): to={link(`/challenges/${slug}`)}');
  console.error('  A shared page is mounted under every portal; the bare path is the public one.');
  process.exit(1);
}

console.log(
  `check-links: clean — no portal page links at a public path (${SHARED.length} shared), ` +
    `and no public page offers a locked door (${GATED.length} gated).`,
);
