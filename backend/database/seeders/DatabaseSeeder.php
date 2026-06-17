<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'email' => 'vannet@furnhaus.com',
            'first_name' => 'Seung',
            'last_name' => 'Vannet',
            'password' => Hash::make('Netking20$'),
            'phone' => '+855 81508898',
            'role' => 'admin',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create test customer
        User::create([
            'email' => 'Sothea@gmail.com',
            'first_name' => 'Vanny',
            'last_name' => 'Sothea',
            'password' => Hash::make('Sothea20$'),
            'phone' => '+1 (555) 987-6543',
            'role' => 'customer',
            'status' => 'active',
            'email_verified_at' => now(),
        ]);

        // Create categories
        $categories = [
            ['name' => 'Chairs', 'slug' => 'chairs'],
            ['name' => 'Sofas', 'slug' => 'sofas'],
            ['name' => 'Tables', 'slug' => 'tables'],
            ['name' => 'Beds', 'slug' => 'beds'],
            ['name' => 'Storage', 'slug' => 'storage'],
            ['name' => 'Desks', 'slug' => 'desks'],
            ['name' => 'Lighting', 'slug' => 'lighting'],
            ['name' => 'Rugs & Accessories', 'slug' => 'rugs-accessories'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Seed products from mock data
        $this->seedProducts();
    }

    private function seedProducts(): void
    {
        $products = [
            // Chairs
            [
                'name' => 'Modern Upholstered Armchair',
                'slug' => 'modern-upholstered-armchair',
                'price' => 349.00,
                'category_id' => 1,
                'material' => 'Fabric',
                'color' => 'Grey',
                'rating' => 4.8,
                'reviews_count' => 245,
                'is_active' => true,
                'quantity' => 25,
            ],
            [
                'name' => 'Classic Wooden Chair',
                'slug' => 'classic-wooden-chair',
                'price' => 199.00,
                'category_id' => 1,
                'material' => 'Wood',
                'color' => 'Natural Oak',
                'rating' => 4.6,
                'reviews_count' => 189,
                'is_active' => true,
                'quantity' => 30,
            ],
            [
                'name' => 'Luxury Lounge Chair',
                'slug' => 'luxury-lounge-chair',
                'price' => 599.00,
                'original_price' => 799.00,
                'category_id' => 1,
                'material' => 'Premium Fabric',
                'color' => 'Cream',
                'rating' => 4.9,
                'reviews_count' => 312,
                'is_active' => true,
                'quantity' => 15,
            ],
            [
                'name' => 'Dining Accent Chair',
                'slug' => 'dining-accent-chair',
                'price' => 249.00,
                'category_id' => 1,
                'material' => 'Fabric',
                'color' => 'Charcoal',
                'rating' => 4.5,
                'reviews_count' => 124,
                'is_active' => true,
                'quantity' => 40,
            ],
            [
                'name' => 'Ergonomic Office Chair',
                'slug' => 'ergonomic-office-chair',
                'price' => 399.00,
                'category_id' => 1,
                'material' => 'Mesh',
                'color' => 'Black',
                'rating' => 4.7,
                'reviews_count' => 156,
                'is_active' => true,
                'quantity' => 20,
            ],
            // Sofas
            [
                'name' => 'Modern 3-Seater Sofa',
                'slug' => 'modern-3-seater-sofa',
                'price' => 899.00,
                'original_price' => 1199.00,
                'category_id' => 2,
                'material' => 'Fabric',
                'color' => 'Grey',
                'rating' => 4.8,
                'reviews_count' => 298,
                'is_active' => true,
                'quantity' => 10,
            ],
            [
                'name' => 'Minimalist Linen Sofa',
                'slug' => 'minimalist-linen-sofa',
                'price' => 749.00,
                'category_id' => 2,
                'material' => 'Linen',
                'color' => 'Beige',
                'rating' => 4.7,
                'reviews_count' => 201,
                'is_active' => true,
                'quantity' => 8,
            ],
            [
                'name' => 'Luxury Leather Sofa',
                'slug' => 'luxury-leather-sofa',
                'price' => 1299.00,
                'category_id' => 2,
                'material' => 'Leather',
                'color' => 'Cognac',
                'rating' => 4.9,
                'reviews_count' => 145,
                'is_active' => true,
                'quantity' => 5,
            ],
            [
                'name' => 'Compact L-Shaped Sofa',
                'slug' => 'compact-l-shaped-sofa',
                'price' => 799.00,
                'category_id' => 2,
                'material' => 'Fabric',
                'color' => 'Navy',
                'rating' => 4.6,
                'reviews_count' => 178,
                'is_active' => true,
                'quantity' => 12,
            ],
            // Tables
            [
                'name' => 'Walnut Coffee Table',
                'slug' => 'walnut-coffee-table',
                'price' => 299.00,
                'category_id' => 3,
                'material' => 'Wood',
                'color' => 'Walnut',
                'rating' => 4.7,
                'reviews_count' => 215,
                'is_active' => true,
                'quantity' => 35,
            ],
            [
                'name' => 'Glass Dining Table',
                'slug' => 'glass-dining-table',
                'price' => 599.00,
                'category_id' => 3,
                'material' => 'Glass',
                'color' => 'Clear',
                'rating' => 4.5,
                'reviews_count' => 142,
                'is_active' => true,
                'quantity' => 18,
            ],
            [
                'name' => 'Marble Side Table',
                'slug' => 'marble-side-table',
                'price' => 349.00,
                'category_id' => 3,
                'material' => 'Marble',
                'color' => 'White',
                'rating' => 4.8,
                'reviews_count' => 189,
                'is_active' => true,
                'quantity' => 28,
            ],
            [
                'name' => 'Industrial Steel Table',
                'slug' => 'industrial-steel-table',
                'price' => 449.00,
                'category_id' => 3,
                'material' => 'Steel',
                'color' => 'Black',
                'rating' => 4.6,
                'reviews_count' => 156,
                'is_active' => true,
                'quantity' => 22,
            ],
            // Beds
            [
                'name' => 'Modern Platform Bed',
                'slug' => 'modern-platform-bed',
                'price' => 799.00,
                'category_id' => 4,
                'material' => 'Wood',
                'color' => 'Natural',
                'rating' => 4.7,
                'reviews_count' => 234,
                'is_active' => true,
                'quantity' => 12,
            ],
            [
                'name' => 'Luxury Upholstered Bed',
                'slug' => 'luxury-upholstered-bed',
                'price' => 1099.00,
                'category_id' => 4,
                'material' => 'Fabric',
                'color' => 'Grey',
                'rating' => 4.9,
                'reviews_count' => 201,
                'is_active' => true,
                'quantity' => 8,
            ],
            [
                'name' => 'Classic Metal Bed Frame',
                'slug' => 'classic-metal-bed-frame',
                'price' => 499.00,
                'category_id' => 4,
                'material' => 'Metal',
                'color' => 'Black',
                'rating' => 4.5,
                'reviews_count' => 123,
                'is_active' => true,
                'quantity' => 20,
            ],
        ];

        foreach ($products as $product) {
            Product::create([
                ...$product,
                'featured_image' => '/products/placeholder.jpg',
                'stock_status' => $product['quantity'] > 0 ? 'in_stock' : 'out_of_stock',
                'is_featured' => false,
                'is_new' => false,
            ]);
        }
    }
}
