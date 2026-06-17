<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Str;

class OrderService
{
    public function createOrder(User $user, array $data): Order
    {
        // Calculate totals
        $subtotal = 0;
        $items = [];

        foreach ($data['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $itemTotal = $product->price * $item['quantity'];
            $subtotal += $itemTotal;

            $items[] = [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'product_sku' => $product->sku,
                'quantity' => $item['quantity'],
                'unit_price' => $product->price,
                'total_price' => $itemTotal,
            ];
        }

        $shippingAmount = $data['shipping_amount'] ?? 0;
        $taxAmount = $subtotal * 0.08; // 8% tax
        $discountAmount = $data['discount_amount'] ?? 0;
        $total = $subtotal + $shippingAmount + $taxAmount - $discountAmount;

        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'shipping_amount' => $shippingAmount,
            'discount_amount' => $discountAmount,
            'total' => $total,
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'ordered_at' => now(),
        ]);

        // Create order items
        foreach ($items as $item) {
            $order->items()->create($item);
        }

        // Update product inventory
        foreach ($data['items'] as $item) {
            $product = Product::find($item['product_id']);
            $product->decrement('quantity', $item['quantity']);
        }

        return $order->load('items');
    }

    public function updateOrderStatus(Order $order, string $status): Order
    {
        $order->update(['status' => $status]);

        if ($status === 'shipped') {
            $order->markAsShipped();
        } elseif ($status === 'delivered') {
            $order->markAsDelivered();
        }

        return $order;
    }

    public function cancelOrder(Order $order): Order
    {
        if ($order->status !== 'pending') {
            throw new \Exception('Only pending orders can be cancelled.');
        }

        // Restore inventory
        foreach ($order->items as $item) {
            $product = Product::find($item->product_id);
            $product->increment('quantity', $item->quantity);
        }

        $order->update([
            'status' => 'cancelled',
            'payment_status' => 'refunded',
        ]);

        return $order;
    }
}
