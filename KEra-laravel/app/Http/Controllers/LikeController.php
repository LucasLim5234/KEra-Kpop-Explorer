<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Request $request)
    {
        $request->validate([
            'likeable_id' => 'required|integer',
            'likeable_type' => 'required|string',
        ]);

        $user = $request->user();

        $likeableType = match ($request->likeable_type) {
            'post' => \App\Models\Post::class,
            'comment' => \App\Models\Comment::class,
            default => abort(400, 'Invalid type'),
        };

        $existing = Like::where([
            'user_id' => $user->id,
            'likeable_id' => $request->likeable_id,
            'likeable_type' => $likeableType,
        ])->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['liked' => false]);
        }

        $like = new Like(['user_id' => $user->id]);
        $likeableType::findOrFail($request->likeable_id)->likes()->save($like);

        return response()->json(['liked' => true]);
    }
}
