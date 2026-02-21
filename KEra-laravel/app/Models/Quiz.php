<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;
    protected $fillable = [
        'idol_id', 'question', 'option_a', 'option_b', 'option_c', 'option_d', 'answer'
    ];

    public function idol()
    {
        return $this->belongsTo(Idol::class);
    }
}
