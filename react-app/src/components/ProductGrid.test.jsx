// Feature: react-migration, Property 4: ProductGrid renders one card per product
// Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import ProductGrid from './ProductGrid';

const productArbitrary = fc.record({
  id: fc.string({ minLength: 1 }),
  image: fc.string({ minLength: 1 }),
  brand: fc.string({ minLength: 1 }),
  name: fc.string({ minLength: 1 }),
  price: fc.string({ minLength: 1 }),
});

describe('ProductGrid — Property 4: renders one card per product', () => {
  it('renders exactly N .pro cards for an array of N products', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 50 }),
        (products) => {
          const { container } = render(<ProductGrid products={products} />);
          const cards = container.querySelectorAll('.pro');
          expect(cards).toHaveLength(products.length);
        }
      )
    );
  });

  it('each card receives the correct image src from its product', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 50 }),
        (products) => {
          const { container } = render(<ProductGrid products={products} />);
          const imgs = container.querySelectorAll('.pro img');
          products.forEach((p, i) => {
            expect(imgs[i].getAttribute('src')).toBe(p.image);
          });
        }
      )
    );
  });

  it('each card receives the correct brand text from its product', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 50 }),
        (products) => {
          const { container } = render(<ProductGrid products={products} />);
          const spans = container.querySelectorAll('.pro .des span');
          products.forEach((p, i) => {
            expect(spans[i].textContent).toBe(p.brand);
          });
        }
      )
    );
  });

  it('each card receives the correct name text from its product', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 50 }),
        (products) => {
          const { container } = render(<ProductGrid products={products} />);
          const headings = container.querySelectorAll('.pro .des h5');
          products.forEach((p, i) => {
            expect(headings[i].textContent).toBe(p.name);
          });
        }
      )
    );
  });

  it('each card receives the correct price text from its product', () => {
    fc.assert(
      fc.property(
        fc.array(productArbitrary, { minLength: 1, maxLength: 50 }),
        (products) => {
          const { container } = render(<ProductGrid products={products} />);
          const prices = container.querySelectorAll('.pro .des h4');
          products.forEach((p, i) => {
            expect(prices[i].textContent).toBe(p.price);
          });
        }
      )
    );
  });
});
