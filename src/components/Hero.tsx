import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Play, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

const deviceImages = [
  { path: '/devices-1-tr.png', label: 'All-In-One Platform' },
  { path: '/laptop-1-tr.png', label: 'Sleek Laptop Dashboard' },
  { path: '/laptop-2-tr.png', label: 'Real-Time Rate Locking' },
  { path: '/phone-1-tr.png', label: 'Fast Mobile Remittance' },
  { path: '/phone-2-tr.png', label: 'Seamless Cash Transfers' },
  { path: '/phone-3-tr.png', label: 'Interbank Live Tracking' }
];

const AUTO_PLAY_INTERVAL = 4500;

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleSendMoneyClick = (e: React.MouseEvent) => {
    const element = document.getElementById('rates-calculator');
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % deviceImages.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="hero-viewport relative flex w-full flex-col justify-between overflow-hidden bg-[#080708]">
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
          <rect x="260" y="290" width="290" height="290" rx="42" transform="rotate(45 260 290)" stroke="url(#shapeOne)" strokeWidth="1.3" />
          <rect x="760" y="115" width="236" height="236" rx="34" transform="rotate(45 760 115)" stroke="url(#shapeTwo)" strokeWidth="1.1" />
          <rect x="1025" y="650" width="250" height="250" rx="38" transform="rotate(45 1025 650)" stroke="url(#shapeThree)" strokeWidth="1.15" />
          <path
            d="M370 400C432 338 507 335 570 398L634 462C697 525 771 526 834 463L970 327"
            stroke="url(#connectorOne)"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M482 777C550 715 629 714 694 777L760 842C820 901 891 904 953 848L1108 710"
            stroke="url(#connectorTwo)"
            strokeWidth="1.05"
            strokeLinecap="round"
          />
          <path
            d="M1174 261C1236 319 1297 379 1368 445"
            stroke="url(#connectorThree)"
            strokeWidth="1.05"
            strokeLinecap="round"
          />
          <defs>
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
              <stop stopColor="#52131A" />
              <stop offset="0.52" stopColor="#7A1220" />
              <stop offset="1" stopColor="#3A1015" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="hero-viewport-inner relative z-10 mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 md:px-12">
        <div className="grid items-center gap-8 pb-8 pt-4 lg:grid-cols-2 lg:gap-14 lg:pb-12 lg:pt-6">
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
              transition={{ duration: 0.6, delay: 0.1 }}
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

          <div
            className="order-2 flex w-full shrink-0 flex-col items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative mx-auto flex aspect-[1.25/1] w-full max-w-[560px] items-center justify-center sm:max-w-[600px] lg:mx-0 lg:ml-auto">
              <div className="absolute z-0 h-[78%] w-[78%] rounded-full bg-gradient-to-tr from-[#7A1220]/28 via-transparent to-[#D4A24C]/10 blur-[50px]" />

              <div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.82, rotateY: -12, rotateZ: -2, y: 25 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0, rotateZ: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 1.08, rotateY: 12, rotateZ: 2, y: -25 }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 16,
                      mass: 0.8
                    }}
                    className="relative z-10 flex h-full w-full items-center justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <img
                      src={deviceImages[currentIndex].path}
                      alt={deviceImages[currentIndex].label}
                      className="h-full w-full select-none object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.5)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto w-full">
          <div className="my-8 h-px w-full bg-white/10 md:my-12" />

          <div className="flex flex-col items-start justify-between gap-6 pb-8 md:flex-row md:items-center md:gap-4 md:pb-12">
            <button className="group flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#C46C5B] transition-all group-hover:border-[#C46C5B]/40 group-hover:bg-white/[0.08]">
                <Play size={14} className="ml-0.5 fill-current" />
              </span>
              <span className="font-figtree text-[11px] font-semibold uppercase tracking-[0.15em] text-white/[0.55] transition-colors group-hover:text-white/[0.78]">
                Watch Demo
              </span>
            </button>

            <div className="flex flex-col items-start gap-6 text-left sm:flex-row sm:items-center sm:gap-10 md:border-l md:border-white/10 md:pl-10">
              <div className="space-y-1">
                <span className="block font-figtree text-[10px] font-bold uppercase tracking-[0.12em] text-[#C46C5B]">
                  01 / SECURE ESCROW
                </span>
                <p className="max-w-[220px] text-[11px] font-light leading-relaxed text-white/[0.45]">
                  CBK licensed remittance and currency exchange, delivered with steady compliance.
                </p>
              </div>
              <div className="space-y-1 sm:border-l sm:border-white/10 sm:pl-10">
                <span className="block font-figtree text-[10px] font-bold uppercase tracking-[0.12em] text-[#D4A24C]">
                  02 / INSTANT LOCK
                </span>
                <p className="max-w-[220px] text-[11px] font-light leading-relaxed text-white/[0.45]">
                  Real-time rate locking with fast collection and a calmer customer handoff.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:ml-auto">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/[0.35] transition-colors hover:border-[#C46C5B]/40 hover:text-[#C46C5B]"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/[0.35] transition-colors hover:border-[#C46C5B]/40 hover:text-[#C46C5B]"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/[0.35] transition-colors hover:border-[#C46C5B]/40 hover:text-[#C46C5B]"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/[0.35] transition-colors hover:border-[#C46C5B]/40 hover:text-[#C46C5B]"
              >
                <Twitter size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
