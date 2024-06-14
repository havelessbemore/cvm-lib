/**
 * Represents a storage container for storing unique values of any type.
 */
export interface Storage<T> {
  /**
   * Gets the number of values in storage.
   *
   * @readonly
   */
  readonly size: number;

  /**
   * Adds a value to storage.
   *
   * @param value - The value to be added.
   *
   * @returns The storage instance.
   */
  add(value: T): this;

  /**
   * Clears all values from storage.
   */
  clear(): void;

  /**
   * Deletes a value from storage.
   *
   * @param value - The value to be deleted.
   *
   * @returns `true` if the value was successfully deleted, `false` otherwise.
   */
  delete(value: T): boolean;

  /**
   * Iterates through stored values. Iteration order is determined by the
   * implementation (e.g., insertion order, sorted, random, etc.).
   */
  [Symbol.iterator](): Iterator<T>;
}
