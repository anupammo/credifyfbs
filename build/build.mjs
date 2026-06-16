/* ───────────────────────────────────────────────────────────────────────────
   build/build.mjs
   ----------------------------------------------------------------------------
   Reassembles the modular source under src/ into the single deployed app.html.

   src/index.html is the shell. Anywhere it contains a line whose trimmed text
   is exactly an include directive in any comment form (slash-slash, slash-star,
   or HTML-comment wrapped), that line is replaced by the verbatim contents of
   src/<path>. Includes may nest (an included file may
   itself contain @include lines), so finer module carving works without
   touching this script.

     node build/build.mjs            build src/index.html  ->  app.html
     node build/build.mjs --check    build to memory, diff against app.html, exit 1 on drift
     node build/build.mjs --watch    rebuild on any change under src/
   ─────────────────────────────────────────────────────────────────────────── */
import { readFileSync, writeFileSync, watch, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = resolve(ROOT, 'src');
const ENTRY = resolve(SRC_DIR, 'index.html');
const OUT = resolve(ROOT, 'app.html');

// Matches a line that is ONLY an include directive (plus optional comment
// wrappers / indentation). Captures the module path.
const INCLUDE_RE = /^\s*(?:\/\/|\/\*|<!--)?\s*@include\s+([^\s*>-][^\s*>]*?)\s*(?:\*\/|-->)?\s*$/;

function expand(filePath, stack = []) {
  const abs = resolve(filePath);
  if (stack.includes(abs)) {
    throw new Error(`circular @include: ${[...stack, abs].map(p => p.replace(ROOT, '')).join(' -> ')}`);
  }
  if (!existsSync(abs)) throw new Error(`missing include target: ${abs.replace(ROOT, '')}`);
  const text = readFileSync(abs, 'utf8');
  const lines = text.split('\n');
  const out = [];
  for (const line of lines) {
    const m = line.match(INCLUDE_RE);
    if (m) {
      const target = resolve(SRC_DIR, m[1]);
      out.push(expand(target, [...stack, abs]));
    } else {
      out.push(line);
    }
  }
  return out.join('\n');
}

function build() {
  return expand(ENTRY);
}

const arg = process.argv[2];

if (arg === '--check') {
  const built = build();
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (built === current) { console.log('app.html is up to date.'); process.exit(0); }
  console.error('DRIFT: app.html differs from a fresh build of src/. Run `npm run build`.');
  process.exit(1);
} else if (arg === '--watch') {
  const rebuild = () => {
    try { writeFileSync(OUT, build(), 'utf8'); console.log(`[${new Date().toISOString()}] built app.html`); }
    catch (e) { console.error('build error:', e.message); }
  };
  rebuild();
  watch(SRC_DIR, { recursive: true }, rebuild);
  console.log('watching src/ …');
} else {
  writeFileSync(OUT, build(), 'utf8');
  console.log(`built app.html  (${(readFileSync(OUT).length / 1024).toFixed(0)} KB)`);
}
