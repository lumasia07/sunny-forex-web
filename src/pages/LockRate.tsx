import { BRANCHES_DATA } from '../data/branchesData';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import {
  Send,
  ArrowRight,
  TrendingUp,
  Info,
  Building2,
  Smartphone,
  Wallet,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const rates: { [key: string]: { rate: number; name: string; symbol: string } } = {
  USD: { rate: 129.50, name: 'US Dollar', symbol: '$' },
  EUR: { rate: 140.20, name: 'Euro', symbol: '€' },
  GBP: { rate: 165.10, name: 'British Pound', symbol: '£' },
  AED: { rate: 35.25, name: 'UAE Dirham', symbol: 'د.إ' },
  ZAR: { rate: 7.10, name: 'South African Rand', symbol: 'R' },
  INR: { rate: 1.55, name: 'Indian Rupee', symbol: '₹' },
  CAD: { rate: 94.80, name: 'Canadian Dollar', symbol: 'C$' }
};

const receiveMethods = [
  {
    id: 'bank',
    title: 'Bank Transfer',
    description: 'Direct to any Kenyan Bank',
    fee: 0,
    time: 'Same Day',
    icon: Building2
  },
  {
    id: 'mobile',
    title: 'Mobile Money',
    description: 'M-Pesa, Airtel Money',
    fee: 1.50,
    time: 'Instant',
    icon: Smartphone
  },
  {
    id: 'cash',
    title: 'Cash Pickup',
    description: 'Collect at any Branch',
    fee: 2.50,
    time: 'Instant',
    icon: Wallet
  }
];

export function LockRate() {
  const [searchParams] = useSearchParams();
  const queryCur = searchParams.get('cur') || 'USD';
  
  const [sendAmount, setSendAmount] = useState<string>('1000');
  const [sendCurrency, setSendCurrency] = useState<string>(
    rates[queryCur.toUpperCase()] ? queryCur.toUpperCase() : 'USD'
  );
  const [receiveMethod, setReceiveMethod] = useState<string>('bank');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txRef, setTxRef] = useState('');
  
  // Form fields
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverDetails, setReceiverDetails] = useState('');
  const [pickupBranch, setPickupBranch] = useState('Valley Arcade');

  const selectedCurData = rates[sendCurrency];
  const selectedMethod = receiveMethods.find(m => m.id === receiveMethod) || receiveMethods[0];
  
  const sendNum = parseFloat(sendAmount) || 0;
  const receiveNum = sendNum * selectedCurData.rate;
  
  // Calculate fees
  const feeInSource = selectedMethod.fee;
  const totalToPay = sendNum + feeInSource;
  
  const handleSendMoneySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !receiverName) return;
    
    // Generate mock reference code
    const randomRef = 'SUNNY-' + Math.floor(100000 + Math.random() * 900000);
    setTxRef(randomRef);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setIsModalOpen(false);
    setSenderName('');
    setSenderPhone('');
    setReceiverName('');
    setReceiverDetails('');
  };

  return (
    <>
      <PageHero
        eyebrow="Remittance & Forex"
        title="Send Money Abroad"
        description="Secure today's guaranteed exchange rates instantly. Avoid market volatility and finalize your trade at any branch within 4 hours."
        imageSrc="/pexels-ben-iwara-1033992193-27742235.jpg"
        imageAlt="Forex Send Money"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Send Money' }
        ]}
      />

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Interactive Calculator */}
            <div className="lg:col-span-7 bg-[#FAFAF7] border border-gray-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[#7A1220]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#7A1220]" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#0E0E0E]">Live Forex Converter</h3>
                  <p className="text-xs text-gray-400 font-light uppercase tracking-wider">Real-time Central Bank approved rates</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Send Input */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 focus-within:border-[#7A1220]/40 transition-colors">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">You Send</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-grow text-3xl font-light text-[#0E0E0E] bg-transparent border-none outline-none p-0 focus:ring-0"
                    />
                    <select
                      value={sendCurrency}
                      onChange={(e) => setSendCurrency(e.target.value)}
                      className="text-lg font-medium text-[#0E0E0E] bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#7A1220] transition-colors cursor-pointer"
                    >
                      {Object.keys(rates).map((cur) => (
                        <option key={cur} value={cur}>
                          {cur} ({selectedCurData.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mid-rate visual connector */}
                <div className="relative flex justify-center py-2">
                  <div className="absolute inset-y-0 left-1/2 w-px bg-dashed border-l border-gray-200" />
                  <div className="relative z-10 px-4 py-1.5 rounded-full bg-white border border-gray-100 text-xs font-light text-gray-500 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Guaranteed Rate: 1 {sendCurrency} = {selectedCurData.rate.toFixed(2)} KSh</span>
                  </div>
                </div>

                {/* They Get (KES) */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Recipient Gets</label>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-light text-[#0E0E0E] tabular-nums">
                      {receiveNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <div className="text-lg font-medium text-[#0E0E0E] bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                      KES (KSh)
                    </div>
                  </div>
                </div>

                {/* Receive Method */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">Choose Settlement Method</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {receiveMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = receiveMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setReceiveMethod(method.id)}
                          className={`flex flex-col items-start p-5 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'border-[#7A1220] bg-white shadow-md'
                              : 'border-gray-200 bg-transparent hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${
                            isSelected ? 'bg-[#7A1220]/10 text-[#7A1220]' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-[#0E0E0E] mb-1">{method.title}</span>
                          <span className="text-xs font-light text-gray-400 leading-tight mb-2">{method.description}</span>
                          <span className="text-[10px] font-semibold text-[#7A1220] uppercase tracking-wider bg-[#7A1220]/5 px-2 py-0.5 rounded-md mt-auto">
                            Fee: {method.fee === 0 ? 'Free' : `${selectedCurData.symbol}${method.fee.toFixed(2)}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={sendNum <= 0}
                  className="w-full flex justify-center items-center gap-3 py-4 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Money Now</span>
                </button>
              </div>
            </div>

            {/* Right Column: Breakdown & Security Details */}
            <div className="lg:col-span-5 space-y-8">
              {/* Receipt Breakdowns */}
              <div className="bg-[#0E0E0E] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#7A1220]/30 to-transparent rounded-full blur-xl" />
                
                <h4 className="text-lg font-light mb-6 flex items-center gap-2">
                  <span>Transfer Breakdown</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </h4>

                <div className="space-y-4 font-light text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Sending Amount</span>
                    <span className="font-mono text-white">{selectedCurData.symbol}{sendNum.toLocaleString()} {sendCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Settlement Fee</span>
                    <span className="font-mono text-white">
                      {feeInSource === 0 ? 'Free' : `${selectedCurData.symbol}${feeInSource.toFixed(2)} ${sendCurrency}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guaranteed Exchange Rate</span>
                    <span className="font-mono text-white">1 {sendCurrency} = {selectedCurData.rate.toFixed(2)} KES</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Settlement Speed</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedMethod.time}
                    </span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between text-base">
                    <span className="text-white">Total to Pay</span>
                    <span className="font-mono font-medium text-white">{selectedCurData.symbol}{totalToPay.toLocaleString(undefined, { minimumFractionDigits: 2 })} {sendCurrency}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-emerald-400 pt-2">
                    <span>Recipient Receives</span>
                    <span className="font-mono">{receiveNum.toLocaleString(undefined, { minimumFractionDigits: 2 })} KES</span>
                  </div>
                </div>
              </div>

              {/* Safety Assurances */}
              <div className="space-y-4 p-6 border border-gray-100 rounded-2xl bg-[#FAFAF7]">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-[#0E0E0E] mb-1">Guaranteed Rate Protection</h5>
                    <p className="text-xs font-light text-gray-500 leading-relaxed">
                      Securing this rate guarantees the exact exchange amount for 4 hours. No market movements will affect your locked exchange value.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-[#7A1220] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-[#0E0E0E] mb-1">Central Bank Regulated</h5>
                    <p className="text-xs font-light text-gray-500 leading-relaxed">
                      Licensed and strictly governed by the Central Bank of Kenya. Your safety and transaction integrity are fully secured.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Send Money Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isSuccess) setIsModalOpen(false); }}
              className="absolute inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm"
            />

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100"
            >
              {/* Kenyan flag accent stripe */}
              <div className="flex h-[3px] w-full">
                <span className="flex-1 bg-[#0E0E0E]" />
                <span className="flex-1 bg-[#B91C1C]" />
                <span className="flex-1 bg-[#006B3F]" />
              </div>

              {!isSuccess ? (
                /* Form Details Form */
                <form onSubmit={handleSendMoneySubmit} className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-light text-[#0E0E0E]">Complete Your Transfer</h3>
                      <p className="text-xs font-light text-gray-400 mt-1 uppercase tracking-wider">Provide details to secure rate reference</p>
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
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Sender's Full Name</label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Sender's Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="+254 700 000 000"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Recipient's Name</label>
                      <input
                        type="text"
                        required
                        value={receiverName}
                        onChange={(e) => setReceiverName(e.target.value)}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm"
                      />
                    </div>

                    {receiveMethod === 'cash' ? (
                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Preferred Pickup Branch</label>
                        <select
                          value={pickupBranch}
                          onChange={(e) => setPickupBranch(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm cursor-pointer"
                        >
                          {BRANCHES_DATA.map((b) => (
                            <option key={b.id} value={b.name}>{b.name} ({b.area})</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                          {receiveMethod === 'bank' ? 'Account Number & Bank' : 'Mobile Money Number'}
                        </label>
                        <input
                          type="text"
                          required
                          value={receiverDetails}
                          onChange={(e) => setReceiverDetails(e.target.value)}
                          placeholder={receiveMethod === 'bank' ? '0123456789 - Equity Bank' : '+254 799 999 999'}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#7A1220] transition-colors text-sm"
                        />
                      </div>
                    )}
                  </div>

                  <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl p-4 mb-6 flex justify-between items-center text-xs font-light text-gray-500">
                    <div>
                      <span className="block font-medium text-[#0E0E0E]">Secured Rate:</span>
                      <span>1 {sendCurrency} = {selectedCurData.rate.toFixed(2)} KES</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-medium text-emerald-600">You Send:</span>
                      <span className="font-mono text-sm font-semibold">{receiveNum.toLocaleString(undefined, { maximumFractionDigits: 2 })} KES</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-3 py-3.5 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Send Money</span>
                  </button>
                </form>
              ) : (
                /* Success Screen */
                <div className="p-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl font-light text-[#0E0E0E] mb-2">Transfer Initiated Successfully!</h3>
                  <p className="text-sm font-light text-gray-500 max-w-sm mb-6 leading-relaxed">
                    Your exchange rate of <strong className="text-[#0E0E0E]">1 {sendCurrency} = {selectedCurData.rate.toFixed(2)} KES</strong> has been secured for the next <strong className="text-[#0E0E0E]">4 hours</strong>.
                  </p>

                  {/* Ref Code Box */}
                  <div className="bg-[#FAFAF7] border border-gray-100 rounded-2xl px-6 py-4 mb-6 w-full max-w-xs font-mono text-center">
                    <span className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">Transaction Reference</span>
                    <span className="text-xl font-bold text-[#7A1220] tracking-wider">{txRef}</span>
                  </div>

                  {/* Details Card */}
                  <div className="border border-gray-100 rounded-2xl p-5 mb-8 w-full text-left text-sm space-y-3 font-light">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Transfer Amount:</span>
                      <span className="font-semibold text-[#0E0E0E]">{sendNum.toLocaleString()} {sendCurrency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payout Amount:</span>
                      <span className="font-semibold text-emerald-600">{receiveNum.toLocaleString(undefined, { minimumFractionDigits: 2 })} KES</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Method:</span>
                      <span className="font-semibold text-[#0E0E0E]">{selectedMethod.title}</span>
                    </div>
                    {receiveMethod === 'cash' ? (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Collection At:</span>
                        <span className="font-semibold text-[#7A1220]">{pickupBranch} Branch</span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Recipient Details:</span>
                        <span className="font-semibold text-[#0E0E0E] truncate max-w-[200px]">{receiverDetails || receiverName}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs font-light text-gray-400 mb-8 leading-relaxed">
                    A representative will contact you shortly at <strong>{senderPhone}</strong> to complete the transaction, or you can present reference code <strong>{txRef}</strong> at any selected SunnyRemit branch within 4 hours.
                  </p>

                  <button
                    onClick={handleReset}
                    className="w-full py-3.5 rounded-full bg-[#0E0E0E] text-white hover:bg-black transition-colors font-medium"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CtaBand />
    </>
  );
}
