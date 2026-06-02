import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, TrendingUp } from 'lucide-react';

const currencies = [
  { code: 'USD', flag: '🇺🇸', rate: 130.5 },
  { code: 'EUR', flag: '🇪🇺', rate: 141.2 },
  { code: 'GBP', flag: '🇬🇧', rate: 165.8 },
  { code: 'AED', flag: '🇦🇪', rate: 35.4 },
];

export function HeroCalculator() {
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendCurrency, setSendCurrency] = useState('USD');

  const selected = currencies.find((c) => c.code === sendCurrency) || currencies[0];
  const sendNum = parseFloat(sendAmount) || 0;
  const receiveNum = sendNum * selected.rate;

  return (
    <div className="rate-widget w-full rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-[#7A1220]/[0.04] to-transparent">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-[#0E0E0E] uppercase tracking-wider">Live rate</span>
        </div>
        <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          +0.42%
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3.5 focus-within:border-[#7A1220]/40 focus-within:ring-2 focus-within:ring-[#7A1220]/10 transition-all">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              You send
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                min="0"
                className="flex-1 min-w-0 text-xl sm:text-2xl font-bold text-[#0E0E0E] bg-transparent border-none outline-none p-0 tabular-nums tracking-tight"
              />
              <select
                value={sendCurrency}
                onChange={(e) => setSendCurrency(e.target.value)}
                className="shrink-0 text-xs font-semibold bg-white border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#7A1220] cursor-pointer shadow-sm">
                {currencies.map((cur) => (
                  <option key={cur.code} value={cur.code}>
                    {cur.flag} {cur.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-[#7A1220]/15 bg-[#7A1220]/[0.03] p-3.5">
            <label className="block text-[10px] font-bold text-[#7A1220]/70 uppercase tracking-widest mb-1.5">
              They receive
            </label>
            <p className="text-xl sm:text-2xl font-bold text-[#0E0E0E] tabular-nums tracking-tight">
              {receiveNum.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <span className="text-sm font-semibold text-gray-500 ml-1.5">KES</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 px-0.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 font-medium tabular-nums">
            1 {sendCurrency} = <strong className="text-[#0E0E0E] ml-1">{selected.rate.toFixed(4)}</strong> KES
          </span>
          <span className="text-emerald-600 font-semibold">Fee 0.00 · Same day</span>
        </div>

        <Link
          to="/branches"
          className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-all font-bold text-sm shadow-lg shadow-[#7A1220]/25 hover:shadow-[#7A1220]/35 hover:-translate-y-0.5">
          <Send className="w-4 h-4" />
          Send Money
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
