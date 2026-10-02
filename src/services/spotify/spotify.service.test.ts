import { describe, it, expect, vi, beforeEach } from 'vitest';
import { spotifyService } from './spotify.service';

// Mock DB and fetch
vi.mock('@/db', () => ({
  db: {
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn(() => Promise.resolve([
            {
              userId: 'user-1',
              accessToken: 'encrypted-at',
              refreshToken: 'encrypted-rt',
              expiresAt: new Date(Date.now() + 3600000), // 1h from now
            }
          ])),
        })),
      })),
    })),
  },
}));

vi.mock('@/lib/crypto', () => ({
  decrypt: vi.fn((val) => val.replace('encrypted-', '')),
  encrypt: vi.fn((val) => `encrypted-${val}`),
}));

global.fetch = vi.fn();

describe('SpotifyService', () => {
  beforeEach(() => {
    process.env.ENCRYPTION_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  });

  it('calls search endpoint with correct params', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ tracks: [] }),
    });

    const result = await spotifyService.search('user-1', 'brent faiyaz');
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/search?q=brent%20faiyaz'),
      expect.objectContaining({
        headers: { Authorization: 'Bearer at' }
      })
    );
    expect(result.tracks).toEqual([]);
  });
});
