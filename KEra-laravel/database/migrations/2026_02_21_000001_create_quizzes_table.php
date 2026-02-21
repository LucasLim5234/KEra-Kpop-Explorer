<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idol_id')->constrained()->onDelete('cascade');
            $table->string('question');
            $table->string('option_a');
            $table->string('option_b');
            $table->string('option_c');
            $table->string('option_d');
            $table->string('answer'); // store 'A', 'B', 'C', or 'D'
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
