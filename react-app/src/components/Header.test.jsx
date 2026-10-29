import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe('Header — mobile menu state', () => {
  it('hamburger click adds "active" class to #navbar', () => {
    const { container } = renderHeader();
    const navbar = container.querySelector('#navbar');
    const bar = container.querySelector('#bar');

    // Initially closed
    expect(navbar).not.toHaveClass('active');

    fireEvent.click(bar);

    expect(navbar).toHaveClass('active');
  });

  it('close icon click removes "active" class from #navbar', () => {
    const { container } = renderHeader();
    const navbar = container.querySelector('#navbar');
    const bar = container.querySelector('#bar');
    const close = container.querySelector('#close');

    // Open first
    fireEvent.click(bar);
    expect(navbar).toHaveClass('active');

    // Now close
    fireEvent.click(close);
    expect(navbar).not.toHaveClass('active');
  });

  it('clicking a NavLink inside the mobile menu closes the menu', () => {
    const { container } = renderHeader();
    const navbar = container.querySelector('#navbar');
    const bar = container.querySelector('#bar');

    // Open menu
    fireEvent.click(bar);
    expect(navbar).toHaveClass('active');

    // Click any NavLink inside the navbar (the "Home" link)
    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);

    expect(navbar).not.toHaveClass('active');
  });
});
