import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function DeviceShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 3D Pull effect: starts flat (72 degrees rotation) and pulled vertical (0 degrees) as scroll moves
  const rotateX = useTransform(scrollYProgress, [0.08, 0.48], [72, 0]);
  const scale = useTransform(scrollYProgress, [0.08, 0.48], [0.75, 1]);
  const translateY = useTransform(scrollYProgress, [0.08, 0.48], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0.08, 0.3], [0.4, 1]);

  // CTA button animation: slides up and fades in as layout stands straight
  const ctaScale = useTransform(scrollYProgress, [0.28, 0.48], [0.9, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.28, 0.45], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.28, 0.48], [25, 0]);

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
      className="relative py-12 sm:py-20 md:py-24 bg-[#FAFAF7] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center"
    >
      {/* Outer Black Container Card with smooth borders and padding - does not touch margins */}
      <div 
        className="w-full max-w-7xl rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#7A1220] via-[#5C0D18] to-[#400810] border border-white/10 shadow-[0_30px_100px_rgba(122,18,32,0.22)] p-6 sm:p-12 md:p-20 overflow-hidden relative z-10 flex flex-col items-center justify-center"
        style={{ perspective: "1800px" }}
      >
        {/* Inside Card High-tech Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none rounded-[2.5rem] sm:rounded-[3rem]" />

        {/* Ambient Glows inside the Card */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-white/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#D4A24C]/20 blur-[100px] pointer-events-none z-0" />

        <div className="w-full relative z-10 flex flex-col items-center justify-center">
          
          {/* Apple-style Interactive Tilted-to-Flat Mockup Container */}
          <motion.div
            style={{
              rotateX,
              scale,
              y: translateY,
              opacity,
              transformStyle: "preserve-3d",
            }}
            className="w-full max-w-[800px] aspect-[1.75/1] select-none relative flex items-center justify-center pointer-events-none overflow-visible"
          >
            {/* Subtle shadow representing 3D depth */}
            <div className="absolute bottom-[2%] w-[80%] h-[10%] bg-black/75 filter blur-[30px] rounded-full mix-blend-multiply opacity-80 transform translate-z-[-25px] pointer-events-none" />
            
            <img 
              src="/devices-1-tr.png" 
              alt="SunnyRemit Device Layout Showcase"
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)] z-10"
            />
          </motion.div>

          {/* Prominent CTA below the device - animate in as layout stands straight */}
          <motion.div
            style={{
              scale: ctaScale,
              opacity: ctaOpacity,
              y: ctaY,
            }}
            className="mt-8 sm:mt-12 text-center"
          >
            <a
              href="/#rates-calculator"
              onClick={handleSendMoneyClick}
              className="inline-flex items-center gap-4 bg-white hover:bg-gray-100 text-[#7A1220] font-figtree font-bold pl-8 pr-3 py-3.5 rounded-full shadow-2xl transition-all duration-300 group select-none text-sm sm:text-base cursor-pointer hover:scale-[1.03]"
            >
              <span>Send Money Internationally</span>
              <span className="w-10 h-10 rounded-full bg-[#7A1220] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
