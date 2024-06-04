import { beforeEach, describe, expect, jest, test } from "@jest/globals";

import { CVM } from "./cvm";
import { CVMConfig } from "./cvmConfig";

describe("CVM", () => {
  let cvm: CVM<number>;

  beforeEach(() => {
    cvm = new CVM<number>({ capacity: 10 });
  });

  test("should initialize with given configuration", () => {
    expect(cvm.capacity).toBe(10);
    expect(cvm.probability).toBe(0.5);
    expect(cvm.size).toBe(0);
  });

  test("should add values and maintain capacity", () => {
    for (let i = 0; i < 15; i++) {
      cvm.add(i);
    }
    expect(cvm.size).toBeLessThanOrEqual(10);
  });

  test("should clear all values", () => {
    cvm.add(1);
    cvm.add(2);
    expect(cvm.size).toBeGreaterThan(0);
    cvm.clear();
    expect(cvm.size).toBe(0);
  });

  test("should get estimate of distinct elements", () => {
    cvm.add(1);
    cvm.add(2);
    cvm.add(3);
    expect(cvm.estimate).toBeCloseTo(3, 1); // Using a close-to check for approximation
  });

  test("should check if value exists", () => {
    cvm.add(1);
    expect(cvm.has(1)).toBe(true);
    expect(cvm.has(2)).toBe(false);
  });

  test("should return an iterator over values", () => {
    cvm.add(1);
    cvm.add(2);
    const values = Array.from(cvm.values());
    expect(values).toContain(1);
    expect(values).toContain(2);
  });

  test("should iterate over values using Symbol.iterator", () => {
    cvm.add(1);
    cvm.add(2);
    const values = Array.from(cvm);
    expect(values).toContain(1);
    expect(values).toContain(2);
  });

  test("should use provided random number generator", () => {
    const mockRandom = jest.fn<() => number>().mockReturnValue(0.3);
    const config: CVMConfig = { capacity: 10, randomFn: mockRandom };
    const customCvm = new CVM<number>(config);
    customCvm.add(1);
    expect(mockRandom).toHaveBeenCalled();
  });

  test("should use provided probability", () => {
    const config: CVMConfig = { capacity: 10, probability: 0.8 };
    const customCvm = new CVM<number>(config);
    expect(customCvm.probability).toBe(0.8);
  });

  test("should handle edge case where sample rate needs updating", () => {
    const mockRandom = jest
      .fn<() => number>()
      .mockReturnValueOnce(0.1) // Add value
      .mockReturnValueOnce(0.9) // Add value
      .mockReturnValueOnce(0.4) // Add value, triggering reduction
      .mockReturnValueOnce(0.9) // Remove first value
      .mockReturnValueOnce(0.2) // Keep second value
      .mockReturnValueOnce(0.9) // Remove last value
      .mockReturnValueOnce(0.2); // Add value

    const config: CVMConfig = { capacity: 3, randomFn: mockRandom };
    const customCvm = new CVM<number>(config);

    customCvm.add(1); // Added, then removed
    customCvm.add(2); // Skipped
    customCvm.add(3); // Added, then kept
    customCvm.add(4); // Added, then removed

    expect(customCvm.size).toEqual(2);
    expect(mockRandom).toHaveBeenCalledTimes(7);
    expect(Array.from(customCvm)).toEqual([2, 4]);
  });
});
