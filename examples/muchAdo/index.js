import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import url from "node:url";

import { calculateCapacity, CVM } from "../../dist/index.mjs";

import meta from "./meta.json" with { type: "json" };

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const capacity = calculateCapacity(meta.total, expectedRelErr, 0.01);
  const cvm = new CVM(capacity);
  for await (const word of getWords(inputPath)) {
    cvm.add(word);
  }
  const actual = cvm.estimate();
  const actualRelErr = 1 - actual / meta.unique;

  // Print results
  console.log(`Capacity: ${capacity}`);
  console.table([
    {
      Expected: expected,
      Actual: actual,
      "Expected Error (%)": `±${(100 * expectedRelErr).toFixed(2)}`,
      "Actual Error (%)": (100 * actualRelErr).toFixed(2),
    },
  ]);
}

if (process.argv[1] === __filename) {
  main();
}
