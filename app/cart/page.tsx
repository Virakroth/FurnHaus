"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import Link from "next/link";
import { products } from "@/app/lib/mock-data";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const cartItems = products
    .slice(0, 2)
    .map((p) => ({ product: p, quantity: 1 }));
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#222222]">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 border border-[#E5E5E5] rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="w-24 h-24 bg-[#ECECEC] rounded"></div>
                  <div className="flex-1">
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-lg hover:text-black text-[#222222]">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-[#666666] mb-4">
                      ${parseFloat(item.product.price as string).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#E5E5E5] rounded w-fit">
                        <button className="px-3 py-1 hover:bg-[#F8F8F8] text-[#333333]">
                          −
                        </button>
                        <span className="px-4 py-1 border-l border-r border-[#E5E5E5] text-[#222222]">
                          {item.quantity}
                        </span>
                        <button className="px-3 py-1 hover:bg-[#F8F8F8] text-[#333333]">
                          +
                        </button>
                      </div>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#222222]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-[#F8F8F8] p-6 rounded-lg h-fit border border-[#E5E5E5]">
              <h2 className="text-xl font-bold mb-6 text-[#222222]">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#333333]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#333333]">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#333333]">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-[#E5E5E5] pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-[#222222]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition block text-center"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="w-full border border-[#E5E5E5] text-[#222222] py-3 rounded-lg font-semibold hover:bg-[#F8F8F8] transition block text-center mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#666666] text-lg mb-4">Your cart is empty</p>
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
