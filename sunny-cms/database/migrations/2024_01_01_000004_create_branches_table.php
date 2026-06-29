<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('branches', function (Blueprint $table) {
            $table->id(); $table->string('name'); $table->string('area');
            $table->text('address')->nullable(); $table->string('hours')->default('9 AM - 7 PM');
            $table->string('phone')->nullable(); $table->string('map_url')->nullable();
            $table->decimal('latitude', 10, 7)->nullable(); $table->decimal('longitude', 10, 7)->nullable();
            $table->boolean('is_active')->default(true); $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('branches'); }
};
