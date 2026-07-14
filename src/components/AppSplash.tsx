import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_DISPLAY_MS = 1200; // Snappy, clean loading display
const FADE_OUT_MS = 300;

type AppSplashProps = {
  onComplete: () => void;
};

export function AppSplash({ onComplete }: AppSplashProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, FADE_OUT_MS);
    }, MIN_DISPLAY_MS);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-[#FAF9F5]"
          role="status"
          aria-label="Loading SunnyRemit"
        >
          {/* Static Logo Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-48 sm:w-56 md:w-64 h-auto flex items-center justify-center z-10"
          >
            <img
              src="/sunny_logo_large.svg"
              alt="SunnyRemit"
              className="w-full h-auto object-contain"
            />
          </motion.div>
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
