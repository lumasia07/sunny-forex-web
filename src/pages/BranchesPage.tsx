import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { MapPin, Phone, Clock } from 'lucide-react';
const branches = [
  {
    name: 'Valley Arcade',
    area: 'Lavington',
    address: 'Valley Arcade Shopping Centre, Gitanga Road, Lavington',
    phone: '0722 360 800',
    hours: 'Mon – Fri: 9:00 AM – 7:00 PM',
    flagship: true,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunny+Forex+Bureau+Valley+Arcade+Nairobi'
  },
  {
    name: 'Valley Arcade (Branch 2)',
    area: 'Lavington',
    address: 'Valley Arcade Shopping Centre, Gitanga Road, Lavington',
    phone: '0722 360 800',
    hours: 'Mon – Fri: 9:00 AM – 7:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunny+Forex+Bureau+Valley+Arcade+Nairobi'
  },
  {
    name: 'Village Market',
    area: 'Gigiri',
    address: 'Village Market Shopping Centre, Limuru Road, Gigiri',
    phone: '0718 040 847',
    hours: 'Mon – Fri: 9:00 AM – 7:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunny+Forex+Bureau+Village+Market+Nairobi'
  },
  {
    name: 'Village Market (Old Wing)',
    area: 'Gigiri',
    address: 'Village Market Shopping Centre, Limuru Road, Gigiri',
    phone: '0718 040 847',
    hours: 'Mon – Fri: 9:00 AM – 7:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunny+Forex+Bureau+Village+Market+Nairobi'
  },
  {
    name: 'Sarit Centre',
    area: 'Westlands',
    address: 'Sarit Centre, Westlands Road, Westlands',
    phone: '0722 350 400',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunny+Forex+Bureau+Sarit+Centre+Nairobi'
  },
  {
    name: 'Two Rivers Mall',
    area: 'Ruaka',
    address: 'Two Rivers Mall, Limuru Road, Ruaka',
    phone: '0722 350 401',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunny+Forex+Bureau+Two+Rivers+Mall+Nairobi'
  },
  {
    name: 'Junction Mall',
    area: 'Ngong Road',
    address: 'Junction Mall, Ngong Road, Dagoretti',
    phone: '0722 350 402',
    hours: 'Mon – Sun: 10:00 AM – 8:00 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunny+Forex+Bureau+Junction+Mall+Nairobi'
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};
export function BranchesPage() {
  return (
    <>
      <PageHero
        eyebrow="Branch Network"
        title="7 branches. All across Nairobi."
        description="Strategically located in Nairobi's key areas. Open 365 days a year including weekends and public holidays."
        imageSrc="/pexels-sergey-pesterev-69811391-8427984.jpg"
        imageAlt="Nairobi physical branches"
        breadcrumb={[
        {
          label: 'Home',
          href: '/'
        },
        {
          label: 'Branches'
        }]
        } />
      

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              margin: '-80px'
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {branches.map((branch) =>
            <motion.div
              key={branch.name}
              variants={cardVariants}
              whileHover={{
                y: -4
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25
              }}
              className={`relative flex flex-col p-8 rounded-3xl border transition-all ${branch.flagship ? 'border-[#7A1220]/40 bg-[#FAFAF7] shadow-md' : 'border-gray-100 hover:border-[#7A1220]/30 hover:shadow-md'}`}>
              
                {branch.flagship &&
              <span className="absolute top-6 right-6 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#7A1220] bg-[#7A1220]/10 px-3 py-1 rounded-full">
                    Flagship
                  </span>
              }

                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white border-2 border-[#7A1220]/30 flex items-center justify-center">
                    <MapPin
                    className="w-4 h-4 text-[#7A1220]"
                    strokeWidth={1.75} />
                  
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-medium text-[#0E0E0E] leading-tight">
                      {branch.name}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                      {branch.area}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm font-light text-gray-500 mt-4 mb-6 flex-grow">
                  <p className="leading-relaxed">{branch.address}</p>
                  <p className="flex items-center gap-2">
                    <Phone
                    className="w-3.5 h-3.5 text-gray-400"
                    strokeWidth={1.75} />
                  
                    {branch.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock
                    className="w-3.5 h-3.5 text-gray-400"
                    strokeWidth={1.75} />
                  
                    {branch.hours}
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#7A1220] hover:text-[#5C0D18] transition-colors">
                  
                    Get directions
                  </a>
                  <span className="text-gray-300">·</span>
                  <a
                  href={`tel:${branch.phone.replace(/\s/g, '')}`}
                  className="text-sm font-medium text-[#0E0E0E] hover:text-[#7A1220] transition-colors">
                  
                    Call branch
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <CtaBand />
    </>);

}