import React from 'react';
import { motion } from 'framer-motion';
import { HeroLockRateCard } from './HeroLockRateCard';
import { ShieldCheck, Clock, CheckCircle2, DollarSign } from 'lucide-react';
import { LiveWords, LiveBlock } from './LiveText';

interface RateCalculatorSectionProps {
  selectedCurrency: string | null;
}

export function RateCalculatorSection({ selectedCurrency }: RateCalculatorSectionProps) {
  const features = [
    {
      icon: Clock,
      title: 'Instant Transfers',
      description: 'Send money to mobile money wallets, bank accounts, or for cash pick-up in minutes.',
    },
    {
      icon: DollarSign,
      title: 'Transparent Fees',
      description: 'Check our clear, upfront fees with absolutely no hidden commissions or surprises.',
    },
    {
      icon: CheckCircle2,
      title: 'Global Network',
      description: 'Connected directly with major international banking networks and mobile money providers.',
    },
    {
      icon: ShieldCheck,
      title: 'CBK Licensed',
      description: 'Fully licensed by the Central Bank of Kenya, ensuring safe, secure, and compliant transfers.',
    },
  ];

  return (
    <section 
      id="rates-calculator" 
      className="py-16 md:py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden"
    >
      {/* Decorative subtle background shapes */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-[#7A1220]/5 to-transparent filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-[#D4A24C]/5 to-transparent filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Context & Features */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-[#7A1220]/10 text-[#7A1220] text-xs font-bold uppercase tracking-wider"
              >
                International Remittance
              </motion.span>
              <h2 className="type-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0E0E0E]">
                <LiveWords text="Send money globally with zero hassle." variant="dark" />
              </h2>
              <LiveBlock className="type-lead text-gray-600 max-w-xl" variant="neutral" inline={false}>
                Fast, secure international money transfers. Calculate your transfers instantly, get real-time exchange rates, and send money to your loved ones abroad with total confidence.
              </LiveBlock>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              {features.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#7A1220]/5 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#7A1220]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm sm:text-base text-[#0E0E0E] tracking-tight">
                        {feat.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                        {feat.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Calculator Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-[420px]">
              <HeroLockRateCard selectedCurrency={selectedCurrency} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
