import { describe, it, expect } from 'vitest';
import { aiService } from './ai.service';

describe('AIService', () => {
  it('returns a greeting', async () => {
    const response = await aiService.chat('Hello');
    expect(response).toContain('MUSE');
  });
});
