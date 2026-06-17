"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";
import { products } from "@/app/lib/mock-data";
import Link from "next/link";
import { CheckCircle, Truck, Calendar, MapPin } from "lucide-react";

export default function OrderSuccess() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-[#222222]">Thank You!</h1>
        <p className="text-xl text-[#666666] mb-8">Your Order is Confirmed</p>

        <div className="bg-[#F8F8F8] p-8 rounded-lg mb-8 text-left border border-[#E5E5E5]">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-[#666666] mb-1">Order Number</p>
              <p className="text-2xl font-bold text-[#222222]">#FH1234567</p>
            </div>
            <div>
              <p className="text-sm text-[#666666] mb-1">Order Date</p>
              <p className="text-2xl font-bold text-[#222222]">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="border-t border-[#E5E5E5] pt-6 space-y-4">
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-[#666666] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#222222]">
                  Estimated Delivery
                </p>
                <p className="text-[#666666]">May 15 - May 20, 2024</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#666666] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#222222]">Shipping To</p>
                <p className="text-[#666666]">
                  123 Main Street
                  <br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Truck className="w-5 h-5 text-[#666666] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#222222]">Tracking</p>
                <p className="text-[#666666]">
                  We've sent your tracking information to your email
                </p>
                <button className="text-black hover:underline mt-2 font-semibold">
                  Track Your Order
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-[#666666] mb-8">
          <p>We've sent your order confirmation to your email</p>
          <p>
            If you have any questions, feel free to contact our support team
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            View Orders
          </Link>
          <Link
            href="/shop"
            className="border border-[#E5E5E5] text-[#222222] px-8 py-3 rounded-lg font-semibold hover:bg-[#F8F8F8] transition"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
          <p className="text-[#666666] mb-4">You May Also Like</p>
          <div className="grid md:grid-cols-3 gap-4">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="bg-[#ECECEC] h-48 rounded-lg flex items-center justify-center relative overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
