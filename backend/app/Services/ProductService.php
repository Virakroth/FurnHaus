<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductService
{
    public function getFiltered(array $filters = []): LengthAwarePaginator
    {
        $query = Product::active();

        // Filter by category
        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        // Filter by price range
        if (!empty($filters['min_price'])) {
            $query->where('price', '>=', $filters['min_price']);
        }
        if (!empty($filters['max_price'])) {
            $query->where('price', '<=', $filters['max_price']);
        }

        // Filter by material
        if (!empty($filters['material'])) {
            $query->where('material', $filters['material']);
        }

        // Filter by color
        if (!empty($filters['color'])) {
            $query->where('color', $filters['color']);
        }

        // Search by name/description
        if (!empty($filters['search'])) {
            $searchTerm = '%' . $filters['search'] . '%';
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', $searchTerm)
                  ->orWhere('description', 'like', $searchTerm)
                  ->orWhere('short_description', 'like', $searchTerm);
            });
        }

        // In stock only
        if (!empty($filters['in_stock'])) {
            $query->inStock();
        }

        // Sort
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';

        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('created_at', $sortOrder);
        }

        $perPage = $filters['per_page'] ?? 15;
        $page = $filters['page'] ?? 1;

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function getFeatured(int $limit = 4): \Illuminate\Database\Eloquent\Collection
    {
        return Product::active()->featured()->limit($limit)->get();
    }

    public function getNew(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return Product::active()->new()->limit($limit)->get();
    }

    public function getRelated(Product $product, int $limit = 4): \Illuminate\Database\Eloquent\Collection
    {
        return Product::active()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit($limit)
            ->get();
    }
}
