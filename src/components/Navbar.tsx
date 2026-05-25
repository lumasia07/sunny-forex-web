import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      width="18"
      height="18"
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
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true">
      <line x1="4.5" y1="4.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 8) {
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

  const overLight = !isHome || isScrolled;

  const linkClass = (isActive: boolean) =>
    overLight
      ? isActive
        ? 'text-[#7A1220] bg-white/80'
        : 'text-[#0E0E0E]/70 hover:text-[#7A1220] hover:bg-white/50'
      : isActive
        ? 'text-white bg-[#7A1220]/40'
        : 'text-white/75 hover:text-white hover:bg-[#7A1220]/20';

  const ctaClass =
    'px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap bg-[#7A1220] text-white hover:bg-[#5C0D18]';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4 md:pt-5 pointer-events-none transition-transform duration-300 ease-in-out ${
          isVisible || menuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <div
            className={`flex items-center justify-between gap-2 pl-2.5 pr-1.5 py-1.5 rounded-full border transition-all duration-500 glass-pill ${
              overLight ? 'glass-pill-light' : 'glass-pill-dark'
            }`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 lg:flex-none group" aria-label="Sunny Forex home">
              <img
                src="/logo-mark.png"
                alt=""
                aria-hidden="true"
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 object-contain shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span
                className={`font-montserrat text-[11px] min-[380px]:text-xs sm:text-sm md:text-base font-bold tracking-wide truncate transition-colors duration-300 ${
                  overLight ? 'text-[#7A1220]' : 'text-white'
                }`}>
                Sunny Forex
              </span>
            </Link>

            {/* Nav links — desktop */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
              {pillLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${linkClass(isActive)}`}>
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* CTAs + mobile menu */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <ContactLink
                className={`${ctaClass} px-2.5 sm:px-3.5 ${!overLight ? 'shadow-[0_0_24px_rgba(122,18,32,0.45)]' : ''}`}
                onNavigate={() => setMenuOpen(false)}>
                <span className="sm:hidden">Contact</span>
                <span className="hidden sm:inline">Contact Us</span>
              </ContactLink>

              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className={`lg:hidden flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                  overLight
                    ? 'text-[#0E0E0E]/70 hover:text-[#7A1220] hover:bg-white/50'
                    : 'text-white/75 hover:text-white hover:bg-[#7A1220]/20'
                }`}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 rounded-3xl border border-white/15 bg-[#0E0E0E]/90 backdrop-blur-xl p-6 shadow-2xl animate-fade-in">
            <div className="flex flex-col gap-1">
              {menuLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-4 py-3.5 text-lg font-medium rounded-xl transition-colors ${
                      isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}>
                    {link.name}
                  </Link>
                );
              })}
              <ContactLink
                className="px-4 py-3.5 text-lg font-medium rounded-xl text-white bg-[#7A1220] hover:bg-[#5C0D18] transition-colors text-center"
                onNavigate={() => setMenuOpen(false)}>
                Contact Us
              </ContactLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
