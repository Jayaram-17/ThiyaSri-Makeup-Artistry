import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [openPkg, setOpenPkg] = useState(null);

  // Reveal effect
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      revealObserver.observe(el);
    });
    
    return () => revealObserver.disconnect();
  }, []);

  const togglePkg = (pkg) => {
    setOpenPkg(openPkg === pkg ? null : pkg);
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">Home</Link> / Services</p>
          <h1 className="reveal in">Packages crafted for your big moment</h1>
          <p className="sub reveal in">Every package includes complimentary lens, lashes and hair extension. Tap any card to compare exactly what's included.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="pkg-grid stagger">
            <article className={`pkg-card reveal ${openPkg === 'hd' ? 'open' : ''}`} style={{ '--i': 0 }}>
              <p className="pkg-tag">Most Booked</p>
              <h3>HD Makeup</h3>
              <div className="pkg-price">₹18,000<sup>/ session</sup></div>
              <ul className="pkg-list">
                <li>HD makeup application</li>
                <li>Hairdo based on client preference</li>
                <li>Single saree draping</li>
              </ul>
              <button className="pkg-toggle" aria-expanded={openPkg === 'hd'} onClick={() => togglePkg('hd')}>
                <span>What's complimentary</span><span className="chev">▾</span>
              </button>
              <div className="pkg-more">
                <p className="pkg-complimentary">Complimentary</p>
                <p>Lens · Lashes · Hair extension included at no extra cost.</p>
              </div>
            </article>

            <article className={`pkg-card featured reveal ${openPkg === 'glossy' ? 'open' : ''}`} style={{ '--i': 1 }}>
              <p className="pkg-tag">Reception Favourite</p>
              <h3>Glossy Makeup</h3>
              <div className="pkg-price">₹22,000<sup>/ session</sup></div>
              <ul className="pkg-list">
                <li>Glossy, radiant makeup finish</li>
                <li>Premium hairdo</li>
                <li>Saree draping ×2</li>
              </ul>
              <button className="pkg-toggle" aria-expanded={openPkg === 'glossy'} onClick={() => togglePkg('glossy')}>
                <span>What's complimentary</span><span className="chev">▾</span>
              </button>
              <div className="pkg-more">
                <p className="pkg-complimentary">Complimentary</p>
                <p>Lens · Lashes · Hair extension · Hair accessory.</p>
                <p style={{ marginTop: '10px', opacity: 0.9 }}>Preferred for reception looks — skin glows under stage lighting and stays put for 8–10 hours, even through sweat.</p>
              </div>
            </article>

            <article className={`pkg-card reveal ${openPkg === 'airbrush' ? 'open' : ''}`} style={{ '--i': 2 }}>
              <p className="pkg-tag">Camera Ready</p>
              <h3>Airbrush Makeup</h3>
              <div className="pkg-price">₹25,000<sup>/ session</sup></div>
              <ul className="pkg-list">
                <li>Flawless, lightweight, pore-covering finish</li>
                <li>Lasts 10–16 hours</li>
                <li>Premium hairdo with extension</li>
                <li>Saree draping ×2</li>
              </ul>
              <button className="pkg-toggle" aria-expanded={openPkg === 'airbrush'} onClick={() => togglePkg('airbrush')}>
                <span>What's complimentary</span><span className="chev">▾</span>
              </button>
              <div className="pkg-more">
                <p className="pkg-complimentary">Complimentary</p>
                <p>Lens · Lashes · Hair extension · Hair accessory.</p>
                <p style={{ marginTop: '10px' }}>Ultra-smooth, poreless finish using Temptu-brand foundation — built for photo and video.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">Compare at a Glance</p>
            <h2>Find the right fit</h2>
          </div>
          <div style={{ overflowX: 'auto' }} className="reveal">
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px', fontSize: '14.5px' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--maroon)' }}>
                  <th style={{ padding: '14px 10px', fontFamily: '"Playfair Display"', fontSize: '16px' }}>Feature</th>
                  <th style={{ padding: '14px 10px', fontFamily: '"Playfair Display"', fontSize: '16px' }}>HD Makeup</th>
                  <th style={{ padding: '14px 10px', fontFamily: '"Playfair Display"', fontSize: '16px', color: 'var(--maroon)' }}>Glossy Makeup</th>
                  <th style={{ padding: '14px 10px', fontFamily: '"Playfair Display"', fontSize: '16px' }}>Airbrush Makeup</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--line)' }}><td style={{ padding: '12px 10px', color: '#6b574c' }}>Price</td><td style={{ padding: '12px 10px' }}>₹18,000</td><td style={{ padding: '12px 10px' }}>₹22,000</td><td style={{ padding: '12px 10px' }}>₹25,000</td></tr>
                <tr style={{ borderBottom: '1px solid var(--line)' }}><td style={{ padding: '12px 10px', color: '#6b574c' }}>Wear time</td><td style={{ padding: '12px 10px' }}>Standard day wear</td><td style={{ padding: '12px 10px' }}>8–10 hours, sweat-resistant</td><td style={{ padding: '12px 10px' }}>10–16 hours</td></tr>
                <tr style={{ borderBottom: '1px solid var(--line)' }}><td style={{ padding: '12px 10px', color: '#6b574c' }}>Saree draping</td><td style={{ padding: '12px 10px' }}>×1</td><td style={{ padding: '12px 10px' }}>×2</td><td style={{ padding: '12px 10px' }}>×2</td></tr>
                <tr style={{ borderBottom: '1px solid var(--line)' }}><td style={{ padding: '12px 10px', color: '#6b574c' }}>Hairdo</td><td style={{ padding: '12px 10px' }}>Client preference</td><td style={{ padding: '12px 10px' }}>Premium hairdo</td><td style={{ padding: '12px 10px' }}>Premium + extension</td></tr>
                <tr style={{ borderBottom: '1px solid var(--line)' }}><td style={{ padding: '12px 10px', color: '#6b574c' }}>Hair accessory</td><td style={{ padding: '12px 10px' }}>—</td><td style={{ padding: '12px 10px' }}>✓</td><td style={{ padding: '12px 10px' }}>✓</td></tr>
                <tr><td style={{ padding: '12px 10px', color: '#6b574c' }}>Best for</td><td style={{ padding: '12px 10px' }}>Everyday events</td><td style={{ padding: '12px 10px' }}>Receptions, stage lighting</td><td style={{ padding: '12px 10px' }}>Photography & video</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>Not Sure Which to Pick?</p>
          <h2>Tell us about your event — we'll recommend a package</h2>
          <div className="btn-row">
            <Link to="/contact" className="btn on-dark">Ask Us / Book Trial</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
