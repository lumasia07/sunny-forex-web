import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SESSION_KEY = 'sunny-forex-splash-seen';
const MIN_DISPLAY_MS = 3800; // Snappy loading display
const FADE_OUT_MS = 400;

type SplashStage = 'white_emblem' | 'white_logo';

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

    // Split duration: emblem spinning, then logo resolves
    const timer = setTimeout(() => setStage('white_logo'), 1800);

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
      ]),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener('load', () => resolve(), { once: true });
          }),
    ]).then(finish);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#0E0E0E]"
          role="status"
          aria-label="Loading SunnyRemit">
          
          {/* Ambient Liquid Aura Blobs (Vibrant drifting background lights) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            <motion.div
              animate={{
                x: [-40, 40, -40],
                y: [-30, 30, -30],
                scale: [1, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 9,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)',
              }}
              className="absolute w-96 h-96 rounded-full blur-[60px] -top-16 -left-16"
            />
            
            <motion.div
              animate={{
                x: [-30, 20, -30],
                y: [20, -30, 20],
                scale: [1.0, 1.1, 1.0],
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
              }}
              className="absolute w-80 h-80 rounded-full blur-[50px] top-[30%] left-[30%]"
            />

            <motion.div
              animate={{
                x: [30, -30, 30],
                y: [40, -20, 40],
                scale: [1.1, 0.9, 1.1],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(122,18,32,0.08) 0%, transparent 65%)', // Soft burgundy leak
              }}
              className="absolute w-96 h-96 rounded-full blur-[60px] -bottom-20 -right-20"
            />
          </div>

          {/* Logo Container */}
          <div className="relative w-64 sm:w-72 md:w-80 h-28 flex items-center justify-center z-10">
            
            {/* Dynamic Morphing Sonar Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              {[0, 1, 2].map((i) => {
                const isEmblem = stage === 'white_emblem';
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
                    className={`absolute border border-dashed transition-all duration-500 border-white/12 ${
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
                scale: stage === 'white_emblem' ? [0.95, 1.05, 0.95] : 1.25,
                opacity: [0.12, 0.25, 0.12],
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
              }}
              transition={{
                scale: stage === 'white_emblem' ? { repeat: Infinity, duration: 2.0, ease: 'easeInOut' } : { duration: 0.6 },
                opacity: { duration: 0.6 }
              }}
              className="absolute w-72 h-72 rounded-full pointer-events-none z-0"
            />

            {/* Subtle Diagonal Shimmer Sheen Sweep */}
            {stage === 'white_logo' && (
              <motion.div
                initial={{ left: '-150%' }}
                animate={{ left: '150%' }}
                transition={{
                  duration: 1.8,
                  delay: 0.25,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)'
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
          </div>

          {/* Loading Indicator bar - Smooth continuous fill over the display duration */}
          <div className="w-56 h-[3px] bg-white/10 rounded-full mt-12 overflow-hidden relative z-10">
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ 
                left: '0%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
              }}
              transition={{ duration: MIN_DISPLAY_MS / 1000, ease: 'linear' }}
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
