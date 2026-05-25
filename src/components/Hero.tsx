import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { HeroLockRateCard } from './HeroLockRateCard';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);

  // Interactive mouse 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Map to background drift (larger bounds to prevent showing borders)
  const bgTranslateX = useTransform(springX, [-0.5, 0.5], ['-3.5%', '3.5%']);
  const bgTranslateY = useTransform(springY, [-0.5, 0.5], ['-3.5%', '3.5%']);

  // Map to rate card 3D tilt & translation
  const cardRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const cardRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const cardTranslateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const cardTranslateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  // Gentle content drift
  const contentTranslateX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const contentTranslateY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-viewport relative w-full overflow-hidden flex flex-col justify-center"
      style={{ perspective: 1200 }}
    >
      {/* 3D parallax background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: bgY, scale: bgScale }}
        >
          <motion.img
            src="/12419.jpg"
            alt=""
            className="absolute -inset-[10%] w-[120%] h-[120%] object-cover object-center"
            style={{ x: bgTranslateX, y: bgTranslateY }}
          />
        </motion.div>

        {/* Dynamic overlay that darkens on scroll — more transparent for stunning 3D background visibility */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/[0.80] via-white/[0.55] to-white/[0.15] lg:to-white/10"
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [1, 0.6]) }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/50"
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [1, 0.5]) }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(122, 18, 32, 0.08) 0%, transparent 65%)`,
          }}
        />

        {/* Floating parallax particles */}
        <motion.div
          className="absolute w-3.5 h-3.5 rounded-full bg-[#7A1220]/25 blur-[1px]"
          style={{ top: '25%', right: '18%', y: useTransform(springY, [-0.5, 0.5], [-30, 30]) }}
          animate={{ x: [0, 20, -15, 0], opacity: [0.4, 0.8, 0.5, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-[#D4A24C]/45 blur-[1px]"
          style={{ top: '45%', right: '32%', y: useTransform(springY, [-0.5, 0.5], [-20, 20]) }}
          animate={{ x: [0, -25, 15, 0], opacity: [0.5, 0.9, 0.4, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-[#006B3F]/20 blur-[2px]"
          style={{ top: '65%', right: '12%', y: useTransform(springY, [-0.5, 0.5], [-40, 40]) }}
          animate={{ x: [0, 15, -20, 0], opacity: [0.3, 0.6, 0.4, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle shimmer line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(122,18,32,0.4), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="hero-viewport-inner relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-28">
          <motion.div
            className="text-left order-2 lg:order-1 relative z-10"
            style={{ x: contentTranslateX, y: contentTranslateY }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[#0E0E0E] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] tracking-tight leading-[1.05] mb-6 max-w-xl">
              Global reach.
              <br />
              <span className="text-[#7A1220]">Local trust.</span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 text-[#006B3F]">
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Zap className="w-8 h-8 lg:w-10 lg:h-10 fill-[#D4A24C] text-[#D4A24C]" />
                </motion.span>
                Instant exchange.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-[16px] sm:text-lg leading-relaxed mb-10 max-w-lg text-[#0E0E0E]/75">
              Moving the Kenyan shilling across continents — and bringing the world's currencies home — with care, since 2008.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                to="/lock-rate"
                className="btn-glow inline-flex justify-center items-center gap-4 pl-8 pr-2.5 py-2.5 rounded-full font-bold text-white text-base sm:text-lg group">
                Lock-In My Rate
                <span className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
              <Link
                to="/branches"
                className="inline-flex justify-center items-center gap-4 pl-8 pr-2.5 py-2.5 rounded-full bg-white/95 text-[#0E0E0E] border border-[#0E0E0E]/15 font-bold hover:border-[#7A1220] hover:text-[#7A1220] transition-all text-base sm:text-lg backdrop-blur-sm group">
                Find a Branch
                <span className="w-11 h-11 rounded-full bg-[#0E0E0E]/8 flex items-center justify-center group-hover:bg-[#7A1220]/10 transition-colors">
                  <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform text-[#0E0E0E] group-hover:text-[#7A1220]" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="flex items-center gap-2.5 text-sm text-gray-600">
              <div className="flex gap-0.5 text-[#D4A24C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span>
                <span className="font-bold text-[#0E0E0E]">CBK Licensed</span> · Since 2008
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              rotateX: cardRotateX,
              rotateY: cardRotateY,
              x: cardTranslateX,
              y: cardTranslateY,
              transformStyle: 'preserve-3d',
            }}
            className="order-1 lg:order-2 w-full flex items-center justify-center lg:justify-end shrink-0"
          >
            <div style={{ transform: 'translateZ(50px)' }} className="w-full">
              <HeroLockRateCard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

