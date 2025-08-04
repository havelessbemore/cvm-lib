import path from "node:path";

import meta from "../examples/muchAdo/meta.json";
import { calculateCapacity, Estimator } from "../src";
import { getWords } from "./utils";

describe(`Much Ado About Nothing`, () => {
  it("Should accurately estimate distinct words", async () => {
    const inputPath = path.resolve(__dirname, "../examples/muchAdo/input.txt");
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
