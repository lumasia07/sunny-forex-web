import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, TrendingUp } from 'lucide-react';

const currencies = [
  { code: 'USD', flag: '🇺🇸', rate: 130.5 },
  { code: 'EUR', flag: '🇪🇺', rate: 141.2 },
  { code: 'GBP', flag: '🇬🇧', rate: 165.8 },
  { code: 'AED', flag: '🇦🇪', rate: 35.4 },
];

export function HeroLockRateCard({ selectedCurrency }: { selectedCurrency: string | null }) {
  const [sendAmount, setSendAmount] = useState('1000');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [sendCurrency, setSendCurrency] = useState('USD');
  const [receiveMethod, setReceiveMethod] = useState('mpesa');

  const selected = currencies.find((c) => c.code === sendCurrency) || currencies[0];

  // Initial calculation and synchronization
  useEffect(() => {
    const rate = selected.rate;
    const sendNum = parseFloat(sendAmount) || 0;
    setReceiveAmount((sendNum * rate).toFixed(0));
  }, [sendCurrency]);

  useEffect(() => {
    if (selectedCurrency) {
      const isSupported = currencies.some(c => c.code === selectedCurrency);
      if (isSupported) {
        setSendCurrency(selectedCurrency);
      }
    }
  }, [selectedCurrency]);

  const handleSendChange = (val: string) => {
    setSendAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setReceiveAmount((num * selected.rate).toFixed(0));
    } else {
      setReceiveAmount('');
    }
  };

  const handleReceiveChange = (val: string) => {
    setReceiveAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setSendAmount((num / selected.rate).toFixed(2));
    } else {
      setSendAmount('');
    }
  };

  const handleSendCurrencyChange = (cur: string) => {
    setSendCurrency(cur);
    const newSelected = currencies.find((c) => c.code === cur) || currencies[0];
    const sendNum = parseFloat(sendAmount) || 0;
    setReceiveAmount((sendNum * newSelected.rate).toFixed(0));
  };

  const flagCode = sendCurrency.substring(0, 2).toLowerCase();

  return (
    <div className="hero-lock-card w-full max-w-[400px] mx-auto lg:mx-0 lg:ml-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-100 bg-white">
        {/* Top brand color accent line */}
        <div className="h-1 bg-[#7A1220]" />

        {/* Live indicator header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-2 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span class="font-display text-xs font-bold text-[#0E0E0E] uppercase tracking-wider">Send Money</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-2.5 h-2.5" />
            LIVE RATE
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          
          {/* You Send Row */}
          <div className="relative flex border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white focus-within:border-[#7A1220] transition-colors">
            <div className="flex-1 p-3">
              <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                You send
              </label>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => handleSendChange(e.target.value)}
                min="0"
                className="w-full text-2xl font-bold text-[#0E0E0E] bg-transparent border-none outline-none p-0 tabular-nums focus:ring-0"
              />
            </div>
            <div className="relative w-[115px] bg-[#7A1220] text-white flex items-center justify-between px-3 shrink-0">
              <span className="flex items-center gap-1.5 font-bold text-xs">
                <img 
                  src={`https://flagcdn.com/${flagCode}.svg`}
                  className="h-3 w-4.5 rounded object-cover shadow border border-white/20"
                  alt=""
                />
                {sendCurrency}
              </span>
              <span className="text-[9px] opacity-80">▼</span>
              <select
                value={sendCurrency}
                onChange={(e) => handleSendCurrencyChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                {currencies.map((cur) => (
                  <option key={cur.code} value={cur.code} className="text-[#0E0E0E]">
                    {cur.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Connecting line and Rate Badge */}
          <div className="relative flex items-center justify-center py-1">
            {/* Vertical connector line */}
            <div className="absolute top-[-16px] bottom-[-16px] left-[50%] w-px border-l border-dashed border-gray-300 pointer-events-none" />
            
            {/* Rate Display Badge */}
            <div className="relative z-10 bg-white border border-gray-100 rounded-full px-4 py-1.5 shadow-sm text-center">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider leading-none mb-0.5">
                Live Rate
              </p>
              <p className="text-xs font-bold text-[#7A1220] tabular-nums leading-none">
                1 {sendCurrency} = {selected.rate.toFixed(4)} KES
              </p>
            </div>
          </div>

          {/* They Get Row */}
          <div className="relative flex border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white focus-within:border-[#7A1220] transition-colors">
            <div className="flex-1 p-3">
              <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                They get
              </label>
              <input
                type="number"
                value={receiveAmount}
                onChange={(e) => handleReceiveChange(e.target.value)}
                min="0"
                className="w-full text-2xl font-bold text-[#0E0E0E] bg-transparent border-none outline-none p-0 tabular-nums focus:ring-0"
              />
            </div>
            <div className="relative w-[115px] bg-[#7A1220] text-white flex items-center justify-between px-3 shrink-0">
              <span className="flex items-center gap-1.5 font-bold text-xs">
                <img 
                  src="https://flagcdn.com/ke.svg"
                  className="h-3 w-4.5 rounded object-cover shadow border border-white/20"
                  alt="KE"
                />
                KES
              </span>
              <span className="text-[9px] opacity-80">▼</span>
              <select
                disabled
                className="absolute inset-0 w-full h-full opacity-0 cursor-not-allowed">
                <option value="KES">KES</option>
              </select>
            </div>
          </div>

          {/* Receive Method Dropdown */}
          <div className="relative border border-gray-200 rounded-xl px-3 py-2 bg-white focus-within:border-[#7A1220] transition-colors mt-1">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              Receive method
            </label>
            <select
              value={receiveMethod}
              onChange={(e) => setReceiveMethod(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#0E0E0E] outline-none border-none cursor-pointer py-1 focus:ring-0">
              <option value="mpesa">Mobile Money (M-Pesa)</option>
              <option value="bank">Bank Transfer</option>
              <option value="cash">Cash Pickup</option>
            </select>
          </div>

          {/* Fee & Summary Breakdown */}
          <div className="space-y-2 text-xs py-2 px-1 border-t border-gray-100 mt-2">
            <div className="flex justify-between items-center text-gray-500">
              <span>Transfer Fee</span>
              <span className="font-semibold text-[#0E0E0E]">0.00 {sendCurrency}</span>
            </div>
            <div className="flex justify-between items-center text-gray-500">
              <span>Transfer speed</span>
              <span className="font-semibold text-emerald-600">Same day</span>
            </div>
            <div className="flex justify-between items-center text-gray-500 border-t border-gray-50 pt-2">
              <span className="font-semibold text-[#0E0E0E]">Total to pay</span>
              <span className="font-bold text-sm text-[#0E0E0E]">
                {(parseFloat(sendAmount) || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {sendCurrency}
              </span>
            </div>
          </div>

          {/* Send Button */}
          <Link
            to="/branches"
            className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl bg-[#7A1220] hover:bg-[#5C0D18] transition-all font-figtree font-semibold text-sm tracking-wide shadow-md shadow-[#7A1220]/15 mt-2 text-white">
            <Send className="w-4 h-4 text-white/80" />
            Send Money
          </Link>

        </div>
      </div>
    </div>
  );
}
