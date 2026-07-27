import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SHOWCASE_ITEMS = [
  {
    id: 0,
    img: '/hand-1-sunny.png',
    alt: 'SunnyRemit Mobile Experience',
    label: 'Mobile Transfers'
  },
  {
    id: 1,
    img: '/hand-2-sunny.png',
    alt: 'SunnyRemit App Payouts',
    label: 'Instant Payouts'
  },
  {
    id: 2,
    img: '/hand-3-sunny.png',
    alt: 'SunnyRemit Currency Exchange',
    label: 'Live FX Exchange'
  }
];

// 16 Global Currencies with FlagCDN URLs spaced evenly (22.5° apart)
const CIRCULAR_ORBIT_FLAGS = [
  { id: 'us', flagUrl: 'https://flagcdn.com/w80/us.png', name: 'USA', angle: 0 },
  { id: 'eu', flagUrl: 'https://flagcdn.com/w80/eu.png', name: 'Europe', angle: 22.5 },
  { id: 'gb', flagUrl: 'https://flagcdn.com/w80/gb.png', name: 'UK', angle: 45 },
  { id: 'ae', flagUrl: 'https://flagcdn.com/w80/ae.png', name: 'UAE', angle: 67.5 },
  { id: 'ke', flagUrl: 'https://flagcdn.com/w80/ke.png', name: 'Kenya', angle: 90 },
  { id: 'ca', flagUrl: 'https://flagcdn.com/w80/ca.png', name: 'Canada', angle: 112.5 },
  { id: 'au', flagUrl: 'https://flagcdn.com/w80/au.png', name: 'Australia', angle: 135 },
  { id: 'za', flagUrl: 'https://flagcdn.com/w80/za.png', name: 'South Africa', angle: 157.5 },
  { id: 'in', flagUrl: 'https://flagcdn.com/w80/in.png', name: 'India', angle: 180 },
  { id: 'jp', flagUrl: 'https://flagcdn.com/w80/jp.png', name: 'Japan', angle: 202.5 },
  { id: 'ch', flagUrl: 'https://flagcdn.com/w80/ch.png', name: 'Switzerland', angle: 225 },
  { id: 'cn', flagUrl: 'https://flagcdn.com/w80/cn.png', name: 'China', angle: 247.5 },
  { id: 'sg', flagUrl: 'https://flagcdn.com/w80/sg.png', name: 'Singapore', angle: 270 },
  { id: 'sa', flagUrl: 'https://flagcdn.com/w80/sa.png', name: 'Saudi Arabia', angle: 292.5 },
  { id: 'qa', flagUrl: 'https://flagcdn.com/w80/qa.png', name: 'Qatar', angle: 315 },
  { id: 'tz', flagUrl: 'https://flagcdn.com/w80/tz.png', name: 'Tanzania', angle: 337.5 },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Merry-go-round rotation loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSendMoneyClick = (e: React.MouseEvent) => {
    const element = document.getElementById('rates-calculator');
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  // Calculate position styles for showcase picture circles
  const getPositionStyles = (index: number) => {
    const diff = (index - activeIndex + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length;

    if (diff === 0) {
      // Center Spotlight: Expanded picture
      return {
        x: 0,
        y: -12,
        scale: 1.18,
        zIndex: 30,
        opacity: 1,
        filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.5))'
      };
    } else if (diff === 1) {
      // Right Position: Retracted, side orbit
      return {
        x: 105,
        y: 24,
        scale: 0.78,
        zIndex: 10,
        opacity: 0.82,
        filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))'
      };
    } else {
      // Left Position: Retracted, side orbit
      return {
        x: -105,
        y: 24,
        scale: 0.78,
        zIndex: 10,
        opacity: 0.82,
        filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))'
      };
    }
  };

  return (
    <section className="relative flex w-full flex-col justify-between overflow-hidden bg-[#FAF9F5] pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-gray-100">

      {/* Soft Ambient Glows */}
      <div className="absolute top-[20%] right-[5%] w-[350px] lg:w-[480px] h-[350px] lg:h-[480px] rounded-full bg-[#7A1220]/10 blur-[90px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[15%] w-[250px] h-[250px] rounded-full bg-[#D4A24C]/10 blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">

          {/* Left Column: Heading, Description, CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 font-display text-[2.5rem] leading-[1.05] tracking-[-0.04em] text-[#0E0E0E] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.25rem] font-bold"
            >
              Borderless liquidity, <br className="hidden sm:inline" />
              built on absolute{' '}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7A1220] to-[#D4A24C]">
                trust.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-10 max-w-[34rem] text-base leading-relaxed text-[#0E0E0E]/75 font-light"
            >
              Cross-border remittance and forex bureau services, shaped for people and businesses that want speed, clarity, and dependable support.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center justify-start"
            >
              <Link
                to="/#rates-calculator"
                onClick={handleSendMoneyClick}
                className="inline-flex items-center gap-3 rounded-full bg-[#7A1220] px-7 py-3.5 font-figtree text-sm font-semibold text-white shadow-lg hover:bg-[#5C0D18] hover:shadow-[#7A1220]/20 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Get Started
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A1220] group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight size={13} strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Red Background Shape with Outer Left-Half Orbit Container Pushed Further Out */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative z-10 min-h-[460px] lg:min-h-[520px]">

            <div 
              className="relative w-[380px] sm:w-[480px] lg:w-[520px] h-[380px] sm:h-[480px] lg:h-[520px] flex items-center justify-center select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Borderless Red Background Shape */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8A1625] via-[#7A1220] to-[#4A0A12] shadow-2xl z-0 pointer-events-none" />

              {/* Clean Left-Side Orbit Viewport Container Pushed Further Out from Red Div */}
              <div className="absolute -top-[115px] -bottom-[115px] -left-[115px] right-[40%] overflow-hidden pointer-events-none z-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 30,
                    ease: 'linear',
                  }}
                  className="w-[380px] sm:w-[480px] lg:w-[520px] h-[380px] sm:h-[480px] lg:h-[520px] absolute top-[115px] left-[115px] rounded-full"
                >
                  {CIRCULAR_ORBIT_FLAGS.map((item) => {
                    const rad = (item.angle * Math.PI) / 180;
                    // Distance radius expanded to 62% so flags orbit further outside the red shape
                    const r = 62; 
                    const leftPct = 50 + Math.cos(rad) * r;
                    const topPct = 50 + Math.sin(rad) * r;

                    return (
                      <div
                        key={item.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                        style={{
                          left: `${leftPct}%`,
                          top: `${topPct}%`,
                        }}
                      >
                        {/* Counter-rotate 3D Flag sphere so it stays upright as it orbits */}
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 30,
                            ease: 'linear',
                          }}
                          className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full shadow-[0_12px_26px_rgba(0,0,0,0.35)] overflow-hidden group cursor-pointer hover:scale-115 transition-transform"
                        >
                          {/* FlagCDN Image */}
                          <img
                            src={item.flagUrl}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                          />
                          {/* 3D Glossy Light Lens Overlay */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/45 via-transparent to-black/30 pointer-events-none" />
                          {/* Top Specular Highlight */}
                          <div className="absolute top-1 left-2.5 w-5 h-2 rounded-full bg-white/50 blur-[0.4px] pointer-events-none" />
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Showcase Picture Circles */}
              {SHOWCASE_ITEMS.map((index_item, index) => {
                const pos = getPositionStyles(index);
                const isCenter = (index - activeIndex + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length === 0;

                return (
                  <motion.div
                    key={index_item.id}
                    animate={{
                      x: pos.x,
                      y: pos.y,
                      scale: pos.scale,
                      zIndex: pos.zIndex,
                      opacity: pos.opacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 24,
                    }}
                    onClick={() => setActiveIndex(index)}
                    title={`Click to view ${index_item.label}`}
                    className={`absolute w-[200px] sm:w-[250px] lg:w-[270px] aspect-square rounded-full overflow-hidden cursor-pointer transition-all duration-300 ${
                      isCenter 
                        ? 'border-[4px] border-white ring-4 ring-[#7A1220]/40' 
                        : 'border-[3px] border-white/90 hover:opacity-100 hover:border-white'
                    }`}
                    style={{ filter: pos.filter }}
                  >
                    <img
                      src={index_item.img}
                      alt={index_item.alt}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                );
              })}

              {/* Carousel Indicator Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-slate-950/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                {SHOWCASE_ITEMS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Show showcase picture ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? 'w-6 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
