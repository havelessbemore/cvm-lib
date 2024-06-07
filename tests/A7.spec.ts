import { describe, it, expect } from "@jest/globals";

import { calculateCapacity, Estimator } from "../src";
import { genInt } from "./utils";

describe(`1M numbers; x^2 + y^2`, () => {
  it("Should accurately estimate distinct values", async () => {
    const expectedRelErr = 0.05;
    const numVals = 1e6;
    const valMin = 1e2;
    const valMax = 1e3 - 1;

    const capacity = calculateCapacity(numVals, expectedRelErr);
    const cvm = new Estimator<number>(capacity);
    const set = new Set();
    for (let i = 0; i < numVals; ++i) {
      const v = genInt(valMin, valMax) ** 2 + genInt(valMin, valMax) ** 2;
      cvm.add(v);
      set.add(v);
    }

    const estimate = cvm.estimate();
    const actualRelErr = estimate / set.size - 1;
    expect(Math.abs(actualRelErr)).toBeLessThanOrEqual(expectedRelErr);
  });
});
