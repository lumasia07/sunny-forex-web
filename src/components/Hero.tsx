import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroCalculator } from './HeroCalculator';
import { LiveBlock, LiveLine } from './LiveText';

export function Hero() {
  return (
    <section className="relative w-full bg-[#0E0E0E] overflow-hidden">
      {/* Organic wave layers */}
      <div className="absolute inset-0 z-0">
        <div className="hero-wave hero-wave-1" />
        <div className="hero-wave hero-wave-2" />
        <div className="hero-wave hero-wave-3" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E0E] via-[#0E0E0E]/80 to-[#7A1220]/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(185,28,28,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(212,162,76,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_80%,rgba(0,107,63,0.08),transparent_40%)]" />
      </div>

      {/* Subtle background photo texture */}
      <div className="absolute inset-0 z-0 opacity-[0.12]">
        <img
          src="/pexels-jakubzerdzicki-30572289.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-28 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left — headline, copy & CTAs */}
          <div className="order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-5 sm:mb-8">
              <div className="flex h-[3px] w-10 shrink-0">
                <span className="flex-1 bg-[#0E0E0E]" />
                <span className="flex-1 bg-[#B91C1C]" />
                <span className="flex-1 bg-[#006B3F]" />
              </div>
              <LiveBlock className="text-[10px] sm:text-xs font-medium tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/60" variant="light">
                Nairobi, Kenya · Since 2008
              </LiveBlock>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.08] tracking-tight mb-4 sm:mb-6">
              <LiveLine className="text-[#B91C1C]" variant="light">
                Global reach.
              </LiveLine>
              <br />
              <LiveLine className="text-white" variant="light">
                Local trust.
              </LiveLine>
              <br />
              <LiveLine className="text-white/95" variant="light">
                Instant exchange.
              </LiveLine>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}>
              <LiveBlock className="text-base sm:text-lg md:text-xl text-white/65 font-light leading-relaxed mb-6 sm:mb-10 max-w-lg" variant="light" inline={false}>
                Kenya's trusted CBK-licensed forex bureau and remittance partner since 2008. Competitive rates, instant M-Pesa transfers, and 7 branches across Nairobi.
              </LiveBlock>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
              className="flex flex-col min-[480px]:flex-row gap-3 sm:gap-4">
              <Link
                to="/lock-rate"
                className="btn-glow inline-flex justify-center items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-medium text-white text-sm sm:text-base">
                Lock-In My Rate
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/branches"
                className="inline-flex justify-center items-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-[#7A1220] border border-white font-medium hover:bg-white/90 transition-all duration-300 text-sm sm:text-base">
                Find a Branch
              </Link>
            </motion.div>
          </div>

          {/* Right — calculator */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
            className="order-2 w-full">
            <HeroCalculator />
          </motion.div>
        </div>

        {/* Mobile-friendly bottom info — inline instead of overlapping strip */}
        <div className="mt-8 sm:mt-10 lg:mt-0 lg:hidden pt-6 border-t border-white/10">
          <div className="flex items-center gap-4 text-white/90">
            <span className="text-xl font-light tracking-tight">KSh</span>
            <span className="block w-px h-6 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50">
                Kenyan Shilling
              </span>
              <span className="text-xs font-light text-white/70">Trading globally · 50+ corridors</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip — desktop only */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/[0.08] backdrop-blur-md bg-gradient-to-t from-[#0E0E0E]/95 to-[#0E0E0E]/50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white/90">
            <span className="text-2xl md:text-3xl font-light tracking-tight">KSh</span>
            <span className="block w-px h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50">
                Kenyan Shilling
              </span>
              <span className="text-sm font-light text-white/70">Trading globally · 50+ corridors</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-white/45 text-xs font-medium tracking-[0.2em] uppercase">
            <span>USD · EUR · GBP · AED · ZAR · INR</span>
          </div>
        </div>
      </div>
    </section>
  );
}
