import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, Building2, ShieldCheck, Phone, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiveBlock, LiveWords } from './LiveText';
import { splitGridMotion } from './SplitColumnsReveal';
import { fetchFromApi } from '../lib/api';

const defaultBranches = [
  {
    name: 'Lavington Branch (HQ)',
    area: 'Lavington',
    address: 'Lavington Avenue Complex G/F, James Gichuru Road',
    phone: '+254 722 590 049',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Lavington+Nairobi',
    flagship: true,
  },
  {
    name: 'Kilimani Branch',
    area: 'Kilimani',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Kilimani+Nairobi',
    flagship: false,
  },
  {
    name: 'Valley Arcade Branch',
    area: 'Lavington',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Valley+Arcade+Nairobi',
    flagship: false,
  },
  {
    name: 'GTC Mall Branch',
    area: 'Westlands',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+GTC+Mall+Nairobi',
    flagship: false,
  },
  {
    name: 'Village Market New Wing Branch',
    area: 'Gigiri / Limuru Road',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Village+Market+Nairobi',
    flagship: false,
  },
  {
    name: 'Village Market Old Wing Branch',
    area: 'Gigiri / Limuru Road',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Village+Market+Nairobi',
    flagship: false,
  },
  {
    name: 'Runda Branch',
    area: 'Runda / Kiambu Road',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Runda+Nairobi',
    flagship: false,
  },
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
            address: b.address,
            phone: b.phone,
            hours: b.hours,
            mapUrl: b.map_url,
            flagship: b.name.includes('HQ') || b.name.toLowerCase().includes('lavington')
          }));

          // Sort so HQ is always first
          formatted.sort((a, b) => (b.flagship ? 1 : 0) - (a.flagship ? 1 : 0));
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

  const hqBranch = branches.find(b => b.flagship) || branches[0];
  const regularBranches = branches.filter(b => b.name !== hqBranch?.name);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#FAF9F5] overflow-hidden border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Centered Section Header */}
        <div className="mb-14 max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="w-12 h-px bg-[#7A1220] mb-5" />
          <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4 font-bold tracking-tight text-gray-900">
            <LiveWords text="Our Branches" variant="neutral" />
          </h2>
          <LiveBlock className="type-lead text-gray-500 max-w-xl font-light font-figtree" variant="neutral" inline={false}>
            Strategically located across Nairobi's premier commercial and retail hubs.
          </LiveBlock>
        </div>

        {/* 1. PROMINENT BIGGER HQ CARD (FULL WIDTH ON TOP) */}
        {hqBranch && (
          <motion.div
            style={{ y: gridY }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-[#8A1625] via-[#5C0D18] to-[#140407] border-2 border-white/20 hover:border-amber-400/50 shadow-[0_30px_70px_rgba(122,18,32,0.25)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group text-left transition-all duration-500">
              
              {/* Subtle Ambient Glows */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none z-0" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                
                <div className="max-w-2xl">
                  {/* Flagship Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-5 shadow-sm backdrop-blur-sm">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Executive Flagship & Headquarters</span>
                  </div>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md">
                      <Building2 className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-figtree">
                        {hqBranch.name}
                      </h3>
                      <p className="text-xs md:text-sm font-semibold text-amber-300/90 mt-0.5">
                        Central Corporate Hub · {hqBranch.area}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-white/80 font-light mt-4 leading-relaxed font-figtree">
                    {hqBranch.address || 'Lavington Avenue Complex G/F, James Gichuru Road, Nairobi'}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-white/90">
                    <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-bold">{hqBranch.phone || '+254 722 590 049'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{hqBranch.hours}</span>
                    </div>
                  </div>
                </div>

                {/* HQ Action CTA */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                  <a
                    href={hqBranch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-[#7A1220] px-7 py-3.5 font-figtree text-sm font-bold shadow-xl hover:bg-[#FAF9F5] hover:scale-105 transition-all duration-300 group/btn"
                  >
                    <span>Get directions to HQ</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>

                  <Link
                    to="/branches"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 font-figtree text-xs font-semibold transition-all duration-300"
                  >
                    <span>View Branch Page</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                  </Link>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* 2. BALANCED 6-CARD GRID FOR OTHER BRANCHES */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {regularBranches.map((branch, index) => (
            <motion.div
              key={branch.name}
              {...splitGridMotion(index)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-gradient-to-b from-[#8A1625] via-[#5C0D18] to-[#120406] border border-white/10 hover:border-white/20 hover:shadow-[0_30px_60px_rgba(122,18,32,0.15)] rounded-[2rem] p-7 flex flex-col justify-between transition-all duration-500 relative overflow-hidden group min-h-[200px] cursor-default text-left"
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
