<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
