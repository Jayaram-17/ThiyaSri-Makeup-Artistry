import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand-name" style={{ marginBottom: '14px' }}>
              Thiyasri<br />Makeup Artistry
            </div>
            <p>Enhancing your natural beauty with elegance, precision and perfection — for brides and clients who want to feel calm, confident and radiant.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="https://wa.me/919150795778" target="_blank" rel="noopener noreferrer">WhatsApp: 91507 95778</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram: Thiyasri_Makeup_Artistry</a></li>
              <li><Link to="/contact">Book a Trial</Link></li>
            </ul>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© <span>{currentYear}</span> Thiyasri Makeup | All Rights Reserved</span>
          <span>Crafted with care for every bride and client</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
