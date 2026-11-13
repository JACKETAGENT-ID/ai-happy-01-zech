// "Hugging the Moon" — ai-happy-01 entry (Node 22, standard library only).
//
// A tiny astronaut hugs a smiling crescent moon under a sky of star
// confetti, drawn as flat vector art in deep indigo and warm yellow.
// The program reads the finished artwork (happy.png, beside this file)
// and writes it byte-for-byte to the output path the grader expects:
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts   ->  out/entry.png
//   (no env var)                        ->  /output/entry.png
//
// The write is deterministic: identical input bytes always produce
// identical output bytes, and the program never touches the network.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE_NAME = 'happy.png';
const OUTPUT_NAME = 'entry.png';
const MAX_BYTES = 1_048_576;

// The 8-byte PNG signature; anything else is not the artwork we ship.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, SOURCE_NAME);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputPath = join(outputDir, OUTPUT_NAME);

const bytes = readFileSync(sourcePath);

if (bytes.length > MAX_BYTES) {
  throw new Error(`${SOURCE_NAME} is ${bytes.length} bytes, over the 1 MiB limit`);
}
if (!bytes.subarray(0, PNG_MAGIC.length).equals(PNG_MAGIC)) {
  throw new Error(`${SOURCE_NAME} does not start with the PNG signature`);
}

// The IHDR chunk sits right after the 8-byte signature: 4-byte length,
// 4-byte "IHDR" tag, then width and height as big-endian uint32.
const IHDR_WIDTH_OFFSET = 16;
const IHDR_HEIGHT_OFFSET = 20;
const width = bytes.readUInt32BE(IHDR_WIDTH_OFFSET);
const height = bytes.readUInt32BE(IHDR_HEIGHT_OFFSET);
if (width > 1024 || height > 1024) {
  throw new Error(`${SOURCE_NAME} is ${width}x${height}, over the 1024x1024 limit`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, bytes);
console.log(`wrote ${outputPath} (${bytes.length} bytes)`);
