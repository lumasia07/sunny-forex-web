import React from 'react';

const partnersList = [
  { name: 'KCB Bank', src: '/kcb-logo.png?v=2', alt: 'KCB Bank Logo' },
  { name: 'M-Pesa', src: '/SafM-PESA-Logo.jpg?v=2', alt: 'M-Pesa Logo' },
  { name: 'Pesalink', src: '/pesalink-logo-dark.png?v=2', alt: 'Pesalink Logo' },
  { name: 'MoneyGram', src: '/logo-moneygram-black.svg?v=2', alt: 'MoneyGram Logo' },
  { name: 'Western Union', src: '/logo.wu.big.svg?v=2', alt: 'Western Union Logo' },
];

export function PartnersBanner() {
  // Multiply items to form a dense and seamless scrolling stream
  const marqueeItems = [
    ...partnersList, 
    ...partnersList, 
    ...partnersList, 
    ...partnersList,
    ...partnersList
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-10">
        <span className="inline-block w-10 h-px bg-[#7A1220] mb-6" />
        <h3 className="font-sans font-bold text-[#0E0E0E] text-2xl md:text-3xl tracking-tight uppercase">
          Our Licensed Payout Partners
        </h3>
        <p className="text-gray-500 font-light text-sm mt-2 max-w-xl mx-auto">
          Delivering secure, instant cash pickups and mobile wallet payouts across Nairobi in direct partnership with leading financial networks.
        </p>
      </div>

      {/* Infinite Scrolling Logo Marquee Belt */}
      <div className="relative w-full bg-[#FAFAF7] py-8 md:py-10 border-y border-gray-200/50 overflow-hidden flex items-center">
        {/* Soft elegant shadow-blur overlays at the sides to give high-fidelity depth */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#FAFAF7] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#FAFAF7] to-transparent z-10 pointer-events-none" />

        {/* Continuous Loop Marquee Strip */}
        <div className="animate-marquee flex items-center gap-16 md:gap-24">
          {marqueeItems.map((p, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center h-12 md:h-16 w-36 md:w-44 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
