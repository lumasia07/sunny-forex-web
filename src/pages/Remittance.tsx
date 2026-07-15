import React, { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
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
    title: 'Select Destination',
    body: 'Choose from over 50 corridors globally. Check transaction speed and zero-fee status.'
  },
  {
    n: '02',
    title: 'Input Amount & Rate',
    body: 'Convert instantly online and secure guaranteed rates for 4 hours to bypass volatility.'
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

const stats = [
  { value: 50, suffix: '+', label: 'Active corridors' },
  { value: 15, suffix: ' min', label: 'Average transfer time' },
  { value: 1, prefix: 'KSh ', suffix: 'k', label: 'Minimum transfer' },
  { value: 6, suffix: '', label: 'Global partners' },
];

function AnimatedStatValue({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: '-40px',
    amount: 0.6,
  });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toString());

  useEffect(() => {
    if (isInView) {
      count.set(0);
      const controls = animate(count, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }

    count.set(0);
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {prefix && <span>{prefix}</span>}
      <motion.span>{rounded}</motion.span>
      {suffix && <span>{suffix}</span>}
    </span>
  );
}

function RemittanceStepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -4 }}
      className="group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-[#7A1220]/40 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[#7A1220] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.88]" />

      <div className="relative z-10 flex flex-col p-6 sm:p-8 group-hover:[&_*]:text-white">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#7A1220] group-hover:text-white/40 transition-colors duration-500 mb-4">
          {step.n}
        </span>
        <h3 className="text-lg sm:text-xl font-semibold text-[#0E0E0E] group-hover:text-white mb-3 transition-colors duration-500">
          {step.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-500 group-hover:text-white/90 font-normal leading-relaxed transition-colors duration-500">
          {step.body}
        </p>
      </div>
    </motion.div>
  );
}

function CorridorCard({
  corridor,
  index,
}: {
  corridor: (typeof corridors)[number];
  index: number;
}) {
  const flagCode = corridor.currency.substring(0, 2).toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        to="/branches"
        className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-500 hover:border-[#7A1220]/40 hover:shadow-xl"
      >
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[#7A1220] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.88]" />

        <img
          src={`https://flagcdn.com/${flagCode}.svg`}
          className="relative z-10 h-5 w-7 rounded object-cover shadow border border-gray-100 group-hover:scale-110 transition-transform duration-500"
          alt={corridor.country}
        />

        <div className="relative z-10 flex flex-1 flex-col min-w-0">
          <span className="text-sm font-medium text-[#0E0E0E] group-hover:text-white transition-colors duration-500 truncate">
            {corridor.country}
          </span>
          <span className="text-xs text-gray-400 group-hover:text-white/70 transition-colors duration-500">
            {corridor.currency}
          </span>
        </div>

        <div className="relative z-10 flex items-center gap-1.5 text-xs font-medium text-emerald-600 group-hover:text-white/90 transition-colors duration-500 shrink-0">
          <Clock className="w-3 h-3" />
          {corridor.time}
        </div>
      </Link>
    </motion.div>
  );
}

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
          {stats.map((s) => (
            <div key={s.label} className="flex gap-4">
              <span className="block w-px bg-[#7A1220] self-stretch" />
              <div className="flex flex-col">
                <span className="text-3xl font-light text-[#0E0E0E] leading-none mb-2">
                  <AnimatedStatValue
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </span>
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                  {s.label}
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
            <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4">
              How it works.
            </h2>
            <p className="type-lead">
              Four simple steps. Most transfers complete in under 15 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {steps.map((step, i) => (
              <RemittanceStepCard key={step.n} step={step} index={i} />
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
              <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4">
                Popular corridors.
              </h2>
              <p className="type-lead max-w-md">
                Select your transfer route below to send money directly.
              </p>
            </div>
            <Link
              to="/branches"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium text-sm shadow-md"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>Find a Branch</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corridors.map((c, i) => (
              <CorridorCard key={c.country} corridor={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      <PartnersBanner />

      <CtaBand />
    </>
  );
}
