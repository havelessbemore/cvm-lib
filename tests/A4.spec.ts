import { describe, it, expect } from "@jest/globals";

import { calculateCapacity, Estimator } from "../src";
import { genInt } from "./utils";

describe(`1M numbers; 10K disjoint blocks of 10K numbers`, () => {
  it("Should accurately estimate distinct values", async () => {
    const expectedRelErr = 0.1;
    const numVals = 1e6;
    const div = 1e4;
    const valMin = 1e3;
    const valMax = 1e4 - 1;

    const capacity = calculateCapacity(numVals, expectedRelErr, 0.01);
    const cvm = new Estimator<number>(capacity);
    const set = new Set();
    for (let i = 0; i < numVals; ++i) {
      const v = genInt(valMin, valMax) + div * Math.floor(i / div);
      cvm.add(v);
      set.add(v);
    }

    const estimate = cvm.estimate();
    const actualRelErr = estimate / set.size - 1;
    expect(Math.abs(actualRelErr)).toBeLessThanOrEqual(expectedRelErr);
  });
});
