import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { ArrowRight, Clock, Calendar, Tag, X, ChevronRight, Lock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  {
    category: 'Market Insights',
    title: 'Why the Kenyan shilling is finding stability against the dollar',
    excerpt: "After a volatile year, the KES has settled into a tighter trading range. Here's what it means for remitters and importers.",
    date: 'May 14, 2026',
    readTime: '5 min read',
    image: '/pexels-jakubzerdzicki-30572289.jpg',
    content: `
      <p class="text-lg leading-relaxed text-[#0E0E0E] font-light mb-6">
        After nearly two years of macroeconomic headwinds and sharp exchange rate fluctuations, the Kenyan Shilling (KES) has entered a period of relative calm against the US Dollar (USD). For local businesses, importers, and the diaspora community sending money home, this stability is a welcome relief.
      </p>
      
      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Key Drivers of KES Stability</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Several critical factors have contributed to the KES trading in a tighter and more predictable range:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-600 font-light mb-6">
        <li><strong>Proactive Monetary Policy:</strong> The Central Bank of Kenya (CBK) has successfully navigated inflation targets, utilizing interest rate updates to anchor investor confidence.</li>
        <li><strong>Agricultural Exports:</strong> A strong resurgence in tea and horticultural exports has boosted foreign exchange inflows, improving trade balances.</li>
        <li><strong>Tourism Recovery:</strong> Nairobi and the coastal regions have seen record tourist arrivals, injecting high-liquidity foreign currencies directly into our economy.</li>
        <li><strong>Multilateral Support:</strong> Timely funding and credit lines from institutions like the IMF have bolstered Kenya's foreign exchange reserves, providing a solid safety cushion.</li>
      </ul>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">What This Means for Importers and Remitters</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        If you are a business owner buying materials internationally, you can now budget with higher accuracy. If you are sending money home, you are receiving fair value without worrying about sudden daily drops. Locking in your exchange rates via Sunny Forex guarantees you receive maximum value during these optimal trading windows.
      </p>
    `
  },
  {
    category: 'How To',
    title: 'Sending money to family abroad: a complete 2026 guide',
    excerpt: 'Costs, timing, paperwork, and rate locks — everything you need to know to send money confidently.',
    date: 'May 8, 2026',
    readTime: '8 min read',
    image: '/pexels-maria-stewart-2268904-5643136 (1).jpg',
    content: `
      <p class="text-lg leading-relaxed text-[#0E0E0E] font-light mb-6">
        Sending money across borders shouldn't feel like navigating a maze. In 2026, technology and competitive options make remittance faster and cheaper than ever, but understanding the core elements saves you from unexpected delays and costs.
      </p>
      
      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">1. Understand the Exchange Rate Margin</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Often, financial services hide their fees in marked-up exchange rates. Always look for companies that disclose the exact exchange rate margin. Compare live board rates to the mid-market rate to ensure transparency.
      </p>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">2. Choose the Right Payout Method</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Different payout methods have varying speeds and costs:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-600 font-light mb-6">
        <li><strong>Mobile Money (M-Pesa, Airtel Money):</strong> Unmatched speed and convenience for retail transactions. Recipient receives cash immediately.</li>
        <li><strong>Bank Transfer:</strong> Best for high-volume transactions. Highly secure but takes up to 24 hours depending on processing windows.</li>
        <li><strong>Cash Pickup:</strong> Perfect for immediate physical currency needs at any authorized branch.</li>
      </ul>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">3. Leverage Rate Locks</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Exchange rates fluctuate. Using a "Rate Lock" feature allows you to secure a favorable conversion rate online and settle the cash or transfer at a local branch later without worrying about market drops.
      </p>
    `
  },
  {
    category: 'Business',
    title: 'Hedging FX risk: a primer for Kenyan SMEs',
    excerpt: 'Forward contracts, natural hedges, and when to use which. Practical guidance for growing businesses.',
    date: 'April 28, 2026',
    readTime: '7 min read',
    image: '/pexels-kursat-kuzu-42706530-12705278.jpg',
    content: `
      <p class="text-lg leading-relaxed text-[#0E0E0E] font-light mb-6">
        For small and medium enterprises (SMEs) in Kenya, currency volatility can make the difference between a highly profitable quarter and a severe deficit. Hedging FX risk is no longer just for large multinationals; it is a vital survival tool for local entrepreneurs.
      </p>
      
      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">What is Foreign Exchange Hedging?</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Hedging is a risk management strategy used to offset potential losses from future currency fluctuations. It allows you to establish fixed purchase and sales rates, stabilizing profit margins.
      </p>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Practical Hedging Strategies for SMEs</h3>
      <ul class="list-disc pl-6 space-y-2 text-gray-600 font-light mb-6">
        <li><strong>Forward Contracts:</strong> Agreements to buy or sell a specific amount of currency at a predetermined exchange rate on a specified future date. Highly customizable.</li>
        <li><strong>Natural Hedges:</strong> Offsetting expenses and revenues in the same currency. For example, if you export goods in USD, use those same USD reserves to pay your suppliers instead of converting back and forth.</li>
        <li><strong>Spot Trading with Rate Locks:</strong> Securing live competitive rates during market dips to fulfill immediate upcoming invoices.</li>
      </ul>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Get Expert Business Support</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        At Sunny Forex, our dedicated corporate division partners with local businesses to navigate currency exposures. Contact our corporate desk to establish custom corporate conversion limits.
      </p>
    `
  },
  {
    category: 'News',
    title: 'Sunny Forex opens 7th branch in Mombasa Road',
    excerpt: 'Our newest location at Capital Centre marks our continued commitment to making FX services accessible.',
    date: 'April 20, 2026',
    readTime: '3 min read',
    image: '/pexels-kelvin-kibe-3073372-26898331.jpg',
    content: `
      <p class="text-lg leading-relaxed text-[#0E0E0E] font-light mb-6">
        We are thrilled to announce the opening of our seventh flagship branch at Capital Centre along Mombasa Road, Nairobi. This new branch represents our ongoing vision to deliver premium, reliable, and CBK-regulated currency solutions closer to Nairobi's central hubs.
      </p>
      
      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Strategic Location for Businesses and Travel</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Mombasa Road serves as the industrial heartbeat of Nairobi, linking the city center to Jomo Kenyatta International Airport (JKIA). The new branch at Capital Centre is perfectly located for corporate managers, local distributors, and international travelers to access:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-600 font-light mb-6">
        <li>Instant currency conversion for 20+ global currencies.</li>
        <li>Fast money transfer and remittance services.</li>
        <li>Specialized corporate desk services with competitive wholesale margins.</li>
      </ul>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Open 365 Days a Year</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Just like our flagship branches at Sarit Centre and Village Market, the Capital Centre location remains open throughout weekends and public holidays, ensuring you never miss a critical trade window.
      </p>
    `
  },
  {
    category: 'Market Insights',
    title: "How AED-KES corridor became East Africa's fastest-growing route",
    excerpt: 'Diaspora remittances from the Gulf are reshaping the regional FX landscape. We look at the numbers.',
    date: 'April 12, 2026',
    readTime: '6 min read',
    image: '/pexels-ben-iwara-1033992193-27742235.jpg',
    content: `
      <p class="text-lg leading-relaxed text-[#0E0E0E] font-light mb-6">
        The United Arab Emirates (UAE) has historically been a critical trading partner for East Africa, but recent data indicates a massive surge in bilateral retail remittance. The AED to KES corridor is now one of the fastest-growing financial highways in sub-Saharan Africa.
      </p>
      
      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">The Catalyst: Trade and Talent Flow</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Several macroeconomic adjustments have accelerated the need for frictionless AED-KES liquidity:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-600 font-light mb-6">
        <li><strong>Real Estate Investment:</strong> Kenyan diaspora residents in Dubai are actively purchasing residential properties in Nairobi's suburbs, fueling demand for structured forex conversions.</li>
        <li><strong>Import of Electronics and Spares:</strong> SMEs importing tech, automobile accessories, and textiles from Dubai trade directly, bypassing USD double-conversion.</li>
        <li><strong>Workforce Support:</strong> A growing population of Kenyan professionals residing in the Gulf sends support back to families via mobile money services.</li>
      </ul>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Frictionless Settlement via Sunny Forex</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        We specialize in direct AED to KES conversions, giving customers competitive rates and avoiding unnecessary conversion margins. Visit any branch or secure today's live rate on our converter page.
      </p>
    `
  },
  {
    category: 'Compliance',
    title: "Understanding CBK's new AML reporting requirements",
    excerpt: 'A breakdown of the latest regulatory updates and what they mean for your transactions.',
    date: 'April 3, 2026',
    readTime: '4 min read',
    image: '/pexels-mnmshakir-35034068.jpg',
    content: `
      <p class="text-lg leading-relaxed text-[#0E0E0E] font-light mb-6">
        As part of its ongoing alignment with international standard practices, the Central Bank of Kenya (CBK) has recently updated the Anti-Money Laundering (AML) and Combating the Financing of Terrorism (CFT) guidelines. Navigating these requirements with absolute clarity is critical for a secure currency transfer experience.
      </p>
      
      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Core Pillars of CBK Guidelines</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        Sunny Forex fully complies with the three main pillars defined by the Central Bank:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-gray-600 font-light mb-6">
        <li><strong>Rigorous KYC:</strong> Always bring a valid national identification card or passport for any physical transaction.</li>
        <li><strong>Source of Funds Declaration:</strong> For large-volume transactions exceeding set threshold limits, customers are required to state the source of funds (e.g., bank statements, business registers).</li>
        <li><strong>Digital Tracking and Auditing:</strong> Providing transparent digital trail logs to ensure all transactions are fully audited and safe.</li>
      </ul>

      <h3 class="text-xl font-medium text-[#0E0E0E] mt-8 mb-4">Safe, Fully Governed Transfers</h3>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        By keeping our procedures highly efficient, we shield you from operational friction while maintaining 100% regulatory compliance. Your financial security and safety are our utmost priority.
      </p>
    `
  }
];

export function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  return (
    <>
      <PageHero
        eyebrow="The Sunny Forex Blog"
        title="Insights, market notes, and stories from the floor."
        description="Plain-language analysis from a team that has been moving Kenyan money for nearly two decades."
        imageSrc="/pexels-kelvin-kibe-3073372-26898331.jpg"
        imageAlt="Kenyan markets"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Blog' }
        ]}
      />

      <section className="py-24 md:py-32 bg-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Featured post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedPost(posts[0])}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20 items-center cursor-pointer bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 text-xs mb-6 text-gray-400">
                <span className="font-semibold tracking-[0.2em] uppercase text-[#7A1220]">
                  {posts[0].category}
                </span>
                <span>·</span>
                <span>{posts[0].date}</span>
                <span>·</span>
                <span>{posts[0].readTime}</span>
              </div>
              <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 group-hover:text-[#7A1220] transition-colors">
                {posts[0].title}
              </h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8 max-w-lg">
                {posts[0].excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#0E0E0E] group-hover:text-[#7A1220] transition-colors">
                Read full article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.div>

          {/* Post grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="group flex flex-col cursor-pointer bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-3 text-xs mb-4 text-gray-400">
                  <span className="font-semibold tracking-[0.2em] uppercase text-[#7A1220]">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-medium text-[#0E0E0E] mb-3 leading-snug group-hover:text-[#7A1220] transition-colors min-h-[3.5rem]">
                  {post.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm flex-grow">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A1220] mt-6 group-hover:text-[#5C0D18] transition-colors">
                  Read article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-3xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100 flex flex-col"
            >
              {/* Kenyan flag accent stripe */}
              <div className="flex h-[3px] w-full">
                <span className="flex-1 bg-[#0E0E0E]" />
                <span className="flex-1 bg-[#B91C1C]" />
                <span className="flex-1 bg-[#006B3F]" />
              </div>

              {/* Header Bar */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="font-semibold tracking-[0.2em] uppercase text-[#7A1220]">
                    {selectedPost.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedPost.date}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedPost.readTime}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors shadow-sm"
                  aria-label="Close reader"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-6">
                <h2 className="type-headline text-3xl md:text-4xl lg:text-5xl leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl my-8 border border-gray-100">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div 
                  className="prose prose-red max-w-none text-gray-600 font-light"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                />

                {/* Inside Reader CTA */}
                <div className="bg-[#FAFAF7] border border-gray-100 rounded-3xl p-8 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-[#0E0E0E] mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#7A1220]" />
                      <span>Ready to lock in a rate?</span>
                    </h4>
                    <p className="text-sm font-light text-gray-500 max-w-md">
                      Don't let foreign exchange volatility affect your transfers. Secure today's live rate in under 2 minutes.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/lock-rate"
                      onClick={() => setSelectedPost(null)}
                      className="px-6 py-2.5 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium text-sm text-center shadow-md"
                    >
                      Lock-In My Rate
                    </Link>
                    <Link
                      to="/branches"
                      onClick={() => setSelectedPost(null)}
                      className="px-6 py-2.5 rounded-full bg-white border border-gray-200 text-[#0E0E0E] hover:bg-gray-50 transition-colors font-medium text-sm text-center"
                    >
                      Find a Branch
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CtaBand />
    </>
  );
}