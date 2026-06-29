<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void {
        Schema::create('site_contents', function (Blueprint $table) {
            $table->id(); $table->string('key')->unique(); $table->string('title')->nullable();
            $table->longText('body')->nullable(); $table->string('section')->nullable();
            $table->string('page')->nullable(); $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('site_contents'); }
};
