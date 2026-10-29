import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

// Helper: render Footer inside MemoryRouter (Footer uses <Link>)
function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  // Req 4.3 — copyright text
  it('displays the copyright text', () => {
    renderFooter();
    expect(
      screen.getByText('© 2025 Aurè E-RETAIL LIMITED All Rights Reserved.')
    ).toBeInTheDocument();
  });

  // Req 4.2 — logo image
  it('renders the logo image with correct src and a non-empty alt', () => {
    renderFooter();
    const logo = screen.getByAltText('Aurè E-RETAIL logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img2/logo.png');
    expect(logo.alt).not.toBe('');
  });

  // Req 4.2 — App Store badge
  it('renders the App Store badge image with a non-empty alt', () => {
    renderFooter();
    const appBadge = screen.getByAltText('Download on the App Store');
    expect(appBadge).toBeInTheDocument();
    expect(appBadge).toHaveAttribute('src', 'img/pay/app.jpg');
    expect(appBadge.alt).not.toBe('');
  });

  // Req 4.2 — Google Play badge
  it('renders the Google Play badge image with a non-empty alt', () => {
    renderFooter();
    const playBadge = screen.getByAltText('Get it on Google Play');
    expect(playBadge).toBeInTheDocument();
    expect(playBadge).toHaveAttribute('src', 'img/pay/play.jpg');
    expect(playBadge.alt).not.toBe('');
  });

  // Req 4.2 — payment methods image
  it('renders the payment methods image with a non-empty alt', () => {
    renderFooter();
    const payImg = screen.getByAltText('Accepted payment methods');
    expect(payImg).toBeInTheDocument();
    expect(payImg).toHaveAttribute('src', 'img/pay/pay.png');
    expect(payImg.alt).not.toBe('');
  });
});
