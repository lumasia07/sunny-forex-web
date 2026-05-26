import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Lock, TrendingUp } from 'lucide-react';

const currencies = [
  { code: 'USD', flag: '🇺🇸', rate: 130.5 },
  { code: 'EUR', flag: '🇪🇺', rate: 141.2 },
  { code: 'GBP', flag: '🇬🇧', rate: 165.8 },
  { code: 'AED', flag: '🇦🇪', rate: 35.4 },
];

export function HeroLockRateCard() {
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendCurrency, setSendCurrency] = useState('USD');

  const selected = currencies.find((c) => c.code === sendCurrency) || currencies[0];
  const sendNum = parseFloat(sendAmount) || 0;
  const receiveNum = sendNum * selected.rate;

  return (
    <div className="hero-lock-card w-full max-w-[300px] mx-auto lg:mx-0 lg:ml-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(122,18,32,0.1)] border border-[#7A1220]/10 bg-white">
        <div className="h-1 bg-gradient-to-r from-[#7A1220] via-[#B91C1C] to-[#006B3F]" />

        <div className="px-4 pt-3 pb-3 flex items-center justify-between gap-2 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="font-display text-xs font-bold text-[#0E0E0E]">Lock-In Rate</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <TrendingUp className="w-2.5 h-2.5" />
            LIVE
          </span>
        </div>

        <div className="px-4 py-3 space-y-2.5">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
            <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              You send
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                min="0"
                className="flex-1 min-w-0 text-2xl font-display font-bold text-[#0E0E0E] bg-transparent border-none outline-none p-0 tabular-nums"
              />
              <select
                value={sendCurrency}
                onChange={(e) => setSendCurrency(e.target.value)}
                className="shrink-0 text-xs font-semibold bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#7A1220] cursor-pointer">
                {currencies.map((cur) => (
                  <option key={cur.code} value={cur.code}>
                    {cur.flag} {cur.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-0.5">
            <div className="w-7 h-7 rounded-full bg-[#7A1220] text-white flex items-center justify-center shrink-0">
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-semibold text-gray-500 tabular-nums">
              1 {sendCurrency} = {selected.rate.toFixed(4)} KES
            </span>
          </div>

          <div className="rounded-xl border border-[#7A1220]/15 bg-[#7A1220]/[0.03] px-3 py-2.5">
            <label className="block text-[9px] font-bold text-[#7A1220]/70 uppercase tracking-widest mb-0.5">
              They receive
            </label>
            <p className="font-display text-2xl font-bold text-[#0E0E0E] tabular-nums leading-none">
              {receiveNum.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <span className="text-xs font-semibold text-gray-500 ml-1.5">KES</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-[#0E0E0E] p-2.5 text-[10px] text-white">
            <div className="text-center">
              <p className="text-white/45 uppercase tracking-wide text-[8px]">Fee</p>
              <p className="font-semibold tabular-nums">0.00</p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-white/45 uppercase tracking-wide text-[8px]">Time</p>
              <p className="font-semibold text-emerald-400">Same day</p>
            </div>
            <div className="text-center">
              <p className="text-white/45 uppercase tracking-wide text-[8px]">Total</p>
              <p className="font-bold tabular-nums text-[11px]">
                {sendNum.toLocaleString(undefined, { maximumFractionDigits: 0 })} {sendCurrency}
              </p>
            </div>
          </div>

          <Link
            to={`/lock-rate?cur=${sendCurrency}`}
            className="w-full flex justify-between items-center gap-3 pl-6 pr-1.5 py-1.5 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-all font-bold text-xs uppercase tracking-wide shadow-md shadow-[#7A1220]/25 group">
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-white/70" />
              Lock-In This Rate
            </span>
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
