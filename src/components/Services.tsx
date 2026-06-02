import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    accent: '#7A1220',
  },
  {
    icon: Send,
    title: 'Money Remittance',
    description:
      'Send and receive money globally through our trusted international partners. Fast, secure, and reliable.',
    href: '/remittance',
    accent: '#006B3F',
  },
  {
    icon: Smartphone,
    title: 'M-Pesa Transfers',
    description:
      'Seamless integration with mobile money. Convert your currency directly to or from your M-Pesa wallet instantly.',
    href: '/remittance',
    accent: '#D4A24C',
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
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
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
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;
  const [isHovered, setIsHovered] = useState(false);

  const inner = (
    <>
      <div className="relative z-10 flex flex-col min-h-[300px] sm:min-h-[330px] h-full p-6 sm:p-8">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#FFFFFF]/10"
          style={{
            backgroundColor: service.accent,
          }}>
          <Icon
            className="w-5 h-5 text-white"
            strokeWidth={2}
          />
        </div>

        {/* Service number */}
        <span 
          className="text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-300 mb-2 block"
          style={{ color: isHovered ? service.accent : '#D1D5DB' }}
        >
          0{index + 1}
        </span>

        <h3 
          className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight mb-3 transition-colors duration-300"
          style={{ color: isHovered ? service.accent : '#0E0E0E' }}
        >
          <LiveWords text={service.title} variant="neutral" />
        </h3>

        <LiveBlock
          className="text-sm sm:text-base text-gray-500 font-light leading-relaxed mb-4 transition-colors duration-300"
          variant="neutral"
          inline={false}>
          {service.description}
        </LiveBlock>

        <motion.span
          className="inline-flex items-center gap-2 text-sm font-bold w-fit mt-auto cursor-default transition-colors duration-300"
          style={{ color: service.accent }}
          whileHover={{ x: 8, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
          <LiveBlock variant="neutral">Learn more</LiveBlock>
          <span 
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: isHovered ? `${service.accent}20` : `${service.accent}10` }}
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </motion.span>
      </div>
    </>
  );

  const cardClass =
    'group relative block h-full rounded-xl overflow-hidden border bg-white shadow-lg transition-all duration-500';

  const cardStyle = {
    borderTop: `4px solid ${isHovered ? service.accent : 'transparent'}`,
    borderLeft: '1px solid #E5E7EB',
    borderRight: '1px solid #E5E7EB',
    borderBottom: '1px solid #E5E7EB',
    boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.08)' : '0 10px 30px rgba(0, 0, 0, 0.04)',
    backgroundColor: '#FFFFFF',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full">
      {service.href ? (
        <Link to={service.href} className={cardClass} style={cardStyle}>
          {inner}
        </Link>
      ) : (
        <div className={cardClass} style={cardStyle}>{inner}</div>
      )}
    </motion.div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mb-16 max-w-2xl">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block w-10 h-px bg-[#7A1220] mb-6 origin-left"
          />
          <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl mb-4">
            <LiveWords text="Services built for how Kenya moves money." />
          </h2>
          <LiveBlock className="type-lead" variant="neutral" inline={false}>
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
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
