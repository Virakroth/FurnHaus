'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#222222]">FurnHaus</Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#666666] hover:text-black transition font-medium">Home</Link>
              <Link href="/shop" className="text-[#666666] hover:text-black transition font-medium">Shop</Link>
              <Link href="/about" className="text-[#666666] hover:text-black transition font-medium">About</Link>
              <Link href="/blog" className="text-[#666666] hover:text-black transition font-medium">Blog</Link>
              <Link href="/contact" className="text-[#666666] hover:text-black transition font-medium">Contact</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 cursor-pointer text-[#444444] hover:text-black transition" />
              <Link href="/login">
                <User className="w-5 h-5 cursor-pointer text-[#444444] hover:text-black transition" />
              </Link>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-5 h-5 text-[#444444] hover:text-black transition" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">0</span>
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileOpen && (
            <nav className="md:hidden flex flex-col gap-4 mt-4 border-t pt-4">
              <Link href="/" className="text-[#666666] hover:text-black transition font-medium">Home</Link>
              <Link href="/shop" className="text-[#666666] hover:text-black transition font-medium">Shop</Link>
              <Link href="/about" className="text-[#666666] hover:text-black transition font-medium">About</Link>
              <Link href="/blog" className="text-[#666666] hover:text-black transition font-medium">Blog</Link>
              <Link href="/contact" className="text-[#666666] hover:text-black transition font-medium">Contact</Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
