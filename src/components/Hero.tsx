import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
const heroSlides = [
  {
    src: '/pexels-jakubzerdzicki-30572289.jpg',
    fallback: '/pexels-jakubzerdzicki-30572289.jpg',
    alt: 'Nairobi Physical Bureau',
    caption: 'Nairobi Physical Bureau',
    tag: 'Our Main Office'
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#0E0E0E] overflow-hidden">
      {/* Background slideshow with crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            src={heroSlides[0].src}
            alt={heroSlides[0].alt}
            initial={{
              opacity: 0,
              scale: 1.08
            }}
            animate={{
              opacity: 1,
              scale: [1.08, 1, 1.08]
            }}
            transition={{
              opacity: {
                duration: 1.8,
                ease: 'easeInOut'
              },
              scale: {
                duration: 24,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (!target.dataset.fellBack) {
                target.dataset.fellBack = '1';
                target.src = heroSlides[0].fallback;
              }
            }} />
          
        </AnimatePresence>

        {/* LIGHTER, more cinematic overlays — let imagery breathe */}
        <div className="absolute inset-0 bg-[#0E0E0E]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/75 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/70 via-[#0E0E0E]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7A1220]/10 via-transparent to-[#D4A24C]/10 mix-blend-overlay" />
      </div>

      {/* Maasai shuka-inspired left edge stripe */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 z-10 hidden md:block"
        style={{
          background:
          'repeating-linear-gradient(180deg, #B91C1C 0px, #B91C1C 28px, #0E0E0E 28px, #0E0E0E 36px, #FAFAF7 36px, #FAFAF7 40px, #0E0E0E 40px, #0E0E0E 48px)'
        }} />
      

      {/* Slide tag (top right) */}
      <div className="absolute top-28 right-6 md:right-12 z-10 hidden md:flex flex-col items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              y: -8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -8
            }}
            transition={{
              duration: 0.5
            }}
            className="flex flex-col items-end">
            
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/50 mb-2">
              {heroSlides[currentSlide].tag}
            </span>
            <span className="text-xl font-light text-white">
              {heroSlides[currentSlide].caption}
            </span>
            <span className="block mt-2 w-10 h-px bg-[#B91C1C]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-44 md:pb-36">
        <div className="max-w-2xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}
            className="flex items-center gap-4 mb-8">
            
            <div className="flex h-[3px] w-10">
              <span className="flex-1 bg-[#0E0E0E]" />
              <span className="flex-1 bg-[#B91C1C]" />
              <span className="flex-1 bg-[#006B3F]" />
            </div>
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/85">
              Nairobi, Kenya · Since 2008
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.1
            }}
            className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight mb-6 drop-shadow-lg">
            
            Global reach.
            <br />
            Local trust.
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.25
            }}
            className="text-lg md:text-xl text-gray-100 font-light mb-10 max-w-lg leading-relaxed drop-shadow">
            
            Moving the Kenyan shilling across continents — and bringing the
            world's currencies home — with care, since 2008.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.4
            }}
            className="flex flex-col sm:flex-row gap-4">
            
            <Link
              to="/lock-rate"
              className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-white text-[#0E0E0E] font-medium hover:bg-gray-100 transition-colors shadow-lg">
              
              Lock-In My Rate
            </Link>
            <Link
              to="/branches"
              className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-transparent border border-white/80 text-white font-medium hover:bg-white/10 transition-colors">
              
              Find a Branch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom hero strip — KSh + slide indicators */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 backdrop-blur-md bg-gradient-to-t from-[#0E0E0E]/85 to-[#0E0E0E]/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 text-white/90">
            <span className="text-2xl md:text-3xl font-light tracking-tight">
              KSh
            </span>
            <span className="block w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/60">
                Kenyan Shilling
              </span>
              <span className="text-sm font-light">
                Trading globally · 50+ corridors
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-white/60 text-xs font-medium tracking-[0.2em] uppercase">
            <span>USD · EUR · GBP · AED · ZAR · INR</span>
          </div>

          <div className="flex items-center gap-3">
            {heroSlides.map((slide, index) =>
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Show ${slide.caption}`}
              className="group relative h-1 transition-all duration-500"
              style={{
                width: index === currentSlide ? '32px' : '12px'
              }}>
              
                <span
                className={`absolute inset-0 rounded-full transition-colors ${index === currentSlide ? 'bg-[#B91C1C]' : 'bg-white/30 group-hover:bg-white/60'}`} />
              
              </button>
            )}
          </div>
        </div>
      </div>
    </section>);

}