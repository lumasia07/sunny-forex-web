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
    <section className="relative flex w-full flex-col justify-between overflow-hidden bg-[#0A0A0A] pt-36 pb-32 lg:pt-48 lg:pb-40 border-b border-gray-900">
      
      {/* Background Graphic cover */}
      <div className="absolute inset-x-0 bottom-0 top-16 z-0 pointer-events-none select-none">
        <img
          src="/sunny-bg-red.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        />
        {/* Subtle overlay to ensure dark mode contrast against white parts */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 max-w-[46rem] font-display text-[2.25rem] leading-[1.05] tracking-[-0.04em] text-white sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.25rem] font-bold"
          >
            Borderless liquidity, <br className="hidden sm:inline" />
            built on absolute{' '}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#D4A24C]">
              trust.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-10 max-w-[34rem] text-sm sm:text-base leading-relaxed text-white/80 font-light"
          >
            Cross-border remittance and forex bureau services, shaped for people and businesses that want speed, clarity, and dependable support.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Link
              to="/#rates-calculator"
              onClick={handleSendMoneyClick}
              className="inline-flex items-center gap-3.5 rounded-full bg-[#7A1220] px-7 py-3.5 font-figtree text-sm font-bold tracking-wider text-white shadow-lg hover:bg-[#5C0D18] hover:shadow-[#7A1220]/20 hover:-translate-y-0.5 transition-all duration-300 group uppercase"
            >
              GET STARTED
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A1220] group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight size={13} strokeWidth={2.5} />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
