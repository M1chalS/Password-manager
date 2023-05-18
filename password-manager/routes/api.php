<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShareController;
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
    Route::delete('logout', [AuthController::class, 'destroy'])->name('logout');
    Route::apiResource('passwords', PasswordController::class)->except(['index']);
    Route::apiResource('users', UserAccountController::class)->only(['show', 'update']);
    Route::apiResource('shares', ShareController::class)->only(['store', 'destroy']);

    Route::middleware('admin')->group(function () {
        Route::apiResource('passwords', PasswordController::class)->only(['index']);
        Route::apiResource('users', UserAccountController::class)->only(['index', 'destroy']);
    });
});

Route::apiResource('users', UserAccountController::class)->only(['store']);

Route::post('login', [AuthController::class, 'store'])->name('login');

Route::fallback(function () {
    return response()->json([
        'message' => 'Route Not Found'
    ], 404);
});
