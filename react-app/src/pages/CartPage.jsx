import { useState } from 'react';
import PageHeader from '../components/PageHeader';

// Initial cart items — three hard-coded products matching the original cart.html
const INITIAL_CART_ITEMS = [
  {
    id: 'f1',
    image: 'img2/products/f1.jpg',
    name: 'Powder Blush',
    price: 118.19,
    quantity: 1,
  },
  {
    id: 'f2',
    image: 'img2/products/f2.png',
    name: 'Lipstick',
    price: 118.19,
    quantity: 1,
  },
  {
    id: 'f3',
    image: 'img2/products/f3.png',
    name: 'Eyeshadow palette',
    price: 118.19,
    quantity: 1,
  },
];

function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

  // Clamp quantity to [1, 99] and update the matching item in state
  function handleQuantityChange(id, val) {
    const parsed = parseInt(val, 10);
    const clamped = Math.max(1, Math.min(99, isNaN(parsed) ? 1 : parsed));
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: clamped } : item
      )
    );
  }

  // Remove the item with the matching id from state
  function handleRemove(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // Derived totals — not stored in state
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const formattedSubtotal = `$${cartSubtotal.toFixed(2)}`;

  return (
    <>
      <PageHeader
        title="#cart"
        subtitle="Save more with coupons & up to 70% off!"
      />

      {/* Cart table */}
      <section id="cart" className="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const rowSubtotal = `$${(item.price * item.quantity).toFixed(2)}`;
              return (
                <tr key={item.id}>
                  <td>
                    <i
                      className="bx bx-x-circle"
                      onClick={() => handleRemove(item.id)}
                      style={{ cursor: 'pointer' }}
                    ></i>
                  </td>
                  <td>
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td>{rowSubtotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Coupon + cart totals */}
      <section id="cart-add" className="section-p1">
        <div id="coupon">
          <h3>Apply Coupon</h3>
          <div>
            <input type="text" placeholder="Enter Your Coupon" />
            <button className="normal">Apply</button>
          </div>
        </div>

        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tbody>
              <tr>
                <td>Cart Subtotal</td>
                <td>{formattedSubtotal}</td>
              </tr>
              <tr>
                <td>Shipping</td>
                <td>Free</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{formattedSubtotal}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="normal">Proceed to checkout</button>
        </div>
      </section>
    </>
  );
}

export default CartPage;
