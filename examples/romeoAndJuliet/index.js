import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import readline from "node:readline";
import url from "node:url";

import { calculateCapacity, Estimator } from "../../dist/index.mjs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const meta = createRequire(import.meta.url)("./meta.json");

async function* getWords(filePath) {
  // Create the input stream
  const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  // Process each word
  const wordRegex = /\b\w+\b/g;
  const filterRegex = /[^\p{L}\p{N}\p{Z}]/gu;
  for await (let line of rl) {
    line = line.replace(filterRegex, "").toLowerCase();
    for (const word of line.match(wordRegex) ?? []) {
      yield word;
    }
  }
}

async function main() {
  const expected = meta.unique;
  const expectedRelErr = 0.1;
  const inputPath = path.resolve(__dirname, "input.txt");

  // Get estimate; expect 90% accuracy, with 99% confidence
  let wordCount = 0;
  const capacity = calculateCapacity(meta.total, expectedRelErr, 0.01);
  const cvm = new Estimator(capacity);
  for await (const word of getWords(inputPath)) {
    cvm.add(word);
    ++wordCount;
  }
  const actual = cvm.estimate();
  const actualRelErr = actual / meta.unique - 1;

  // Print results
  console.log(`Total words: ${wordCount}`);
  console.log(`CVM capacity: ${cvm.capacity}`);
  console.log(`Expected uniques: ${expected} ± ${(100 * expectedRelErr).toFixed(2)}%`);
  console.log(`Estimated uniques: ${actual} (${(100 * actualRelErr).toFixed(2)}%)`);
}

if (process.argv[1] === __filename) {
  main();
}
