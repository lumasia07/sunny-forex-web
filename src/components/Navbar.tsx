import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  CircleHelp,
  Headphones,
  Landmark,
  MapPin,
  Scale,
  Send,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ContactLink } from './ContactLink';

type DropdownName = 'products' | 'support' | null;

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <line x1="3" y1="4" x2="15" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <line x1="4.5" y1="4.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownName>(null);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolledPastHero(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeDropdown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('pointerdown', closeDropdown);
    return () => document.removeEventListener('pointerdown', closeDropdown);
  }, []);



  const handleSendMoneyClick = (event: React.MouseEvent) => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById('rates-calculator');
      if (element) {
        event.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '/#rates-calculator');
      }
    }
  };

  const handleFaqClick = (event: React.MouseEvent) => {
    setMenuOpen(false);
    setActiveDropdown(null);
    if (location.pathname === '/') {
      const element = document.getElementById('faq');
      if (element) {
        event.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '/#faq');
      }
    }
  };

  const productsActive = location.pathname === '/forex' || location.pathname === '/remittance';
  const supportActive = location.hash === '#faq' || location.hash === '#contact';
  const desktopLinkClass = (active: boolean) =>
    `relative flex h-11 items-center gap-1.5 px-3 font-figtree text-[13px] font-semibold transition-colors xl:px-4 ${
      active ? 'text-[#7A1220]' : 'text-black hover:text-[#7A1220]'
    }`;

  const dropdownPanelClass = 'rounded-2xl border border-gray-150 bg-white p-2 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl';

  const dropdownItemClass = 'group flex items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-gray-50';

  return (
    <>
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-10 md:pt-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setActiveDropdown(null);
          }}
          className="pointer-events-auto mx-auto flex h-14 max-w-[90rem] items-center rounded-full border border-gray-200 bg-[#FAF9F5]/90 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 sm:h-16 sm:px-4 md:h-[4.5rem] md:px-5"
        >
          <Link
            to="/"
            className="group relative flex h-8 w-28 shrink-0 items-center sm:w-32 md:w-36"
            aria-label="SunnyRemit home"
          >
            <img
              src="/sunny_logo_large.svg"
              alt="SunnyRemit"
              className="h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-7"
            />
          </Link>

          <div className="mx-auto hidden items-center lg:flex">
            <Link to="/" className={desktopLinkClass(location.pathname === '/' && !supportActive)}>
              Home
              {location.pathname === '/' && !supportActive && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#7A1220] xl:inset-x-4" />
              )}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveDropdown(null);
              }}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown((current) => (current === 'products' ? null : 'products'))}
                aria-expanded={activeDropdown === 'products'}
                aria-haspopup="menu"
                className={desktopLinkClass(productsActive)}
              >
                Products
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                {productsActive && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#7A1220] xl:inset-x-4" />}
              </button>

              {activeDropdown === 'products' && (
                <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3" role="menu">
                  <div className={dropdownPanelClass}>
                    <Link to="/forex" className={dropdownItemClass} role="menuitem">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7A1220]/10 text-[#7A1220]">
                        <Landmark className="h-4 w-4" />
                      </span>
                      <span>
                        <strong className="block font-figtree text-sm text-gray-800">Forex</strong>
                        <span className="mt-0.5 block font-figtree text-[11px] text-gray-400">
                          Exchange major currencies securely.
                        </span>
                      </span>
                    </Link>
                    <Link to="/remittance" className={dropdownItemClass} role="menuitem">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4A24C]/15 text-[#9A641D]">
                        <Send className="h-4 w-4" />
                      </span>
                      <span>
                        <strong className="block font-figtree text-sm text-gray-800">Remittance</strong>
                        <span className="mt-0.5 block font-figtree text-[11px] text-gray-400">
                          Send and receive money worldwide.
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/branches" className={desktopLinkClass(location.pathname === '/branches')}>
              Branches
              {location.pathname === '/branches' && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#7A1220] xl:inset-x-4" />}
            </Link>
            <Link to="/corporate" className={desktopLinkClass(location.pathname === '/corporate')}>
              Corporate
              {location.pathname === '/corporate' && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#7A1220] xl:inset-x-4" />}
            </Link>
            <Link to="/blog" className={desktopLinkClass(location.pathname === '/blog')}>
              Blog
              {location.pathname === '/blog' && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#7A1220] xl:inset-x-4" />}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('support')}
              onMouseLeave={() => setActiveDropdown(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveDropdown(null);
              }}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown((current) => (current === 'support' ? null : 'support'))}
                aria-expanded={activeDropdown === 'support'}
                aria-haspopup="menu"
                className={desktopLinkClass(supportActive)}
              >
                Support
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'support' ? 'rotate-180' : ''}`} />
                {supportActive && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#7A1220] xl:inset-x-4" />}
              </button>

              {activeDropdown === 'support' && (
                <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3" role="menu">
                  <div className={dropdownPanelClass}>
                    <Link to="/#faq" onClick={handleFaqClick} className={dropdownItemClass} role="menuitem">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7A1220]/10 text-[#7A1220]">
                        <CircleHelp className="h-4 w-4" />
                      </span>
                      <span>
                        <strong className="block font-figtree text-sm text-gray-800">FAQs</strong>
                        <span className="mt-0.5 block font-figtree text-[11px] text-gray-400">Answers to common questions.</span>
                      </span>
                    </Link>
                    <ContactLink className={dropdownItemClass} onNavigate={() => setActiveDropdown(null)} role="menuitem">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4A24C]/15 text-[#9A641D]">
                        <Headphones className="h-4 w-4" />
                      </span>
                      <span>
                        <strong className="block font-figtree text-sm text-gray-800">Contact Us</strong>
                        <span className="mt-0.5 block font-figtree text-[11px] text-gray-400">Speak with our support team.</span>
                      </span>
                    </ContactLink>
                    <Link to="/branches" className={dropdownItemClass} role="menuitem">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <span>
                        <strong className="block font-figtree text-sm text-gray-800">Find a Branch</strong>
                        <span className="mt-0.5 block font-figtree text-[11px] text-gray-400">Get in-person assistance.</span>
                      </span>
                    </Link>
                    <Link to="/legal" className={dropdownItemClass} role="menuitem">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700">
                        <Scale className="h-4 w-4" />
                      </span>
                      <span>
                        <strong className="block font-figtree text-sm text-gray-800">Legal & Policies</strong>
                        <span className="mt-0.5 block font-figtree text-[11px] text-gray-400">Terms, Privacy & AML compliance.</span>
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="ml-auto hidden items-center gap-6 lg:flex">
            <Link
              to="/developers"
              className="h-11 shrink-0 flex items-center justify-center px-6 rounded-full bg-[#7A1220]/5 border border-[#7A1220]/15 text-[13px] font-bold text-[#7A1220] hover:bg-[#7A1220]/10 hover:border-[#7A1220]/30 active:scale-95 transition-all shadow-sm font-figtree"
            >
              Developer
            </Link>

            <Link
              to="/#rates-calculator"
              onClick={handleSendMoneyClick}
              className="h-11 shrink-0 items-center justify-between gap-3 rounded-full bg-[#7A1220] py-1 pl-5 pr-1 font-figtree text-[13px] font-semibold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-[#5C0D18] flex"
            >
              Send Money
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7A1220]">
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 lg:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </motion.div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#0E0E0E]/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div
            className="absolute left-4 right-4 top-[5.5rem] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-gray-250 bg-white p-4 text-gray-800 shadow-2xl animate-fade-in sm:top-24"
          >
            <div className="space-y-1">
              <Link to="/" className="block rounded-xl px-4 py-3 font-figtree text-base font-semibold text-gray-800 hover:text-[#7A1220]" onClick={() => setMenuOpen(false)}>Home</Link>

              <p className="px-4 pb-1 pt-4 font-figtree text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">Products</p>
              <Link to="/forex" className="flex items-center gap-3 rounded-xl px-4 py-3 font-figtree font-semibold text-gray-800 hover:text-[#7A1220] hover:bg-gray-55" onClick={() => setMenuOpen(false)}>
                <Landmark className="h-4 w-4 text-[#7A1220]" /> Forex
              </Link>
              <Link to="/remittance" className="flex items-center gap-3 rounded-xl px-4 py-3 font-figtree font-semibold text-gray-800 hover:text-[#7A1220] hover:bg-gray-55" onClick={() => setMenuOpen(false)}>
                <Send className="h-4 w-4 text-[#7A1220]" /> Remittance
              </Link>

              <div className="my-2 h-px bg-gray-100" />
              <Link to="/branches" className="flex items-center gap-3 rounded-xl px-4 py-3 font-figtree font-semibold text-gray-800 hover:text-[#7A1220]" onClick={() => setMenuOpen(false)}><Building2 className="h-4 w-4 text-[#7A1220]" /> Branches</Link>
              <Link to="/corporate" className="block rounded-xl px-4 py-3 font-figtree font-semibold text-gray-800 hover:text-[#7A1220]" onClick={() => setMenuOpen(false)}>Corporate</Link>
              <Link to="/blog" className="block rounded-xl px-4 py-3 font-figtree font-semibold text-gray-800 hover:text-[#7A1220]" onClick={() => setMenuOpen(false)}>Blog</Link>

              <p className="px-4 pb-1 pt-4 font-figtree text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">Support</p>
              <Link to="/#faq" onClick={handleFaqClick} className="flex items-center gap-3 rounded-xl px-4 py-3 font-figtree font-semibold text-gray-800 hover:text-[#7A1220] hover:bg-gray-55"><CircleHelp className="h-4 w-4 text-[#7A1220]" /> FAQs</Link>
              <ContactLink className="flex items-center gap-3 rounded-xl px-4 py-3 font-figtree font-semibold text-gray-800 hover:text-[#7A1220] hover:bg-gray-55" onNavigate={() => setMenuOpen(false)}><Headphones className="h-4 w-4 text-[#7A1220]" /> Contact Us</ContactLink>

              <Link
                to="/#rates-calculator"
                onClick={handleSendMoneyClick}
                className="mt-3 flex items-center justify-between rounded-full bg-[#7A1220] py-2 pl-6 pr-2 font-figtree font-semibold text-white shadow-md"
              >
                Send Money
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7A1220]">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
