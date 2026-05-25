import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, RefreshCcw, Send, Smartphone } from 'lucide-react';
import { LiveBlock, LiveWords } from './LiveText';

const services = [
  {
    icon: RefreshCcw,
    title: 'Forex Exchange',
    description:
      'Competitive rates for major global currencies. Instant exchange with no hidden fees at any of our branches.',
    href: '/forex',
  },
  {
    icon: Send,
    title: 'Money Remittance',
    description:
      'Send and receive money globally through our trusted international partners. Fast, secure, and reliable.',
    href: '/remittance',
  },
  {
    icon: Smartphone,
    title: 'M-Pesa Transfers',
    description:
      'Seamless integration with mobile money. Convert your currency directly to or from your M-Pesa wallet instantly.',
    href: '/remittance',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

function AnimatedTitle({ title }: { title: string }) {
  return (
    <h3 className="text-2xl sm:text-3xl font-semibold text-[#0E0E0E] group-hover:text-white leading-tight tracking-tight mb-3 transition-colors duration-500">
      <LiveWords text={title} variant="neutral" />
    </h3>
  );
}

function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  const Icon = service.icon;

  const inner = (
    <>
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[#7A1220] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.88]" />

      <div className="relative z-10 flex flex-col min-h-[280px] sm:min-h-[300px] h-full p-5 sm:p-6 group-hover:[&_*]:text-white">
        <motion.div
          className="w-10 h-10 rounded-full bg-[#7A1220]/8 border border-[#7A1220]/15 flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:border-white/30 transition-colors duration-500 cursor-default"
          whileHover={{
            scale: 1.12,
            rotate: 8,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 16 }}>
          <Icon className="w-4 h-4 text-[#7A1220] group-hover:text-white transition-colors duration-500" strokeWidth={1.75} />
        </motion.div>

        <AnimatedTitle title={service.title} />

        <LiveBlock
          className="text-sm sm:text-base text-gray-500 group-hover:text-white font-light leading-relaxed mb-3 transition-colors duration-500"
          variant="neutral"
          inline={false}>
          {service.description}
        </LiveBlock>

        <motion.span
          className="inline-flex items-center text-sm font-semibold text-[#7A1220] group-hover:text-[#FAFAF7] w-fit mt-auto cursor-default transition-colors duration-500"
          whileHover={{ x: 8, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
          <LiveBlock variant="neutral">Learn more</LiveBlock>
          <motion.span whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.span>
        </motion.span>
      </div>
    </>
  );

  const cardClass =
    'group relative block h-full rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-lg group-hover:shadow-2xl group-hover:border-[#7A1220]/40 transition-all duration-500';

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="h-full">
      {service.href ? (
        <Link to={service.href} className={cardClass}>
          {inner}
        </Link>
      ) : (
        <div className={cardClass}>{inner}</div>
      )}
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block w-10 h-px bg-[#7A1220] mb-6 origin-left"
          />
          <h2 className="text-3xl md:text-4xl font-light text-[#0E0E0E] mb-4">
            <LiveWords text="Services built for how Kenya moves money." />
          </h2>
          <LiveBlock className="text-gray-500 font-light" variant="dark" inline={false}>
            From cash exchange at our branches to instant M-Pesa transfers — every service is
            engineered for speed, transparency, and trust.
          </LiveBlock>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
