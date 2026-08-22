import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight, Building2, ShieldCheck, Phone, Clock, ExternalLink, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiveBlock, LiveWords } from './LiveText';
import { splitGridMotion } from './SplitColumnsReveal';
import { BRANCHES_DATA, BranchInfo } from '../data/branchesData';
import { BranchPhotoLightbox } from './BranchPhotoLightbox';
import { fetchFromApi } from '../lib/api';

export function Branches() {
  const [branches, setBranches] = useState<BranchInfo[]>(BRANCHES_DATA);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState<BranchInfo | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    fetchFromApi<any[]>('branches')
      .then(data => {
        if (data && data.length > 0) {
          const merged = BRANCHES_DATA.map((local) => {
            const remote = data.find(
              (r) =>
                r.id === local.id ||
                r.name?.toLowerCase().includes(local.slug) ||
                (local.flagship && (r.name?.toLowerCase().includes('hq') || r.name?.toLowerCase().includes('lavington')))
            );
            if (remote) {
              return {
                ...local,
                phone: remote.phone || local.phone,
                hours: remote.hours || local.hours,
                address: remote.address || local.address,
              };
            }
            return local;
          });
          setBranches(merged);
        }
      })
      .catch(err => console.warn('Branches API offline, using local data:', err));
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const gridY = useTransform(scrollYProgress, [0.1, 0.5], [30, 0]);

  const hqBranch = branches.find(b => b.flagship) || branches[0];
  const regularBranches = branches.filter(b => b.id !== hqBranch?.id);

  const openLightbox = (branch: BranchInfo, index = 0) => {
    setActiveBranch(branch);
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#FAF9F5] overflow-hidden border-t border-gray-150">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        {/* Centered Section Header */}
        <div className="mb-14 max-w-3xl mx-auto text-center flex flex-col items-center">
          <span className="w-12 h-px bg-[#7A1220] mb-5" />
          <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-3 font-bold tracking-tight text-gray-900 font-figtree">
            <LiveWords text="Our Branches" variant="neutral" />
          </h2>
          <LiveBlock className="type-lead text-gray-500 max-w-xl font-light font-figtree text-sm md:text-base" variant="neutral" inline={false}>
            Strategically located in Nairobi's premier retail and commercial hubs.
          </LiveBlock>
        </div>

        {/* 1. PROMINENT HQ CARD AT THE TOP (EXECUTIVE LAYOUT WITH REAL PHOTO BACKDROP) */}
        {hqBranch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-[#8A1625] via-[#5C0D18] to-[#140407] border-2 border-white/20 hover:border-amber-400/50 shadow-[0_30px_70px_rgba(122,18,32,0.25)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group text-left transition-all duration-500">
              
              {/* HQ Cover Photo Backdrop */}
              <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <img
                  src={hqBranch.coverImage}
                  alt={hqBranch.name}
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#5C0D18] via-[#5C0D18]/70 to-transparent" />
              </div>

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
                        Central Corporate Hub • {hqBranch.area}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-white/80 font-light mt-4 leading-relaxed font-figtree">
                    {hqBranch.address}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-6 text-xs text-white/90">
                    <a
                      href={`tel:${hqBranch.phone}`}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full border border-white/15 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-bold">{hqBranch.phone}</span>
                    </a>
                    <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{hqBranch.hours}</span>
                    </div>
                    <button
                      onClick={() => openLightbox(hqBranch, 0)}
                      className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-full border border-amber-400/30 font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Explore all {hqBranch.images.length} Photos</span>
                    </button>
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

        {/* 2. BALANCED 6-CARD GRID FOR OTHER BRANCHES (WITH PHONE NUMBER BADGE, UNIFORM IMAGES) */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {regularBranches.map((branch, index) => (
            <motion.div
              key={branch.name}
              {...splitGridMotion(index)}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-gradient-to-b from-[#8A1625] via-[#5C0D18] to-[#120406] border border-white/10 hover:border-white/25 hover:shadow-[0_30px_60px_rgba(122,18,32,0.25)] rounded-[2rem] overflow-hidden flex flex-col justify-between transition-all duration-500 relative group cursor-default text-left"
            >
              {/* Photo Banner with Big & Uniform Sizing */}
              <div
                onClick={() => openLightbox(branch, 0)}
                className="relative h-52 w-full bg-black/40 overflow-hidden cursor-pointer"
              >
                <img
                  src={branch.coverImage}
                  alt={branch.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-106 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5C0D18] via-black/20 to-transparent pointer-events-none" />

                {/* Top Left Area Tag */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4A24C]" />
                    <span>{branch.area}</span>
                  </span>
                </div>

                {/* Top Right Phone Number Badge */}
                <div className="absolute top-3 right-3">
                  <a
                    href={`tel:${branch.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 hover:bg-[#7A1220] backdrop-blur-md border border-emerald-400/30 text-white text-[11px] font-bold transition-all shadow-md"
                  >
                    <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{branch.phone}</span>
                  </a>
                </div>

                {/* Photo Count Button */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold group-hover:bg-[#7A1220] transition-colors">
                  <Camera className="w-3 h-3 text-amber-300" />
                  <span>{branch.images.length} Photos</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1 relative z-10">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4A24C] transition-colors leading-snug font-figtree">
                    {branch.name}
                  </h3>
                  <p className="text-xs text-white/70 font-light mt-1.5 font-figtree line-clamp-2">
                    {branch.address}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                  <button
                    onClick={() => openLightbox(branch, 0)}
                    className="text-xs font-semibold text-white/80 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-300" />
                    <span>View Gallery</span>
                  </button>

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
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Centered CTA Button below cards */}
        <div className="flex justify-center mt-12">
          <Link
            to="/branches"
            className="inline-flex items-center gap-3.5 rounded-full bg-[#7A1220] px-8 py-4 font-figtree text-sm font-bold text-white shadow-lg hover:bg-[#5C0D18] hover:shadow-[#7A1220]/20 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            View all 7 branches on interactive map
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#7A1220] group-hover:translate-x-0.5 transition-transform duration-300">
              <ArrowRight size={13} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <BranchPhotoLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        branch={activeBranch}
        initialPhotoIndex={photoIndex}
      />
    </section>
  );
}
