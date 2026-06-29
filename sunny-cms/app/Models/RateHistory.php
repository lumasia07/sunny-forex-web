<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RateHistory extends Model
{
    protected $fillable = [
        'forex_rate_id',
        'old_buy',
        'old_sell',
        'new_buy',
        'new_sell',
        'old_change_pct',
        'new_change_pct',
        'changed_by',
        'change_reason',
        'changed_at',
    ];

    protected $casts = [
        'old_buy' => 'decimal:4',
        'old_sell' => 'decimal:4',
        'new_buy' => 'decimal:4',
        'new_sell' => 'decimal:4',
        'old_change_pct' => 'decimal:4',
        'new_change_pct' => 'decimal:4',
        'changed_at' => 'datetime',
    ];

    public function forexRate(): BelongsTo
    {
        return $this->belongsTo(ForexRate::class);
    }

    public function changedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
