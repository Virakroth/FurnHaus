<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::get('/', function () {
    return ['message' => 'FurnHaus API'];
});

Route::get('/login', function () {
    return response()->json([
        'success' => false,
        'message' => 'Unauthenticated.',
    ], 401);
})->name('login');

Route::get('/products/uploads/{filename}', function (string $filename) {
    abort_if(basename($filename) !== $filename, 404);

    $paths = [
        public_path('products/uploads/' . $filename),
        base_path('../public/products/uploads/' . $filename),
    ];

    foreach ($paths as $path) {
        if (File::exists($path)) {
            return response()->file($path);
        }
    }

    abort(404);
});
