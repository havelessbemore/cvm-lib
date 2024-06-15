/**
 * Represents a generic set for storing samples.
 */
export interface SampleSet<T> {
  /**
   * Gets the number of values in the set.
   *
   * @readonly
   */
  readonly size: number;

  /**
   * Adds a value to the set.
   *
   * @param value - The value to add.
   *
   * @returns The set instance.
   */
  add(value: T): this;

  /**
   * Clears all values from the set.
   */
  clear(): void;

  /**
   * Removes a specified value from the set.
   *
   * @param value - The value to remove.
   *
   * @returns `true` if a value existed in the set and has been removed, `false` otherwise.
   */
  delete(value: T): boolean;

  /**
   * @returns an {@link Iterator} over the values in the set. The values are returned
   * in no particular order unless a guarantee is given by the implementing class.
   */
  [Symbol.iterator](): Iterator<T>;
}
