// Feature: react-migration, Property 13: PageHeader renders title and subtitle from any valid props
// Validates: Requirements 12.1, 12.2

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import PageHeader from '../PageHeader';

describe('Property 13: PageHeader renders title and subtitle from any valid props', () => {
  it('renders #page-header section with matching <h2> and <p> for any valid title and subtitle', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.string({ minLength: 1, maxLength: 200 }),
        (title, subtitle) => {
          const { container } = render(<PageHeader title={title} subtitle={subtitle} />);

          // Section with id="page-header" must be present
          const section = container.querySelector('#page-header');
          expect(section).not.toBeNull();

          // <h2> text content must exactly equal the title prop
          const h2 = section.querySelector('h2');
          expect(h2).not.toBeNull();
          expect(h2.textContent).toBe(title);

          // <p> text content must exactly equal the subtitle prop
          const p = section.querySelector('p');
          expect(p).not.toBeNull();
          expect(p.textContent).toBe(subtitle);
        }
      ),
      { numRuns: 100 }
    );
  });
});
