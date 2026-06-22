<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\WishlistController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Auth Routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/refresh', [AuthController::class, 'refresh']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // User Routes
    Route::prefix('/user')->group(function () {
        Route::get('/profile', [UserController::class, 'show']);
        Route::put('/profile', [UserController::class, 'update']);
        Route::post('/change-password', [UserController::class, 'changePassword']);
        Route::get('/addresses', [UserController::class, 'addresses']);
        Route::post('/addresses', [UserController::class, 'storeAddress']);
        Route::put('/addresses/{address}', [UserController::class, 'updateAddress']);
        Route::delete('/addresses/{address}', [UserController::class, 'deleteAddress']);
    });

    // Order Routes
    Route::prefix('/orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{order}', [OrderController::class, 'show']);
        Route::post('/', [OrderController::class, 'store']);
    });

    // Wishlist Routes
    Route::prefix('/wishlist')->group(function () {
        Route::get('/', [WishlistController::class, 'index']);
        Route::post('/', [WishlistController::class, 'store']);
        Route::delete('/{wishlist}', [WishlistController::class, 'destroy']);
    });

    // Review Routes
    Route::post('/products/{product}/reviews', [ReviewController::class, 'store']);
});

// Public Routes (No Auth Required)
Route::prefix('/products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/featured', [ProductController::class, 'featured']);
    Route::get('/{product}', [ProductController::class, 'show']);
    Route::get('/{product}/related', [ProductController::class, 'related']);
    Route::get('/{product}/reviews', [ReviewController::class, 'index']);
});

// Category Routes
Route::prefix('/categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/{category}', [CategoryController::class, 'show']);
});

// Blog Routes
Route::prefix('/blog')->group(function () {
    Route::get('/', [BlogController::class, 'index']);
    Route::get('/{post}', [BlogController::class, 'show']);
});

// Admin Routes
require __DIR__.'/admin.php';
