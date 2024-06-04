// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { calculateCapacity } from "./capacity";

/**
 * Configuration options for the CVM algorithm.
 */
export interface CVMConfig {
  /**
   * The maximum number of sample values to have in memory.
   *
   * Should be a positive integer.
   *
   * Can be calculated with {@link calculateCapacity} but
   * can also be set arbitrarily. In general, the larger
   * the capacity, the more accurate the estimate.
   */
  capacity: number;

  /**
   * (Optional) The random number generator function. Defaults to `Math.random`.
   */
  randomFn?: () => number;

  /**
   * (Optional) The probability used for collecting and discarding samples. Should be between 0 and 1.
   *
   * @remarks Should NOT be used unless you know what you're doing. Misuse can cause invalid results and/or increased runtime.
   */
  sampleRate?: number;
}
