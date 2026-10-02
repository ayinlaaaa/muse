import { describe, it, expect, vi, beforeEach } from 'vitest';
// We need to mock next/headers and db for this test
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
    get: vi.fn(),
    delete: vi.fn(),
  })),
}));

vi.mock('@/db', () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => Promise.resolve()),
    })),
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        innerJoin: vi.fn(() => ({
          where: vi.fn(() => ({
            limit: vi.fn(() => Promise.resolve([])),
          })),
        })),
      })),
    })),
    delete: vi.fn(() => ({
      where: vi.fn(() => Promise.resolve()),
    })),
  },
}));

import { createSession } from './session.service';

describe('SessionService', () => {
  it('creates a session', async () => {
    const userId = 'user-123';
    const sessionId = await createSession(userId);
    expect(sessionId).toBeDefined();
    expect(sessionId.length).toBeGreaterThan(20);
  });
});
