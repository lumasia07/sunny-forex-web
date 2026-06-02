import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { SplitColumnsReveal, splitGridMotion } from '../components/SplitColumnsReveal';
import {
  Building2,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
  CheckCircle2,
  X,
  Briefcase,
  Sparkles
} from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Corporate FX Desk',
    body: 'Bulk currency exchange for business imports/exports with personalized wholesale rates and dedicated treasury dealers.'
  },
  {
    icon: TrendingUp,
    title: 'Treasury & FX Hedging',
    body: 'Forward contracts, spot orders, and strategic risk management tailored specifically to protect your business margins.'
  },
  {
    icon: Users,
    title: 'Payroll & Supplier Payouts',
    body: 'Seamless bulk international payroll processing for overseas contractors and foreign supplier remittance.'
  },
  {
    icon: FileText,
    title: 'AML & KYC Compliance Support',
    body: 'Comprehensive transaction trails, AML clearance, and CBK-mandated compliance support for external audits.'
  }
];

const industries = [
  'Logistics & Shipping',
  'NGOs & Foundations',
  'Tourism & Hospitality',
  'Tech & Startups',
  'Agriculture Exports',
  'Manufacturing',
  'Diplomatic Missions',
  'Mining & Energy'
];

function CorporateServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      {...splitGridMotion(index, 64)}
      whileHover={{ y: -4 }}
      className="group relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:border-[#7A1220]/40 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-[#7A1220] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.88]" />

      <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6 md:p-8 group-hover:[&_*]:text-white">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#7A1220]/8 border border-[#7A1220]/15 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/30 transition-colors duration-500">
          <Icon className="w-5 h-5 text-[#7A1220] group-hover:text-white transition-colors duration-500" strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-300 group-hover:text-white/40 transition-colors duration-500 mb-2 block">
            0{index + 1}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold text-[#0E0E0E] group-hover:text-white mb-2 sm:mb-3 transition-colors duration-500">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-500 group-hover:text-white/90 font-normal leading-relaxed transition-colors duration-500">
            {service.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Corporate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Corporate Form Fields
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [volume, setVolume] = useState('USD 10,000 - 50,000');
  const [needs, setNeeds] = useState('Spot Exchange');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !corporateEmail) return;
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setIsModalOpen(false);
    setCompanyName('');
    setContactName('');
    setCorporateEmail('');
  };

  return (
    <>
      <PageHero
        eyebrow="Enterprise & Corporate"
        title="FX built around your business."
        description="From corporate treasury to cross-border payroll — Sunny Remit partners with Kenyan businesses to move money intelligently, at scale."
        imageSrc="/pexels-maria-stewart-2268904-5643136 (1).jpg"
        imageAlt="Corporate treasury and shipping logistics"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Corporate' }
        ]}
      />

      {/* Services grid */}
      <section className="py-16 sm:py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <SplitColumnsReveal
            className="mb-10 sm:mb-16 items-end"
            gap="gap-6"
            left={
            <div className="max-w-xl">
              <span className="inline-block w-10 h-px bg-[#7A1220] mb-4 sm:mb-6" />
              <h2 className="type-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
                Solutions built for scale.
              </h2>
              <p className="type-lead text-base sm:text-lg">
                Whether you're a 10-person firm or a multinational with offices across East Africa, our enterprise team builds around you.
              </p>
            </div>
            }
            right={
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 py-3 sm:py-3.5 px-6 sm:px-7 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium text-sm shadow-md shrink-0"
            >
              <Briefcase className="w-4 h-4" />
              <span>Contact Corporate Desk</span>
            </button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {services.map((s, i) => (
              <CorporateServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="py-16 sm:py-24 md:py-32 bg-[#0E0E0E] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/pexels-mnmshakir-35034068.jpg"
            alt="Nairobi skylines"
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <SplitColumnsReveal
            gap="gap-10 lg:gap-16"
            left={
            <div>
              <span className="inline-block w-10 h-px bg-[#B91C1C] mb-4 sm:mb-6" />
              <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.08] mb-4 sm:mb-6">
                Trusted by businesses across East Africa.
              </h2>
              <p className="text-base sm:text-lg text-white/70 font-normal leading-relaxed mb-6 sm:mb-8">
                From logistics firms handling cross-border freight payments to NGOs running multi-currency grant programs — businesses choose Sunny Remit when stakes are high.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 py-3 px-6 rounded-full bg-white text-[#0E0E0E] hover:bg-gray-100 transition-colors font-medium text-sm shadow-md"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            }
            right={
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-4 bg-white/5 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-white/10">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-transparent hover:border-[#7A1220]/40 hover:bg-[#7A1220]/25 transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] group-hover:bg-white shrink-0 transition-colors duration-300" />
                  <span className="text-sm sm:text-base font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
            }
          />
        </div>
      </section>

      <CtaBand />

      {/* Corporate Consulting Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isSuccess) setIsModalOpen(false); }}
              className="absolute inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 24 }}
              className="relative bg-white w-full sm:max-w-lg max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 border border-gray-100"
            >
              {/* Kenyan flag accent stripe */}
              <div className="flex h-[3px] w-full">
                <span className="flex-1 bg-[#0E0E0E]" />
                <span className="flex-1 bg-[#B91C1C]" />
                <span className="flex-1 bg-[#006B3F]" />
              </div>

              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                  <div className="flex justify-between items-start gap-4 mb-5 sm:mb-6">
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#0E0E0E] flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#7A1220] shrink-0" />
                        <span>Corporate Account</span>
                      </h3>
                      <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">Establish high-volume wholesale rates</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Registered Company Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Kenya Logistics Ltd"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Contact Person Name</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Jane Koech"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Corporate Email Address</label>
                      <input
                        type="email"
                        required
                        value={corporateEmail}
                        onChange={(e) => setCorporateEmail(e.target.value)}
                        placeholder="treasury@company.co.ke"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Monthly FX Volume</label>
                        <select
                          value={volume}
                          onChange={(e) => setVolume(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm cursor-pointer"
                        >
                          <option value="Under USD 10,000">Under USD 10k</option>
                          <option value="USD 10,000 - 50,000">USD 10k - 50k</option>
                          <option value="USD 50,000 - 250,000">USD 50k - 250k</option>
                          <option value="Over USD 250,000">Over USD 250k</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Primary Needs</label>
                        <select
                          value={needs}
                          onChange={(e) => setNeeds(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm cursor-pointer"
                        >
                          <option value="Spot Exchange">Spot Exchange</option>
                          <option value="Hedging & Forwards">Hedging & Forwards</option>
                          <option value="Bulk Payroll">Bulk Payroll</option>
                          <option value="Import Funding">Import Funding</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-3 py-3.5 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium shadow-md"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-5 sm:p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-light text-[#0E0E0E] mb-2">Inquiry Submitted!</h3>
                  <p className="text-sm font-light text-gray-500 max-w-sm mb-6 leading-relaxed">
                    Thank you, <strong className="text-[#0E0E0E]">{contactName}</strong>. Your corporate request for <strong className="text-[#0E0E0E]">{companyName}</strong> has been registered successfully.
                  </p>

                  <div className="border border-gray-100 rounded-2xl p-5 mb-8 w-full text-left text-sm space-y-3 font-light bg-[#FAFAF7]">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Volume:</span>
                      <span className="font-semibold text-[#0E0E0E]">{volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Needs Selected:</span>
                      <span className="font-semibold text-[#7A1220]">{needs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contact Email:</span>
                      <span className="font-semibold text-[#0E0E0E]">{corporateEmail}</span>
                    </div>
                  </div>

                  <p className="text-xs font-light text-gray-400 mb-8 leading-relaxed">
                    Our senior relationship treasury manager will review your trade profile and contact you directly in under <strong>30 minutes</strong> to configure your custom wholesale rates.
                  </p>

                  <button
                    onClick={handleReset}
                    className="w-full py-3.5 rounded-full bg-[#0E0E0E] text-white hover:bg-black transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}