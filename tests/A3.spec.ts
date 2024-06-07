import { describe, it, expect } from "@jest/globals";

import { calculateCapacity, Estimator } from "../src";
import { genInt } from "./utils";

describe(`1M numbers divided by 20`, () => {
  it("Should accurately estimate distinct values", async () => {
    const expectedRelErr = 0.05;
    const numVals = 1e6;
    const div = 20;
    const valMin = 1e7;
    const valMax = 1e8 - 1;

    const capacity = calculateCapacity(numVals, expectedRelErr);
    const cvm = new Estimator<number>(capacity);
    const set = new Set();
    for (let i = 0; i < numVals; ++i) {
      const v = Math.floor(genInt(valMin, valMax) / div);
      cvm.add(v);
      set.add(v);
    }

    const estimate = cvm.estimate();
    const actualRelErr = estimate / set.size - 1;
    expect(Math.abs(actualRelErr)).toBeLessThanOrEqual(expectedRelErr);
  });
});
