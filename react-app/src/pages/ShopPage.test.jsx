import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route, useParams } from 'react-router-dom';
import ShopPage from './ShopPage';

// ShopPage calls useNavigate(), so it must render inside a Router context.
// We seed the router at "/shop" and add a "/product/:id" route that renders a
// marker exposing the resolved :id param, so a navigation test can assert not
// only that a product page rendered but that it specifically rendered for "f2".
function ProductRouteMarker() {
  const { id } = useParams();
  return <div data-testid="product-page" data-product-id={id} />;
}

function renderShopPage(initialPath = '/shop') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductRouteMarker />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ShopPage — structure', () => {
  it('renders PageHeader with the correct title and subtitle', () => {
    const { container } = renderShopPage();
    const pageHeader = container.querySelector('#page-header');
    expect(pageHeader).toBeInTheDocument();
    expect(pageHeader.querySelector('h2')).toHaveTextContent("#let's_shop");
    expect(pageHeader.querySelector('p')).toHaveTextContent(
      'Save more with coupons & up to 70% off!'
    );
  });

  it('renders #product1 with exactly 16 product cards', () => {
    const { container } = renderShopPage();
    expect(container.querySelector('#product1')).toBeInTheDocument();
    expect(container.querySelectorAll('#product1 .pro')).toHaveLength(16);
  });

  it('renders the #pagination section with two numbered links and an arrow link', () => {
    const { container } = renderShopPage();
    const pagination = container.querySelector('#pagination');
    expect(pagination).toBeInTheDocument();

    const links = pagination.querySelectorAll('a');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent('1');
    expect(links[1]).toHaveTextContent('2');
    // The third link is the right-arrow icon link.
    expect(links[2].querySelector('i.bx-right-arrow-alt')).toBeInTheDocument();
  });

  it('renders the Newsletter component (#newsletter section)', () => {
    const { container } = renderShopPage();
    expect(container.querySelector('#newsletter')).toBeInTheDocument();
  });
});

describe('ShopPage — f2 card navigation', () => {
  it('navigates to /product/f2 when the f2 card is clicked', () => {
    renderShopPage();

    // The product page marker should not be present before the click.
    expect(screen.queryByTestId('product-page')).not.toBeInTheDocument();

    // The f2 product is the only one named "Lipstick"; its <h5> identifies the
    // card, and clicking the root .pro element triggers the attached onClick.
    const f2Heading = screen.getByText('Lipstick');
    const f2Card = f2Heading.closest('.pro');
    fireEvent.click(f2Card);

    // The /product/f2 route renders the marker, exposing the resolved id.
    const productPage = screen.getByTestId('product-page');
    expect(productPage).toBeInTheDocument();
    expect(productPage).toHaveAttribute('data-product-id', 'f2');
  });
});
