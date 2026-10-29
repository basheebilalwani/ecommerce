import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="section-p1">
      {/* Column 1: Contact */}
      <div className="col">
        <img className="logo" src="img2/logo.png" alt="Aurè E-RETAIL logo" />
        <h4>Contact</h4>
        <p><strong>Address:</strong> 562 Wellington Road, Street 32, San Francisco</p>
        <p><strong>Phone:</strong> +01 2222 365 /(+91) 01 2345 6789</p>
        <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <i className="bx bxl-facebook"></i>
            <i className="bx bxl-twitter"></i>
            <i className="bx bxl-instagram"></i>
            <i className="bx bxl-pinterest"></i>
            <i className="bx bxl-youtube"></i>
          </div>
        </div>
      </div>

      {/* Column 2: About */}
      <div className="col">
        <h4>About</h4>
        <Link to="/about">About us</Link>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms &amp; Conditions</a>
        <Link to="/contact">Contact us</Link>
      </div>

      {/* Column 3: My Account */}
      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <Link to="/cart">View Cart</Link>
        <a href="#">My Wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>

      {/* Column 4: Install App */}
      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src="img/pay/app.jpg" alt="Download on the App Store" />
          <img src="img/pay/play.jpg" alt="Get it on Google Play" />
        </div>
        <p>Secured Payment Gateways</p>
        <img src="img/pay/pay.png" alt="Accepted payment methods" />
      </div>

      {/* Bottom bar: Copyright */}
      <div className="copyright">
        <p>© 2025 Aurè E-RETAIL LIMITED All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
