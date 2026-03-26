export interface CageQuery {
  sum: number;
  cells: number;
  digits?: number[];
  excludedDigits?: number[];
}

const DEFAULT_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export function getCageCombinations(query: CageQuery): number[][] {
  const sum = assertPositiveInteger(query.sum, 'sum');
  const cells = assertPositiveInteger(query.cells, 'cells');

  if (cells > 9) {
    throw new Error('cells cannot be greater than 9.');
  }

  const excludedDigits = new Set(normalizeDigits(query.excludedDigits ?? []));
  const baseDigits = normalizeDigits(query.digits ?? [...DEFAULT_DIGITS]).filter(
    (digit) => !excludedDigits.has(digit),
  );

  if (baseDigits.length < cells) {
    return [];
  }

  const combinations: number[][] = [];

  const search = (
    startIndex: number,
    remainingSum: number,
    remainingCells: number,
    current: number[],
  ): void => {
    if (remainingCells === 0) {
      if (remainingSum === 0) {
        combinations.push([...current]);
      }
      return;
    }

    for (let index = startIndex; index <= baseDigits.length - remainingCells; index += 1) {
      const digit = baseDigits[index];
      const remainingDigits = baseDigits.slice(index + 1);

      if (remainingDigits.length < remainingCells - 1) {
        return;
      }

      const smallestPossible = digit + sumOfFirst(remainingDigits, remainingCells - 1);
      const largestPossible = digit + sumOfLast(remainingDigits, remainingCells - 1);

      if (remainingSum < smallestPossible) {
        return;
      }

      if (remainingSum > largestPossible) {
        continue;
      }

      current.push(digit);
      search(index + 1, remainingSum - digit, remainingCells - 1, current);
      current.pop();
    }
  };

  search(0, sum, cells, []);
  return combinations;
}

function normalizeDigits(digits: number[]): number[] {
  const normalizedDigits = [...digits].sort((left, right) => left - right);

  normalizedDigits.forEach((digit, index) => {
    if (!Number.isInteger(digit) || digit < 1 || digit > 9) {
      throw new Error('digits must be integers between 1 and 9.');
    }

    if (index > 0 && digit === normalizedDigits[index - 1]) {
      throw new Error('digits cannot contain duplicates.');
    }
  });

  return normalizedDigits;
}

function assertPositiveInteger(value: number, name: 'sum' | 'cells'): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }

  return value;
}

function sumOfFirst(values: number[], count: number): number {
  return values.slice(0, count).reduce((total, value) => total + value, 0);
}

function sumOfLast(values: number[], count: number): number {
  return values.slice(values.length - count).reduce((total, value) => total + value, 0);
}
