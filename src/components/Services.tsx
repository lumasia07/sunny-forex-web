import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCcw, Send, Smartphone } from 'lucide-react';
const services = [
{
  icon: RefreshCcw,
  title: 'Forex Exchange',
  description:
  'Competitive rates for major global currencies. Instant exchange with no hidden fees at any of our branches.'
},
{
  icon: Send,
  title: 'Money Remittance',
  description:
  'Send and receive money globally through our trusted international partners. Fast, secure, and reliable.'
},
{
  icon: Smartphone,
  title: 'M-Pesa Transfers',
  description:
  'Seamless integration with mobile money. Convert your currency directly to or from your M-Pesa wallet instantly.'
}];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
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
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  }
};
export function Services() {
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
            margin: '-80px'
          }}
          transition={{
            duration: 0.8
          }}
          className="mb-16 max-w-2xl">
          
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
            Services built for how Kenya moves money.
          </h2>
          <p className="text-gray-500 font-light">
            From cash exchange at our branches to instant M-Pesa transfers —
            every service is engineered for speed, transparency, and trust.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            margin: '-80px'
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          
          {services.map((service) =>
          <motion.div
            key={service.title}
            variants={cardVariants}
            whileHover={{
              y: -6
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            className="flex flex-col group">
            
              <motion.div
              whileHover={{
                rotate: 360,
                scale: 1.05
              }}
              transition={{
                duration: 0.8,
                ease: 'easeInOut'
              }}
              className="w-14 h-14 rounded-full bg-white border-2 border-[#7A1220]/30 flex items-center justify-center mb-6 shadow-sm group-hover:border-[#7A1220] group-hover:shadow-md transition-all">
              
                <service.icon
                className="w-5 h-5 text-[#7A1220]"
                strokeWidth={1.75} />
              
              </motion.div>
              <h3 className="text-xl font-medium text-[#0E0E0E] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <a
              href="#"
              className="inline-flex items-center text-sm font-medium text-[#0E0E0E] hover:text-[#7A1220] transition-colors group/link w-fit">
              
                Learn more
                <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}