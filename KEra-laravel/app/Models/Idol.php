<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idol extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'company', 'debut_year', 'thumbnail', 'fandom_name', 'members', 'discography', 'awards', 'description'
    ];

    protected $casts = [
        'members' => 'array',
        'discography' => 'array',
        'awards' => 'array',
    ];
}
