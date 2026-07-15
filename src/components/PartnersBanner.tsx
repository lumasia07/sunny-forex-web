import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveBlock, LiveWords } from './LiveText';

const partnersList = [
  { name: 'KCB Bank', src: '/kcb-logo.png?v=2', alt: 'KCB Bank Logo' },
  { name: 'M-Pesa', src: '/SafM-PESA-Logo.jpg?v=2', alt: 'M-Pesa Logo' },
  { name: 'Pesalink', src: '/pesalink-logo-dark.png?v=2', alt: 'Pesalink Logo' },
  { name: 'MoneyGram', src: '/logo-moneygram-black.svg?v=2', alt: 'MoneyGram Logo' },
  { name: 'Western Union', src: '/logo.wu.big.svg?v=2', alt: 'Western Union Logo' },
];

export function PartnersBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Multiply items to form a dense and seamless scrolling stream
  const marqueeItems = [
    ...partnersList, 
    ...partnersList, 
    ...partnersList, 
    ...partnersList,
    ...partnersList
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#080808] border-y border-white/5 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-10"
        style={{ y: headingY, opacity: headingOpacity }}>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block w-10 h-px bg-[#7A1220] mb-6 origin-center"
        />
        <h3 className="font-sans font-bold text-white text-2xl md:text-3xl tracking-tight uppercase">
          <LiveWords text="Our Partners" variant="neutral" />
        </h3>
        <LiveBlock className="text-gray-400 font-light text-sm mt-2 max-w-xl mx-auto" variant="dark" inline={false}>
          Delivering secure, instant cash pickups and mobile wallet payouts across Nairobi in direct partnership with leading financial networks.
        </LiveBlock>
      </motion.div>

      {/* Infinite Scrolling Logo Marquee Belt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full bg-[#0A0A0A] py-8 md:py-10 border-y border-white/5 overflow-hidden flex items-center">
        {/* Soft elegant shadow-blur overlays at the sides to give high-fidelity depth */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

        {/* Continuous Loop Marquee Strip */}
        <div className="animate-marquee flex items-center gap-16 md:gap-24">
          {marqueeItems.map((p, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center h-12 md:h-16 w-36 md:w-44 bg-white rounded-2xl p-3 md:p-4 border border-white/10 shadow-sm opacity-85 hover:opacity-100 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="max-h-full max-w-full object-contain transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
