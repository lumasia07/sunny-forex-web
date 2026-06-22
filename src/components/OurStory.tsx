import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { LiveBlock, LiveWords } from './LiveText';

const stories = [
  {
    src: '/globe-futuristic.png',
    title: 'Global Remittance Hub',
    subtitle: 'Fast, Secure, Direct Transfer',
    description:
      'Send money instantly from anywhere in the world directly to Kenyan bank accounts, mobile money wallets, or for cash pick-up at any of our branches. Fast processing, transparent fees, and complete peace of mind.',
    accent: '#B91C1C',
  },
  {
    src: '/globe-futuristic.png',
    title: 'Guaranteed Real-Time Rates',
    subtitle: 'Lock Rates, Beat Volatility',
    description:
      'Secure highly competitive live exchange rates instantly online. Our platform locks your exchange rate for 24 hours so you can complete your transfers without worrying about sudden market fluctuations.',
    accent: '#006B3F',
  },
  {
    src: '/globe-futuristic.png',
    title: 'Seamless Mobile Wallet Flow',
    subtitle: 'Direct M-Pesa Integration',
    description:
      "Send funds directly to M-Pesa and other leading mobile money wallets. Our real-time API integrations make global-to-local mobile money transfers absolutely instantaneous and effortless.",
    accent: '#0EA5E9',
  },
  {
    src: '/globe-futuristic.png',
    title: 'Worldwide Payout Partners',
    subtitle: 'Global Network Reach',
    description:
      'Partnering with top global payout networks like Western Union, MoneyGram, and Ria, we connect families across continents. Fully CBK-licensed, secure, and trusted with every shilling.',
    accent: '#D4A24C',
  },
];

export function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mockups = [
    {
      image: '/devices-1-tr.png',
      alt: 'All-In-One Money Transfer Platform Showcase'
    },
    {
      image: '/laptop-1-tr.png',
      alt: 'Laptop Dashboard Peak Reliability'
    },
    {
      image: '/phone-2-tr.png',
      alt: 'Seamless Cash Transfers Mobile View'
    },
    {
      image: '/phone-1-tr.png',
      alt: 'Fast Mobile Remittance Mobile App'
    },
    {
      image: '/phone-3-tr.png',
      alt: 'Interbank Live Tracking Mobile Screen'
    }
  ];

  const totalSlides = stories.length + 1; // +1 for the CTA Slide

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (isPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 6000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPlaying, isHovered]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleScrollToCalculator = (e: React.MouseEvent) => {
    e.stopPropagation();
    const element = document.getElementById('rates-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  const isCtaSlide = currentIndex === stories.length;
  const currentSlide = isCtaSlide ? null : stories[currentIndex];
  const accentColor = isCtaSlide ? '#7A1220' : currentSlide?.accent || '#7A1220';

  return (
    <section
      id="our-story"
      className="relative py-16 md:py-20 lg:py-24 bg-[#FAFAF7] overflow-hidden"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#7A1220]/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#006B3F]/[0.02] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header - Stately and Focused on Services */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block w-12 h-px bg-[#7A1220] mb-5 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#7A1220] mb-3"
          >
            Our Service Journey
          </motion.p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0E0E0E] tracking-tight leading-[1.1] mb-5">
            A vision of trust, <span className="text-[#7A1220]">connecting lives.</span>
          </h2>
          <p className="text-sm md:text-base text-[#0E0E0E]/60 leading-relaxed max-w-xl">
            We bridge communities across Kenya and beyond. Take a look at the pillars that define how we move money safely, efficiently, and with respect for our rich heritage.
          </p>
        </div>

        {/* Elongated Slideshow Container */}
        <div
          className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-white/5 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Images with Higher Blur and Tint */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
              {isCtaSlide ? (
                <motion.div
                  key="cta-bg"
                  className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Abstract glowing graphics for premium CTA look */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7A1220]/10 blur-[120px]" />
                  <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#006B3F]/5 blur-[100px]" />
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                </motion.div>
              ) : (
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0 bg-[#090909] flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Blurred Digital Globe */}
                  <img
                    src="/globe-futuristic.png"
                    alt="Digital Globe Background"
                    className="absolute inset-0 w-full h-full object-cover origin-center filter blur-[14px] opacity-25"
                  />
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
          </div>

          {/* Main Overlay Content */}
          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-12 flex items-center z-20">
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Frosted Glass Card for Text Overlay */}
              <div className="col-span-1 lg:col-span-7 xl:col-span-6 flex items-center justify-start h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-lg backdrop-blur-xl bg-black/45 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 md:p-8 lg:p-10 shadow-2xl flex flex-col justify-between min-h-[85%] lg:min-h-0 relative overflow-hidden"
                  >
                    {/* Visual Glass Glow */}
                    <div
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-20 transition-colors duration-700 pointer-events-none"
                      style={{ backgroundColor: accentColor }}
                    />

                    {!isCtaSlide && currentSlide ? (
                      <div className="flex flex-col flex-1 justify-center">
                        <span
                          className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block w-fit"
                          style={{ color: accentColor }}
                        >
                          {currentSlide.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-2 sm:mb-4">
                          {currentSlide.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs md:text-sm text-white/75 leading-relaxed font-light mb-3 sm:mb-6">
                          {currentSlide.description}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col flex-1 justify-center items-start">
                        <span
                          className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block"
                          style={{ color: '#7A1220' }}
                        >
                          Experience Premium Exchange
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-2 sm:mb-4">
                          Ready to experience seamless transactions?
                        </h3>
                        <p className="text-[11px] sm:text-xs md:text-sm text-white/75 leading-relaxed font-light mb-4 sm:mb-8">
                          Visit any of our 7 modern branches in Nairobi, send money at your preferred currency rates online in advance, or contact our professional trading desk today.
                        </p>

                        {/* Premium Styled Rounded-Full Button with Arrow-in-div design */}
                        <a
                          href="/#rates-calculator"
                          onClick={handleScrollToCalculator}
                          className="inline-flex items-center gap-4 bg-[#7A1220] hover:bg-[#911a2a] text-white font-medium pl-6 pr-2 py-2 rounded-full shadow-lg transition-all duration-300 group text-sm select-none cursor-pointer"
                        >
                          <span className="font-semibold px-2 font-figtree">Send Money</span>
                          <span className="w-10 h-10 rounded-full bg-white text-[#7A1220] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-md">
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        </a>
                      </div>
                    )}

                    {/* Progress Indicators & Navigation Bar inside Card */}
                    <div className="flex items-center justify-between mt-auto pt-4 sm:pt-6 border-t border-white/10 gap-4">
                      <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <button
                          onClick={handlePrev}
                          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors"
                          aria-label="Previous slide"
                        >
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        {/* Next Button */}
                        <button
                          onClick={handleNext}
                          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors"
                          aria-label="Next slide"
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>

                        {/* Auto-play Pause Control */}
                        <button
                          onClick={togglePlay}
                          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors ml-1"
                          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                        >
                          {isPlaying ? (
                            <Pause className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                          )}
                        </button>
                      </div>

                      {/* Horizontal Linear Indicators */}
                      <div className="flex gap-2">
                        {Array.from({ length: totalSlides }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className="group relative py-2 px-1 focus:outline-none"
                            aria-label={`Go to slide ${i + 1}`}
                          >
                            <div
                              className="h-1 rounded-full transition-all duration-500 overflow-hidden relative"
                              style={{
                                width: i === currentIndex ? '2.5rem' : '0.5rem',
                                backgroundColor: i === currentIndex ? accentColor : 'rgba(255,255,255,0.2)',
                              }}
                            >
                              {i === currentIndex && isPlaying && !isHovered && (
                                <motion.div
                                  className="absolute top-0 bottom-0 left-0 bg-white"
                                  initial={{ width: '0%' }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 6, ease: 'linear' }}
                                  key={currentIndex}
                                />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: High-tech floating device mockup */}
              <div className="hidden lg:col-span-5 xl:col-span-6 lg:flex items-center justify-center h-full relative overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full max-h-[85%] flex items-center justify-center relative overflow-visible"
                  >
                    {/* Glowing colored ambient gradient bubble behind mockup */}
                    <div 
                      className="absolute w-[75%] h-[75%] rounded-full blur-[80px] opacity-40 transition-colors duration-700 pointer-events-none"
                      style={{ 
                        background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` 
                      }} 
                    />

                    {/* Drift Animation Container */}
                    <motion.div
                      animate={{
                        y: [0, -12, 0]
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="w-full h-full flex items-center justify-center p-4 z-10"
                    >
                      <img
                        src={mockups[currentIndex].image}
                        alt={mockups[currentIndex].alt}
                        className="w-full h-full max-h-[280px] xl:max-h-[340px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] select-none"
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Subtle Outer Nav Chevrons (desktop only for premium spacing) */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-30">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/75 border border-white/15 flex items-center justify-center text-white/70 hover:text-white backdrop-blur-md transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/75 border border-white/15 flex items-center justify-center text-white/70 hover:text-white backdrop-blur-md transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brand Indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-[2px] w-12">
              <span className="flex-1 bg-[#7A1220]" />
              <span className="flex-1 bg-[#006B3F]" />
              <span className="flex-1 bg-[#D4A24C]" />
            </div>
            <p className="text-xs text-[#0E0E0E]/45 font-medium">
              Hover to pause auto-swipe • Swipe or tap indicators to browse
            </p>
          </div>

          <div className="flex items-center gap-5">
            {[
              { label: 'Licensed By', value: 'CBK' },
              { label: 'Nairobi Branches', value: '7' },
              { label: 'Client Satisfaction', value: '99%' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2">
                {i > 0 && <span className="w-px h-6 bg-[#0E0E0E]/10" />}
                <div>
                  <p className="text-lg font-bold text-[#0E0E0E] leading-none tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#0E0E0E]/35 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
