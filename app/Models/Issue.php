<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Issue extends Model
{
    /** @use HasFactory<\Database\Factories\IssueFactory> */
    use HasFactory;

    protected $fillable = [
        'id',
        'title',
        'description',
        'status',
        'priority',
        'project_id',
        'user_id',
        'assignee_id'
    ];

    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function assignee(): BelongsTo {
        return $this->belongsTo(User::class, 'assignee_id');
    }
}
