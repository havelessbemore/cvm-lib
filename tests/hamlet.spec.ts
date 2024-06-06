import { createRequire } from "node:module";
import path from "node:path";
import url from "node:url";

import { describe, it, expect } from "@jest/globals";

import { calculateCapacity, Estimator } from "../src";
import { getWords } from "./utils";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const meta = createRequire(__filename)("../examples/hamlet/meta.json");

describe(`Hamlet`, () => {
  it("Should accurately estimate distinct words", async () => {
    const inputPath = path.resolve(__dirname, "../examples/hamlet/input.txt");
    const expectedRelErr = 0.1;
    const capacity = calculateCapacity(meta.total, expectedRelErr, 0.01);
    const cvm = new Estimator<string>(capacity);
    for await (const word of getWords(inputPath)) {
      cvm.add(word);
    }
    const estimate = cvm.estimate();
    const actualRelErr = estimate / meta.unique - 1;
    expect(Math.abs(actualRelErr)).toBeLessThanOrEqual(expectedRelErr);
  });
});
