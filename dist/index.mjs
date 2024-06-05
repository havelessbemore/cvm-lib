// src/is.ts
function isFraction(value) {
  return typeof value === "number" && value > 0 && value < 1;
}
function isPositive(value) {
  return typeof value === "number" && value > 0;
}
function isPositiveInt(value) {
  return Number.isInteger(value) && value > 0;
}

// src/capacity.ts
function calculateCapacity(n, epsilon = 0.05, delta = 0.01) {
  if (!isPositive(n)) {
    throw new RangeError("Invalid n");
  }
  if (!isFraction(epsilon)) {
    throw new RangeError("Invalid epsilon");
  }
  if (!isFraction(delta)) {
    throw new RangeError("Invalid delta");
  }
  return Math.min(n, Math.ceil(Math.log2(n / delta) / epsilon ** 2));
}

// src/cvm.ts
var CVM = class {
  /**
   * The maximum number of samples in memory.
   */
  _capacity;
  /**
   * The random number generator function.
   */
  _randomFn;
  /**
   * The current sample rate.
   */
  _rate;
  /**
   * The given sample rate.
   */
  _sampleRate;
  /**
   * The set of samples in memory.
   */
  _samples;
  constructor(config) {
    this._capacity = 1;
    this._rate = 1;
    this._randomFn = Math.random;
    this._sampleRate = 0.5;
    this._samples = /* @__PURE__ */ new Set();
    if (typeof config === "number") {
      this.capacity = config;
      return;
    }
    this.capacity = config.capacity;
    config.sampleRate != null && (this.sampleRate = config.sampleRate);
    config.randomFn != null && (this.randomFn = config.randomFn);
  }
  /**
   * Gets capacity.
   */
  get capacity() {
    return this._capacity;
  }
  /**
   * Sets capacity. Should be a positive integer.
   */
  set capacity(capacity) {
    if (!isPositiveInt(capacity)) {
      throw new RangeError(`Invalid capacity`);
    }
    this._capacity = capacity;
  }
  /**
   * Gets the random number generator function.
   */
  get randomFn() {
    return this._randomFn;
  }
  /**
   * Sets the random number generator function, which should return values between 0 and 1.
   */
  set randomFn(randomFn) {
    this._randomFn = randomFn;
  }
  /**
   * Gets the sample rate.
   */
  get sampleRate() {
    return this._sampleRate;
  }
  /**
   * Sets the sample rate. Should be between 0 and 1.
   */
  set sampleRate(sampleRate) {
    if (!isFraction(sampleRate)) {
      throw new RangeError(`Invalid sample rate`);
    }
    this._sampleRate = sampleRate;
  }
  /**
   * Gets the current number of samples in memory.
   */
  get size() {
    return this._samples.size;
  }
  /**
   * Adds a value to the CVM.
   *
   * @param value - The value to be added.
   *
   * @returns The CVM instance.
   */
  add(value) {
    if (this._randomFn() >= this._rate) {
      this._samples.delete(value);
      return this;
    }
    this._samples.add(value);
    while (this._samples.size >= this._capacity) {
      for (const value2 of this._samples) {
        if (this._randomFn() >= this._sampleRate) {
          this._samples.delete(value2);
        }
      }
      this._rate *= this._sampleRate;
    }
    return this;
  }
  /**
   * Clears / resets the CVM.
   */
  clear() {
    this._rate = 1;
    this._samples.clear();
  }
  /**
   * Gets the estimated number of distinct values.
   */
  estimate() {
    return this._samples.size / this._rate;
  }
};
export {
  CVM,
  calculateCapacity
};
//# sourceMappingURL=index.mjs.map
