import React from 'react';

export function MoneyGramLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* MoneyGram Red Circle Icon */}
      <div className="w-12 h-12 rounded-full bg-[#E21836] flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden">
        {/* Curved arrow icon */}
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 8a10 10 0 1 0-.45 5.43" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-sans font-black text-[#0E0E0E] text-2xl tracking-tighter">MoneyGram.</span>
        <span className="font-sans italic text-[9px] text-gray-400 font-medium tracking-wide uppercase">money transfer</span>
      </div>
    </div>
  );
}

export function WesternUnionLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Western Union Custom Yellow "W" */}
      <div className="w-12 h-12 rounded-xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0 shadow-sm font-sans font-black text-2xl text-black">
        W
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-sans font-black text-[#0E0E0E] text-lg uppercase tracking-tight leading-none">WESTERN</span>
        <span className="font-sans font-black text-[#FFCC00] text-lg uppercase tracking-tight leading-none">UNION</span>
      </div>
    </div>
  );
}

export function KCBLogo() {
  return (
    <div className="relative overflow-hidden bg-[#55B32B] px-6 py-3 flex items-center justify-center gap-3 rounded-md shadow-sm h-14">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-1.07zM17.9 13c-.1 1.04-.53 2.01-1.2 2.8l-1.4-1.4c.43-.43.7-.99.7-1.63v-3c0-1.1-.9-2-2-2h-3V5.07c3.95.49 7 3.85 7 7.93z" />
        </svg>
        <span className="font-sans font-black text-white text-2xl tracking-wider leading-none">KCB</span>
      </div>
    </div>
  );
}

export function MPesaLogo() {
  return (
    <div className="flex items-center justify-center font-sans font-black text-3xl leading-none">
      <span className="text-[#3FAD44]">m-</span>
      <div className="relative mx-1.5 w-7 h-10 bg-[#E21836] rounded-md flex items-center justify-center text-white text-[9px] font-black uppercase tracking-wider shadow-sm transform -rotate-6">
        <div className="absolute inset-0.5 border border-white/30 rounded" />
        PESA
      </div>
      <span className="text-[#3FAD44]">pesa</span>
    </div>
  );
}

export function PesaLinkLogo() {
  return (
    <div className="relative overflow-hidden bg-[#002D54] px-6 py-3 flex items-center justify-center gap-3 rounded-md shadow-sm h-14">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rotate-45 border-2 border-white/80 flex items-center justify-center relative">
          <div className="absolute w-2 h-2 bg-[#FFCC00] rounded-full" />
        </div>
        <span className="font-sans font-black text-white text-xl tracking-tight leading-none">Pesalink</span>
      </div>
    </div>
  );
}

export function PayQuikLogo() {
  return (
    <div className="flex items-center justify-center h-14 px-4 py-2 bg-white rounded-md shadow-sm">
      <img 
        src="/pay-quick-logo.png" 
        alt="PayQuik Digital Money Transfer" 
        className="max-h-10 w-auto object-contain"
      />
    </div>
  );
}
