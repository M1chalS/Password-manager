<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\UserAccountController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'destroy'])->name('logout')->middleware('auth');

    Route::apiResource('users', UserAccountController::class)->except(['store']);
    Route::apiResource('passwords', PasswordController::class);
});

Route::apiResource('users', UserAccountController::class)->only(['store']);

Route::post('login', [AuthController::class, 'store'])->name('login');
