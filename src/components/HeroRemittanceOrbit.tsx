import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Send, Building2, Smartphone, Wallet } from 'lucide-react';

const nodes = [
  { id: 'us', label: 'USD', flag: '🇺🇸', ring: 1, angle: 20, icon: Send },
  { id: 'eu', label: 'EUR', flag: '🇪🇺', ring: 1, angle: 145, icon: Globe },
  { id: 'uk', label: 'GBP', flag: '🇬🇧', ring: 2, angle: 260, icon: Building2 },
  { id: 'ae', label: 'AED', flag: '🇦🇪', ring: 2, angle: 35, icon: Wallet },
  { id: 'ke', label: 'KES', flag: '🇰🇪', ring: 2, angle: 195, icon: Smartphone },
  { id: 'in', label: 'INR', flag: '🇮🇳', ring: 3, angle: 310, icon: Send },
];

function polarToXY(ring: number, angleDeg: number, radiusBase: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const r = radiusBase * ring * 0.38;
  return {
    x: 50 + Math.cos(rad) * r,
    y: 50 + Math.sin(rad) * r,
  };
}

export function HeroRemittanceOrbit() {
  return (
    <div className="relative w-full max-w-[420px] lg:max-w-none aspect-square mx-auto lg:mx-0 lg:ml-auto">
      {/* Ambient glow */}
      <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-[#7A1220]/10 via-transparent to-[#006B3F]/10 blur-2xl" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-gray-200"
        aria-hidden="true">
        {[1, 2, 3].map((ring) => (
          <circle
            key={ring}
            cx="50"
            cy="50"
            r={14 + ring * 11}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            className="opacity-60"
          />
        ))}
        {/* Connection arcs */}
        <path
          d="M 50 50 Q 72 38 78 52"
          fill="none"
          stroke="#7A1220"
          strokeWidth="0.4"
          opacity="0.25"
        />
        <path
          d="M 50 50 Q 28 62 22 48"
          fill="none"
          stroke="#006B3F"
          strokeWidth="0.4"
          opacity="0.25"
        />
      </svg>

      {/* Center hub — globe + stat */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-dashed border-[#7A1220]/20"
        />
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-[0_8px_40px_rgba(122,18,32,0.15)] border border-gray-100 flex items-center justify-center mb-2">
          <Globe className="w-9 h-9 sm:w-10 sm:h-10 text-[#7A1220]" strokeWidth={1.25} />
        </div>
        <p className="font-display text-2xl sm:text-3xl font-bold text-[#0E0E0E] tracking-tight leading-none">
          50+
        </p>
        <p className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
          Corridors
        </p>
      </div>

      {/* Orbiting remittance nodes */}
      {nodes.map((node, i) => {
        const { x, y } = polarToXY(node.ring, node.angle, 28);
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-lg shadow-black/8 border border-gray-100 flex items-center justify-center text-lg sm:text-xl ring-2 ring-white">
                {node.flag}
              </div>
              <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0E0E0E] text-[9px] font-semibold text-white uppercase tracking-wider">
                <Icon className="w-2.5 h-2.5 text-[#D4A24C]" />
                {node.label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating partner pills */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-[6%] left-[10%] px-2.5 py-1 rounded-full bg-white/90 border border-gray-200 shadow-sm text-[10px] font-semibold text-gray-600">
        MoneyGram
      </motion.div>
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute top-[12%] right-[8%] px-2.5 py-1 rounded-full bg-[#7A1220] text-[10px] font-semibold text-white shadow-md">
        Same day
      </motion.div>
    </div>
  );
}
