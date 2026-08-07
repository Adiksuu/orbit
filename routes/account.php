<?php

use App\Http\Controllers\UserController;

Route::middleware('auth')->group(function () {
   Route::post('/account/rename', [UserController::class, 'rename'])->name('account.rename');
});
