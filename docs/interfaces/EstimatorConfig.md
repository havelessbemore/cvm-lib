[**cvm-lib**](../README.md)

***

[cvm-lib](../globals.md) / EstimatorConfig

# Interface: EstimatorConfig\<T\>

Defined in: [types/estimatorConfig.ts:11](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/estimatorConfig.ts#L11)

Configuration options for the [Estimator](../classes/Estimator.md) class.

## Type Parameters

### T

`T` = `any`

## Properties

### capacity

> **capacity**: `number`

Defined in: [types/estimatorConfig.ts:19](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/estimatorConfig.ts#L19)

The maximum number of samples in memory. Must be a positive integer.

This should be calculated via [calculateCapacity](../functions/calculateCapacity.md) but
can also be set arbitrarily. In general, larger
values give more accurate estimates.

***

### randomFn()?

> `optional` **randomFn**: () => `number`

Defined in: [types/estimatorConfig.ts:27](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/estimatorConfig.ts#L27)

(Optional) The random number generator function.

Should return random or pseudorandom values between 0 and 1.
Otherwise, this may cause unintended behavior such as invalid estimates.

#### Returns

`number`

***

### sampleRate?

> `optional` **sampleRate**: `number`

Defined in: [types/estimatorConfig.ts:37](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/estimatorConfig.ts#L37)

(Optional) The sampling rate for managing samples. Must be between 0 and 1.

#### Remarks

Custom values may negatively affect accuracy. In general, the
further from `0.5`, the more it's affected. If [capacity](#capacity) was
calculated via [calculateCapacity](../functions/calculateCapacity.md), expected accuracy / confidence
may be invalidated.

***

### storage?

> `optional` **storage**: [`SampleSet`](SampleSet.md)\<`T`\>

Defined in: [types/estimatorConfig.ts:42](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/estimatorConfig.ts#L42)

(Optional) A custom [SampleSet](SampleSet.md) object for storing samples.
