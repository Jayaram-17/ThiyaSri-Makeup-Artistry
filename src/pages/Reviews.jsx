import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Reviews = () => {
  const [counts, setCounts] = useState({ clients: 0, rating: 0, recommend: 0 });
  const statRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let startTime = null;
        const duration = 1300;
        const targets = { clients: 250, rating: 5, recommend: 98 };
        
        const step = (ts) => {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          setCounts({
            clients: Math.floor(progress * targets.clients),
            rating: Math.floor(progress * targets.rating),
            recommend: Math.floor(progress * targets.recommend)
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
          <p className="crumb"><Link to="/">Home</Link> / Reviews</p>
          <h1 className="reveal in">Calm, confident, radiant</h1>
          <p className="sub reveal in">Real words from brides and clients who trusted us with their special day.</p>
          <div className="stat-row reveal in" style={{ marginTop: '30px' }} ref={statRef}>
            <div className="stat"><div className="num">{counts.clients}</div><div className="cap">Happy Clients</div></div>
            <div className="stat"><div className="num">{counts.rating}</div><div className="cap">Average Star Rating</div></div>
            <div className="stat"><div className="num">{counts.recommend}</div><div className="cap">% Would Recommend</div></div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="review-grid stagger">
            <div className="reveal" style={{ '--i': 0 }}>
              <div className="review-inner" style={{ background: '#fff', borderColor: 'var(--line)', color: 'inherit' }}>
                <div className="stars">★★★★★</div>
                <p className="quote" style={{ color: 'var(--espresso)' }}>My bridal makeup stayed flawless for over 12 hours — through the ceremony, the photos, even the dancing. I felt like the best version of myself.</p>
                <p className="who" style={{ color: 'var(--maroon)' }}>— Priya R., Bride</p>
              </div>
            </div>
            <div className="reveal" style={{ '--i': 1 }}>
              <div className="review-inner" style={{ background: '#fff', borderColor: 'var(--line)', color: 'inherit' }}>
                <div className="stars">★★★★★</div>
                <p className="quote" style={{ color: 'var(--espresso)' }}>The airbrush finish looked incredible on camera. Every photographer at the wedding asked who did my makeup.</p>
                <p className="who" style={{ color: 'var(--maroon)' }}>— Meena S., Reception Client</p>
              </div>
            </div>
            <div className="reveal" style={{ '--i': 2 }}>
              <div className="review-inner" style={{ background: '#fff', borderColor: 'var(--line)', color: 'inherit' }}>
                <div className="stars">★★★★★</div>
                <p className="quote" style={{ color: 'var(--espresso)' }}>Booked the glossy package for my engagement — the hairdo and saree draping were so well done I didn't need to touch anything all evening.</p>
                <p className="who" style={{ color: 'var(--maroon)' }}>— Divya K., Engagement</p>
              </div>
            </div>
            <div className="reveal" style={{ '--i': 3 }}>
              <div className="review-inner" style={{ background: '#fff', borderColor: 'var(--line)', color: 'inherit' }}>
                <div className="stars">★★★★★</div>
                <p className="quote" style={{ color: 'var(--espresso)' }}>Punctual, professional, and incredibly skilled with draping. My mother-in-law asked for the same artist for her own event.</p>
                <p className="who" style={{ color: 'var(--maroon)' }}>— Ananya V., Bride</p>
              </div>
            </div>
            <div className="reveal" style={{ '--i': 4 }}>
              <div className="review-inner" style={{ background: '#fff', borderColor: 'var(--line)', color: 'inherit' }}>
                <div className="stars">★★★★★</div>
                <p className="quote" style={{ color: 'var(--espresso)' }}>Used premium, skin-friendly products that didn't irritate my sensitive skin at all. Hygiene was clearly a priority.</p>
                <p className="who" style={{ color: 'var(--maroon)' }}>— Lavanya T., Client</p>
              </div>
            </div>
            <div className="reveal" style={{ '--i': 5 }}>
              <div className="review-inner" style={{ background: '#fff', borderColor: 'var(--line)', color: 'inherit' }}>
                <div className="stars">★★★★★</div>
                <p className="quote" style={{ color: 'var(--espresso)' }}>HD makeup for my sister's reception held up beautifully through hours of photos and dancing. Highly recommend.</p>
                <p className="who" style={{ color: 'var(--maroon)' }}>— Keerthana M., Family Event</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>Add Your Story</p>
          <h2>Book your trial and join our happy clients</h2>
          <div className="btn-row">
            <Link to="/contact" className="btn on-dark">Book Your Trial</Link>
            <a href="#" className="btn on-dark" target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
