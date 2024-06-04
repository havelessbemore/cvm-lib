import { tryFraction, tryPositive } from "./try";

/**
 * Calculates the space required to estimate the number of
 * distinct values in a set with a given accuracy and confidence.
 *
 * @param n - The total number of values in the set, or an estimate if unknown.
 *
 * - Should be a positive integer.
 * - If estimated, an overestimate will generally give better results but require more space.
 *
 * @param epsilon - The relative error of the estimation. Controls accuracy.
 *
 * - Should be between 0 and 1.
 * - Smaller values result in more accuraacy but require more space.
 * - Defaults to `0.05` (i.e. 95% accurate, meaning estimates are within a ±5% range of the true value).
 *
 * @param delta - The probability of the estimate falling outside the accuracy range. Controls confidence.
 *
 * - Should be between 0 and 1.
 * - Smaller values result in higher confidence but require more space.
 * - Defaults to `0.01` (i.e. 99% confidence, meaning a 99% probability the estimate is within the accuracy range).
 *
 * @returns The calculated capacity.
 */
export function calculateCapacity(
  n: number,
  epsilon = 0.05,
  delta = 0.01,
): number {
  // Sanitize inputs
  tryPositive(n);
  tryFraction(epsilon);
  tryFraction(delta);
  // Calculate value
  return Math.min(n, Math.ceil(Math.log2(n / delta) / epsilon ** 2));
}
