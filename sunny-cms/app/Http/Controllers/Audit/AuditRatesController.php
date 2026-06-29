<?php

namespace App\Http\Controllers\Audit;

use App\Http\Controllers\Controller;
use App\Models\RateHistory;
use Illuminate\View\View;

class AuditRatesController extends Controller
{
    public function index(): View
    {
        $rateHistories = RateHistory::with(['forexRate', 'changedByUser'])
            ->orderBy('changed_at', 'desc')
            ->paginate(20);

        return view('audit.rates', compact('rateHistories'));
    }
}
