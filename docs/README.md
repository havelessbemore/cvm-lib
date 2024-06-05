**cvm-lib** • [**Docs**](globals.md)

***

# CVM Library

Estimate the number of distinct values in a set using the simple and space-efficient [CVM algorithm](https://arxiv.org/pdf/2301.10191v2).

[![Version](https://img.shields.io/npm/v/cvm-lib.svg)](https://www.npmjs.com/package/cvm-lib)
[![JSR](https://jsr.io/badges/@rojas/cvm)](https://jsr.io/@rojas/cvm)
[![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)](https://github.com/havelessbemore/cvm-lib/graphs/commit-activity)
[![License](https://img.shields.io/github/license/havelessbemore/cvm-lib.svg)](https://github.com/havelessbemore/cvm-lib/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/havelessbemore/cvm-lib/graph/badge.svg?token=F362G7C9U0)](https://codecov.io/gh/havelessbemore/cvm-lib)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/cvm-lib)

## Getting Started

### Install

NPM:

```bash
npm install cvm-lib
```

Yarn:

```bash
yarn add cvm-lib
```

JSR:

```bash
jsr add @rojas/cvm
```

## Examples

Examples can be found in the [examples directory](./examples/).

### Hamlet

Estimate the number of unique words in _Hamlet_:

```bash
node ./examples/hamlet/index.js
```

- Total words: ~31,000
- Estimator capacity: 2,157
- Expected: 4,762 (±10%)
- Actual: 4,712 (-1.05%)

### Much Ado About Nothing

Estimate the number of unique words in _Much Ado About Nothing_:

```bash
node ./examples/muchAdo/index.js
```

- Total words: ~21,000
- Estimator capacity: 2,101
- Expected: 2,978 (±10%)
- Actual: 3,002 (0.81%)

### Romeo and Juliet

Estimate the number of unique words in _Romeo and Juliet_:

```bash
node ./examples/romeoAndJuliet/index.js
```

- Total words: ~25,000
- Estimator capacity: 2,126
- Expected: 3,740 (±10%)
- Actual: 3,732 (-0.21%)

## API

### Functions

#### `calculateCapacity(n, epsilon, delta)`

Calculates the space required to estimate the number of distinct values in a set with a given accuracy and confidence.

- `n`: The total number of values in the set. Must be a positive number.
- `epsilon` (optional): An estimate's relative error. Controls accuracy. Must be between 0 and 1. Defaults to `0.05`.
- `delta` (optional): The probability an estimate is not accurate. Controls confidence. Must be between 0 and 1. Defaults to `0.01`.

### Classes

#### `Estimator<T>`

Estimates the number of distinct values in a set.

- Constructors

  - `new (capacity)`: Create an instance with a given capacity. Must be a positive integer.
    - Defaults:
      - `randomFn`: `Math.random`.
      - `sampleRate`: `0.5`.
  - `new (config)`: Create an instance using a config object.

- Properties

  - `capacity`: Gets the maximum number of samples in memory.
  - `randomFn`: Gets or sets the random number generator function.
  - `sampleRate` Gets the base sample rate.
  - `size`: Gets the number of samples in memory.

- Methods

  - `add(value)`: Adds a value.
  - `clear()`: Clears/resets the instance.
  - `estimate()`: Gets the estimated number of distinct values.

### Interfaces

#### `EstimatorConfig`

A configuration object used to create `Estimator` instances.

- `capacity`: The maximum number of samples in memory. Must be a positive integer.
- `randomFn` (optional): The random number generator function.
  - The function should return random or pseudorandom values between 0 and 1.
    Otherwise, this may cause unintended behavior such as invalid estimates.
- `sampleRate` (optional): The sampling rate for managing samples. Must be between 0 and 1.
  - **Note:** Behavior is undefined for values other than `0.5`. Use with caution as it may
    cause invalid estimates.

## References

1. Source paper: [Chakraborty, S., Vinodchandran, N. V., & Meel, K. S. (2023). Distinct Elements in Streams: An Algorithm for the (Text) Book](https://arxiv.org/pdf/2301.10191v2)
1. Notes by Donald Knuth: [Knuth, D. E. (2023). The CVM Algorithm for Estimating Distinct Elements in Streams. Stanford Computer Science Department](https://cs.stanford.edu/~knuth/papers/cvm-note.pdf).
1. Wikipedia: [CVM Algorithm](https://en.wikipedia.org/wiki/Count-distinct_problem#CVM_Algorithm).

## Community and Support

Contributions are welcome!

- **Questions / Dicussions**: Please contact us via [GitHub discussions](https://github.com/havelessbemore/cvm-lib/discussions).

- **Bug Reports**: Please use the [GitHub issue tracker](https://github.com/havelessbemore/cvm-lib/issues) to report any bugs. Include a detailed description and any relevant code snippets or logs.

- **Feature Requests**: Please submit feature requests as issues, clearly describing the feature and its potential benefits.

- **Pull Requests**: Please ensure your code adheres to the existing style of the project and include any necessary tests and documentation.

For more information, check out the [contributor's guide](https://github.com/havelessbemore/cvm-lib/CONTRIBUTING.md).

## Build

1. Clone the project from github

```bash
git clone git@github.com:havelessbemore/cvm-lib.git
cd cvm-lib
```

2. Install dependencies

```bash
npm install
```

3. Build the project

```bash
npm run build
```

This will output ECMAScript (`.mjs`) and CommonJS (`.cjs`) modules in the `dist/` directory.

## Format

To run the code linter:

```bash
npm run lint
```

To automatically fix linting issues, run:

```bash
npm run format
```

## Test

To run tests:

```bash
npm test
```

To run tests with a coverage report:

```bash
npm run test:coverage
```

A coverage report is generated at `./coverage/index.html`.
