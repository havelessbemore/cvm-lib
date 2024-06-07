export function createSeries(n: number, min: number, max: number): number[] {
  const series = new Array<number>(n);
  for (let i = 0; i < n; ++i) {
    series[i] = genInt(min, max);
  }
  return series;
}

export function genInt(
  min: number,
  max: number,
  randomFn = Math.random,
): number {
  return Math.trunc(min + (max - min) * randomFn());
}

export function getAvg(values: number[]): number | undefined {
  return values.length > 0 ? getSum(values)! / values.length : undefined;
}

export function getDistinct<T>(series: T[]): number {
  const N = series.length;
  const set = new Set<T>();
  for (let i = 0; i < N; ++i) {
    set.add(series[i]);
  }
  return set.size;
}

export function getMax(values: number[]): number | undefined {
  const N = values.length;
  if (N < 2) {
    return values[N - 1];
  }
  let max = values[0];
  for (let i = 1; i < N; ++i) {
    max = Math.max(max, values[i]);
  }
  return max;
}

export function getMin(values: number[]): number | undefined {
  const N = values.length;
  if (N < 2) {
    return values[N - 1];
  }
  let min = values[0];
  for (let i = 1; i < N; ++i) {
    min = Math.min(min, values[i]);
  }
  return min;
}

export function getSum(values: number[]): number | undefined {
  const N = values.length;
  if (N < 1) {
    return undefined;
  }
  let sum = 0;
  for (let i = 0; i < N; ++i) {
    sum += values[i];
  }
  return sum;
}

export function getVariance(values: number[], avg: number): number | undefined {
  const N = values.length;
  if (N < 1) {
    return undefined;
  }
  let sum = 0;
  for (let i = 0; i < N; ++i) {
    sum += (values[i] - avg) ** 2;
  }
  return sum / N;
}
