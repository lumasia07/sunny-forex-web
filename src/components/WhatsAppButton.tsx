import React, { useEffect, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
// Branch data — confirmed from sunny-forex.vercel.app/branches
const branches = [
  {
    name: 'Kilimani Branch',
    area: 'Kilimani',
    address: 'Woodridge Centre, Wood Avenue, Kilimani Nairobi, Kenya',
    phone: '+254 722 350 400',
    whatsapp: '254722350400',
    hours: 'Mon-Fri | 9:00 AM to 7:00 PM · Sat-Sun | 9:00 AM to 6:00 PM',
    status: 'Open'
  },
  {
    name: 'Valley Arcade Branch',
    area: 'Lavington',
    address: 'Valley Arcade Shopping Mall, Gitanga Road, Lavington Nairobi, Kenya',
    phone: '+254 722 360 800',
    whatsapp: '254722360800',
    hours: 'Mon-Fri | 9:00 AM to 7:00 PM · Sat-Sun | 9:00 AM to 6:00 PM',
    status: 'Open'
  },
  {
    name: 'GTC Mall Branch',
    area: 'Westlands',
    address: 'GTC Mall, Chiromo Lane, Westlands, Nairobi, Kenya',
    phone: '+254 722 305 188',
    whatsapp: '254722305188',
    hours: 'Mon-Fri | 9:00 AM to 7:00 PM · Sat-Sun | 9:00 AM to 6:00 PM',
    status: 'Open'
  },
  {
    name: 'Village Market New Wing Branch',
    area: 'Gigiri / Limuru Road',
    address: 'Village Market Mall – New Wing G/F, Limuru Road, Nairobi, Kenya',
    phone: '+254 718 040 847',
    whatsapp: '254718040847',
    hours: 'Mon-Fri | 9:00 AM to 7:00 PM · Sat-Sun | 9:00 AM to 6:00 PM',
    status: 'Open'
  },
  {
    name: 'Village Market Old Wing Branch',
    area: 'Gigiri / Limuru Road',
    address: 'Village Market Mall – Old Wing G/F, Limuru Road Nairobi, Kenya',
    phone: '+254 722 454 757',
    whatsapp: '254722454757',
    hours: 'Mon-Fri | 9:00 AM to 7:00 PM · Sat-Sun | 9:00 AM to 6:00 PM',
    status: 'Open'
  },
  {
    name: 'Runda Branch',
    area: 'Runda / Kiambu Road',
    address: 'Runda Mall G/F, Kiambu Road Nairobi, Kenya',
    phone: '+254 722 109 594',
    whatsapp: '254722109594',
    hours: 'Mon-Fri | 9:00 AM to 7:00 PM · Sat-Sun | 9:00 AM to 6:00 PM',
    status: 'Open'
  },
  {
    name: 'Lavington Branch',
    area: 'Lavington',
    address: 'Lavington Avenue Complex G/F, James Gichuru Road Nairobi, Kenya',
    phone: '+254 722 155 599',
    whatsapp: '254722155599',
    hours: 'Mon-Fri | 9:00 AM to 7:00 PM · Sat-Sun | 9:00 AM to 6:00 PM',
    status: 'Open'
  }
];

function WhatsAppIcon({
  className = '',
  size = 24



}: {className?: string;size?: number;}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true">
      
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>);

}
export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  // Show pulsing tooltip-style label after a few seconds
  useEffect(() => {
    const t = setTimeout(() => setShowLabel(true), 2500);
    return () => clearTimeout(t);
  }, []);
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center gap-3">
        <AnimatePresence>
          {showLabel && !isOpen &&
          <motion.div
            initial={{
              opacity: 0,
              x: 10,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              x: 10,
              scale: 0.9
            }}
            transition={{
              duration: 0.4,
              ease: 'easeOut'
            }}
            className="hidden sm:flex items-center gap-2 bg-white rounded-full pl-4 pr-5 py-2.5 shadow-xl border border-gray-100">
            
              <span className="text-sm font-medium text-[#0E0E0E]">
                Chat with a branch
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </motion.div>
          }
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{
            scale: 0,
            rotate: -180
          }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 1
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.95
          }}
          aria-label="Open WhatsApp chat with our branches"
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#1FB855] transition-colors group">
          
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20" />
          <WhatsAppIcon className="relative z-10" size={28} />
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen &&
        <>
            {/* Backdrop */}
            <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.3
            }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-[#0E0E0E]/60 backdrop-blur-sm" />
          

            {/* Modal panel */}
            <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            
              <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col">
                {/* Kenyan flag stripe */}
                <div className="absolute top-0 left-0 right-0 flex h-1 z-10">
                  <span className="flex-1 bg-[#0E0E0E]" />
                  <span className="flex-1 bg-[#B91C1C]" />
                  <span className="flex-1 bg-[#006B3F]" />
                </div>

                {/* Header */}
                <div className="px-6 md:px-8 pt-8 pb-6 border-b border-gray-100 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#25D366]/10 border-2 border-[#25D366]/40 flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="text-[#25D366]" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-light text-[#0E0E0E] leading-tight">
                        Chat with our branches
                      </h3>
                      <p className="text-sm text-gray-500 font-light mt-1">
                        Open 7 days · Tap a branch to start a WhatsApp
                        conversation
                      </p>
                    </div>
                  </div>
                  <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Close">
                  
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                {/* Branch list */}
                <div className="flex-1 overflow-y-auto px-2 md:px-4 py-2">
                  {branches.map((branch, i) =>
                <motion.a
                  key={branch.name}
                  href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Hello Sunny Forex (${branch.name}), I'd like to enquire about a transaction.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0,
                    x: -10
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + i * 0.05,
                    ease: 'easeOut'
                  }}
                  className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-[#FAFAF7] transition-colors">
                  
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-medium text-[#0E0E0E] truncate">
                            {branch.name}
                          </h4>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            {branch.status}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1 text-xs text-gray-500">
                          <p className="flex items-center gap-1.5 truncate">
                            <MapPin
                          className="w-3 h-3 text-[#7A1220] flex-shrink-0"
                          strokeWidth={1.75} />
                        
                            <span className="truncate">{branch.address}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Clock
                          className="w-3 h-3 text-gray-400 flex-shrink-0"
                          strokeWidth={1.75} />
                        
                            {branch.hours}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                      href={`tel:+${branch.whatsapp}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-9 h-9 rounded-full border border-gray-200 hover:border-[#7A1220] hover:bg-[#7A1220] hover:text-white flex items-center justify-center transition-all"
                      aria-label={`Call ${branch.name}`}>
                      
                          <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </a>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-medium group-hover:bg-[#1FB855] transition-colors">
                          <MessageCircle
                        className="w-3.5 h-3.5"
                        strokeWidth={2} />
                      
                          Chat
                        </span>
                      </div>
                    </motion.a>
                )}
                </div>

                {/* Footer */}
                <div className="px-6 md:px-8 py-4 border-t border-gray-100 bg-[#FAFAF7] flex items-center justify-between gap-4">
                  <p className="text-xs text-gray-500 font-light">
                    Replies within minutes during business hours
                  </p>
                  <a
                  href="mailto:info@sunnyremit.com"
                  className="text-xs font-medium text-[#7A1220] hover:text-[#5C0D18] transition-colors">
                  
                    Email instead →
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>
    </>);

}