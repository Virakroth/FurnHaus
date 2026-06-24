<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $products = Product::with('category')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

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

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'required|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'sku' => 'nullable|string|unique:products',
            'quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'material' => 'nullable|string',
            'color' => 'nullable|string',
            'dimensions' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'featured_image' => 'nullable|string',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'is_new' => 'boolean',
        ]);

        // Set default featured_image if not provided
        if (empty($validated['featured_image'])) {
            $validated['featured_image'] = '/products/placeholder.jpg';
        }

        // Set is_active to true by default so products are visible on the shop
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => 'Product created successfully.',
        ], 201);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'slug' => 'nullable|string|unique:products,slug,' . $product->id,
            'description' => 'nullable|string',
            'short_description' => 'nullable|string|max:500',
            'price' => 'nullable|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'cost_price' => 'nullable|numeric|min:0',
            'sku' => 'nullable|string|unique:products,sku,' . $product->id,
            'quantity' => 'nullable|integer|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'material' => 'nullable|string',
            'color' => 'nullable|string',
            'dimensions' => 'nullable|string',
            'weight' => 'nullable|numeric',
            'featured_image' => 'nullable|string',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'is_new' => 'boolean',
        ]);

        $product->update($validated);

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => 'Product updated successfully.',
        ]);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:5120',
        ]);

        $file = $validated['image'];
        $uploadDirectory = public_path('products/uploads');

        if (!File::exists($uploadDirectory)) {
            File::makeDirectory($uploadDirectory, 0755, true);
        }

        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $file->move($uploadDirectory, $filename);

        return response()->json([
            'success' => true,
            'data' => [
                'path' => $request->getSchemeAndHttpHost() . '/products/uploads/' . $filename,
            ],
            'message' => 'Image uploaded successfully.',
        ], 201);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully.',
        ]);
    }
}
