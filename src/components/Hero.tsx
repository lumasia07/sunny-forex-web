import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap } from 'lucide-react';
import { HeroLockRateCard } from './HeroLockRateCard';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

export function Hero() {
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scroll parallax — subtle; overscan in CSS prevents edge gaps
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.14]);

  // Interactive mouse 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Map to background drift — keep tight so edges never show on ultrawide
  const bgTranslateX = useTransform(springX, [-0.5, 0.5], ['-1.5%', '1.5%']);
  const bgTranslateY = useTransform(springY, [-0.5, 0.5], ['-1.5%', '1.5%']);

  // Map to rate card 3D tilt & translation
  const cardRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const cardRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const cardTranslateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const cardTranslateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  // Gentle content drift
  const contentTranslateX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const contentTranslateY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const secondaryOverlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !sectionRef.current) return;
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
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      onMouseLeave={isDesktop ? handleMouseLeave : undefined}
      className="hero-viewport relative w-full overflow-hidden flex flex-col justify-center"
      style={isDesktop ? { perspective: 1200 } : undefined}
    >
      {/* Background — white base + overscanned image (mobile & desktop) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-white" aria-hidden="true">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="hero-bg-stage shrink-0"
            style={
              isDesktop
                ? {
                    y: bgY,
                    scale: bgScale,
                    x: bgTranslateX,
                  }
                : undefined
            }
          >
            <motion.img
              src="/12419-hero.webp"
              alt=""
              className="hero-bg-image"
              decoding="async"
              fetchPriority="high"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.endsWith('/12419-hero.jpg')) {
                  img.src = '/12419-hero.jpg';
                }
              }}
              style={isDesktop ? { y: bgTranslateY } : undefined}
            />
          </motion.div>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/72 to-white/85 lg:from-white/82 lg:via-white/58 lg:to-white/75" />
        {isDesktop && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/35"
            style={{ opacity: secondaryOverlayOpacity }}
          />
        )}
        <div
          className="absolute inset-0 opacity-70 lg:opacity-100"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 50% 45%, rgba(122, 18, 32, 0.06) 0%, transparent 70%)`,
          }}
        />

        {/* Floating parallax particles — desktop only */}
        <motion.div
          className="hidden lg:block absolute w-3.5 h-3.5 rounded-full bg-[#7A1220]/25 blur-[1px]"
          style={{ top: '25%', right: '18%', y: useTransform(springY, [-0.5, 0.5], [-30, 30]) }}
          animate={{ x: [0, 20, -15, 0], opacity: [0.4, 0.8, 0.5, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hidden lg:block absolute w-2.5 h-2.5 rounded-full bg-[#D4A24C]/45 blur-[1px]"
          style={{ top: '45%', right: '32%', y: useTransform(springY, [-0.5, 0.5], [-20, 20]) }}
          animate={{ x: [0, -25, 15, 0], opacity: [0.5, 0.9, 0.4, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hidden lg:block absolute w-5 h-5 rounded-full bg-[#006B3F]/20 blur-[2px]"
          style={{ top: '65%', right: '12%', y: useTransform(springY, [-0.5, 0.5], [-40, 40]) }}
          animate={{ x: [0, 15, -20, 0], opacity: [0.3, 0.6, 0.4, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle shimmer line */}
        <motion.div
          className="hidden lg:block absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(122,18,32,0.4), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="hero-viewport-inner relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-20 items-center py-10 sm:py-14 lg:py-28">
          <motion.div
            className="text-left order-2 lg:order-1 relative z-10 w-full min-w-0"
            style={isDesktop ? { x: contentTranslateX, y: contentTranslateY } : undefined}
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-[#0E0E0E] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] tracking-tight leading-[1.05] mb-6 max-w-xl">
              Global reach.
              <br />
              <span className="text-[#7A1220]">Local trust.</span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.04 }}
              className="text-[16px] sm:text-lg leading-relaxed mb-10 max-w-lg text-[#0E0E0E]/75">
              Moving the Kenyan shilling across continents — and bringing the world's currencies home — with care, since 2008.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
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
              transition={{ delay: 0.1 }}
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            style={
              isDesktop
                ? {
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    x: cardTranslateX,
                    y: cardTranslateY,
                    transformStyle: 'preserve-3d',
                  }
                : undefined
            }
            className="order-1 lg:order-2 w-full min-w-0 flex items-center justify-center lg:justify-end shrink-0 px-1 sm:px-0"
          >
            <div
              style={isDesktop ? { transform: 'translateZ(50px)' } : undefined}
              className="w-full max-w-[min(100%,360px)] sm:max-w-[360px] mx-auto lg:mx-0 lg:ml-auto"
            >
              <HeroLockRateCard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

