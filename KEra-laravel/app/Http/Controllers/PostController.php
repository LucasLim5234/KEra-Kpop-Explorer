<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($request->query('postCategory') === 'mine') {
            $posts = Post::with('user')
                ->where('user_id', $user->id)
                ->orderByDesc('updated_at')
                ->withCount('likes')
                ->get();
        } else {
            $posts = Post::with('user')
                ->orderByDesc('updated_at')
                ->withCount('likes')
                ->get();
        }
        $posts->map(function ($post) use ($user) {
            $post->user_liked = $post->likes()
                ->where('user_id', $user->id)
                ->exists();
            return $post;
        });

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500'
        ]);

        return auth()->user()->posts()->create($validated);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:500'
        ]);
        $post = Post::findOrFail($id);
        $post->update($validated);

        return $post;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(
            ['message' => 'Post deleted successfully'],
            200
        );
    }
}
