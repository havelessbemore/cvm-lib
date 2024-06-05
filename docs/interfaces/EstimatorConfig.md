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

[estimatorConfig.ts:17](https://github.com/havelessbemore/cvm-lib/blob/b33b73a56ce226efcf5a478673aa1f6e9864ce78/src/estimatorConfig.ts#L17)

***

### randomFn()?

> `optional` **randomFn**: () => `number`

(Optional) The random number generator function.

Should return random or pseudorandom values between 0 and 1.
Otherwise, this may cause unintended behavior such as invalid estimates.

#### Returns

`number`

#### Source

[estimatorConfig.ts:25](https://github.com/havelessbemore/cvm-lib/blob/b33b73a56ce226efcf5a478673aa1f6e9864ce78/src/estimatorConfig.ts#L25)

***

### sampleRate?

> `optional` **sampleRate**: `number`

(Optional) The sampling rate for managing samples.

Must be between 0 and 1.

**NOTE**: This is an advanced property and should be used with caution.
Behavior is undefined for values other than `0.5` and may lead to invalid estimates.

#### Source

[estimatorConfig.ts:35](https://github.com/havelessbemore/cvm-lib/blob/b33b73a56ce226efcf5a478673aa1f6e9864ce78/src/estimatorConfig.ts#L35)
