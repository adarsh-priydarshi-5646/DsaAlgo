import { describe, it, expect } from 'vitest';
import { getDifficultyColor } from './difficulty';

describe('getDifficultyColor', () => {
  it('returns correct classes for basic difficulty', () => {
    const result = getDifficultyColor('basic');
    expect(result).toContain('text-green-400');
    expect(result).toContain('bg-green-500/10');
  });

  it('returns correct classes for intermediate difficulty', () => {
    const result = getDifficultyColor('intermediate');
    expect(result).toContain('text-yellow-400');
    expect(result).toContain('bg-yellow-500/10');
  });

  it('returns correct classes for advanced difficulty', () => {
    const result = getDifficultyColor('advanced');
    expect(result).toContain('text-red-400');
    expect(result).toContain('bg-red-500/10');
  });

  it('returns default classes for unknown difficulty', () => {
    const result = getDifficultyColor('unknown');
    expect(result).toContain('text-slate-400');
  });
});
