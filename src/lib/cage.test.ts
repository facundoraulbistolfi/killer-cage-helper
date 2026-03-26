import { describe, expect, it } from 'vitest';
import { getCageCombinations } from './cage';

describe('getCageCombinations', () => {
  it('returns the only combination for sum 3 in 2 cells', () => {
    expect(getCageCombinations({ sum: 3, cells: 2 })).toEqual([[1, 2]]);
  });

  it('returns all 2-cell combinations for sum 10', () => {
    expect(getCageCombinations({ sum: 10, cells: 2 })).toEqual([
      [1, 9],
      [2, 8],
      [3, 7],
      [4, 6],
    ]);
  });

  it('supports allowed digits filtering', () => {
    expect(getCageCombinations({ sum: 5, cells: 2, digits: [1, 2, 3, 4] })).toEqual([
      [1, 4],
      [2, 3],
    ]);
  });

  it('supports excluded digits filtering', () => {
    expect(getCageCombinations({ sum: 10, cells: 2, excludedDigits: [1, 2, 3] })).toEqual([
      [4, 6],
    ]);
  });
});
