import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

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
    <section className="relative flex w-full flex-col justify-between overflow-hidden bg-[#FAF9F5] pt-24 pb-16 lg:pt-28 lg:pb-20 border-b border-gray-100">

      {/* Soft Maroon Ambient Glow Shape behind the phone */}
      <div className="absolute top-[20%] right-[-5%] lg:right-[5%] w-[350px] lg:w-[500px] h-[350px] lg:h-[500px] rounded-full bg-[#7A1220]/10 blur-[80px] lg:blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] rounded-full bg-[#D4A24C]/10 blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

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
                className="inline-flex items-center gap-3.5 rounded-full bg-[#7A1220] px-7 py-3.5 font-figtree text-sm font-bold tracking-wider text-white shadow-lg hover:bg-[#5C0D18] hover:shadow-[#7A1220]/20 hover:-translate-y-0.5 transition-all duration-300 group uppercase"
              >
                Get Started
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A1220] group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight size={13} strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Beautiful Overlapping Circles over the Circle Shape */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end overflow-visible relative z-10 min-h-[420px] lg:min-h-[480px]">
            {/* Reverted Red Container Shape: Massive circle shifted right, looking like a half-circle */}
            <div className="absolute top-[50%] left-[70%] sm:left-[74%] -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-br from-[#8A1625] via-[#7A1220] to-[#4A0A12] shadow-2xl z-0 pointer-events-none" />

            {/* Overlapping Circles Container */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[460px] sm:max-w-[540px] h-[380px] select-none"
            >
              {/* Circle 1: Left */}
              <div className="absolute left-[2%] top-[15%] w-[145px] sm:w-[185px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
                <img
                  src="/hand-1-sunny.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Circle 2: Middle (Top, overlapping left and right) */}
              <div className="absolute left-[29%] top-[-8%] w-[180px] sm:w-[230px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-[0_25px_50px_rgba(0,0,0,0.3)] z-20">
                <img
                  src="/hand-2-sunny.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Circle 3: Right (overlapping middle slightly) */}
              <div className="absolute right-[2%] top-[30%] w-[145px] sm:w-[185px] aspect-square rounded-full overflow-hidden border-4 border-white shadow-2xl z-10">
                <img
                  src="/hand-3-sunny.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
