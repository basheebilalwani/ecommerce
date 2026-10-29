import products from '../data/products';
import ProductGrid from '../components/ProductGrid';
import Newsletter from '../components/Newsletter';

// Featured products = first 8 entries (f1–f8); New Arrivals = last 8 (n1–n8).
const featuredProducts = products.slice(0, 8);
const arrivalsProducts = products.slice(8, 16);

function HomePage() {
  return (
    <>
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off! </p>
        <button>Shop Now</button>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src="img/features/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
          <img src="img/features/f2.png" alt="" />
          <h6>Online Order</h6>
        </div>
        <div className="fe-box">
          <img src="img/features/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src="img/features/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>
        <div className="fe-box">
          <img src="img/features/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fe-box">
          <img src="img/features/f6.png" alt="" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Today's standout brands</p>
        <ProductGrid products={featuredProducts} />
      </section>

      <section id="banner" className="section-m1">
        <h4>Repair Services</h4>
        <h2>Up to <span>70% Off</span> - All makeup products</h2>
        <button className="normal">Explore More</button>
      </section>

      <section id="arrivals" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Best-in-show brands</p>
        <ProductGrid products={arrivalsProducts} />
      </section>

      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>crazy deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best products are on sale</span>
          <button className="white">Learn More</button>
        </div>
        <div className="banner-box banner-box2">
          <h4>on our radar</h4>
          <h2>new launch</h2>
          <span>The best products are on sale</span>
          <button className="white">Collection</button>
        </div>
      </section>

      <section id="banner3" className="section-p1">
        <div className="banner-box">
          <h2>SEASONAL SALE</h2>
          <h3>Winter Skincare -50% OFF</h3>
        </div>
        <div className="banner-box banner-box2">
          <h2>NEW MAKEUP COLLECTION</h2>
          <h3>Spring/Summer 2022</h3>
        </div>
        <div className="banner-box banner-box3">
          <h2>SKINCARE</h2>
          <h3>Newly launched collection</h3>
        </div>
      </section>

      <Newsletter />
    </>
  );
}

export default HomePage;
