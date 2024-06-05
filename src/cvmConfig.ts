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
   * (Optional) The random number generator function. Should return values between 0 and 1.
   */
  randomFn?: () => number;

  /**
   * (Optional) The sampling rate for managing samples. Should be between 0 and 1.
   *
   * @remarks Use with caution. Behavior for values other than `0.5` is undefined and may cause invalid estimates and/or increased runtime.
   */
  sampleRate?: number;
}
