with open("/home/LUMASIA/sunny-forex-web/src/components/BranchPhotoLightbox.tsx", "w", encoding="utf-8") as f:
    f.write("""import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, ExternalLink, MessageCircle } from 'lucide-react';
import { BranchInfo } from '../data/branchesData';

interface BranchPhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  branch: BranchInfo | null;
  initialPhotoIndex?: number;
  allPhotosMode?: {
    photos: Array<{ src: string; branchName: string; branchArea: string; alt: string }>;
    currentIndex: number;
    onChangeIndex: (idx: number) => void;
  };
}

export function BranchPhotoLightbox({
  isOpen,
  onClose,
  branch,
  initialPhotoIndex = 0,
  allPhotosMode,
}: BranchPhotoLightboxProps) {
  const [activeIndex, setActiveIndex] = React.useState(initialPhotoIndex);

  useEffect(() => {
    if (initialPhotoIndex !== undefined) {
      setActiveIndex(initialPhotoIndex);
    }
  }, [initialPhotoIndex, branch]);

  const photos = allPhotosMode
    ? allPhotosMode.photos.map((p) => p.src)
    : branch?.images || [];

  const currentPhoto = allPhotosMode
    ? allPhotosMode.photos[allPhotosMode.currentIndex]?.src
    : photos[activeIndex] || branch?.coverImage;

  const currentTitle = allPhotosMode
    ? allPhotosMode.photos[allPhotosMode.currentIndex]?.branchName
    : branch?.name;

  const currentArea = allPhotosMode
    ? allPhotosMode.photos[allPhotosMode.currentIndex]?.branchArea
    : branch?.area;

  const currentIndexNumber = allPhotosMode
    ? allPhotosMode.currentIndex
    : activeIndex;

  const totalCount = allPhotosMode
    ? allPhotosMode.photos.length
    : photos.length;

  const handleNext = () => {
    if (allPhotosMode) {
      const next = (allPhotosMode.currentIndex + 1) % allPhotosMode.photos.length;
      allPhotosMode.onChangeIndex(next);
    } else {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const handlePrev = () => {
    if (allPhotosMode) {
      const prev = (allPhotosMode.currentIndex - 1 + allPhotosMode.photos.length) % allPhotosMode.photos.length;
      allPhotosMode.onChangeIndex(prev);
    } else {
      setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, allPhotosMode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 select-none">
          {/* Dark Glass Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070204]/95 backdrop-blur-md"
          />

          {/* Rebalanced Wide Modal Container (Wide Length, Compact Height) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[85vw] max-w-5xl max-h-[86vh] bg-[#120407] border border-white/20 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10"
          >
            {/* Header Bar */}
            <div className="px-5 sm:px-7 py-3.5 border-b border-white/10 flex items-center justify-between gap-4 bg-white/5 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#7A1220] text-white flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white font-figtree tracking-tight">
                      {currentTitle}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/15">
                      {currentIndexNumber + 1} / {totalCount}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 font-light flex items-center gap-1.5 mt-0.5">
                    <span>{currentArea}</span>
                    {branch?.flagship && (
                      <span className="text-amber-300 font-semibold">• Flagship Headquarters</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Top Actions */}
              <div className="flex items-center gap-2">
                {branch && (
                  <>
                    <a
                      href={`https://wa.me/${branch.whatsapp}?text=Hello%20SunnyRemit%20${encodeURIComponent(branch.name)}%2C%20I%20saw%20your%20branch%20photos%20and%20would%20like%20to%20inquire.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close photo viewer"
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/15 ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Stage Image Viewer with Well-Proportioned Height */}
            <div className="relative flex-1 min-h-[280px] sm:min-h-[420px] max-h-[56vh] bg-black/60 flex items-center justify-center overflow-hidden p-3 sm:p-5 group">
              {currentPhoto && (
                <motion.img
                  key={currentPhoto}
                  src={currentPhoto}
                  alt={`${currentTitle} photo`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[52vh] max-w-[90%] w-auto h-auto object-contain rounded-xl shadow-2xl mx-auto"
                />
              )}

              {/* Prev / Next Controls */}
              {totalCount > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous photo"
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#7A1220] text-white border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 z-20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next photo"
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-[#7A1220] text-white border border-white/20 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 z-20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnails Strip */}
            {totalCount > 1 && (
              <div className="px-4 py-3 bg-[#0A0204] border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-thin shrink-0">
                {photos.map((img, idx) => {
                  const isSelected = idx === currentIndexNumber;
                  return (
                    <button
                      key={img}
                      onClick={() => {
                        if (allPhotosMode) {
                          allPhotosMode.onChangeIndex(idx);
                        } else {
                          setActiveIndex(idx);
                        }
                      }}
                      className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        isSelected
                          ? 'border-amber-400 scale-105 shadow-lg shadow-amber-400/20 ring-2 ring-amber-400/30'
                          : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
""")
print("BranchPhotoLightbox.tsx reverted height and adjusted length!")
