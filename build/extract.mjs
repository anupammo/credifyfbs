/* ───────────────────────────────────────────────────────────────────────────
   build/extract.mjs  —  ONE-SHOT
   ----------------------------------------------------------------------------
   Splits the v3 prototype HTML into modular source under src/. Run once to
   seed the modular tree; thereafter edit the modules and use build/build.mjs.

   The prototype has exactly four "true" top-level blocks worth extracting
   (everything else — including the <style>/<script> tags that appear in the
   export builders — lives INSIDE JS template strings in the main app script
   and must stay verbatim):

     1. pre-boot cloud bridge      <script>  (content lines 362–387)
     2. design system + components <style>   (content lines 398–1984)
     3. main builder application   <script>  (content lines 2587–16289)
     4. cloud-sync + account bar   <script>  (content lines 16296–16382)

   Usage:  node build/extract.mjs "<path-to-prototype.html>"
   ─────────────────────────────────────────────────────────────────────────── */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcPath = process.argv[2];
if (!srcPath) { console.error('Usage: node build/extract.mjs <prototype.html>'); process.exit(1); }

const raw = readFileSync(srcPath, 'utf8');
// split('\n') keeps the trailing '\r' on each line, so CRLF is preserved on rejoin.
const lines = raw.split('\n');
const NL = raw.includes('\r\n') ? '\r\n' : '\n';

// 1-indexed inclusive content ranges (verified against the prototype).
const blocks = [
  { file: 'src/js/preboot.js',    from: 362,   to: 387,   marker: '// @include js/preboot.js' },
  { file: 'src/styles/app.css',   from: 398,   to: 1984,  marker: '/* @include styles/app.css */' },
  { file: 'src/js/app.main.js',   from: 2587,  to: 16289, marker: '// @include js/app.main.js' },
  { file: 'src/js/cloud-sync.js', from: 16296, to: 16382, marker: '// @include js/cloud-sync.js' },
];

function slice(from, to) { return lines.slice(from - 1, to).join('\n'); } // strip trailing '\r' kept by split? no — keep it

// Emit module files.
for (const b of blocks) {
  const out = resolve(ROOT, b.file);
  mkdirSync(dirname(out), { recursive: true });
  // Preserve content exactly, including any trailing '\r'.
  writeFileSync(out, lines.slice(b.from - 1, b.to).join('\n'), 'utf8');
  console.log(`wrote ${b.file}  (${b.to - b.from + 1} lines)`);
}

// Build the shell: stitch the gaps between blocks, dropping a marker where each
// block's content used to live. Markers sit on their own line so build.mjs can
// match them exactly (indentation-insensitive).
const shellParts = [];
let cursor = 1; // next line to copy (1-indexed)
for (const b of blocks) {
  // copy lines [cursor .. b.from-1]  (the wrapper open tag + preamble)
  shellParts.push(lines.slice(cursor - 1, b.from - 1).join('\n'));
  shellParts.push(b.marker);
  cursor = b.to + 1; // skip the extracted content
}
// tail
shellParts.push(lines.slice(cursor - 1).join('\n'));

const shell = shellParts.join('\n');
const shellOut = resolve(ROOT, 'src/index.html');
mkdirSync(dirname(shellOut), { recursive: true });
writeFileSync(shellOut, shell, 'utf8');
console.log(`wrote src/index.html  (shell with ${blocks.length} include markers)`);
console.log('extract complete. NL style:', JSON.stringify(NL));
