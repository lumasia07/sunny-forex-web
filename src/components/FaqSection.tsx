import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'What are your operational hours for currency exchange?',
    a: 'Our seven Nairobi branches are open 365 days a year for your convenience. Weekdays (Monday to Friday) from 9:00 AM to 7:00 PM, and weekends (Saturday, Sunday) and public holidays from 9:00 AM to 6:00 PM.',
  },
  {
    q: 'How does the Lock-In Rate feature work?',
    a: "You can secure today's guaranteed exchange rates instantly on our website. Once locked, your rate is guaranteed for a period of 4 hours, giving you ample time to walk into any of our branches and finalize your exchange without worrying about market shifts.",
  },
  {
    q: 'Is Sunny Forex licensed by the Central Bank of Kenya?',
    a: 'Yes, Sunny Forex is fully licensed, authorized, and regulated by the Central Bank of Kenya (CBK) as an official foreign exchange bureau. We adhere strictly to all compliance, regulatory guidelines, and anti-money laundering frameworks.',
  },
  {
    q: 'What identification documents do I need to exchange currency?',
    a: 'For personal/retail transactions below USD 10,000 equivalent, we require a valid national identification card (for Kenyan citizens) or an original passport (for foreign nationals). For corporate transactions, business registration and compliance papers may be requested.',
  },
  {
    q: 'Can I transfer foreign currency straight to my M-Pesa wallet?',
    a: 'Absolutely. We provide seamless currency-to-M-Pesa transfers instantly at any of our branches. When exchanging foreign currency, you can request the payout to be sent directly to your mobile money wallet instead of carrying physical cash.',
  },
];

function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-150 py-4 sm:py-5">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center text-left py-2 focus:outline-none group select-none"
      >
        <span className="text-base sm:text-lg font-medium text-[#0E0E0E] group-hover:text-[#7A1220] transition-colors leading-tight pr-6">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#7A1220]/10 group-hover:text-[#7A1220] transition-colors shrink-0"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 text-sm sm:text-base text-gray-500 leading-relaxed font-light">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="py-16 md:py-20 lg:py-24 bg-[#FAFAF7] border-t border-gray-100 relative overflow-hidden scroll-mt-28"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7A1220]/[0.015] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block w-12 h-px bg-[#7A1220] mb-5 mx-auto"
          />
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#7A1220] mb-3 block">
            Common Inquiries
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0E0E0E] tracking-tight leading-tight mb-4">
            Frequently Asked <span className="text-[#7A1220]">Questions.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto font-light leading-relaxed">
            Everything you need to know about our licensing, cash locking procedures, branch operational times, and remittance networks.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleAccordion(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
