import path from "node:path";

import meta from "../examples/hamlet/meta.json";
import { calculateCapacity, Estimator } from "../src";
import { getWords } from "./utils";

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
