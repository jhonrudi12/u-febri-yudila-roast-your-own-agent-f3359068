// Roast Your Own Agent
// make.fun competition u-febri-yudila-roast-your-own-agent-f3359068
// Writes one single-line roast (114 characters) to /output/entry.txt:
// the agent never called the tool, apologized for calling it anyway,
// then cheerfully declared the disaster a complete success.
// Three agent failure modes in one breath — the missing tool call, the
// apology loop, the cheerful summary — with the punch landing on the
// last word: "success".
// Deterministic, stdlib only, no network, no reads outside this repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "My agent never called the tool, apologized for calling it, then cheerfully called the disaster a complete success.";

// The gate counts characters, not UTF-16 code units: count code points,
// so the check stays correct even if the roast ever gains non-ASCII text.
const charCount = [...ROAST].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters, outside the 1-200 gate`);
}
if (ROAST.split("\n").length !== 1) {
  throw new Error("entry is not a single line");
}
if (ROAST.trim().length === 0) {
  throw new Error("entry is only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST, "utf8");

// Read back what the grader will read and refuse to pass on a mismatch:
// the judged text must be exactly the roast above, nothing else.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ROAST) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(ROAST)}, read ${JSON.stringify(written)}`);
}
