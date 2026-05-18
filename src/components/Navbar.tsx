import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // On non-home pages we don't have a transparent dark hero behind nav, so default to scrolled style
  const useDark = !isHome || isScrolled;
  const navLinks = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Forex',
    href: '/forex'
  },
  {
    name: 'Remittance',
    href: '/remittance'
  },
  {
    name: 'Branches',
    href: '/branches'
  },
  {
    name: 'Corporate',
    href: '/corporate'
  },
  {
    name: 'Blog',
    href: '/blog'
  }];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useDark ? 'bg-white/90 backdrop-blur-md border-b border-gray-200/60 py-3 text-[#0E0E0E] shadow-sm' : 'bg-gradient-to-b from-black/50 to-transparent py-5 text-white'}`}>
      
      {/* Kenyan flag accent stripe */}
      <div className="absolute top-0 left-0 right-0 flex h-[3px]">
        <span className="flex-1 bg-[#0E0E0E]" />
        <span className="flex-1 bg-[#B91C1C]" />
        <span className="flex-1 bg-[#006B3F]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo-sunny.png"
            alt="Sunny Forex"
            className={`h-14 md:h-20 w-auto transition-all duration-300 ${useDark ? '' : 'brightness-0 invert'}`} />
          
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-[#7A1220] group ${isActive ? 'text-[#7A1220]' : ''}`}>
                
                {link.name}
                <span
                  className={`absolute -bottom-1.5 left-0 right-0 h-px bg-[#7A1220] origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                
              </Link>);

          })}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className={`text-sm font-medium px-6 py-2.5 rounded-full transition-all border ${useDark ? 'bg-[#7A1220] text-white border-[#7A1220] hover:bg-[#5C0D18] hover:border-[#5C0D18]' : 'bg-white text-[#0E0E0E] border-white hover:bg-white/90'}`}>
            
            Contact Us
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu">
          
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen &&
      <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-lg flex flex-col gap-4 text-[#0E0E0E]">
          {navLinks.map((link) =>
        <Link
          key={link.name}
          to={link.href}
          className="text-lg font-medium hover:text-[#7A1220] transition-colors"
          onClick={() => setMobileMenuOpen(false)}>
          
              {link.name}
            </Link>
        )}
          <a
          href="#contact"
          className="mt-4 text-center text-sm font-medium px-6 py-3 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors"
          onClick={() => setMobileMenuOpen(false)}>
          
            Contact Us
          </a>
        </div>
      }
    </nav>);

}