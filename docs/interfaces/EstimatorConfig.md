[**cvm-lib**](../README.md) • **Docs**

***

[cvm-lib](../globals.md) / EstimatorConfig

# Interface: EstimatorConfig

Configuration options for the [Estimator](../classes/Estimator.md) class.

## Properties

### capacity

> **capacity**: `number`

The maximum number of samples in memory. Must be a positive integer.

This should be calculated via [calculateCapacity](../functions/calculateCapacity.md) but
can also be set arbitrarily. In general, larger
values give more accurate estimates.

#### Source

[estimatorConfig.ts:17](https://github.com/havelessbemore/cvm-lib/blob/04b68a799078dd23b2fa0a4287fc69529ca49da0/src/estimatorConfig.ts#L17)

***

### randomFn()?

> `optional` **randomFn**: () => `number`

(Optional) The random number generator function.

Should return random or pseudorandom values in [0, 1). Otherwise, behavior is undefined,
and may cause invalid estimates, infinite loops and/or crashes.

#### Returns

`number`

#### Source

[estimatorConfig.ts:25](https://github.com/havelessbemore/cvm-lib/blob/04b68a799078dd23b2fa0a4287fc69529ca49da0/src/estimatorConfig.ts#L25)

***

### sampleRate?

> `optional` **sampleRate**: `number`

(Optional) The sampling rate for managing samples.

Must be between 0 and 1.

**NOTE**: This is an advanced property and should be used with caution.
Behavior is undefined for values other than `0.5` and may lead to invalid estimates.

#### Source

[estimatorConfig.ts:35](https://github.com/havelessbemore/cvm-lib/blob/04b68a799078dd23b2fa0a4287fc69529ca49da0/src/estimatorConfig.ts#L35)
