<?php

namespace Database\Seeders;

use App\Models\BlogPost;
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
        User::firstOrCreate(
            ['email' => 'admin@sunnyremit.co.ke'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        // Create CEO user
        User::firstOrCreate(
            ['email' => 'ceo@sunnyremit.co.ke'],
            [
                'name' => 'CEO',
                'password' => Hash::make('password'),
                'role' => 'ceo',
            ]
        );

        // Load all 150+ currencies from JSON
        $jsonPath = database_path('seeders/wiki_currencies.json');
        $wikiCurrencies = json_decode(file_get_contents($jsonPath), true) ?? [];

        // Known exchange rates against KES (Buying / Selling)
        $knownRates = [
            'USD' => ['buy_rate' => 128.8000, 'sell_rate' => 130.4000, 'change_pct' => 0.35],
            'GBP' => ['buy_rate' => 164.9000, 'sell_rate' => 167.1000, 'change_pct' => 0.22],
            'EUR' => ['buy_rate' => 140.5000, 'sell_rate' => 142.3000, 'change_pct' => -0.15],
            'AED' => ['buy_rate' => 35.1000,  'sell_rate' => 36.1000,  'change_pct' => 0.08],
            'SAR' => ['buy_rate' => 34.3500,  'sell_rate' => 35.2500,  'change_pct' => 0.05],
            'CAD' => ['buy_rate' => 93.9000,  'sell_rate' => 95.8000,  'change_pct' => 0.18],
            'AUD' => ['buy_rate' => 84.5000,  'sell_rate' => 86.4000,  'change_pct' => 0.29],
            'CHF' => ['buy_rate' => 145.5000, 'sell_rate' => 147.8000, 'change_pct' => -0.04],
            'ZAR' => ['buy_rate' => 6.8800,   'sell_rate' => 7.3500,   'change_pct' => -0.18],
            'INR' => ['buy_rate' => 1.5100,   'sell_rate' => 1.6300,   'change_pct' => 0.12],
            'JPY' => ['buy_rate' => 0.8300,   'sell_rate' => 0.8600,   'change_pct' => -0.10],
            'CNY' => ['buy_rate' => 17.7500,  'sell_rate' => 18.3500,  'change_pct' => 0.04],
            'UGX' => ['buy_rate' => 0.0340,  'sell_rate' => 0.0370,  'change_pct' => 0.00],
            'TZS' => ['buy_rate' => 0.0480,  'sell_rate' => 0.0520,  'change_pct' => 0.02],
            'RWF' => ['buy_rate' => 0.0930,  'sell_rate' => 0.0990,  'change_pct' => -0.01],
            'ETB' => ['buy_rate' => 1.0600,   'sell_rate' => 1.1500,   'change_pct' => 0.00],
            'MWK' => ['buy_rate' => 0.0730,  'sell_rate' => 0.0790,  'change_pct' => 0.00],
            'GHS' => ['buy_rate' => 8.2500,   'sell_rate' => 8.7500,   'change_pct' => -0.08],
            'NGN' => ['buy_rate' => 0.0810,  'sell_rate' => 0.0870,  'change_pct' => 0.01],
            'SEK' => ['buy_rate' => 12.0800,  'sell_rate' => 12.4500,  'change_pct' => 0.09],
            'DKK' => ['buy_rate' => 18.7600,  'sell_rate' => 19.3000,  'change_pct' => -0.03],
            'NOK' => ['buy_rate' => 11.7800,  'sell_rate' => 12.1500,  'change_pct' => 0.06],
            'KWD' => ['buy_rate' => 418.5000, 'sell_rate' => 425.0000, 'change_pct' => 0.15],
            'BHD' => ['buy_rate' => 340.2000, 'sell_rate' => 346.5000, 'change_pct' => 0.05],
            'OMR' => ['buy_rate' => 333.1000, 'sell_rate' => 339.0000, 'change_pct' => 0.04],
            'QAR' => ['buy_rate' => 35.1500,  'sell_rate' => 35.8500,  'change_pct' => 0.06],
            'SGD' => ['buy_rate' => 96.2000,  'sell_rate' => 98.1000,  'change_pct' => 0.12],
            'NZD' => ['buy_rate' => 77.8000,  'sell_rate' => 79.5000,  'change_pct' => 0.08],
            'HKD' => ['buy_rate' => 16.4500,  'sell_rate' => 16.8500,  'change_pct' => 0.02],
            'MYR' => ['buy_rate' => 28.9000,  'sell_rate' => 29.8000,  'change_pct' => 0.10],
            'THB' => ['buy_rate' => 3.6500,   'sell_rate' => 3.8200,   'change_pct' => 0.05],
            'IDR' => ['buy_rate' => 0.0081,  'sell_rate' => 0.0086,  'change_pct' => 0.00],
            'PHP' => ['buy_rate' => 2.2200,   'sell_rate' => 2.3400,   'change_pct' => 0.03],
            'KRW' => ['buy_rate' => 0.0930,  'sell_rate' => 0.0990,  'change_pct' => -0.02],
            'TRY' => ['buy_rate' => 3.7500,   'sell_rate' => 3.9500,   'change_pct' => -0.45],
            'EGP' => ['buy_rate' => 2.6200,   'sell_rate' => 2.7600,   'change_pct' => 0.01],
            'BWP' => ['buy_rate' => 9.4500,   'sell_rate' => 9.8500,   'change_pct' => 0.04],
            'MUR' => ['buy_rate' => 2.7800,   'sell_rate' => 2.9200,   'change_pct' => 0.02],
            'SCR' => ['buy_rate' => 9.2000,   'sell_rate' => 9.7500,   'change_pct' => 0.00],
            'ZMW' => ['buy_rate' => 4.8500,   'sell_rate' => 5.1500,   'change_pct' => -0.10],
            'XAF' => ['buy_rate' => 0.2100,   'sell_rate' => 0.2300,   'change_pct' => 0.00],
            'XOF' => ['buy_rate' => 0.2100,   'sell_rate' => 0.2300,   'change_pct' => 0.00],
            'MAD' => ['buy_rate' => 12.8000,  'sell_rate' => 13.4000,  'change_pct' => 0.03],
            'DZD' => ['buy_rate' => 0.9500,   'sell_rate' => 1.0200,   'change_pct' => 0.01],
            'TND' => ['buy_rate' => 41.2000,  'sell_rate' => 42.8000,  'change_pct' => 0.05],
            'LYD' => ['buy_rate' => 26.5000,  'sell_rate' => 27.8000,  'change_pct' => 0.00],
            'SOS' => ['buy_rate' => 0.2200,   'sell_rate' => 0.2400,   'change_pct' => 0.00],
            'SDG' => ['buy_rate' => 0.2100,   'sell_rate' => 0.2300,   'change_pct' => 0.00],
            'SSP' => ['buy_rate' => 0.0900,   'sell_rate' => 0.1000,   'change_pct' => 0.00],
            'DJF' => ['buy_rate' => 0.7200,   'sell_rate' => 0.7600,   'change_pct' => 0.00],
            'GMD' => ['buy_rate' => 1.8500,   'sell_rate' => 1.9800,   'change_pct' => 0.00],
            'GNF' => ['buy_rate' => 0.0150,  'sell_rate' => 0.0170,  'change_pct' => 0.00],
            'SLL' => ['buy_rate' => 0.0058,  'sell_rate' => 0.0064,  'change_pct' => 0.00],
            'CVE' => ['buy_rate' => 1.2700,   'sell_rate' => 1.3500,   'change_pct' => 0.00],
            'MGA' => ['buy_rate' => 0.0280,  'sell_rate' => 0.0310,  'change_pct' => 0.00],
            'SZL' => ['buy_rate' => 6.8800,   'sell_rate' => 7.3500,   'change_pct' => -0.18],
            'LSL' => ['buy_rate' => 6.8800,   'sell_rate' => 7.3500,   'change_pct' => -0.18],
            'NAD' => ['buy_rate' => 6.8800,   'sell_rate' => 7.3500,   'change_pct' => -0.18],
        ];

        // Seed all 150+ currencies into database
        foreach ($wikiCurrencies as $currency) {
            $code = strtoupper($currency['code']);
            $name = $currency['name'];

            if (isset($knownRates[$code])) {
                $rateData = array_merge([
                    'currency_name' => $name,
                    'flag_emoji' => '',
                    'is_active' => true,
                ], $knownRates[$code]);
            } else {
                // Realistic starting fallback rate calculation
                $hash = abs(crc32($code));
                $baseBuy = round(0.5 + ($hash % 120) * 0.45, 4);
                $baseSell = round($baseBuy * 1.035, 4);

                $rateData = [
                    'currency_name' => $name,
                    'flag_emoji' => '',
                    'buy_rate' => $baseBuy,
                    'sell_rate' => $baseSell,
                    'change_pct' => round((($hash % 100) - 50) / 100, 2),
                    'is_active' => true,
                ];
            }

            ForexRate::updateOrCreate(
                ['currency_code' => $code],
                $rateData
            );
        }

        // Seed branches
        $branches = [
            ['name' => 'Kilimani Branch', 'area' => 'Kilimani', 'hours' => '9 AM - 7 PM', 'map_url' => 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Kilimani+Nairobi', 'sort_order' => 1],
            ['name' => 'Valley Arcade Branch', 'area' => 'Lavington', 'hours' => '9 AM - 7 PM', 'map_url' => 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Valley+Arcade+Nairobi', 'sort_order' => 2],
            ['name' => 'GTC Mall Branch', 'area' => 'Westlands', 'hours' => '9 AM - 7 PM', 'map_url' => 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+GTC+Mall+Nairobi', 'sort_order' => 3],
            ['name' => 'Village Market New Wing Branch', 'area' => 'Gigiri', 'hours' => '9 AM - 7 PM', 'map_url' => 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Village+Market+Nairobi', 'sort_order' => 4],
            ['name' => 'Village Market Old Wing Branch', 'area' => 'Gigiri', 'hours' => '9 AM - 7 PM', 'map_url' => 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Village+Market+Nairobi', 'sort_order' => 5],
            ['name' => 'Runda Branch', 'area' => 'Runda', 'hours' => '9 AM - 7 PM', 'map_url' => 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Runda+Nairobi', 'sort_order' => 6],
            ['name' => 'Lavington Branch (HQ)', 'area' => 'Lavington', 'hours' => '9 AM - 7 PM', 'map_url' => 'https://www.google.com/maps/search/?api=1&query=SunnyRemit+Lavington+Nairobi', 'sort_order' => 7],
        ];

        foreach ($branches as $branch) {
            Branch::firstOrCreate(
                ['name' => $branch['name']],
                array_merge($branch, ['is_active' => true])
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
                    'currenciesAccepted' => 'USD, EUR, GBP, AED, ZAR, INR, JPY, CAD, AUD, CHF, UGX, TZS, RWF, ETB, GHS, NGN',
                ],
            ],
            [
                'page_slug' => 'forex',
                'title' => 'Forex Exchange Rates — SunnyRemit | Live KES Currency Rates',
                'description' => 'View live forex exchange rates against the Kenyan Shilling. Buy and sell USD, EUR, GBP, and 150+ currencies at SunnyRemit\'s competitive rates.',
                'json_ld_schema' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'ExchangeRateSpecification',
                    'currency' => 'KES',
                    'exchangeRateType' => 'BuyingRate',
                ],
            ],
            [
                'page_slug' => 'branches',
                'title' => 'SunnyRemit Branch Locations — 7 Forex Bureaus in Nairobi',
                'description' => 'Find a SunnyRemit branch near you. 7 locations across Nairobi — Kilimani, Lavington, Westlands, Gigiri, and Runda. Open 365 days, 9AM-7PM.',
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
