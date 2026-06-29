<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ForexRate extends Model
{
    protected $fillable = [
        'currency_code',
        'currency_name',
        'flag_emoji',
        'buy_rate',
        'sell_rate',
        'change_pct',
        'is_active',
        'updated_by',
    ];

    protected $casts = [
        'buy_rate' => 'decimal:4',
        'sell_rate' => 'decimal:4',
        'change_pct' => 'decimal:4',
        'is_active' => 'boolean',
    ];

    public function updatedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function histories(): HasMany
    {
        return $this->hasMany(RateHistory::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
