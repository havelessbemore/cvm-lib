// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { calculateCapacity } from "./capacity";
import type { EstimatorConfig } from "./estimatorConfig";
import { isFraction, isPositiveInt } from "./is";
import type { Storage } from "./storage";

/**
 * Estimates the number of distinct values in a set using the CVM algorithm.
 */
export class Estimator<T> {
  /**
   * The maximum number of samples in memory.
   */
  protected _capacity: number;

  /**
   * The random number generator function.
   *
   * @defaultValue `Math.random`
   */
  protected _randomFn: () => number;

  /**
   * The current sample rate.
   *
   * @defaultValue Initializes to `1`.
   */
  protected _rate: number;

  /**
   * The given sample rate.
   *
   * @defaultValue `0.5`
   */
  protected _sampleRate: number;

  /**
   * The set of samples in memory.
   */
  protected _samples: Storage<T>;

  /**
   * @param capacity - The maximum number of samples in memory. Must be a positive integer.
   *
   * @throws A {@link RangeError} if `capacity` is not a positive integer.
   */
  constructor(capacity: number);
  /**
   * @param config - An {@link EstimatorConfig} configuration object.
   *
   * @defaultValue
   * - {@link randomFn} - `Math.random`.
   * - {@link sampleRate} - `0.5`.
   * - {@link storage} - `new Set()`.
   *
   * @throws A {@link RangeError} if a given configuration is not within their expected range.
   */
  constructor(config: EstimatorConfig<T>);
  constructor(config: number | EstimatorConfig<T>) {
    // Initialize with defaults
    this._capacity = 1;
    this._rate = 1;
    this._randomFn = Math.random;
    this._sampleRate = 0.5;

    // Apply capacity
    if (typeof config === "number") {
      this.capacity = config;
      this._samples = new Set();
      return;
    }

    // Apply config object
    this.capacity = config.capacity;
    config.randomFn != null && (this.randomFn = config.randomFn);
    config.sampleRate != null && (this.sampleRate = config.sampleRate);
    this._samples = config.storage ?? new Set();
  }

  /**
   * Gets capacity.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * Sets capacity. Must be a positive integer.
   *
   * This should be calculated via {@link calculateCapacity} but
   * can also be set arbitrarily. In general, larger
   * values give more accurate estimates.
   *
   * @throws A {@link RangeError} if not given a positive integer.
   */
  protected set capacity(capacity: number) {
    if (!isPositiveInt(capacity)) {
      throw new RangeError(`Invalid capacity`);
    }
    this._capacity = capacity;
  }

  /**
   * Gets the random number generator function.
   */
  get randomFn(): () => number {
    return this._randomFn;
  }

  /**
   * Sets the random number generator function.
   *
   * The function should return random or pseudorandom values between 0 and 1.
   * Otherwise, this may cause unintended behavior such as invalid estimates.
   */
  set randomFn(randomFn: () => number) {
    this._randomFn = randomFn;
  }

  /**
   * Gets the sample rate.
   */
  get sampleRate(): number {
    return this._sampleRate;
  }

  /**
   * Sets the sample rate. Must be between 0 and 1.
   *
   * @remarks Custom values may negatively affect accuracy. In general, the
   * further from `0.5`, the more it's affected. If {@link capacity} was
   * calculated via {@link calculateCapacity}, expected accuracy / confidence
   * may be invalidated.
   *
   * @throws A {@link RangeError} if not given a number between 0 and 1.
   */
  protected set sampleRate(sampleRate: number) {
    if (!isFraction(sampleRate)) {
      throw new RangeError(`Invalid sample rate`);
    }
    this._sampleRate = sampleRate;
  }

  /**
   * Gets the number of samples in memory.
   */
  get size(): number {
    return this._samples.size;
  }

  /**
   * Add a value.
   *
   * Given values may be randomly selected for sampling. If selected,
   * the value is stored internally. Otherwise, they are ignored, or
   * discarded if previously selected.
   *
   * If capacity is reached, samples are resampled,
   * and only values that are again selected are kept.
   * This process repeats until free space is made.
   *
   * @param value - The value to add.
   *
   * @returns The instance.
   */
  add(value: T): this {
    // Ignore / remove value if not sampled
    if (this._randomFn() >= this._rate) {
      this._samples.delete(value);
      return this;
    }

    // Add sample
    this._samples.add(value);

    // While at capacity
    while (this._samples.size >= this._capacity) {
      // Reduce samples to within capacity
      for (const value of this._samples) {
        if (this._randomFn() >= this._sampleRate) {
          this._samples.delete(value);
        }
      }

      // Update current sampling rate
      this._rate *= this._sampleRate;
    }

    return this;
  }

  /**
   * Clears / resets the instance.
   */
  clear(): void {
    this._rate = 1;
    this._samples.clear();
  }

  /**
   * Gets the estimated number of distinct values.
   */
  estimate(): number {
    return this._samples.size / this._rate;
  }
}
