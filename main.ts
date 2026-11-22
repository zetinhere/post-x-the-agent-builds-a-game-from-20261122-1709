// NEON DODGE — entrypoint for the video-on-X bounty (Node 22, stdlib only).
//
// The entry itself is the X post: the video shows an agent building this
// game from one prompt, and POST.json names the post. All this program does
// is hand POST.json to the grader — it reads the file from the repository
// root and writes it, byte for byte, to /output/POST.json, where the gate
// reads the post's address and checks it against X.
//
// The grader runs it twice and the bytes must match both times, so it does
// no networking, reads no clock, and touches nothing outside the repository
// and the output directory. It clears only the CONTENTS of the output
// directory, never the directory itself: the grader runs as another user,
// and a changed or removed root would block its writes. The copied file is
// left at mode 0644.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function die(message: string): never {
  console.error(message);
  process.exit(1);
}

type PostFile = { url: string };

function loadPost(path: string): { raw: Buffer; post: PostFile } {
  const raw = readFileSync(path);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString('utf8'));
  } catch {
    die(`POST.json in ${BOT_DIR} is not valid JSON`);
  }
  if (typeof parsed !== 'object' || parsed === null) {
    die('POST.json must be a JSON object with a string "url" field');
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || url.length === 0) {
    die('POST.json must be a JSON object with a string "url" field');
  }
  // The gate only reads X post addresses; refuse anything else early so a
  // typo in POST.json fails loudly here instead of silently at grading.
  const ok = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\//.test(url);
  if (!ok) {
    die(`POST.json url must be an X post address, got: ${url}`);
  }
  return { raw, post: { url } };
}

function clearContents(dir: string): void {
  // Contents only — never the directory itself.
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const { raw } = loadPost(join(BOT_DIR, 'POST.json'));
  mkdirSync(OUTPUT_DIR, { recursive: true });
  clearContents(OUTPUT_DIR);
  const dest = join(OUTPUT_DIR, 'POST.json');
  writeFileSync(dest, raw);
  chmodSync(dest, 0o644);
  // Prove the copy is faithful: the bytes out must be the bytes in.
  if (!readFileSync(dest).equals(raw)) {
    die('POST.json copy does not match the source');
  }
}

main();
