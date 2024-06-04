/**
 * Validates the given value is in the range (0, 1).
 *
 * @param value - The value to be validated.
 *
 * @returns `true` if between 0 and 1, `false` otherwise.
 */
export function isFraction(value: unknown): value is number {
  return typeof value === "number" && value > 0 && value < 1;
}

/**
 * Validates the given value is a nonnegative number.
 *
 * @param value - The value to be validated.
 *
 * @returns `true` if nonnegative, `false` otherwise.
 */
export function isNonnegative(value: unknown): value is number {
  return typeof value === "number" && value >= 0;
}

/**
 * Validates the given value is a nonnegative integer.
 *
 * @param value - The value to be validated.
 *
 * @returns `true` if a nonnegative integer, `false` otherwise.
 */
export function isNonnegativeInt(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) >= 0;
}

/**
 * Validates the given value is a positive number.
 *
 * @param value - The value to be validated.
 *
 * @returns `true` if a positive number, `false` otherwise.
 */
export function isPositive(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}

/**
 * Validates the given value is a positive integer.
 *
 * @param value - The value to be validated.
 *
 * @returns `true` if a positive integer, `false` otherwise.
 */
export function isPositiveInt(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}
