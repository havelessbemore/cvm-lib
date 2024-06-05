import { CVMConfig } from "./cvmConfig";
import { isFraction, isPositiveInt } from "./is";

/**
 * Estimates the number of distinct values within a set
 * using a simple and space-efficient sampling strategy.
 *
 * @see {@link https://www.quantamagazine.org/computer-scientists-invent-an-efficient-new-way-to-count-20240516/ | Nadis, S. (2024, May 16). Computer Scientists Invent an Efficient New Way to Count. Quanta Magazine.} for a summary and example.
 * @see {@link https://arxiv.org/pdf/2301.10191v2 | Chakraborty, S., Vinodchandran, N. V., & Meel, K. S. (2023). Distinct Elements in Streams: An Algorithm for the (Text) Book} for the source paper.
 */
export class CVM<T> {
  /**
   * The maximum number of samples in memory.
   */
  protected _capacity: number;

  /**
   * The random number generator function.
   */
  protected _randomFn: () => number;

  /**
   * The current sample rate.
   */
  protected _rate: number;

  /**
   * The given sample rate.
   */
  protected _sampleRate: number;

  /**
   * The set of samples in memory.
   */
  protected _samples: Set<T>;

  /**
   * Creates an instance of the CVM algorithm.
   *
   * @param capacity - The maximum number of samples in memory.
   */
  constructor(capacity: number);
  /**
   * Creates an instance of the CVM algorithm.
   *
   * @param config - Configuration options.
   */
  constructor(config: CVMConfig);
  constructor(config: number | CVMConfig) {
    // Initialize with defaults
    this._capacity = 1;
    this._rate = 1;
    this._randomFn = Math.random;
    this._sampleRate = 0.5;
    this._samples = new Set();

    // Apply capacity
    if (typeof config === "number") {
      this.capacity = config;
      return;
    }

    // Apply config object
    this.capacity = config.capacity;
    config.sampleRate != null && (this.sampleRate = config.sampleRate);
    config.randomFn != null && (this.randomFn = config.randomFn);
  }

  /**
   * Gets capacity.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * Sets capacity. Should be a positive integer.
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
   * Sets the random number generator function, which should return values between 0 and 1.
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
   * Sets the sample rate. Should be between 0 and 1.
   */
  protected set sampleRate(sampleRate: number) {
    if (!isFraction(sampleRate)) {
      throw new RangeError(`Invalid sample rate`);
    }
    this._sampleRate = sampleRate;
  }

  /**
   * Gets the current number of samples in memory.
   */
  get size(): number {
    return this._samples.size;
  }

  /**
   * Adds a value to the CVM.
   *
   * @param value - The value to be added.
   *
   * @returns The CVM instance.
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
   * Clears / resets the CVM.
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
