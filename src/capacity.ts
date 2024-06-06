import { isFraction, isPositive } from "./is";

/**
 * Calculates the space required to estimate the number of
 * distinct values in a set with a given accuracy and confidence.
 *
 * @param n - The total number of values in the set, or an estimate if unknown.
 *
 * - Must be a positive number.
 * - If unknown, an overestimate is better, but requires more space.
 *
 * @param epsilon - An estimate's relative error. Controls accuracy.
 *
 * - Must be between 0 and 1.
 * - Smaller values equal more accuracy but more required space.
 * - Defaults to `0.05` (i.e. 95% accuracy; estimates can range within ±5% of the true value).
 *
 * @param delta - The probability an estimate is not accurate. Controls confidence.
 *
 * - Must be between 0 and 1.
 * - Smaller values equal higher confidence but more required space.
 * - Defaults to `0.01` (i.e. 99% confidence; there is a 1% chance an estimate is less accurate than expected).
 *
 * @returns The calculated capacity.
 *
 * @throws A {@link RangeError} for any of the following:
 * - `n` is not a positive number.
 * - `epsilon` is not between 0 and 1.
 * - `delta` is not between 0 and 1.
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have a 99% probability of
 *  // being within ±5% of the actual number.
 *  const capacity = calculateCapacity(1e9); // 14,617
 * ```
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have a 99% probability of
 *  // being within ±10% of the actual number.
 *  const capacity = calculateCapacity(1e9, 0.1); // 3,655
 * ```
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have an 80% probability of
 *  // being within ±5% of the actual number.
 *  const capacity = calculateCapacity(1e9, 0.05, 0.2); // 12,888
 * ```
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have a 99.999% probability of
 *  // being within ±1% of the actual number.
 *  const capacity = calculateCapacity(1e9, 0.01, 0.00001); // 465,070
 * ```
 */
export function calculateCapacity(
  n: number,
  epsilon = 0.05,
  delta = 0.01,
): number {
  if (!isPositive(n)) {
    throw new RangeError("Invalid n");
  }
  if (!isFraction(epsilon)) {
    throw new RangeError("Invalid epsilon");
  }
  if (!isFraction(delta)) {
    throw new RangeError("Invalid delta");
  }
  return Math.min(n, Math.ceil(Math.log2(n / delta) / epsilon ** 2));
}
