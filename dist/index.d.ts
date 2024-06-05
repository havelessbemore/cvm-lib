/**
 * Configuration options for the CVM algorithm.
 */
interface CVMConfig {
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

/**
 * Calculates the space required to estimate the number of
 * distinct values in a set with a given accuracy and confidence.
 *
 * @param n - The total number of values in the set, or an estimate if unknown.
 *
 * - Should be a positive value.
 * - If unknown, an overestimate is better, but results in more space.
 *
 * @param epsilon - The relative error. Controls accuracy.
 *
 * - Should be between 0 and 1.
 * - Smaller values equal more accuracy but more space.
 * - Defaults to `0.05` (i.e. 95% accuracy; estimates can range within ±5% of the true value).
 *
 * @param delta - The probability an estimate is not within expected accuracy. Controls confidence.
 *
 * - Should be between 0 and 1.
 * - Smaller values equal higher confidence but more space.
 * - Defaults to `0.01` (i.e. 99% confidence; there is a 1% chance an estimate is outside the expected accuracy range).
 *
 * @returns The calculated capacity.
 */
declare function calculateCapacity(n: number, epsilon?: number, delta?: number): number;

/**
 * Estimates the number of distinct values within a set
 * using a simple and space-efficient sampling strategy.
 *
 * @see {@link https://www.quantamagazine.org/computer-scientists-invent-an-efficient-new-way-to-count-20240516/ | Nadis, S. (2024, May 16). Computer Scientists Invent an Efficient New Way to Count. Quanta Magazine.} for a summary and example.
 * @see {@link https://arxiv.org/pdf/2301.10191v2 | Chakraborty, S., Vinodchandran, N. V., & Meel, K. S. (2023). Distinct Elements in Streams: An Algorithm for the (Text) Book} for the source paper.
 */
declare class CVM<T> {
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
    /**
     * Gets capacity.
     */
    get capacity(): number;
    /**
     * Sets capacity. Should be a positive integer.
     */
    protected set capacity(capacity: number);
    /**
     * Gets the random number generator function.
     */
    get randomFn(): () => number;
    /**
     * Sets the random number generator function, which should return values between 0 and 1.
     */
    set randomFn(randomFn: () => number);
    /**
     * Gets the sample rate.
     */
    get sampleRate(): number;
    /**
     * Sets the sample rate. Should be between 0 and 1.
     */
    protected set sampleRate(sampleRate: number);
    /**
     * Gets the current number of samples in memory.
     */
    get size(): number;
    /**
     * Adds a value to the CVM.
     *
     * @param value - The value to be added.
     *
     * @returns The CVM instance.
     */
    add(value: T): this;
    /**
     * Clears / resets the CVM.
     */
    clear(): void;
    /**
     * Gets the estimated number of distinct values.
     */
    estimate(): number;
}

export { CVM, type CVMConfig, calculateCapacity };
