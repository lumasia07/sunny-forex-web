import React, { useRef, Fragment } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
};
export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  breadcrumb
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  return (
    <section
      ref={ref}
      className="relative w-full min-h-[70vh] flex items-end bg-[#0E0E0E] overflow-hidden">
      
      <motion.div
        style={{
          y,
          scale
        }}
        className="absolute inset-0 z-0">
        
        <motion.img
          initial={{
            scale: 1.1,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            duration: 1.6,
            ease: 'easeOut'
          }}
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-[#0E0E0E]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E]/85 via-[#0E0E0E]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E]/70 via-transparent to-transparent" />
      </motion.div>

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-1.5 z-10 hidden md:block"
        style={{
          background:
          'repeating-linear-gradient(180deg, #B91C1C 0px, #B91C1C 28px, #0E0E0E 28px, #0E0E0E 36px, #FAFAF7 36px, #FAFAF7 40px, #0E0E0E 40px, #0E0E0E 48px)'
        }} />
      

      <motion.div
        style={{
          opacity
        }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-32 pb-16">
        
        {breadcrumb && breadcrumb.length > 0 &&
        <motion.nav
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="flex items-center gap-2 text-xs text-white/60 mb-8">
          
            {breadcrumb.map((item, i) =>
          <Fragment key={i}>
                {item.href ?
            <Link
              to={item.href}
              className="hover:text-white transition-colors">
              
                    {item.label}
                  </Link> :

            <span className="text-white/90">{item.label}</span>
            }
                {i < breadcrumb.length - 1 &&
            <ChevronRight className="w-3 h-3 text-white/40" />
            }
              </Fragment>
          )}
          </motion.nav>
        }

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut'
          }}
          className="flex items-center gap-4 mb-6">
          
          <div className="flex h-[3px] w-10">
            <span className="flex-1 bg-[#0E0E0E]" />
            <span className="flex-1 bg-[#B91C1C]" />
            <span className="flex-1 bg-[#006B3F]" />
          </div>
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/80">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.15
          }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.02] tracking-tighter mb-6 max-w-3xl">
          
          {title}
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.3
          }}
          className="type-lead-light max-w-xl">
          
          {description}
        </motion.p>
      </motion.div>
    </section>);

}