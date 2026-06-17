<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\HandleCors as Middleware;

class HandleCors extends Middleware
{
    protected $paths = ['api/*', 'admin/*'];

    protected $allowedOrigins = ['http://localhost:3000', 'http://localhost:8000'];
    protected $allowedMethods = ['*'];
    protected $allowedHeaders = ['*'];
    protected $exposedHeaders = [];
    protected $maxAge = 0;
    protected $supportsCredentials = true;
}
