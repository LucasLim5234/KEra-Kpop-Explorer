<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Idol;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use App\Models\User;

class QuizController extends Controller
{
    public function idolList(Request $request)
    {
        $user = $request->user();
        $idols = Idol::all();
        $attempts = QuizAttempt::where('user_id', $user->id)->pluck('idol_id')->toArray();
        $idols->map(function ($idol) use ($attempts) {
            $idol->attempted = in_array($idol->id, $attempts);
            return $idol;
        });
        return response()->json($idols);
    }

    public function getQuiz(Request $request, $idolId)
    {
        $user = $request->user();
        $attempted = QuizAttempt::where('user_id', $user->id)->where('idol_id', $idolId)->exists();
        if ($attempted) {
            return response()->json(['error' => 'Already attempted'], 403);
        }
        $questions = Quiz::where('idol_id', $idolId)->inRandomOrder()->limit(10)->get();
        return response()->json($questions);
    }

    public function submitQuiz(Request $request, $idolId)
    {
        $user = $request->user();
        $attempted = QuizAttempt::where('user_id', $user->id)->where('idol_id', $idolId)->exists();
        if ($attempted) {
            return response()->json(['error' => 'Already attempted'], 403);
        }
        $data = $request->validate([
            'answers' => 'required|array|size:10',
            'answers.*.quiz_id' => 'required|integer|exists:quizzes,id',
            'answers.*.answer' => 'required|string',
        ]);
        $score = 0;
        foreach ($data['answers'] as $answer) {
            $quiz = Quiz::find($answer['quiz_id']);
            if ($quiz && $quiz->answer === $answer['answer']) {
                $score++;
            }
        }
        QuizAttempt::create([
            'user_id' => $user->id,
            'idol_id' => $idolId,
            'score' => $score,
        ]);
        return response()->json(['score' => $score]);
    }

    public function leaderboard(Request $request)
    {
        $user = $request->user();
        $top = QuizAttempt::select('user_id')
            ->selectRaw('SUM(score) as total_score')
            ->groupBy('user_id')
            ->orderByDesc('total_score')
            ->with('user')
            ->limit(3)
            ->get();
        $myScore = QuizAttempt::where('user_id', $user->id)->sum('score');
        return response()->json([
            'top' => $top,
            'myScore' => $myScore,
        ]);
    }
}
