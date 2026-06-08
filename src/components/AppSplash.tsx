import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeLoader } from './GlobeLoader';

const SESSION_KEY = 'sunny-forex-splash-seen';
const MIN_DISPLAY_MS = 900;
const FADE_OUT_MS = 350;

function preloadHeroBackground(): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = '/pexels-sergey-pesterev-69811391-8427984.jpg';
  });
}

type AppSplashProps = {
  onComplete: () => void;
};

export function AppSplash({ onComplete }: AppSplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => {
        setVisible(false);
        window.setTimeout(onComplete, FADE_OUT_MS);
      }, remaining);
    };

    Promise.all([
      preloadHeroBackground(),
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener('load', () => resolve(), { once: true });
          }),
    ]).then(finish);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          role="status"
          aria-label="Loading SunnyRemit">
          <GlobeLoader />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
            className="font-brand text-xl sm:text-2xl text-[#7A1220] mt-8 tracking-tight">
            SunnyRemit
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mt-3">
            Loading rates…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function shouldShowSplash(): boolean {
  try {
    return !sessionStorage.getItem(SESSION_KEY);
  } catch {
    return true;
  }
}

export function markSplashSeen(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* ignore */
  }
}
