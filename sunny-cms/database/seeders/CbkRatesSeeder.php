<?php

namespace Database\Seeders;

use App\Models\ForexRate;
use Illuminate\Database\Seeder;

class CbkRatesSeeder extends Seeder
{
    /**
     * Run the database seeds for Central Bank of Kenya (CBK) benchmark rates.
     */
    public function run(): void
    {
        $cbkSeededRates = [
            [
                'currency_code' => 'USD',
                'currency_name' => 'US Dollar',
                'flag_emoji'    => '🇺🇸',
                'buy_rate'      => 128.8000,
                'sell_rate'     => 130.4000,
                'change_pct'    => 0.35,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'GBP',
                'currency_name' => 'British Pound Sterling',
                'flag_emoji'    => '🇬🇧',
                'buy_rate'      => 164.9000,
                'sell_rate'     => 167.1000,
                'change_pct'    => 0.22,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'EUR',
                'currency_name' => 'Euro',
                'flag_emoji'    => '🇪🇺',
                'buy_rate'      => 140.5000,
                'sell_rate'     => 142.3000,
                'change_pct'    => -0.15,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'AED',
                'currency_name' => 'UAE Dirham',
                'flag_emoji'    => '🇦🇪',
                'buy_rate'      => 35.1000,
                'sell_rate'     => 36.1000,
                'change_pct'    => 0.08,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'SAR',
                'currency_name' => 'Saudi Riyal',
                'flag_emoji'    => '🇸🇦',
                'buy_rate'      => 34.3500,
                'sell_rate'     => 35.2500,
                'change_pct'    => 0.05,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'CAD',
                'currency_name' => 'Canadian Dollar',
                'flag_emoji'    => '🇨🇦',
                'buy_rate'      => 93.9000,
                'sell_rate'     => 95.8000,
                'change_pct'    => 0.18,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'AUD',
                'currency_name' => 'Australian Dollar',
                'flag_emoji'    => '🇦🇺',
                'buy_rate'      => 84.5000,
                'sell_rate'     => 86.4000,
                'change_pct'    => 0.29,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'CHF',
                'currency_name' => 'Swiss Franc',
                'flag_emoji'    => '🇨🇭',
                'buy_rate'      => 145.5000,
                'sell_rate'     => 147.8000,
                'change_pct'    => -0.04,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'ZAR',
                'currency_name' => 'South African Rand',
                'flag_emoji'    => '🇿🇦',
                'buy_rate'      => 6.8800,
                'sell_rate'     => 7.3500,
                'change_pct'    => -0.18,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'INR',
                'currency_name' => 'Indian Rupee',
                'flag_emoji'    => '🇮🇳',
                'buy_rate'      => 1.5100,
                'sell_rate'     => 1.6300,
                'change_pct'    => 0.12,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'JPY',
                'currency_name' => 'Japanese Yen (100 JPY)',
                'flag_emoji'    => '🇯🇵',
                'buy_rate'      => 83.0000,
                'sell_rate'     => 85.5000,
                'change_pct'    => -0.10,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'CNY',
                'currency_name' => 'Chinese Yuan',
                'flag_emoji'    => '🇨🇳',
                'buy_rate'      => 17.7500,
                'sell_rate'     => 18.3500,
                'change_pct'    => 0.04,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'UGX',
                'currency_name' => 'Ugandan Shilling',
                'flag_emoji'    => '🇺🇬',
                'buy_rate'      => 0.0340,
                'sell_rate'     => 0.0370,
                'change_pct'    => 0.00,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'TZS',
                'currency_name' => 'Tanzanian Shilling',
                'flag_emoji'    => '🇹🇿',
                'buy_rate'      => 0.0480,
                'sell_rate'     => 0.0520,
                'change_pct'    => 0.02,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'RWF',
                'currency_name' => 'Rwandan Franc',
                'flag_emoji'    => '🇷🇼',
                'buy_rate'      => 0.0930,
                'sell_rate'     => 0.0990,
                'change_pct'    => -0.01,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'ETB',
                'currency_name' => 'Ethiopian Birr',
                'flag_emoji'    => '🇪🇹',
                'buy_rate'      => 1.0600,
                'sell_rate'     => 1.1500,
                'change_pct'    => 0.00,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'MWK',
                'currency_name' => 'Malawian Kwacha',
                'flag_emoji'    => '🇲🇼',
                'buy_rate'      => 0.0730,
                'sell_rate'     => 0.0790,
                'change_pct'    => 0.00,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'GHS',
                'currency_name' => 'Ghanaian Cedi',
                'flag_emoji'    => '🇬🇭',
                'buy_rate'      => 8.2500,
                'sell_rate'     => 8.7500,
                'change_pct'    => -0.08,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'NGN',
                'currency_name' => 'Nigerian Naira',
                'flag_emoji'    => '🇳🇬',
                'buy_rate'      => 0.0810,
                'sell_rate'     => 0.0870,
                'change_pct'    => 0.01,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'SEK',
                'currency_name' => 'Swedish Krona',
                'flag_emoji'    => '🇸🇪',
                'buy_rate'      => 12.0800,
                'sell_rate'     => 12.4500,
                'change_pct'    => 0.09,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'DKK',
                'currency_name' => 'Danish Krone',
                'flag_emoji'    => '🇩🇰',
                'buy_rate'      => 18.7600,
                'sell_rate'     => 19.3000,
                'change_pct'    => -0.03,
                'is_active'     => true,
            ],
            [
                'currency_code' => 'NOK',
                'currency_name' => 'Norwegian Krone',
                'flag_emoji'    => '🇳🇴',
                'buy_rate'      => 11.7800,
                'sell_rate'     => 12.1500,
                'change_pct'    => 0.06,
                'is_active'     => true,
            ],
        ];

        foreach ($cbkSeededRates as $rateData) {
            ForexRate::updateOrCreate(
                ['currency_code' => $rateData['currency_code']],
                $rateData
            );
        }
    }
}
