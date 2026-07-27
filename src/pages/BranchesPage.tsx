import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { MapPin, Phone, Clock, Compass, ArrowRight, ExternalLink, Map as MapIcon, Layers } from 'lucide-react';

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
    queryAddress: 'Woodridge Centre, Wood Avenue, Kilimani, Nairobi, Kenya',
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
    queryAddress: 'Valley Arcade Shopping Mall, Gitanga Road, Lavington, Nairobi, Kenya',
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
    queryAddress: 'GTC Mall, Chiromo Lane, Westlands, Nairobi, Kenya',
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
    queryAddress: 'Village Market Mall, Limuru Road, Nairobi, Kenya',
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
    queryAddress: 'Village Market Mall, Limuru Road, Nairobi, Kenya',
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
    queryAddress: 'Runda Mall, Kiambu Road, Nairobi, Kenya',
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
    queryAddress: 'Lavington Avenue Complex, James Gichuru Road, Nairobi, Kenya',
  },
];

export function BranchesPage() {
  const [selectedBranchId, setSelectedBranchId] = useState(6);
  const [mapMode, setMapMode] = useState<'branch' | 'overview'>('branch');

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

      {/* Main Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#FAFAF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Clean Bright Interactive Map Card (lg:col-span-5, sticky for scrolling) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-[2rem] bg-white border border-gray-200 p-6 sm:p-7 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] shadow-xl relative overflow-hidden select-none">
                
                {/* Title block & Mode Switcher */}
                <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-gray-150">
                  <div className="text-left">
                    <div className="flex items-center gap-2 text-[#7A1220] mb-1">
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">
                        {mapMode === 'branch' ? 'Branch Location' : 'Nairobi Overview'}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight font-figtree">
                      {mapMode === 'branch' ? selectedBranch.name : 'All 7 Nairobi Branches'}
                    </h3>
                  </div>

                  {/* Toggle between Branch Focus and Nairobi Overview */}
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-gray-250 text-xs shrink-0">
                    <button
                      onClick={() => setMapMode('branch')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                        mapMode === 'branch' ? 'bg-[#7A1220] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <MapIcon className="w-3.5 h-3.5" />
                      <span>Branch</span>
                    </button>
                    <button
                      onClick={() => setMapMode('overview')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                        mapMode === 'overview' ? 'bg-[#7A1220] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Overview</span>
                    </button>
                  </div>
                </div>

                {/* Bright, Clear, High-Definition Interactive Map Embed Canvas */}
                <div className="relative w-full h-[300px] sm:h-[360px] rounded-2xl bg-gray-100 border border-gray-200 my-4 overflow-hidden shadow-inner">
                  
                  {mapMode === 'branch' ? (
                    /* Clear HD Street Map Focused directly on Selected Branch */
                    <iframe
                      title={`Street map of ${selectedBranch.name}`}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedBranch.queryAddress)}&t=m&z=16&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0 contrast-[1.03] saturate-[1.05]"
                      loading="lazy"
                    />
                  ) : (
                    /* Clear HD Overview Map Showing All Nairobi Locations */
                    <iframe
                      title="Nairobi Metropolitan Branch Overview Map"
                      src={`https://maps.google.com/maps?q=SunnyRemit+Forex+Nairobi+Kenya&t=m&z=12&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0 contrast-[1.03] saturate-[1.05]"
                      loading="lazy"
                    />
                  )}

                </div>

                {/* Selected Branch Quick Bar */}
                <div className="relative z-10 pt-3 border-t border-gray-150 text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedBranch.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7A1220] bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-mono">
                            {selectedBranch.area}
                          </span>
                          <span className="text-xs text-gray-500 font-light">• Open Today</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mt-1 truncate font-figtree">{selectedBranch.name}</h4>
                        <p className="text-xs text-gray-600 font-light truncate mt-0.5">{selectedBranch.address}</p>
                      </div>
                      
                      <a
                        href={selectedBranch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-[#7A1220] hover:bg-[#8F1626] text-white rounded-full pl-3.5 pr-1 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-colors shrink-0 shadow-sm"
                      >
                        <span>Directions</span>
                        <span className="w-6 h-6 rounded-full bg-white text-[#7A1220] flex items-center justify-center">
                          <ExternalLink className="w-3.5 h-3.5" />
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
                    onClick={() => {
                      setSelectedBranchId(branch.id);
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className={`relative flex flex-col p-6 sm:p-8 rounded-[2rem] border transition-all cursor-pointer select-none ${
                      isSelected
                        ? 'border-[#7A1220] bg-white shadow-xl ring-2 ring-[#7A1220]/20'
                        : 'border-gray-200 bg-white shadow-sm hover:border-[#7A1220]/30 hover:shadow-md'
                    }`}
                  >
                    {branch.flagship && (
                      <span className="absolute top-6 right-6 text-[9px] font-bold tracking-[0.25em] uppercase text-[#7A1220] bg-[#7A1220]/10 px-3 py-1 rounded-full border border-[#7A1220]/20 font-mono">
                        Flagship
                      </span>
                    )}

                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isSelected ? 'bg-[#7A1220] border-[#7A1220] text-white shadow-md' : 'bg-gray-50 border-gray-150 text-gray-400'
                      }`}>
                        <MapPin className="w-4.5 h-4.5" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col text-left">
                        <h3 className="text-lg font-bold text-[#0E0E0E] leading-tight font-figtree">
                          {branch.name}
                        </h3>
                        <span className="text-[10px] text-[#7A1220] font-bold tracking-widest uppercase mt-0.5 font-mono">
                          {branch.area}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm font-light text-gray-600 mt-4 mb-6 flex-grow text-left">
                      <p className="leading-relaxed text-gray-800 font-medium">{branch.address}</p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#7A1220] shrink-0" strokeWidth={2} />
                        <span className="font-semibold text-gray-900">{branch.phone}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" strokeWidth={2} />
                        <span className="font-light text-gray-500">{branch.hours}</span>
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedBranchId(branch.id);
                          setMapMode('branch');
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="inline-flex justify-between items-center gap-2 px-4 py-2 rounded-full bg-[#7A1220] text-white hover:bg-[#8F1626] font-bold text-[10px] uppercase tracking-wider transition-all shadow-sm"
                      >
                        <MapIcon className="w-3.5 h-3.5" />
                        <span>View Map</span>
                      </button>

                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex justify-between items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold text-[10px] uppercase tracking-wider transition-all"
                      >
                        <span>Google Directions</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`tel:${branch.phone.replace(/\s/g, '')}`}
                        className="inline-flex justify-between items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-800 hover:bg-gray-150 font-bold text-[10px] uppercase tracking-wider transition-all ml-auto"
                      >
                        <Phone className="w-3.5 h-3.5 text-gray-600" />
                        <span>Call Branch</span>
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