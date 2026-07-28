import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [counts, setCounts] = useState({ pkg: 0, hrs: 0, pct: 0 });
  const statRef = useRef(null);

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

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTime = null;
        const duration = 1300;
        const targets = { pkg: 3, hrs: 16, pct: 100 };
        
        const step = (ts) => {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          setCounts({
            pkg: Math.floor(progress * targets.pkg),
            hrs: Math.floor(progress * targets.hrs),
            pct: Math.floor(progress * targets.pct)
          });
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (statRef.current) observer.observe(statRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">Home</Link> / About Us</p>
          <h1 className="reveal in">Makeup is not about changing who you are</h1>
          <p className="sub reveal in">It's about enhancing your natural beauty with elegance and confidence.</p>
        </div>
      </section>

      <section style={{ paddingTop: '20px' }}>
        <div className="wrap about-grid">
          <div className="about-img reveal-left">
            <img src="/assets/img/about-portrait.jpg" alt="Bridal makeup portrait by Thiyasri Makeup Artistry" />
          </div>
          <div className="reveal-right">
            <p className="eyebrow">Our Philosophy</p>
            <h2 style={{ fontSize: 'clamp(28px,3.4vw,38px)', margin: '14px 0 18px', lineHeight: 1.2 }}>Every look, thoughtfully crafted</h2>
            <p style={{ color: '#5a4940', lineHeight: 1.8, fontSize: '15.5px' }}>Every look is thoughtfully crafted to suit your skin tone, features, and personal style. We use premium, skin-friendly products, maintain the highest hygiene standards, and focus on creating long-lasting, flawless finishes that photograph beautifully and feel comfortable all day.</p>
            <p style={{ color: '#5a4940', lineHeight: 1.8, fontSize: '15.5px', marginTop: '14px' }}>With a passion for detail and a commitment to client satisfaction, we ensure every bride and client feels calm, confident, and radiant on their special day.</p>
            <div className="stat-row" ref={statRef}>
              <div className="stat"><div className="num">{counts.pkg}</div><div className="cap">Signature Packages</div></div>
              <div className="stat"><div className="num">{counts.hrs}</div><div className="cap">Hours Long-lasting Wear</div></div>
              <div className="stat"><div className="num">{counts.pct}</div><div className="cap">% Skin-friendly Products</div></div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">What We Stand For</p>
            <h2>Our standards, every time</h2>
          </div>
          <div className="process stagger">
            <div className="proc-step reveal" style={{ '--i': 0 }}><div className="proc-num">✦</div><h4>Hygiene First</h4><p>Highest hygiene standards maintained across every tool and product used.</p></div>
            <div className="proc-step reveal" style={{ '--i': 1 }}><div className="proc-num">✦</div><h4>Skin-Friendly</h4><p>Premium products chosen to suit your skin tone and avoid irritation.</p></div>
            <div className="proc-step reveal" style={{ '--i': 2 }}><div className="proc-num">✦</div><h4>Long-Lasting</h4><p>Finishes engineered to stay flawless for hours — even through dancing and tears.</p></div>
            <div className="proc-step reveal" style={{ '--i': 3 }}><div className="proc-num">✦</div><h4>Camera-Ready</h4><p>Every look is built to photograph as beautifully as it feels in person.</p></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Makeup &amp; Hairstyle Promise</p>
            <h2>Two crafts, one seamless look</h2>
          </div>
          <div className="about-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="reveal-left" style={{ background: 'var(--ivory)', border: '1px solid var(--line)', padding: '36px', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--maroon)' }}>Makeup</h3>
              <p style={{ color: '#5a4940', lineHeight: 1.8, fontSize: '15px' }}>Makeup that enhances your natural beauty. Creating timeless looks for every occasion. Elegance, precision, perfection — because every face tells a story.</p>
            </div>
            <div className="reveal-right" style={{ background: 'var(--ivory)', border: '1px solid var(--line)', padding: '36px', borderRadius: 'var(--radius)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px', color: 'var(--maroon)' }}>Hairstyle</h3>
              <p style={{ color: '#5a4940', lineHeight: 1.8, fontSize: '15px' }}>Creating looks that complete your beauty. From simple to stunning hairstyles — perfect hair for your perfect moment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>Let's Get Started</p>
          <h2>Ready to feel calm, confident and radiant?</h2>
          <div className="btn-row">
            <Link to="/contact" className="btn on-dark">Book Your Trial</Link>
            <Link to="/services" className="btn on-dark">View Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
