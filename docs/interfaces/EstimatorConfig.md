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

[estimatorConfig.ts:17](https://github.com/havelessbemore/cvm-lib/blob/00d67aa680e699adbec2926057fff1baf3d12c83/src/estimatorConfig.ts#L17)

***

### randomFn()?

> `optional` **randomFn**: () => `number`

(Optional) The random number generator function.

Should return random or pseudorandom values between 0 and 1.
Otherwise, this may cause unintended behavior such as invalid estimates.

#### Returns

`number`

#### Source

[estimatorConfig.ts:25](https://github.com/havelessbemore/cvm-lib/blob/00d67aa680e699adbec2926057fff1baf3d12c83/src/estimatorConfig.ts#L25)

***

### sampleRate?

> `optional` **sampleRate**: `number`

(Optional) The sampling rate for managing samples.

Must be between 0 and 1.

#### Remarks

Custom values may negatively affect accuracy. In general, the
further from `0.5`, the more it's affected. If [capacity](EstimatorConfig.md#capacity) was
calculated via [calculateCapacity](../functions/calculateCapacity.md), expected accuracy / confidence
may be invalidated.

#### Source

[estimatorConfig.ts:37](https://github.com/havelessbemore/cvm-lib/blob/00d67aa680e699adbec2926057fff1baf3d12c83/src/estimatorConfig.ts#L37)
