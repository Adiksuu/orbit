<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IssueController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::patch('/issues/{issue}', [IssueController::class, 'update'])->name('issues.update');
Route::post('/issues', [IssueController::class, 'store'])->name('issues.store');
