import { useNavigate } from 'react-router-dom';
import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import PageHeader from '../components/PageHeader';
import Newsletter from '../components/Newsletter';

function ShopPage() {
  const navigate = useNavigate();

  // Attach an onClick handler to the f2 product card so clicking it navigates
  // to the single product page. ProductGrid forwards each product's `onClick`
  // field to its ProductCard, so we build a derived array where only the f2
  // entry carries the navigate handler.
  const shopProducts = products.map((p) =>
    p.id === 'f2' ? { ...p, onClick: () => navigate('/product/f2') } : p
  );

  return (
    <>
      <PageHeader title="#let's_shop" subtitle="Save more with coupons & up to 70% off!" />

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Today's standout brands</p>
        <ProductGrid products={shopProducts} />
      </section>

      <section id="pagination" className="section-p1">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#"><i className="bx bx-right-arrow-alt"></i></a>
      </section>

      <Newsletter />
    </>
  );
}

export default ShopPage;
