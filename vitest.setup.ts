import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) =>
    React.createElement('a', { href, ...props }, children),
}));
