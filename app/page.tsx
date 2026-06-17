"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { ProductCard } from "@/app/components/ProductCard";
import { products } from "@/app/lib/mock-data";
import Link from "next/link";
import Image from "next/image";
import { Truck, RefreshCw, Award, Shield } from "lucide-react";

export default function Home() {
  const bestSellers = products.slice(0, 4);
  const categories = [
    { name: "Chairs", image: "/products/Chairs/IMAGE 2026-06-14 17:08:08.jpg" },
    { name: "Sofas", image: "/products/Sofas/IMAGE 2026-06-14 17:19:51.jpg" },
    { name: "Tables", image: "/products/Tables/IMAGE 2026-06-14 17:20:14.jpg" },
    { name: "Beds", image: "/products/Beds/IMAGE 2026-06-14 17:21:05.jpg" },
    {
      name: "Storage",
      image: "/products/Shelves/IMAGE 2026-06-14 17:20:49.jpg",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center overflow-hidden">
        <Image
          src="/products/Hero:Banner images/IMAGE 2026-06-14 17:22:28.jpg"
          alt="Design Your Dream Space"
          fill
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Design Your Dream Space
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Premium furniture collections curated for modern living
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black px-8 py-3 rounded-lg hover:opacity-90 transition text-white font-semibold"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <Truck className="w-12 h-12 mb-4 text-[#222222]" />
          <h3 className="font-semibold mb-2 text-[#222222]">Free Shipping</h3>
          <p className="text-[#666666] text-sm">On orders over $100</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <RefreshCw className="w-12 h-12 mb-4 text-[#222222]" />
          <h3 className="font-semibold mb-2 text-[#222222]">Easy Returns</h3>
          <p className="text-[#666666] text-sm">30-day return guarantee</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Award className="w-12 h-12 mb-4 text-[#222222]" />
          <h3 className="font-semibold mb-2 text-[#222222]">Secure Payment</h3>
          <p className="text-[#666666] text-sm">100% secure transactions</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Shield className="w-12 h-12 mb-4 text-[#222222]" />
          <h3 className="font-semibold mb-2 text-[#222222]">24/7 Support</h3>
          <p className="text-[#666666] text-sm">Dedicated customer service</p>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-[#222222]">
          Shop by Category
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/shop"
              className="relative group cursor-pointer"
            >
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-end p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-[#222222]">
          Best Sellers
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
