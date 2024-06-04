import { describe, it, expect } from "@jest/globals";

import { calculateCapacity } from "./capacity";

describe(`${calculateCapacity}()`, () => {
  it("should calculate the required capacity with default accuracy and confidence", () => {
    const result = calculateCapacity(1e4);
    expect(result).toBeLessThanOrEqual(1e4);
    expect(result).toBe(Math.ceil(Math.log2(1e4 / 0.01) / 0.05 ** 2));
  });

  it("should calculate the required capacity with given accuracy and confidence", () => {
    const result = calculateCapacity(1e4, 0.1, 0.05);
    expect(result).toBeLessThanOrEqual(1e4);
    expect(result).toBe(Math.ceil(Math.log2(1e4 / 0.05) / 0.1 ** 2));
  });

  it("should return the given number of elements for small sets", () => {
    expect(calculateCapacity(10)).toBe(10);
    expect(calculateCapacity(100)).toBe(100);
    expect(calculateCapacity(1000)).toBe(1000);
    expect(calculateCapacity(7832)).toBe(7832);
  });

  it("should throw an error for invalid total", () => {
    expect(() => calculateCapacity(-100)).toThrow(RangeError);
  });

  it("should throw an error for invalid accuracy", () => {
    expect(() => calculateCapacity(1000, 1.1)).toThrow(RangeError);
  });

  it("should throw an error for invalid confidence", () => {
    expect(() => calculateCapacity(1000, 0.95, 1.1)).toThrow(RangeError);
  });
});
