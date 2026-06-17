<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $posts = BlogPost::published()
            ->with('category', 'author')
            ->orderBy('published_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $posts->items(),
            'pagination' => [
                'current_page' => $posts->currentPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
                'total_pages' => $posts->lastPage(),
            ],
        ]);
    }

    public function show(BlogPost $post): JsonResponse
    {
        if ($post->status !== 'published') {
            return response()->json([
                'success' => false,
                'error' => 'Post not found.',
            ], 404);
        }

        $post->incrementViewCount();
        $post->load('category', 'author', 'comments.user');

        return response()->json([
            'success' => true,
            'data' => $post,
        ]);
    }
}
