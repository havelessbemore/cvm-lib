import { calculateCapacity, Estimator } from "../../dist/index.mjs";

function genInt(min, max, randomFn = Math.random) {
  return Math.trunc(min + (max - min) * randomFn());
}

async function main() {
  const expectedRelErr = 0.1;
  const numVals = 1e6;
  const valMin = 1e7;
  const valMax = 1e8 - 1;

  // Get estimate; expect 90% accuracy, with 99% confidence
  const capacity = calculateCapacity(numVals, expectedRelErr, 0.01);
  const cvm = new Estimator(capacity);
  const set = new Set();
  for (let i = 0; i < numVals; ++i) {
    const v = genInt(valMin, valMax);
    cvm.add(v);
    set.add(v);
  }

  const expected = set.size;
  const actual = cvm.estimate();
  const actualRelErr = actual / expected - 1;

  // Print results
  console.log(`Total values: ${numVals}`);
  console.log(`CVM capacity: ${cvm.capacity}`);
  console.log(
    `Expected uniques: ${expected} ± ${(100 * expectedRelErr).toFixed(2)}%`,
  );
  console.log(
    `Estimated uniques: ${actual} (${(100 * actualRelErr).toFixed(2)}%)`,
  );
}

main();
