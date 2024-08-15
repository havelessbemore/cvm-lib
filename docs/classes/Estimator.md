[**cvm-lib**](../README.md) • **Docs**

***

[cvm-lib](../globals.md) / Estimator

# Class: Estimator\<T\>

Estimates the number of distinct values in a set using the CVM algorithm.

## Type Parameters

• **T**

## Constructors

### new Estimator()

> **new Estimator**\<`T`\>(`capacity`): [`Estimator`](Estimator.md)\<`T`\>

#### Parameters

• **capacity**: `number`

The maximum number of samples in memory. Must be a positive integer.

#### Returns

[`Estimator`](Estimator.md)\<`T`\>

#### Throws

A RangeError if `capacity` is not a positive integer.

#### Defined in

[estimator.ts:49](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L49)

### new Estimator()

> **new Estimator**\<`T`\>(`config`): [`Estimator`](Estimator.md)\<`T`\>

#### Parameters

• **config**: [`EstimatorConfig`](../interfaces/EstimatorConfig.md)\<`T`\>

An [EstimatorConfig](../interfaces/EstimatorConfig.md) configuration object.

#### Returns

[`Estimator`](Estimator.md)\<`T`\>

#### Throws

A RangeError if a given configuration is not within their expected range.

#### Defined in

[estimator.ts:55](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L55)

## Properties

### \_capacity

> `protected` **\_capacity**: `number`

The maximum number of samples in memory.

#### Defined in

[estimator.ts:14](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L14)

***

### \_randomFn()

> `protected` **\_randomFn**: () => `number`

The random number generator function.

#### Returns

`number`

#### Default Value

`Math.random`

#### Defined in

[estimator.ts:21](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L21)

***

### \_rate

> `protected` **\_rate**: `number`

The current sample rate.

#### Default Value

Initializes to `1`.

#### Defined in

[estimator.ts:28](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L28)

***

### \_sampleRate

> `protected` **\_sampleRate**: `number`

The given sample rate.

#### Default Value

`0.5`

#### Defined in

[estimator.ts:35](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L35)

***

### \_samples

> `protected` **\_samples**: [`SampleSet`](../interfaces/SampleSet.md)\<`T`\>

The set of samples in memory.

#### Default Value

`new Set<T>()`

#### Defined in

[estimator.ts:42](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L42)

## Accessors

### capacity

> `get` **capacity**(): `number`

Gets capacity.

> `set` **capacity**(`capacity`): `void`

Sets capacity. Must be a positive integer.

This should be calculated via [calculateCapacity](../functions/calculateCapacity.md) but
can also be set arbitrarily. In general, larger
values give more accurate estimates.

#### Throws

A RangeError if not given a positive integer.

#### Parameters

• **capacity**: `number`

#### Returns

`number`

#### Defined in

[estimator.ts:80](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L80)

***

### randomFn

> `get` **randomFn**(): () => `number`

Gets the random number generator function.

> `set` **randomFn**(`randomFn`): `void`

Sets the random number generator function.

The function should return random or pseudorandom values between 0 and 1.
Otherwise, this may cause unintended behavior such as invalid estimates.

#### Parameters

• **randomFn**

#### Returns

`Function`

##### Returns

`number`

#### Defined in

[estimator.ts:103](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L103)

***

### sampleRate

> `get` **sampleRate**(): `number`

Gets the sample rate.

> `set` **sampleRate**(`sampleRate`): `void`

Sets the sample rate. Must be between 0 and 1.

#### Remarks

Custom values may negatively affect accuracy. In general, the
further from `0.5`, the more it's affected. If [capacity](Estimator.md#capacity) was
calculated via [calculateCapacity](../functions/calculateCapacity.md), expected accuracy / confidence
may be invalidated.

#### Throws

A RangeError if not given a number between 0 and 1.

#### Parameters

• **sampleRate**: `number`

#### Returns

`number`

#### Defined in

[estimator.ts:120](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L120)

***

### size

> `get` **size**(): `number`

Gets the number of samples in memory.

#### Returns

`number`

#### Defined in

[estimator.ts:144](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L144)

## Methods

### add()

> **add**(`value`): `this`

Add a value.

Given values may be randomly selected for sampling. If selected,
the value is stored internally. Otherwise, they are ignored, or
discarded if previously selected.

If capacity is reached, samples are resampled,
and only values that are again selected are kept.
This process repeats until free space is made.

#### Parameters

• **value**: `T`

The value to add.

#### Returns

`this`

The instance.

#### Defined in

[estimator.ts:163](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L163)

***

### clear()

> **clear**(): `void`

Clears / resets the instance.

#### Returns

`void`

#### Defined in

[estimator.ts:192](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L192)

***

### estimate()

> **estimate**(): `number`

Gets the estimated number of distinct values.

#### Returns

`number`

#### Defined in

[estimator.ts:200](https://github.com/havelessbemore/cvm-lib/blob/fa7b5c0972ff5c64dd631d366ee95010a666bf22/src/estimator.ts#L200)
