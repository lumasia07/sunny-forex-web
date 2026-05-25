import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  PanInfo,
} from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

/* ─── Story Data ─────────────────────────────────────────────── */
const stories = [
  {
    src: '/pexels-mnmshakir-35034068.jpg',
    title: 'Rooted in Culture',
    subtitle: 'The Maasai Spirit',
    story:
      'From the Maasai Mara to our branches in Nairobi, our roots run deep in Kenyan soil. We carry the resilience and pride of a nation into every transaction — because moving money should honour the people it serves.',
    accent: '#B91C1C',
    year: '2008',
  },
  {
    src: '/pexels-sergey-pesterev-69811391-8427984.jpg',
    title: 'Standing Tall',
    subtitle: 'The View From The Peak',
    story:
      'Like the snow-capped peaks of Mt. Kilimanjaro watching over the savannah, Sunny Forex stands as a beacon of trust — visible from every corner, always there when you need us most.',
    accent: '#006B3F',
    year: '2012',
  },
  {
    src: '/pexels-ben-iwara-1033992193-27742235.jpg',
    title: 'Coast to Capital',
    subtitle: 'Kenya\'s Shoreline',
    story:
      'From the palm-lined beaches of Diani to the bustling streets of Nairobi CBD, our network connects Kenya\'s most vibrant communities — making forex access as easy as a walk to the beach.',
    accent: '#0EA5E9',
    year: '2015',
  },
  {
    src: '/pexels-maria-stewart-2268904-5643136 (1).jpg',
    title: 'Global Connections',
    subtitle: 'Every Continent, One Promise',
    story:
      'The world is smaller than it seems. Through our partnerships with Western Union, MoneyGram, and more — we bridge continents. Every shilling you send carries a piece of home.',
    accent: '#D4A24C',
    year: '2018',
  },
  {
    src: '/pexels-kursat-kuzu-42706530-12705278.jpg',
    title: 'Taking Flight',
    subtitle: 'Moving At The Speed of Trust',
    story:
      'In a world that never stops moving, your money shouldn\'t wait. Instant M-Pesa payouts, same-day transfers, real-time rates — because the future of forex is already here.',
    accent: '#7A1220',
    year: '2024',
  },
  {
    src: '/pexels-jakubzerdzicki-30572289.jpg',
    title: 'Precision & Insight',
    subtitle: 'The Art of Exchange',
    story:
      'Behind every rate is a team of specialists watching global markets 24/7. We don\'t just exchange currency — we read the pulse of the global economy so you always get the best value.',
    accent: '#22C55E',
    year: 'Today',
  },
];

/* ─── Fullscreen Story Viewer ────────────────────────────────── */
function StoryViewer({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });
  const timerRef = useRef<number | null>(null);

  const story = stories[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((i) => i + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, onClose]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Auto-progress timer (8 seconds per story)
  useEffect(() => {
    const duration = 8000;
    const interval = 50;
    let elapsed = 0;

    timerRef.current = window.setInterval(() => {
      elapsed += interval;
      setProgress(elapsed / duration);
      if (elapsed >= duration) {
        goNext();
      }
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -80) goNext();
    else if (info.offset.x > 80) goPrev();
    dragX.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-16 z-50 flex gap-1.5">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: story.accent }}
              animate={{
                width:
                  i < currentIndex
                    ? '100%'
                    : i === currentIndex
                    ? `${progress * 100}%`
                    : '0%',
              }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>
        ))}
      </div>

      {/* Story content — swipeable */}
      <motion.div
        className="relative w-full max-w-lg mx-4 aspect-[9/16] max-h-[85vh] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: springX }}
        onDragEnd={handleDragEnd}
        onClick={(e) => e.stopPropagation()}>
        {/* Background image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={story.src}
            src={story.src}
            alt={story.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Year badge */}
        <motion.div
          className="absolute top-6 left-6 px-4 py-1.5 rounded-full backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase"
          style={{ backgroundColor: `${story.accent}CC` }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          {story.year}
        </motion.div>

        {/* Story text */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-2"
                style={{ color: story.accent }}>
                {story.subtitle}
              </p>
              <h3 className="text-3xl font-bold text-white leading-tight mb-3 tracking-tight">
                {story.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">{story.story}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tap zones for prev/next */}
        <div className="absolute inset-0 flex">
          <button className="w-1/3 h-full" onClick={goPrev} aria-label="Previous story" />
          <div className="w-1/3" />
          <button className="w-1/3 h-full" onClick={goNext} aria-label="Next story" />
        </div>
      </motion.div>

      {/* Nav arrows (desktop) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
        aria-label="Previous">
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors hidden md:flex"
        aria-label="Next">
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Story counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium tracking-widest">
        {currentIndex + 1} / {stories.length}
      </div>
    </motion.div>
  );
}

/* ─── Grid Card ──────────────────────────────────────────────── */
function StoryCard({
  story,
  index,
  onOpen,
}: {
  story: (typeof stories)[number];
  index: number;
  onOpen: (i: number) => void;
}) {
  /* Each card reveals when scrolled into view */
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);

  // Vary grid spans for creative layout
  const spanClasses = [
    'col-span-2 row-span-2',        // 0: Maasai — large featured
    'col-span-1 row-span-1',        // 1: Mt Kilimanjaro
    'col-span-1 row-span-2',        // 2: Beach — tall
    'col-span-1 row-span-1',        // 3: Globe
    'col-span-2 row-span-1',        // 4: Airplane — wide
    'col-span-1 row-span-1',        // 5: Forex charts
  ];

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className={`${spanClasses[index]} relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group`}
      onClick={() => onOpen(index)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
      {/* Image */}
      <img
        src={story.src}
        alt={story.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: story.accent }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
      />

      {/* Year badge */}
      <div
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md"
        style={{ backgroundColor: `${story.accent}99` }}>
        {story.year}
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col justify-end">
        <motion.p
          className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 transition-colors duration-300"
          style={{ color: story.accent }}>
          {story.subtitle}
        </motion.p>
        <h3 className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight mb-2">
          {story.title}
        </h3>

        {/* Tap hint */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[11px] font-medium text-white/70">Tap to explore</span>
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${story.accent}66` }}>
            <ArrowRight className="w-3 h-3 text-white" />
          </span>
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
      />
    </motion.div>
  );
}

/* ─── OurStory Section ───────────────────────────────────────── */
export function OurStory() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <>
      <section
        ref={sectionRef}
        id="our-story"
        className="relative py-24 md:py-32 bg-[#FAFAF7] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7A1220]/[0.03] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#006B3F]/[0.03] rounded-full blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A24C]/[0.02] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            style={{ y: headingY, opacity: headingOpacity }}
            className="mb-16 md:mb-20 max-w-2xl">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block w-12 h-px bg-[#7A1220] mb-6 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-xs font-bold tracking-[0.25em] uppercase text-[#7A1220] mb-4">
              Our Story
            </motion.p>

            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[#0E0E0E] tracking-tight leading-[1.08] mb-6">
              A legacy of trust in{' '}
              <span className="text-[#7A1220]">every transaction.</span>
            </h2>

            <p className="text-base md:text-lg text-[#0E0E0E]/60 leading-relaxed max-w-lg">
              Since 2008, we've built our reputation on transparency, competitive rates,
              and unwavering reliability. Licensed by the Central Bank of Kenya, our
              story is woven into the fabric of this nation.
            </p>
          </motion.div>

          {/* Creative Masonry Grid — 3 columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
            {stories.map((story, index) => (
              <StoryCard
                key={story.src}
                story={story}
                index={index}
                onOpen={setViewerIndex}
              />
            ))}
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="flex h-[3px] w-16">
                <span className="flex-1 bg-[#0E0E0E]" />
                <span className="flex-1 bg-[#B91C1C]" />
                <span className="flex-1 bg-[#006B3F]" />
              </div>
              <p className="text-sm text-[#0E0E0E]/50 font-medium">
                Tap any image to explore our journey
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[
                { label: 'Years', value: '17+' },
                { label: 'Branches', value: '7' },
                { label: 'Growth', value: '+12%' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="w-px h-8 bg-[#0E0E0E]/10" />
                  <div>
                    <p className="text-xl font-bold text-[#0E0E0E] leading-none tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#0E0E0E]/40 mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Story Viewer */}
      <AnimatePresence>
        {viewerIndex !== null && (
          <StoryViewer
            initialIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
