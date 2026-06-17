<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $wishlists = $request->user()->wishlists()->with('product')->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $wishlists->items(),
            'pagination' => [
                'current_page' => $wishlists->currentPage(),
                'per_page' => $wishlists->perPage(),
                'total' => $wishlists->total(),
                'total_pages' => $wishlists->lastPage(),
            ],
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $product = Product::find($validated['product_id']);

        if (!$product->is_active) {
            return response()->json([
                'success' => false,
                'error' => 'Product not found.',
            ], 404);
        }

        $exists = Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $validated['product_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'error' => 'Product already in wishlist.',
            ], 422);
        }

        $wishlist = $request->user()->wishlists()->create($validated);

        return response()->json([
            'success' => true,
            'data' => $wishlist,
            'message' => 'Product added to wishlist.',
        ], 201);
    }

    public function destroy(Request $request, Wishlist $wishlist): JsonResponse
    {
        if ($wishlist->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'error' => 'Unauthorized.',
            ], 403);
        }

        $wishlist->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product removed from wishlist.',
        ]);
    }
}
