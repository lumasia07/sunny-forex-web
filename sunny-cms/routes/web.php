<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\RateController;
use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Audit\AuditDashboardController;
use App\Http\Controllers\Audit\AuditRatesController;
use App\Http\Controllers\Audit\AuditActivityController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    if ($user->hasRole('ceo', 'auditor')) {
        return redirect()->route('audit.dashboard');
    }
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Public kiosk rate board display for branch screens (TVs)
Route::get('display/rates-board', [\App\Http\Controllers\Api\V1\ApiController::class, 'kioskRates'])->name('display.rates');

// Admin Portal (admin & editor roles)
Route::middleware(['auth', 'role:admin,editor'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    
    // Rates strip and conversion widget rates
    Route::get('rates', [RateController::class, 'index'])->name('rates.index');
    Route::post('rates', [RateController::class, 'update'])->name('rates.update');
    Route::post('rates/store', [RateController::class, 'store'])->name('rates.store');
    Route::post('rates/seed-cbk', [RateController::class, 'seedCbk'])->name('rates.seed-cbk');
    Route::delete('rates/{rate}', [RateController::class, 'destroy'])->name('rates.destroy');
    
    // Branches
    Route::resource('branches', BranchController::class)->except(['show']);
    
    // Blog
    Route::resource('blog', BlogController::class)->except(['show']);
    
    // FAQs
    Route::resource('faqs', FaqController::class)->except(['show']);
    
    // Compliance, KYC & Legal Documents
    Route::resource('documents', DocumentController::class)->except(['show']);
    Route::get('documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
});

// CEO Audit Dashboard (ceo & auditor roles)
Route::middleware(['auth', 'role:ceo,auditor'])->prefix('audit')->name('audit.')->group(function () {
    Route::get('/', [AuditDashboardController::class, 'index'])->name('dashboard');
    Route::get('rates', [AuditRatesController::class, 'index'])->name('rates');
    Route::get('activity', [AuditActivityController::class, 'index'])->name('activity');
    Route::get('report', [AuditDashboardController::class, 'report'])->name('report');
    Route::get('report/print', [AuditDashboardController::class, 'printReport'])->name('report.print');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
