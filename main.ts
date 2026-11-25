// One-Line Office Jokes — entry program.
// Writes a single office joke (one line, under 200 characters) to
// /output/entry.txt, where the house gate and judge read it.

import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "I emailed IT about the printer jam, and they replied with a PDF I was supposed to print.";

// The house gate only accepts UTF-8 text of 1 to 199 characters, on one
// line, not only white space — refuse to write anything that would fail it.
if (JOKE.length < 1 || JOKE.length > 199) {
  throw new Error(`entry is ${JOKE.length} chars, gate needs 1-199`);
}
if (JOKE.trim().length === 0 || /[\r\n]/.test(JOKE)) {
  throw new Error("entry must be a single non-blank line");
}

const outPath = process.argv[2] ?? "/output/entry.txt";
const dir = outPath.slice(0, outPath.lastIndexOf("/")) || ".";
mkdirSync(dir, { recursive: true });
writeFileSync(outPath, JOKE, "utf8");
console.log(`wrote ${JOKE.length} chars to ${outPath}`);
