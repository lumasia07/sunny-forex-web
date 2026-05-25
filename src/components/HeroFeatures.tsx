import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, TrendingUp, Users } from 'lucide-react';


/** Prodmast bento: tall flanks · burgundy + lime stack · center stats · tall dark right */
export function HeroFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <section ref={sectionRef} className="bg-white pt-24 md:pt-36 pb-20 md:pb-28 overflow-hidden">

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
        style={{ y: sectionY, opacity: sectionOpacity }}>
        <div className="grid grid-cols-2 lg:grid-cols-5 lg:grid-rows-2 gap-3 sm:gap-4 md:gap-5">
          {/* 1 — tall left image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 lg:row-span-2 rounded-2xl md:rounded-[1.75rem] overflow-hidden group min-h-[200px] sm:min-h-[280px] lg:min-h-0">
            <img
              src="/pexels-jakubzerdzicki-30572289.jpg"
              alt="Forex trading and currency exchange"
              className="w-full h-full min-h-[200px] sm:min-h-[280px] lg:min-h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* 2a — burgundy (row 1, col 2) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(122, 18, 32, 0.25)' }}
            className="col-span-1 lg:col-start-2 lg:row-start-1 rounded-2xl md:rounded-[1.75rem] bg-[#7A1220] p-5 sm:p-6 flex flex-col justify-between min-h-[140px] lg:min-h-[200px] transition-shadow">
            <Users className="w-7 h-7 text-white/35" strokeWidth={1.5} />
            <div>
              <p className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">100+</p>
              <p className="text-sm font-medium text-white/85 mt-2 leading-snug">
                Clients & payout partners
              </p>
            </div>
          </motion.div>

          {/* 3 — center stats (cols 3–4, both rows) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="col-span-2 lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-1 rounded-2xl md:rounded-[1.75rem] bg-white border border-gray-200 shadow-[0_12px_48px_rgba(0,0,0,0.07)] p-5 sm:p-7 md:p-8 flex flex-col justify-between min-h-[260px] lg:min-h-[420px] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-[#7A1220]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#7A1220]" strokeWidth={2} />
              </div>
              <svg viewBox="0 0 120 48" className="w-28 sm:w-32 h-12 sm:h-14 shrink-0" aria-hidden="true">
                <defs>
                  <linearGradient id="hero-chart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#006B3F" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#006B3F" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 40 L20 32 L40 36 L60 22 L80 18 L100 8 L120 4 L120 48 L0 48 Z" fill="url(#hero-chart)" />
                <path
                  d="M0 40 L20 32 L40 36 L60 22 L80 18 L100 8 L120 4"
                  fill="none"
                  stroke="#006B3F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Monthly volume</p>
              <p className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#0E0E0E] tracking-tight leading-none">
                2.4M+
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium">KES equivalent processed</p>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#006B3F]/10 w-fit mb-4">
              <img src="/mpesa-card-bg.png" alt="" className="w-8 h-8 rounded-lg object-cover" aria-hidden />
              <span className="text-xs font-bold text-[#006B3F]">M-Pesa · Instant wallet payouts</span>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-gray-100">
              <div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#7A1220]">17+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Years</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#006B3F]">7</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Branches</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#D4A24C]">+12%</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mt-1">Growth</p>
              </div>
            </div>
          </motion.div>

          {/* 2b — lime accent under burgundy (row 2, col 2) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0, 107, 63, 0.15)' }}
            className="col-span-1 lg:col-start-2 lg:row-start-2 rounded-2xl md:rounded-[1.75rem] bg-[#E8F8D4] p-5 sm:p-6 flex flex-col justify-end min-h-[130px] lg:min-h-[200px] transition-shadow">
            <p className="font-display text-3xl sm:text-4xl font-bold text-[#0E0E0E] tracking-tight">6+</p>
            <p className="text-sm font-semibold text-[#0E0E0E]/75 mt-2 leading-snug">
              Payout networks integrated
            </p>
          </motion.div>

          {/* M-Pesa — mobile row */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 lg:hidden rounded-2xl overflow-hidden relative min-h-[130px]">
            <img src="/mpesa-card-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-br from-[#006B3F]/95 to-[#006B3F]/65" />
            <div className="relative z-10 p-5 h-full flex flex-col justify-end">
              <p className="font-display text-xl font-bold text-white">M-Pesa</p>
              <p className="text-xs text-white/85 font-semibold mt-1">Instant payouts</p>
            </div>
          </motion.div>

          {/* 5 — tall dark right (col 5, both rows) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="col-span-2 lg:col-span-1 lg:col-start-5 lg:row-span-2 lg:row-start-1 relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group min-h-[200px] lg:min-h-0 transition-shadow hover:shadow-[0_24px_64px_rgba(0,0,0,0.2)]">
            <img
              src="/pexels-kelvin-kibe-3073372-26898331.jpg"
              alt="Professional forex services"
              className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-55 transition-all duration-700 group-hover:scale-105 min-h-[200px] lg:min-h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/75 to-[#7A1220]/45" />
            <div className="relative z-10 h-full p-5 sm:p-7 flex flex-col justify-between min-h-[200px] lg:min-h-[420px]">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <Gauge className="w-5 h-5 text-[#D4A24C]" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-white leading-tight tracking-tight">
                  Optimal rates. Zero hidden fees.
                </p>
                <p className="text-sm text-white/70 mt-2">CBK-regulated transparency.</p>
                <Link
                  to="/forex"
                  className="inline-flex justify-between items-center gap-3 pl-5 pr-1.5 py-1.5 mt-5 rounded-full bg-[#E8F8D4] text-[#0E0E0E] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all group/link">
                  <span>Explore forex</span>
                  <span className="w-7 h-7 rounded-full bg-[#006B3F]/15 flex items-center justify-center group-hover/link:bg-[#006B3F]/25 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-[#006B3F] group-hover/link:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Mobile: branch photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 lg:hidden rounded-2xl overflow-hidden min-h-[150px]">
            <img
              src="/pexels-sergey-pesterev-69811391-8427984.jpg"
              alt="Sunny Forex branch"
              className="w-full h-full object-cover min-h-[150px]"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
