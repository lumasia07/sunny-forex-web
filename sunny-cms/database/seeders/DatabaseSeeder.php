<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Document;
use App\Models\Branch;
use App\Models\Faq;
use App\Models\ForexRate;
use App\Models\SeoMeta;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create default admin user
        User::updateOrCreate(
            ['email' => 'admin@sunnyremit.co.ke'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Create CEO user
        User::updateOrCreate(
            ['email' => 'ceo@sunnyremit.co.ke'],
            [
                'name' => 'CEO',
                'password' => Hash::make('password'),
                'role' => 'ceo',
            ]
        );

        // Seed the curated top 15 currencies
        $this->call(CbkRatesSeeder::class);

        // Seed branches with full address and distinct phone numbers
        $branches = [
            [
                'name' => 'Kilimani Branch',
                'area' => 'Kilimani',
                'address' => 'Woodridge Centre, Wood Avenue, Kilimani, Nairobi',
                'phone' => '+254 722 350 400',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=Woodridge+Centre+Wood+Avenue+Kilimani+Nairobi',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Valley Arcade Branch',
                'area' => 'Lavington',
                'address' => 'Valley Arcade Shopping Mall, Gitanga Road, Lavington, Nairobi',
                'phone' => '+254 722 360 800',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=Valley+Arcade+Shopping+Mall+Gitanga+Road+Lavington+Nairobi',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'GTC Mall Branch',
                'area' => 'Westlands',
                'address' => 'GTC Mall, Chiromo Lane, Westlands, Nairobi',
                'phone' => '+254 722 305 188',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=GTC+Mall+Chiromo+Lane+Westlands+Nairobi',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Village Market New Wing Branch',
                'area' => 'Gigiri / Limuru Road',
                'address' => 'Village Market Mall – New Wing G/F, Limuru Road, Nairobi',
                'phone' => '+254 718 040 847',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=Village+Market+Mall+New+Wing+Limuru+Road+Nairobi',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Village Market Old Wing Branch',
                'area' => 'Gigiri / Limuru Road',
                'address' => 'Village Market Mall – Old Wing G/F, Limuru Road, Nairobi',
                'phone' => '+254 722 454 757',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=Village+Market+Mall+Old+Wing+Limuru+Road+Nairobi',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Runda Branch',
                'area' => 'Runda / Kiambu Road',
                'address' => 'Runda Mall G/F, Kiambu Road, Nairobi',
                'phone' => '+254 722 109 594',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=Runda+Mall+Kiambu+Road+Nairobi',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Head Quarters',
                'area' => 'Lavington',
                'address' => 'Lavington Avenue Complex G/F, James Gichuru Road, Nairobi',
                'phone' => '+254 722 590 049',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=Lavington+Avenue+Complex+James+Gichuru+Road+Nairobi',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Lavington Mall Branch',
                'area' => 'Lavington',
                'address' => 'Lavington Mall G/F, James Gichuru / Olenguruone Road, Lavington, Nairobi',
                'phone' => '+254 722 590 049',
                'hours' => 'Mon-Fri: 9:00 AM - 7:00 PM · Sat-Sun: 9:00 AM - 6:00 PM',
                'map_url' => 'https://www.google.com/maps/search/?api=1&query=Lavington+Mall+James+Gichuru+Road+Nairobi',
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($branches as $branch) {
            Branch::updateOrCreate(
                ['name' => $branch['name']],
                $branch
            );
        }

        // Seed FAQs
        $faqs = [
            ['question' => 'What are your operational hours for currency exchange?', 'answer' => 'Our seven Nairobi branches are open 365 days a year for your convenience. Weekdays (Monday to Friday) from 9:00 AM to 7:00 PM, and weekends (Saturday, Sunday) and public holidays from 9:00 AM to 6:00 PM.', 'sort_order' => 1],
            ['question' => 'How does the Send Money feature work?', 'answer' => "You can secure today's guaranteed exchange rates instantly on our website. Once confirmed, your rate is guaranteed for a period of 4 hours, giving you ample time to walk into any of our branches and finalize your transfer without worrying about market shifts.", 'sort_order' => 2],
            ['question' => 'Is SunnyRemit licensed by the Central Bank of Kenya?', 'answer' => 'Yes, SunnyRemit is fully licensed, authorized, and regulated by the Central Bank of Kenya (CBK) as an official foreign exchange bureau. We adhere strictly to all compliance, regulatory guidelines, and anti-money laundering frameworks.', 'sort_order' => 3],
            ['question' => 'What identification documents do I need to exchange currency?', 'answer' => 'For personal/retail transactions below USD 10,000 equivalent, we require a valid national identification card (for Kenyan citizens) or an original passport (for foreign nationals). For corporate transactions, business registration and compliance papers may be requested.', 'sort_order' => 4],
            ['question' => 'Can I transfer foreign currency straight to my M-Pesa wallet?', 'answer' => 'Absolutely. We provide seamless currency-to-M-Pesa transfers instantly at any of our branches. When exchanging foreign currency, you can request the payout to be sent directly to your mobile money wallet instead of carrying physical cash.', 'sort_order' => 5],
        ];

        foreach ($faqs as $faq) {
            Faq::firstOrCreate(
                ['question' => $faq['question']],
                array_merge($faq, ['is_active' => true, 'category' => 'General'])
            );
        }

        // Seed blog posts
        $posts = [
            [
                'title' => 'Understanding the Kenyan Forex Market in 2025',
                'slug' => 'understanding-kenyan-forex-market-2025',
                'excerpt' => 'A comprehensive guide to navigating currency exchange in Kenya\'s evolving financial landscape.',
                'content' => '<p>The Kenyan forex market continues to evolve rapidly. As a regulated foreign exchange bureau, SunnyRemit is at the forefront of providing competitive rates and transparent services to our clients.</p><p>In this article, we explore the key trends shaping the forex market in Kenya and how they impact your international transfers.</p>',
                'category' => 'Market Insights',
                'read_time' => '6 min read',
                'status' => 'published',
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'How to Get the Best Exchange Rate for Your Money',
                'slug' => 'how-to-get-best-exchange-rate',
                'excerpt' => 'Expert tips from our forex specialists on maximizing your currency exchange value.',
                'content' => '<p>Getting the best exchange rate requires timing, knowledge, and the right partner. Here are our top recommendations for getting the most value from your foreign currency exchange.</p>',
                'category' => 'Tips & Guides',
                'read_time' => '4 min read',
                'status' => 'published',
                'published_at' => now()->subDays(12),
            ],
            [
                'title' => 'SunnyRemit Opens New Branch at Village Market',
                'slug' => 'sunnyremit-village-market-new-branch',
                'excerpt' => 'We\'re excited to announce our newest branch location at Village Market New Wing.',
                'content' => '<p>SunnyRemit is proud to announce the opening of our newest branch at Village Market New Wing. This expansion brings our total branch count to seven, all strategically located across Nairobi.</p>',
                'category' => 'Company News',
                'read_time' => '3 min read',
                'status' => 'published',
                'published_at' => now()->subDays(20),
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::firstOrCreate(
                ['slug' => $post['slug']],
                $post
            );
        }

        
        // Seed Compliance, KYC & Legal Documents
        $docs = [
            [
                'title' => 'Anti-Money Laundering (AML) & CTF Policy',
                'slug' => 'aml-policy',
                'category' => 'AML & Compliance',
                'description' => 'Comprehensive compliance guidelines aligned with Proceeds of Crime & Anti-Money Laundering Act (POCAMLA) and CBK framework.',
                'file_path' => 'storage/documents/SunnyRemit-AML-policy.pdf',
                'file_name' => 'SunnyRemit-AML-policy.pdf',
                'file_size' => '84.4 KB',
                'file_type' => 'pdf',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Customer Due Diligence (KYC) Requirements',
                'slug' => 'kyc-requirements',
                'category' => 'KYC & Customer',
                'description' => 'Customer identification, beneficial ownership verification, source of funds declarations, and retail/corporate KYC procedures.',
                'file_path' => 'storage/documents/SunnyRemit-AML-policy.pdf',
                'file_name' => 'SunnyRemit-KYC-Guidelines.pdf',
                'file_size' => '84.4 KB',
                'file_type' => 'pdf',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Terms of Service (TOS)',
                'slug' => 'terms-of-service',
                'category' => 'Legal & Terms',
                'description' => 'Official retail remittance terms, branch transaction settlement rules, rate locks, and legal disclosures.',
                'file_path' => 'storage/documents/SunnyRemit-TOS.pdf',
                'file_name' => 'SunnyRemit-TOS.pdf',
                'file_size' => '96.0 KB',
                'file_type' => 'pdf',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Privacy & Data Protection Policy',
                'slug' => 'privacy-policy',
                'category' => 'Legal & Terms',
                'description' => 'Data privacy disclosures compliant with the Kenya Data Protection Act 2019 covering customer personal records.',
                'file_path' => 'storage/documents/SunnyRemit-PrivacyPolicy.pdf',
                'file_name' => 'SunnyRemit-PrivacyPolicy.pdf',
                'file_size' => '92.0 KB',
                'file_type' => 'pdf',
                'is_active' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($docs as $doc) {
            Document::updateOrCreate(
                ['slug' => $doc['slug']],
                $doc
            );
        }

        // Seed SEO meta
        $seoPages = [
            [
                'page_slug' => 'home',
                'title' => 'SunnyRemit — Kenya\'s Trusted Forex Bureau | Best Exchange Rates in Nairobi',
                'description' => 'SunnyRemit offers the best foreign exchange rates in Nairobi. Licensed by CBK, 7 branches open 365 days. Send money, exchange currencies, and get live rates.',
                'json_ld_schema' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'FinancialService',
                    'name' => 'SunnyRemit',
                    'description' => 'Licensed foreign exchange bureau in Nairobi, Kenya',
                    'areaServed' => 'Kenya',
                    'currenciesAccepted' => 'USD, GBP, EUR, AED, SAR, CAD, AUD, CHF, CNY, INR, JPY, ZAR, UGX, TZS, RWF',
                ],
            ],
            [
                'page_slug' => 'forex',
                'title' => 'Forex Exchange Rates — SunnyRemit | Live KES Currency Rates',
                'description' => 'View live forex exchange rates against the Kenyan Shilling. Buy and sell major and regional currencies (USD, GBP, EUR, AED, and more) at SunnyRemit\'s competitive rates.',
                'json_ld_schema' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'ExchangeRateSpecification',
                    'currency' => 'KES',
                    'exchangeRateType' => 'BuyingRate',
                ],
            ],
            [
                'page_slug' => 'branches',
                'title' => 'SunnyRemit Branch Locations — 8 Forex Bureaus in Nairobi',
                'description' => 'Find a SunnyRemit branch near you. 8 locations across Nairobi — Kilimani, Lavington, Westlands, Gigiri, and Runda. Open 365 days, 9AM-7PM.',
                'json_ld_schema' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'LocalBusiness',
                    'name' => 'SunnyRemit',
                    'address' => ['@type' => 'PostalAddress', 'addressLocality' => 'Nairobi', 'addressCountry' => 'KE'],
                ],
            ],
        ];

        foreach ($seoPages as $seo) {
            SeoMeta::firstOrCreate(
                ['page_slug' => $seo['page_slug']],
                $seo
            );
        }
    }
}
