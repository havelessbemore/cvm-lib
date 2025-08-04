[**cvm-lib**](../README.md)

***

[cvm-lib](../globals.md) / Estimator

# Class: Estimator\<T\>

Defined in: [estimator.ts:10](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L10)

Estimates the number of distinct values in a set using the CVM algorithm.

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new Estimator**\<`T`\>(`capacity`): `Estimator`\<`T`\>

Defined in: [estimator.ts:49](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L49)

#### Parameters

##### capacity

`number`

The maximum number of samples in memory. Must be a positive integer.

#### Returns

`Estimator`\<`T`\>

#### Throws

A [RangeError](#) if `capacity` is not a positive integer.

### Constructor

> **new Estimator**\<`T`\>(`config`): `Estimator`\<`T`\>

Defined in: [estimator.ts:55](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L55)

#### Parameters

##### config

[`EstimatorConfig`](../interfaces/EstimatorConfig.md)\<`T`\>

An [EstimatorConfig](../interfaces/EstimatorConfig.md) configuration object.

#### Returns

`Estimator`\<`T`\>

#### Throws

A [RangeError](#) if a given configuration is not within their expected range.

## Properties

### \_capacity

> `protected` **\_capacity**: `number`

Defined in: [estimator.ts:14](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L14)

The maximum number of samples in memory.

***

### \_randomFn()

> `protected` **\_randomFn**: () => `number`

Defined in: [estimator.ts:21](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L21)

The random number generator function.

#### Returns

`number`

#### Default Value

`Math.random`

***

### \_rate

> `protected` **\_rate**: `number`

Defined in: [estimator.ts:28](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L28)

The current sample rate.

#### Default Value

Initializes to `1`.

***

### \_sampleRate

> `protected` **\_sampleRate**: `number`

Defined in: [estimator.ts:35](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L35)

The given sample rate.

#### Default Value

`0.5`

***

### \_samples

> `protected` **\_samples**: [`SampleSet`](../interfaces/SampleSet.md)\<`T`\>

Defined in: [estimator.ts:42](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L42)

The set of samples in memory.

#### Default Value

`new Set<T>()`

## Accessors

### capacity

#### Get Signature

> **get** **capacity**(): `number`

Defined in: [estimator.ts:80](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L80)

Gets capacity.

##### Returns

`number`

#### Set Signature

> **set** **capacity**(`capacity`): `void`

Defined in: [estimator.ts:93](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L93)

Sets capacity. Must be a positive integer.

This should be calculated via [calculateCapacity](../functions/calculateCapacity.md) but
can also be set arbitrarily. In general, larger
values give more accurate estimates.

##### Throws

A [RangeError](#) if not given a positive integer.

##### Parameters

###### capacity

`number`

##### Returns

`void`

***

### randomFn

#### Get Signature

> **get** **randomFn**(): () => `number`

Defined in: [estimator.ts:103](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L103)

Gets the random number generator function.

##### Returns

> (): `number`

###### Returns

`number`

#### Set Signature

> **set** **randomFn**(`randomFn`): `void`

Defined in: [estimator.ts:113](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L113)

Sets the random number generator function.

The function should return random or pseudorandom values between 0 and 1.
Otherwise, this may cause unintended behavior such as invalid estimates.

##### Parameters

###### randomFn

() => `number`

##### Returns

`void`

***

### sampleRate

#### Get Signature

> **get** **sampleRate**(): `number`

Defined in: [estimator.ts:120](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L120)

Gets the sample rate.

##### Returns

`number`

#### Set Signature

> **set** **sampleRate**(`sampleRate`): `void`

Defined in: [estimator.ts:134](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L134)

Sets the sample rate. Must be between 0 and 1.

##### Remarks

Custom values may negatively affect accuracy. In general, the
further from `0.5`, the more it's affected. If [capacity](#capacity) was
calculated via [calculateCapacity](../functions/calculateCapacity.md), expected accuracy / confidence
may be invalidated.

##### Throws

A [RangeError](#) if not given a number between 0 and 1.

##### Parameters

###### sampleRate

`number`

##### Returns

`void`

***

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [estimator.ts:144](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L144)

Gets the number of samples in memory.

##### Returns

`number`

## Methods

### add()

> **add**(`value`): `this`

Defined in: [estimator.ts:163](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L163)

Add a value.

Given values may be randomly selected for sampling. If selected,
the value is stored internally. Otherwise, they are ignored, or
discarded if previously selected.

If capacity is reached, samples are resampled,
and only values that are again selected are kept.
This process repeats until free space is made.

#### Parameters

##### value

`T`

The value to add.

#### Returns

`this`

The instance.

***

### clear()

> **clear**(): `void`

Defined in: [estimator.ts:192](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L192)

Clears / resets the instance.

#### Returns

`void`

***

### estimate()

> **estimate**(): `number`

Defined in: [estimator.ts:200](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/estimator.ts#L200)

Gets the estimated number of distinct values.

#### Returns

`number`
