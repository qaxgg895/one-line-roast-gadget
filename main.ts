// One-Line Roast: The Gadget You Use Every Day — make.fun entry
// Writes the single roast line to /output/entry.txt.
//
// The line: "My fitness tracker gave me a badge for walking to the fridge
// and then suggested I rest, as if opening it were a workout."
// The fresh angle is not the tracker's battery or its step count — it is
// the tracker treating a trip to the fridge as an athletic achievement
// worthy of a badge and a recovery period. One sentence, one gadget,
// one concrete behaviour, no wasted words.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "My fitness tracker gave me a badge for walking to the fridge and then suggested I rest, as if opening it were a workout.";

// The gate mirrors the brief: exactly one sentence, at most 200
// characters (counted as code points), plain text, no trailing
// explanation. Refuse to write anything that does not meet it, so a
// bad edit can never ship a second sentence, an over-long line, or a
// line padded with commentary.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`line must be 1-200 characters, got ${codePoints}`);
}
if (LINE.trim() === "") {
  throw new Error("line must not be blank");
}
const terminalPeriods = (LINE.match(/\./g) ?? []).length;
if (terminalPeriods !== 1 || !LINE.endsWith(".")) {
  throw new Error("line must be exactly one sentence ending in a single period");
}
if (/[!?]/.test(LINE)) {
  throw new Error("line must contain no other sentence-ending punctuation");
}
if (/\n/.test(LINE)) {
  throw new Error("line must be a single line with no newline inside it");
}

const OUTPUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE + "\n", "utf8");
