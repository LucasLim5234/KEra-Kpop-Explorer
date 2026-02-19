<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\IdolController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Public Kpop Idol API


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/idols', [IdolController::class, 'index']);
    Route::get('/idols/{id}', [IdolController::class, 'show']);
    Route::apiResource('/post', PostController::class);
    Route::apiResource('/comment', CommentController::class);
    Route::post('/like', [LikeController::class, 'toggle']);
    Route::apiResource('/tour', TourController::class);
});
