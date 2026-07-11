import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function DeviceShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSendMoneyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('rates-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative pt-12 md:pt-20 pb-12 sm:pb-16 bg-transparent overflow-visible px-4 sm:px-6 md:px-8 lg:px-12 z-20"
    >
      {/* Outer Maroon Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#7A1220] via-[#5C0D18] to-[#400810] border border-white/10 shadow-[0_30px_100px_rgba(122,18,32,0.15)] p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden relative z-20 mt-0"
      >
        {/* Inside Card Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none rounded-2xl sm:rounded-3xl" />

        {/* Ambient Glows inside the Card */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-white/5 blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#D4A24C]/10 blur-[100px] pointer-events-none z-0" />

        <div className="w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text content & CTA */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] text-white font-display tracking-tight">
              One integrated gateway. Infinite financial reach.
            </h2>
            
            <p className="text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Consolidate payouts, real-time currency conversions, and mobile transfers under a single unified protocol. We streamline the settlement rails, regulatory compliance, and interbank liquidity so your business can scale without borders.
            </p>

            <div className="pt-4">
              <a
                href="/#rates-calculator"
                onClick={handleSendMoneyClick}
                className="inline-flex items-center gap-4 bg-white hover:bg-gray-100 text-[#7A1220] font-figtree font-bold pl-8 pr-3 py-3 rounded-full shadow-2xl transition-all duration-300 group select-none text-sm cursor-pointer hover:scale-[1.02]"
              >
                <span>Send Money Internationally</span>
                <span className="w-9 h-9 rounded-full bg-[#7A1220] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-4.5 h-4.5" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Devices Mockup Showcase */}
          <div className="flex items-center justify-center overflow-visible">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[540px] aspect-[1.5/1] select-none relative flex items-center justify-center pointer-events-none overflow-visible"
            >
              {/* Soft blur shadow underneath device */}
              <div className="absolute bottom-[2%] w-[80%] h-[10%] bg-black/60 filter blur-[20px] rounded-full mix-blend-multiply opacity-80 pointer-events-none" />
              
              <img 
                src="/devices-1-tr.png" 
                alt="SunnyRemit Device Layout Showcase"
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10"
              />
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
