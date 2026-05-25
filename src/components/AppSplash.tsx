import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlobeLoader } from './GlobeLoader';

const SESSION_KEY = 'sunny-forex-splash-seen';

type AppSplashProps = {
  onComplete: () => void;
};

export function AppSplash({ onComplete }: AppSplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minDisplay = 2200;
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDisplay - elapsed);
      window.setTimeout(() => {
        setVisible(false);
        window.setTimeout(onComplete, 500);
      }, remaining);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
      return () => window.removeEventListener('load', finish);
    }
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white"
          role="status"
          aria-label="Loading Sunny Forex">
          <GlobeLoader />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-brand text-xl sm:text-2xl text-[#0E0E0E] mt-8 tracking-tight">
            Sunny <span className="text-[#7A1220]">Forex</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
