<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsActive
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && !$request->user()->isActive()) {
            $request->user()->tokens()->delete();

            return response()->json([
                'success' => false,
                'error' => 'Account Suspended',
                'message' => 'Your account has been suspended.',
            ], 403);
        }

        return $next($request);
    }
}
