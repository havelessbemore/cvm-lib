[**cvm-lib**](../README.md)

***

[cvm-lib](../globals.md) / SampleSet

# Interface: SampleSet\<T\>

Defined in: [types/sampleSet.ts:4](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/sampleSet.ts#L4)

Represents a generic set for storing samples.

## Type Parameters

### T

`T`

## Properties

### size

> `readonly` **size**: `number`

Defined in: [types/sampleSet.ts:10](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/sampleSet.ts#L10)

Gets the number of values in the set.

## Methods

### \[iterator\]()

> **\[iterator\]**(): [`Iterator`](#)\<`T`\>

Defined in: [types/sampleSet.ts:39](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/sampleSet.ts#L39)

#### Returns

[`Iterator`](#)\<`T`\>

an [Iterator](#) over the values in the set. The values are returned
in no particular order unless a guarantee is given by the implementing class.

***

### add()

> **add**(`value`): `this`

Defined in: [types/sampleSet.ts:19](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/sampleSet.ts#L19)

Adds a value to the set.

#### Parameters

##### value

`T`

The value to add.

#### Returns

`this`

The set instance.

***

### clear()

> **clear**(): `void`

Defined in: [types/sampleSet.ts:24](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/sampleSet.ts#L24)

Clears all values from the set.

#### Returns

`void`

***

### delete()

> **delete**(`value`): `boolean`

Defined in: [types/sampleSet.ts:33](https://github.com/havelessbemore/cvm-lib/blob/9b271107ec7b8bf4b4e48d441a8edb9ea15658be/src/types/sampleSet.ts#L33)

Removes a specified value from the set.

#### Parameters

##### value

`T`

The value to remove.

#### Returns

`boolean`

`true` if a value existed in the set and has been removed, `false` otherwise.
