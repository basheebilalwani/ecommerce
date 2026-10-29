// Feature: react-migration, Property 1: Active NavLink is unique per route
// Validates: Requirements 2.8

import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';
import Header from './Header';

describe('Property 1: Active NavLink is unique per route', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders exactly one anchor element with the active class for any defined route', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/shop', '/cart', '/blog', '/about', '/contact'),
        (route) => {
          const { container } = render(
            <MemoryRouter initialEntries={[route]}>
              <Header />
            </MemoryRouter>
          );

          // Query all anchor elements that have the 'active' class
          const activeLinks = container.querySelectorAll('a.active');

          // Exactly one NavLink should be active at any given route
          expect(activeLinks.length).toBe(1);

          cleanup();
        }
      ),
      { numRuns: 6 } // one run per constant route value
    );
  });
});
