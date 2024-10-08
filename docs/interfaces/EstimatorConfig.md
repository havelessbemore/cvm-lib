[**cvm-lib**](../README.md) • **Docs**

***

[cvm-lib](../globals.md) / EstimatorConfig

# Interface: EstimatorConfig\<T\>

Configuration options for the [Estimator](../classes/Estimator.md) class.

## Type Parameters

• **T** = `any`

## Properties

### capacity

> **capacity**: `number`

The maximum number of samples in memory. Must be a positive integer.

This should be calculated via [calculateCapacity](../functions/calculateCapacity.md) but
can also be set arbitrarily. In general, larger
values give more accurate estimates.

#### Defined in

[types/estimatorConfig.ts:19](https://github.com/havelessbemore/cvm-lib/blob/d0e42e507693783738e61204cf1d8fd9eaa485bc/src/types/estimatorConfig.ts#L19)

***

### randomFn()?

> `optional` **randomFn**: () => `number`

(Optional) The random number generator function.

Should return random or pseudorandom values between 0 and 1.
Otherwise, this may cause unintended behavior such as invalid estimates.

#### Returns

`number`

#### Defined in

[types/estimatorConfig.ts:27](https://github.com/havelessbemore/cvm-lib/blob/d0e42e507693783738e61204cf1d8fd9eaa485bc/src/types/estimatorConfig.ts#L27)

***

### sampleRate?

> `optional` **sampleRate**: `number`

(Optional) The sampling rate for managing samples. Must be between 0 and 1.

#### Remarks

Custom values may negatively affect accuracy. In general, the
further from `0.5`, the more it's affected. If [capacity](EstimatorConfig.md#capacity) was
calculated via [calculateCapacity](../functions/calculateCapacity.md), expected accuracy / confidence
may be invalidated.

#### Defined in

[types/estimatorConfig.ts:37](https://github.com/havelessbemore/cvm-lib/blob/d0e42e507693783738e61204cf1d8fd9eaa485bc/src/types/estimatorConfig.ts#L37)

***

### storage?

> `optional` **storage**: [`SampleSet`](SampleSet.md)\<`T`\>

(Optional) A custom [SampleSet](SampleSet.md) object for storing samples.

#### Defined in

[types/estimatorConfig.ts:42](https://github.com/havelessbemore/cvm-lib/blob/d0e42e507693783738e61204cf1d8fd9eaa485bc/src/types/estimatorConfig.ts#L42)
