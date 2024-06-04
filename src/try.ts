/**
 * Validates the given value is in the range (0, 1).
 *
 * @param value - The value to be validated.
 *
 * @returns The validated value.
 *
 * @throws {RangeError} If validation fails.
 */
export function tryFraction(value: number): number {
  if (value <= 0 || value >= 1) {
    throw new RangeError("Value must be a number between 0 and 1.");
  }
  return value;
}

/**
 * Validates the given value is positive.
 *
 * @param value - The value to be validated.
 *
 * @returns The validated value.
 *
 * @throws {RangeError} If validation fails.
 */
export function tryPositive(value: number): number {
  if (value <= 0) {
    throw new RangeError("Value must be positive.");
  }
  return value;
}
