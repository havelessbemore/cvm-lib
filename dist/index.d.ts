/**
 * Configuration options for the {@link Estimator} class.
 */
interface EstimatorConfig {
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
     * (Optional) The sampling rate for managing samples.
     *
     * Must be between 0 and 1.
     *
     * **NOTE**: This is an advanced property and should be used with caution.
     * Behavior is undefined for values other than `0.5` and may lead to invalid estimates.
     */
    sampleRate?: number;
}

/**
 * Calculates the space required to estimate the number of
 * distinct values in a set with a given accuracy and confidence.
 *
 * @param n - The total number of values in the set, or an estimate if unknown.
 *
 * - Must be a positive number.
 * - If unknown, an overestimate is better, but results in more required space.
 *
 * @param epsilon - An estimate's relative error. Controls accuracy.
 *
 * - Must be between 0 and 1.
 * - Smaller values equal more accuracy but more required space.
 * - Defaults to `0.05` (i.e. 95% accuracy; estimates can range within ±5% of the true value).
 *
 * @param delta - The probability an estimate is not accurate. Controls confidence.
 *
 * - Must be between 0 and 1.
 * - Smaller values equal higher confidence but more required space.
 * - Defaults to `0.01` (i.e. 99% confidence; there is a 1% chance an estimate is less accurate than expected).
 *
 * @returns The calculated capacity.
 *
 * @throws A {@link RangeError} for any of the following:
 * - `n` is not a positive number.
 * - `epsilon` is not between 0 and 1.
 * - `delta` is not between 0 and 1.
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have a 99% probability of
 *  // being within ±5% of the actual number.
 *  const capacity = calculateCapacity(1e9); // 14,617
 * ```
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have a 99% probability of
 *  // being within ±10% of the actual number.
 *  const capacity = calculateCapacity(1e9, 0.1); // 3,655
 * ```
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have an 80% probability of
 *  // being within ±5% of the actual number.
 *  const capacity = calculateCapacity(1e9, 0.05, 0.2); // 12,888
 * ```
 *
 * @example
 * ```javascript
 *  // Get the capacity for estimating the number
 *  // of distinct values in a set of 1 billion.
 *  // Estimates will have a 99.999% probability of
 *  // being within ±1% of the actual number.
 *  const capacity = calculateCapacity(1e9, 0.01, 0.00001); // 465,070
 * ```
 */
declare function calculateCapacity(n: number, epsilon?: number, delta?: number): number;

/**
 * Estimates the number of distinct values within a set
 * using the simple and space-efficient CVM strategy.
 *
 * @see {@link https://www.quantamagazine.org/computer-scientists-invent-an-efficient-new-way-to-count-20240516/ | Nadis, S. (2024, May 16). Computer Scientists Invent an Efficient New Way to Count. Quanta Magazine.} for a high-level explanation.
 * @see {@link https://arxiv.org/pdf/2301.10191v2 | Chakraborty, S., Vinodchandran, N. V., & Meel, K. S. (2023). Distinct Elements in Streams: An Algorithm for the (Text) Book} for the source paper.
 */
declare class Estimator<T> {
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
    protected _samples: Set<T>;
    /**
     * @param capacity - The maximum number of samples in memory. Must be a positive integer.
     *
     * @throws A {@link RangeError} if `capacity` is not a positive integer.
     */
    constructor(capacity: number);
    /**
     * @param config - A {@link EstimatorConfig} configuration object.
     *
     * @defaultValue
     * - {@link randomFn} defaults to `Math.random`.
     * - {@link sampleRate} defaults to `0.5`.
     *
     * @throws A {@link RangeError} if a given configuration value is not within their expected range.
     */
    constructor(config: EstimatorConfig);
    /**
     * Gets capacity.
     */
    get capacity(): number;
    /**
     * Sets capacity. Must be a positive integer.
     *
     * This should be calculated via {@link calculateCapacity} but
     * can also be set arbitrarily. In general, larger
     * values give more accurate estimates.
     *
     * @throws A {@link RangeError} if not given a positive integer.
     */
    protected set capacity(capacity: number);
    /**
     * Gets the random number generator function.
     */
    get randomFn(): () => number;
    /**
     * Sets the random number generator function.
     *
     * The function should return random or pseudorandom values between 0 and 1.
     * Otherwise, this may cause unintended behavior such as invalid estimates.
     */
    set randomFn(randomFn: () => number);
    /**
     * Gets the sample rate.
     */
    get sampleRate(): number;
    /**
     * Sets the sample rate. Must be between 0 and 1.
     *
     * **NOTE**: This is an advanced property and should be used with caution.
     * Behavior is undefined for values other than `0.5` and may lead to invalid estimates.
     *
     * @throws A {@link RangeError} if not given a number between 0 and 1.
     */
    protected set sampleRate(sampleRate: number);
    /**
     * Gets the number of samples in memory.
     */
    get size(): number;
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
    add(value: T): this;
    /**
     * Clears / resets the instance.
     */
    clear(): void;
    /**
     * Gets the estimated number of distinct values.
     */
    estimate(): number;
}

export { Estimator, type EstimatorConfig, calculateCapacity };
