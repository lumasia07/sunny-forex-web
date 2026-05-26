import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { LiveBlock, LiveWords } from './LiveText';

const stories = [
  {
    src: '/pexels-mnmshakir-35034068.jpg',
    title: "Empowering Kenya's Trade",
    subtitle: 'Local Trust, Global Impact',
    description:
      "From Nairobi's commercial hub to the furthest reaches of the savannah, we empower local enterprises and individuals with instant, competitive currency exchange. We run deep in Kenyan soil, carrying the resilience and pride of our nation into every trade.",
    accent: '#B91C1C',
  },
  {
    src: '/pexels-sergey-pesterev-69811391-8427984.jpg',
    title: 'Reaching New Heights',
    subtitle: 'Guaranteed Rates, Peak Reliability',
    description:
      'Just as Mt. Kilimanjaro stands tall and firm watching over East Africa, Sunny Forex stands as a beacon of stability. Avoid market volatility by locking in guaranteed rates and finalize your exchange at any of our branches.',
    accent: '#006B3F',
  },
  {
    src: '/pexels-ben-iwara-1033992193-27742235.jpg',
    title: 'Connecting Coast to Capital',
    subtitle: 'Seamless Mobile & Cash Flow',
    description:
      "Whether sending funds to coastal tourism hotspots in Diani or managing corporate capital in Nairobi CBD, our real-time mobile money and M-Pesa integrations make local transfers absolutely effortless.",
    accent: '#0EA5E9',
  },
  {
    src: '/pexels-maria-stewart-2268904-5643136 (1).jpg',
    title: 'Bridging Global Borders',
    subtitle: 'Worldwide Remittance Network',
    description:
      'Partnering with global networks like Western Union, MoneyGram, and Ria, we connect families across continents. Fast, secure, and licensed by the Central Bank of Kenya — bringing the world closer with every shilling.',
    accent: '#D4A24C',
  },
];

export function OurStory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = stories.length + 1; // +1 for the CTA Slide

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (isPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 6000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPlaying, isHovered]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const isCtaSlide = currentIndex === stories.length;
  const currentSlide = isCtaSlide ? null : stories[currentIndex];
  const accentColor = isCtaSlide ? '#7A1220' : currentSlide?.accent || '#7A1220';

  return (
    <section
      id="our-story"
      className="relative py-24 md:py-32 bg-[#FAFAF7] overflow-hidden"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#7A1220]/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#006B3F]/[0.02] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header - Stately and Focused on Services */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block w-12 h-px bg-[#7A1220] mb-5 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#7A1220] mb-3"
          >
            Our Service Journey
          </motion.p>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0E0E0E] tracking-tight leading-[1.1] mb-5">
            A vision of trust, <span className="text-[#7A1220]">connecting lives.</span>
          </h2>
          <p className="text-sm md:text-base text-[#0E0E0E]/60 leading-relaxed max-w-xl">
            We bridge communities across Kenya and beyond. Take a look at the pillars that define how we move money safely, efficiently, and with respect for our rich heritage.
          </p>
        </div>

        {/* Elongated Slideshow Container */}
        <div
          className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border border-white/5 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Images */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
              {isCtaSlide ? (
                <motion.div
                  key="cta-bg"
                  className="absolute inset-0 bg-[#0A0A0A] flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Abstract glowing graphics for premium CTA look */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#7A1220]/10 blur-[120px]" />
                  <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[#006B3F]/5 blur-[100px]" />
                  {/* Subtle grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                </motion.div>
              ) : (
                <motion.img
                  key={currentSlide?.src}
                  src={currentSlide?.src}
                  alt={currentSlide?.title}
                  className="absolute inset-0 w-full h-full object-cover origin-center"
                  initial={{ scale: 1.06, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.7 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
          </div>

          {/* Frosted Glass Floating Card for Text Overlay */}
          <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg md:max-w-xl backdrop-blur-xl bg-black/40 border border-white/10 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between min-h-[75%] sm:min-h-[85%] md:min-h-0 relative z-20 overflow-hidden"
              >
                {/* Visual Glass Glow */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-20 transition-colors duration-700"
                  style={{ backgroundColor: accentColor }}
                />

                {!isCtaSlide && currentSlide ? (
                  <div className="flex flex-col flex-1 justify-center">
                    <span
                      className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block w-fit"
                      style={{ color: accentColor }}
                    >
                      {currentSlide.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
                      {currentSlide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light mb-6">
                      {currentSlide.description}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 justify-center items-start">
                    <span
                      className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block"
                      style={{ color: '#7A1220' }}
                    >
                      Experience Premium Exchange
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-4">
                      Ready to experience seamless transactions?
                    </h3>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light mb-8">
                      Visit any of our 7 modern branches in Nairobi, lock in your preferred currency rates online in advance, or contact our professional trading desk today.
                    </p>

                    {/* Premium Styled Rounded-Full Button with Arrow-in-div design */}
                    <Link
                      to="/branches"
                      className="inline-flex items-center gap-4 bg-[#7A1220] hover:bg-[#911a2a] text-white font-medium pl-6 pr-2 py-2 rounded-full shadow-lg transition-all duration-300 group text-sm select-none"
                    >
                      <span className="font-semibold px-2">Contact Us Now</span>
                      <span className="w-10 h-10 rounded-full bg-white text-[#7A1220] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-md">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Link>
                  </div>
                )}

                {/* Progress Indicators & Navigation Bar inside Card */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10 gap-4">
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    {/* Next Button */}
                    <button
                      onClick={handleNext}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>

                    {/* Auto-play Pause Control */}
                    <button
                      onClick={togglePlay}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center transition-colors ml-1"
                      aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Horizontal Linear Indicators */}
                  <div className="flex gap-2">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleDotClick(i)}
                        className="group relative py-2 px-1 focus:outline-none"
                        aria-label={`Go to slide ${i + 1}`}
                      >
                        <div
                          className="h-1 rounded-full transition-all duration-500 overflow-hidden relative"
                          style={{
                            width: i === currentIndex ? '2.5rem' : '0.5rem',
                            backgroundColor: i === currentIndex ? accentColor : 'rgba(255,255,255,0.2)',
                          }}
                        >
                          {i === currentIndex && isPlaying && !isHovered && (
                            <motion.div
                              className="absolute top-0 bottom-0 left-0 bg-white"
                              initial={{ width: '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 6, ease: 'linear' }}
                              key={currentIndex}
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Outer Nav Chevrons (desktop only for premium spacing) */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-30">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/75 border border-white/15 flex items-center justify-center text-white/70 hover:text-white backdrop-blur-md transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-black/45 hover:bg-black/75 border border-white/15 flex items-center justify-center text-white/70 hover:text-white backdrop-blur-md transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brand Indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-[2px] w-12">
              <span className="flex-1 bg-[#7A1220]" />
              <span className="flex-1 bg-[#006B3F]" />
              <span className="flex-1 bg-[#D4A24C]" />
            </div>
            <p className="text-xs text-[#0E0E0E]/45 font-medium">
              Hover to pause auto-swipe • Swipe or tap indicators to browse
            </p>
          </div>

          <div className="flex items-center gap-5">
            {[
              { label: 'Licensed By', value: 'CBK' },
              { label: 'Nairobi Branches', value: '7' },
              { label: 'Client Satisfaction', value: '99%' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2">
                {i > 0 && <span className="w-px h-6 bg-[#0E0E0E]/10" />}
                <div>
                  <p className="text-lg font-bold text-[#0E0E0E] leading-none tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#0E0E0E]/35 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
