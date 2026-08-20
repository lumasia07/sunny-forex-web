import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { MapPin, Phone, Clock, Compass, ExternalLink, Layers, Building2, ShieldCheck, MessageCircle } from 'lucide-react';
import { fetchFromApi } from '../lib/api';

const defaultBranches = [
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
];

export function BranchesPage() {
  const [branches, setBranches] = useState<any[]>(defaultBranches);
  const [selectedBranchId, setSelectedBranchId] = useState<number>(6);
  const [mapMode, setMapMode] = useState<'branch' | 'overview'>('branch');

  useEffect(() => {
    fetchFromApi<any[]>('branches')
      .then((data) => {
        if (data && data.length > 0) {
          const formatted = data.map((b, idx) => ({
            id: b.id || idx,
            name: b.name,
            area: b.area,
            address: b.address || `${b.name}, ${b.area}, Nairobi`,
            phone: b.phone || '+254 722 590 049',
            hours: b.hours || 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
            flagship: b.name.includes('HQ') || b.name.toLowerCase().includes('lavington'),
            mapUrl: b.map_url || `https://www.google.com/maps/search/?api=1&query=SunnyRemit+${encodeURIComponent(b.name)}+Nairobi`,
            queryAddress: b.address ? `${b.address}, Kenya` : `${b.name}, ${b.area}, Nairobi, Kenya`,
          }));

          // Sort so HQ is ALWAYS index 0 (at the very top)
          formatted.sort((a, b) => (b.flagship ? 1 : 0) - (a.flagship ? 1 : 0));

          setBranches(formatted);
          if (formatted.length > 0) {
            setSelectedBranchId(formatted[0].id);
          }
        }
      })
      .catch((err) => console.warn('Branches API offline, using default branches:', err));
  }, []);

  const selectedBranch = branches.find((b) => b.id === selectedBranchId) || branches[0] || defaultBranches[0];
  const hqBranch = branches.find((b) => b.flagship) || branches[0];
  const regularBranches = branches.filter((b) => b.id !== hqBranch.id);

  return (
    <>
      <PageHero
        eyebrow="Branch Network"
        title={`${branches.length} branches. All across Nairobi.`}
        description="Strategically located in Nairobi's premier retail and commercial hubs. Open 365 days a year to serve you with zero hassle."
        imageSrc="/pexels-sergey-pesterev-69811391-8427984.jpg"
      />

      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Sticky Interactive Live Google Map Locator (lg:col-span-5) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-gray-200/80 shadow-xl overflow-hidden flex flex-col justify-between relative">
                
                {/* Decorative glow backdrop */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#7A1220]/5 rounded-full blur-3xl pointer-events-none" />

                {/* Header inside Map Card */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-150 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 text-[#7A1220] mb-1">
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A1220]">Interactive Map Locator</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight font-figtree">
                      {mapMode === 'branch' ? selectedBranch.name : 'All 7 Nairobi Hubs'}
                    </h3>
                  </div>

                  {/* Mode Toggle Pills */}
                  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
                    <button
                      onClick={() => setMapMode('branch')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        mapMode === 'branch'
                          ? 'bg-[#7A1220] text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      <span>Selected</span>
                    </button>
                    <button
                      onClick={() => setMapMode('overview')}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                        mapMode === 'overview'
                          ? 'bg-[#7A1220] text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Overview</span>
                    </button>
                  </div>
                </div>

                {/* Bright Live Google Maps Embed Container */}
                <div className="relative z-10 flex-grow my-4 rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100 min-h-[320px]">
                  <iframe
                    key={`${selectedBranch.id}-${mapMode}`}
                    title={`Google Map - ${selectedBranch.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '320px' }}
                    loading="lazy"
                    allowFullScreen
                    src={
                      mapMode === 'branch'
                        ? `https://maps.google.com/maps?q=${encodeURIComponent(selectedBranch.queryAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`
                        : `https://maps.google.com/maps?q=SunnyRemit+Nairobi+Kenya&t=&z=12&ie=UTF8&iwloc=&output=embed`
                    }
                  />
                </div>

                {/* Bottom Details Footer Card inside Map Container */}
                <div className="relative z-10 pt-4 border-t border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">{selectedBranch.address}</p>
                    <p className="text-xs font-bold text-gray-800 mt-0.5">{selectedBranch.hours}</p>
                  </div>

                  <a
                    href={selectedBranch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1220] text-white text-xs font-bold hover:bg-[#5C0D18] transition-colors shrink-0 shadow-md"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent HQ on Top + Branch Grid (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Section Header */}
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#7A1220] flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Headquarters & Branch Network</span>
                </span>
                <span className="text-xs font-bold text-gray-700 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                  {branches.length} Locations in Nairobi
                </span>
              </div>

              {/* 1. PROMINENT BIGGER HQ CARD ON TOP */}
              {hqBranch && (
                <motion.div
                  key={hqBranch.id}
                  onClick={() => {
                    setSelectedBranchId(hqBranch.id);
                    setMapMode('branch');
                  }}
                  whileHover={{ y: -2 }}
                  className={`p-7 sm:p-9 rounded-[2.5rem] border-2 transition-all cursor-pointer text-left relative overflow-hidden shadow-xl ${
                    selectedBranchId === hqBranch.id
                      ? 'bg-gradient-to-br from-white via-white to-amber-500/10 border-[#7A1220] ring-4 ring-[#7A1220]/15'
                      : 'bg-white border-[#7A1220]/40 hover:border-[#7A1220] hover:shadow-2xl'
                  }`}
                >
                  {/* Subtle luxury corner background badge */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-[#7A1220]/10 to-amber-400/10 rounded-full blur-xl pointer-events-none" />

                  {/* Flagship HQ Banner Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7A1220] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                      <span>Executive Flagship & Headquarters</span>
                    </div>

                    {selectedBranchId === hqBranch.id && (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#7A1220] bg-[#7A1220]/10 px-3 py-1 rounded-full">
                        Active on Map
                      </span>
                    )}
                  </div>

                  {/* HQ Title & Area */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7A1220] to-[#5C0D18] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#7A1220]/25">
                        <Building2 className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-figtree tracking-tight">
                          {hqBranch.name}
                        </h4>
                        <p className="text-sm font-semibold text-[#7A1220] mt-0.5 flex items-center gap-1.5">
                          <span>Central Corporate & Retail Hub</span>
                          <span>•</span>
                          <span>{hqBranch.area}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* HQ Address & Details */}
                  <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
                    {hqBranch.address}
                  </p>

                  {/* HQ Info Grid with High Contrast */}
                  <div className="grid sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mb-6 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Direct Line</span>
                        <span className="font-bold text-gray-900 text-sm">{hqBranch.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Opening Hours</span>
                        <span className="font-bold text-gray-800">{hqBranch.hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* HQ Quick Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`tel:${hqBranch.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1220] hover:bg-[#5C0D18] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call HQ Desk</span>
                    </a>

                    <a
                      href={`https://wa.me/${hqBranch.phone?.replace(/[^0-9]/g, '')}?text=Hello%20SunnyRemit%20HQ%2C%20I%20would%20like%20to%20inquire%20about%20rates.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp HQ</span>
                    </a>

                    <a
                      href={hqBranch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition-all"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                    </a>
                  </div>
                </motion.div>
              )}

              {/* 2. SUB-HEADING FOR OTHER NETWORK BRANCHES */}
              <div className="pt-4 flex items-center justify-between px-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Other Nairobi Retail Branches:
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {regularBranches.length} Branch Hubs
                </span>
              </div>

              {/* 3. REGULAR BRANCH CARDS LIST */}
              <div className="space-y-4">
                {regularBranches.map((b) => {
                  const isSelected = b.id === selectedBranchId;
                  return (
                    <motion.div
                      key={b.id}
                      onClick={() => {
                        setSelectedBranchId(b.id);
                        setMapMode('branch');
                      }}
                      whileHover={{ scale: 1.01 }}
                      className={`p-6 sm:p-7 rounded-[2rem] border transition-all cursor-pointer text-left relative overflow-hidden ${
                        isSelected
                          ? 'bg-white border-[#7A1220] shadow-xl ring-2 ring-[#7A1220]/20'
                          : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#7A1220] text-white shadow-md'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 font-figtree">
                              {b.name}
                            </h4>
                            <span className="text-xs text-gray-500 font-medium block mt-0.5">
                              {b.area}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="flex items-center gap-1 text-xs font-bold text-[#7A1220] bg-[#7A1220]/10 px-3 py-1 rounded-full shrink-0">
                            Active Map
                          </span>
                        )}
                      </div>

                      <div className="mt-5 pt-4 border-t border-gray-100 grid sm:grid-cols-2 gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#7A1220] shrink-0" />
                          <span className="truncate">{b.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{b.phone}</span>
                        </div>
                        <div className="sm:col-span-2 flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{b.hours}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </section>

      <CtaBand />
    </>
  );
}
