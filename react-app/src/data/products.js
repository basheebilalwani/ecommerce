/**
 * Central product data array for the Aurè ecommerce site.
 * All 16 products: f1–f8 (featured) and n1–n8 (new arrivals).
 *
 * Shape: { id, image, brand, name, price, priceNum }
 *   id       — unique string identifier matching the image filename base
 *   image    — root-relative path served from public/ (used in <img src>)
 *   brand    — brand display text shown in ProductCard
 *   name     — product name text shown in ProductCard
 *   price    — formatted display price string (e.g. "$78")
 *   priceNum — numeric price for cart arithmetic
 */
const products = [
  // ── Featured products (f1–f8) ──────────────────────────────────────────────
  {
    id: 'f1',
    image: 'img2/products/f1.jpg',
    brand: 'fenty beauty',
    name: 'Powder Blush',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'f2',
    image: 'img2/products/f2.png',
    brand: 'saint laurent',
    name: 'Lipstick',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'f3',
    image: 'img2/products/f3.png',
    brand: 'hudabeauty',
    name: 'Eyeshadow palette',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'f4',
    image: 'img2/products/f4.png',
    brand: 'mac',
    name: 'Makeup brush',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'f5',
    image: 'img2/products/f5.png',
    brand: 'rhode',
    name: 'Lip-balm',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'f6',
    image: 'img2/products/f6.png',
    brand: 'dior',
    name: 'Mascara',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'f7',
    image: 'img2/products/f7.png',
    brand: 'saint laurent',
    name: 'Contour',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'f8',
    image: 'img2/products/f8.png',
    brand: 'rare beauty',
    name: 'Liquid blush',
    price: '$78',
    priceNum: 78,
  },

  // ── New arrivals (n1–n8) ───────────────────────────────────────────────────
  {
    id: 'n1',
    image: 'img2/products/n1.png',
    brand: 'laneige',
    name: 'Lip Sleeping Mask',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'n2',
    image: 'img2/products/n2.png',
    brand: 'rhode',
    name: 'Lip-balm',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'n3',
    image: 'img2/products/n3.png',
    brand: 'vaseline',
    name: 'Lip-balm',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'n4',
    image: 'img2/products/n4.png',
    brand: 'benefit',
    name: 'bene tint',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'n5',
    image: 'img2/products/n5.png',
    brand: 'MILK',
    name: 'Blush Stick',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'n6',
    image: 'img2/products/n6.png',
    brand: 'The Ordinary',
    name: 'Niacinamide Serum',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'n7',
    image: 'img2/products/n7.png',
    brand: 'cosrx',
    name: 'Snail Mucin Power Essence',
    price: '$78',
    priceNum: 78,
  },
  {
    id: 'n8',
    image: 'img2/products/n8.png',
    brand: 'Beauty Of Joseon',
    name: 'Glow Deep Serum For Pigmentation',
    price: '$78',
    priceNum: 78,
  },
];

export default products;
