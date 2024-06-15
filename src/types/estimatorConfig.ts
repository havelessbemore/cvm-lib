// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { calculateCapacity } from "../capacity";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Estimator } from "../estimator";
import type { SampleSet } from "./sampleSet";

/**
 * Configuration options for the {@link Estimator} class.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface EstimatorConfig<T = any> {
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
   * Should return random or pseudorandom values between 0 and 1.
   * Otherwise, this may cause unintended behavior such as invalid estimates.
   */
  randomFn?: () => number;

  /**
   * (Optional) The sampling rate for managing samples. Must be between 0 and 1.
   *
   * @remarks Custom values may negatively affect accuracy. In general, the
   * further from `0.5`, the more it's affected. If {@link capacity} was
   * calculated via {@link calculateCapacity}, expected accuracy / confidence
   * may be invalidated.
   */
  sampleRate?: number;

  /**
   * (Optional) A custom {@link SampleSet} object for storing samples.
   */
  storage?: SampleSet<T>;
}
