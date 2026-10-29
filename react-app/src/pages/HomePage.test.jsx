import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage — section structure', () => {
  it('renders the #hero section', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#hero')).toBeInTheDocument();
  });

  it('renders #feature with exactly 6 feature boxes', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#feature')).toBeInTheDocument();
    expect(container.querySelectorAll('#feature .fe-box')).toHaveLength(6);
  });

  it('renders #product1 with exactly 8 product cards', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#product1')).toBeInTheDocument();
    expect(container.querySelectorAll('#product1 .pro')).toHaveLength(8);
  });

  it('renders the #banner section', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#banner')).toBeInTheDocument();
  });

  it('renders #arrivals with exactly 8 product cards', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#arrivals')).toBeInTheDocument();
    expect(container.querySelectorAll('#arrivals .pro')).toHaveLength(8);
  });

  it('renders #sm-banner with exactly 2 banner boxes', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#sm-banner')).toBeInTheDocument();
    expect(container.querySelectorAll('#sm-banner .banner-box')).toHaveLength(2);
  });

  it('renders #banner3 with exactly 3 banner boxes', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#banner3')).toBeInTheDocument();
    expect(container.querySelectorAll('#banner3 .banner-box')).toHaveLength(3);
  });

  it('renders the Newsletter component (#newsletter section)', () => {
    const { container } = renderHomePage();
    expect(container.querySelector('#newsletter')).toBeInTheDocument();
  });
});
