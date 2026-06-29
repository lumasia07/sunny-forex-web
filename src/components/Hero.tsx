import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin } from 'lucide-react';
import { fetchFromApi } from '../lib/api';

function HeroRateModel() {
  const [rates, setRates] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const corridors = [
    { country: 'United States', currency: 'USD', flag: 'us', amount: '1', city: 'New York', label: 'USD to Kenya', prefix: '$' },
    { country: 'Canada', currency: 'CAD', flag: 'ca', amount: '1', city: 'Toronto', label: 'CAD to Kenya', prefix: '$' },
    { country: 'United Kingdom', currency: 'GBP', flag: 'gb', amount: '1', city: 'London', label: 'GBP to Kenya', prefix: '£' },
    { country: 'Germany', currency: 'EUR', flag: 'eu', amount: '1', city: 'Frankfurt', label: 'EUR to Kenya', prefix: '€' },
    { country: 'United Arab Emirates', currency: 'AED', flag: 'ae', amount: '1', city: 'Dubai', label: 'AED to Kenya', prefix: 'AED ' },
    { country: 'India', currency: 'INR', flag: 'in', amount: '1', city: 'Mumbai', label: 'INR to Kenya', prefix: '₹' }
  ];

  useEffect(() => {
    fetchFromApi<any[]>('rates')
      .then(data => {
        if (data && data.length > 0) {
          setRates(data);
        }
      })
      .catch(err => console.warn('HeroRateModel API offline:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % corridors.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const corridor = corridors[activeIndex];
  
  // Find live rate from API if loaded, else fallback to hardcoded defaults
  const liveRateObj = rates.find(r => r.currency_code === corridor.currency);
  const liveRateVal = liveRateObj ? parseFloat(liveRateObj.sell_rate) : (
    corridor.currency === 'USD' ? 130.50 :
    corridor.currency === 'CAD' ? 96.10 :
    corridor.currency === 'GBP' ? 168.20 :
    corridor.currency === 'EUR' ? 143.50 :
    corridor.currency === 'AED' ? 36.10 : 1.62
  );
  
  // Clean KES conversion (1 worth of foreign currency to KES equivalent)
  const convertedKSh = liveRateVal.toFixed(2);

  return (
    <div className="w-full max-w-[420px] flex flex-col items-center select-none font-figtree overflow-visible">
      {/* Top Header Label */}
      <div className="flex items-center gap-2 text-white/90 text-sm mb-4 font-normal min-h-[24px]">
        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
        <AnimatePresence mode="wait">
          <motion.span
            key={corridor.currency}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            Send 1 {corridor.currency} {corridor.country} to Kenya
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Main card box */}
      <div className="w-full bg-[#121212] border border-white/5 rounded-3xl p-6 flex flex-col items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={corridor.currency}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center overflow-visible"
          >
            {/* City and Flag */}
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={`https://flagcdn.com/w40/${corridor.flag}.png`} 
                className="h-4 w-6 rounded object-cover shadow border border-white/10" 
                alt="" 
              />
              <span className="text-white font-medium text-base">{corridor.city}</span>
            </div>

            {/* Operational Pill */}
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span className="text-white/80 text-xs font-medium">Operational</span>
            </div>

            {/* Big Amount Card */}
            <div className="w-full relative bg-[#1E1E1E] border border-white/5 rounded-2xl p-6 pb-7 flex flex-col items-center justify-center overflow-visible">
              <span className="text-white text-3xl sm:text-4xl font-bold font-display tracking-tight">
                KSh {convertedKSh}
              </span>
              <span className="absolute bottom-2.5 right-4 text-[10px] text-white/40 uppercase tracking-widest font-semibold font-figtree">
                KES
              </span>

              {/* Dynamic bottom glowing underline line - ambient projection glow */}
              <div className="absolute -bottom-3 inset-x-4 h-8 bg-gradient-to-r from-[#7A1220] via-[#C46C5B] to-[#7A1220]/75 opacity-70 blur-xl rounded-full pointer-events-none"></div>
              
              {/* Sharp Neon Line */}
              <div 
                className="absolute bottom-0 inset-x-0 h-[4px] bg-gradient-to-r from-[#7A1220] via-[#C46C5B] to-[#7A1220] rounded-b-2xl"
                style={{
                  boxShadow: '0 -2px 10px rgba(196,108,91,0.6), 0 0 20px #7A1220, 0 0 35px #7A1220, 0 0 50px rgba(122,18,32,0.5)'
                }}
              ></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Hero() {
  const handleSendMoneyClick = (e: React.MouseEvent) => {
    const element = document.getElementById('rates-calculator');
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  return (
    <section className="hero-viewport relative flex w-full flex-col justify-between overflow-hidden bg-[#080708] pb-24 lg:pb-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#16080B] to-transparent" />
        <div className="absolute -left-28 top-28 h-80 w-80 rounded-full bg-[#7A1220]/20 blur-[120px]" />
        <div className="absolute right-[-6rem] top-20 h-72 w-72 rounded-full bg-[#5A151B]/[0.18] blur-[120px]" />
        <div className="absolute bottom-[-7rem] left-[24%] h-72 w-72 rounded-full bg-[#A46A35]/[0.12] blur-[140px]" />

        <svg
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 1440 980"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Glow Filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="shapeOne" x1="260" y1="290" x2="550" y2="580" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4E1218" />
              <stop offset="0.52" stopColor="#8A1625" />
              <stop offset="1" stopColor="#341015" />
            </linearGradient>
            <linearGradient id="shapeTwo" x1="760" y1="115" x2="996" y2="351" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5F151D" />
              <stop offset="0.5" stopColor="#A31C2D" />
              <stop offset="1" stopColor="#3B1016" />
            </linearGradient>
            <linearGradient id="shapeThree" x1="1025" y1="650" x2="1275" y2="900" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4B1117" />
              <stop offset="0.58" stopColor="#8E5C31" />
              <stop offset="1" stopColor="#331015" />
            </linearGradient>
            <linearGradient id="connectorOne" x1="370" y1="400" x2="970" y2="327" gradientUnits="userSpaceOnUse">
              <stop stopColor="#401015" />
              <stop offset="0.46" stopColor="#7A1220" />
              <stop offset="1" stopColor="#481017" />
            </linearGradient>
            <linearGradient id="connectorTwo" x1="482" y1="777" x2="1108" y2="710" gradientUnits="userSpaceOnUse">
              <stop stopColor="#381014" />
              <stop offset="0.52" stopColor="#7A1220" />
              <stop offset="1" stopColor="#7D532D" />
            </linearGradient>
            <linearGradient id="connectorThree" x1="1174" y1="261" x2="1368" y2="445" gradientUnits="userSpaceOnUse">
              <stop stopColor="#411115" />
              <stop offset="1" stopColor="#7A1220" />
            </linearGradient>
          </defs>

          {/* Glowing Geometry Layers */}
          <rect x="260" y="290" width="290" height="290" rx="42" transform="rotate(45 260 290)" stroke="url(#shapeOne)" strokeWidth="1.3" filter="url(#glow)" />
          <rect x="760" y="115" width="236" height="236" rx="34" transform="rotate(45 760 115)" stroke="url(#shapeTwo)" strokeWidth="1.1" filter="url(#glow)" />
          <rect x="1025" y="650" width="250" height="250" rx="38" transform="rotate(45 1025 650)" stroke="url(#shapeThree)" strokeWidth="1.15" filter="url(#glow)" />
          
          {/* New Constellation Glowing Shapes */}
          <rect x="80" y="550" width="160" height="160" rx="28" transform="rotate(25 80 550)" stroke="url(#shapeOne)" strokeWidth="1.1" filter="url(#glow)" />
          <rect x="1220" y="80" width="150" height="150" rx="24" transform="rotate(65 1220 80)" stroke="url(#shapeTwo)" strokeWidth="1.0" filter="url(#glow)" />
          <rect x="1150" y="450" width="120" height="120" rx="20" transform="rotate(15 1150 450)" stroke="url(#shapeThree)" strokeWidth="1.0" filter="url(#glow)" />

          <path
            d="M370 400C432 338 507 335 570 398L634 462C697 525 771 526 834 463L970 327"
            stroke="url(#connectorOne)"
            strokeWidth="1.15"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <path
            d="M482 777C550 715 629 714 694 777L760 842C820 901 891 904 953 848L1108 710"
            stroke="url(#connectorTwo)"
            strokeWidth="1.05"
            strokeLinecap="round"
            filter="url(#glow)"
          />
          <path
            d="M1174 261C1236 319 1297 379 1368 445"
            stroke="url(#connectorThree)"
            strokeWidth="1.05"
            strokeLinecap="round"
            filter="url(#glow)"
          />
        </svg>
      </div>

      <div className="hero-viewport-inner relative z-10 mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 md:px-12">
        <div className="grid items-center gap-8 pb-16 pt-16 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-24">
          
          <div className="relative z-10 order-1 text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 max-w-[34rem] font-figtree text-[1.95rem] leading-[1.03] tracking-[-0.05em] text-white sm:text-[2.25rem] lg:text-[2.65rem] xl:text-[2.9rem]"
            >
              <span className="font-light text-white">Global reach for</span>
              <br />
              <span className="font-medium text-white">trusted money</span>
              <br />
              <span className="block pb-1 font-medium text-white">
                movement.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-8 max-w-[31rem] text-[14px] font-light leading-7 tracking-[0.01em] text-white/[0.72] sm:text-[15px]"
            >
              Cross-border remittance and forex, shaped for people and businesses that want speed, clarity, and dependable support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex flex-wrap items-center gap-5 sm:gap-7"
            >
              <Link
                to="/#rates-calculator"
                onClick={handleSendMoneyClick}
                className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 font-figtree text-[13px] font-semibold tracking-[0.01em] text-[#111111] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(0,0,0,0.22)]"
              >
                Start your transfer
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white">
                  <ArrowRight size={15} />
                </span>
              </Link>

              <Link
                to="/branches"
                className="group inline-flex items-center gap-3 rounded-full border border-white/[0.24] bg-white/[0.05] px-4 py-2.5 text-white/[0.9] transition-all hover:border-white/[0.34] hover:bg-white/[0.08] hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/90">
                  <MapPin size={15} />
                </span>
                <span className="font-figtree text-[12px] font-semibold uppercase tracking-[0.12em] text-white/90">
                  Find a Branch
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-xs text-white/50"
            >
              <div className="flex gap-0.5 text-[#D4A24C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span>
                <span className="font-semibold text-white/80">CBK Licensed</span> | Since 2008
              </span>
            </motion.div>
          </div>

          <div className="order-2 flex w-full shrink-0 flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex items-center justify-center"
            >
              <HeroRateModel />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
