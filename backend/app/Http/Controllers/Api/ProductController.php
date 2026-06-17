<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(protected ProductService $productService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([
            'category_id',
            'min_price',
            'max_price',
            'material',
            'color',
            'search',
            'in_stock',
            'sort_by',
            'sort_order',
            'page',
            'per_page',
        ]);

        $products = $this->productService->getFiltered($filters);

        return response()->json([
            'success' => true,
            'data' => $products->items(),
            'pagination' => [
                'current_page' => $products->currentPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'total_pages' => $products->lastPage(),
            ],
        ]);
    }

    public function show(Product $product): JsonResponse
    {
        if (!$product->is_active) {
            return response()->json([
                'success' => false,
                'error' => 'Product not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product->load('category', 'reviews.user'),
        ]);
    }

    public function featured(): JsonResponse
    {
        $products = $this->productService->getFeatured();

        return response()->json([
            'success' => true,
            'data' => $products,
        ]);
    }

    public function related(Product $product): JsonResponse
    {
        $related = $this->productService->getRelated($product);

        return response()->json([
            'success' => true,
            'data' => $related,
        ]);
    }
}
