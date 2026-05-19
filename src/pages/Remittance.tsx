import React from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { Link } from 'react-router-dom';
import { Send, Clock, ShieldCheck, ArrowRight, Wallet, HelpCircle, Lock } from 'lucide-react';
import { PartnersBanner } from '../components/PartnersBanner';

const corridors = [
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    time: '15 min'
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    time: '20 min'
  },
  {
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    time: '10 min'
  },
  {
    country: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR',
    time: '30 min'
  },
  {
    country: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    time: '1 hour'
  },
  {
    country: 'Germany / Europe',
    flag: '🇪🇺',
    currency: 'EUR',
    time: '20 min'
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    time: '25 min'
  }
];


const steps = [
  {
    n: '01',
    title: 'Choose Your Corridor',
    body: 'Select the currency you wish to trade or remit. We support 50+ active global corridors.'
  },
  {
    n: '02',
    title: 'Lock-In Today\'s Rate',
    body: 'Convert instantly online and lock in the guaranteed rates for 4 hours to bypass volatility.'
  },
  {
    n: '03',
    title: 'Complete Settlement',
    body: 'Walk into any branch or settle via bank transfer or mobile money wallets.'
  },
  {
    n: '04',
    title: 'Funds Dispatched',
    body: 'Recipients are immediately notified by SMS as soon as the transfer completes.'
  }
];

export function Remittance() {
  return (
    <>
      <PageHero
        eyebrow="Money Remittance"
        title="Send money home. Or anywhere."
        description="Fast, secure international transfers in partnership with the world's most trusted remittance networks."
        imageSrc="/pexels-maria-stewart-2268904-5643136 (1).jpg"
        imageAlt="Worldwide global remittance network"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Remittance' }
        ]}
      />

      {/* Stats band */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: '50+', l: 'Active corridors' },
            { v: '15 min', l: 'Average transfer time' },
            { v: 'KSh 1k', l: 'Minimum transfer' },
            { v: '6', l: 'Global partners' }
          ].map((s) => (
            <div key={s.l} className="flex gap-4">
              <span className="block w-px bg-[#7A1220] self-stretch" />
              <div className="flex flex-col">
                <span className="text-3xl font-light text-[#0E0E0E] leading-none mb-2">
                  {s.v}
                </span>
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  {s.l}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 max-w-2xl">
            <span className="inline-block w-10 h-px bg-[#7A1220] mb-6" />
            <h2 className="text-3xl md:text-4xl font-light text-[#0E0E0E] mb-4">
              How it works.
            </h2>
            <p className="text-gray-500 font-light">
              Four simple steps. Most transfers complete in under 15 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col bg-white p-6 rounded-2xl border border-gray-100/50 shadow-sm"
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#7A1220] mb-4">
                  {step.n}
                </span>
                <h3 className="text-lg font-medium text-[#0E0E0E] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corridors */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-block w-10 h-px bg-[#7A1220] mb-6" />
              <h2 className="text-3xl md:text-4xl font-light text-[#0E0E0E] mb-4">
                Popular corridors.
              </h2>
              <p className="text-gray-500 font-light max-w-md">
                Select your transfer route below to lock in the rates directly.
              </p>
            </div>
            <Link
              to="/lock-rate"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium text-sm shadow-md"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Convert Instantly</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corridors.map((c, i) => (
              <Link
                to={`/lock-rate?cur=${c.currency}`}
                key={c.country}
                className="flex items-center gap-4 px-6 py-5 rounded-2xl border border-gray-100 hover:border-[#7A1220]/30 hover:shadow-md transition-all bg-white cursor-pointer"
              >
                <span className="text-2xl" role="img" aria-label={c.country}>{c.flag}</span>
                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-medium text-[#0E0E0E]">{c.country}</span>
                  <span className="text-xs text-gray-400">{c.currency}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <Clock className="w-3 h-3" />
                  {c.time}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PartnersBanner />

      <CtaBand />
    </>
  );
}