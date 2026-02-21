<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'idol_id', 'score'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function idol()
    {
        return $this->belongsTo(Idol::class);
    }
}
