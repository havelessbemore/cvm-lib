import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import url from "node:url";

import { calculateCapacity, CVM } from "../../src";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input
const INPUT_COUNT = 31920;
const INPUT_UNIQS = 4789;
const INPUT_PATH = path.join(__dirname, "input.txt");

// CVM
const CVM_ACCURACY = 0.9; // 90% accuracy
const CVM_CONFIDENCE = 0.99; // 99% confidence

async function main(filePath: string, capacity: number): Promise<void> {
  // Create the input stream
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // Create the CVM instance
  const cvm = new CVM<string>({ capacity });
  console.log(`CVM initialized with capacity ${cvm.capacity}`);

  // Process each word
  console.log(`Processing file...`);
  let wordCount = 0;
  const wordRegex = /\b\w+\b/g;
  for await (const line of rl) {
    for (const word of line.match(wordRegex) ?? []) {
      cvm.add(word);
      ++wordCount;
    }
  }

  // Print output
  console.table([
    {
      name: "Target",
      words: INPUT_COUNT,
      unique: INPUT_UNIQS,
    },
    {
      name: "Estimate",
      words: wordCount,
      unique: cvm.estimate,
    },
    {
      name: "Target Accuracy (%)",
      unique: `100 ± ${(100 * (1 - CVM_ACCURACY)).toFixed(2)}`,
    },
    {
      name: "Estimate Accuracy (%)",
      unique: ((100 * cvm.estimate) / INPUT_UNIQS).toFixed(2),
    },
  ]);
}

main(
  INPUT_PATH,
  calculateCapacity(INPUT_COUNT, 1 - CVM_ACCURACY, 1 - CVM_CONFIDENCE),
);
