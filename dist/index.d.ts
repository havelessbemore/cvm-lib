/**
 * Represents a generic set for storing samples.
 */
interface SampleSet<T> {
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

/**
 * Configuration options for the {@link Estimator} class.
 */
interface EstimatorConfig<T = any> {
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

/**
 * Calculates the space required to estimate the number of
 * distinct values in a set with a given accuracy and confidence.
 *
 * @param n - The total number of values in the set, or an estimate if unknown.
 *
 * - Must be a positive number.
 * - If unknown, an overestimate is better, but requires more space.
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
 * Estimates the number of distinct values in a set using the CVM algorithm.
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
     *
     * @defaultValue `new Set<T>()`
     */
    protected _samples: SampleSet<T>;
    /**
     * @param capacity - The maximum number of samples in memory. Must be a positive integer.
     *
     * @throws A {@link RangeError} if `capacity` is not a positive integer.
     */
    constructor(capacity: number);
    /**
     * @param config - An {@link EstimatorConfig} configuration object.
     *
     * @throws A {@link RangeError} if a given configuration is not within their expected range.
     */
    constructor(config: EstimatorConfig<T>);
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
     * @remarks Custom values may negatively affect accuracy. In general, the
     * further from `0.5`, the more it's affected. If {@link capacity} was
     * calculated via {@link calculateCapacity}, expected accuracy / confidence
     * may be invalidated.
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

export { Estimator, type EstimatorConfig, type SampleSet, calculateCapacity };
