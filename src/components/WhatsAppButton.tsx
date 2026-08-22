import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { BRANCHES_DATA } from '../data/branchesData';

function WhatsAppIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.275-.1-.476-.15-.677.15-.201.3-.777.978-.953 1.179-.175.2-.351.225-.652.075-.3-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.3-.019-.462.131-.611.136-.134.301-.35.452-.526.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.631-.928-2.235-.244-.588-.492-.508-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.375-.276.3-1.054 1.03-1.054 2.513 0 1.482 1.079 2.912 1.23 3.112.15.2 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.23 1.378.198 1.898.12.58-.088 1.78-.728 2.03-1.431.251-.703.251-1.306.176-1.431-.075-.125-.276-.2-.577-.35zM12.042 21.5c-1.731 0-3.424-.46-4.908-1.334l-.352-.209-3.649.957.974-3.558-.23-.365A9.458 9.458 0 0 1 2.5 12.042C2.5 6.78 6.78 2.5 12.042 2.5c2.55 0 4.947.994 6.75 2.798A9.475 9.475 0 0 1 21.584 12.04c0 5.263-4.28 9.46-9.542 9.46zm0-17.5c-4.433 0-8.042 3.609-8.042 8.042 0 1.416.37 2.797 1.07 4.012l.169.294-.637 2.327 2.384-.625.285.169a8.006 8.006 0 0 0 4.771 1.365c4.433 0 8.042-3.609 8.042-8.042 0-2.148-.837-4.168-2.356-5.687A7.99 7.99 0 0 0 12.042 4z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 1,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open WhatsApp chat with our branches"
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#1FB855] transition-colors group"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-20" />
          <WhatsAppIcon className="relative z-10" size={28} />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[#0E0E0E]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col">
                <div className="absolute top-0 left-0 right-0 flex h-1 z-10">
                  <span className="flex-1 bg-[#0E0E0E]" />
                  <span className="flex-1 bg-[#B91C1C]" />
                  <span className="flex-1 bg-[#006B3F]" />
                </div>

                <div className="px-6 md:px-8 pt-8 pb-6 border-b border-gray-100 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#25D366]/10 border-2 border-[#25D366]/40 flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="text-[#25D366]" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#0E0E0E] leading-tight font-figtree">
                        Chat with our branches
                      </h3>
                      <p className="text-sm text-gray-500 font-light mt-1">
                        Open 7 days • Tap a branch to start an instant WhatsApp conversation
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 md:px-4 py-3 space-y-2">
                  {BRANCHES_DATA.map((branch, i) => (
                    <motion.a
                      key={branch.slug}
                      href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Hello SunnyRemit (${branch.name}), I would like to enquire about forex exchange / remittance.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: 'easeOut' }}
                      className="group flex items-center gap-3.5 p-3.5 rounded-2xl hover:bg-[#FAFAF7] border border-transparent hover:border-gray-200 transition-all"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-gray-200 shadow-sm">
                        <img src={branch.coverImage} alt={branch.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        {branch.flagship && (
                          <div className="absolute top-0 right-0 w-3 h-3 bg-amber-400 rounded-bl-md border-b border-l border-white" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm sm:text-base font-bold text-[#0E0E0E] truncate font-figtree">
                            {branch.name}
                          </h4>
                          {branch.flagship ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                              HQ Flagship
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                              Open
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                          <p className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3 h-3 text-[#7A1220] flex-shrink-0" strokeWidth={1.75} />
                            <span className="truncate">{branch.address}</span>
                          </p>
                          <p className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" strokeWidth={1.75} />
                            <span>{branch.hours}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={`tel:${branch.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full border border-gray-200 hover:border-[#7A1220] hover:bg-[#7A1220] hover:text-white flex items-center justify-center transition-all"
                          aria-label={`Call ${branch.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </a>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] text-white text-xs font-bold group-hover:bg-[#1FB855] transition-colors shadow-sm">
                          <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
                          <span>Chat</span>
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="px-6 md:px-8 py-4 border-t border-gray-100 bg-[#FAFAF7] flex items-center justify-between gap-4">
                  <p className="text-xs text-gray-500 font-light">
                    Replies within minutes during business hours
                  </p>
                  <a
                    href="mailto:info@sunnyremit.com"
                    className="text-xs font-medium text-[#7A1220] hover:text-[#5C0D18] transition-colors"
                  >
                    Email instead →
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
