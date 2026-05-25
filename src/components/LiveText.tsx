import React from 'react';
import { motion } from 'framer-motion';

type LiveVariant = 'dark' | 'light' | 'card' | 'neutral';

const spring = { type: 'spring' as const, stiffness: 400, damping: 18 };
const springSoft = { type: 'spring' as const, stiffness: 350, damping: 22 };

const wordHover: Record<LiveVariant, object> = {
  dark: { y: -4, scale: 1.04, color: '#7A1220' },
  light: {
    y: -4,
    scale: 1.04,
    color: '#ffffff',
    textShadow:
      '0 0 14px rgba(255,255,255,0.55), 0 0 28px rgba(185,28,28,0.45), 0 1px 3px rgba(0,0,0,0.8)',
  },
  card: {
    y: -5,
    scale: 1.06,
    textShadow:
      '0 0 18px rgba(255,255,255,0.55), 0 0 36px rgba(185,28,28,0.65), 0 2px 8px rgba(0,0,0,1)',
  },
  neutral: { y: -4, scale: 1.04 },
};

const blockHover: Record<LiveVariant, object> = {
  dark: { x: 6, scale: 1.01, color: '#7A1220' },
  light: {
    x: 6,
    scale: 1.01,
    color: 'rgba(255,255,255,1)',
    textShadow:
      '0 0 14px rgba(255,255,255,0.45), 0 0 28px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,1)',
  },
  card: {
    x: 6,
    color: 'rgba(255,255,255,1)',
    textShadow:
      '0 0 14px rgba(255,255,255,0.45), 0 0 28px rgba(0,0,0,0.75), 0 1px 4px rgba(0,0,0,1)',
  },
  neutral: { x: 6, scale: 1.01 },
};

export function LiveWords({
  text,
  className = '',
  variant = 'dark',
}: {
  text: string;
  className?: string;
  variant?: LiveVariant;
}) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={`inline-block cursor-default ${className}`}
          whileHover={wordHover[variant]}
          transition={spring}>
          {word}
          {index < text.split(' ').length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </>
  );
}

export function LiveBlock({
  children,
  className = '',
  variant = 'dark',
  inline = true,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: LiveVariant;
  inline?: boolean;
}) {
  const Component = inline ? motion.span : motion.p;

  return (
    <Component
      className={`cursor-default ${inline ? 'inline-block' : 'block'} ${className}`}
      whileHover={blockHover[variant]}
      transition={springSoft}>
      {children}
    </Component>
  );
}

export function LiveLine({
  children,
  className = '',
  variant = 'dark',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: LiveVariant;
}) {
  return (
    <motion.span
      className={`inline-block cursor-default ${className}`}
      whileHover={wordHover[variant]}
      transition={spring}>
      {children}
    </motion.span>
  );
}
