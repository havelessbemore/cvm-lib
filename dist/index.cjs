/*!
 * cvm-lib
 * https://github.com/havelessbemore/cvm-lib
 *
 * MIT License
 *
 * Copyright (C) 2024-2024 Michael Rojas <dev.michael.rojas@gmail.com> (https://github.com/havelessbemore)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

function isFraction(value) {
  return typeof value === "number" && value > 0 && value < 1;
}
function isPositive(value) {
  return typeof value === "number" && value > 0;
}
function isPositiveInt(value) {
  return Number.isInteger(value) && value > 0;
}

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

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Estimator {
  constructor(config) {
    /**
     * The maximum number of samples in memory.
     */
    __publicField(this, "_capacity");
    /**
     * The random number generator function.
     *
     * @defaultValue `Math.random`
     */
    __publicField(this, "_randomFn");
    /**
     * The current sample rate.
     *
     * @defaultValue Initializes to `1`.
     */
    __publicField(this, "_rate");
    /**
     * The given sample rate.
     *
     * @defaultValue `0.5`
     */
    __publicField(this, "_sampleRate");
    /**
     * The set of samples in memory.
     */
    __publicField(this, "_samples");
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
   * Sets capacity. Must be a positive integer.
   *
   * This should be calculated via {@link calculateCapacity} but
   * can also be set arbitrarily. In general, larger
   * values give more accurate estimates.
   *
   * @throws A {@link RangeError} if not given a positive integer.
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
   * Sets the random number generator function.
   *
   * The function should return random or pseudorandom values between 0 and 1.
   * Otherwise, this may cause unintended behavior such as invalid estimates.
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
   * Sets the sample rate. Must be between 0 and 1.
   *
   * **NOTE**: This is an advanced property and should be used with caution.
   * Behavior is undefined for values other than `0.5` and may lead to invalid estimates.
   *
   * @throws A {@link RangeError} if not given a number between 0 and 1.
   */
  set sampleRate(sampleRate) {
    if (!isFraction(sampleRate)) {
      throw new RangeError(`Invalid sample rate`);
    }
    this._sampleRate = sampleRate;
  }
  /**
   * Gets the number of samples in memory.
   */
  get size() {
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
   * Clears / resets the instance.
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
}

exports.Estimator = Estimator;
exports.calculateCapacity = calculateCapacity;
//# sourceMappingURL=index.cjs.map
