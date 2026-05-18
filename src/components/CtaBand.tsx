import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
const contactMethods = [
{
  icon: Phone,
  label: 'Speak to a specialist',
  value: '+254 722 350 400',
  href: 'tel:+254722350400'
},
{
  icon: Mail,
  label: 'Corporate enquiries',
  value: 'enterprise@sunnyforex.co.ke',
  href: 'mailto:enterprise@sunnyforex.co.ke'
},
{
  icon: MapPin,
  label: 'Visit our headquarters',
  value: 'Kaunda Street, Nairobi CBD',
  href: '#'
}];

export function CtaBand() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[#0E0E0E] text-white overflow-hidden">
      
      {/* Background — Nairobi at night, subtle */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1535082623926-b39352a03fb7?q=80&w=2940&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/85 to-[#0E0E0E]/60" />
      </div>

      {/* Maroon accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7A1220] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Headline + Copy */}
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
              duration: 0.8
            }}>
            
            <span className="inline-block w-10 h-px bg-[#B91C1C] mb-6" />
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/60 mb-6">
              Enterprise & Corporate
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-[1.1] mb-6">
              Move money with confidence.
            </h2>
            <p className="text-lg text-white/70 font-light leading-relaxed mb-10 max-w-md">
              Whether you're managing corporate treasury, processing payroll
              across borders, or sending money home — our team is ready to build
              a solution around you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:enterprise@sunnyforex.co.ke"
                className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-full bg-[#7A1220] text-white font-medium hover:bg-[#5C0D18] transition-colors group">
                
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-transparent border border-white/30 text-white font-medium hover:bg-white/5 hover:border-white/60 transition-colors">
                
                Schedule a meeting
              </a>
            </div>
          </motion.div>

          {/* Right: Contact Methods */}
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
              delay: 0.15
            }}
            className="flex flex-col">
            
            {contactMethods.map((method, index) =>
            <a
              key={method.label}
              href={method.href}
              className={`group flex items-start gap-5 py-6 ${index !== contactMethods.length - 1 ? 'border-b border-white/10' : ''} ${index === 0 ? 'border-t border-white/10' : ''} hover:bg-white/[0.02] transition-colors px-2 -mx-2`}>
              
                <div className="w-11 h-11 rounded-full border-2 border-[#7A1220]/50 flex items-center justify-center flex-shrink-0 group-hover:border-[#B91C1C] transition-colors">
                  <method.icon
                  className="w-4 h-4 text-[#B91C1C]"
                  strokeWidth={1.75} />
                
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-xs font-medium tracking-wider uppercase text-white/50 mb-1.5">
                    {method.label}
                  </span>
                  <span className="text-lg font-light text-white group-hover:text-white transition-colors">
                    {method.value}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/40 mt-3 group-hover:text-[#B91C1C] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </a>
            )}

            <div className="mt-8 pt-6 flex items-center gap-3 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>
                Mon – Fri, 8:00 AM – 6:00 PM EAT · Sat, 9:00 AM – 2:00 PM
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}