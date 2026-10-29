import { useState } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';

function SingleProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const productIndex = products.findIndex((p) => p.id === id);

  // mainImage starts on the first thumbnail's src (the product's own image).
  const [mainImage, setMainImage] = useState(() =>
    productIndex !== -1 ? products[productIndex].image : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [shade, setShade] = useState('');
  const [cartError, setCartError] = useState('');

  if (!product) {
    return (
      <main>
        <p>Product not found</p>
      </main>
    );
  }

  // Four thumbnails: the product's image followed by the next three in the
  // catalog (wrapping). For f2 this reproduces the original f2/f3/f4/f5 row.
  const thumbnails = [0, 1, 2, 3].map(
    (offset) => products[(productIndex + offset) % products.length].image
  );

  function handleAddToCart() {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      setCartError('Quantity must be between 1 and 99.');
      return;
    }
    if (!shade) {
      setCartError('Please select a shade.');
      return;
    }
    setCartError('');
  }

  return (
    <>
      <section id="pro-details" className="section-p1">
        <div className="single-pro-image">
          <img src={mainImage} width="100%" id="MainImg" alt="" />
          <div className="small-img-group">
            {thumbnails.map((src, index) => (
              <div className="small-img-col" key={index}>
                <img
                  src={src}
                  width="100%"
                  className="small-img"
                  alt=""
                  onClick={(e) => setMainImage(e.target.src)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="single-pro-details">
          <h6>Home / Makeup</h6>
          <h4>{product.brand}</h4>
          <h2>{product.price}</h2>
          <select value={shade} onChange={(e) => setShade(e.target.value)}>
            <option value="">Select Shade</option>
            <option value="Celestial">Celestial</option>
            <option value="Sunkissed">Sunkissed</option>
            <option value="Twilight">Twilight</option>
          </select>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button className="normal" onClick={handleAddToCart}>
            Add To Cart
          </button>
          {cartError && (
            <p className="cart-error" role="alert" style={{ color: 'red' }}>
              {cartError}
            </p>
          )}
        </div>
      </section>

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Best-in-show brands</p>
        <ProductGrid products={products.slice(8, 12)} />
      </section>

      <Newsletter />
    </>
  );
}

export default SingleProductPage;
