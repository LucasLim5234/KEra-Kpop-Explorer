<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->validate([
            'post_id' => 'required|integer|exists:posts,id',
        ]);
        $user = $request->user();
        $comments = Comment::with('user')
            ->where('post_id', $request->post_id)
            ->orderBy('created_at')
            ->withCount('likes')
            ->get();
        $comments->map(function ($comment) use ($user) {
            $comment->user_liked = $comment->likes()
                ->where('user_id', $user->id)
                ->exists();

            return $comment;
        });

        return $comments;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id' => 'required|integer|exists:posts,id',
            'parent_id' => 'nullable|integer',
            'content' => 'required|string|max:500',
        ]);
        $comment = auth()->user()->comments()->create($validated);
        $comment->likes_count = 0;
        $comment->user_liked = false;

        return $comment->load('user');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000'
        ]);
        $comment = Comment::findOrFail($id);
        $comment->update($validated);

        return $comment->load('user');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return response()->json(
            ['message' => 'Comment deleted successfully'],
            200
        );
    }
}
