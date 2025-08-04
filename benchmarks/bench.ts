import { calculateCapacity, Estimator } from "../src";
import {
  createSeries,
  getAvg,
  getDistinct,
  getMax,
  getMin,
  getVariance,
} from "./utils";

// Create the series
const N = 1e6;
console.log(`Generating ${N} random integers...`);
const series = createSeries(N, 1e7, 1e8 - 1);

// Print expected results
console.log(`Counting distinct values...`);
const expected = getDistinct(series);
console.log(`Distinct: ${expected}`);

// Perform multiple estimates
const iters = 256;
const capacity = calculateCapacity(N);
console.log(`Performing ${iters} estimates with capacity ${capacity}...`);
const estimates = new Array(iters);
for (let i = 0; i < iters; ++i) {
  const cvm = new Estimator<number>(capacity);
  for (let j = 0; j < N; ++j) {
    cvm.add(series[j]);
  }
  estimates[i] = cvm.estimate();
}

// Collect results
console.log(`Analyzing results...`);
estimates.sort((a, b) => a - b);
const min = getMin(estimates)!;
const max = getMax(estimates)!;
const avg = getAvg(estimates)!;
const med =
  (iters & 1) === 1
    ? estimates[iters >> 1]
    : (estimates[(iters - 1) >> 1] + estimates[iters >> 1]) / 2;
const dev = Math.sqrt(getVariance(estimates, avg)!);

// Print results
const p = 2;
console.log(`Expected: ${expected} ± 5%`);
console.group("Actual:");
console.log(`Min: ${min} (${(100 * (min / expected - 1)).toFixed(p)}%)`);
console.log(`Avg: ${avg} (${(100 * (avg / expected - 1)).toFixed(p)}%)`);
console.log(`Max: ${max} (${(100 * (max / expected - 1)).toFixed(p)}%)`);
console.log(`Median: ${med} (${(100 * (med / expected - 1)).toFixed(p)}%)`);
console.log(`Std Dev: ${dev.toFixed(p)} (${((100 * dev) / avg).toFixed(p)}%)`);
console.groupEnd();
