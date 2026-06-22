import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Play, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

const deviceImages = [
  { path: '/devices-1-tr.png', label: 'All-In-One Platform' },
  { path: '/laptop-1-tr.png', label: 'Sleek Laptop Dashboard' },
  { path: '/laptop-2-tr.png', label: 'Real-Time Rate Locking' },
  { path: '/phone-1-tr.png', label: 'Fast Mobile Remittance' },
  { path: '/phone-2-tr.png', label: 'Seamless Cash Transfers' },
  { path: '/phone-3-tr.png', label: 'Interbank Live Tracking' }
];

const AUTO_PLAY_INTERVAL = 4500; // 4.5 seconds per slide

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [logoColor, setLogoColor] = useState<'red' | 'black'>('red');

  const handleSendMoneyClick = (e: React.MouseEvent) => {
    const element = document.getElementById('rates-calculator');
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % deviceImages.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoColor((prev) => (prev === 'red' ? 'black' : 'red'));
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-viewport relative w-full overflow-hidden bg-gradient-to-br from-[#7A1220]/[0.07] via-[#FAFAF7] to-[#D4A24C]/[0.03] flex flex-col justify-between"
    >
      <div className="hero-viewport-inner relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col justify-center flex-grow">
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center pt-2 pb-8 lg:pt-3 lg:pb-12">
          
          {/* Left Text Column (NEONIX Style Typography) */}
          <div className="text-left order-1 relative z-10">
            
            {/* Rolling Stack Logo above Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 h-14 w-52 sm:w-56 relative overflow-hidden shrink-0 group flex items-center cursor-pointer select-none"
            >
              <motion.div
                onClick={() => setLogoColor((prev) => (prev === 'red' ? 'black' : 'red'))}
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
                    className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                {/* 2. Black Logo */}
                <div className="h-1/2 w-full flex items-center justify-start">
                  <img
                    src="/logo-black.png"
                    alt="SunnyRemit Black"
                    className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-figtree text-[#0E0E0E] text-[2rem] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.75rem] tracking-tight leading-[1.08] mb-6 max-w-xl"
            >
              <span className="font-light text-black/90">Global Reach.</span>
              <br />
              <span className="font-bold text-[#7A1220]">Local Trust.</span>
              <br />
              <span className="bg-gradient-to-r from-[#7A1220] via-[#D4A24C] to-[#7A1220] bg-clip-text text-transparent block pb-1">
                Instant Exchange.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[13px] sm:text-[14px] leading-relaxed mb-8 max-w-md text-gray-500 font-light tracking-[0.05em]"
            >
              Moving the Kenyan shilling across continents — and bringing the world's currencies home — with care, since 2008.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 sm:gap-10 mb-8"
            >
              <Link
                to="/#rates-calculator"
                onClick={handleSendMoneyClick}
                className="btn-glow inline-flex items-center gap-3.5 pl-8 pr-3 py-2.5 rounded-full font-figtree font-bold text-white text-[14px] sm:text-[15px] tracking-wide group"
              >
                Send Money
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-all">
                  <ArrowRight size={15} />
                </span>
              </Link>

              <Link
                to="/branches"
                className="inline-flex items-center gap-3.5 hover:text-[#7A1220] transition-colors group"
              >
                <span className="w-11 h-11 rounded-full border border-gray-200/80 bg-white shadow-sm flex items-center justify-center text-[#7A1220] group-hover:border-[#7A1220]/25 group-hover:bg-gray-50/50 transition-all">
                  <MapPin size={16} />
                </span>
                <span className="text-[12px] font-bold tracking-[0.12em] uppercase text-black/80 group-hover:text-[#7A1220] transition-colors">
                  Find a Branch
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-xs text-black/70"
            >
              <div className="flex gap-0.5 text-[#D4A24C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>
                <span className="font-bold text-black">CBK Licensed</span> · Since 2008
              </span>
            </motion.div>
          </div>

          {/* Right Column - Animated Holographic Device Showcase Visual */}
          <div
            className="order-2 w-full flex flex-col items-center justify-center shrink-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full aspect-[1.25/1] max-w-[560px] sm:max-w-[600px] mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center">
              

              {/* Ambient Glow behind the device */}
              <div className="absolute w-[75%] h-[75%] rounded-full bg-gradient-to-tr from-[#7A1220]/8 via-transparent to-[#D4A24C]/6 filter blur-[45px] z-0 pointer-events-none" />

              {/* Device Image Viewer Stack */}
              <div className="relative w-full h-full flex items-center justify-center overflow-visible bg-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.82, rotateY: -12, rotateZ: -2, y: 25 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, rotateZ: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 1.08, rotateY: 12, rotateZ: 2, y: -25 }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 16,
                      mass: 0.8
                    }}
                    className="w-full h-full flex items-center justify-center relative z-10"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src={deviceImages[currentIndex].path}
                      alt={deviceImages[currentIndex].label}
                      className="w-full h-full object-contain select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Tech Dashboard Bar (NEONIX Style) */}
        <div className="w-full mt-auto">
          {/* Horizontal Tech Divider */}
          <div className="w-full h-px bg-gray-200/80 my-8 md:my-12" />

          {/* Row Elements */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 pb-8 md:pb-12">
            
            {/* Left Play Link */}
            <button className="flex items-center gap-3 group text-left">
              <span className="w-10 h-10 rounded-full border border-[#7A1220]/20 flex items-center justify-center group-hover:bg-[#7A1220]/5 transition-all text-[#7A1220] shadow-sm">
                <Play size={14} className="fill-[#7A1220]/10 ml-0.5" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/70 group-hover:text-black transition-colors">
                Watch Demo
              </span>
            </button>

            {/* Center Value Props */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 text-left md:border-l md:border-gray-200 md:pl-10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#7A1220] tracking-[0.12em] uppercase block">01 / SECURE ESCROW</span>
                <p className="text-[11px] text-gray-500 max-w-[220px] leading-relaxed font-light">
                  CBK Licensed remittance & currency exchange since 2008.
                </p>
              </div>
              <div className="space-y-1 sm:border-l sm:border-gray-200 sm:pl-10">
                <span className="text-[10px] font-bold text-[#7A1220] tracking-[0.12em] uppercase block">02 / INSTANT LOCK</span>
                <p className="text-[11px] text-gray-500 max-w-[220px] leading-relaxed font-light">
                  Real-time rate locking with 24-hour collection guarantee.
                </p>
              </div>
            </div>

            {/* Right Socials */}
            <div className="flex items-center gap-3 md:ml-auto">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#7A1220] hover:border-[#7A1220] transition-colors shadow-sm bg-white">
                <Facebook size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#7A1220] hover:border-[#7A1220] transition-colors shadow-sm bg-white">
                <Linkedin size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#7A1220] hover:border-[#7A1220] transition-colors shadow-sm bg-white">
                <Instagram size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#7A1220] hover:border-[#7A1220] transition-colors shadow-sm bg-white">
                <Twitter size={14} />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
