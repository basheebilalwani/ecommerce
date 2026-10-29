/**
 * Integration smoke tests for task 12.3
 *
 * Renders <AppRoutes /> wrapped in <MemoryRouter> for each route and asserts
 * that the expected top-level section/element is present alongside the shared
 * Header and Footer layout components.
 *
 * Requirements: 2.1–2.7, 4.4
 */
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AppRoutes } from './App';

/**
 * Render AppRoutes at the given path via MemoryRouter so the router context is
 * provided without involving the real browser history API.
 */
function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>
  );
}

// ---------------------------------------------------------------------------
// Shared layout helpers
// ---------------------------------------------------------------------------
function assertHeaderPresent() {
  expect(document.querySelector('#header')).toBeInTheDocument();
}

function assertFooterPresent() {
  // Footer renders as <footer className="section-p1">
  const footer = document.querySelector('footer');
  expect(footer).toBeInTheDocument();
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('Integration smoke tests', () => {
  describe('/ → HomePage', () => {
    it('renders the #hero section', () => {
      renderAt('/');
      expect(document.querySelector('#hero')).toBeInTheDocument();
    });

    it('renders the shared Header', () => {
      renderAt('/');
      assertHeaderPresent();
    });

    it('renders the shared Footer', () => {
      renderAt('/');
      assertFooterPresent();
    });
  });

  describe('/shop → ShopPage', () => {
    it('renders the #page-header section containing "#let\'s_shop"', () => {
      renderAt('/shop');
      const pageHeader = document.querySelector('#page-header');
      expect(pageHeader).toBeInTheDocument();
      expect(pageHeader).toHaveTextContent("#let's_shop");
    });

    it('renders the shared Header', () => {
      renderAt('/shop');
      assertHeaderPresent();
    });

    it('renders the shared Footer', () => {
      renderAt('/shop');
      assertFooterPresent();
    });
  });

  describe('/cart → CartPage', () => {
    it('renders the #cart section', () => {
      renderAt('/cart');
      expect(document.querySelector('#cart')).toBeInTheDocument();
    });

    it('renders the shared Header', () => {
      renderAt('/cart');
      assertHeaderPresent();
    });

    it('renders the shared Footer', () => {
      renderAt('/cart');
      assertFooterPresent();
    });
  });

  describe('/product/:id → SingleProductPage', () => {
    it('renders the #pro-details section', () => {
      renderAt('/product/f1');
      expect(document.querySelector('#pro-details')).toBeInTheDocument();
    });

    it('renders the shared Header', () => {
      renderAt('/product/f1');
      assertHeaderPresent();
    });

    it('renders the shared Footer', () => {
      renderAt('/product/f1');
      assertFooterPresent();
    });
  });

  describe('catch-all → redirect to /', () => {
    it('redirects /unknown to "/" and renders #hero', () => {
      renderAt('/unknown');
      // <Navigate to="/" replace /> is synchronous in React Router v6; the DOM
      // settles on "/" which renders HomePage with #hero.
      expect(document.querySelector('#hero')).toBeInTheDocument();
    });
  });
});
