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
            'change_pct' => 'nullable|numeric',
        ]);

        $validated['currency_code'] = strtoupper($validated['currency_code']);
        $validated['flag_emoji'] = '';
        $validated['change_pct'] = $validated['change_pct'] ?? 0.00;
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
            'rates.*.change_pct' => 'nullable|numeric',
            'change_reason' => 'nullable|string|max:255',
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
                    'change_pct' => $rateData['change_pct'] ?? $rate->change_pct ?? 0,
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
            $reason = $request->filled('change_reason') 
                ? $request->input('change_reason') 
                : 'Routine operational rate adjustment';

            AuditLog::log(
                'updated_rates',
                ForexRate::class,
                null,
                null,
                $changes,
                'Updated rates: ' . $reason
            );
        }

        return redirect()->route('admin.rates.index')->with('success', 'Forex rates updated successfully.');
    }

    public function destroy(ForexRate $rate): RedirectResponse
    {
        $code = $rate->currency_code;
        $name = $rate->currency_name;
        $oldValues = $rate->toArray();

        $rate->delete();

        AuditLog::log(
            'deleted_currency',
            ForexRate::class,
            $rate->id,
            $oldValues,
            null,
            "Deleted currency pair {$code} ({$name})"
        );

        return redirect()->route('admin.rates.index')->with('success', "Currency pair {$code} deleted successfully.");
    }
}
