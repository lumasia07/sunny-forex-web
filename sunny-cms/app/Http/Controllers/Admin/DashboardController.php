<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Branch;
use App\Models\Faq;
use App\Models\ForexRate;
use App\Models\AuditLog;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $ratesCount = ForexRate::count();
        $branchesCount = Branch::count();
        $blogsCount = BlogPost::count();
        $faqsCount = Faq::count();
        $recentLogs = AuditLog::with('user')->orderBy('created_at', 'desc')->take(10)->get();

        return view('admin.dashboard', compact(
            'ratesCount',
            'branchesCount',
            'blogsCount',
            'faqsCount',
            'recentLogs'
        ));
    }
}
