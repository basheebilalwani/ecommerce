import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Shared route state read by the mocked BrowserRouter. vi.hoisted ensures the
// variable is initialised before the hoisted mock factory runs, so the factory
// can reference it.
const { routeState } = vi.hoisted(() => ({ routeState: { path: '/' } }));

// App.jsx hardcodes <BrowserRouter>, which drives routing off the real browser
// history and cannot be seeded per test. We swap BrowserRouter for a
// MemoryRouter seeded with the per-test path stored in routeState so every test
// can render <App /> at a chosen initial route.
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => (
      <actual.MemoryRouter initialEntries={[routeState.path]}>
        {children}
      </actual.MemoryRouter>
    ),
  };
});

// The placeholder pages for Blog/About/Contact render identical "Coming soon"
// markup, which would make it impossible to tell which one a route rendered.
// Mock every page to emit a unique marker so we can assert exactly which page
// component a given route renders.
vi.mock('./pages/HomePage', () => ({
  default: () => <div data-testid="home-page-mock">HomePage</div>,
}));
vi.mock('./pages/ShopPage', () => ({
  default: () => <div data-testid="shop-page-mock">ShopPage</div>,
}));
vi.mock('./pages/CartPage', () => ({
  default: () => <div data-testid="cart-page-mock">CartPage</div>,
}));
vi.mock('./pages/SingleProductPage', () => ({
  default: () => <div data-testid="single-product-page-mock">SingleProductPage</div>,
}));
vi.mock('./pages/BlogPage', () => ({
  default: () => <div data-testid="blog-page-mock">BlogPage</div>,
}));
vi.mock('./pages/AboutPage', () => ({
  default: () => <div data-testid="about-page-mock">AboutPage</div>,
}));
vi.mock('./pages/ContactPage', () => ({
  default: () => <div data-testid="contact-page-mock">ContactPage</div>,
}));

import App from './App';

const PAGE_TEST_IDS = {
  home: 'home-page-mock',
  shop: 'shop-page-mock',
  cart: 'cart-page-mock',
  singleProduct: 'single-product-page-mock',
  blog: 'blog-page-mock',
  about: 'about-page-mock',
  contact: 'contact-page-mock',
};

function renderAppAt(path) {
  routeState.path = path;
  return render(<App />);
}

// Asserts that exactly the expected page component rendered and no other page
// did. This both confirms the correct page is present and rules out the
// remaining routes — essential for distinguishing the identical Blog/About/
// Contact placeholders.
function expectOnlyPage(expectedTestId) {
  Object.values(PAGE_TEST_IDS).forEach((testId) => {
    if (testId === expectedTestId) {
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    }
  });
}

describe('App routing', () => {
  it('renders HomePage at the "/" route', () => {
    renderAppAt('/');
    expectOnlyPage(PAGE_TEST_IDS.home);
  });

  it('renders ShopPage at the "/shop" route', () => {
    renderAppAt('/shop');
    expectOnlyPage(PAGE_TEST_IDS.shop);
  });

  it('renders CartPage at the "/cart" route', () => {
    renderAppAt('/cart');
    expectOnlyPage(PAGE_TEST_IDS.cart);
  });

  it('renders SingleProductPage at the "/product/:id" route', () => {
    renderAppAt('/product/f2');
    expectOnlyPage(PAGE_TEST_IDS.singleProduct);
  });

  it('renders BlogPage at the "/blog" route', () => {
    renderAppAt('/blog');
    expectOnlyPage(PAGE_TEST_IDS.blog);
  });

  it('renders AboutPage at the "/about" route', () => {
    renderAppAt('/about');
    expectOnlyPage(PAGE_TEST_IDS.about);
  });

  it('renders ContactPage at the "/contact" route', () => {
    renderAppAt('/contact');
    expectOnlyPage(PAGE_TEST_IDS.contact);
  });

  it('redirects unknown paths to "/" and renders HomePage', async () => {
    renderAppAt('/nonexistent');
    // The catch-all "*" route renders <Navigate to="/" replace />, which fires
    // navigation in an effect and lands on "/", rendering HomePage.
    const home = await screen.findByTestId(PAGE_TEST_IDS.home);
    expect(home).toBeInTheDocument();
    expect(screen.queryByTestId(PAGE_TEST_IDS.shop)).not.toBeInTheDocument();
    expect(screen.queryByTestId(PAGE_TEST_IDS.contact)).not.toBeInTheDocument();
  });
});
