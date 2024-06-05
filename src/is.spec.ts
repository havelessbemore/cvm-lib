/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { describe, it, expect } from "@jest/globals";

import { isFraction, isPositive, isPositiveInt } from "./is";

describe(`${isFraction}()`, () => {
  it("should return true if within (0, 1)", () => {
    expect(isFraction(0.1)).toBe(true);
    expect(isFraction(0.5)).toBe(true);
    expect(isFraction(0.95)).toBe(true);
    expect(isFraction(0.999)).toBe(true);
    expect(isFraction(0.000000000000001)).toBe(true);
  });

  it("should return false if zero", () => {
    expect(isFraction(0)).toBe(false);
  });

  it("should return false if one", () => {
    expect(isFraction(1)).toBe(false);
  });

  it("should return false if outside (0, 1)", () => {
    expect(isFraction(-0.1)).toBe(false);
    expect(isFraction(1.1)).toBe(false);
    expect(isFraction(-100000)).toBe(false);
    expect(isFraction(99999999999999999999999)).toBe(false);
    expect(isFraction(Math.PI)).toBe(false);
    expect(isFraction(NaN)).toBe(false);
    expect(isFraction(Infinity)).toBe(false);
    expect(isFraction(-Infinity)).toBe(false);
    expect(isFraction("0.1")).toBe(false);
    expect(isFraction(true)).toBe(false);
    expect(isFraction(false)).toBe(false);
    expect(isFraction([0.1])).toBe(false);
    expect(isFraction(5.0)).toBe(false);
    expect(isFraction(1 - 0.00000000000000001)).toBe(false); // Loss of precision
    expect(isFraction(0 + 0.99999999999999999)).toBe(false); // Loss of precision
  });
});

describe(`${isPositive}()`, () => {
  it("should return true if positive", () => {
    expect(isPositive(1)).toBe(true);
    expect(isPositive(100000)).toBe(true);
    expect(isPositive(99999999999999999999999)).toBe(true);
    expect(isPositive(0.1)).toBe(true);
    expect(isPositive(Math.PI)).toBe(true);
    expect(isPositive(Infinity)).toBe(true);
    expect(isPositive(5.0)).toBe(true);
    expect(isPositive(0.99999999999999999)).toBe(true); // Loss of precision
  });

  it("should return false if zero", () => {
    expect(isPositive(0)).toBe(false);
  });

  it("should return true for +Infinity", () => {
    expect(isPositive(Infinity)).toBe(true);
  });

  it("should return false if negative", () => {
    expect(isPositive(-1)).toBe(false);
    expect(isPositive(-100000)).toBe(false);
    expect(isPositive(-99999999999999999999999)).toBe(false);
    expect(isPositive(-0.1)).toBe(false);
    expect(isPositive(-Math.PI)).toBe(false);
    expect(isPositive(NaN)).toBe(false);
    expect(isPositive(-Infinity)).toBe(false);
    expect(isPositive("10")).toBe(false);
    expect(isPositive(true)).toBe(false);
    expect(isPositive(false)).toBe(false);
    expect(isPositive([1])).toBe(false);
    expect(isPositive(-5.0)).toBe(false);
  });
});

describe(`${isPositiveInt}()`, () => {
  it("should return true for positive integers", () => {
    expect(isPositiveInt(1)).toBe(true);
    expect(isPositiveInt(100000)).toBe(true);
    expect(isPositiveInt(99999999999999999999999)).toBe(true);
    expect(isPositiveInt(5.0)).toBe(true);
    expect(isPositiveInt(5.0000000000000001)).toBe(true); // Loss of precision
    expect(isPositiveInt(4500000000000000.1)).toBe(true); // Loss of precision
    expect(isPositiveInt(0.99999999999999999)).toBe(true); // Loss of precision
  });

  it("should return false for zero", () => {
    expect(isPositiveInt(0)).toBe(false);
  });

  it("should return false for +Infinity", () => {
    expect(isPositiveInt(Infinity)).toBe(false);
  });

  it("should return false for negative values", () => {
    expect(isPositiveInt(0.1)).toBe(false);
    expect(isPositiveInt(-100000)).toBe(false);
    expect(isPositiveInt(-99999999999999999999999)).toBe(false);
    expect(isPositiveInt(-5.0)).toBe(false);
    expect(isPositiveInt(Math.PI)).toBe(false);
    expect(isPositiveInt(NaN)).toBe(false);
    expect(isPositiveInt(-Infinity)).toBe(false);
    expect(isPositiveInt("10")).toBe(false);
    expect(isPositiveInt(true)).toBe(false);
    expect(isPositiveInt(false)).toBe(false);
    expect(isPositiveInt([1])).toBe(false);
    expect(isPositiveInt(5.000000000000001)).toBe(false);
  });
});
