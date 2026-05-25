import React, { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useScroll,
  animate } from
'framer-motion';
import { LiveBlock, LiveWords } from './LiveText';
import { SplitColumnsReveal } from './SplitColumnsReveal';
function AnimatedNumber({
  value,
  suffix = '',
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: '-40px',
    amount: 0.6,
  });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toString());

  useEffect(() => {
    if (isInView) {
      count.set(0);
      const controls = animate(count, value, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }

    count.set(0);
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}
const stats = [
{
  value: 17,
  suffix: '+',
  label: 'Years of Service',
  numeric: true
},
{
  value: 7,
  suffix: '',
  label: 'Nairobi Branches',
  numeric: true
},
{
  value: 'CBK',
  suffix: '',
  label: 'Licensed & Regulated',
  numeric: false
}];

export function TrustStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.02]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -20]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SplitColumnsReveal
          gap="gap-12 lg:gap-20"
          leftClassName="order-2 lg:order-1"
          rightClassName="order-1 lg:order-2"
          left={
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl">
            
            <motion.img
              initial={{
                scale: 1.15
              }}
              whileInView={{
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 2.5,
                ease: 'easeOut'
              }}
              src="/pexels-kelvin-kibe-3073372-26898331.jpg"
              alt="Forex chart analyzing currency movements"
              className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#7A1220]/20 via-transparent to-transparent" />
            
            {/* Decorative corner accent */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-white/30 rounded-tl-xl" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#D4A24C]/40 rounded-br-xl" />
            
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.8,
                delay: 0.6
              }}
              className="absolute bottom-6 left-6 right-6 flex items-center gap-3 text-white">
              
              <div className="flex h-[3px] w-12">
                <span className="flex-1 bg-[#0E0E0E]" />
                <span className="flex-1 bg-[#B91C1C]" />
                <span className="flex-1 bg-[#006B3F]" />
              </div>
              <LiveBlock className="text-xs font-medium tracking-[0.2em] uppercase" variant="light">
                Proudly Kenyan
              </LiveBlock>
            </motion.div>
          </motion.div>
          }
          right={
          <motion.div style={{ y: contentY }}>
            
            <motion.span
              initial={{
                scaleX: 0
              }}
              whileInView={{
                scaleX: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
              className="inline-block w-10 h-px bg-[#7A1220] mb-6 origin-left" />
            
            <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
              <LiveWords text="A legacy of trust in every transaction." />
            </h2>
            <LiveBlock className="type-lead mb-12 max-w-md" variant="neutral" inline={false}>
              Since 2008, we've built our reputation on transparency,
              competitive rates, and unwavering reliability. Licensed by the
              Central Bank of Kenya, we ensure your money moves safely across
              borders.
            </LiveBlock>

            <div className="grid grid-cols-3 gap-6 lg:gap-8">
              {stats.map((stat, index) =>
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 30
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.15
                }}
                whileHover={{ scale: 1.05 }}
                className="flex gap-4 cursor-default">
                
                  <span className="block w-px bg-[#7A1220] self-stretch" />
                  <div className="flex flex-col">
                    <LiveBlock className="text-3xl md:text-4xl font-bold text-[#0E0E0E] mb-2 leading-none tabular-nums" variant="neutral">
                      {stat.numeric ? (
                        <AnimatedNumber value={stat.value as number} suffix={stat.suffix} />
                      ) : (
                        stat.value
                      )}
                    </LiveBlock>
                    <LiveBlock className="text-[11px] font-medium text-gray-400 uppercase tracking-wider" variant="dark">
                      {stat.label}
                    </LiveBlock>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
          }
        />
      </div>
    </section>);

}