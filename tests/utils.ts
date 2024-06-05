import fs from "node:fs";
import readline from "node:readline";

export async function* getWords(filePath: string): AsyncGenerator<string> {
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
