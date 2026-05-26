import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ContactLink } from './ContactLink';

const pillLinks = [
  { name: 'Home', href: '/' },
  { name: 'Forex', href: '/forex' },
  { name: 'Remittance', href: '/remittance' },
  { name: 'Branches', href: '/branches' },
  { name: 'Corporate', href: '/corporate' },
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
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show nav near top of page so hero is never covered on scroll-up
      if (currentScrollY < 120) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setIsVisible(true);
    lastScrollY.current = 0;
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const ctaClass =
    'px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-[15px] font-semibold rounded-full transition-all duration-300 whitespace-nowrap bg-[#7A1220] text-white hover:bg-[#5C0D18] shadow-md shadow-[#7A1220]/20';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-5 md:pt-6 pointer-events-none transition-transform duration-300 ease-in-out ${
          isVisible || menuOpen ? 'translate-y-0' : '-translate-y-[120%]'
        }`}>
        <div className="max-w-[90rem] mx-auto pointer-events-auto">
          <div className="nav-bar-pill flex items-center justify-between gap-3 sm:gap-4 pl-3 sm:pl-4 pr-2 sm:pr-3 py-2.5 sm:py-3 md:py-3.5 rounded-full border border-gray-200/80 bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_12px_48px_rgba(0,0,0,0.04)]">
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 lg:flex-none group"
              aria-label="Sunny Forex home">
              <img
                src="/logo-mark.png"
                alt=""
                aria-hidden="true"
                className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="font-brand text-base sm:text-lg md:text-xl text-[#0E0E0E] truncate leading-none">
                Sunny <span className="text-[#7A1220]">Forex</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {pillLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <ContactLink
                className="pl-5 pr-2 py-2 rounded-full font-semibold transition-all duration-300 bg-[#7A1220] hover:bg-[#911a2a] text-white text-sm whitespace-nowrap shadow-lg flex items-center justify-between gap-3 group shrink-0 select-none"
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
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full text-[#0E0E0E]/70 hover:text-[#7A1220] hover:bg-gray-50 transition-all duration-300">
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
          <div className="absolute top-[5.5rem] sm:top-24 left-4 right-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl animate-fade-in">
            <div className="flex flex-col gap-1">
              {menuLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`font-display font-semibold px-4 py-3.5 text-lg rounded-xl transition-colors ${
                      isActive ? 'text-[#7A1220]' : 'text-[#0E0E0E]/70 hover:text-[#7A1220] hover:bg-gray-50'
                    }`}>
                    {link.name}
                  </Link>
                );
              })}
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
