import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import {
  MapPin, Phone, Clock, Compass, ExternalLink, Layers,
  Building2, ShieldCheck, MessageCircle, Camera,
  ChevronLeft, ChevronRight, CheckCircle2, Maximize2
} from 'lucide-react';
import { BRANCHES_DATA, BranchInfo, mergeBranchesWithCms } from '../data/branchesData';
import { BranchPhotoLightbox } from '../components/BranchPhotoLightbox';
import { fetchFromApi } from '../lib/api';

export function BranchesPage() {
  const [branches, setBranches] = useState<BranchInfo[]>(BRANCHES_DATA);
  const [selectedBranchId, setSelectedBranchId] = useState<number>(7);
  const [mapMode, setMapMode] = useState<'branch' | 'overview'>('branch');

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxBranch, setLightboxBranch] = useState<BranchInfo | null>(null);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(0);

  const [hqActivePhotoIdx, setHqActivePhotoIdx] = useState(0);

  useEffect(() => {
    fetchFromApi<any[]>('branches')
      .then((data) => {
        if (data && data.length > 0) {
          setBranches(mergeBranchesWithCms(BRANCHES_DATA, data));
        }
      })
      .catch((err) => console.warn('Branches API offline, using local data:', err));
  }, []);

  const selectedBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];
  const hqBranch = branches.find((b) => b.flagship) || branches[0];
  const regularBranches = branches.filter((b) => b.id !== hqBranch.id);

  const openBranchGallery = (branch: BranchInfo, initialIdx = 0) => {
    setLightboxBranch(branch);
    setLightboxPhotoIndex(initialIdx);
    setLightboxOpen(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Physical Network"
        title="8 Nairobi Locations. Built For Trust."
        description="Explore our world-class branches with executive teller suites, real-time foreign exchange, instant remittance processing, and private VIP consultation desks."
        imageSrc="/Sunny HQ/sunny_hq_1.jpg"
      />

      <section className="py-16 md:py-24 bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sticky Column: Google Map Locator & Active Branch Preview */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white rounded-[2.5rem] p-5 sm:p-7 border border-gray-200/80 shadow-xl overflow-hidden flex flex-col justify-between relative">
                
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#7A1220]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-gray-150 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 text-[#7A1220] mb-1">
                      <Compass className="w-4 h-4 animate-spin-slow" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A1220]">Interactive Map Locator</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-950 leading-tight font-figtree">
                      {mapMode === 'branch' ? selectedBranch.name : 'All 8 Nairobi Locations'}
                    </h3>
                  </div>

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

                <div className="relative z-10 flex-grow my-4 rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100 min-h-[280px] sm:min-h-[320px]">
                  <iframe
                    key={`${selectedBranch.id}-${mapMode}`}
                    title={`Google Map - ${selectedBranch.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '300px' }}
                    loading="lazy"
                    allowFullScreen
                    src={
                      mapMode === 'branch'
                        ? `https://maps.google.com/maps?q=${encodeURIComponent(selectedBranch.queryAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`
                        : `https://maps.google.com/maps?q=SunnyRemit+Nairobi+Kenya&t=&z=12&ie=UTF8&iwloc=&output=embed`
                    }
                  />
                </div>

                <div className="relative z-10 pt-3 border-t border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => openBranchGallery(selectedBranch, 0)}
                      className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 cursor-pointer group shadow-sm"
                    >
                      <img
                        src={selectedBranch.coverImage}
                        alt={selectedBranch.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Maximize2 className="w-3.5 h-3.5 text-white opacity-80 group-hover:opacity-100" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">{selectedBranch.name}</p>
                      <button
                        onClick={() => openBranchGallery(selectedBranch, 0)}
                        className="text-[11px] font-semibold text-[#7A1220] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Camera className="w-3 h-3" />
                        <span>View {selectedBranch.images.length} Photos</span>
                      </button>
                    </div>
                  </div>

                  <a
                    href={selectedBranch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#7A1220] text-white text-xs font-bold hover:bg-[#5C0D18] transition-colors shrink-0 shadow-md"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent Head Quarters Card + Nairobi Branch Cards */}
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

              {/* 1. PROMINENT HEAD QUARTERS (HQ) CARD */}
              {hqBranch && (
                <motion.div
                  key={hqBranch.id}
                  onClick={() => {
                    setSelectedBranchId(hqBranch.id);
                    setMapMode('branch');
                  }}
                  whileHover={{ scale: 1.005 }}
                  className={`rounded-[2.5rem] border-2 transition-all duration-300 relative overflow-hidden text-left ${
                    selectedBranchId === hqBranch.id
                      ? 'bg-white border-[#7A1220] shadow-2xl ring-4 ring-[#7A1220]/15'
                      : 'bg-white border-amber-300/80 shadow-lg hover:border-[#7A1220]/60'
                  }`}
                >
                  {/* Flagship Top Gold Banner */}
                  <div className="bg-gradient-to-r from-[#7A1220] via-[#8A1625] to-[#450A12] px-6 sm:px-8 py-3.5 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
                        Executive Flagship Headquarters
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold bg-white/10 px-3 py-0.5 rounded-full border border-white/20">
                      Central Corporate & Retail Hub
                    </span>
                  </div>

                  {/* Interactive HQ Photo Gallery Slider */}
                  <div className="relative h-64 sm:h-72 w-full bg-gray-900 overflow-hidden group">
                    <img
                      src={hqBranch.images[hqActivePhotoIdx]}
                      alt={`${hqBranch.name} photo ${hqActivePhotoIdx + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHqActivePhotoIdx((prev) => (prev - 1 + hqBranch.images.length) % hqBranch.images.length);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#7A1220] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
                      aria-label="Previous HQ photo"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setHqActivePhotoIdx((prev) => (prev + 1) % hqBranch.images.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#7A1220] text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
                      aria-label="Next HQ photo"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                          Executive Lavington Facility
                        </span>
                        <span className="text-sm font-semibold">Photo {hqActivePhotoIdx + 1} of {hqBranch.images.length}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBranchGallery(hqBranch, hqActivePhotoIdx);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-bold transition-all border border-white/20 shadow-lg"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-300" />
                        <span>View All {hqBranch.images.length} Photos</span>
                      </button>
                    </div>

                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
                      {hqBranch.images.slice(0, 8).map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`h-1 rounded-full transition-all ${
                            dotIdx === hqActivePhotoIdx ? 'w-4 bg-amber-400' : 'w-1 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* HQ Body Content */}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <h4 className="text-2xl sm:text-3xl font-extrabold text-gray-950 font-figtree tracking-tight">
                          {hqBranch.name}
                        </h4>
                        <p className="text-xs sm:text-sm font-bold text-[#7A1220] mt-0.5 flex items-center gap-1.5">
                          <span>Central Corporate & Retail Headquarters</span>
                          <span>•</span>
                          <span>{hqBranch.area}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Open 7 Days
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-5">
                      {hqBranch.address}
                    </p>

                    {/* HQ Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                      {hqBranch.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-50 border border-gray-150 text-[11px] font-semibold text-gray-800">
                          <CheckCircle2 className="w-3 h-3 text-[#7A1220] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Direct Contact & Hours Info Grid */}
                    <div className="grid sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mb-6 text-xs">
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
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`tel:${hqBranch.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7A1220] hover:bg-[#5C0D18] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call HQ Desk</span>
                      </a>

                      <a
                        href={`https://wa.me/${hqBranch.whatsapp}?text=Hello%20SunnyRemit%20Head%20Quarters%2C%20I%20would%20like%20to%20inquire%20about%20rates.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp HQ</span>
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBranchGallery(hqBranch, 0);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold transition-all shadow-sm"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#7A1220]" />
                        <span>View Photo Gallery ({hqBranch.images.length})</span>
                      </button>

                      <a
                        href={hqBranch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all ml-auto"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
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

              {/* 3. REGULAR BRANCH CARDS LIST WITH REAL PHOTOS */}
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
                      className={`rounded-[2rem] border transition-all cursor-pointer text-left relative overflow-hidden ${
                        isSelected
                          ? 'bg-white border-[#7A1220] shadow-xl ring-2 ring-[#7A1220]/20'
                          : 'bg-white/95 border-gray-200 hover:border-gray-300 hover:bg-white shadow-sm'
                      }`}
                    >
                      <div className="grid sm:grid-cols-12 gap-0">
                        {/* Branch Photo Thumbnail Column */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            openBranchGallery(b, 0);
                          }}
                          className="sm:col-span-4 relative h-44 sm:h-full min-h-[140px] bg-gray-900 overflow-hidden group/img"
                        >
                          <img
                            src={b.coverImage}
                            alt={b.name}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/40 pointer-events-none" />
                          
                          {/* Photo Count Badge */}
                          <div className="absolute bottom-3 left-3 sm:top-3 sm:left-3 sm:bottom-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 group-hover/img:bg-[#7A1220] transition-colors">
                            <Camera className="w-3 h-3 text-amber-300" />
                            <span>{b.images.length} Photos</span>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/30">
                            <span className="px-3 py-1 rounded-full bg-white text-[#7A1220] text-xs font-bold shadow-lg">
                              Enlarge
                            </span>
                          </div>
                        </div>

                        {/* Branch Details Column */}
                        <div className="sm:col-span-8 p-5 sm:p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h4 className="text-lg font-bold text-gray-950 font-figtree">
                                  {b.name}
                                </h4>
                                <span className="text-xs text-[#7A1220] font-semibold block mt-0.5">
                                  {b.area}
                                </span>
                              </div>

                              {isSelected && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-[#7A1220] bg-[#7A1220]/10 px-2.5 py-1 rounded-full shrink-0 border border-[#7A1220]/20">
                                  Active Map
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-gray-600 font-normal mt-2 leading-relaxed">
                              {b.address}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3 text-gray-700">
                              <a
                                href={`tel:${b.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1.5 font-bold hover:text-[#7A1220] transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{b.phone}</span>
                              </a>
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${b.whatsapp}?text=Hello%20SunnyRemit%20${encodeURIComponent(b.name)}%2C%20I%20would%20like%20to%20inquire%20about%20rates.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition-colors"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openBranchGallery(b, 0);
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold transition-colors"
                              >
                                <Camera className="w-3 h-3 text-[#7A1220]" />
                                <span>Photos</span>
                              </button>
                            </div>
                          </div>

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

      {/* Lightbox Modal */}
      <BranchPhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        branch={lightboxBranch}
        initialPhotoIndex={lightboxPhotoIndex}
      />

      <CtaBand />
    </>
  );
}
