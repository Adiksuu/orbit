<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'slug',
        'description',
        'color',
        'columns'
    ];
    protected $casts = [
        'columns' => 'array',
    ];

    public function issues(): HasMany
    {
        return $this->hasMany(Issue::class);
    }
    public function savedFilters(): HasMany
    {
        return $this->hasMany(SavedFilter::class);
    }
}
