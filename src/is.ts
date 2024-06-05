/**
 * Returns `true` if the value is between 0 and 1, `false` otherwise.
 *
 * @param value - The value.
 */
export function isFraction(value: unknown): value is number {
  return typeof value === "number" && value > 0 && value < 1;
}

/**
 * Returns `true` if the value is a positive number, `false` otherwise.
 *
 * @param value - The value.
 */
export function isPositive(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}

/**
 * Returns `true` if the value is a positive integer, `false` otherwise.
 *
 * @param value - The value.
 */
export function isPositiveInt(value: unknown): value is number {
  return Number.isInteger(value) && (value as number) > 0;
}
