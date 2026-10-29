import PropTypes from 'prop-types';

function ProductCard({ image, brand, name, price, onClick }) {
  return (
    <div className="pro" onClick={onClick || undefined}>
      <img src={image} alt={name} />
      <div className="des">
        <span>{brand}</span>
        <h5>{name}</h5>
        <div className="star">
          <i className="bx bxs-star" />
          <i className="bx bxs-star" />
          <i className="bx bxs-star" />
          <i className="bx bxs-star" />
          <i className="bx bxs-star" />
        </div>
        <h4>{price}</h4>
      </div>
      <i className="bx bx-cart cart" />
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ProductCard;
