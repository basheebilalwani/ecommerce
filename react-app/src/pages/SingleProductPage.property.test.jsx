// Feature: react-migration
// Property 5: Thumbnail click updates main image — Validates: Requirements 9.1, 9.2
// Property 6: Add To Cart rejects out-of-range quantities — Validates: Requirements 9.5

import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as fc from 'fast-check';
import SingleProductPage from './SingleProductPage';

// SingleProductPage reads `:id` via useParams(), so it must render inside a
// Router that exposes a matching /product/:id route. We clean the DOM before
// every render so property iterations don't accumulate mounted components.
function renderSingleProductPage(productId = 'f2') {
  cleanup();
  return render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <Routes>
        <Route path="/product/:id" element={<SingleProductPage />} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  cleanup();
});

// ---------------------------------------------------------------------------
// Property 5 — clicking any thumbnail sets the main image src to that
// thumbnail's src. The .small-img-group renders exactly four thumbnails
// (indices 0–3), so the arbitrary is bounded to that set.
// ---------------------------------------------------------------------------
describe('Property 5: Thumbnail click updates main image', () => {
  it('clicking the thumbnail at index i sets #MainImg src to thumbnails[i] src', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 3 }), (index) => {
        const { container } = renderSingleProductPage('f2');

        const thumbnails = container.querySelectorAll('.small-img');
        expect(thumbnails.length).toBe(4);

        // Capture the thumbnail's resolved src. The click handler stores
        // `e.target.src` (the IDL property, an absolute URL), so the main
        // image ends up holding that resolved URL — compare via the resolved
        // `.src` property rather than the raw relative attribute value.
        const thumbSrc = thumbnails[index].src;

        // Simulate the user clicking that thumbnail.
        fireEvent.click(thumbnails[index]);

        // The main image must now resolve to the same URL as the clicked thumbnail.
        const mainImg = container.querySelector('#MainImg');
        expect(mainImg.src).toBe(thumbSrc);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 6 — for any quantity outside [1, 99], clicking "Add To Cart" must
// surface a non-empty cart error and not proceed with cart logic. A valid
// shade is selected first so the only failing condition is the quantity.
// ---------------------------------------------------------------------------
describe('Property 6: Add To Cart rejects out-of-range quantities', () => {
  it('shows a non-empty cart error for any quantity value outside [1, 99]', () => {
    fc.assert(
      fc.property(
        fc.integer().filter((n) => n < 1 || n > 99),
        (qty) => {
          const { container } = renderSingleProductPage('f2');

          // Select a valid shade first so shade is not the cause of the error.
          const select = container.querySelector('.single-pro-details select');
          fireEvent.change(select, { target: { value: 'Celestial' } });

          // Drive the controlled number input to the out-of-range value.
          const input = container.querySelector(
            '.single-pro-details input[type="number"]'
          );
          fireEvent.change(input, { target: { value: String(qty) } });

          // Trigger Add To Cart.
          const button = container.querySelector('button.normal');
          fireEvent.click(button);

          // A cart-error element must now be present with non-empty text.
          const errorEl = container.querySelector('.cart-error');
          expect(errorEl).not.toBeNull();
          expect(errorEl.textContent.trim()).not.toBe('');
        }
      ),
      { numRuns: 100 }
    );
  });
});
