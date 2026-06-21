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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-5 md:pt-6 pointer-events-none translate-y-0">
        <div className="max-w-[90rem] mx-auto pointer-events-auto">
          <div className={`nav-bar-pill flex items-center justify-between gap-3 sm:gap-4 pl-3 sm:pl-4 pr-2 sm:pr-3 py-2.5 sm:py-3 md:py-3.5 rounded-full border transition-all duration-300 ${
            isScrolledPastHero 
              ? 'border-white/10 bg-[#0E0E0E]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
              : 'border-gray-200/80 bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_12px_48px_rgba(0,0,0,0.04)]'
          }`}>
            <Link
              to="/"
              onClick={handleLogoTap}
              className="relative overflow-hidden h-8 sm:h-9 md:h-10 w-36 sm:w-40 md:w-44 shrink-0 group flex items-center"
              aria-label="SunnyRemit home">
              
              {isScrolledPastHero ? (
                /* Static White Logo when header is black, no roll animation */
                <img
                  src="/logo-white.png"
                  alt="SunnyRemit White"
                  className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
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
                      className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  {/* 2. Black Logo */}
                  <div className="h-1/2 w-full flex items-center justify-start">
                    <img
                      src="/logo-black.png"
                      alt="SunnyRemit Black"
                      className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </motion.div>
              )}
            </Link>

            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
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
                    className={`nav-link transition-colors duration-200 ${
                      isScrolledPastHero 
                        ? isActive 
                          ? '!text-white font-bold after:!bg-white after:scale-x-100' 
                          : '!text-white/70 hover:!text-white after:!bg-white'
                        : isActive
                          ? 'nav-link-active font-bold'
                          : 'text-[#0E0E0E]/65 hover:text-[#7A1220]'
                    }`}>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Desktop Only Contact Button (hidden below lg) */}
              <ContactLink
                className="hidden lg:flex pl-5 pr-2 py-2 rounded-full font-semibold transition-all duration-300 bg-[#7A1220] hover:bg-[#911a2a] text-white text-sm whitespace-nowrap shadow-lg items-center justify-between gap-3 group shrink-0 select-none"
                onNavigate={() => setMenuOpen(false)}>
                <span>Contact Us Now</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#7A1220] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 shadow-md">
                  <ArrowRight className="w-4 h-4 text-[#7A1220]" strokeWidth={2.5} />
                </span>
              </ContactLink>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className={`lg:hidden flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 ${
                  isScrolledPastHero
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-[#0E0E0E]/70 hover:text-[#7A1220] hover:bg-gray-50'
                }`}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
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
                    className={`font-display font-semibold px-4 py-3.5 text-lg rounded-xl transition-colors ${
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
              <ContactLink
                className="pl-6 pr-2 py-2 rounded-full text-base font-semibold text-white bg-[#7A1220] hover:bg-[#911a2a] transition-all flex items-center justify-between group shadow-md"
                onNavigate={() => setMenuOpen(false)}>
                <span>Contact Us Now</span>
                <span className="w-9 h-9 rounded-full bg-white text-[#7A1220] flex items-center justify-center transition-transform">
                  <ArrowRight className="w-4.5 h-4.5 text-[#7A1220]" strokeWidth={2.5} />
                </span>
              </ContactLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
