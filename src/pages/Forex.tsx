import React from 'react';
import { motion } from 'framer-motion';
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

export function Forex() {
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col"
              >
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[#7A1220]/30 flex items-center justify-center mb-6 shadow-sm">
                  <feature.icon className="w-5 h-5 text-[#7A1220]" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-medium text-[#0E0E0E] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
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
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-6 px-7 py-5 cursor-pointer list-none">
                  <span className="text-base md:text-lg font-medium text-[#0E0E0E]">
                    {faq.q}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#7A1220] group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-7 pb-6 text-gray-500 font-light leading-relaxed">
                  {faq.a}
                </div>
              </motion.details>
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