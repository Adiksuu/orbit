<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SavedFilterController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::patch('/issues/{issue}', [IssueController::class, 'update'])->name('issues.update');
Route::post('/issues', [IssueController::class, 'store'])->name('issues.store');
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
Route::patch('/projects/{project}/columns', [ProjectController::class, 'updateColumns'])->name('projects.columns.update');
Route::post('/saved-filters', [SavedFilterController::class, 'store'])->name('saved-filters.store');
Route::delete('/saved-filters/{savedFilter}', [SavedFilterController::class, 'destroy'])->name('saved-filters.destroy');
