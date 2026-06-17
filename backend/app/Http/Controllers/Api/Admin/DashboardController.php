<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        $totalUsers = User::where('role', 'customer')->count();
        $totalProducts = Product::where('is_active', true)->count();
        $totalOrders = Order::count();
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total');

        $ordersThisMonth = Order::whereBetween('created_at', [
            now()->startOfMonth(),
            now()->endOfMonth(),
        ])->count();

        $revenueThisMonth = Order::whereBetween('created_at', [
            now()->startOfMonth(),
            now()->endOfMonth(),
        ])->where('payment_status', 'paid')->sum('total');

        $lowStockProducts = Product::where('quantity', '<', 10)
            ->where('is_active', true)
            ->count();

        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_users' => $totalUsers,
                'total_products' => $totalProducts,
                'total_orders' => $totalOrders,
                'total_revenue' => $totalRevenue,
                'orders_this_month' => $ordersThisMonth,
                'revenue_this_month' => $revenueThisMonth,
                'low_stock_products' => $lowStockProducts,
                'recent_orders' => $recentOrders,
            ],
        ]);
    }
}
