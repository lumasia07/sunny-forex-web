import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Coins, Send, Smartphone } from 'lucide-react';
import { LiveBlock, LiveWords } from './LiveText';

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const handleScrollToCalculator = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('rates-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', '/#rates-calculator');
    }
  };

  const featureCards = [
    {
      category: 'Forex',
      title: 'commission-free cash exchange',
      description: 'Calculate real-time rates online and secure instant cash collection at any of our 7 Nairobi branches.',
      ctaType: 'scroll',
      icon: Coins,
      stat: 'KES',
    },
    {
      category: 'Remittance',
      title: 'secure international payout networks',
      description: 'Send funds globally through our fully compliant remittance channels directly to international bank accounts.',
      ctaType: 'scroll',
      icon: Send,
      stat: '50+',
    },
    {
      category: 'Mobile Wallet',
      title: 'direct M-Pesa wallet settlement',
      description: 'Convert international currencies directly into your local mobile wallet or top up with one single tap.',
      ctaType: 'link',
      ctaHref: '/remittance',
      icon: Smartphone,
      stat: '1-Tap',
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="inline-block w-12 h-px bg-[#7A1220] mb-5" />
          <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4 font-bold tracking-tight text-gray-900">
            <LiveWords text="Services built for how Kenya moves money." variant="neutral" />
          </h2>
          <LiveBlock className="type-lead text-gray-500 max-w-2xl font-light font-figtree" variant="neutral" inline={false}>
            From cash exchange at our modern branches to instant M-Pesa transfers — every service is engineered for speed, transparency, and trust.
          </LiveBlock>
        </div>

        {/* 3 Columns Grid of Cards matching mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            
            const cardContent = (
              <>
                {/* Top Row: Category (icon + text) & Link */}
                <div className="w-full flex items-center justify-between z-10 relative">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 font-figtree">
                      {card.category}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#7A1220] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Main Middle Stat block */}
                <div className="z-10 relative my-6 text-left w-full">
                  <h4 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                    {card.stat}
                    <span className="text-xl sm:text-2xl font-light text-white/50">↗</span>
                  </h4>
                </div>

                {/* Copy / Details Block */}
                <div className="z-10 relative text-left w-full mt-auto">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-2 font-figtree capitalize">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed font-figtree">
                    {card.description}
                  </p>
                </div>
              </>
            );

            return card.ctaType === 'scroll' ? (
              <motion.a
                key={card.title}
                href="/#rates-calculator"
                onClick={handleScrollToCalculator}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-b from-[#8A1625] via-[#5C0D18] to-[#120406] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between items-start shadow-xl hover:shadow-[0_30px_70px_rgba(122,18,32,0.18)] hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden min-h-[320px] cursor-pointer"
              >
                {cardContent}
              </motion.a>
            ) : (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-b from-[#8A1625] via-[#5C0D18] to-[#120406] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between items-start shadow-xl hover:shadow-[0_30px_70px_rgba(122,18,32,0.18)] hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden min-h-[320px]"
              >
                <Link to={card.ctaHref || '/'} className="absolute inset-0 z-20 cursor-pointer" />
                {cardContent}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
