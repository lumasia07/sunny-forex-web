<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\ForexRate;
use App\Observers\ForexRateObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ForexRate::observe(ForexRateObserver::class);
    }
}
