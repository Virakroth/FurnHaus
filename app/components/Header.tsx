'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Menu, X, Home } from 'lucide-react';
import { isAuthenticated } from '@/app/lib/auth';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth status
    setIsLoggedIn(isAuthenticated());

    // Load initial cart count
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Also listen for custom events from ProductCard
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <header className="border-b">
      <div className="bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[#222222] hover:text-[#666666] transition">
              <Home className="w-7 h-7" />
              <span>FurnHaus</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#666666] hover:text-black transition font-medium">Home</Link>
              <Link href="/shop" className="text-[#666666] hover:text-black transition font-medium">Shop</Link>
              <Link href="/about" className="text-[#666666] hover:text-black transition font-medium">About</Link>
              <Link href="/blog" className="text-[#666666] hover:text-black transition font-medium">Blog</Link>
              <Link href="/contact" className="text-[#666666] hover:text-black transition font-medium">Contact</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 cursor-pointer text-[#444444] hover:text-black transition" />
              <Link href={isLoggedIn ? "/dashboard" : "/login"}>
                <User className="w-5 h-5 cursor-pointer text-[#444444] hover:text-black transition" />
              </Link>
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-5 h-5 text-[#444444] hover:text-black transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="text-black" /> : <Menu className="text-black" />}
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
