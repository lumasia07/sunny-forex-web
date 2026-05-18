import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const branches = [
{
  name: 'Valley Arcade',
  area: 'Lavington'
},
{
  name: 'Valley Arcade (Branch 2)',
  area: 'Lavington'
},
{
  name: 'Village Market',
  area: 'Gigiri'
},
{
  name: 'Village Market (Old Wing)',
  area: 'Gigiri'
},
{
  name: 'Sarit Centre',
  area: 'Westlands'
},
{
  name: 'Two Rivers Mall',
  area: 'Ruaka'
},
{
  name: 'Junction Mall',
  area: 'Ngong Road'
}];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};
export function Branches() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.8
          }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          
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
            
            <h2 className="text-3xl md:text-4xl font-light text-[#0E0E0E] mb-4">
              7 branches. All across Nairobi.
            </h2>
            <p className="text-gray-500 font-light max-w-md">
              Strategically located in Nairobi's key areas. Open 365 days a year
              including weekends and public holidays.
            </p>
          </div>
          <Link
            to="/branches"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#7A1220] hover:text-[#5C0D18] transition-colors group">
            
            View all branches
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: '-50px'
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
          
          {branches.map((branch) =>
          <motion.div
            key={branch.name}
            variants={itemVariants}
            className="flex items-start gap-4 py-5 border-b border-gray-200 group">
            
              <MapPin
              className="w-4 h-4 text-[#7A1220] mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform"
              strokeWidth={1.5} />
            
              <div className="flex flex-col flex-1">
                <h4 className="text-lg font-medium text-[#0E0E0E] mb-1 group-hover:text-[#7A1220] transition-colors">
                  {branch.name}
                </h4>
                <p className="text-gray-500 font-light text-sm">
                  {branch.area}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}