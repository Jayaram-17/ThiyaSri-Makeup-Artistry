import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  const galleryItems = [
    { cat: 'bridal', img: '/assets/img/gallery-01.jpg', alt: 'Bridal Rose Garland Look', cap: 'Bridal Rose Garland' },
    { cat: 'reception', img: '/assets/img/gallery-02.jpg', alt: 'Reception Glam Look', cap: 'Reception Glam' },
    { cat: 'bridal', img: '/assets/img/gallery-03.jpg', alt: 'Bridal Makeup Detail', cap: 'Bridal Makeup Detail' },
    { cat: 'reception', img: '/assets/img/gallery-04.jpg', alt: 'Wedding Reception Entrance', cap: 'Reception Entrance' },
    { cat: 'bridal', img: '/assets/img/gallery-05.jpg', alt: 'Traditional Bridal Glam', cap: 'Traditional Bridal Glam' },
    { cat: 'bridal', img: '/assets/img/gallery-06.jpg', alt: 'Garland Ceremony Bride', cap: 'Garland Ceremony' },
    { cat: 'reception', img: '/assets/img/gallery-07.jpg', alt: 'Couple Blessing Moment', cap: 'Couple Blessing' },
    { cat: 'reception', img: '/assets/img/gallery-08.jpg', alt: 'Reception Couple Look', cap: 'Reception Couple' },
    { cat: 'bridal', img: '/assets/img/gallery-09.jpg', alt: 'Bridal Makeup Closeup', cap: 'Bridal Closeup' },
    { cat: 'bridal', img: '/assets/img/gallery-10.jpg', alt: 'Floral Garland Bride', cap: 'Floral Garland Bride' },
    { cat: 'hair', img: '/assets/img/gallery-11.jpg', alt: 'Bridal Hairstyle', cap: 'Bridal Hairstyle' },
    { cat: 'bridal', img: '/assets/img/gallery-12.jpg', alt: 'Silk Saree Bridal Look', cap: 'Silk Saree Bridal' },
    { cat: 'bridal', img: '/assets/img/gallery-13.jpg', alt: 'Maang Tikka Detail', cap: 'Maang Tikka Detail' },
    { cat: 'bridal', img: '/assets/img/gallery-14.jpg', alt: 'Kanjeevaram Bridal Look', cap: 'Kanjeevaram Bridal' },
    { cat: 'bridal', img: '/assets/img/gallery-15.jpg', alt: 'Wedding Ceremony Bride', cap: 'Wedding Ceremony' },
    { cat: 'bridal', img: '/assets/img/gallery-16.jpg', alt: 'Mehndi Hands Bridal Look', cap: 'Mehndi & Bridal Glam' },
    { cat: 'bridal', img: '/assets/img/gallery-17.jpg', alt: 'Temple Jewelry Bridal Look', cap: 'Temple Jewelry Bridal' },
    { cat: 'reception', img: '/assets/img/gallery-18.jpg', alt: 'Bride and Groom Portrait', cap: 'Bride & Groom Portrait' },
    { cat: 'reception', img: '/assets/img/gallery-19.jpg', alt: 'Candid Couple Moment', cap: 'Candid Couple Moment' },
    { cat: 'bridal', img: '/assets/img/gallery-20.jpg', alt: 'Gold Silk Saree Bridal Look', cap: 'Gold Silk Saree Bridal' },
    { cat: 'bridal', img: '/assets/img/gallery-21.jpg', alt: 'Outdoor Bridal Portrait', cap: 'Outdoor Bridal Portrait' },
    { cat: 'hair', img: '/assets/img/hair-01.jpg', alt: 'Braided Bridal Hairstyle with Lotus', cap: 'Braided Bridal Hairstyle' },
    { cat: 'hair', img: '/assets/img/hair-02.jpg', alt: 'Fishtail Braid with Pearl Pins', cap: 'Fishtail Braid' },
    { cat: 'hair', img: '/assets/img/hair-03.jpg', alt: 'Bridal Bun with Veil', cap: 'Bridal Bun & Veil' },
    { cat: 'hair', img: '/assets/img/hair-04.jpg', alt: 'Braided Hairstyle with Kundan Hair Chain', cap: 'Braid with Hair Chain' },
    { cat: 'hair', img: '/assets/img/hair-05.jpg', alt: 'Curled Half-Up Hairstyle with Floral Clip', cap: 'Curls & Floral Clip' },
    { cat: 'hair', img: '/assets/img/hair-06.jpg', alt: 'Textured Fishtail Braid', cap: 'Textured Fishtail Braid' }
  ];

  const visibleItems = galleryItems.map((item, idx) => ({ ...item, originalIndex: idx }))
    .filter(item => filter === 'all' || item.cat === filter);

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
    const handleKeydown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });

  const nextImage = () => {
    const idxInVisible = visibleItems.findIndex(v => v.originalIndex === lightboxIndex);
    if (idxInVisible !== -1) {
      const nextIdx = (idxInVisible + 1) % visibleItems.length;
      setLightboxIndex(visibleItems[nextIdx].originalIndex);
    }
  };

  const prevImage = () => {
    const idxInVisible = visibleItems.findIndex(v => v.originalIndex === lightboxIndex);
    if (idxInVisible !== -1) {
      const prevIdx = (idxInVisible - 1 + visibleItems.length) % visibleItems.length;
      setLightboxIndex(visibleItems[prevIdx].originalIndex);
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><Link to="/">Home</Link> / Gallery</p>
          <h1 className="reveal in">Looks we've loved creating</h1>
          <p className="sub reveal in">Filter by category to see the work that matches the moment you're planning for. Click any image to view it full-size.</p>
        </div>
      </section>

      <section style={{ paddingTop: '0' }}>
        <div className="wrap">
          <div className="gallery-filters reveal">
            {['all', 'bridal', 'reception', 'hair'].map(f => (
              <button 
                key={f} 
                className={`filter-btn ${filter === f ? 'active' : ''}`} 
                onClick={() => setFilter(f)}
              >
                {f === 'hair' ? 'Hairstyle' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="gallery-grid" id="galleryGrid">
            {galleryItems.map((item, index) => {
              const isHidden = filter !== 'all' && item.cat !== filter;
              return (
                <div 
                  key={index} 
                  className={`g-item ${isHidden ? 'hidden' : ''}`} 
                  onClick={() => setLightboxIndex(index)}
                >
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <div className="g-cap">{item.cap}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className={`lightbox ${lightboxIndex !== null ? 'open' : ''}`} id="lightbox" onClick={(e) => {
        if (e.target.id === 'lightbox') setLightboxIndex(null);
      }}>
        <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close">&times;</button>
        <button className="lightbox-nav prev" onClick={prevImage} aria-label="Previous">&#8249;</button>
        {lightboxIndex !== null && (
          <img id="lightboxImg" src={galleryItems[lightboxIndex].img} alt={galleryItems[lightboxIndex].alt} />
        )}
        <button className="lightbox-nav next" onClick={nextImage} aria-label="Next">&#8250;</button>
      </div>

      <section className="cta-band">
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>Liked What You Saw?</p>
          <h2>Let's create your look next</h2>
          <div className="btn-row">
            <Link to="/contact" className="btn on-dark">Book Your Trial</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
