<?php

use App\Http\Controllers\Api\V1\ApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('rates', [ApiController::class, 'rates']);
    Route::get('branches', [ApiController::class, 'branches']);
    Route::get('blog', [ApiController::class, 'blog']);
    Route::get('blog/{slug}', [ApiController::class, 'blogPost']);
    Route::get('faqs', [ApiController::class, 'faqs']);
    Route::get('seo/{page}', [ApiController::class, 'seo']);
    Route::get('partners', [ApiController::class, 'partners']);
    Route::get('services', [ApiController::class, 'services']);
});
