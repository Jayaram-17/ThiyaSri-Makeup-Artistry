import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [openFaq, setOpenFaq] = useState('0');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = (data.get('fname') || '').trim();
    const phone = (data.get('fphone') || '').trim();
    const date = data.get('fdate') || '';
    const pkg = data.get('fpkg') || '';
    const note = (data.get('fnote') || '').trim();

    const message = `Hi Thiyasri Makeup Artistry! I'd like to book a trial.\nName: ${name}\nContact: ${phone}\nEvent Date: ${date}\nPackage: ${pkg}\nNotes: ${note || '—'}`;

    const waUrl = `https://wa.me/919150795778?text=${encodeURIComponent(message)}`;
    setShowSuccessMsg(true);
    setTimeout(() => { window.open(waUrl, '_blank'); }, 600);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb"><a href="/">Home</a> / Contact</p>
          <h1 className="reveal in">Reserve your trial date</h1>
          <p className="sub reveal in">We recommend booking in advance to secure your date. Fill in your details and we'll confirm availability over WhatsApp or call.</p>
        </div>
      </section>

      <section style={{ paddingTop: '20px' }} id="booking">
        <div className="wrap book-grid">
          <div className="book-info-card reveal-left">
            <div className="row">
              <div className="ic">📞</div>
              <div><strong>WhatsApp / Call</strong><span>+91 91507 95778</span></div>
            </div>
            <div className="row">
              <div className="ic">📷</div>
              <div><strong>Instagram</strong><span>Thiyasri_Makeup_Artistry</span></div>
            </div>
            <div className="row">
              <div className="ic">🕮</div>
              <div><strong>Advance Booking</strong><span>Recommended to secure your preferred date</span></div>
            </div>
            <div className="row">
              <div className="ic">✓</div>
              <div><strong>Every Package Includes</strong><span>Complimentary lens, lashes &amp; hair extension</span></div>
            </div>
            <div className="map-embed">Studio Location — On Request</div>
          </div>

          <form className="book-form reveal-right" id="bookingForm" onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="fname">Full Name</label>
                <input id="fname" name="fname" type="text" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="fphone">WhatsApp Number</label>
                <input id="fphone" name="fphone" type="tel" required placeholder="+91 " />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="fdate">Event Date</label>
                <input id="fdate" name="fdate" type="date" required />
              </div>
              <div className="field">
                <label htmlFor="fpkg">Package</label>
                <select id="fpkg" name="fpkg">
                  <option value="HD Makeup">HD Makeup — ₹9,000</option>
                  <option value="Glossy Makeup">Glossy Makeup — ₹12,000</option>
                  <option value="Airbrush Makeup">Airbrush Makeup — ₹15,000</option>
                  <option value="Not sure yet">Not sure yet — please advise</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="fnote">Tell us about the occasion</label>
              <textarea id="fnote" name="fnote" rows="3" placeholder="e.g. Wedding reception, 2 saree changes, venue location..."></textarea>
            </div>
            <div className="submit-row">
              <button type="submit" className="btn solid" style={{ width: '100%', justifyContent: 'center' }}>Request Booking via WhatsApp</button>
            </div>
            <p className="form-note">Submitting opens WhatsApp with your details pre-filled — nothing is sent automatically. We'll confirm availability and pricing directly with you.</p>
            <div className={`success-msg ${showSuccessMsg ? 'show' : ''}`} id="successMsg">
              <span>✓</span><span>Opening WhatsApp with your booking details…</span>
            </div>
          </form>
        </div>
      </section>

      <section style={{ background: '#fff' }}>
        <div className="wrap" style={{ maxWidth: '760px' }}>
          <div className="section-head center reveal">
            <p className="eyebrow">Quick Questions</p>
            <h2>Frequently asked</h2>
          </div>
          <div className="reveal">
            {[
              { q: 'How far in advance should I book?', a: 'We recommend booking as soon as your date is confirmed — bridal dates especially fill up quickly during peak season.' },
              { q: 'Is a trial session required before the event?', a: 'A trial isn\'t compulsory, but we recommend it so we can finalise your exact look together ahead of the big day.' },
              { q: 'What\'s included in every package?', a: 'Every package includes complimentary lens, lashes and hair extension. Glossy and Airbrush packages also include a hair accessory.' },
              { q: 'Do you travel to the venue?', a: 'Yes — let us know your venue location when you message us and we\'ll confirm travel arrangements.' },
              { q: 'Which package should I choose?', a: 'HD suits everyday events, Glossy is ideal for receptions under stage lighting, and Airbrush is built for long days and heavy photography.' }
            ].map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaq === String(idx) ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => toggleFaq(String(idx))}>
                  <span>{faq.q}</span><span className="plus">+</span>
                </button>
                <div className="faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
