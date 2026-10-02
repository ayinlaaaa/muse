import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './hero';
import { Footer } from './footer';

// Mock useAuth
vi.mock('@/hooks/use-auth', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    logout: vi.fn(),
  }),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
      section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
      button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    },
    useInView: () => true,
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('Landing Components', () => {
  describe('Hero', () => {
    it('renders the wordmark', () => {
      render(<Hero />);
      expect(screen.getByLabelText(/MUSE Wordmark/i)).toBeDefined();
    });

    it('has an enabled connect button', () => {
      render(<Hero />);
      const button = screen.getByRole('button', { name: /connect spotify/i });
      expect(button).not.toHaveProperty('disabled', true);
    });
  });

  describe('Footer', () => {
    it('renders copyright info', () => {
      render(<Footer />);
      expect(screen.getByText(/© 2026 MUSE/i)).toBeDefined();
    });
  });
});
