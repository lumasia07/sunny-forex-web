<?php

namespace App\Observers;

use App\Models\ForexRate;
use App\Models\RateHistory;
use App\Models\User;

class ForexRateObserver
{
    public function updated(ForexRate $forexRate): void
    {
        if ($forexRate->isDirty(['buy_rate', 'sell_rate'])) {
            RateHistory::create([
                'forex_rate_id' => $forexRate->id,
                'old_buy' => $forexRate->getOriginal('buy_rate'),
                'old_sell' => $forexRate->getOriginal('sell_rate'),
                'new_buy' => $forexRate->buy_rate,
                'new_sell' => $forexRate->sell_rate,
                'old_change_pct' => $forexRate->getOriginal('change_pct') ?? 0,
                'new_change_pct' => $forexRate->change_pct ?? 0,
                'changed_by' => auth()->id() ?? User::where('role', 'admin')->first()?->id,
                'change_reason' => request()->input('change_reason', 'Manual adjustment via rate engine'),
                'changed_at' => now(),
            ]);
        }
    }
}
