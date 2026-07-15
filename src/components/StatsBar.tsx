import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, ShieldCheck, Zap, MapPin } from 'lucide-react';

function CountUp({ to, duration = 1.5, suffix = '' }: { to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const isFloat = to % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = to;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const intervalTime = 25; // Update every 25ms
    const totalSteps = totalMiliseconds / intervalTime;
    const increment = end / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount((prev) => {
          const next = prev + increment;
          return next >= end ? end : next;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, to, duration]);

  const displayVal = isFloat ? count.toFixed(1) : Math.floor(count);

  return (
    <span ref={ref}>
      {displayVal}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Globe,
    targetValue: 50,
    suffix: '+',
    label: 'Global corridors',
    color: '#7A1220',
    glowColor: 'rgba(122, 18, 32, 0.25)',
  },
  {
    icon: ShieldCheck,
    targetValue: 18,
    suffix: '+',
    label: 'Years of trust',
    color: '#D4A24C',
    glowColor: 'rgba(212, 162, 76, 0.25)',
  },
  {
    icon: Zap,
    targetValue: 99.9,
    suffix: '%',
    label: 'Success rate',
    color: '#006B3F',
    glowColor: 'rgba(0, 107, 63, 0.25)',
  },
  {
    icon: MapPin,
    targetValue: 7,
    suffix: '',
    label: 'Nairobi branches',
    color: '#7A1220',
    glowColor: 'rgba(122, 18, 32, 0.25)',
  },
];

export function StatsBar() {
  return (
    <div className="relative w-full z-30 px-4 sm:px-6 md:px-8 lg:px-12 -mt-4 sm:-mt-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0F0F10] via-[#161618] to-[#0A0A0B] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] p-6 sm:p-8 md:p-10 relative overflow-hidden group/container"
      >
        {/* Subtle Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0 rounded-2xl sm:rounded-3xl" />
        
        {/* Ambient Glows */}
        <div className="absolute top-[-30%] left-[20%] w-[200px] h-[200px] rounded-full bg-[#7A1220]/10 blur-[80px] pointer-events-none z-0" />
        <div className="absolute bottom-[-30%] right-[20%] w-[200px] h-[200px] rounded-full bg-[#D4A24C]/10 blur-[80px] pointer-events-none z-0" />

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center text-center p-2 md:px-6 ${
                  index >= 2 ? 'pt-8 md:pt-2' : ''
                } ${index % 2 === 1 ? 'border-t-0' : ''}`}
              >
                {/* Glowing Icon Wrapper */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-3 shadow-md relative group/icon overflow-hidden transition-all duration-300"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {/* Hover ambient color glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 filter blur-sm"
                    style={{ backgroundColor: stat.glowColor }}
                  />
                  <Icon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/icon:scale-110" style={{ color: stat.color }} strokeWidth={2} />
                </div>
                
                {/* Stat value (Animated Counter) */}
                <div className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90 tracking-tight leading-none mb-2 tabular-nums group-hover/container:from-white group-hover/container:to-[#D4A24C] transition-all duration-500">
                  <CountUp to={stat.targetValue} suffix={stat.suffix} />
                </div>
                
                {/* Wordings below (lowercase / sentence case) */}
                <p className="text-xs sm:text-sm text-gray-400 font-light font-figtree">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
