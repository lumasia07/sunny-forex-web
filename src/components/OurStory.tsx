import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const calculateRange = () => {
      if (scrollRef.current) {
        const totalWidth = scrollRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // The scroll range is the total scroll width minus the viewport width plus a safety margin
        setScrollRange(Math.max(0, totalWidth - viewportWidth + 120));
      }
    };
    calculateRange();
    const timer = setTimeout(calculateRange, 150);
    window.addEventListener('resize', calculateRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateRange);
    };
  }, [isDesktop]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const allCards = [
    {
      number: '01',
      title: 'Global Remittance Hub',
      subtitle: 'Fast, Secure, Direct Transfer',
      description: 'Send money instantly from anywhere in the world directly to Kenyan bank accounts, mobile money wallets, or for cash pick-up. Fast processing, transparent fees, and complete peace of mind.',
      accent: '#7A1220',
      image: '/devices-1-tr.png',
      alt: 'All-In-One Money Transfer Platform Showcase'
    },
    {
      number: '02',
      title: 'Guaranteed Real-Time Rates',
      subtitle: 'Lock Rates, Beat Volatility',
      description: 'Secure highly competitive live exchange rates instantly online. Our platform locks your exchange rate for 24 hours so you can complete your transfers without worrying about sudden market fluctuations.',
      accent: '#006B3F',
      image: '/laptop-1-tr.png',
      alt: 'Laptop Dashboard Peak Reliability'
    },
    {
      number: '03',
      title: 'Seamless Mobile Wallet Flow',
      subtitle: 'Direct M-Pesa Integration',
      description: "Send funds directly to M-Pesa and other leading mobile money wallets. Our real-time API integrations make global-to-local mobile money transfers absolutely instantaneous and effortless.",
      accent: '#0EA5E9',
      image: '/phone-2-tr.png',
      alt: 'Seamless Cash Transfers Mobile View'
    },
    {
      number: '04',
      title: 'Worldwide Payout Partners',
      subtitle: 'Global Network Reach',
      description: 'Partnering with top global payout networks like Western Union, MoneyGram, and Ria, we connect families across continents. Fully CBK-licensed, secure, and trusted with every shilling.',
      accent: '#D4A24C',
      image: '/phone-1-tr.png',
      alt: 'Fast Mobile Remittance Mobile App'
    },
    {
      number: '05',
      title: 'Ready to experience seamless transactions?',
      subtitle: 'Experience Premium Exchange',
      description: 'Visit any of our 7 modern branches in Nairobi, send money at your preferred currency rates online in advance, or contact our professional trading desk today.',
      accent: '#7A1220',
      image: '/phone-3-tr.png',
      alt: 'Interbank Live Tracking Mobile Screen',
      isCta: true
    }
  ];

  const renderCard = (card: typeof allCards[0], index: number) => {
    return (
      <div
        key={card.number}
        className="flex-shrink-0 w-[380px] sm:w-[420px] h-[360px] bg-gradient-to-br from-[#7A1220] to-[#4A0A12] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl shrink-0 relative overflow-hidden group select-none hover:border-white/20 hover:shadow-[0_25px_60px_rgba(122,18,32,0.25)] transition-all duration-500"
      >
        {/* Soft gold color bubble in bottom right that glows on hover */}
        <div 
          className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none bg-[#D4A24C]"
        />

        {/* Card Header Info */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-white/10 border border-white/15 rounded-full text-[#D4A24C]"
            >
              {card.subtitle}
            </span>
            <span className="font-mono text-xs font-bold text-white/60 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/15">
              {card.number}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-3">
            {card.title}
          </h3>
          <p className="text-xs text-white/80 font-light leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Card Footer Graphics */}
        <div className="relative h-24 w-full flex items-end justify-between overflow-visible">
          {card.isCta ? (
            <a
              href="/#rates-calculator"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('rates-calculator');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '/#rates-calculator');
                }
              }}
              className="inline-flex items-center gap-3 bg-[#D4A24C] hover:bg-[#c2903b] text-[#0A0A0A] font-bold pl-5 pr-2 py-1.5 rounded-full shadow-md transition-all duration-300 group/btn text-xs select-none cursor-pointer mb-2 relative z-10"
            >
              <span className="font-bold font-figtree">Send Money</span>
              <span className="w-7 h-7 rounded-full bg-[#0A0A0A] text-[#D4A24C] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 shadow-md">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          ) : (
            <div className="w-16 h-[2px] rounded-full group-hover:w-24 transition-all duration-500 mb-4" style={{ backgroundColor: `${card.accent}40` }} />
          )}

          {/* Floating graphic image */}
          <div className="absolute right-[-10px] bottom-[-20px] w-44 h-28 flex items-end overflow-visible pointer-events-none select-none z-0">
            <img
              src={card.image}
              alt={card.alt}
              className="w-full h-full object-contain object-bottom drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 origin-bottom"
            />
          </div>
        </div>
      </div>
    );
  };

  if (!isDesktop) {
    // Mobile responsive fallback: a clean native horizontal swiping row
    return (
      <section id="our-story" className="relative py-16 bg-[#FAFAF7] overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-10 max-w-2xl">
            <span className="inline-block w-12 h-px bg-[#7A1220] mb-4 origin-left" />
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#7A1220] mb-2">
              Our Service Journey
            </p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-[#0E0E0E] tracking-tight leading-[1.2] mb-4">
              A vision of trust, <span className="text-[#7A1220]">connecting lives.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#0E0E0E]/60 leading-relaxed">
              We bridge communities across Kenya and beyond. Take a look at the pillars that define how we move money safely and efficiently.
            </p>
          </div>

          {/* Native Swipe Row */}
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide -mx-6 px-6">
            {allCards.map((card, i) => renderCard(card, i))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-[2px] w-12">
                <span className="flex-1 bg-[#7A1220]" />
                <span className="flex-1 bg-[#006B3F]" />
                <span className="flex-1 bg-[#D4A24C]" />
              </div>
              <p className="text-[10px] text-[#0E0E0E]/45 font-medium">
                Swipe left or right to browse details
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop horizontal sticky scroll layout
  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#FAFAF7] overflow-visible">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 lg:py-16 overflow-hidden border-t border-gray-100">
        
        {/* Title Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-start justify-between gap-6 z-20">
          <div className="max-w-xl">
            <span className="inline-block w-12 h-px bg-[#7A1220] mb-4 origin-left" />
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#7A1220] mb-2">
              Our Service Journey
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0E0E0E] tracking-tight leading-[1.1] mb-3">
              A vision of trust, <span className="text-[#7A1220]">connecting lives.</span>
            </h2>
            <p className="text-xs md:text-sm text-[#0E0E0E]/60 leading-relaxed">
              We bridge communities across Kenya and beyond. Scroll down to see the core pillars that guide our service.
            </p>
          </div>

          {/* Stats indicator on the right */}
          <div className="hidden lg:flex items-center gap-6 mt-6 shrink-0">
            {[
              { label: 'Licensed By', value: 'CBK' },
              { label: 'Nairobi Branches', value: '7' },
              { label: 'Satisfaction', value: '99%' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2">
                {i > 0 && <span className="w-px h-6 bg-[#0E0E0E]/10" />}
                <div>
                  <p className="text-base font-bold text-[#0E0E0E] leading-none tabular-nums">
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

        {/* Scroll Track container - centering the horizontal cards */}
        <div className="relative flex items-center w-full my-auto overflow-visible">
          <motion.div
            ref={scrollRef}
            style={{ x }}
            className="flex gap-8 px-6 md:px-12 pr-[50vw] select-none"
          >
            {allCards.map((card, i) => renderCard(card, i))}
          </motion.div>
        </div>

        {/* Footer instruction block */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <div className="flex h-[2px] w-12">
              <span className="flex-1 bg-[#7A1220]" />
              <span className="flex-1 bg-[#006B3F]" />
              <span className="flex-1 bg-[#D4A24C]" />
            </div>
            <p className="text-xs text-[#0E0E0E]/45 font-medium">
              Continue scrolling down to explore branches and details
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
