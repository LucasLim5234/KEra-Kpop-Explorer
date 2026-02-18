<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TourController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Removed public tour-index route. Use /tours under auth:sanctum.
// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/post', PostController::class);
    Route::apiResource('/comment', CommentController::class);
    Route::post('/like', [LikeController::class, 'toggle']);
    Route::apiResource('/tour', TourController::class);
});
