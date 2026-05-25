import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LiveBlock, LiveWords } from './LiveText';
const rates = [
{
  code: 'USD',
  flag: '🇺🇸',
  name: 'US Dollar',
  buy: 130.5,
  sell: 132.0,
  change: 0.42
},
{
  code: 'EUR',
  flag: '🇪🇺',
  name: 'Euro',
  buy: 141.2,
  sell: 143.5,
  change: -0.18
},
{
  code: 'GBP',
  flag: '🇬🇧',
  name: 'British Pound',
  buy: 165.8,
  sell: 168.2,
  change: 0.31
},
{
  code: 'AED',
  flag: '🇦🇪',
  name: 'UAE Dirham',
  buy: 35.4,
  sell: 36.1,
  change: 0.05
},
{
  code: 'ZAR',
  flag: '🇿🇦',
  name: 'South African Rand',
  buy: 6.8,
  sell: 7.1,
  change: -0.22
},
{
  code: 'INR',
  flag: '🇮🇳',
  name: 'Indian Rupee',
  buy: 1.54,
  sell: 1.62,
  change: 0.08
},
{
  code: 'JPY',
  flag: '🇯🇵',
  name: 'Japanese Yen',
  buy: 0.83,
  sell: 0.89,
  change: -0.04
},
{
  code: 'CAD',
  flag: '🇨🇦',
  name: 'Canadian Dollar',
  buy: 94.2,
  sell: 96.1,
  change: 0.15
},
{
  code: 'AUD',
  flag: '🇦🇺',
  name: 'Australian Dollar',
  buy: 84.5,
  sell: 86.2,
  change: 0.27
},
{
  code: 'CHF',
  flag: '🇨🇭',
  name: 'Swiss Franc',
  buy: 146.3,
  sell: 148.5,
  change: 0.19
},
{
  code: 'UGX',
  flag: '🇺🇬',
  name: 'Ugandan Shilling',
  buy: 0.034,
  sell: 0.036,
  change: -0.01
},
{
  code: 'TZS',
  flag: '🇹🇿',
  name: 'Tanzanian Shilling',
  buy: 0.051,
  sell: 0.053,
  change: 0.02
}];

function RateCard({ rate }: { rate: (typeof rates)[number] }) {
  const isUp = rate.change >= 0;
  return (
    <motion.div
      className="flex items-center gap-5 px-7 py-4 mx-1.5 rounded-2xl bg-white border border-gray-100 hover:border-[#7A1220]/30 hover:shadow-lg transition-all min-w-[280px]"
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
      <div className="flex flex-col items-center gap-1">
        <motion.span
          className="text-2xl leading-none cursor-default"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
          {rate.flag}
        </motion.span>
        <LiveBlock className="text-[10px] font-semibold tracking-wider text-gray-400" variant="dark">
          {rate.code}
        </LiveBlock>
      </div>
      <div className="w-px h-12 bg-gray-100" />
      <div className="flex-1 flex flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <LiveBlock className="text-xs font-medium text-gray-400 uppercase tracking-wider" variant="dark">
            Buy
          </LiveBlock>
          <LiveBlock className="text-base font-medium text-[#0E0E0E] tabular-nums" variant="dark">
            {rate.buy.toFixed(2)}
          </LiveBlock>
        </div>
        <div className="flex items-baseline justify-between gap-2 mt-0.5">
          <LiveBlock className="text-xs font-medium text-gray-400 uppercase tracking-wider" variant="dark">
            Sell
          </LiveBlock>
          <LiveBlock className="text-base font-medium text-[#0E0E0E] tabular-nums" variant="dark">
            {rate.sell.toFixed(2)}
          </LiveBlock>
        </div>
      </div>
      <div className={`flex flex-col items-end gap-1 ${isUp ? 'text-emerald-600' : 'text-[#B91C1C]'}`}>
        {isUp ? (
          <TrendingUp className="w-3.5 h-3.5" strokeWidth={2} />
        ) : (
          <TrendingDown className="w-3.5 h-3.5" strokeWidth={2} />
        )}
        <LiveBlock className="text-xs font-medium tabular-nums" variant="dark">
          {isUp ? '+' : ''}
          {rate.change.toFixed(2)}%
        </LiveBlock>
      </div>
    </motion.div>
  );
}
export function RatesStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Duplicate rates for seamless infinite scroll
  const loopRates = [...rates, ...rates];
  return (
    <section ref={sectionRef} className="w-full bg-white border-y border-gray-100 py-10 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        style={{ y: headingY, opacity: headingOpacity }}>
        <div className="flex flex-col">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block w-10 h-px bg-[#7A1220] mb-4 origin-left"
          />
          <h2 className="type-headline text-2xl md:text-3xl lg:text-4xl">
            <LiveWords text="Today's rates against KES" />
          </h2>
          <LiveBlock className="type-lead text-sm md:text-base mt-1" variant="neutral" inline={false}>
            Live rates updated throughout the trading day · Indicative only
          </LiveBlock>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-2 text-emerald-600 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            LIVE
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500">Updated just now</span>
        </div>
      </motion.div>

      {/* Auto-scrolling marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex marquee">
          {loopRates.map((rate, index) =>
          <RateCard key={`${rate.code}-${index}`} rate={rate} />
          )}
        </div>
      </motion.div>

      <style>{`
        .marquee {
          width: max-content;
          animation: marquee 60s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>);

}