import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Send, ShieldCheck, Zap, ArrowUpRight, TrendingUp } from 'lucide-react';

interface HubNode {
  id: string;
  name: string;
  code: string;
  flagUrl: string;
  x: number; // percentage in perspective map
  y: number;
  corridor: string;
  speed: string;
}

const GLOBAL_HUBS: HubNode[] = [
  {
    id: 'nairobi',
    name: 'Nairobi, Kenya',
    code: 'KES',
    flagUrl: 'https://flagcdn.com/w40/ke.png',
    x: 54,
    y: 56,
    corridor: 'Main Headquarters & CBK Hub',
    speed: 'Instant Settlement'
  },
  {
    id: 'london',
    name: 'London, UK',
    code: 'GBP',
    flagUrl: 'https://flagcdn.com/w40/gb.png',
    x: 46,
    y: 32,
    corridor: 'UK - East Africa Corridor',
    speed: '< 60 Seconds'
  },
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    code: 'AED',
    flagUrl: 'https://flagcdn.com/w40/ae.png',
    x: 60,
    y: 44,
    corridor: 'Gulf Cooperation Council',
    speed: 'Instant M-Pesa'
  },
  {
    id: 'ny',
    name: 'New York, USA',
    code: 'USD',
    flagUrl: 'https://flagcdn.com/w40/us.png',
    x: 24,
    y: 36,
    corridor: 'North America Remittance',
    speed: 'Real-time ACH/Wire'
  },
  {
    id: 'frankfurt',
    name: 'Frankfurt, EU',
    code: 'EUR',
    flagUrl: 'https://flagcdn.com/w40/eu.png',
    x: 49,
    y: 35,
    corridor: 'Eurozone SEPA Corridor',
    speed: 'Direct Transfer'
  },
  {
    id: 'mumbai',
    name: 'Mumbai, India',
    code: 'INR',
    flagUrl: 'https://flagcdn.com/w40/in.png',
    x: 68,
    y: 48,
    corridor: 'South Asia Trade Corridor',
    speed: 'Instant IMPS'
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    code: 'AUD',
    flagUrl: 'https://flagcdn.com/w40/au.png',
    x: 85,
    y: 72,
    corridor: 'Asia-Pacific Corridor',
    speed: 'Real-time Payout'
  }
];

export function GlobalNetworkMap() {
  const [activeHub, setActiveHub] = useState<HubNode>(GLOBAL_HUBS[0]);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#FAF9F5] via-slate-900 to-[#0F0F10] text-white pt-16 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
      
      {/* Background Subtle Tech Mesh & Ambient Lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute top-[10%] left-[25%] w-[400px] h-[400px] rounded-full bg-[#7A1220]/20 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[25%] w-[400px] h-[400px] rounded-full bg-[#D4A24C]/15 blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1220]/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-[#9E1B2D]/60 shadow-lg">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Worldwide Financial Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-figtree">
              Connecting Kenya to the global economy.
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed font-figtree">
              Seamless cross-border liquidity corridors spanning over 50+ countries with instant M-Pesa and local bank delivery.
            </p>
          </div>

          {/* Quick Hub Badge */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-2xl flex items-center gap-4 shrink-0 shadow-xl backdrop-blur-md">
            <div className="w-11 h-11 rounded-xl bg-[#006B3F]/30 border border-[#006B3F]/60 flex items-center justify-center text-emerald-400">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400 font-semibold uppercase">Global Corridor Speed</p>
              <p className="text-sm font-bold text-white font-mono">Average &lt; 60 Seconds</p>
            </div>
          </div>
        </div>

        {/* High-Definition 3D Perspective Dotted World Map Canvas */}
        <div className="relative w-full rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden min-h-[460px] lg:min-h-[580px] flex flex-col justify-between">
          
          {/* HD Dotted World Map Graphic with 3D Perspective Tilt */}
          <div className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] flex items-center justify-center">
            
            {/* SVG 3D Perspective Dotted Map */}
            <div className="w-full h-full relative transform lg:rotate-x-[18deg] transition-transform duration-700">
              
              <svg 
                viewBox="0 0 1000 500" 
                className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                style={{ filter: 'contrast(1.15) brightness(1.05)' }}
              >
                <defs>
                  {/* Glowing Corridor Gradient Lines */}
                  <linearGradient id="arcUsKe" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D4A24C" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#7A1220" stopOpacity="1" />
                    <stop offset="100%" stopColor="#006B3F" stopOpacity="0.9" />
                  </linearGradient>
                  
                  <linearGradient id="arcEuKe" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#D4A24C" stopOpacity="1" />
                  </linearGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* 3D Dotted Perspective Continents Pattern */}
                <g className="fill-slate-700/60 transition-colors duration-500">
                  {/* North America Dotted Mesh */}
                  <path d="M120 100 h120 v60 h-120 z M180 160 h100 v80 h-100 z" fill="none" />
                  {/* Continent Dots */}
                  {[
                    // North America
                    [150, 110], [180, 115], [210, 110], [240, 120], [270, 125],
                    [160, 135], [190, 140], [220, 145], [250, 140], [280, 150],
                    [170, 165], [200, 170], [230, 175], [260, 170],
                    [210, 195], [230, 205], [240, 220],
                    // South America
                    [280, 260], [300, 275], [320, 290], [330, 310], [340, 330],
                    [310, 350], [320, 370], [300, 390],
                    // Europe
                    [460, 110], [480, 105], [500, 115], [520, 120],
                    [450, 130], [470, 135], [490, 140], [510, 145],
                    // Africa & Kenya Nairobi Center
                    [480, 190], [500, 195], [520, 200], [540, 205],
                    [470, 220], [490, 230], [510, 240], [530, 250], [550, 245],
                    [480, 270], [500, 280], [520, 290], [540, 280],
                    [500, 320], [510, 340],
                    // Asia
                    [580, 120], [610, 115], [640, 125], [670, 130], [700, 135], [730, 140],
                    [600, 150], [630, 155], [660, 160], [690, 165], [720, 170], [750, 175],
                    [620, 185], [650, 190], [680, 195], [710, 200], [740, 205],
                    [640, 225], [670, 230], [700, 240],
                    // Australia
                    [800, 330], [830, 325], [860, 335],
                    [810, 355], [840, 360], [870, 350],
                    [820, 380], [850, 375]
                  ].map(([cx, cy], i) => (
                    <circle 
                      key={i} 
                      cx={cx} 
                      cy={cy} 
                      r={3.2} 
                      className="fill-slate-600/80 hover:fill-amber-400 transition-colors duration-300" 
                    />
                  ))}

                  {/* Dense Dotted Grid Arrays to recreate HD dotted texture matching reference */}
                  {Array.from({ length: 35 }).map((_, rIdx) => (
                    <g key={rIdx}>
                      {Array.from({ length: 65 }).map((_, cIdx) => {
                        const cx = 100 + cIdx * 13.5;
                        const cy = 80 + rIdx * 11;
                        
                        // Mask logic to form continent shapes roughly
                        const isLand = 
                          (cx > 140 && cx < 300 && cy > 90 && cy < 230) || // North America
                          (cx > 270 && cx < 360 && cy > 250 && cy < 410) || // South America
                          (cx > 440 && cx < 550 && cy > 90 && cy < 160) || // Europe
                          (cx > 450 && cx < 580 && cy > 180 && cy < 360) || // Africa
                          (cx > 560 && cx < 790 && cy > 100 && cy < 260) || // Asia
                          (cx > 780 && cx < 900 && cy > 310 && cy < 410);   // Australia

                        if (!isLand) return null;

                        return (
                          <circle
                            key={`${rIdx}-${cIdx}`}
                            cx={cx}
                            cy={cy}
                            r={2.2}
                            className="fill-slate-600/70"
                          />
                        );
                      })}
                    </g>
                  ))}
                </g>

                {/* Animated Perspective Remittance Transfer Arcs to Nairobi Hub */}
                {/* Arc 1: New York -> Nairobi */}
                <path
                  d="M 240 180 Q 380 90 540 280"
                  fill="none"
                  stroke="url(#arcUsKe)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  filter="url(#glow)"
                  className="animate-pulse"
                />

                {/* Arc 2: London -> Nairobi */}
                <path
                  d="M 460 160 Q 500 200 540 280"
                  fill="none"
                  stroke="url(#arcEuKe)"
                  strokeWidth="2.5"
                  filter="url(#glow)"
                />

                {/* Arc 3: Dubai -> Nairobi */}
                <path
                  d="M 600 220 Q 570 240 540 280"
                  fill="none"
                  stroke="#D4A24C"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Arc 4: Mumbai -> Nairobi */}
                <path
                  d="M 680 240 Q 610 260 540 280"
                  fill="none"
                  stroke="#006B3F"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />

                {/* Arc 5: Sydney -> Nairobi */}
                <path
                  d="M 850 360 Q 700 340 540 280"
                  fill="none"
                  stroke="#7A1220"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* Glowing Nairobi Hub Focal Beacon */}
                <g transform="translate(540, 280)">
                  <circle r="18" className="fill-[#7A1220]/40 animate-ping" />
                  <circle r="12" className="fill-[#D4A24C]/60 animate-pulse" />
                  <circle r="6" className="fill-amber-300" />
                </g>
              </svg>

              {/* Interactive Hub Node Pins */}
              {GLOBAL_HUBS.map((hub) => {
                const isActive = activeHub.id === hub.id;
                return (
                  <div
                    key={hub.id}
                    onClick={() => setActiveHub(hub)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse Ring */}
                      <span className={`absolute w-8 h-8 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-amber-400/40 animate-ping' : 'bg-slate-700/30 group-hover:bg-[#7A1220]/40'
                      }`} />

                      {/* Flag Badge */}
                      <div className={`relative w-8 h-8 rounded-full p-0.5 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#7A1220] ring-4 ring-amber-400/60 scale-125 z-40' 
                          : 'bg-slate-800 border border-slate-600 group-hover:scale-110'
                      }`}>
                        <img
                          src={hub.flagUrl}
                          alt={hub.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Hub Card & Corridor Insights */}
          <div className="relative z-20 mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7A1220]/40 border border-[#9E1B2D]/60 flex items-center justify-center text-amber-300 shrink-0">
                <img src={activeHub.flagUrl} alt="" className="w-7 h-7 object-cover rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-figtree">
                    {activeHub.name} ({activeHub.code})
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[11px] font-semibold rounded-md flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {activeHub.speed}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeHub.corridor}
                </p>
              </div>
            </div>

            {/* Hub Direct Action */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a
                href="/#rates-calculator"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#7A1220] hover:bg-[#8F1626] text-white text-xs font-semibold rounded-xl shadow-md transition-all hover:shadow"
              >
                <span>Transfer via {activeHub.code} Corridor</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
