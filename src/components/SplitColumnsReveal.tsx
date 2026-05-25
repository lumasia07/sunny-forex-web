import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

type SplitColumnsRevealProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
  gap?: string;
  leftClassName?: string;
  rightClassName?: string;
  /** Distance columns travel before meeting (px) */
  offset?: number;
};

/** Two columns slide in from left & right and meet at the centre on scroll. */
export function SplitColumnsReveal({
  left,
  right,
  className = '',
  gap = 'gap-10 lg:gap-16 xl:gap-20',
  leftClassName = '',
  rightClassName = '',
  offset = 72,
}: SplitColumnsRevealProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 items-center ${gap} ${className}`}>
      <motion.div
        className={leftClassName}
        initial={{ opacity: 0, x: -offset }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px', amount: 0.2 }}
        transition={{ duration: 0.85, ease }}>
        {left}
      </motion.div>
      <motion.div
        className={rightClassName}
        initial={{ opacity: 0, x: offset }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px', amount: 0.2 }}
        transition={{ duration: 0.85, delay: 0.1, ease }}>
        {right}
      </motion.div>
    </div>
  );
}

type SplitSlideProps = {
  children: React.ReactNode;
  from?: 'left' | 'right';
  className?: string;
  delay?: number;
  offset?: number;
};

/** Single block slides from left or right into place on scroll. */
export function SplitSlide({
  children,
  from = 'left',
  className = '',
  delay = 0,
  offset = 56,
}: SplitSlideProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: from === 'left' ? -offset : offset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.15 }}
      transition={{ duration: 0.75, delay, ease }}>
      {children}
    </motion.div>
  );
}

/** For grids: even indices from left, odd from right. */
export function splitGridMotion(index: number, offset = 48) {
  const fromLeft = index % 2 === 0;
  return {
    initial: { opacity: 0, x: fromLeft ? -offset : offset, y: 8 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: '-40px' as const },
    transition: {
      duration: 0.7,
      delay: (index % 2) * 0.08,
      ease,
    },
  };
}
