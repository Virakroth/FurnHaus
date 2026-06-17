'use client';

import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const subtotal = 1098.00;
  const shipping = 0;
  const tax = 87.84;
  const total = 1185.84;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#222222]">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="md:col-span-2 space-y-8">
            {/* Step 1: Shipping */}
            <div className={`border border-[#E5E5E5] rounded-lg p-6 ${step >= 1 ? '' : 'opacity-50'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-black text-white' : 'bg-[#E5E5E5] text-[#666666]'}`}>
                  1
                </div>
                <h2 className="text-2xl font-bold text-[#222222]">Shipping Information</h2>
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                  />
                  <div className="grid md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      className="border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      className="border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition mt-4"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`border border-[#E5E5E5] rounded-lg p-6 ${step >= 2 ? '' : 'opacity-50'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-black text-white' : 'bg-[#E5E5E5] text-[#666666]'}`}>
                  2
                </div>
                <h2 className="text-2xl font-bold text-[#222222]">Payment Method</h2>
              </div>

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-4 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer flex-1 p-4 border border-[#E5E5E5] rounded hover:bg-[#F8F8F8] transition">
                      <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                      <span className="text-[#333333]">Credit Card</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer flex-1 p-4 border border-[#E5E5E5] rounded hover:bg-[#F8F8F8] transition">
                      <input type="radio" name="payment" className="w-4 h-4" />
                      <span className="text-[#333333]">PayPal</span>
                    </label>
                  </div>

                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className="border border-[#E5E5E5] px-4 py-2 rounded text-[#333333] placeholder-[#999999]"
                    />
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-[#E5E5E5] text-[#222222] py-3 rounded-lg font-semibold hover:bg-[#F8F8F8] transition"
                    >
                      Back
                    </button>
                    <Link
                      href="/order-success"
                      className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition block text-center"
                    >
                      Place Order
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#F8F8F8] p-6 rounded-lg h-fit border border-[#E5E5E5]">
            <h2 className="text-xl font-bold mb-6 text-[#222222]">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between pb-4 border-b border-[#E5E5E5] text-[#333333]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-[#E5E5E5] text-[#333333]">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-[#E5E5E5] text-[#333333]">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold text-[#222222]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
