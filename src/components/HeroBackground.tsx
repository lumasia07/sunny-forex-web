import React from 'react';

/** Subtle 3D-style decor — low opacity so the page stays bright white */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Soft grid floor (etail-style tiles) */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(14, 14, 14, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 14, 14, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, black 20%, transparent 75%)',
          transform: 'perspective(800px) rotateX(58deg) scale(1.4)',
          transformOrigin: '50% 0%',
        }}
      />

      {/* Floating 3D-ish shapes */}
      <div className="absolute -right-8 top-[12%] w-[min(420px,55vw)] h-[min(420px,55vw)] opacity-[0.07]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="sphere-a" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7A1220" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="72" fill="url(#sphere-a)" />
          <ellipse cx="78" cy="72" rx="28" ry="18" fill="white" opacity="0.35" />
        </svg>
      </div>

      <div className="absolute left-[4%] top-[28%] w-32 h-32 md:w-44 md:h-44 rounded-3xl bg-[#7A1220]/[0.06] shadow-[0_24px_60px_rgba(122,18,32,0.08)] rotate-12 blur-[0.5px]" />
      <div className="absolute right-[18%] bottom-[22%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#006B3F]/[0.05] shadow-[0_20px_50px_rgba(0,107,63,0.06)]" />

      {/* Currency coin stack — right */}
      <div className="absolute right-[6%] bottom-[8%] w-[min(200px,28vw)] opacity-[0.12] hidden sm:block">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <ellipse cx="60" cy="95" rx="42" ry="10" fill="#0E0E0E" opacity="0.08" />
          <circle cx="60" cy="52" r="38" fill="#E8E8E8" stroke="#D1D5DB" strokeWidth="2" />
          <circle cx="60" cy="52" r="30" fill="#F5F5F5" stroke="#E5E7EB" strokeWidth="1.5" />
          <text x="60" y="58" textAnchor="middle" fontSize="18" fontWeight="700" fill="#7A1220" fontFamily="system-ui">
            KSh
          </text>
          <circle cx="78" cy="38" r="22" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="1.5" opacity="0.9" />
          <text x="78" y="44" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0E0E0E" fontFamily="system-ui">
            $
          </text>
        </svg>
      </div>

      {/* Abstract exchange arrows */}
      <div className="absolute left-[10%] bottom-[18%] w-28 h-28 opacity-[0.08] hidden md:block">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
          <path
            d="M12 40h40M44 28l12 12-12 12M68 40H28M36 52 24 40l12-12"
            stroke="#7A1220"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Top-left soft blob */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#7A1220]/[0.04] to-transparent blur-3xl" />
      <div className="absolute -right-16 top-1/3 w-96 h-96 rounded-full bg-gradient-to-bl from-[#006B3F]/[0.03] to-transparent blur-3xl" />
    </div>
  );
}
