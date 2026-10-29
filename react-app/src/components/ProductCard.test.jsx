import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

const defaultProps = {
  image: 'img2/products/f1.jpg',
  brand: 'fenty beauty',
  name: 'Powder Blush',
  price: '$78',
};

describe('ProductCard', () => {
  it('renders image with correct src and alt', () => {
    render(<ProductCard {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', defaultProps.image);
    expect(img).toHaveAttribute('alt', defaultProps.name);
  });

  it('renders brand, name, and price text', () => {
    render(<ProductCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.brand)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.price)).toBeInTheDocument();
  });

  it('renders exactly five star icons', () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    const stars = container.querySelectorAll('.bxs-star');
    expect(stars).toHaveLength(5);
  });

  it('applies required CSS classes: pro, des, star, cart', () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    expect(container.querySelector('.pro')).toBeInTheDocument();
    expect(container.querySelector('.des')).toBeInTheDocument();
    expect(container.querySelector('.star')).toBeInTheDocument();
    expect(container.querySelector('.cart')).toBeInTheDocument();
  });

  it('does not crash when onClick is not provided', () => {
    expect(() => render(<ProductCard {...defaultProps} />)).not.toThrow();
  });

  it('calls onClick exactly once when the card is clicked', () => {
    const handleClick = vi.fn();
    const { container } = render(<ProductCard {...defaultProps} onClick={handleClick} />);
    fireEvent.click(container.querySelector('.pro'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not attach a click handler when onClick is absent', () => {
    const { container } = render(<ProductCard {...defaultProps} />);
    // Clicking should not throw and nothing should be invoked
    expect(() => fireEvent.click(container.querySelector('.pro'))).not.toThrow();
  });
});
