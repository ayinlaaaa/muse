import { describe, it, expect } from 'vitest';
import { TIMING, EASING } from './motion';

describe('Motion Tokens', () => {
  it('has correct timing tokens', () => {
    expect(TIMING.BASE).toBe(0.22);
    expect(TIMING.SCENE).toBe(0.6);
  });

  it('has correct easing tokens', () => {
    expect(EASING.STANDARD).toEqual([0.2, 0, 0, 1]);
  });
});
