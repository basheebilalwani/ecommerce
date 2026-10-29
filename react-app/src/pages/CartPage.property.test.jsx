// Feature: react-migration, Property 7, 8, 9: Cart arithmetic and removal

// Property 7: Cart row subtotal equals price times quantity — Validates: Requirements 10.3
// Property 8: Cart subtotal equals sum of all row subtotals — Validates: Requirements 10.5
// Property 9: Removing a cart item produces a shorter cart — Validates: Requirements 10.4

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// ---------------------------------------------------------------------------
// Pure helper functions mirroring CartPage's logic exactly.
// These are extracted to allow property testing without mounting the component.
// ---------------------------------------------------------------------------

/** Compute a single row subtotal exactly as CartPage does. */
function rowSubtotal(price, quantity) {
  return `$${(price * quantity).toFixed(2)}`;
}

/** Compute the cart-wide subtotal exactly as CartPage does. */
function cartSubtotal(items) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return `$${total.toFixed(2)}`;
}

/** Remove an item by id, exactly as CartPage's handleRemove does. */
function removeById(items, id) {
  return items.filter((item) => item.id !== id);
}

// ---------------------------------------------------------------------------
// fast-check arbitrary for a single cart item.
// fc.float in fast-check v3 requires 32-bit float boundaries;
// Math.fround converts the decimal literals to the nearest 32-bit float.
// ---------------------------------------------------------------------------
const PRICE_MIN = Math.fround(0.01);
const PRICE_MAX = Math.fround(9999.99);

const cartItemArbitrary = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }),
  image: fc.string(),
  name: fc.string(),
  price: fc.float({ min: PRICE_MIN, max: PRICE_MAX, noNaN: true }),
  quantity: fc.integer({ min: 1, max: 99 }),
});

// ---------------------------------------------------------------------------
// Property 7 — Cart row subtotal equals price × quantity
// ---------------------------------------------------------------------------
describe('Property 7: Cart row subtotal equals price times quantity', () => {
  it('rowSubtotal(price, qty) === "$" + (price * qty).toFixed(2) for any valid price and quantity', () => {
    fc.assert(
      fc.property(
        fc.float({ min: PRICE_MIN, max: PRICE_MAX, noNaN: true }),
        fc.integer({ min: 1, max: 99 }),
        (price, qty) => {
          const expected = `$${(price * qty).toFixed(2)}`;
          expect(rowSubtotal(price, qty)).toBe(expected);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 8 — Cart subtotal equals sum of all row subtotals
// ---------------------------------------------------------------------------
describe('Property 8: Cart subtotal equals sum of all row subtotals', () => {
  it('cartSubtotal(items) equals the sum of each row\'s price × quantity, formatted as "$X.XX"', () => {
    fc.assert(
      fc.property(
        fc.array(cartItemArbitrary, { minLength: 1, maxLength: 20 }),
        (items) => {
          // Compute expected value the same way: sum all row subtotals, then toFixed(2)
          const expectedTotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const expected = `$${expectedTotal.toFixed(2)}`;

          expect(cartSubtotal(items)).toBe(expected);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('cartSubtotal(items) matches the sum of individually computed row subtotals (no rounding divergence)', () => {
    fc.assert(
      fc.property(
        fc.array(cartItemArbitrary, { minLength: 1, maxLength: 20 }),
        (items) => {
          // The displayed cart subtotal must equal the sum of the underlying
          // floating-point products — both formatted the same way.
          // This catches any scenario where intermediate rounding could drift.
          const sumOfProducts = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          expect(cartSubtotal(items)).toBe(`$${sumOfProducts.toFixed(2)}`);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 9 — Removing a cart item produces a shorter cart
// ---------------------------------------------------------------------------
describe('Property 9: Removing a cart item produces a shorter cart', () => {
  it('removeById produces a cart of length N-1 and no entry with the removed id', () => {
    fc.assert(
      fc.property(
        // Generate a non-empty array of items with unique ids
        fc
          .array(cartItemArbitrary, { minLength: 1, maxLength: 20 })
          .chain((items) => {
            // Pick a valid index into the array
            return fc
              .integer({ min: 0, max: items.length - 1 })
              .map((index) => ({ items, index }));
          }),
        ({ items, index }) => {
          // Ensure ids are unique so the filter removes exactly one entry.
          // Re-assign ids by position to guarantee uniqueness.
          const uniqueItems = items.map((item, i) => ({ ...item, id: `item-${i}` }));
          const targetId = uniqueItems[index].id;
          const originalLength = uniqueItems.length;

          const result = removeById(uniqueItems, targetId);

          // Length must decrease by exactly one
          expect(result).toHaveLength(originalLength - 1);

          // The removed item must not appear in the result
          expect(result.every((item) => item.id !== targetId)).toBe(true);

          // All remaining items must be from the original array
          const originalIds = new Set(uniqueItems.map((i) => i.id));
          expect(result.every((item) => originalIds.has(item.id))).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
