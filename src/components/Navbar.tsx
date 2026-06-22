import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ContactLink } from './ContactLink';
import { motion } from 'framer-motion';

const pillLinks = [
  { name: 'Home', href: '/' },
  { name: 'Forex', href: '/forex' },
  { name: 'Remittance', href: '/remittance' },
  { name: 'Branches', href: '/branches' },
  { name: 'Corporate', href: '/corporate' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Blog', href: '/blog' },
];

const menuLinks = pillLinks;

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true">
      <line x1="3" y1="4" x2="15" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true">
      <line x1="4.5" y1="4.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [logoColor, setLogoColor] = useState<'red' | 'black'>('red');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 400) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-switch logo color between red and black every 5.5 seconds on the hero section for better focus time
  useEffect(() => {
    if (isScrolledPastHero) return;
    const interval = setInterval(() => {
      setLogoColor((prev) => (prev === 'red' ? 'black' : 'red'));
    }, 5500);
    return () => clearInterval(interval);
  }, [isScrolledPastHero]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLogoTap = () => {
    if (!isScrolledPastHero) {
      setLogoColor((prev) => (prev === 'red' ? 'black' : 'red'));
    }
  };

  const handleSendMoneyClick = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById('rates-calculator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '/#rates-calculator');
      }
    }
  };

  const isHomepage = location.pathname === '/';
  const showLogoPill = !isHomepage || isScrolledPastHero;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-5 md:pt-6 pointer-events-none translate-y-0">
        <div className="max-w-[90rem] mx-auto flex items-center justify-between gap-4 pointer-events-auto">
          
          {/* Left Container: Logo Pill + Links Pill (Pushed Left) */}
          <div className="flex items-center gap-4">
            {showLogoPill && (
              <motion.div
                initial={{ opacity: 0, x: -15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -15, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`h-11 sm:h-12 md:h-16 flex items-center px-4 md:px-5 rounded-full border transition-all duration-300 ${
                  isScrolledPastHero 
                    ? 'border-white/10 bg-[#0E0E0E]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
                    : 'border-gray-200/80 bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(122,18,32,0.05)]'
                }`}
              >
                <Link
                  to="/"
                  onClick={handleLogoTap}
                  className="relative overflow-hidden h-7 sm:h-8 w-28 sm:w-32 md:w-36 shrink-0 group flex items-center"
                  aria-label="SunnyRemit home">
                  
                  {isScrolledPastHero ? (
                    /* Static White Logo when header is black */
                    <img
                      src="/logo-white.png"
                      alt="SunnyRemit White"
                      className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    /* Odometer / Money Counter Logo roll stack (Red <-> Black) */
                    <motion.div
                      animate={{
                        y: logoColor === 'black' ? '-50%' : '0%'
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 80,
                        damping: 16,
                      }}
                      className="absolute left-0 top-0 w-full h-[200%] flex flex-col justify-start"
                    >
                      {/* 1. Red Logo */}
                      <div className="h-1/2 w-full flex items-center justify-start">
                        <img
                          src="/logo-red.png"
                          alt="SunnyRemit Red"
                          className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                      {/* 2. Black Logo */}
                      <div className="h-1/2 w-full flex items-center justify-start">
                        <img
                          src="/logo-black.png"
                          alt="SunnyRemit Black"
                          className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            )}
 
            {/* Navigation Links Pill (Pushed Left next to Logo, or far left when Logo is hidden) */}
            <div className="hidden lg:block">
              <div className={`h-11 sm:h-12 md:h-16 flex items-center gap-3 px-3.5 rounded-full border transition-all duration-300 ${
                isScrolledPastHero 
                  ? 'border-white/10 bg-[#0E0E0E]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
                  : 'border-gray-200/80 bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(122,18,32,0.05)]'
              }`}>
                {pillLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  const isFaq = link.name === 'FAQ';

                  const handleLinkClick = (e: React.MouseEvent) => {
                    if (isFaq && location.pathname === '/') {
                      e.preventDefault();
                      const element = document.getElementById('faq');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', '/#faq');
                      }
                    }
                  };

                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={handleLinkClick}
                      className={`font-figtree px-5 sm:px-6 md:h-11 flex items-center justify-center text-xs sm:text-[13px] font-bold rounded-full tracking-wide transition-all duration-300 select-none ${
                        isActive 
                          ? isScrolledPastHero
                            ? 'bg-gradient-to-r from-white to-gray-100 text-[#0E0E0E] shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:scale-[1.02]'
                            : 'bg-gradient-to-r from-[#7A1220] to-[#B91C1C] text-white shadow-[0_4px_14px_rgba(122,18,32,0.25)] hover:scale-[1.02]'
                          : isScrolledPastHero
                            ? 'text-white hover:text-white hover:bg-white/5'
                            : 'text-[#0E0E0E] hover:text-[#7A1220] hover:bg-gradient-to-r hover:from-[#7A1220]/5 hover:to-[#B91C1C]/5'
                      }`}>
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
 
          <div className={`h-11 sm:h-12 md:h-16 flex items-center rounded-full border transition-all duration-300 lg:border-none lg:bg-transparent lg:shadow-none lg:p-0 ${
            isScrolledPastHero 
              ? 'border-white/10 bg-[#0E0E0E]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-1' 
              : 'border-gray-200/80 bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(122,18,32,0.05)] p-1'
          }`}>
            {/* Desktop Send Money Button */}
            <Link
              to="/#rates-calculator"
              onClick={handleSendMoneyClick}
              className={`font-figtree hidden lg:flex pl-6 pr-2.5 h-11 rounded-full font-semibold transition-all duration-300 text-[13px] sm:text-[14px] tracking-wide whitespace-nowrap items-center justify-between gap-3.5 group shrink-0 select-none cursor-pointer ${
                isScrolledPastHero
                  ? 'bg-gradient-to-r from-white to-gray-100 text-[#0E0E0E] shadow-sm hover:scale-[1.02]'
                  : 'bg-gradient-to-r from-[#7A1220] to-[#B91C1C] text-white shadow-[0_4px_14px_rgba(122,18,32,0.3)] hover:scale-[1.02]'
              }`}
            >
              <span>Send Money</span>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 shadow-sm ${
                isScrolledPastHero
                  ? 'bg-[#0E0E0E] text-white'
                  : 'bg-white text-[#7A1220]'
              }`}>
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </Link>
 
            {/* Mobile / Tablet Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className={`lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 ${
                isScrolledPastHero
                  ? 'text-white/70 hover:text-white hover:bg-white/10'
                  : 'text-[#0E0E0E]/70 hover:text-[#7A1220] hover:bg-gray-50'
              }`}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
 
        </div>
      </nav>
 
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[#0E0E0E]/30 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className={`absolute top-[5.5rem] sm:top-24 left-4 right-4 rounded-3xl border p-6 shadow-2xl animate-fade-in transition-all duration-300 ${
            isScrolledPastHero 
              ? 'border-white/10 bg-[#0E0E0E]/98 text-white' 
              : 'border-gray-200 bg-white text-[#0E0E0E]'
          }`}>
            <div className="flex flex-col gap-1">
              {menuLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const isFaq = link.name === 'FAQ';
 
                const handleMobileClick = (e: React.MouseEvent) => {
                  setMenuOpen(false);
                  if (isFaq && location.pathname === '/') {
                    e.preventDefault();
                    const element = document.getElementById('faq');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState(null, '', '/#faq');
                    }
                  }
                };
 
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={handleMobileClick}
                    className={`font-figtree font-semibold px-4 py-3.5 text-lg rounded-xl transition-colors ${
                      isActive 
                        ? isScrolledPastHero 
                          ? 'text-white bg-white/10'
                          : 'text-[#7A1220] bg-[#7A1220]/5'
                        : isScrolledPastHero
                          ? 'text-white/70 hover:text-white hover:bg-white/5'
                          : 'text-[#0E0E0E]/70 hover:text-[#7A1220] hover:bg-gray-50'
                    }`}>
                    {link.name}
                  </Link>
                );
              })}
              
              {/* Mobile Menu Drawer CTA Button */}
              <Link
                to="/#rates-calculator"
                onClick={handleSendMoneyClick}
                className="font-figtree pl-6 pr-2 py-2 rounded-full text-base font-semibold text-white bg-[#7A1220] hover:bg-[#911a2a] transition-all flex items-center justify-between group shadow-md"
              >
                <span>Send Money</span>
                <span className="w-9 h-9 rounded-full bg-white text-[#7A1220] flex items-center justify-center transition-transform">
                  <ArrowRight className="w-4.5 h-4.5 text-[#7A1220]" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
