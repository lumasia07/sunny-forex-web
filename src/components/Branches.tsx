import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiveBlock, LiveWords } from './LiveText';
import { splitGridMotion } from './SplitColumnsReveal';
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#FAF9F5] overflow-hidden border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Centered Section Header */}
        <div className="mb-16 max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="w-12 h-px bg-[#7A1220] mb-5" />
          <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4 font-bold tracking-tight text-gray-900">
            <LiveWords text="Our Branches" variant="neutral" />
          </h2>
          <LiveBlock className="type-lead text-gray-500 max-w-xl font-light font-figtree" variant="neutral" inline={false}>
            Strategically located in Nairobi's key areas.
          </LiveBlock>
        </div>

        {/* Improved Cards Grid */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              {...splitGridMotion(index)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-gradient-to-b from-[#8A1625] via-[#5C0D18] to-[#120406] border border-white/10 hover:border-white/20 hover:shadow-[0_30px_60px_rgba(122,18,32,0.15)] rounded-[2rem] p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group h-[210px] cursor-default text-left"
            >
              {/* Tech Grid Pattern Inside Card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none z-0 opacity-20" />
              
              {/* Ambient Hover Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="z-10 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <span className="text-[9px] font-bold text-white/90 bg-white/10 border border-white/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {branch.hours}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#D4A24C] transition-colors leading-snug font-figtree">
                  {branch.name}
                </h3>
                <p className="text-xs text-white/70 font-light mt-1.5 font-figtree">
                  {branch.area}
                </p>
              </div>

              <div className="flex items-center justify-end mt-4 z-10 relative">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#D4A24C] hover:text-[#e5ba65] flex items-center gap-1 transition-all duration-300 font-figtree group/link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Get directions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Centered CTA Button below cards */}
        <div className="flex justify-center mt-12">
          <Link
            to="/branches"
            className="inline-flex items-center gap-3.5 rounded-full bg-[#7A1220] px-7 py-3.5 font-figtree text-sm font-bold text-white shadow-lg hover:bg-[#5C0D18] hover:shadow-[#7A1220]/20 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            View all branches
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A1220] group-hover:translate-x-0.5 transition-transform duration-300">
              <ArrowRight size={13} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
