import { isFraction, isPositive } from "./is";

/**
 * Calculates the space required to estimate the number of
 * distinct values in a set with a given accuracy and confidence.
 *
 * @param n - The total number of values in the set, or an estimate if unknown.
 *
 * - Should be a positive value.
 * - If unknown, an overestimate is better, but results in more space.
 *
 * @param epsilon - The relative error. Controls accuracy.
 *
 * - Should be between 0 and 1.
 * - Smaller values equal more accuracy but more space.
 * - Defaults to `0.05` (i.e. 95% accuracy; estimates can range within ±5% of the true value).
 *
 * @param delta - The probability an estimate is not within expected accuracy. Controls confidence.
 *
 * - Should be between 0 and 1.
 * - Smaller values equal higher confidence but more space.
 * - Defaults to `0.01` (i.e. 99% confidence; there is a 1% chance an estimate is outside the expected accuracy range).
 *
 * @returns The calculated capacity.
 */
export function calculateCapacity(
  n: number,
  epsilon = 0.05,
  delta = 0.01,
): number {
  // Sanitize inputs
  if (!isPositive(n)) {
    throw new RangeError("Invalid n");
  }
  if (!isFraction(epsilon)) {
    throw new RangeError("Invalid epsilon");
  }
  if (!isFraction(delta)) {
    throw new RangeError("Invalid delta");
  }
  // Calculate value
  return Math.min(n, Math.ceil(Math.log2(n / delta) / epsilon ** 2));
}
