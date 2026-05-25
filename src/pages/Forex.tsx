import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { RatesStrip } from '../components/RatesStrip';
import { CtaBand } from '../components/CtaBand';
import { ContactLink } from '../components/ContactLink';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Banknote,
  Zap,
  ChevronDown,
  Lock,
  TrendingUp
} from 'lucide-react';

const forexRates = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', buy: 128.50, sell: 130.50 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', buy: 139.20, sell: 141.20 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', buy: 164.10, sell: 166.10 },
  { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪', buy: 34.25, sell: 36.25 },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', buy: 6.80, sell: 7.40 },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', buy: 1.45, sell: 1.65 },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', buy: 93.80, sell: 95.80 }
];

const features = [
  {
    icon: Banknote,
    title: 'Competitive Rates',
    description: 'Live, market-driven exchange rates across all major and regional currencies — no hidden spreads.'
  },
  {
    icon: Zap,
    title: 'Instant Exchange',
    description: 'Walk in and walk out. Most transactions complete in under five minutes at any of our seven branches.'
  },
  {
    icon: ShieldCheck,
    title: 'CBK Regulated',
    description: 'Fully licensed by the Central Bank of Kenya and compliant with all AML and KYC requirements.'
  }
];

const faqs = [
  {
    q: 'What currencies do you exchange?',
    a: 'We deal in over 30 currencies including USD, EUR, GBP, AED, ZAR, INR, JPY, CAD, AUD, CHF, and regional currencies like UGX and TZS.'
  },
  {
    q: 'Do I need an appointment?',
    a: 'No appointment is needed for walk-in transactions under KSh 1,000,000. For larger transactions, we recommend calling ahead so we can prepare your funds.'
  },
  {
    q: 'How are your rates determined?',
    a: 'Our rates are based on live interbank rates with a transparent spread. You can lock in a rate online for up to 4 hours before completing your exchange.'
  },
  {
    q: 'What documents do I need?',
    a: 'A valid national ID, passport, or alien card. For transactions above KSh 500,000 we may request additional source-of-funds documentation in line with CBK regulations.'
  }
];

function ForexFeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className="group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-[#7A1220]/40 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[#7A1220] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.88]" />

      <div className="relative z-10 flex flex-col p-6 sm:p-8 group-hover:[&_*]:text-white">
        <motion.div
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#7A1220]/8 border border-[#7A1220]/15 flex items-center justify-center mb-5 group-hover:bg-white/10 group-hover:border-white/30 transition-colors duration-500"
          whileHover={{ scale: 1.12, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 16 }}
        >
          <Icon className="w-5 h-5 text-[#7A1220] group-hover:text-white transition-colors duration-500" strokeWidth={1.75} />
        </motion.div>

        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-300 group-hover:text-white/40 transition-colors duration-500 mb-2">
          0{index + 1}
        </span>

        <h3 className="text-lg sm:text-xl font-semibold text-[#0E0E0E] group-hover:text-white mb-3 transition-colors duration-500">
          {feature.title}
        </h3>

        <p className="text-sm sm:text-base text-gray-500 group-hover:text-white/90 font-normal leading-relaxed transition-colors duration-500">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) {
  const isActive = isOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        isActive
          ? 'border-[#7A1220]/40 shadow-lg'
          : 'border-gray-100 bg-white hover:border-[#7A1220]/40 hover:shadow-md'
      }`}
    >
      <div className="absolute inset-0 bg-white" />
      <div
        className={`absolute inset-0 bg-[#7A1220] transition-opacity duration-500 ${
          isActive ? 'opacity-[0.88]' : 'opacity-0 group-hover:opacity-[0.88]'
        }`}
      />

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => onToggle(index)}
        className="relative z-10 flex w-full items-center justify-between gap-6 px-7 py-5 text-left"
      >
        <span
          className={`text-base md:text-lg font-medium transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-[#0E0E0E] group-hover:text-white'
          }`}
        >
          {faq.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 transition-all duration-500 ${
            isActive
              ? 'rotate-180 text-white'
              : 'text-[#7A1220] group-hover:text-white'
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 overflow-hidden"
          >
            <div className="px-7 pb-6 text-white/90 font-normal leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Forex() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((current) => (current === index ? null : index));
  };
  return (
    <>
      <PageHero
        eyebrow="Currency Exchange"
        title="Trade currencies with confidence."
        description="Competitive rates, instant service, and seven branches across Nairobi — Sunny Forex has been Kenya's trusted bureau since 2008."
        imageSrc="/pexels-jakubzerdzicki-30572289.jpg"
        imageAlt="Currency exchange board rates"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Forex' }
        ]}
      />

      <RatesStrip />

      {/* Live Board Rates Table */}
      <section className="py-24 md:py-32 bg-[#FAFAF7] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block w-10 h-px bg-[#7A1220] mb-6" />
              <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4">
                Today's Live Board Rates
              </h2>
              <p className="type-lead max-w-md">
                Licensed and regulated by the Central Bank of Kenya. Rates are guaranteed when locked in.
              </p>
            </div>
            <Link
              to="/lock-rate"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium text-sm shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock-In Any Rate</span>
            </Link>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="px-8 py-5">Currency</th>
                    <th className="px-6 py-5">Code</th>
                    <th className="px-6 py-5 text-right">We Buy (KES)</th>
                    <th className="px-6 py-5 text-right">We Sell (KES)</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-light text-gray-600">
                  {forexRates.map((rate, i) => (
                    <tr key={rate.code} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 flex items-center gap-3 font-medium text-[#0E0E0E]">
                        <span className="text-2xl" role="img" aria-label={rate.name}>{rate.flag}</span>
                        <span>{rate.name}</span>
                      </td>
                      <td className="px-6 py-5 font-mono text-xs">{rate.code}</td>
                      <td className="px-6 py-5 text-right font-mono font-medium text-emerald-600">
                        {rate.buy.toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-right font-mono font-medium text-[#7A1220]">
                        {rate.sell.toFixed(2)}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Link
                          to={`/lock-rate?cur=${rate.code}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A1220] hover:text-[#5C0D18] transition-colors"
                        >
                          <Lock className="w-3 h-3" />
                          <span>Lock Rate</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 max-w-2xl">
            <span className="inline-block w-10 h-px bg-[#7A1220] mb-6" />
            <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4">
              Why exchange with Sunny Forex.
            </h2>
            <p className="type-lead">
              The fundamentals that have kept us Kenya's trusted bureau for over 17 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <ForexFeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-[#FAFAF7]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <span className="inline-block w-10 h-px bg-[#7A1220] mb-6" />
            <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4">
              Frequently asked.
            </h2>
            <p className="type-lead">
              Quick answers to common questions about currency exchange.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                index={index}
                isOpen={openFaq === index}
                onToggle={toggleFaq}
              />
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center">
            <ContactLink className="inline-flex items-center gap-2 text-sm font-medium text-[#7A1220] hover:text-[#5C0D18] transition-colors group">
              Have another question? Talk to us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </ContactLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}