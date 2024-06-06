/**
 * Returns `true` if the value passed is between 0 and 1, `false` otherwise.
 *
 * @param number - A numeric value.
 */
export function isFraction(number: unknown): number is number {
  return typeof number === "number" && number > 0 && number < 1;
}

/**
 * Returns `true` if the value passed is a positive number, `false` otherwise.
 *
 * @param number - A numeric value.
 */
export function isPositive(number: unknown): number is number {
  return typeof number === "number" && number > 0;
}

/**
 * Returns `true` if the value passed is a positive integer, `false` otherwise.
 *
 * @param number - A numeric value.
 */
export function isPositiveInt(number: unknown): number is number {
  return Number.isInteger(number) && (number as number) > 0;
}
