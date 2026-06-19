<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\HandleCors as Middleware;

class HandleCors extends Middleware
{
    protected $paths = ['api/*', 'admin/*'];

    /**
     * CORS allowed origins - configured via environment variable
     * For local: localhost:3000,localhost:8000
     * For production: your-frontend-domain.com,your-backend-domain.com
     * Set CORS_ALLOWED_ORIGINS in .env
     */
    protected $allowedOrigins = [];
    protected $allowedMethods = ['*'];
    protected $allowedHeaders = ['*'];
    protected $exposedHeaders = [];
    protected $maxAge = 0;

    public function __construct()
    {
        // Get allowed origins from environment variable, fallback to localhost for dev
        $allowedOrigins = env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://localhost:8000');
        $this->allowedOrigins = array_map('trim', explode(',', $allowedOrigins));
    }
    protected $supportsCredentials = true;
}
