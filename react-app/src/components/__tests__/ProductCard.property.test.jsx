// Feature: react-migration, Property 2: ProductCard renders required structure for any valid props
// Feature: react-migration, Property 3: ProductCard onClick is called exactly once per click

import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import ProductCard from '../ProductCard';

describe('Property 2: ProductCard renders required structure for any valid props', () => {
  it('contains all required elements with correct content and class names for any valid props', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        (image, brand, name, price) => {
          const { container } = render(
            <ProductCard image={image} brand={brand} name={name} price={price} />
          );

          // Root element has class 'pro'
          const rootEl = container.querySelector('.pro');
          expect(rootEl).not.toBeNull();

          // <img> with src equal to image prop
          const img = rootEl.querySelector('img');
          expect(img).not.toBeNull();
          expect(img.getAttribute('src')).toBe(image);

          // Inner div has class 'des'
          const desDiv = rootEl.querySelector('.des');
          expect(desDiv).not.toBeNull();

          // <span> with text equal to brand prop
          const span = desDiv.querySelector('span');
          expect(span).not.toBeNull();
          expect(span.textContent).toBe(brand);

          // <h5> with text equal to name prop
          const h5 = desDiv.querySelector('h5');
          expect(h5).not.toBeNull();
          expect(h5.textContent).toBe(name);

          // .star div exists inside .des
          const starDiv = desDiv.querySelector('.star');
          expect(starDiv).not.toBeNull();

          // Exactly five elements with class 'bxs-star'
          const stars = rootEl.querySelectorAll('.bxs-star');
          expect(stars.length).toBe(5);

          // <h4> with text equal to price prop
          const h4 = desDiv.querySelector('h4');
          expect(h4).not.toBeNull();
          expect(h4.textContent).toBe(price);

          // An element with class 'cart' exists
          const cartIcon = rootEl.querySelector('.cart');
          expect(cartIcon).not.toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Property 3: ProductCard onClick is called exactly once per click', () => {
  it('invokes onClick handler exactly once when the root .pro element is clicked', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        fc.string({ minLength: 1 }),
        (image, brand, name, price) => {
          const onClick = vi.fn();

          const { container } = render(
            <ProductCard image={image} brand={brand} name={name} price={price} onClick={onClick} />
          );

          const rootEl = container.querySelector('.pro');
          expect(rootEl).not.toBeNull();

          fireEvent.click(rootEl);

          expect(onClick).toHaveBeenCalledTimes(1);
        }
      ),
      { numRuns: 100 }
    );
  });
});
