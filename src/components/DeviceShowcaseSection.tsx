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
                className="inline-flex items-center gap-3.5 pl-8 pr-2 py-2 rounded-full bg-white hover:bg-gray-100 text-[#7A1220] font-figtree text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group select-none"
              >
                <span>Send Money Internationally</span>
                <span className="w-8 h-8 rounded-full bg-[#7A1220] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Devices Mockup Showcase */}
          <div className="flex items-center justify-center overflow-visible relative">
            {/* Holographic interactive rings */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-visible">
              <div className="absolute w-[300px] sm:w-[380px] h-[90px] sm:h-[110px] rounded-full border border-dashed border-white/10 rotate-[-10deg] scale-y-[0.35] blur-[0.5px] top-[48%]" />
              <div className="absolute w-[340px] sm:w-[440px] h-[110px] sm:h-[130px] rounded-full border border-dotted border-[#D4A24C]/25 rotate-[-10deg] scale-y-[0.35] blur-[0.5px] top-[44%] animate-[spin_100s_linear_infinite]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[540px] aspect-[1.5/1] select-none relative flex items-center justify-center pointer-events-none overflow-visible z-10"
            >
              {/* Soft blur shadow underneath device */}
              <div className="absolute bottom-[2%] w-[80%] h-[10%] bg-black/60 filter blur-[20px] rounded-full mix-blend-multiply opacity-80 pointer-events-none" />
              
              <motion.div
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src="/devices-1-tr.png" 
                  alt="SunnyRemit Device Layout Showcase"
                  className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-10"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
