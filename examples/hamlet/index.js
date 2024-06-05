import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import url from "node:url";

import { calculateCapacity, CVM } from "../../dist/index.mjs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input
const INPUT_TOTAL = 31920;
const INPUT_UNIQS = 4789;
const INPUT_PATH = path.join(__dirname, "input.txt");

// CVM
const CVM_ACCURACY = 0.9; // 90% accuracy
const CVM_CONFIDENCE = 0.99; // 99% confidence

async function main(filePath, capacity) {
  // Create the input stream
  const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  // Create the CVM instance
  const cvm = new CVM({ capacity });

  // Process each word
  const wordRegex = /\b\w+\b/g;
  for await (const line of rl) {
    for (const word of line.match(wordRegex) ?? []) {
      cvm.add(word);
    }
  }

  // Print output
  console.log(`CVM capacity: ${cvm.capacity}`);
  console.table([
    {
      Expected: INPUT_UNIQS,
      Actual: cvm.estimate(),
      "Expected Error (%)": `±${(100 * (1 - CVM_ACCURACY)).toFixed(2)}`,
      "Actual Error (%)": (100 - (100 * cvm.estimate()) / INPUT_UNIQS).toFixed(2),
    },
  ]);
}

main(
  INPUT_PATH,
  calculateCapacity(INPUT_TOTAL, 1 - CVM_ACCURACY, 1 - CVM_CONFIDENCE),
);
