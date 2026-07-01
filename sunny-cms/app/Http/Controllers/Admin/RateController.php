<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ForexRate;
use App\Models\AuditLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class RateController extends Controller
{
    public function index(Request $request): View
    {
        $search = $request->input('search');

        $rates = ForexRate::when($search, function ($query, $search) {
            $query->where('currency_code', 'like', "%{$search}%")
                  ->orWhere('currency_name', 'like', "%{$search}%");
        })
        ->orderBy('currency_code', 'asc')
        ->paginate(15)
        ->withQueryString();

        return view('admin.rates.index', compact('rates', 'search'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'currency_code' => 'required|string|size:3|unique:forex_rates,currency_code',
            'currency_name' => 'required|string|max:255',
            'buy_rate' => 'required|numeric|min:0',
            'sell_rate' => 'required|numeric|min:0',
            'change_pct' => 'required|numeric',
        ]);

        $validated['currency_code'] = strtoupper($validated['currency_code']);
        $validated['flag_emoji'] = ''; // Resolved dynamically in display views via flagcdn
        $validated['is_active'] = true;
        $validated['updated_by'] = auth()->id();

        $rate = ForexRate::create($validated);

        AuditLog::log(
            'created_currency',
            ForexRate::class,
            $rate->id,
            null,
            $rate->toArray(),
            'Added new currency pair: ' . $rate->currency_code
        );

        return redirect()->route('admin.rates.index')->with('success', 'New currency pair ' . $rate->currency_code . ' added successfully.');
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'rates' => 'required|array',
            'rates.*.buy_rate' => 'required|numeric|min:0',
            'rates.*.sell_rate' => 'required|numeric|min:0',
            'rates.*.change_pct' => 'required|numeric',
            'change_reason' => 'required|string|max:255',
        ]);

        $changes = [];

        foreach ($request->input('rates') as $id => $rateData) {
            $rate = ForexRate::findOrFail($id);
            $oldBuy = $rate->buy_rate;
            $oldSell = $rate->sell_rate;

            if ($rate->buy_rate != $rateData['buy_rate'] || $rate->sell_rate != $rateData['sell_rate']) {
                $rate->update([
                    'buy_rate' => $rateData['buy_rate'],
                    'sell_rate' => $rateData['sell_rate'],
                    'change_pct' => $rateData['change_pct'],
                    'updated_by' => auth()->id(),
                ]);

                $changes[] = [
                    'currency' => $rate->currency_code,
                    'old_buy' => $oldBuy,
                    'new_buy' => $rateData['buy_rate'],
                    'old_sell' => $oldSell,
                    'new_sell' => $rateData['sell_rate'],
                ];
            }
        }

        if (!empty($changes)) {
            AuditLog::log(
                'updated_rates',
                ForexRate::class,
                null,
                null,
                $changes,
                'Updated rates with reason: ' . $request->input('change_reason')
            );
        }

        return redirect()->route('admin.rates.index')->with('success', 'Forex rates updated successfully.');
    }
}
