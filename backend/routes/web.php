<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['message' => 'FurnHaus API'];
});

Route::get('/login', function () {
    return response()->json([
        'success' => false,
        'message' => 'Unauthenticated.',
    ], 401);
})->name('login');
