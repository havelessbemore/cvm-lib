import { describe, it, expect } from "@jest/globals";

import { tryFraction, tryPositive } from "./try";

describe(`${tryFraction}()`, () => {
  it("should return the accuracy if within range", () => {
    expect(tryFraction(0.001)).toBe(0.001);
    expect(tryFraction(0.5)).toBe(0.5);
    expect(tryFraction(0.95)).toBe(0.95);
    expect(tryFraction(0.999)).toBe(0.999);
  });

  it("should throw a RangeError if accuracy is out of range", () => {
    expect(() => tryFraction(-0.1)).toThrow(RangeError);
    expect(() => tryFraction(0)).toThrow(RangeError);
    expect(() => tryFraction(1)).toThrow(RangeError);
    expect(() => tryFraction(1.1)).toThrow(RangeError);
  });
});

describe(`${tryPositive}()`, () => {
  it("should return the total if it is positive", () => {
    expect(tryPositive(1)).toBe(1);
    expect(tryPositive(100)).toBe(100);
    expect(tryPositive(1e9)).toBe(1e9);
  });

  it("should throw a RangeError if total is not positive", () => {
    expect(() => tryPositive(-100)).toThrow(RangeError);
    expect(() => tryPositive(-1)).toThrow(RangeError);
    expect(() => tryPositive(0)).toThrow(RangeError);
  });
});
