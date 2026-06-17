"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/app/types";
import { Star, Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group border border-[#E5E5E5] h-full flex flex-col">
        <div className="relative bg-[#ECECEC] aspect-square overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked(!liked);
            }}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-[#F8F8F8] shadow-md transition"
          >
            <Heart
              className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : "text-[#999999]"}`}
            />
          </button>
        </div>

        {/* Added flex-1 and flex flex-col here to make the content box stretch equally */}
        <div className="p-4 flex flex-col flex-1">
          {/* Added h-[3.5rem] to reserve space for exactly 2 lines of text */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-[#222222] h-[3.5rem]">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-[#333333]">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-[#666666]">({product.reviews})</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-[#222222]">
              ${parseFloat(product.price as string).toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#666666] line-through">
                ${parseFloat(product.originalPrice as string).toFixed(2)}
              </span>
            )}
          </div>

          {/* Added mt-auto to push the button perfectly to the absolute bottom of the card */}
          <button className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition font-semibold mt-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
