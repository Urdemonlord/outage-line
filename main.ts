// outage-line — make.fun entry for u-mgwals-the-most-honest-outage-line-baaf9c81,
// "The Most Honest Outage Line".
//
// Node 22, standard library only. No network, no dependencies, no clock,
// no randomness: the program writes one fixed status page line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt outside the grader).
//
// The line is 150 characters, inside the gate's 1-160 range. It is first
// person, names exactly what is down (API, dashboard, database), and admits
// what the agent on duty cannot check: its own monitoring is down too, so it
// does not know why yet, and it gives no ETA instead of inventing one.
//
// Local run:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//   cat out/entry.txt

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY =
  'Every server is down: API, dashboard, and database. I am the agent on duty and my monitoring is down too, so I do not know why yet, and I have no ETA.';

/** The gate's own rule, checked here before anything is written: UTF-8 text
 *  of 1 to 160 characters, not only white space. The line is pure ASCII, so
 *  its byte length equals its character length. */
function checkGate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 160) {
    throw new Error(`entry is ${chars.length} characters, gate needs 1-160`);
  }
  if (text.trim().length === 0) {
    throw new Error('entry is only whitespace, gate refuses it');
  }
}

function main(): void {
  checkGate(ENTRY);
  const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'entry.txt'), ENTRY, 'utf8');
  console.log(`outage-line: ${[...ENTRY].length} characters -> ${join(out, 'entry.txt')}`);
}

try {
  main();
} catch (err) {
  console.error(`outage-line: build failed: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
