import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LiveBlock, LiveWords } from './LiveText';
import { SplitColumnsReveal, splitGridMotion } from './SplitColumnsReveal';
const branches = [
  {
    name: 'Kilimani Branch',
    area: 'Kilimani'
  },
  {
    name: 'Valley Arcade Branch',
    area: 'Lavington'
  },
  {
    name: 'GTC Mall Branch',
    area: 'Westlands'
  },
  {
    name: 'Village Market New Wing Branch',
    area: 'Gigiri'
  },
  {
    name: 'Village Market Old Wing Branch',
    area: 'Gigiri'
  },
  {
    name: 'Runda Branch',
    area: 'Runda'
  },
  {
    name: 'Lavington Branch',
    area: 'Lavington'
  }
];

export function Branches() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const gridY = useTransform(scrollYProgress, [0.1, 0.5], [30, 0]);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SplitColumnsReveal
          className="mb-16 items-end"
          gap="gap-6 md:gap-8"
          left={
          <div>
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
            
            <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4">
              <LiveWords text="7 branches. All across Nairobi." />
            </h2>
            <LiveBlock className="type-lead max-w-md" variant="neutral" inline={false}>
              Strategically located in Nairobi's key areas. Open 365 days a year
              including weekends and public holidays.
            </LiveBlock>
          </div>
          }
          right={
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link
              to="/branches"
              className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-[#7A1220]/20 text-sm font-bold text-[#7A1220] hover:border-[#7A1220]/40 hover:text-[#5C0D18] transition-colors group w-full sm:w-auto justify-center sm:justify-start">
              <LiveBlock className="text-sm font-bold text-[#7A1220]" variant="dark">
                View all branches
              </LiveBlock>
              <span className="w-8 h-8 rounded-full bg-[#7A1220]/10 flex items-center justify-center group-hover:bg-[#7A1220]/20 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </motion.div>
          }
        />

        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
          
          {branches.map((branch, index) =>
          <motion.div
            key={branch.name}
            {...splitGridMotion(index)}
            whileHover={{ x: 8, backgroundColor: 'rgba(122,18,32,0.02)' }}
            className="flex items-start gap-4 py-5 border-b border-gray-200 group rounded-lg px-2 -mx-2 transition-colors cursor-default">
            
              <motion.div
                whileHover={{ scale: 1.2, rotate: 15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <MapPin
                className="w-4 h-4 text-[#7A1220] mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                strokeWidth={1.5} />
              </motion.div>
            
              <div className="flex flex-col flex-1">
                <LiveBlock className="text-lg font-medium text-[#0E0E0E] mb-1 group-hover:text-[#7A1220] transition-colors" variant="dark">
                  {branch.name}
                </LiveBlock>
                <LiveBlock className="text-gray-500 font-light text-sm" variant="dark">
                  {branch.area}
                </LiveBlock>
              </div>
              
              <ArrowRight className="w-4 h-4 text-transparent group-hover:text-[#7A1220] mt-1.5 transition-all group-hover:translate-x-1" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}