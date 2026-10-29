import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <section id="header">
      <Link to="/"><img src="img2/logo.png" className="logo" alt="" /></Link>
      <div>
        <ul id="navbar" className={isMenuOpen ? 'active' : ''}>
          <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/shop" onClick={closeMenu}>Shop</NavLink></li>
          <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
          <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
          <li id="lg-bag"><NavLink to="/cart" onClick={closeMenu}><i className="bx bxs-shopping-bag-alt" /></NavLink></li>
          <li id="close-li"><span id="close" onClick={closeMenu}><i className="bx bx-x" /></span></li>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/cart"><i className="bx bxs-shopping-bag" /></Link>
        <i id="bar" className="bx bx-menu" onClick={openMenu} />
      </div>
    </section>
  );
}

export default Header;
