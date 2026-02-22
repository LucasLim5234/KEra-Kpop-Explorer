<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\IdolController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/idol', [IdolController::class, 'index']);
    Route::get('/idol/{id}', [IdolController::class, 'show']);
    Route::apiResource('/post', PostController::class);
    Route::apiResource('/comment', CommentController::class);
    Route::post('/like', [LikeController::class, 'toggle']);
    Route::apiResource('/tour', TourController::class);
    Route::get('/quiz/idols', [\App\Http\Controllers\QuizController::class, 'idolList']);
    Route::get('/quiz/{idolId}', [\App\Http\Controllers\QuizController::class, 'getQuiz']);
    Route::post('/quiz/{idolId}', [\App\Http\Controllers\QuizController::class, 'submitQuiz']);
    Route::get('/quiz-leaderboard', [\App\Http\Controllers\QuizController::class, 'leaderboard']);
});
