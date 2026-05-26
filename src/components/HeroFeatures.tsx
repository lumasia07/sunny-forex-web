import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Gauge, Globe, TrendingUp, Users } from 'lucide-react';

export function HeroFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <section ref={sectionRef} className="bg-white pt-12 md:pt-16 pb-20 md:pb-28 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
        style={{ y: sectionY, opacity: sectionOpacity }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 items-start">
          
          {/* Column 1 — Tall Left Globe Card (Tallest: 500px) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="col-span-1 lg:row-span-2 rounded-2xl md:rounded-[1.75rem] relative overflow-hidden group min-h-[300px] lg:h-[500px] bg-gradient-to-b from-[#181818] via-[#121212] to-[#080808] border border-white/5 shadow-xl p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7A1220]/15 via-transparent to-transparent opacity-75 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm relative z-10">
              <Globe className="w-5 h-5 text-[#D4A24C] animate-[spin_25s_linear_infinite]" strokeWidth={1.75} />
            </div>

            <div className="relative z-10 mt-auto">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#D4A24C] mb-2 block">
                Global Connectivity
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight mb-3">
                Borderless Reach
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Connect seamlessly with global financial networks. Send money, receive payouts, and trade major currencies instantly from Kenya to the world.
              </p>
            </div>
          </motion.div>

          {/* Column 2 — Stack of Burgundy + Black Button + Lime card (Intermediate: 450px) */}
          <div className="col-span-1 lg:row-span-2 flex flex-col justify-between gap-4 h-full min-h-[300px] lg:h-[450px]">
            
            {/* 2a — Burgundy card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: '0 20px 48px rgba(122, 18, 32, 0.2)' }}
              className="rounded-2xl md:rounded-[1.75rem] bg-[#7A1220] p-6 flex flex-col justify-between flex-1 lg:h-[185px] transition-all"
            >
              <Users className="w-6 h-6 text-white/35" strokeWidth={1.5} />
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">100+</p>
                <p className="text-xs font-medium text-white/85 mt-1 leading-snug">
                  Clients & payout partners
                </p>
              </div>
            </motion.div>

            {/* In-between black button with CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="w-full"
            >
              <Link
                to="/lock-rate"
                className="w-full bg-[#0E0E0E] hover:bg-[#1a1a1a] text-white font-medium pl-6 pr-2 py-2 rounded-full shadow-lg transition-all duration-300 group text-[10px] uppercase tracking-wider flex items-center justify-between select-none"
              >
                <span className="font-bold tracking-widest px-2">Get Started</span>
                <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-md">
                  <ArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>

            {/* 2b — Lime accent card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: '0 20px 48px rgba(0, 107, 63, 0.08)' }}
              className="rounded-2xl md:rounded-[1.75rem] bg-[#E8F8D4] p-6 flex flex-col justify-end flex-1 lg:h-[185px] transition-all"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#0E0E0E] tracking-tight">6+</p>
              <p className="text-xs font-semibold text-[#0E0E0E]/75 mt-1 leading-snug">
                Payout networks integrated
              </p>
            </motion.div>
          </div>

          {/* Column 3 & 4 — Double-width Center Stats Card (Shortest: 410px) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-3 lg:row-span-2 lg:row-start-1 rounded-2xl md:rounded-[1.75rem] bg-white border border-gray-200 shadow-[0_12px_48px_rgba(0,0,0,0.06)] p-6 sm:p-8 flex flex-col justify-between min-h-[380px] lg:h-[410px] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-[#7A1220]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#7A1220]" strokeWidth={2} />
              </div>
              <svg viewBox="0 0 120 48" className="w-28 sm:w-32 h-12 shrink-0" aria-hidden="true">
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
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Monthly volume</p>
              <p className="font-display text-4xl sm:text-5xl font-bold text-[#0E0E0E] tracking-tight leading-none">
                2.4M+
              </p>
              <p className="text-xs text-gray-500 mt-2 font-medium">KES equivalent processed</p>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#006B3F]/10 w-fit mb-2">
              <img src="/mpesa-card-bg.png" alt="" className="w-7 h-7 rounded-lg object-cover" aria-hidden />
              <span className="text-[10px] font-bold text-[#006B3F]">M-Pesa · Instant wallet payouts</span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div>
                <p className="font-display text-lg sm:text-xl font-bold text-[#7A1220]">17+</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Years</p>
              </div>
              <div>
                <p className="font-display text-lg sm:text-xl font-bold text-[#006B3F]">7</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Branches</p>
              </div>
              <div>
                <p className="font-display text-lg sm:text-xl font-bold text-[#D4A24C]">+12%</p>
                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider mt-0.5">Growth</p>
              </div>
            </div>
          </motion.div>

          {/* Column 5 — Tall Right Landscape Card (Tallest: 500px) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="col-span-1 relative rounded-2xl md:rounded-[1.75rem] overflow-hidden group min-h-[350px] lg:h-[500px] transition-all hover:shadow-[0_24px_64px_rgba(0,0,0,0.25)] bg-black"
          >
            <img
              src="/pexels-sergey-pesterev-69811391-8427984.jpg"
              alt="Kenya landscape and professional forex"
              className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-55 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/75 to-[#7A1220]/45 z-0" />
            
            <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between items-start">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <Gauge className="w-5 h-5 text-[#D4A24C]" strokeWidth={1.75} />
              </div>
              
              <div className="mt-auto">
                <p className="text-lg font-bold text-white leading-tight tracking-tight">
                  Optimal rates. Zero hidden fees.
                </p>
                <p className="text-xs text-white/70 mt-2 font-light">CBK-regulated transparency.</p>
                
                <Link
                  to="/forex"
                  className="inline-flex justify-between items-center gap-3 pl-5 pr-1.5 py-1.5 mt-5 rounded-full bg-[#E8F8D4] text-[#0E0E0E] font-bold text-[10px] uppercase tracking-wider hover:bg-white transition-all group/link"
                >
                  <span className="font-semibold">Explore forex</span>
                  <span className="w-7 h-7 rounded-full bg-[#006B3F]/15 flex items-center justify-center group-hover/link:bg-[#006B3F]/25 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-[#006B3F] group-hover/link:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
