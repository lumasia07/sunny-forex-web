import React, { useEffect, useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate } from
'framer-motion';
import { LiveBlock, LiveWords } from './LiveText';
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
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              x: 0
            }}
            viewport={{
              once: true,
              margin: '-80px'
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm order-2 lg:order-1">
            
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
              src="/pexels-jakubzerdzicki-30572289.jpg"
              alt="Forex chart analyzing currency movements"
              className="w-full h-full object-cover" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#7A1220]/20 via-transparent to-transparent" />
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

          {/* Right: Copy + Stats */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              margin: '-80px'
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="order-1 lg:order-2">
            
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
            
            <h2 className="text-3xl md:text-4xl font-light text-[#0E0E0E] leading-tight mb-6">
              <LiveWords text="A legacy of trust in every transaction." />
            </h2>
            <LiveBlock className="text-lg text-gray-500 font-light leading-relaxed max-w-md mb-12" variant="dark" inline={false}>
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
                className="flex gap-4">
                
                  <span className="block w-px bg-[#7A1220] self-stretch" />
                  <div className="flex flex-col">
                    <LiveBlock className="text-3xl md:text-4xl font-light text-[#0E0E0E] mb-2 leading-none tabular-nums" variant="dark">
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
        </div>
      </div>
    </section>);

}