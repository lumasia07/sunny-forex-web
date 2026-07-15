import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiveBlock, LiveWords } from './LiveText';
import { fetchFromApi } from '../lib/api';

const defaultRates = [
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

function RateCard({ rate, onClick }: { rate: (typeof defaultRates)[number]; onClick?: () => void }) {
  const isUp = rate.change >= 0;
  const flagCode = rate.code.substring(0, 2).toLowerCase();
  
  return (
    <motion.div
      onClick={onClick}
      className="flex items-center justify-between gap-6 px-8 py-6 mx-2.5 rounded-2xl bg-gradient-to-b from-[#8A1625] via-[#5C0D18] to-[#120406] border border-white/10 hover:shadow-[0_20px_40px_rgba(122,18,32,0.18)] transition-all min-w-[360px] cursor-pointer"
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
      
      {/* Flag and Currency Info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shadow-sm flex items-center justify-center shrink-0">
          <img 
            src={`https://flagcdn.com/${flagCode}.svg`} 
            className="w-full h-full object-cover" 
            alt={rate.code} 
          />
        </div>
        <div className="text-left">
          <LiveBlock className="text-sm font-bold text-white leading-none" variant="neutral">
            {rate.code}
          </LiveBlock>
          <LiveBlock className="text-[10px] text-white/60 font-light mt-0.5 leading-none" variant="neutral">
            {rate.name}
          </LiveBlock>
        </div>
      </div>
      
      <div className="w-px h-8 bg-white/10" />
      
      {/* Rates */}
      <div className="flex items-center gap-4 text-xs font-figtree">
        <div className="text-left">
          <p className="text-[10px] text-white/40 font-light leading-none">buy</p>
          <LiveBlock className="text-sm font-bold text-white tabular-nums mt-1 leading-none" variant="neutral">
            {rate.buy.toFixed(2)}
          </LiveBlock>
        </div>
        <div className="text-left">
          <p className="text-[10px] text-white/40 font-light leading-none">sell</p>
          <LiveBlock className="text-sm font-bold text-white tabular-nums mt-1 leading-none" variant="neutral">
            {rate.sell.toFixed(2)}
          </LiveBlock>
        </div>
      </div>

      {/* Trend Pill */}
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold tabular-nums border ${
        isUp 
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
          : 'bg-red-500/20 text-red-300 border-red-500/30'
      }`}>
        {isUp ? (
          <TrendingUp className="w-2.5 h-2.5" />
        ) : (
          <TrendingDown className="w-2.5 h-2.5" />
        )}
        <LiveBlock className="leading-none" variant="neutral">
          {isUp ? '+' : ''}{rate.change.toFixed(2)}%
        </LiveBlock>
      </div>
    </motion.div>
  );
}

export function RatesStrip({ onRateClick }: { onRateClick?: (code: string) => void }) {
  const [rates, setRates] = useState<any[]>(defaultRates);
  const [lastUpdated, setLastUpdated] = useState<string>('just now');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  useEffect(() => {
    fetchFromApi<any[]>('rates')
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map(r => ({
            code: r.currency_code,
            flag: r.flag_emoji,
            name: r.currency_name,
            buy: parseFloat(r.buy_rate),
            sell: parseFloat(r.sell_rate),
            change: parseFloat(r.change_pct)
          }));
          setRates(formatted);
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      })
      .catch(err => console.warn('Could not fetch rates from CMS API:', err));
  }, []);

  const loopRates = [...rates, ...rates];
  return (
    <section ref={sectionRef} className="w-full bg-[#F9FAFB] border-y border-gray-200 py-10 overflow-hidden">
      <motion.div
        className="max-w-3xl mx-auto px-6 md:px-12 mb-8 text-center flex flex-col items-center"
        style={{ y: headingY, opacity: headingOpacity }}>
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block w-10 h-px bg-[#7A1220] mb-4"
          />
          <h2 className="type-headline text-2xl md:text-3xl lg:text-4xl text-gray-900 font-bold">
            <LiveWords text="Today's rates against KES" variant="neutral" />
          </h2>
          <LiveBlock className="type-lead text-sm md:text-base mt-1 text-gray-500 font-light font-figtree mb-3" variant="neutral" inline={false}>
            Live rates updated throughout the trading day · Indicative only
          </LiveBlock>
        </div>

        <div className="flex items-center gap-3 text-xs justify-center">
          <span className="flex items-center gap-2 text-emerald-600 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            LIVE
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-gray-400 font-light">Updated {lastUpdated}</span>
        </div>
      </motion.div>

      {/* Auto-scrolling marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />

        <div className="flex marquee">
          {loopRates.map((rate, index) =>
          <RateCard
            key={`${rate.code}-${index}`}
            rate={rate}
            onClick={() => onRateClick?.(rate.code)}
          />
          )}
        </div>
      </motion.div>

      {/* Check All Live Rates CTA */}
      <div className="flex justify-center mt-10">
        <Link
          to="/forex"
          className="inline-flex items-center gap-3.5 rounded-full bg-[#7A1220] px-7 py-3.5 font-figtree text-sm font-bold text-white shadow-lg hover:bg-[#5C0D18] hover:shadow-[#7A1220]/20 hover:-translate-y-0.5 transition-all duration-300 group"
        >
          Check all live rates
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A1220] group-hover:translate-x-0.5 transition-transform duration-300">
            <ArrowRight size={13} strokeWidth={2.5} />
          </span>
        </Link>
      </div>

      <style>{`
        .marquee {
          width: max-content;
          animation: marquee 480s linear infinite;
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
