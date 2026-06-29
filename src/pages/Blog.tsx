import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { CtaBand } from '../components/CtaBand';
import { ArrowRight, Clock, Calendar, Tag, X, ChevronRight, Lock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchFromApi } from '../lib/api';

const defaultPosts = [
  {
    category: 'Market Insights',
    title: 'Why the Kenyan shilling is finding stability against the dollar',
    excerpt: "After a volatile year, the KES has settled into a tighter trading range. Here's what it means for remitters and importers.",
    date: 'May 14, 2026',
    readTime: '5 min read',
    image: '/pexels-maria-stewart-2268904-5643136 (1).jpg',
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
        If you are a business owner buying materials internationally, you can now budget with higher accuracy. If you are sending money home, you are receiving fair value without worrying about sudden daily drops. Sending money via SunnyRemit guarantees you receive maximum value during these optimal trading windows.
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
        Sending money internationally can often feel like solving a complex puzzle. Between shifting exchange rates, variable transfer fees, and country-specific regulatory documentation, finding the best route for your funds takes preparation.
      </p>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        This comprehensive guide breaks down the essential steps to transfer money safely and cost-effectively from Nairobi to family, partners, or businesses worldwide.
      </p>
    `
  },
  {
    category: 'Local News',
    title: 'SunnyRemit launches its 7th Nairobi branch at Lavington HQ',
    excerpt: 'Our new customer-focused experience center is officially open, offering premium VIP lounges.',
    date: 'April 22, 2026',
    readTime: '3 min read',
    image: '/pexels-maria-stewart-2268904-5643136 (1).jpg',
    content: `
      <p class="text-lg leading-relaxed text-[#0E0E0E] font-light mb-6">
        SunnyRemit is proud to announce the opening of our new customer-focused experience center and headquarters in Lavington, Nairobi. This marks our seventh physical branch in the region.
      </p>
      <p class="leading-relaxed text-gray-600 font-light mb-4">
        With specialized VIP lounges, digital kiosks, and a team of treasury specialists, we are raising the standard for retail and corporate forex services in East Africa.
      </p>
    `
  }
];

export function Blog() {
  const [posts, setPosts] = useState<any[]>(defaultPosts);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  useEffect(() => {
    fetchFromApi<any[]>('blog')
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map(p => ({
            category: p.category,
            title: p.title,
            excerpt: p.excerpt,
            date: p.published_at ? new Date(p.published_at).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recently',
            readTime: p.read_time,
            image: p.image || '/pexels-maria-stewart-2268904-5643136 (1).jpg',
            content: p.content
          }));
          setPosts(formatted);
        }
      })
      .catch(err => console.warn('Blog API offline, using fallback:', err));
  }, []);

  return (
    <>
      <PageHero
        title="News & Insights."
        lead="Your guide to global finance, forex, and remittances."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Main post highlight */}
          {posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => setSelectedPost(posts[0])}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20 cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div class="flex flex-col">
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
          )}

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-[#0E0E0E]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-3xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-100 flex flex-col"
            >
              <div className="flex h-[3px] w-full">
                <span className="flex-1 bg-[#0E0E0E]" />
                <span className="flex-1 bg-[#B91C1C]" />
                <span className="flex-1 bg-[#006B3F]" />
              </div>

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

                <div className="bg-[#FAFAF7] border border-gray-100 rounded-3xl p-8 mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-[#0E0E0E] mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#7A1220]" />
                      <span>Ready to send money?</span>
                    </h4>
                    <p className="text-sm font-light text-gray-500 max-w-md">
                      Don't let foreign exchange volatility affect your transfers. Secure today's live rate in under 2 minutes.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/branches"
                      onClick={() => setSelectedPost(null)}
                      className="px-6 py-2.5 rounded-full bg-[#7A1220] text-white hover:bg-[#5C0D18] transition-colors font-medium text-sm text-center shadow-md"
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
