[**cvm-lib**](../README.md) • **Docs**

***

[cvm-lib](../globals.md) / calculateCapacity

# Function: calculateCapacity()

> **calculateCapacity**(`n`, `epsilon`, `delta`): `number`

Calculates the space required to estimate the number of
distinct values in a set with a given accuracy and confidence.

## Parameters

• **n**: `number`

The total number of values in the set, or an estimate if unknown.

- Must be a positive number.
- If unknown, an overestimate is better, but requires more space.

• **epsilon**: `number` = `0.05`

An estimate's relative error. Controls accuracy.

- Must be between 0 and 1.
- Smaller values equal more accuracy but more required space.
- Defaults to `0.05` (i.e. 95% accuracy; estimates can range within ±5% of the true value).

• **delta**: `number` = `0.01`

The probability an estimate is not accurate. Controls confidence.

- Must be between 0 and 1.
- Smaller values equal higher confidence but more required space.
- Defaults to `0.01` (i.e. 99% confidence; there is a 1% chance an estimate is less accurate than expected).

## Returns

`number`

The calculated capacity.

## Throws

A RangeError for any of the following:
- `n` is not a positive number.
- `epsilon` is not between 0 and 1.
- `delta` is not between 0 and 1.

## Examples

```javascript
 // Get the capacity for estimating the number
 // of distinct values in a set of 1 billion.
 // Estimates will have a 99% probability of
 // being within ±5% of the actual number.
 const capacity = calculateCapacity(1e9); // 14,617
```

```javascript
 // Get the capacity for estimating the number
 // of distinct values in a set of 1 billion.
 // Estimates will have a 99% probability of
 // being within ±10% of the actual number.
 const capacity = calculateCapacity(1e9, 0.1); // 3,655
```

```javascript
 // Get the capacity for estimating the number
 // of distinct values in a set of 1 billion.
 // Estimates will have an 80% probability of
 // being within ±5% of the actual number.
 const capacity = calculateCapacity(1e9, 0.05, 0.2); // 12,888
```

```javascript
 // Get the capacity for estimating the number
 // of distinct values in a set of 1 billion.
 // Estimates will have a 99.999% probability of
 // being within ±1% of the actual number.
 const capacity = calculateCapacity(1e9, 0.01, 0.00001); // 465,070
```

## Defined in

[capacity.ts:67](https://github.com/havelessbemore/cvm-lib/blob/66ab91527c3815ced02139bd9f68aa6c1e6371ba/src/capacity.ts#L67)
