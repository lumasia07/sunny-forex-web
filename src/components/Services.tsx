import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LiveBlock, LiveWords } from './LiveText';

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const handleScrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('rates-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  const featureRows = [
    {
      title: 'Forex Exchange',
      description: 'Competitive live rates for major global currencies. Instantly calculate rates online and visit any of our 7 Nairobi branches for immediate, commission-free pickup.',
      ctaText: 'Check Rates',
      ctaType: 'scroll',
      image: '/laptop-2-tr.png',
      imageAlt: 'Sleek Laptop Live Rates Converter Dashboard',
      imagePosition: 'right', // image on right, text on left
      accent: '#7A1220',
      gradient: 'from-[#7A1220]/5 via-transparent to-[#D4A24C]/5'
    },
    {
      title: 'Money Remittance',
      description: 'Send and receive money internationally through our secure, fully licensed global remittance platform. Direct transfers to mobile wallets and major international banks.',
      ctaText: 'Send Money',
      ctaType: 'scroll',
      image: '/devices-1-tr.png',
      imageAlt: 'All-In-One Money Transfer Platform Showcase',
      imagePosition: 'left', // image on left, text on right
      accent: '#006B3F',
      gradient: 'from-emerald-500/5 via-transparent to-transparent'
    },
    {
      title: 'M-Pesa Transfers',
      description: 'Seamless integration with mobile wallets. Instantly convert international currencies directly into your M-Pesa wallet, or top-up for global transfers in one click.',
      ctaText: 'Explore Transfers',
      ctaType: 'link',
      ctaHref: '/remittance',
      image: '/phone-3-tr.png',
      imageAlt: 'Live Interbank Remittance Mobile App Tracking Screen',
      imagePosition: 'right', // image on right, text on left
      accent: '#D4A24C',
      gradient: 'from-[#D4A24C]/5 via-transparent to-[#7A1220]/5'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <span className="inline-block w-12 h-px bg-[#7A1220] mb-5 origin-left" />
          <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4 font-bold tracking-tight text-white">
            <LiveWords text="Services built for how Kenya moves money." variant="neutral" />
          </h2>
          <LiveBlock className="type-lead text-gray-400 max-w-xl font-light" variant="neutral" inline={false}>
            From cash exchange at our modern branches to instant M-Pesa transfers — every service is engineered for speed, transparency, and trust.
          </LiveBlock>
        </div>

        {/* Feature Rows */}
        <div className="space-y-12 md:space-y-16">
          {featureRows.map((row, index) => {
            const isImageRight = row.imagePosition === 'right';
            return (
              <motion.div 
                key={row.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-12 lg:p-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center overflow-visible shadow-2xl hover:border-white/10 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)] transition-all duration-500 group"
              >
                {/* Column 1: Text or Image based on position */}
                <div className={`order-1 ${isImageRight ? 'lg:order-1' : 'lg:order-2'} space-y-6 relative z-10`}>
                  
                  {/* Decorative number tag */}
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase block" style={{ color: row.accent }}>
                    0{index + 1} / FEATURED SERVICE
                  </span>
                  
                  <h3 className="type-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                    <LiveWords text={row.title} variant="neutral" />
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed max-w-lg">
                    {row.description}
                  </p>
                  
                  <div className="pt-2">
                    {row.ctaType === 'scroll' ? (
                      <a
                        href="/#rates-calculator"
                        onClick={handleScrollToCalculator}
                        className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full font-figtree font-bold text-white transition-all duration-300 group/btn select-none shadow-sm text-sm"
                        style={{ backgroundColor: row.accent }}
                      >
                        <span>{row.ctaText}</span>
                        <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={row.ctaHref || '/'}
                        className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full font-figtree font-bold text-white transition-all duration-300 group/btn select-none shadow-sm text-sm"
                        style={{ backgroundColor: row.accent }}
                      >
                        <span>{row.ctaText}</span>
                        <span className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5">
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Column 2: Image or Text based on position */}
                <div className={`order-2 ${isImageRight ? 'lg:order-2' : 'lg:order-1'} relative flex items-center justify-center overflow-visible`}>
                  
                  {/* Glowing background bubble behind device */}
                  <div className={`absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr ${row.gradient} filter blur-3xl opacity-60 z-0 pointer-events-none`} />

                  {/* Tech frame layout container */}
                  <div className="relative w-full aspect-[1.25/1] max-w-[500px] flex items-center justify-center z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      <motion.div
                        animate={{
                          y: [0, -10, 0]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img 
                          src={row.image} 
                          alt={row.imageAlt}
                          className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.05)] select-none group-hover:scale-105 transition-transform duration-500"
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
