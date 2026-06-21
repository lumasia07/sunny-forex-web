import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'sunny-forex-splash-seen';
const MIN_DISPLAY_MS = 13000; // Prolonged to 13 seconds as requested
const FADE_OUT_MS = 500;

type SplashStage =
  | 'white_emblem'
  | 'white_logo'
  | 'black_emblem'
  | 'black_logo'
  | 'red_emblem'
  | 'red_logo';

function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(
    srcs.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });
    })
  );
}

type AppSplashProps = {
  onComplete: () => void;
};

export function AppSplash({ onComplete }: AppSplashProps) {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<SplashStage>('white_emblem');

  useEffect(() => {
    const start = Date.now();

    // Rhythmic 2.1s stage transitions over the 13s duration for cinematic pacing
    const stageTimers = [
      setTimeout(() => setStage('white_logo'), 2100),
      setTimeout(() => setStage('black_emblem'), 4200),
      setTimeout(() => setStage('black_logo'), 6300),
      setTimeout(() => setStage('red_emblem'), 8400),
      setTimeout(() => setStage('red_logo'), 10500),
    ];

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => {
        setVisible(false);
        window.setTimeout(onComplete, FADE_OUT_MS);
      }, remaining);
    };

    Promise.all([
      preloadImages([
        '/symbol-white.png',
        '/logo-white.png',
        '/symbol-black.png',
        '/logo-black.png',
        '/symbol-red.png',
        '/logo-red.png',
      ]),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener('load', () => resolve(), { once: true });
          }),
    ]).then(finish);

    return () => {
      stageTimers.forEach(clearTimeout);
    };
  }, [onComplete]);

  // Harmonized background transitions
  const bgBg = {
    white_emblem: '#0E0E0E',
    white_logo: '#0E0E0E',
    black_emblem: '#F4F4F5',
    black_logo: '#F4F4F5',
    red_emblem: '#FFFFFF',
    red_logo: '#FFFFFF',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: 'easeInOut' }}
          animate={{ backgroundColor: bgBg[stage] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          role="status"
          aria-label="Loading SunnyRemit">
          
          {/* Ambient Liquid Aura Blobs (Vibrant drifting background lights) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            <motion.div
              animate={{
                x: stage.includes('white') ? [-40, 40, -40] : stage.includes('black') ? [-20, 30, -20] : [-50, 50, -50],
                y: stage.includes('white') ? [-30, 30, -30] : stage.includes('black') ? [-40, 20, -40] : [-30, 40, -30],
                scale: stage.includes('red') ? [1, 1.25, 1] : [1, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 9,
                ease: 'easeInOut',
              }}
              style={{
                background: stage.includes('white') 
                  ? 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)'
                  : stage.includes('black') 
                    ? 'radial-gradient(circle, rgba(212,162,76,0.15) 0%, transparent 65%)' // Amber/Gold light
                    : 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 65%)', // Vibrant Coral Red light
              }}
              className="absolute w-96 h-96 rounded-full blur-[60px] -top-16 -left-16"
            />
            
            {/* Third Ambient Central Blob */}
            <motion.div
              animate={{
                x: stage.includes('white') ? [-30, 20, -30] : stage.includes('black') ? [-40, 10, -40] : [-20, 30, -20],
                y: stage.includes('white') ? [20, -30, 20] : stage.includes('black') ? [30, -10, 30] : [10, -20, 10],
                scale: stage.includes('red') ? [1.1, 0.9, 1.1] : [1.0, 1.1, 1.0],
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: 'easeInOut',
              }}
              style={{
                background: stage.includes('white')
                  ? 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)'
                  : stage.includes('black')
                    ? 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 60%)'
                    : 'radial-gradient(circle, rgba(212,162,76,0.08) 0%, transparent 60%)', // Gold amber leak
              }}
              className="absolute w-80 h-80 rounded-full blur-[50px] top-[30%] left-[30%]"
            />

            <motion.div
              animate={{
                x: stage.includes('white') ? [30, -30, 30] : stage.includes('black') ? [40, -20, 40] : [40, -40, 40],
                y: stage.includes('white') ? [40, -20, 40] : stage.includes('black') ? [20, -40, 20] : [30, -30, 30],
                scale: stage.includes('red') ? [1.2, 0.95, 1.2] : [1.1, 0.9, 1.1],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: 'easeInOut',
              }}
              style={{
                background: stage.includes('white')
                  ? 'radial-gradient(circle, rgba(122,18,32,0.08) 0%, transparent 65%)' // Soft burgundy leak
                  : stage.includes('black')
                    ? 'radial-gradient(circle, rgba(122,18,32,0.05) 0%, transparent 65%)'
                    : 'radial-gradient(circle, rgba(212,162,76,0.1) 0%, transparent 65%)', // Warm gold leak
              }}
              className="absolute w-96 h-96 rounded-full blur-[60px] -bottom-20 -right-20"
            />
          </div>

          {/* Logo Container */}
          <div className="relative w-64 sm:w-72 md:w-80 h-28 flex items-center justify-center z-10">
            
            {/* Dynamic Morphing Sonar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              {[0, 1, 2].map((i) => {
                const isEmblem = stage.includes('emblem');
                const isRed = stage.includes('red');
                const isBlack = stage.includes('black');
                
                let borderColor = 'border-white/12';
                if (isRed) borderColor = 'border-[#7A1220]/18';
                else if (isBlack) borderColor = 'border-black/12';

                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.7, opacity: 0.6 }}
                    animate={{ 
                      scale: isEmblem ? [0.7, 1.8] : [0.8, 1.5],
                      opacity: 0 
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      delay: i * 0.7,
                      ease: 'easeOut',
                    }}
                    className={`absolute border border-dashed transition-all duration-500 ${borderColor} ${
                      isEmblem 
                        ? 'w-32 h-32 rounded-full' 
                        : 'w-full h-full rounded-2xl'
                    }`}
                  />
                );
              })}
            </div>

            {/* Ambient Background Glow */}
            <motion.div
              animate={{
                scale: stage.includes('emblem') ? [0.95, 1.05, 0.95] : 1.25,
                opacity: stage.includes('red') ? 0 : [0.12, 0.25, 0.12],
                background: stage.includes('white') 
                  ? 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)'
              }}
              transition={{
                scale: stage.includes('emblem') ? { repeat: Infinity, duration: 2.0, ease: 'easeInOut' } : { duration: 0.6 },
                opacity: { duration: 0.6 }
              }}
              className="absolute w-72 h-72 rounded-full pointer-events-none z-0"
            />

            {/* Subtle Diagonal Shimmer Sheen Sweep */}
            {stage.includes('logo') && (
              <motion.div
                key={stage}
                initial={{ left: '-150%' }}
                animate={{ left: '150%' }}
                transition={{
                  duration: 1.8,
                  delay: 0.25,
                  ease: 'easeInOut',
                }}
                style={{
                  background: stage.includes('white') 
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)'
                    : stage.includes('black')
                      ? 'linear-gradient(90deg, transparent, rgba(212,162,76,0.16), transparent)' // Gold sheen
                      : 'linear-gradient(90deg, transparent, rgba(122,18,32,0.12), transparent)' // Red sheen
                }}
                className="absolute inset-y-0 w-36 skew-x-20 z-40 pointer-events-none"
              />
            )}

            {/* 1. WHITE EMBLEM (180deg Spin Entry & Exit) */}
            <motion.img
              src="/symbol-white.png"
              alt=""
              animate={stage === 'white_emblem' ? {
                scale: [0, 1.25, 0.45],
                opacity: [0, 1, 0],
                rotate: [0, 90, 180]
              } : {
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              transition={stage === 'white_emblem' ? {
                duration: 2.1,
                times: [0, 0.45, 1],
                ease: 'easeInOut'
              } : {
                duration: 0.2
              }}
              className="absolute w-24 h-24 object-contain z-10"
            />

            {/* 2. WHITE FULL LOGO (Slide Out & Smooth Rotational Correction) */}
            <motion.img
              src="/logo-white.png"
              alt="SunnyRemit"
              animate={stage === 'white_logo' ? {
                scale: [0.45, 1.05, 1.0],
                opacity: [0, 1, 1],
                rotate: [-5, 0]
              } : {
                scale: 0.45,
                opacity: 0,
                rotate: -5
              }}
              transition={stage === 'white_logo' ? {
                duration: 2.1,
                times: [0, 0.4, 1],
                ease: 'easeOut'
              } : {
                duration: 0.2
              }}
              className="absolute w-full h-full object-contain z-10 filter drop-shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
            />

            {/* 3. BLACK EMBLEM (180deg Spin Entry & Exit) */}
            <motion.img
              src="/symbol-black.png"
              alt=""
              animate={stage === 'black_emblem' ? {
                scale: [0, 1.25, 0.45],
                opacity: [0, 1, 0],
                rotate: [0, 90, 180]
              } : {
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              transition={stage === 'black_emblem' ? {
                duration: 2.1,
                times: [0, 0.45, 1],
                ease: 'easeInOut'
              } : {
                duration: 0.2
              }}
              className="absolute w-24 h-24 object-contain z-20"
            />

            {/* 4. BLACK FULL LOGO (Slide Out & Smooth Rotational Correction) */}
            <motion.img
              src="/logo-black.png"
              alt="SunnyRemit"
              animate={stage === 'black_logo' ? {
                scale: [0.45, 1.05, 1.0],
                opacity: [0, 1, 1],
                rotate: [-5, 0]
              } : {
                scale: 0.45,
                opacity: 0,
                rotate: -5
              }}
              transition={stage === 'black_logo' ? {
                duration: 2.1,
                times: [0, 0.4, 1],
                ease: 'easeOut'
              } : {
                duration: 0.2
              }}
              className="absolute w-full h-full object-contain z-20 filter drop-shadow-[0_8px_32px_rgba(0,0,0,0.03)]"
            />

            {/* 5. RED EMBLEM (180deg Spin Entry & Exit) */}
            <motion.img
              src="/symbol-red.png"
              alt=""
              animate={stage === 'red_emblem' ? {
                scale: [0, 1.25, 0.45],
                opacity: [0, 1, 0],
                rotate: [0, 90, 180]
              } : {
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              transition={stage === 'red_emblem' ? {
                duration: 2.1,
                times: [0, 0.45, 1],
                ease: 'easeInOut'
              } : {
                duration: 0.2
              }}
              className="absolute w-24 h-24 object-contain z-30"
            />

            {/* 6. RED FULL LOGO (Final Resolution - Smooth Rotational Correction) */}
            <motion.img
              src="/logo-red.png"
              alt="SunnyRemit"
              animate={stage === 'red_logo' ? {
                scale: [0.45, 1.05, 1.0],
                opacity: [0, 1, 1],
                rotate: [-5, 0]
              } : {
                scale: 0.45,
                opacity: 0,
                rotate: -5
              }}
              transition={stage === 'red_logo' ? {
                duration: 2.5,
                times: [0, 0.4, 1],
                ease: 'easeOut'
              } : {
                duration: 0.2
              }}
              className="absolute w-full h-full object-contain z-30 filter drop-shadow-[0_12px_40px_rgba(122,18,32,0.12)]"
            />
          </div>

          {/* Loading Indicator bar - Smooth continuous fill over 13s with dynamic colored drop-shadows */}
          <div className="w-56 h-[3px] bg-gray-350/15 rounded-full mt-12 overflow-hidden relative z-10">
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ 
                left: '0%',
                backgroundColor: stage.includes('red') 
                  ? '#7A1220' 
                  : stage.includes('black') 
                    ? '#0E0E0E' 
                    : '#FFFFFF',
                boxShadow: stage.includes('red') 
                  ? '0 0 10px rgba(122, 18, 32, 0.6)' 
                  : stage.includes('black') 
                    ? '0 0 10px rgba(0, 0, 0, 0.2)' 
                    : '0 0 10px rgba(255, 255, 255, 0.6)'
              }}
              transition={{ duration: 12.5, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-full transition-all duration-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function shouldShowSplash(): boolean {
  return true;
}

export function markSplashSeen(): void {
  /* no-op to allow showing on reload */
}
