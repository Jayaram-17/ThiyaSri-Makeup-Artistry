import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const taglines = {
  makeup: [
    "Elegance. Precision. Perfection.",
    "Makeup that enhances your natural beauty.",
    "Because every face tells a story.",
    "Creating timeless looks for every occasion."
  ],
  hair: [
    "Creating looks that complete your beauty.",
    "From simple to stunning hairstyles.",
    "Perfect hair for your perfect moment."
  ]
};

const heroImages = {
  makeup: "/assets/img/hero-bridal.jpg",
  hair: "/assets/img/hero-hair.jpg"
};

const Home = () => {
  const [currentMode, setCurrentMode] = useState('makeup');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineOpacity, setTaglineOpacity] = useState(1);
  const [heroImgOpacity, setHeroImgOpacity] = useState(1);
  
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  
  const [openPkg, setOpenPkg] = useState(null);

  // Tagline rotator
  useEffect(() => {
    const list = taglines[currentMode];
    const timer = setInterval(() => {
      setTaglineOpacity(0);
      setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % list.length);
        setTaglineOpacity(1);
      }, 250);
    }, 3200);
    return () => clearInterval(timer);
  }, [currentMode]);

  // Mode switch
  const toggleMode = () => {
    const newMode = currentMode === 'makeup' ? 'hair' : 'makeup';
    setHeroImgOpacity(0);
    setTimeout(() => {
      setCurrentMode(newMode);
      setTaglineIndex(0);
      setHeroImgOpacity(1);
    }, 200);
  };

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTime = null;
        const duration = 1300;
        const target = 250;
        
        const step = (ts) => {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

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
      <section className="hero" id="home">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="wrap hero-grid">
          <div className="hero-copy reveal-left">
            <p className="eyebrow">Bridal &amp; Event Makeup Studio</p>
            <h1>Enhancing your <em>natural beauty</em>, one face at a time</h1>
            <p className="lede">Every look is thoughtfully crafted to suit your skin tone, features and personal style — using premium, skin-friendly products and the highest hygiene standards, for a finish that photographs beautifully and feels comfortable all day.</p>

            <div className="compact">
              <span className="compact-label">Explore</span>
              <div 
                className="compact-switch" 
                data-state={currentMode} 
                role="button" 
                tabIndex="0" 
                onClick={toggleMode}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMode(); } }}
              >
                <div className="compact-pill"></div>
                <span className="compact-opt makeup">Makeup</span>
                <span className="compact-opt hair">Hairstyle</span>
              </div>
            </div>
            <p className="tagline-rotator" style={{ opacity: taglineOpacity }}>
              {taglines[currentMode][taglineIndex]}
            </p>

            <div className="hero-actions">
              <Link to="/contact" className="btn solid">Book Your Trial</Link>
              <Link to="/services" className="btn ghost">View Packages</Link>
            </div>
          </div>

          <div className="hero-visual reveal-scale">
            <div className="hero-frame"></div>
            <img 
              id="heroImg" 
              src={heroImages[currentMode]} 
              alt={currentMode === 'makeup' ? "Bridal makeup look" : "Bridal hairstyle"} 
              style={{ opacity: heroImgOpacity, transition: 'opacity 0.2s ease' }} 
            />
            <div className="hero-badge">
              <div className="num" ref={counterRef}>{count}</div>
              <div className="cap">Brides &amp; Clients Styled</div>
            </div>
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="strip-track">
          <span>HD Makeup</span><span>Glossy Bridal Makeup</span><span>Airbrush Makeup</span><span>Saree Draping</span><span>Premium Hairdo</span><span>10–16 Hr Stay</span>
          <span>HD Makeup</span><span>Glossy Bridal Makeup</span><span>Airbrush Makeup</span><span>Saree Draping</span><span>Premium Hairdo</span><span>10–16 Hr Stay</span>
        </div>
      </div>

      <section id="services-teaser">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Our Services</p>
            <h2>Packages crafted for your big moment</h2>
            <p>Three signature packages — each one click away from showing exactly what's included.</p>
          </div>

          <div className="pkg-grid stagger">
            <article className={`pkg-card reveal ${openPkg === 'hd' ? 'open' : ''}`} style={{ '--i': 0 }}>
              <p className="pkg-tag">Most Booked</p>
              <h3>HD Makeup</h3>
              <div className="pkg-price">₹9,000<sup>/ session</sup></div>
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
              <div className="pkg-price">₹12,000<sup>/ session</sup></div>
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
              </div>
            </article>

            <article className={`pkg-card reveal ${openPkg === 'airbrush' ? 'open' : ''}`} style={{ '--i': 2 }}>
              <p className="pkg-tag">Camera Ready</p>
              <h3>Airbrush Makeup</h3>
              <div className="pkg-price">₹15,000<sup>/ session</sup></div>
              <ul className="pkg-list">
                <li>Flawless, lightweight, pore-covering finish</li>
                <li>Lasts 10–16 hours</li>
                <li>Premium hairdo with extension</li>
              </ul>
              <button className="pkg-toggle" aria-expanded={openPkg === 'airbrush'} onClick={() => togglePkg('airbrush')}>
                <span>What's complimentary</span><span className="chev">▾</span>
              </button>
              <div className="pkg-more">
                <p className="pkg-complimentary">Complimentary</p>
                <p>Lens · Lashes · Hair extension · Hair accessory.</p>
              </div>
            </article>
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/services" className="btn ghost reveal">See Full Service Details</Link>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="section-head center reveal">
            <p className="eyebrow">How Booking Works</p>
            <h2>From enquiry to "I do"</h2>
          </div>
          <div className="process stagger">
            <div className="proc-step reveal" style={{ '--i': 0 }}><div className="proc-num">1</div><h4>Reach Out</h4><p>Message us on WhatsApp or fill the contact form with your event date.</p></div>
            <div className="proc-step reveal" style={{ '--i': 1 }}><div className="proc-num">2</div><h4>Trial Session</h4><p>We confirm your package and book a trial to perfect your look together.</p></div>
            <div className="proc-step reveal" style={{ '--i': 2 }}><div className="proc-num">3</div><h4>Confirm Date</h4><p>Lock in your event date with the agreed package and draping count.</p></div>
            <div className="proc-step reveal" style={{ '--i': 3 }}><div className="proc-num">4</div><h4>Glow Day</h4><p>We arrive, set up, and get you camera-ready — calm, confident, radiant.</p></div>
          </div>
        </div>
      </section>

      <section className="reviews" id="reviews">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Client Stories</p>
            <h2>Calm, confident, radiant</h2>
          </div>
          <div className="review-track-wrap">
            <div className="review-track" id="reviewTrack">
              <div className="review-card">
                <div className="review-inner">
                  <div className="stars">★★★★★</div>
                  <p className="quote">My bridal makeup stayed flawless for over 12 hours — through the ceremony, the photos, even the dancing.</p>
                  <p className="who">— Priya R., Bride</p>
                </div>
              </div>
              {/* Additional reviews will be handled in Reviews page, keeping static for Home */}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/reviews" className="btn on-dark">Read All Reviews</Link>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>Ready When You Are</p>
          <h2 className="reveal in">Let's plan your perfect look</h2>
          <p>Book a trial in advance to secure your event date — over WhatsApp, call, or our contact form.</p>
          <div className="btn-row">
            <Link to="/contact" className="btn on-dark">Book Your Trial</Link>
            <a href="https://wa.me/919150795778" target="_blank" rel="noopener noreferrer" className="btn on-dark">Chat on WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
