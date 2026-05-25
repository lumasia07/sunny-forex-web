import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Send } from 'lucide-react';

const currencies = [
  { code: 'USD', flag: '🇺🇸', rate: 130.5 },
  { code: 'EUR', flag: '🇪🇺', rate: 141.2 },
  { code: 'GBP', flag: '🇬🇧', rate: 165.8 },
  { code: 'AED', flag: '🇦🇪', rate: 35.4 },
  { code: 'ZAR', flag: '🇿🇦', rate: 6.8 },
  { code: 'INR', flag: '🇮🇳', rate: 1.54 },
];

export function HeroCalculator() {
  const [sendAmount, setSendAmount] = useState('1000');
  const [sendCurrency, setSendCurrency] = useState('USD');

  const selected = currencies.find((c) => c.code === sendCurrency) || currencies[0];
  const sendNum = parseFloat(sendAmount) || 0;
  const receiveNum = sendNum * selected.rate;

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
      <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
        <div className="rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 focus-within:border-[#7A1220]/30 transition-colors">
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            You Send
          </label>
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              min="0"
              className="flex-1 min-w-0 w-0 text-xl sm:text-2xl md:text-3xl font-light text-[#0E0E0E] bg-transparent border-none outline-none p-0"
            />
            <select
              value={sendCurrency}
              onChange={(e) => setSendCurrency(e.target.value)}
              className="shrink-0 text-xs sm:text-sm font-medium text-[#0E0E0E] bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 outline-none focus:border-[#7A1220] cursor-pointer">
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.flag} {cur.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full bg-[#7A1220]/8 text-[10px] sm:text-xs font-medium text-[#7A1220] border border-[#7A1220]/15 text-center">
            1 {sendCurrency} = {selected.rate.toFixed(4)} KES
          </span>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-gray-100 p-3 sm:p-4 bg-[#FAFAF7]/50">
          <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            They Get
          </label>
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl font-light text-[#0E0E0E] tabular-nums truncate">
              {receiveNum.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="shrink-0 text-xs sm:text-sm font-medium text-[#0E0E0E] bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">
              🇰🇪 KES
            </span>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 pt-1 text-xs sm:text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Fee</span>
            <span className="font-medium text-[#0E0E0E] tabular-nums">0.00 {sendCurrency}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Transfer time</span>
            <span className="font-medium text-[#006B3F]">Same day</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total to pay</span>
            <span className="font-semibold text-[#0E0E0E] tabular-nums">
              {sendNum.toLocaleString(undefined, { maximumFractionDigits: 2 })} {sendCurrency}
            </span>
          </div>
        </div>

        <Link
          to={`/lock-rate?cur=${sendCurrency}`}
          className="w-full flex justify-center items-center gap-2 py-3.5 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-semibold text-sm shadow-lg">
          <Lock className="w-4 h-4" />
          Lock-In This Rate
          <Send className="w-4 h-4" />
        </Link>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-[#FAFAF7] border-t border-gray-100 flex items-center justify-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
        <span>CBK Licensed</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>Secure 256-bit</span>
      </div>
    </div>
  );
}
