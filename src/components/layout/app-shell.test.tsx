import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Sidebar } from './sidebar';
import { NowPlaying } from './now-playing';
import { usePathname } from 'next/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// Mock useAuth
vi.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    logout: vi.fn(),
  }),
}));

describe('App Shell Components', () => {
  describe('Sidebar', () => {
    it('renders navigation items', () => {
      (usePathname as any).mockReturnValue('/chat');
      render(<Sidebar />);
      expect(screen.getByText('New chat')).toBeDefined();
      expect(screen.getByText('Discover')).toBeDefined();
    });

    it('shows connect spotify button when not logged in', () => {
      render(<Sidebar />);
      expect(screen.getByText(/Connect Spotify/i)).toBeDefined();
    });
  });

  describe('NowPlaying', () => {
    it('shows empty state message', () => {
      render(<NowPlaying />);
      expect(screen.getByText('Nothing playing')).toBeDefined();
    });
  });
});
