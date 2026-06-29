<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rate_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('forex_rate_id')->constrained('forex_rates')->cascadeOnDelete();
            $table->decimal('old_buy', 12, 4);
            $table->decimal('old_sell', 12, 4);
            $table->decimal('new_buy', 12, 4);
            $table->decimal('new_sell', 12, 4);
            $table->decimal('old_change_pct', 8, 4)->default(0);
            $table->decimal('new_change_pct', 8, 4)->default(0);
            $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('change_reason')->nullable();
            $table->timestamp('changed_at');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('rate_histories'); }
};
