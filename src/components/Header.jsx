import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
        <div className="navbar">
          <Link to="/" className="brand" onClick={closeMenu}>
            <span className="brand-mark">T</span>
            <span className="brand-name">Thiyasri<span>Makeup Artistry</span></span>
          </Link>
          <nav className="links" id="navLinks">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/reviews">Reviews</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <div className="nav-right">
            <Link to="/contact" className="nav-cta">
              Book Trial
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </Link>
            <button 
              className={`burger ${menuOpen ? 'open' : ''}`} 
              id="burgerBtn" 
              aria-label="Open menu" 
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu">
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
        <NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink>
        <NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <Link to="/contact" className="mob-cta" onClick={closeMenu}>Book Trial</Link>
      </div>
    </>
  );
};

export default Header;
