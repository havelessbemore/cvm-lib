import { CVMConfig } from "./cvmConfig";
import { tryFraction, tryPositive } from "./try";

/**
 * Estimates the number of distinct elements within an input set
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
   * The base probability used for managing samples.
   */
  protected _probability: number;

  /**
   * The random number generator function.
   */
  protected _randomFn: () => number;

  /**
   * The current sample rate.
   */
  protected _sampleRate: number;

  /**
   * The set of samples in memory.
   */
  protected _samples: Set<T>;

  /**
   * Creates an instance of the CVM algorithm.
   *
   * @param config - Configuration options for the CVM.
   */
  constructor({ capacity, probability, randomFn }: CVMConfig) {
    // Sanitize inputs
    tryPositive(capacity);
    probability ??= 0.5;
    tryFraction(probability);
    randomFn ??= Math.random;

    // Initialize instance
    this._capacity = capacity;
    this._probability = probability;
    this._randomFn = randomFn;
    this._sampleRate = 1;
    this._samples = new Set();
  }

  /**
   * Gets the threshold of the CVM.
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * Gets the estimated number of distinct elements.
   */
  get estimate(): number {
    return this._samples.size / this._sampleRate;
  }

  /**
   * Gets the probability used for managing samples.
   */
  get probability(): number {
    return this._probability;
  }

  /**
   * Gets the random number generator function.
   */
  get randomFn(): () => number {
    return this._randomFn;
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
    // Remove value if not sampled
    if (this._randomFn() >= this._sampleRate) {
      this._samples.delete(value);
      return this;
    }

    // Add value to samples
    this._samples.add(value);

    // If not at capacity
    if (this._samples.size < this._capacity) {
      return this;
    }

    // Update sample rate
    this._sampleRate *= this._probability;

    // Reduce sample size to below capacity.
    this._cull();

    return this;
  }

  /**
   * Clears / resets the CVM.
   */
  clear(): void {
    this._sampleRate = 1;
    this._samples.clear();
  }

  /**
   * Checks if a value is currently being sampled.
   *
   * @param value - The value to check for.
   *
   * @returns `true` if the value is sampled, `false` otherwise.
   */
  has(value: T): boolean {
    return this._samples.has(value);
  }

  /**
   * @returns An iterator over the currently sampled values.
   */
  values(): IterableIterator<T> {
    return this._samples.values();
  }

  /**
   * @returns An iterator over the currently sampled values.
   */
  [Symbol.iterator](): IterableIterator<T> {
    return this._samples.values();
  }

  protected _cull(): void {
    do {
      for (const value of this._samples) {
        if (this._randomFn() >= this._probability) {
          this._samples.delete(value);
        }
      }
    } while (this._samples.size >= this._capacity);
  }
}
