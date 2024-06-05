// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { calculateCapacity } from "./capacity";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CVM } from "./cvm";

/**
 * Configuration options for {@link CVM}.
 */
export interface CVMConfig {
  /**
   * The maximum number of samples in memory. Must be a positive integer.
   *
   * This should be calculated via {@link calculateCapacity} but
   * can also be set arbitrarily. In general, larger
   * values give more accurate estimates.
   */
  capacity: number;

  /**
   * (Optional) The random number generator function.
   *
   * Should return random or pseudorandom values between 0 and 1. Otherwise, behavior is undefined,
   * and may cause invalid estimates, infinite loops and/or crashes.
   */
  randomFn?: () => number;

  /**
   * (Optional) The sampling rate for managing samples.
   *
   * Must be between 0 and 1.
   *
   * **NOTE**: This is an advanced property and should be used with caution.
   * Behavior is undefined for values other than `0.5` and may lead to invalid estimates.
   */
  sampleRate?: number;
}
