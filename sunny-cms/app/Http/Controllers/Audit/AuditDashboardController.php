<?php

namespace App\Http\Controllers\Audit;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\RateHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AuditDashboardController extends Controller
{
    public function index(): View
    {
        $totalLogsCount = AuditLog::count();
        $rateUpdatesCount = RateHistory::count();
        $staffCount = User::whereIn('role', ['admin', 'editor'])->count();
        
        $recentLogs = AuditLog::with('user')->orderBy('created_at', 'desc')->take(15)->get();
        $recentRateChanges = RateHistory::with(['forexRate', 'changedByUser'])->orderBy('changed_at', 'desc')->take(10)->get();

        return view('audit.dashboard', compact(
            'totalLogsCount',
            'rateUpdatesCount',
            'staffCount',
            'recentLogs',
            'recentRateChanges'
        ));
    }

    public function report(Request $request): View
    {
        $actions = AuditLog::select('action')->distinct()->pluck('action');
        return view('audit.report.index', compact('actions'));
    }

    public function printReport(Request $request): View
    {
        $query = AuditLog::with('user')->orderBy('created_at', 'desc');

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->input('start_date'));
        }
        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->input('end_date'));
        }
        if ($request->filled('action_type') && $request->input('action_type') !== 'all') {
            $query->where('action', $request->input('action_type'));
        }

        $logs = $query->get();
        $startDate = $request->input('start_date', 'Beginning of logs');
        $endDate = $request->input('end_date', now()->toDateString());
        $selectedAction = $request->input('action_type', 'All Actions');

        return view('audit.report.print', compact('logs', 'startDate', 'endDate', 'selectedAction'));
    }
}
