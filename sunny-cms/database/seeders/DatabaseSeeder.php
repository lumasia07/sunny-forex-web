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
use Illuminate\Support\Str;

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

        // Seed forex rates
        $rates = [
            ['currency_code' => 'USD', 'flag_emoji' => '🇺🇸', 'currency_name' => 'US Dollar', 'buy_rate' => 130.5, 'sell_rate' => 132.0, 'change_pct' => 0.42],
            ['currency_code' => 'EUR', 'flag_emoji' => '🇪🇺', 'currency_name' => 'Euro', 'buy_rate' => 141.2, 'sell_rate' => 143.5, 'change_pct' => -0.18],
            ['currency_code' => 'GBP', 'flag_emoji' => '🇬🇧', 'currency_name' => 'British Pound', 'buy_rate' => 165.8, 'sell_rate' => 168.2, 'change_pct' => 0.31],
            ['currency_code' => 'AED', 'flag_emoji' => '🇦🇪', 'currency_name' => 'UAE Dirham', 'buy_rate' => 35.4, 'sell_rate' => 36.1, 'change_pct' => 0.05],
            ['currency_code' => 'ZAR', 'flag_emoji' => '🇿🇦', 'currency_name' => 'South African Rand', 'buy_rate' => 6.8, 'sell_rate' => 7.1, 'change_pct' => -0.22],
            ['currency_code' => 'INR', 'flag_emoji' => '🇮🇳', 'currency_name' => 'Indian Rupee', 'buy_rate' => 1.54, 'sell_rate' => 1.62, 'change_pct' => 0.08],
            ['currency_code' => 'JPY', 'flag_emoji' => '🇯🇵', 'currency_name' => 'Japanese Yen', 'buy_rate' => 0.83, 'sell_rate' => 0.89, 'change_pct' => -0.04],
            ['currency_code' => 'CAD', 'flag_emoji' => '🇨🇦', 'currency_name' => 'Canadian Dollar', 'buy_rate' => 94.2, 'sell_rate' => 96.1, 'change_pct' => 0.15],
            ['currency_code' => 'AUD', 'flag_emoji' => '🇦🇺', 'currency_name' => 'Australian Dollar', 'buy_rate' => 84.5, 'sell_rate' => 86.2, 'change_pct' => 0.27],
            ['currency_code' => 'CHF', 'flag_emoji' => '🇨🇭', 'currency_name' => 'Swiss Franc', 'buy_rate' => 146.3, 'sell_rate' => 148.5, 'change_pct' => 0.19],
            ['currency_code' => 'UGX', 'flag_emoji' => '🇺🇬', 'currency_name' => 'Ugandan Shilling', 'buy_rate' => 0.034, 'sell_rate' => 0.036, 'change_pct' => -0.01],
            ['currency_code' => 'TZS', 'flag_emoji' => '🇹🇿', 'currency_name' => 'Tanzanian Shilling', 'buy_rate' => 0.051, 'sell_rate' => 0.053, 'change_pct' => 0.02],
        ];

        foreach ($rates as $rate) {
            ForexRate::firstOrCreate(
                ['currency_code' => $rate['currency_code']],
                array_merge($rate, ['is_active' => true])
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
                    'currenciesAccepted' => 'USD, EUR, GBP, AED, ZAR, INR, JPY, CAD, AUD, CHF',
                ],
            ],
            [
                'page_slug' => 'forex',
                'title' => 'Forex Exchange Rates — SunnyRemit | Live KES Currency Rates',
                'description' => 'View live forex exchange rates against the Kenyan Shilling. Buy and sell USD, EUR, GBP, and 10+ currencies at SunnyRemit\'s competitive rates.',
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
