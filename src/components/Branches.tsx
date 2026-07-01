import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiveBlock, LiveWords } from './LiveText';
import { SplitColumnsReveal, splitGridMotion } from './SplitColumnsReveal';
import { fetchFromApi } from '../lib/api';

const defaultBranches = [
  {
    name: 'Kilimani Branch',
    area: 'Kilimani',
    hours: '9 AM - 7 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Kilimani+Nairobi'
  },
  {
    name: 'Valley Arcade Branch',
    area: 'Lavington',
    hours: '9 AM - 7 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Valley+Arcade+Nairobi'
  },
  {
    name: 'GTC Mall Branch',
    area: 'Westlands',
    hours: '9 AM - 7 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+GTC+Mall+Nairobi'
  },
  {
    name: 'Village Market New Wing Branch',
    area: 'Gigiri',
    hours: '9 AM - 7 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Village+Market+Nairobi'
  },
  {
    name: 'Village Market Old Wing Branch',
    area: 'Gigiri',
    hours: '9 AM - 7 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Village+Market+Nairobi'
  },
  {
    name: 'Runda Branch',
    area: 'Runda',
    hours: '9 AM - 7 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Runda+Nairobi'
  },
  {
    name: 'Lavington Branch (HQ)',
    area: 'Lavington',
    hours: '9 AM - 7 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Lavington+Nairobi'
  }
];

export function Branches() {
  const [branches, setBranches] = useState<any[]>(defaultBranches);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    fetchFromApi<any[]>('branches')
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map(b => ({
            name: b.name,
            area: b.area,
            hours: b.hours,
            mapUrl: b.map_url
          }));
          setBranches(formatted);
        }
      })
      .catch(err => console.warn('Branches API offline, using fallback:', err));
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const gridY = useTransform(scrollYProgress, [0.1, 0.5], [30, 0]);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SplitColumnsReveal
          className="mb-16 items-end"
          gap="gap-6 md:gap-8"
          left={
            <div>
              <motion.span
                initial={{
                  scaleX: 0
                }}
                whileInView={{
                  scaleX: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2
                }}
                className="inline-block w-10 h-px bg-[#7A1220] mb-6 origin-left" />
              
              <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4 text-white">
                <LiveWords text="7 branches. All across Nairobi." variant="neutral" />
              </h2>
              <LiveBlock className="type-lead max-w-md text-gray-400 font-light" variant="dark" inline={false}>
                Strategically located in Nairobi's key areas. Open 365 days a year
                including weekends and public holidays.
              </LiveBlock>
            </div>
          }
          right={
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Link
                to="/branches"
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/10 text-sm font-bold text-white hover:border-[#7A1220]/40 hover:bg-[#7A1220]/10 transition-colors group w-full sm:w-auto justify-center sm:justify-start">
                <LiveBlock className="text-sm font-bold text-white" variant="light">
                  View all branches
                </LiveBlock>
                <span className="w-8 h-8 rounded-full bg-[#7A1220]/20 flex items-center justify-center group-hover:bg-[#7A1220]/30 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          }
        />

        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {branches.map((branch, index) =>
            <motion.div
              key={branch.name}
              {...splitGridMotion(index)}
              whileHover={{ y: -6 }}
              className="bg-gradient-to-br from-[#7A1220] to-[#5C0D18] border border-white/10 hover:border-white/20 hover:shadow-2xl rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group h-[190px] cursor-default"
            >
              {/* Soft background ambient dot */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {branch.hours}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#D4A24C] transition-colors leading-snug">
                  {branch.name}
                </h3>
                <p className="text-xs text-white/80 font-light mt-1">
                  {branch.area}
                </p>
              </div>

              <div className="flex items-center justify-end mt-4">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#D4A24C] hover:text-[#e5ba65] flex items-center gap-1 transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Get Directions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
