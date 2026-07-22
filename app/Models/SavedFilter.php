<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedFilter extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'name', 'context', 'query_params'];

    protected $casts = [
        'query_params' => 'array',
    ];
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
