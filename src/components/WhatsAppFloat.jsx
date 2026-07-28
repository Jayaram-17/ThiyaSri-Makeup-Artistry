import React, { useState, useEffect } from 'react';

const WhatsAppFloat = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <a className="wa-float" href="https://wa.me/919150795778" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.99.59 3.84 1.6 5.42L2 22l4.79-1.66a9.86 9.86 0 0 0 5.25 1.5h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.07h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12 1.08 1.1-3.04-.2-.32a8.15 8.15 0 0 1-1.25-4.55c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.4 5.8c0 4.53-3.68 8.15-8.21 8.15zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.96-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.97-1.21-.73-.65-1.22-1.45-1.36-1.7-.14-.25-.02-.38.11-.5.12-.12.27-.31.41-.46.14-.16.18-.27.27-.45.09-.18.04-.33-.04-.45-.08-.12-.6-1.44-.82-1.97-.22-.52-.44-.45-.6-.46-.16-.01-.34-.01-.52-.01-.18 0-.46.07-.7.32-.25.25-.95.93-.95 2.27 0 1.34.97 2.63 1.1 2.81.14.18 1.9 2.9 4.6 3.96 2.7 1.06 2.7.7 3.19.66.5-.05 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.07-.1-.25-.16-.5-.28z"/>
        </svg>
      </a>
      <button 
        className={`totop ${showTopBtn ? 'show' : ''}`} 
        id="toTop" 
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        ↑
      </button>
    </>
  );
};

export default WhatsAppFloat;
