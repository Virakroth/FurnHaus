"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";
import { getProduct, getRelatedProducts, resolveProductImageUrl } from "@/app/lib/api";
import { useState, useEffect } from "react";
import { Star, Heart, Share2, Truck, Shield } from "lucide-react";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const productRes = await getProduct(params.id);
        if (productRes.success) {
          // Map API response to include 'image' field
          const mappedProduct = {
            ...productRes.data,
            image: resolveProductImageUrl(productRes.data.featured_image),
            rating: parseFloat(productRes.data.rating) || 0,
            reviews: productRes.data.reviews_count || 0,
            price: parseFloat(productRes.data.price),
            originalPrice: productRes.data.original_price
              ? parseFloat(productRes.data.original_price)
              : undefined,
          };
          setProduct(mappedProduct);

          const relatedRes = await getRelatedProducts(params.id);
          if (relatedRes.success) {
            // Map related products too
            const mappedRelated = (relatedRes.data || []).map((p: any) => ({
              ...p,
              image: resolveProductImageUrl(p.featured_image),
              rating: parseFloat(p.rating) || 0,
              reviews: p.reviews_count || 0,
              price: parseFloat(p.price),
            }));
            setRelatedProducts(mappedRelated);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-4" />
            <div className="h-8 bg-gray-200 rounded mb-2 w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link
            href="/shop"
            className="text-blue-600 hover:underline mt-4 inline-block"
          >
            Back to shop
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedItems = relatedProducts;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/shop"
          className="text-[#666666] hover:text-black mb-8 inline-block transition"
        >
          ← Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="bg-[#ECECEC] rounded-lg h-96 md:h-[500px] overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-[#222222]">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-[#DDDDDD]"}`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-[#222222]">
                {product.rating}
              </span>
              <span className="text-[#666666]">
                ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-[#222222]">
                ${(typeof product.price === 'string' ? parseFloat(product.price) : product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-[#666666] line-through">
                  ${(typeof product.originalPrice === 'string' ? parseFloat(product.originalPrice) : product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-[#333333] mb-8 text-lg">{product.description}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-8 p-4 bg-[#F8F8F8] rounded border border-[#E5E5E5]">
              <div>
                <p className="text-sm text-[#666666]">Material</p>
                <p className="font-semibold text-[#222222]">
                  {product.material}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#666666]">Color</p>
                <p className="font-semibold text-[#222222]">{product.color}</p>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-[#E5E5E5] rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-[#F8F8F8] text-[#333333]"
                >
                  −
                </button>
                <span className="px-6 py-2 border-l border-r border-[#E5E5E5] text-[#222222]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-[#F8F8F8] text-[#333333]"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Add to Cart
              </button>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setLiked(!liked)}
                className={`px-6 py-3 border rounded-lg font-semibold transition ${
                  liked
                    ? "bg-red-50 border-red-500"
                    : "border-[#E5E5E5] hover:bg-[#F8F8F8]"
                }`}
              >
                <Heart
                  className={`w-5 h-5 inline mr-2 ${liked ? "fill-red-500 text-red-500" : "text-[#666666]"}`}
                />
                {liked ? "Liked" : "Like"}
              </button>
              <button className="px-6 py-3 border border-[#E5E5E5] rounded-lg font-semibold hover:bg-[#F8F8F8] transition text-[#222222]">
                <Share2 className="w-5 h-5 inline mr-2" />
                Share
              </button>
            </div>

            <div className="border-t border-[#E5E5E5] pt-8 space-y-4">
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 flex-shrink-0 text-[#222222]" />
                <div>
                  <p className="font-semibold text-[#222222]">Free Shipping</p>
                  <p className="text-sm text-[#666666]">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 flex-shrink-0 text-[#222222]" />
                <div>
                  <p className="font-semibold text-[#222222]">
                    2-Year Warranty
                  </p>
                  <p className="text-sm text-[#666666]">
                    Full coverage included
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedItems.length > 0 && (
          <section className="border-t border-[#E5E5E5] pt-16">
            <h2 className="text-3xl font-bold mb-8 text-[#222222]">
              Related Products
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {relatedItems.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition border border-[#E5E5E5]"
                >
                  <div className="bg-[#ECECEC] aspect-square relative overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 text-[#222222]">
                      {p.name}
                    </h3>
                    <p className="text-xl font-bold text-[#222222]">
                      ${parseFloat(p.price as string).toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  );
}
