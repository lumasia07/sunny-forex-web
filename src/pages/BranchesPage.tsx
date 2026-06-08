import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { MapPin, Phone, Clock, Compass, ArrowRight, ExternalLink } from 'lucide-react';

const branches = [
  {
    id: 0,
    name: 'Kilimani Branch',
    area: 'Kilimani',
    address: 'Woodridge Centre, Wood Avenue, Kilimani, Nairobi',
    phone: '+254 722 350 400',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Woodridge+Centre+Wood+Avenue+Kilimani+Nairobi',
    x: 45, // Map Coordinate Percentages
    y: 55,
  },
  {
    id: 1,
    name: 'Valley Arcade Branch',
    area: 'Lavington',
    address: 'Valley Arcade Shopping Mall, Gitanga Road, Lavington, Nairobi',
    phone: '+254 722 360 800',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Valley+Arcade+Shopping+Mall+Gitanga+Road+Lavington+Nairobi',
    x: 25,
    y: 65,
  },
  {
    id: 2,
    name: 'GTC Mall Branch',
    area: 'Westlands',
    address: 'GTC Mall, Chiromo Lane, Westlands, Nairobi',
    phone: '+254 722 305 188',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=GTC+Mall+Chiromo+Lane+Westlands+Nairobi',
    x: 55,
    y: 42,
  },
  {
    id: 3,
    name: 'Village Market New Wing',
    area: 'Gigiri / Limuru Road',
    address: 'Village Market Mall – New Wing G/F, Limuru Road, Nairobi',
    phone: '+254 718 040 847',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Village+Market+Mall+New+Wing+Limuru+Road+Nairobi',
    x: 48,
    y: 20,
  },
  {
    id: 4,
    name: 'Village Market Old Wing',
    area: 'Gigiri / Limuru Road',
    address: 'Village Market Mall – Old Wing G/F, Limuru Road, Nairobi',
    phone: '+254 722 454 757',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Village+Market+Mall+Old+Wing+Limuru+Road+Nairobi',
    x: 44,
    y: 23,
  },
  {
    id: 5,
    name: 'Runda Branch',
    area: 'Runda / Kiambu Road',
    address: 'Runda Mall G/F, Kiambu Road, Nairobi',
    phone: '+254 722 109 594',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Runda+Mall+Kiambu+Road+Nairobi',
    x: 72,
    y: 18,
  },
  {
    id: 6,
    name: 'Lavington Branch (HQ)',
    area: 'Lavington',
    address: 'Lavington Avenue Complex G/F, James Gichuru Road, Nairobi',
    phone: '+254 722 590 049',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: true,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lavington+Avenue+Complex+James+Gichuru+Road+Nairobi',
    x: 22,
    y: 50,
  },
];

export function BranchesPage() {
  const [selectedBranchId, setSelectedBranchId] = useState(6);

  const selectedBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  return (
    <>
      <PageHero
        eyebrow="Branch Network"
        title="7 branches. All across Nairobi."
        description="Strategically located in Nairobi's premier retail and commercial hubs. Open 365 days a year to serve you with zero hassle."
        imageSrc="/pexels-sergey-pesterev-69811391-8427984.jpg"
        imageAlt="Nairobi physical branches"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Branches' },
        ]}
      />

      {/* Main Section — tight padding */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#FAFAF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Interactive Vector Map Card (lg:col-span-5, sticky for scrolling) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-[2rem] bg-[#0E0E0E] text-white border border-white/5 p-6 sm:p-8 flex flex-col justify-between h-[450px] sm:h-[520px] shadow-2xl relative overflow-hidden select-none">
                
                {/* Glowing ambient light background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A1220]/20 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#006B3F]/5 blur-[80px]" />
                
                {/* Title block */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1.5 text-[#D4A24C]">
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em]">Interactive Locator</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Nairobi Branch Map</h3>
                </div>

                {/* Styled Vector Map Grid Area */}
                <div className="relative w-full h-[220px] sm:h-[280px] rounded-2xl bg-white/[0.02] border border-white/5 my-5 overflow-hidden flex items-center justify-center">
                  
                  {/* Subtle vector-like grid lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                  
                  {/* Stylized Nairobi Ring Road paths (decorative SVG) */}
                  <svg className="absolute inset-0 w-full h-full text-white/5 stroke-current fill-none" viewBox="0 0 200 200" strokeWidth="0.75" strokeLinecap="round">
                    <circle cx="100" cy="100" r="70" strokeDasharray="3, 3" />
                    <circle cx="100" cy="100" r="45" />
                    <path d="M20 50 Q100 80 180 50" />
                    <path d="M50 20 Q100 120 150 180" />
                  </svg>

                  {/* Dynamic Pulsing Pins on Map */}
                  {branches.map((branch) => {
                    const isSelected = branch.id === selectedBranchId;
                    return (
                      <button
                        key={branch.id}
                        onClick={() => setSelectedBranchId(branch.id)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-transform duration-300 hover:scale-125 z-20"
                        style={{ left: `${branch.x}%`, top: `${branch.y}%` }}
                      >
                        {/* Pulse circle */}
                        <span className={`absolute -inset-2.5 rounded-full blur-[2px] transition-all duration-500 ${
                          isSelected ? 'bg-[#7A1220]/45 scale-125 animate-ping' : 'bg-white/10 group-hover:bg-white/20'
                        }`} />
                        {/* Core pin */}
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border shadow-md transition-colors ${
                          isSelected ? 'bg-[#7A1220] border-[#D4A24C] text-white' : 'bg-white border-white/15 text-[#0E0E0E]'
                        }`}>
                          <MapPin className="w-2.5 h-2.5" strokeWidth={3} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Floating Selected Branch glassmorphism detail popup */}
                <div className="relative z-10 pt-4 border-t border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedBranch.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#D4A24C] bg-[#D4A24C]/10 px-2 py-0.5 rounded-full">
                          {selectedBranch.area}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1.5">{selectedBranch.name}</h4>
                        <p className="text-[10px] text-white/50 font-light mt-0.5">{selectedBranch.phone}</p>
                      </div>
                      
                      <a
                        href={selectedBranch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full pl-4 pr-1 py-1 text-[10px] uppercase font-bold tracking-wider transition-colors group"
                      >
                        <span>Navigate</span>
                        <span className="w-6 h-6 rounded-full bg-white text-[#0E0E0E] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                          <ExternalLink className="w-3.5 h-3.5 text-[#0E0E0E]" />
                        </span>
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>

            {/* Right Column: Detailed branch cards listing (lg:col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {branches.map((branch) => {
                const isSelected = branch.id === selectedBranchId;
                return (
                  <motion.div
                    key={branch.name}
                    onClick={() => setSelectedBranchId(branch.id)}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`relative flex flex-col p-6 sm:p-8 rounded-[2rem] border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-[#7A1220]/50 bg-white shadow-xl ring-1 ring-[#7A1220]/15'
                        : 'border-gray-200 bg-white shadow-sm hover:border-[#7A1220]/20 hover:shadow-md'
                    }`}
                  >
                    {branch.flagship && (
                      <span className="absolute top-6 right-6 text-[9px] font-bold tracking-[0.25em] uppercase text-[#7A1220] bg-[#7A1220]/10 px-3 py-1 rounded-full">
                        Flagship
                      </span>
                    )}

                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isSelected ? 'bg-[#7A1220]/10 border-[#7A1220]/30 text-[#7A1220]' : 'bg-gray-50 border-gray-150 text-gray-400'
                      }`}>
                        <MapPin className="w-4.5 h-4.5" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-lg font-bold text-[#0E0E0E] leading-tight">
                          {branch.name}
                        </h3>
                        <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">
                          {branch.area}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm font-light text-gray-500 mt-4 mb-6 flex-grow">
                      <p className="leading-relaxed text-gray-600">{branch.address}</p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={2} />
                        <span className="font-normal text-gray-700">{branch.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={2} />
                        <span className="font-light text-gray-500">{branch.hours}</span>
                      </p>
                    </div>

                    {/* Premium action buttons with Arrow-in-div designs */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-between items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-[#7A1220]/5 text-[#7A1220] hover:bg-[#7A1220] hover:text-white font-bold text-[10px] uppercase tracking-wider transition-all group/btn select-none"
                      >
                        <span className="font-semibold">Get directions</span>
                        <span className="w-7 h-7 rounded-full bg-[#7A1220]/10 group-hover/btn:bg-white text-[#7A1220] flex items-center justify-center transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </span>
                      </a>

                      <a
                        href={`tel:${branch.phone.replace(/\s/g, '')}`}
                        className="inline-flex justify-between items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-full bg-gray-50 text-[#0E0E0E] hover:bg-gray-150 font-bold text-[10px] uppercase tracking-wider transition-all group/btn select-none"
                      >
                        <span className="font-semibold">Call branch</span>
                        <span className="w-7 h-7 rounded-full bg-black/5 text-[#0E0E0E] flex items-center justify-center transition-colors">
                          <Phone className="w-3.5 h-3.5 text-gray-600" strokeWidth={2.5} />
                        </span>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      <CtaBand />
    </>
  );
}