[**cvm-lib**](../README.md) • **Docs**

***

[cvm-lib](../globals.md) / SampleSet

# Interface: SampleSet\<T\>

Represents a generic set for storing samples.

## Type Parameters

• **T**

## Properties

### size

> `readonly` **size**: `number`

Gets the number of values in the set.

#### Defined in

[types/sampleSet.ts:10](https://github.com/havelessbemore/cvm-lib/blob/6484157b84bf1ee7cde3732c1841fbd9a9e873ef/src/types/sampleSet.ts#L10)

## Methods

### \[iterator\]()

> **\[iterator\]**(): `Iterator`\<`T`, `any`, `undefined`\>

#### Returns

`Iterator`\<`T`, `any`, `undefined`\>

an Iterator over the values in the set. The values are returned
in no particular order unless a guarantee is given by the implementing class.

#### Defined in

[types/sampleSet.ts:39](https://github.com/havelessbemore/cvm-lib/blob/6484157b84bf1ee7cde3732c1841fbd9a9e873ef/src/types/sampleSet.ts#L39)

***

### add()

> **add**(`value`): `this`

Adds a value to the set.

#### Parameters

• **value**: `T`

The value to add.

#### Returns

`this`

The set instance.

#### Defined in

[types/sampleSet.ts:19](https://github.com/havelessbemore/cvm-lib/blob/6484157b84bf1ee7cde3732c1841fbd9a9e873ef/src/types/sampleSet.ts#L19)

***

### clear()

> **clear**(): `void`

Clears all values from the set.

#### Returns

`void`

#### Defined in

[types/sampleSet.ts:24](https://github.com/havelessbemore/cvm-lib/blob/6484157b84bf1ee7cde3732c1841fbd9a9e873ef/src/types/sampleSet.ts#L24)

***

### delete()

> **delete**(`value`): `boolean`

Removes a specified value from the set.

#### Parameters

• **value**: `T`

The value to remove.

#### Returns

`boolean`

`true` if a value existed in the set and has been removed, `false` otherwise.

#### Defined in

[types/sampleSet.ts:33](https://github.com/havelessbemore/cvm-lib/blob/6484157b84bf1ee7cde3732c1841fbd9a9e873ef/src/types/sampleSet.ts#L33)
