<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/*',  // Skip CSRF for all API routes (they use Bearer token auth with Sanctum)
    ];

    /**
     * Disables CSRF verification for specific HTTP methods.
     * This is needed because stateless API requests using Bearer tokens
     * should not require CSRF token validation.
     */
    public function handle($request, \Closure $next)
    {
        // Skip CSRF verification for API routes entirely since they use Bearer token auth
        if ($request->is('api/*')) {
            return $next($request);
        }

        return parent::handle($request, $next);
    }
}
