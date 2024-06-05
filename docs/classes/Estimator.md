[**cvm-lib**](../README.md) • **Docs**

***

[cvm-lib](../globals.md) / Estimator

# Class: Estimator\<T\>

Estimates the number of distinct values within a set
using the simple and space-efficient CVM strategy.

## See

 - [Nadis, S. (2024, May 16). Computer Scientists Invent an Efficient New Way to Count. Quanta Magazine.](https://www.quantamagazine.org/computer-scientists-invent-an-efficient-new-way-to-count-20240516/) for a high-level explanation.
 - [Chakraborty, S., Vinodchandran, N. V., & Meel, K. S. (2023). Distinct Elements in Streams: An Algorithm for the (Text) Book](https://arxiv.org/pdf/2301.10191v2) for the source paper.

## Type parameters

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

#### Source

[estimator.ts:50](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L50)

### new Estimator()

> **new Estimator**\<`T`\>(`config`): [`Estimator`](Estimator.md)\<`T`\>

#### Parameters

• **config**: [`EstimatorConfig`](../interfaces/EstimatorConfig.md)

A [EstimatorConfig](../interfaces/EstimatorConfig.md) configuration object.

#### Returns

[`Estimator`](Estimator.md)\<`T`\>

#### Default Value

- [randomFn](Estimator.md#randomfn) defaults to `Math.random`.
- [sampleRate](Estimator.md#samplerate) defaults to `0.5`.

#### Throws

A RangeError if a given configuration value is not within their expected range.

#### Source

[estimator.ts:60](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L60)

## Properties

### \_capacity

> `protected` **\_capacity**: `number`

The maximum number of samples in memory.

#### Source

[estimator.ts:17](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L17)

***

### \_randomFn()

> `protected` **\_randomFn**: () => `number`

The random number generator function.

#### Default Value

`Math.random`

#### Returns

`number`

#### Source

[estimator.ts:24](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L24)

***

### \_rate

> `protected` **\_rate**: `number`

The current sample rate.

#### Default Value

Initializes to `1`.

#### Source

[estimator.ts:31](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L31)

***

### \_sampleRate

> `protected` **\_sampleRate**: `number`

The given sample rate.

#### Default Value

`0.5`

#### Source

[estimator.ts:38](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L38)

***

### \_samples

> `protected` **\_samples**: `Set`\<`T`\>

The set of samples in memory.

#### Source

[estimator.ts:43](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L43)

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

#### Source

[estimator.ts:84](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L84)

***

### randomFn

> `get` **randomFn**(): () => `number`

Gets the random number generator function.

> `set` **randomFn**(`randomFn`): `void`

Sets the random number generator function.

The function should return random or pseudorandom values in [0, 1). Otherwise,
behavior is undefined, and may cause invalid estimates, infinite loops and/or crashes.

#### Parameters

• **randomFn**

#### Returns

`Function`

##### Returns

`number`

#### Source

[estimator.ts:107](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L107)

***

### sampleRate

> `get` **sampleRate**(): `number`

Gets the sample rate.

> `set` **sampleRate**(`sampleRate`): `void`

Sets the sample rate. Must be between 0 and 1.

**NOTE**: This is an advanced property and should be used with caution.
Behavior is undefined for values other than `0.5` and may lead to invalid estimates.

#### Throws

A RangeError if not given a number between 0 and 1.

#### Parameters

• **sampleRate**: `number`

#### Returns

`number`

#### Source

[estimator.ts:124](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L124)

***

### size

> `get` **size**(): `number`

Gets the number of samples in memory.

#### Returns

`number`

#### Source

[estimator.ts:146](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L146)

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

#### Source

[estimator.ts:165](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L165)

***

### clear()

> **clear**(): `void`

Clears / resets the instance.

#### Returns

`void`

#### Source

[estimator.ts:194](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L194)

***

### estimate()

> **estimate**(): `number`

Gets the estimated number of distinct values.

#### Returns

`number`

#### Source

[estimator.ts:202](https://github.com/havelessbemore/cvm-lib/blob/51a145e39a0216e3a71d8077edb9897cbda4c60a/src/estimator.ts#L202)
