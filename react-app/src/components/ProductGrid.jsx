import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  if (!Array.isArray(products)) {
    return null;
  }

  return (
    <div className="pro-container">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          image={p.image}
          brand={p.brand}
          name={p.name}
          price={p.price}
          onClick={p.onClick}
        />
      ))}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductGrid;
