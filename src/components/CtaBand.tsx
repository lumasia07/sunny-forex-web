import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { LiveBlock, LiveWords } from './LiveText';
import { SplitColumnsReveal } from './SplitColumnsReveal';
const contactMethods = [
{
  icon: Phone,
  label: 'Speak to a specialist',
  value: '+254 722 590 049',
  href: 'tel:+254722590049'
},
{
  icon: Mail,
  label: 'Email us',
  value: 'info@sunnyremit.com / info@sunnyforex.co.ke',
  href: 'mailto:info@sunnyremit.com'
},
{
  icon: MapPin,
  label: 'Visit our headquarters',
  value: 'Lavington Avenue Complex, Ground Floor, James Gichuru Road, Lavington, Nairobi, Kenya',
  href: 'https://www.google.com/maps/search/?api=1&query=Lavington+Avenue+Complex+James+Gichuru+Road+Nairobi'
}];

export function CtaBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 md:py-20 lg:py-24 bg-[#0E0E0E] text-white overflow-hidden">
      
      {/* Background — Nairobi at night with parallax */}
      <motion.div className="absolute inset-0 z-0 opacity-30" style={{ y: bgY }}>
        <img
          src="/pexels-mnmshakir-35034068.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/85 to-[#0E0E0E]/60" />
      </motion.div>

      {/* Animated maroon accent line top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #7A1220, transparent)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Floating ambient particles */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-[#7A1220]/10 blur-[80px]"
        style={{ top: '10%', right: '5%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-[#D4A24C]/8 blur-[60px]"
        style={{ bottom: '15%', left: '10%' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <SplitColumnsReveal
          gap="gap-16 lg:gap-24"
          className="items-start"
          left={
          <div>
            
            <span className="inline-block w-10 h-px bg-[#B91C1C] mb-6" />
            <LiveBlock className="type-label uppercase tracking-[0.2em] text-white/60 mb-6" variant="neutral">
              Enterprise & Corporate
            </LiveBlock>
            <h2 className="font-bold text-4xl md:text-5xl text-white tracking-tighter leading-[1.02] mb-6">
              <LiveWords text="Move money with confidence." variant="neutral" />
            </h2>
            <LiveBlock className="type-lead-light mb-10 max-w-md" variant="neutral" inline={false}>
              Whether you're managing corporate treasury, processing payroll
              across borders, or sending money home — our team is ready to build
              a solution around you.
            </LiveBlock>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="mailto:info@sunnyremit.com"
                className="inline-flex justify-center items-center gap-3 pl-8 pr-2.5 py-2.5 rounded-full bg-[#7A1220] text-white font-bold text-base hover:bg-[#5C0D18] transition-colors group"
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(122,18,32,0.4)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                Contact Us
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.a>
              <Link
                to="/corporate"
                className="inline-flex justify-center items-center gap-3 pl-8 pr-2.5 py-2.5 rounded-full bg-transparent border border-white/30 text-white font-bold text-base hover:bg-white/5 hover:border-white/60 transition-colors group">
                Schedule a meeting
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <ArrowRight className="w-[18px] h-[18px] group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
          }
          right={
          <div className="flex flex-col">
            
            {contactMethods.map((method, index) =>
            <motion.a
              key={method.label}
              href={method.href}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
              whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.03)' }}
              className={`group flex items-start gap-5 py-6 ${index !== contactMethods.length - 1 ? 'border-b border-white/10' : ''} ${index === 0 ? 'border-t border-white/10' : ''} transition-colors px-2 -mx-2 rounded-lg`}>
              
                <motion.div
                  className="w-11 h-11 rounded-full border-2 border-[#7A1220]/50 flex items-center justify-center flex-shrink-0 group-hover:border-[#B91C1C] transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <method.icon
                  className="w-4 h-4 text-[#B91C1C]"
                  strokeWidth={1.75} />
                
                </motion.div>
                <div className="flex-1 flex flex-col">
                  <LiveBlock className="text-xs font-medium tracking-wider uppercase text-white/50 mb-1.5" variant="light">
                    {method.label}
                  </LiveBlock>
                  <LiveBlock className="text-lg font-light text-white" variant="light">
                    {method.value}
                  </LiveBlock>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 mt-3 group-hover:text-[#B91C1C] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </motion.a>
            )}

            <div className="mt-8 pt-6 flex items-center gap-3 text-xs text-white/50">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <LiveBlock variant="light">
                Mon – Fri, 8:00 AM – 6:00 PM EAT · Sat, 9:00 AM – 2:00 PM
              </LiveBlock>
            </div>
          </div>
          }
        />
      </div>
    </section>);

}