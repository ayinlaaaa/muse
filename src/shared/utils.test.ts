import { describe, it, expect } from 'vitest';
import { cn, formatDate } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges tailwind classes', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });
  });

  describe('formatDate', () => {
    it('formats a date correctly', () => {
      const date = new Date('2026-03-24');
      // Adjust for timezone if needed, but simple check
      expect(formatDate(date)).toContain('2026');
    });
  });
});
