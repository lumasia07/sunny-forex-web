import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { HeroLockRateCard } from './HeroLockRateCard';

const landscapeImages = [
  '/pexels-sergey-pesterev-69811391-8427984.jpg',
  '/pexels-kelvin-kibe-3073372-26898331.jpg',
  '/pexels-ben-iwara-1033992193-27742235.jpg',
  '/pexels-mnmshakir-35034068.jpg'
];

export function Hero({ selectedCurrency }: { selectedCurrency: string | null }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Gentle scroll-only parallax on background image
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % landscapeImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-viewport relative w-full overflow-hidden"
    >
      {/* Background image slideshow — simple scroll parallax */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={landscapeImages[currentImageIndex]}
            src={landscapeImages[currentImageIndex]}
            alt=""
            initial={{ opacity: 0, scale: 1.0 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: 'easeInOut' },
              scale: { duration: 6.5, ease: 'linear' }
            }}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ y: bgY }}
          />
        </AnimatePresence>

        {/* Dynamic Overlays for readability - sleek, dark, and clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/[0.55] via-black/[0.25] to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/[0.15] via-transparent to-black/[0.30] z-[1]" />
        
        {/* Premium ambient maroon & gold brand glows for rich 3D backlighting */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 85% 85%, rgba(122, 18, 32, 0.14) 0%, transparent 55%),
              radial-gradient(circle at 15% 90%, rgba(122, 18, 32, 0.09) 0%, transparent 50%),
              radial-gradient(circle at 50% 30%, rgba(122, 18, 32, 0.04) 0%, transparent 60%),
              radial-gradient(circle at 80% 25%, rgba(212, 162, 76, 0.06) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div className="hero-viewport-inner relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center py-8 lg:py-0">
          
          {/* Left Text Column */}
          <div className="text-left order-1 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-white text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] tracking-tight leading-[1.08] mb-5 max-w-xl">
              Global Reach.
              <br />
              <span className="text-[#FF5263]">Local Trust.</span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#10B981] block">
                Instant Exchange.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[15px] sm:text-base leading-relaxed mb-7 max-w-md text-white/80">
              Moving the Kenyan shilling across continents — and bringing the world's currencies home — with care, since 2008.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="flex flex-wrap items-center gap-3 mb-6">
              <Link
                to="/branches"
                className="btn-glow inline-flex justify-center items-center gap-3 pl-7 pr-2 py-2 rounded-full font-bold text-white text-sm sm:text-base group">
                Send Money Now
                <span className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
              <Link
                to="/branches"
                className="inline-flex justify-center items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-white text-[#0E0E0E] border border-[#0E0E0E]/15 font-bold hover:border-[#7A1220] hover:text-[#7A1220] transition-all text-sm sm:text-base group">
                Find a Branch
                <span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200/80 flex items-center justify-center group-hover:bg-[#7A1220]/10 group-hover:text-white transition-colors">
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="flex items-center gap-2 text-xs text-white/70">
              <div className="flex gap-0.5 text-[#D4A24C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>
                <span className="font-bold text-white">CBK Licensed</span> · Since 2008
              </span>
            </motion.div>
          </div>

          {/* Right Rates Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="order-2 w-full flex items-center justify-center lg:justify-end shrink-0"
          >
            <HeroLockRateCard selectedCurrency={selectedCurrency} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
